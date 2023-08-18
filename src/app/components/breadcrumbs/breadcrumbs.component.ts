import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Modele } from 'src/app/models/modele';
import { ArticleService } from 'src/app/service/article.service';
import { ModeleService } from 'src/app/service/modele.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  modeles!: Modele[];
  id!: number;
  selectedModele!: number;
  article: Article = new Article();
  isLoggedIn = false;
  



  constructor(private formBuilder:FormBuilder, private modeleService:ModeleService,private articleService:ArticleService,private router:Router,private storageService: StorageService ) { }

  ngOnInit():void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.addForm=this.formBuilder.group({
      libelle:['',[Validators.required]],
      modele:['',[Validators.required]],
      theme:['',[Validators.required]],
      couleur:['',[Validators.required]],
      prixFacon:['',[Validators.required]],
      prixFini:['',[Validators.required]],
    })

    this.listeModeles();
    
    
  }

  selectChangeHandlerModele(event: any) {
    // update the ui
    this.selectedModele = event.target.value;
    console.log(this.selectedModele);
  }

  saveArticle(){
    this.articleService.addArticle(this.selectedModele,this.article,).subscribe( data =>{
      console.log(data);
      
    },
    error => console.log(error));
  }
  

  

  listeModeles(){
    this.modeleService.getModeleList().subscribe(data=>{
      this.modeles=data;
    });
  }

  goToArticleList(){
    this.router.navigate(['/cards']);
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
  
    this.articleService.addArticle(this.selectedModele, this.article).subscribe(
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
            title: 'Article ajoutée avec succès!'
          });
          this.goToArticleList();
        }
      }
    );
  }

  
  }

 

  
    
 

  




