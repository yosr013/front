import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../models/article';
import { ArticleService } from '../service/article.service';
import Swal from 'sweetalert2';
import { Taille } from '../models/taille';
import { TailleService } from '../service/taille.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-tailles',
  templateUrl: './tailles.component.html',
  styleUrls: ['./tailles.component.css']
})
export class TaillesComponent implements OnInit {

  addForm!:FormGroup
  submitted=false
  articles!: Article[];
  selectedArticle!: number;
  taille: Taille = new Taille();

  isAuthorized: boolean = false;


  constructor(private elementRef: ElementRef,private formBuilder:FormBuilder,private articleService:ArticleService,private tailleService:TailleService,private storageService: StorageService) { }

  ngOnInit(): void {
    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.addForm=this.formBuilder.group({
      article:['',[Validators.required]],
      desg:['',[Validators.required]],
      
    })
    this.listeArticles();

    
  }

  saveTaille(){
    this.tailleService.addTaille(this.selectedArticle,this.taille,).subscribe( data =>{
      console.log(data);
      
    },
    error => console.log(error));
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
  
    this.tailleService.addTaille(this.selectedArticle, this.taille).subscribe(
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
            title: 'Taille ajoutée avec succès!'
          });
        
          
        }
        
      }
    );


  }

  selectChangeHandlerArticle(event: any) {
    // update the ui
    this.selectedArticle = event.target.value;
    console.log(this.selectedArticle);
  }

  listeArticles(){
    this.articleService.getArticleList().subscribe(data=>{
      this.articles=data;
    });
  }

}
