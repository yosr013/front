import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/service/article.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  articles!: Article[];
  isLoggedIn = false;
  isAuthorized: boolean = false;


  constructor(private articleService : ArticleService,private router:Router,private storageService: StorageService,) { }

  ngOnInit():void{

    this.isLoggedIn = this.storageService.isLoggedIn();
    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_ADMIN');

    this.getArticles();
    
  }

    
  private getArticles(){
    this.articleService.getArticleList().subscribe(data=>{
      this.articles=data;
    });
    
    
  }

  articleDetails(id: number){
    this.router.navigate(['modal', id]);
  }

  updateArticle(id:number){
    this.router.navigate(['list-group',id]);
  }

  deleteArticle(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous vraiment supprimé cet article?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui !',
      cancelButtonText: 'Non !',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.deleteArticle(id).subscribe(data=>{
          console.log(data);
        }) ;
        swalWithBootstrapButtons.fire(
          'Supprimé!',
          'Article supprimé avec succés !.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Annulé ',
          'Suppression annulé ! ',
          'error'
        )
      }
    })
  }
}
