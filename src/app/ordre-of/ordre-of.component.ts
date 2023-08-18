import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Gamme } from '../models/gamme';
import Swal from 'sweetalert2';
import { GammeService } from '../service/gamme.service';
import { Commande } from '../models/commande';
import { CommandeService } from '../service/commande.service';
import { OrdreFabService } from '../service/ordre-fab.service';
import { OrdreFab } from '../models/ordre-fab';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordre-of',
  templateUrl: './ordre-of.component.html',
  styleUrls: ['./ordre-of.component.css']
})
export class OrdreOfComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  gammes!: Gamme[];
  commandes!: Commande[];
  selectedGamme!: number;
  selectedCommande!: number;

  ordreFab: OrdreFab = new OrdreFab();
  
  constructor(private formBuilder:FormBuilder,private gammeService:GammeService,private commandeService:CommandeService,private ordreFabService:OrdreFabService,private router:Router) { }

  ngOnInit(): void {
    this.addForm=this.formBuilder.group({
      ref:['',[Validators.required]],
      refCo:['',[Validators.required]],
      refGa:['',[Validators.required]],
      dateFab:['',[Validators.required]],
      dateFin:['',[Validators.required]],
      qte:['',[Validators.required]]
      
    })
    this.listeGammes();
    this.listeCommandes();
  }

  listeGammes(){
    this.gammeService.getGammesList().subscribe(data=>{
      this.gammes=data;
    });
  }

  listeCommandes(){
    this.commandeService.getCommandesList().subscribe(data=>{
      this.commandes=data;
    });
  }

  

  onSubmit(){
    this.submitted=true;
    if (this.addForm.invalid) {
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
  
    this.ordreFabService.createOrdreFabrication(this.selectedCommande, this.selectedGamme, this.ordreFab).subscribe(
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
            title: 'Ordre de fabrication ajoutée avec succès!'
          });
        
          this.goToOFList();
        }
        
      }
    );


  }

  goToOFList(){
    this.router.navigate(['/list-of']);
  }

  selectChangeHandlerGamme(event: any) {
    // update the ui
    this.selectedGamme = event.target.value;
    console.log(this.selectedGamme);
  }

  selectChangeHandlerCommande(event: any) {
    // update the ui
    this.selectedCommande = event.target.value;
    console.log(this.selectedCommande);
  }

}
