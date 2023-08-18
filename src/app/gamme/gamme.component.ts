import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Gamme } from '../models/gamme';
import { GammeService } from '../service/gamme.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-gamme',
  templateUrl: './gamme.component.html',
  styleUrls: ['./gamme.component.css']
})
export class GammeComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  isAuthorized: boolean = false;

  gamme: Gamme = new Gamme();
  gammes!: Gamme[];

  constructor(private formBuilder:FormBuilder,private gammeService: GammeService,private elementRef: ElementRef,private storageService: StorageService) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');
    
    this.addForm=this.formBuilder.group({
      temps:['',[Validators.required]],
      ref:['',[Validators.required]]
    })
    this.getGammes();

   
  }

  saveGamme(){
    this.gammeService.createGamme(this.gamme).subscribe( data =>{
      console.log(data);
      
    },
    error => console.log(error));
  }

  private getGammes (){
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
  
    this.gammeService.createGamme(this.gamme).subscribe(
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
            title: 'Gamme ajoutée avec succès!'
          });
        }
      }
    );
  }

}
