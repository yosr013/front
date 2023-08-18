import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/service/modele.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spinners',
  templateUrl: './spinners.component.html',
  styleUrls: ['./spinners.component.css']
})
export class SpinnersComponent implements OnInit {

  addMoForm!:FormGroup
  submitted=false
  isLoggedIn = false;
  
  
  modele: Modele = new Modele();
  constructor(private formBuilder :FormBuilder,private modeleService:ModeleService,private router :Router,private storageService: StorageService) { }

  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.addMoForm=this.formBuilder.group({
      desg:['',Validators.required],
      des:['',Validators.required]
    })
  }

  goToModelesList(){
    this.router.navigate(['/tooltips']);
  }

  
  

  onSubmit(){
    this.submitted=true;
    if (this.addMoForm.invalid) {
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
  
    this.modeleService.createModele(this.modele).subscribe(
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
            title: 'Modèle ajouté avec succès!'
          });
          this.goToModelesList();
        }
        
      }
    );
  }
  
  
  

}
