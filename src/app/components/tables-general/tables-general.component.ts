import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/service/client.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-tables-general',
  templateUrl: './tables-general.component.html',
  styleUrls: ['./tables-general.component.css']
})
export class TablesGeneralComponent implements OnInit{
 

  clients!: Client[];
  
  roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  showListeClients = false;
  isAuthorized: boolean = false;
  

  constructor(private clientService : ClientService,private router:Router,private storageService:StorageService) { }
  
  

  ngOnInit():void{

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      

      this.username = user.username;
    }

  this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');
   this.getClients();
    
    
  }

    
  private getClients (){
    this.clientService.getClientList().subscribe(data=>{
      this.clients=data;
    });
    
    
  }

  deleteClient(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous vraiment supprimer ce client?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer !',
      cancelButtonText: 'Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.deleteClient(id).subscribe(data=>{
          console.log(data);
        }) ;
        
        swalWithBootstrapButtons.fire(
          'Client supprimé avec succès!',
          '',
          'success'
        )
        this.goToClientsList(); 
        
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

    updateClient(id:number){
      this.router.navigate(['form-editors',id]);
    }

    clientDetails(id: number){
      this.router.navigate(['pages-blank', id]);
    }

    goToClientsList(){
      this.router.navigate(['/tables-general']);
    }

    
    
    

    

}



