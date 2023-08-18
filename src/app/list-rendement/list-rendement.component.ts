import { Component, ElementRef, OnInit } from '@angular/core';
import { Rendement } from '../models/rendement';
import { RendementService } from '../service/rendement.service';

@Component({
  selector: 'app-list-rendement',
  templateUrl: './list-rendement.component.html',
  styleUrls: ['./list-rendement.component.css']
})
export class ListRendementComponent implements OnInit {

  rendements!: Rendement[];

  constructor(private rendementService: RendementService,private elementRef: ElementRef) { }



  ngOnInit(): void {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.getRendements();

  }

  getRendements (){
    this.rendementService.getRendementList().subscribe(data=>{
      this.rendements=data;
    });

}
}
