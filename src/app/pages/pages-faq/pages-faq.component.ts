import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pages-faq',
  templateUrl: './pages-faq.component.html',
  styleUrls: ['./pages-faq.component.css']
})
export class PagesFaqComponent implements OnInit {

  id!:number;
  editForm!:FormGroup
  submitted=false

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
  
    this.userService.updateUser(this.id,this.user).subscribe(
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
            title: 'Utilisateur modifié avec succès!'
          });
          this.goToUsersList();
        }
      }
    );

  }

  goToUsersList(){
    this.router.navigate(['/users-liste']);
  }

}
