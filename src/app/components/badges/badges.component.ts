import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Machine } from 'src/app/models/machine';
import { Operation } from 'src/app/models/operation';
import { Phase } from 'src/app/models/phase';
import { MachineService } from 'src/app/service/machine.service';
import { OperationService } from 'src/app/service/operation.service';
import { PhaseService } from 'src/app/service/phase.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent implements OnInit {

  addPForm!:FormGroup
  submitted=false
  machines!: Machine[];
  phases!: Phase[];
  id!: number;
  selectedMachine!: number;
  selectedPhase!: number;

  operations!: Operation[];

  operation: Operation = new Operation();

  isAuthorized: boolean = false;


 

  constructor(private router:Router,private elementRef: ElementRef,private formBuilder:FormBuilder,private machineService:MachineService,private phaseService:PhaseService,private operationService:OperationService,private storageService: StorageService) { }

  ngOnInit(): void {
    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');
      this.addPForm=this.formBuilder.group({
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

  showErrorAlert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'error',
      title: 'Cet opération existe déja ! '
    })
  } 
  createOp() {
    this.operationService.createOperation(this.selectedPhase,this.selectedMachine,this.operation)
      .subscribe(
        response => {
          
          console.log('Opération ajouté avec succès !');
        },
        error => {
          
        }
      );
  }
  saveOperation(){
    this.createOp();
    
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

  updateOperation(id:number){
    this.router.navigate(['edit-operation',id]);
  }

  deleteOperation(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous vraiment supprimer cette opération ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer !',
      cancelButtonText: 'Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.operationService.deleteOperation(id).subscribe(data=>{
          console.log(data);
        }) ;
        ;
        swalWithBootstrapButtons.fire(
          'Opération supprimée avec succès!',
          '',
          'success'
        )
        
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Suppression annulé',
          '',
          'error'
        )
      }
    })
  }
}
