import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/service/modele.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  editForm!:FormGroup
  submitted=false
  modele: Modele = new Modele();
  id!:number;
  
  constructor(private modeleService: ModeleService,private route:ActivatedRoute,private router :Router,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.editForm=this.formBuilder.group({
      designation:['',[Validators.required]],
      des:['',Validators.required]
      
    })
    this.id=this.route.snapshot.params['id'];

    this.modeleService.getModeleById(this.id).subscribe(data=>{
      this.modele=data;
    },error=>console.log(error));

  }

 

  onSubmit(){
    this.submitted=true;
    if (this.editForm.invalid) {
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
  
    this.modeleService.updateModele(this.id,this.modele).subscribe(
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
            title: 'Modèle modifié avec succès!'
          });
          this.goToModelesList();
        }
        
      }
    );
  }

  goToModelesList(){
    this.router.navigate(['/tooltips']);
  }

}
