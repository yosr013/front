import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  email!: string;
  newPassword!: string;
  newConfirmation!: string;

  isLoggedIn = false;
  passwordForm!:FormGroup
  submitted=false
  constructor(private storageService: StorageService,private formBuilder:FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group(
      {
        password: ['', [Validators.required]],
        passwordConfirm: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
      },
      { validator: this.passwordMatchValidator }
    );

    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('passwordConfirm');

    if (
      passwordControl?.value &&
      confirmPasswordControl?.value &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl?.setErrors({ mustMatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  resetPassword(): void {
  this.submitted=true;
  if (this.passwordForm.invalid) {
    return;
  }

  this.authService.resetPassword(this.email, this.newPassword, this.newConfirmation)
    .subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      },
      error => {
        let errorMessage = "Cet utilisateur n'existe pas";

        if (error && error.error && error.error.message) {
          errorMessage = error.error.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
        console.error(error);
      }
    );
}

  
  
}








  


