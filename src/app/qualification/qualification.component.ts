import {Component, inject, OnInit} from '@angular/core';
import {QualificationService} from "../services/quali/qualification.service";
import {Qualification} from "../services/quali/qualification.model";
import {NgClass} from "@angular/common";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-qualification',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './qualification.component.html',
  styleUrl: './qualification.component.css'
})
export class QualificationComponent implements OnInit {

  isAdding = false;
  editId: number | null = null;
  showToast= false;
  toastMessage= "";
  toastClass= ""; //textColor
  isSearching = false;

  showAddRow(){
    this.isAdding = true;
  }
  hideAddRow(){
    this.isAdding = false;
  }

  triggerNotification(nachricht: string, istFehler: boolean) {
    this.toastMessage = nachricht; // 1. Erst den Text setzen
    this.toastClass = istFehler ? 'text-danger' : 'text-success';
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false ;
    }, 2500);//

  }

  private qualiServ = inject(QualificationService);
  qualifications: Qualification[] = [];

  ngOnInit(): void {
    this.loadQualifications();
  }

  loadQualifications(): void {
    this.qualiServ.getQualifications().subscribe({
      next: data => {
        this.qualifications = data;
      }
    })
    console.log("Load Qualifications"+ this.qualifications);
  }
  onDelete(id: number) {
    this.qualiServ.deleteQualifications(id).subscribe({
      next: () => {

        this.loadQualifications();
        this.triggerNotification('Qualifikation wurde gelöscht.', false);
      },
      error: (err: HttpErrorResponse) => {

        console.error('Löschfehler:', err);

        // prüfen, ob die Fehlermeldung den Hinweis auf den Constraint (fk...) enthält
        if (err.status === 500 && err.error?.message?.includes('constraint')) {
          this.triggerNotification(
            'Löschen nicht möglich: Diese Qualifikation ist noch einem Mitarbeiter zugewiesen!',
            true
          );
        }
      }
    });
  }
















  //constructor(private qualiService: QualificationService) {
    // Eine Zeile, um den Motor zu starten
    //this.qualiService.deleteQualifications(17).subscribe()
    //this.qualiService.putQualifications(18,"Python").subscribe()
    //this.qualiService.postQualifications("aa").subscribe()
    //this.qualiService.getQualifications().subscribe();}

  //Den Service injecten (deinen Koch rufen).
    //Eine Variable erstellen, in der die Liste gespeichert wird.

  //Den Service aufrufen, sobald die Komponente "geboren" wird (ngOnInit).



  protected onSave(skillName: string) {
    console.log(this.qualifications)
    if (!skillName || skillName.trim() === '') {
      this.triggerNotification('Bitte gib einen Namen ein!', true); // true = rot
      return;
    }
    const exists = this.qualifications.some(q =>q.skill === skillName);
    if (exists) {
      this.triggerNotification("Diese Qualifikation existiert bereits!", true);
    }

    this.qualiServ.postQualifications(skillName).subscribe({
      next: () => {
        // 2. ERFOLG! Jetzt rufen wir unsere Lade-Funktion von vorhin auf
        // Damit wird die Liste vom Server neu geholt und das HTML aktualisiert sich automatisch.
        this.loadQualifications();
        this.hideAddRow()
        this.triggerNotification('Qualifikation wurde hizugefügt', false);
   }
    })
  }

  protected onEdit(id:number, skillName: string) {
    const orginalSkill = this.qualifications.find(q => q.id === id);
    console.log(this.qualifications)
    if (!skillName || skillName.trim() === '') {
      this.triggerNotification('Bitte gib einen Namen ein!', true); // true = rot
      return;
    }else {
      if (skillName == orginalSkill?.skill) {
        this.triggerNotification('Du hast nichts geändert!', false);
        return;
      }
    }
    const exists = this.qualifications.some(q =>q.skill === skillName);
    if (exists) {
      this.triggerNotification("Diese Qualifikation existiert bereits!", true);
    }
    this.qualiServ.putQualifications(id,skillName).subscribe({
      next: () => {
        // 2. ERFOLG! Jetzt rufen wir unsere Lade-Funktion von vorhin auf
        // Damit wird die Liste vom Server neu geholt und das HTML aktualisiert sich automatisch.
        this.loadQualifications();
        this.hideAddRow()
        this.triggerNotification('Qualifikation wurde bearbeitet', false);
      }
    })
    this.editId = null;
  }

  protected onSearch(searchValue: string) {
    this.isSearching =true
    const exists = this.qualifications.some(q =>q.skill === searchValue);
    if (!exists) {
      this.triggerNotification("Keine Übereinstimung gefunden ", true);
      this.isSearching = false
    }

  }
}
