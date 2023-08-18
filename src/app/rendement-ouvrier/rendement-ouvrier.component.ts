import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employe } from '../models/employe';
import { EmployeService } from '../service/employe.service';
import Swal from 'sweetalert2';
import { Rendement } from '../models/rendement';
import { RendementService } from '../service/rendement.service';
import { Router } from '@angular/router';
import { Operation } from '../models/operation';
import { OperationService } from '../service/operation.service';
import { event } from 'jquery';

@Component({
  selector: 'app-rendement-ouvrier',
  templateUrl: './rendement-ouvrier.component.html',
  styleUrls: ['./rendement-ouvrier.component.css']
})
export class RendementOuvrierComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  employees!: Employe[];
  selectedEmploye!:number;
  selectedTime!:number;

 
  result!:number;

  result1!:number;

  @ViewChild('tempsOp', { static: false })
  tempsOp!: ElementRef;

  @ViewChild('nbrepieces', { static: false })
  nbrepieces!: ElementRef;

  @ViewChild('tempsPres', { static: false })
  tempsPres!: ElementRef;

  @ViewChild('tempsOpEs', { static: false })
  tempsOpEs!: ElementRef;

  

 
  operations!: Operation[];
  rendement: Rendement = new Rendement();
  rendementt: any
  selectedOperation: Operation | undefined ;
 

  
 //Le constructeur de la classe est utilisé pour injecter les dépendances nécessaires
  constructor(private router :Router,private formBuilder:FormBuilder,private employeService:EmployeService,private rendementService:RendementService,private operationService:OperationService) { }

  //ngOnInit est une méthode du cycle de vie du composant qui est exécutée une fois que le composant est initialisé.
  ngOnInit(): void {
    this.addForm=this.formBuilder.group({
      matricule:['',[Validators.required]],
      tempsOp:['',[Validators.required]],
      tempsOpEs:['',[Validators.required]],
      nbre:['',[Validators.required]],
      tempsPre:['',[Validators.required]],
      date:['',[Validators.required]],
      dateDebut:['',[Validators.required]],
      dateFin:['',[Validators.required]],
      nomOp:['',Validators.required]
      
      
    })
    this.listeOuvriers();
    this.getOperations();
    
    
    
  }

  calculer ():number{
    const tempsProduit=this.tempsOp.nativeElement.value*this.nbrepieces.nativeElement.value
    const tempsPres=this.tempsPres.nativeElement.value*60
    const result=Math.round((tempsProduit/tempsPres)*100)
    return result;
  }

  calculerEs ():number{
    const tempsProduit=this.rendement.tempsOpeEs*this.nbrepieces.nativeElement.value
    const tempsPres=this.tempsPres.nativeElement.value*60
    const result=Math.round((tempsProduit/tempsPres)*100)
    return result;
  }

  

  

  onOperationSelect(event: any)   {
    this.selectedTime = event.target.value;
    console.log(this.selectedTime)
    this.rendement.tempsOpeEs = this.selectedTime;
  }



  selectChangeHandlerEmploye(event: any) {
    // update the ui
    this.selectedEmploye = event.target.value;
    console.log(this.selectedEmploye);
  }

  goToRendementList(){
    this.router.navigate(['/list-rendement']);
  }

  getOperations(){
    this.operationService.getOperationList().subscribe(data=>{
      this.operations=data;
    })
  }



  onSubmit(){
    this.submitted=true
    if(this.addForm.invalid){
      return
    }
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
      icon: 'success',
    title: 'Rendement generé avec succès!'
    });

    this.calculer();
    this.calculerEs();
    this.rendementt = {
      date: this.addForm.value.date,
      employe: this.addForm.value.matricule,
      tempsOpe: this.addForm.value.tempsOp,
      nbrePiProduites: this.addForm.value.nbre,
      tempsPre: this.addForm.value.tempsPre,
      rendement: this.calculer(),
      rendementEs :this.calculerEs(),
      tempsOpeEs: this.rendement.tempsOpeEs,
      dateDebut: this.addForm.value.dateDebut,
      dateFin: this.addForm.value.dateFin,
    };

    this.rendementService.addRendement(this.selectedEmploye,this.rendementt).subscribe(
      response => {
        // Réponse de succès de la requête
        console.log('Rendement stocké avec succès dans la base de données.');
      }
    )
    this.goToRendementList();
  }


  listeOuvriers(){
    this.employeService.getEmployeesList().subscribe(data=>{
      this.employees=data;
    });
  }
}
