import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/service/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.css']
})
export class ListGroupComponent implements OnInit {

  article: Article = new Article();
  id!:number;
  submitted=false;
  editForm!:FormGroup

  constructor(private articleService: ArticleService,private route:ActivatedRoute,private router :Router,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.editForm=this.formBuilder.group({
      libelle:['',[Validators.required]],
      theme:['',Validators.required],
      prixFacon:['',Validators.required],
      prixFini:['',Validators.required],
      couleur:['',Validators.required]
      
    })
    this.id=this.route.snapshot.params['id'];

    this.articleService.getArticleById(this.id).subscribe(data=>{
      this.article=data;
      console.log(data)
    },error=>console.log(error));
  }
  
    onSubmit(){
      this.submitted=true;
      if (this.editForm.invalid) {
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
    
      this.articleService.updateArticle(this.id,this.article).subscribe(
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
              title: 'Article modifié avec succès!'
            });
            this.goToArticlesList();
          }
        }
      );
    }

  goToArticlesList(){
    this.router.navigate(['/cards']);
  }

}
