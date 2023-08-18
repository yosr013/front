import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-liste',
  templateUrl: './user-liste.component.html',
  styleUrls: ['./user-liste.component.css']
})
export class UserListeComponent implements OnInit {

  users!: User[];

  constructor(private userService : UserService,private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers (){
    this.userService.getUserList().subscribe(data=>{
      this.users=data;
    });
  }

  updateUser(id:number){
    this.router.navigate(['user-edit',id]);
  }

  deleteUser(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous vraiment supprimer cet utilisateur ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer !',
      cancelButtonText: 'Annuler !',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(data=>{
          console.log(data);
        }) ;
        ;
        swalWithBootstrapButtons.fire(
          'Utilisateur supprimé avec succès!',
          '',
          'success'
        )
        
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Suppression annulé',
          '',
          'error'
        )
      }
    })
  }

  userDetails(id: number){
    this.router.navigate(['pages-register', id]);
  }

}
