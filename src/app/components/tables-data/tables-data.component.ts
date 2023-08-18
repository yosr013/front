import { Component, OnInit, ElementRef } from '@angular/core';
import { Client } from 'src/app/models/client';
import { CommandeDTO } from 'src/app/models/commande-dto';
import { ClientService } from 'src/app/service/client.service';
import { CommandeService } from 'src/app/service/commande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables-data',
  templateUrl: './tables-data.component.html',
  styleUrls: ['./tables-data.component.css']
})
export class TablesDataComponent implements OnInit {

  clients!: Client[];
commandes!:CommandeDTO;
  

  constructor(private elementRef: ElementRef,private clientService : ClientService,private commandeService:CommandeService) { }

  ngOnInit():void{

    
    this.getClients();
  }

    
  private getClients(){
    this.clientService.getClientList().subscribe(data=>{
      this.clients=data;
    });
  }

  

 



  deleteClient(id:number){
    this.clientService.deleteClient(id).subscribe(data=>{
      console.log(data);
    })
  
    
    }

    delete(){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Voulez vous vraiment supprimer ce client?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui!',
        cancelButtonText: 'Annuler!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Suppression confirmé',
            'Client supprimé avec succès!',
            'success'
            
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Annulé',
            'Suppression annulé',
            'error'
          )
        }
      })


    }

     handleRowClick(item: any): void {
    // Perform the desired action when a row is clicked
    console.log('Row clicked!', item);
    // Additional code logic...
  }

}
