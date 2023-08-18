import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chaine } from 'src/app/models/chaine';
import { Machine } from 'src/app/models/machine';
import { ChaineService } from 'src/app/service/chaine.service';
import { MachineService } from 'src/app/service/machine.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pages-contact',
  templateUrl: './pages-contact.component.html',
  styleUrls: ['./pages-contact.component.css']
})
export class PagesContactComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  machine: Machine = new Machine();
  chaines!: Chaine[];
  machines!: Machine[];
  isLoggedIn = false;

  selectedChaine!: number;
  isAuthorized: boolean = false;
 
  constructor(private elementRef: ElementRef,private formBuilder:FormBuilder,private machineService:MachineService,private chaineService:ChaineService,private storageService: StorageService) { }

  ngOnInit(): void {
    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.addForm=this.formBuilder.group({
      desg:['',[Validators.required]],
      chaine:['',[Validators.required]]
      
    })
    this.getChaines();
    this.getMachines();
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

 

  selectChangeHandlerChaine(event: any) {
    // update the ui
    this.selectedChaine = event.target.value;
    console.log(this.selectedChaine);
  }

  getChaines(){
    this.chaineService.getChaineList().subscribe(data=>{
      this.chaines=data;
    })
  }

  getMachines(){
    this.machineService.getMachineList().subscribe(data=>{
      this.machines=data;
    })
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
  
    this.machineService.addMachine(this.selectedChaine,this.machine).subscribe(
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
            title: 'Machine ajoutée avec succès!'
          });
        }
        
      }
    );
  }
    
  }


