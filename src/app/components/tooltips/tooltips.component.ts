import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modele } from 'src/app/models/modele';
import { ModeleService } from 'src/app/service/modele.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tooltips',
  templateUrl: './tooltips.component.html',
  styleUrls: ['./tooltips.component.css']
})
export class TooltipsComponent implements OnInit {

  modeles!: Modele[];
  isAuthorized: boolean = false;
  

  constructor(private modeleService :ModeleService,private router:Router,private storageService:StorageService) { }

  ngOnInit(): void {
    this.getModeles();
    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');
    
  }

  getModeles (){
    this.modeleService.getModeleList().subscribe(data=>{
      this.modeles=data;
    });
  }

  

  
  deleteModele(id:number){
    //définir une configuration personnalisée pour la boîte de dialogue de confirmation en utilisant la fonction
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true //Cette configuration inclut le style des boutons qui utilise les styles de Bootstrap.
    })
    
    // la boîte de dialogue est affichée 
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous vraiment supprimer ce modèle?', //le titre de la boite
      text: "",
      icon: 'warning', //l'icône d'avertissement
      showCancelButton: true,
      confirmButtonText: 'Supprimer !', //le texte du bouton de confirmation
      cancelButtonText: 'Annuler !', //le texte du bouton d'annulation
      reverseButtons: true
      //la fonction de rappel then() est appelée avec le résultat de l'action
    }).then((result) => {
      if (result.isConfirmed) {
        this.modeleService.deleteModele(id).subscribe(data=>{
          console.log(data);
        }) ;
        this.goToModelesList();
        swalWithBootstrapButtons.fire(
          'Modèle supprimé avec succès!',
          '',
          'success'
        )
        
        
      } else if (
        /*vérifie si la raison de l'annulation est Swal.DismissReason.cancel. Si c'est le cas, une autre boîte de dialogue est affichée avec un message indiquant l'annulation de la suppression. */
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

    goToModelesList(){
      this.router.navigate(['/tooltips']);
    }

    updateModele(id:number){
      this.router.navigate(['carousel',id]);
    }

  


  
  }



  
    
  




