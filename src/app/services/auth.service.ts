import {computed, Injectable, signal} from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authConfig: AuthConfig = {
    issuer: 'http://localhost:9000/application/o/employee_api/',
    clientId: 'employee_api_client',
    redirectUri: window.location.origin + '/callback',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
    requireHttps: false,
    postLogoutRedirectUri: window.location.origin,
    strictDiscoveryDocumentValidation: false,  // Wichtig für Authentik!
  };

  private configurePromise: Promise<void>;
  private _isAuthenticated = signal(false);
  isAuthenticated = computed(() => this._isAuthenticated());

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.configurePromise = this.configure();
    this.oauthService.events.subscribe(event => {
      if (event.type === 'token_received' || event.type === 'token_refreshed') {
        this._isAuthenticated.set(true);
      } else if (event.type === 'logout' || event.type === 'token_expires') {
        this._isAuthenticated.set(false);
      }
    });
  }

  private async configure() {
    this.oauthService.configure(this.authConfig);

    try {
      await this.oauthService.loadDiscoveryDocument();

      const discoveryDoc = (this.oauthService as any).discoveryDocument;
      if (discoveryDoc) {
        const endpointFields = [
          'authorization_endpoint',
          'token_endpoint',
          'userinfo_endpoint',
          'jwks_uri',
          'end_session_endpoint',
          'revocation_endpoint',
          'introspection_endpoint'
        ];

        endpointFields.forEach(field => {
          if (Array.isArray(discoveryDoc[field]) && discoveryDoc[field].length > 0) {
            discoveryDoc[field] = discoveryDoc[field][0];
          }
        });

        (this.oauthService as any).discoveryDocument = discoveryDoc;
      }

      this.oauthService.setupAutomaticSilentRefresh();
      this._isAuthenticated.set(this.oauthService.hasValidAccessToken());
    } catch (error) {
      console.error('Fehler beim Laden des Discovery-Dokuments:', error);
    }
  }

  public async handleCallback(): Promise<boolean> {
    try {
      await this.configurePromise;
      await this.oauthService.tryLogin();
      const isValid = this.hasValidToken();
      this._isAuthenticated.set(isValid);
      return isValid;
    } catch (error) {
      console.error('Fehler beim Login-Callback:', error);
      return false;
    }
  }


  public async login() {
    await this.configurePromise;
    this.oauthService.initCodeFlow();
  }

  public logout() {
    this.oauthService.logOut();
    this._isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  public hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }


}
