import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Gamme } from '../models/gamme';
import { GammeService } from '../service/gamme.service';
import { PhaseService } from '../service/phase.service';
import { Phase } from '../models/phase';
import { StorageService } from '../service/storage.service';
import { TailleService } from '../service/taille.service';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.css']
})
export class PhasesComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  selectedGamme!: number;
  gammes!: Gamme[];
  phase: Phase = new Phase();
  phases!: Phase[];

  isAuthorized: boolean = false;

  constructor(private elementRef: ElementRef,private formBuilder:FormBuilder,private gammeService:GammeService,private phaseService:PhaseService,private storageService: StorageService) { }

  ngOnInit(): void {
    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');
    
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.addForm=this.formBuilder.group({
      name:['',[Validators.required]],
      code:['',[Validators.required]],
      gamme:['',[Validators.required]],

      
    })
    this.listeGammes();
    this.getPhases();

    
  }

  getPhases(){
    this.phaseService.getPhasesList().subscribe(data=>{
      this.phases=data;
    })
  }

  selectChangeHandlerGamme(event: any) {
    // update the ui
    this.selectedGamme = event.target.value;
    console.log(this.selectedGamme);
  }

  listeGammes(){
    this.gammeService.getGammesList().subscribe(data=>{
      this.gammes=data;
    });
  }

  onSubmit(){
    this.submitted=true;
    if (this.addForm.invalid) {
      return;
    }
  
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  
    this.phaseService.addPhase(this.selectedGamme,this.phase).subscribe(
      (response) => {
      },
      (error) => {
        if (error.status === 400) {
          Toast.fire({
            icon: 'error',
            title: error.error
          });
        } else {
          Toast.fire({
            icon: 'success',
            title: 'Phase ajoutée avec succès!'
          });
        }
        
      }
    );
  }

}
