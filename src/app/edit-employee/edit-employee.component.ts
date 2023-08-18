import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from '../service/employe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employe } from '../models/employe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  editForm!:FormGroup
  submitted=false
  employe: Employe = new Employe();
  id!:number;

  constructor(private formBuilder:FormBuilder,private employeService: EmployeService,private route:ActivatedRoute,private router :Router) { }

  ngOnInit(): void {
    this.editForm=this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      numTel:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      matricule:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]]
      
    })

    this.id=this.route.snapshot.params['id'];

    this.employeService.getEmployeById(this.id).subscribe(data=>{
      this.employe=data;
    },error=>console.log(error));
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
      title: 'Cet employé existe déja ! '
    })
  } 
  updateEmploye() {
    this.employeService.updateEmployee(this.id, this.employe)
      .subscribe(
        response => {
         
          console.log('Employé mis à jour avec succès !');
        },
        error => {
          this.showErrorAlert();
          console.error('Erreur lors de la mise à jour de l\'employé :');
        }
      );
  }

  onSubmit(){
    this.submitted=true;
    this.updateEmploye();
    if(this.editForm.invalid){
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
    title: 'Employé modifié avec succès!'
    })

    this.goToEmployeesList();
  }

  goToEmployeesList(){
    this.router.navigate(['/list-employees']);
  }

  

}
