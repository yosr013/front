import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/service/article.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  id!:number;
  article!:Article

  constructor(private articleService:ArticleService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

      this.article=new Article();
      this.articleService.getArticleById(this.id).subscribe(data=>{
        this.article=data;
        console.log(data)
      }); 
  }

}
