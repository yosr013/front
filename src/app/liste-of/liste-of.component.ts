import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { OrdreFab } from '../models/ordre-fab';
import { OrdreFabService } from '../service/ordre-fab.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-liste-of',
  templateUrl: './liste-of.component.html',
  styleUrls: ['./liste-of.component.css']
})
export class ListeOfComponent implements OnInit {

  ordres!: OrdreFab[];

  constructor(private ordreFabService: OrdreFabService,private router:Router,private elementRef: ElementRef) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
    this.getOrdres()
  }

  private getOrdres (){
    this.ordreFabService.getOrdreFabList().subscribe(data=>{
      this.ordres=data;
    });
}

ordreFabDetails(id: number){
  this.router.navigate(['ordre-details', id]);
}

affichierChart(id:number){
  this.router.navigate(['charts-chartjs',id]);
}

genererPDF(ordreId:number): void {
   // Remplacez par l'ID de l'ordre que vous souhaitez générer le PDF
   this.ordreFabService.generatePDF(ordreId).subscribe(response => {
    const blob = response.body;
    if (blob !== null) {
      this.downloadFile(blob);
    } else {
      console.error("The response body is null."); // Display an error message or handle the case appropriately
    }
  });
  
}

downloadFile(blob: Blob): void {
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'ordre.pdf';
  link.click();
}





}