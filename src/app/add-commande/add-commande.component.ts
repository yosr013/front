import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Commande } from '../models/commande';
import { Client } from '../models/client';
import { Article } from '../models/article';
import Swal from 'sweetalert2';
import { ClientService } from '../service/client.service';
import { ArticleService } from '../service/article.service';
import { ChaineService } from '../service/chaine.service';
import { Chaine } from '../models/chaine';
import { CommandeService } from '../service/commande.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-commande',
  templateUrl: './add-commande.component.html',
  styleUrls: ['./add-commande.component.css']
})
export class AddCommandeComponent implements OnInit {

  addCoForm!:FormGroup
  submitted=false
  selectedClient!: number;
  selectedArticle!:number;
  clients!: Client[];
  articles!: Article[];
 

  commande: Commande = new Commande();



  constructor(private formBuilder:FormBuilder,private clientService:ClientService,private articleService:ArticleService,private commandeService:CommandeService,private router:Router) { }

  ngOnInit(): void {
    this.addCoForm=this.formBuilder.group({
      client:['',[Validators.required]],
      article:['',[Validators.required]],
      dateEntree:['',[Validators.required]],
      dateLivraison:['',[Validators.required]],
      qte:['',[Validators.required]],
      saison:['',[Validators.required]],
      ref:['',[Validators.required]],
      


    })
    this.listeClients();
    this.listeArticles();

  }


  
  
  onSubmit(){
    this.submitted=true;
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
  
    this.commandeService.createCommande(this.selectedArticle, this.selectedClient, this.commande).subscribe(
      (response) => {
      },
      (error) => {
        if (error.status === 400) {
          Toast.fire({
            icon: 'error',
            title: error.error
          });
        } else if (error.status === 404) {
          Toast.fire({
            icon: 'error',
            title: 'Article ou client introuvable'
          });
        } else {
          Toast.fire({
            icon: 'success',
            title: 'Commande ajoutée avec succès!'
          });
          this.goToCommandeList();
        }
        
      }
    );
  }
    
  
  
  
  
  
  

  selectChangeHandlerClient(event: any) {
    // update the ui
    this.selectedClient = event.target.value;
    console.log(this.selectedClient);
  }

  

  selectChangeHandlerArticle(event: any) {
    // update the ui
    this.selectedArticle = event.target.value;
    console.log(this.selectedArticle);
  }

  listeClients(){
    this.clientService.getClientList().subscribe(data=>{
      this.clients=data;
    });
  }

  listeArticles(){
    this.articleService.getArticleList().subscribe(data=>{
      this.articles=data;
    });
  }

  goToCommandeList(){
    this.router.navigate(['/commande-liste']);
  }

  
  

}
