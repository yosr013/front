import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Machine } from '../models/machine';
import { Phase } from '../models/phase';
import { MachineService } from '../service/machine.service';
import { PhaseService } from '../service/phase.service';


import { OperationService } from '../service/operation.service';
import { Operation } from '../models/operation';

import { StorageService } from '../service/storage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-chaine-prod',
  templateUrl: './chaine-prod.component.html',
  styleUrls: ['./chaine-prod.component.css']
})
export class ChaineProdComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  machines!: Machine[];
  phases!: Phase[];
  id!: number;
  selectedMachine!: number;
  selectedPhase!: number;

  operations!: Operation[];

  operation: Operation = new Operation();

  isAuthorized: boolean = false;


 

  constructor(private elementRef: ElementRef,private formBuilder:FormBuilder,private machineService:MachineService,private phaseService:PhaseService,private operationService:OperationService,private storageService: StorageService) { }

  ngOnInit(): void {
    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    
      this.addForm=this.formBuilder.group({
        article:['',[Validators.required]],
        name:['',[Validators.required]],
        temps:['',[Validators.required]],
        phase:['',[Validators.required]],
        machine:['',[Validators.required]],
        code:['',[Validators.required]]
        
      })
      this.listeMachines();
      this.listePhases();
      this.getOperations();

    
  }

  saveOperation(){
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
  
    this.operationService.createOperation(this.selectedPhase, this.selectedMachine,this.operation).subscribe(
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
            title: 'Opération ajoutée avec succès!'
          });
        
          
        }
        
      }
    );
  }
  

  private getOperations (){
    this.operationService.getOperationList().subscribe(data=>{
      this.operations=data;
    });
    
    
  }

  selectChangeHandlerMachine(event: any) {
    // update the ui
    this.selectedMachine = event.target.value;
    console.log(this.selectedMachine);
  }

  selectChangeHandlerPhase(event: any) {
    // update the ui
    this.selectedPhase = event.target.value;
    console.log(this.selectedPhase);
  }

  listeMachines(){
    this.machineService.getMachineList().subscribe(data=>{
      this.machines=data;
    });
  }

  listePhases(){
    this.phaseService.getPhasesList().subscribe(data=>{
      this.phases=data;
    });
  }

 
  


 
}
