import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chaine } from '../models/chaine';
import { ChaineService } from '../service/chaine.service';
import Swal from 'sweetalert2';
import { Machine } from '../models/machine';
import { MachineService } from '../service/machine.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-add-chaine',
  templateUrl: './add-chaine.component.html',
  styleUrls: ['./add-chaine.component.css']
})
export class AddChaineComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  chaine: Chaine = new Chaine();
  chaines!: Chaine[];
  selectedMachine!:number;
  selectedChaine!: number;
  machines!: Machine[];
  isLoggedIn = false;
  isAuthorized: boolean = false;



  constructor(private elementRef: ElementRef,private formBuilder:FormBuilder,private chaineService:ChaineService,private storageService: StorageService) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.isLoggedIn = this.storageService.isLoggedIn();
    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');

    this.addForm=this.formBuilder.group({
      code:['',[Validators.required]],
      
    })
    this.getChaines();


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
  
    this.chaineService.createChaine(this.chaine).subscribe(
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
            title: 'Chaine ajoutée avec succès!'
          });
        }
        
      }
    );
  }
  

  

  

  getChaines (){
    this.chaineService.getChaineList().subscribe(data=>{
      this.chaines=data;
    });
  }
 

  

  selectChangeHandlerMachine(event: any) {
    // update the ui
    this.selectedMachine = event.target.value;
    console.log(this.selectedMachine);
  }

  

  

  
}
