import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/service/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms-editors',
  templateUrl: './forms-editors.component.html',
  styleUrls: ['./forms-editors.component.css']
})
export class FormsEditorsComponent implements OnInit {

  editClForm!:FormGroup
  submitted=false

  client: Client = new Client();
  id!:number;
  


  constructor(private formBuilder:FormBuilder,private clientService: ClientService,private route:ActivatedRoute,private router :Router) { }

  ngOnInit() {

    this.editClForm=this.formBuilder.group({
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

    this.id=this.route.snapshot.params['id'];

    this.clientService.getClientById(this.id).subscribe(data=>{
      this.client=data;
    },error=>console.log(error));

   
  }


  

  onSubmit(){
    this.submitted=true;
    if (this.editClForm.invalid) {
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
  
    this.clientService.updateClient(this.id,this.client).subscribe(
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
            title: 'Client modifié avec succès!'
          });
          this.goToClientsList();
        }
      }
    );
  }
  

  goToClientsList(){
    this.router.navigate(['/tables-general']);
  }
}
