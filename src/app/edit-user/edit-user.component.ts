import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  id!:number;
  editForm!:FormGroup
  submitted=false
  successMessage!: string;

  user: User = new User();

  constructor(private route:ActivatedRoute,private formBuilder:FormBuilder,private userService:UserService,private router :Router) { }

  ngOnInit(): void {

    this.editForm=this.formBuilder.group({
      username:['',[Validators.required]],
      numTel:['',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]],
      adresse:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      cofirmation:['',[Validators.required]],
      password:['',[Validators.required]],
      name:['',[Validators.required]]
    })

    this.id=this.route.snapshot.params['id'];
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user=data;
    },error=>console.log(error));

  }

  onSubmit(){
    this.submitted=true;
    if (this.editForm.invalid) {
      return;
    }
    this.userService.updateUser(this.id, this.user)
      .subscribe(
        (response: any) => {
          // Succès de la mise à jour de l'utilisateur
          this.successMessage = response.message;
          Swal.fire({
            title: this.successMessage,
            icon: 'success',
            buttonsStyling: false
          });
          this.goToUsersList()
        },
        (error: any) => {
          // Erreur lors de la mise à jour de l'utilisateur
          const errorMessage = error;
          Swal.fire({
            title: 'Erreur',
            text: errorMessage,
            icon: 'error',
            buttonsStyling: false
          });
        }
      );

  }

  goToUsersList(){
    this.router.navigate(['/users-liste']);
  }
}
