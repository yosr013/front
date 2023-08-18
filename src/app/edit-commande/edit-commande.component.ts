import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../service/commande.service';
import { Commande } from '../models/commande';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-commande',
  templateUrl: './edit-commande.component.html',
  styleUrls: ['./edit-commande.component.css']
})
export class EditCommandeComponent implements OnInit {

  addCoForm!:FormGroup
  submitted=false
  id!: number;
  commande: Commande = new Commande();

  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private router :Router,private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.addCoForm=this.formBuilder.group({
      dateEntree:['',[Validators.required]],
      dateLivraison:['',[Validators.required]],
      qte:['',[Validators.required]],
      saison:['',[Validators.required]],
      ref:['',[Validators.required]],
    })

    this.id=this.route.snapshot.params['id'];

    this.commandeService.getCommandeById(this.id).subscribe(data=>{
      this.commande=data;
    },error=>console.log(error));
  }
  

  onSubmit() {
    this.submitted = true;
    if (this.addCoForm.invalid) {
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
  
    this.commandeService.updateCommande(this.id, this.commande).subscribe(
      () => {
        Toast.fire({
          icon: 'success',
          title: 'Commande modifiée avec succès!'
        });
        this.goToCommandesList();
      },
      (error) => {
        if (error.status === 400) {
          Toast.fire({
            icon: 'error',
            title: error.error
          });
        } else {
          console.error('Erreur lors de la modification de la commande', error);
          Toast.fire({
            icon: 'error',
            title: 'Une erreur s\'est produite lors de la modification de la commande ! '
          });
        }
      }
    );
  }
  
  goToCommandesList(){
    this.router.navigate(['/commande-liste']);
  }

}
