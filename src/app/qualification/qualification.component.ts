import {Component, inject, OnInit} from '@angular/core';
import {QualificationService} from "../services/quali/qualification.service";
import {Qualification} from "../services/quali/qualification.model";

@Component({
  selector: 'app-qualification',
  standalone: true,
  imports: [],
  templateUrl: './qualification.component.html',
  styleUrl: './qualification.component.css'
})
export class QualificationComponent implements OnInit {

  isAdding = false;

  showAddRow(){
    this.isAdding = true;
  }
  hideAddRow(){
    this.isAdding = false;
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

  protected onDelete(id: number) {
    this.qualiServ.deleteQualifications(id).subscribe({
      next: () => {
        // 2. ERFOLG! Jetzt rufen wir unsere Lade-Funktion von vorhin auf
        // Damit wird die Liste vom Server neu geholt und das HTML aktualisiert sich automatisch.
        this.loadQualifications();
        console.log('Qualifikation mit ID ' + id + ' wurde gelöscht.');}
      })
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
    this.qualiServ.postQualifications(skillName).subscribe({
      next: () => {
        // 2. ERFOLG! Jetzt rufen wir unsere Lade-Funktion von vorhin auf
        // Damit wird die Liste vom Server neu geholt und das HTML aktualisiert sich automatisch.
        this.loadQualifications();
        this.hideAddRow()
   }
    })
  }
}
