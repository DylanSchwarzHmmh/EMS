# Starter für das LF10 Projekt - Angular


## Requirements

* Docker https://docs.docker.com/get-docker/
* Docker compose (bei Windows und Mac schon in Docker enthalten) https://docs.docker.com/compose/install/


### Abhängigkeiten starten (Postgres, EmployeeBackend)

```bash
docker compose up
```

Achtung: Der Docker-Container läuft dauerhaft! Wenn er nicht mehr benötigt wird, solltest du ihn stoppen.

### Abhängigkeiten stoppen

```bash
docker compose down
```

### Postgres Datenbank wipen, z.B. bei Problemen

```bash
docker compose down
docker volume rm docker_employee_postgres_data
docker compose up
```

## Swagger des Backends

```
http://localhost:8089/swagger
```

### Anwendungsstart

1. Docker-Container starten:
```bash
docker compose up
```

2. Authentik Admin-Interface öffnen: http://localhost:9000
3. Mit Admin-Credentials einloggen (a@b.com / secret)
4. Passwort für Benutzer "john" setzen:
  - Navigiere zu Directory → Users
  - Klicke auf den Benutzer "john"
  - Setze ein Passwort (z.B. "test123")

5. Angular-App starten:
```bash
npm start
```

6. Browser öffnen: http://localhost:4200
7. Auf "Zur Anwendung" klicken
8. Mit john und dem gesetzten Passwort einloggen


# Tutorial: OIDC-Authentifizierung mit Authentik integrieren

In diesem Tutorial lernst du, wie du die OIDC-Authentifizierung (OpenID Connect) mit Authentik in deine Angular-Anwendung integrierst.

## Schritt 1: Abhängigkeiten installieren

Installiere die benötigte OAuth2-Bibliothek:

```bash
npm install angular-oauth2-oidc
```

## Schritt 2: OAuth-Client in der App-Konfiguration bereitstellen

Öffne `src/app/app.config.ts` und füge den `provideOAuthClient()` zu den Providers hinzu:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideOAuthClient } from 'angular-oauth2-oidc';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideOAuthClient()  // <-- NEU
  ]
};
```

## Schritt 3: AuthService erstellen

Erstelle einen neuen Service `src/app/auth.service.ts`:

```bash
ng generate service auth
```

Implementiere den AuthService mit folgender Logik:

```typescript
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
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

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.configurePromise = this.configure();
  }

  private async configure() {
    this.oauthService.configure(this.authConfig);

    try {
      // Discovery-Dokument laden
      await this.oauthService.loadDiscoveryDocument();

      // Authentik gibt die Endpoints als Arrays zurück, wir müssen sie normalisieren
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
    } catch (error) {
      console.error('Fehler beim Laden des Discovery-Dokuments:', error);
    }
  }

  public async handleCallback(): Promise<boolean> {
    try {
      await this.configurePromise;
      await this.oauthService.tryLogin();
      return this.hasValidToken();
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
  }

  public hasValidToken(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  public getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }
}
```

**Wichtige Hinweise:**
- `strictDiscoveryDocumentValidation: false` ist notwendig, weil Authentik einige Endpoints als Arrays zurückgibt
- Die Normalisierung der Discovery-Document-Endpoints ist erforderlich
- `configurePromise` stellt sicher, dass das Discovery-Dokument geladen ist, bevor Login-Operationen durchgeführt werden

## Schritt 4: Callback-Komponente erstellen

Erstelle eine Callback-Komponente für die Rückleitung nach dem Login:

```bash
ng generate component callback
```

Implementiere `src/app/callback/callback.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: '<p>Processing login...</p>',
})
export class CallbackComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const success = await this.authService.handleCallback();
    
    if (success) {
      this.router.navigate(['/employees']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
```

## Schritt 5: Auth Guard erstellen

Erstelle einen Guard, um Routen zu schützen:

```bash
ng generate guard auth
```

Wähle "CanActivate" aus und implementiere `src/app/auth.guard.ts`:

```typescript
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.hasValidToken()) {
    return true;
  } else {
    authService.login();
    return false;
  }
};
```

## Schritt 6: Routen konfigurieren

Füge die Callback-Route hinzu und schütze die Employee-Route mit dem Guard in `src/app/app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CallbackComponent } from './callback/callback.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'employees', component: EmployeeListComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
```

## Schritt 7: Employee-List-Komponente anpassen

Füge den Access Token zu den HTTP-Requests hinzu:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    const token = this.authService.getAccessToken();
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    });
  }

 
}
```


# Bugs

Trage hier die Features ein, die nicht funktionieren. Beschreibe den jeweiligen Fehler. 


## Schritt 7: Employee-List-Komponente anpassen

Füge den Access Token zu den HTTP-Requests hinzu:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "../Employee";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees$: Observable<Employee[]>;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    const token = this.authService.getAccessToken();
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
    });
  }

 
}
```



## Anmeldung

Folgende daten können bei der anmeldung benutzt werden:

```typescript

Email: a@b.com
Password:  secret
```

in folgenden Datei muss den Access-Token angegeben sein:

```typescript

"\EMS\src\environments\environment.ts"

```

