import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Modele } from 'src/app/models/modele';
import { ArticleService } from 'src/app/service/article.service';
import { ModeleService } from 'src/app/service/modele.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  modeles!: Modele[];
  article: Article = new Article();
  id!: number;
  selectedModele: any;
  



  constructor(private formBuilder:FormBuilder, private modeleService:ModeleService,private articleService:ArticleService,private router:Router ) { }

  ngOnInit():void {
    this.addForm=this.formBuilder.group({
      libelle:['',[Validators.required]],
      modele:['',[Validators.required]],
      taille:['',[Validators.required]],
      couelur:['',[Validators.required]],
      theme:['',[Validators.required]],
      prixFacon:['',[Validators.required]],
      prixFini:['',[Validators.required]],
      phase:['',[Validators.required]],
      dateEx:['',[Validators.required]],
      dateRe:['',[Validators.required]],
    })
    this.listeModeles();
    
  }

  listeModeles(){
    this.modeleService.getModeleList().subscribe(data=>{
      this.modeles=data;
    });
  }

  goToArticleList(){
    this.router.navigate(['/cards']);
  }

 

  saveArticle(){
    this.articleService.addArticle(this.selectedModele,this.article).subscribe( data =>{
      console.log(data);
      
    },
    error => console.log(error));

  }

  selectChangeHandlerModele(event: any) {
    // update the ui
    this.selectedModele = event.target.value;
    console.log(this.selectedModele);
  }
  

  onSubmit(){
    this.submitted=true
    this.saveArticle();
    this.goToArticleList();
    if(this.addForm.invalid){
      return
    }
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
    title: 'Article ajouté avec succès!'
    });
    
  }

  
}
