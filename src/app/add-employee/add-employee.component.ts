import { Component, OnInit } from '@angular/core';
import { Employe } from '../models/employe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from '../service/employe.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  addClForm!:FormGroup
  submitted=false
  
  
  employe: Employe = new Employe();

  constructor(private formBuilder:FormBuilder,private employeService: EmployeService,private router :Router) { }

  ngOnInit() {
    this.addClForm=this.formBuilder.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      numTel:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      matricule:['',[Validators.required,Validators.minLength(4),Validators.maxLength(4)]]
      
    })
  }

  goToEmployeList(){
    this.router.navigate(['/list-employees']);
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
  
    this.employeService.createEmployee(this.employe).subscribe(
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
            title: 'Employé ajouté avec succès!'
          });
          this.goToEmployeList();
        }
      }
    );
  }

}
