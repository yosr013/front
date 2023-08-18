import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/service/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms-elements',
  templateUrl: './forms-elements.component.html',
  styleUrls: ['./forms-elements.component.css']
})
export class FormsElementsComponent implements OnInit {

  addClForm!:FormGroup
  submitted=false
  
  
  client: Client = new Client();
  



  constructor(private formBuilder:FormBuilder,private clientService: ClientService,private router :Router) { }

  ngOnInit() {
    this.addClForm=this.formBuilder.group({
      raisonSociale:['',[Validators.required]],
      numTel:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      adresse:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      activite:['',[Validators.required]],
      ville:['',[Validators.required]],
      region:['',[Validators.required]],
      code :['',[Validators.required]],
      fax:['',[Validators.required]],
      pays:['',[Validators.required]],
      telFix:['',Validators.required],
      codePostal:['',Validators.required]
    })
  }

  goToClientsList(){
    this.router.navigate(['/tables-general']);
  }

  
  

  onSubmit(){
    this.submitted=true;
    if (this.addClForm.invalid) {
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
  
    this.clientService.createClient(this.client).subscribe(
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
            title: 'Client ajoutée avec succès!'
          });
          this.goToClientsList();
        }
      }
    );
  }
  
  
  

}


