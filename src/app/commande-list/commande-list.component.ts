import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Commande } from '../models/commande';
import { CommandeService } from '../service/commande.service';
import { Router } from '@angular/router';
import { StorageService } from '../service/storage.service';
import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css']
})
export class CommandeListComponent implements OnInit,AfterViewInit{

  commandes!: Commande[];
  isLoggedIn = false;
  isAuthorized: boolean = false;
 

  constructor(private commandeService: CommandeService,private elementRef: ElementRef,private router:Router,private storageService: StorageService) { }

  ngOnInit(): void {

    this.isLoggedIn = this.storageService.isLoggedIn();
    
    this.getCommandes();

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');
  }

   getCommandes (){
    this.commandeService.getCommandesList().subscribe(data=>{
      this.commandes=data;
    });
  }

  updateCommande(id:number){
    this.router.navigate(['edit-commande',id]);
  }

  deleteCommande(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous vraiment supprimer cette commande?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer !',
      cancelButtonText: 'Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.deleteCommande(id).subscribe(data=>{
          console.log(data);
        }) ;
        ;
        swalWithBootstrapButtons.fire(
          'Commande supprimée avec succès!',
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

  genererPDF(commandeId:number): void {
    // Remplacez par l'ID de l'ordre que vous souhaitez générer le PDF
    this.commandeService.generatePDF(commandeId).subscribe(response => {
     const blob = response.body;
     if (blob !== null) {
       this.downloadFile(blob);
     } else {
       console.error("The response body is null."); // Display an error message or handle the case appropriately
     }
   });
   
 }
 
 downloadFile(blob: Blob): void {
   const link = document.createElement('a');
   link.href = window.URL.createObjectURL(blob);
   link.download='commande';
   link.click();
 }

 ngAfterViewInit() {
  $(this.elementRef.nativeElement).find('#myTable').DataTable({
    paging: true,
    searching: true
  });
}
  
 
}
