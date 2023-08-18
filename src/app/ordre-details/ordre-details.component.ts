import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrdreFab } from '../models/ordre-fab';
import { OrdreFabService } from '../service/ordre-fab.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ordre-details',
  templateUrl: './ordre-details.component.html',
  styleUrls: ['./ordre-details.component.css']
})
export class OrdreDetailsComponent implements OnInit {

  id!:number;
  ordreFab!:OrdreFab

  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(private ordreFabService:OrdreFabService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    this.ordreFab=new OrdreFab();
    this.ordreFabService.getOrdreFabById(this.id).subscribe(data=>{
      this.ordreFab=data;
      console.log(data)
    }); 
}

  

}
  


