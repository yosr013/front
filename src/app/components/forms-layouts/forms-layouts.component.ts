import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forms-layouts',
  templateUrl: './forms-layouts.component.html',
  styleUrls: ['./forms-layouts.component.css']
})
export class FormsLayoutsComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null,
    confirmation:null,
    name:null,
    numTel:null,
    adresse:null,
    

  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  

  



  constructor(private authService: AuthService,private router :Router) { }

  ngOnInit() {
  }

  onSubmit() {
    const { username, email, password, confirmation, name, numTel, adresse } = this.form;
  
    this.authService.register(username, email, password, confirmation, name, numTel, adresse).subscribe({
      next: data => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Utilisateur ajouté avec succès !',
        }).then(() => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        });
        this.goToUsersList();
      },
      error: err => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.message,
        }).then(() => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        });
      }
    });
  }
  

  goToUsersList(){
    this.router.navigate(['/users-liste']);
  }

  passwordsMatch(): boolean {
    return this.form.password === this.form.confirmation;
  }
  

}

