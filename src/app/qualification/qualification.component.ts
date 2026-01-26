import { Component } from '@angular/core';
import {QualificationService} from "../services/quali/qualification.service";

@Component({
  selector: 'app-qualification',
  standalone: true,
  imports: [],
  templateUrl: './qualification.component.html',
  styleUrl: './qualification.component.css'
})
export class QualificationComponent {
  constructor(private qualiService: QualificationService) {
    // Eine Zeile, um den Motor zu starten
    this.qualiService.getQualifications().subscribe();
  }
}
