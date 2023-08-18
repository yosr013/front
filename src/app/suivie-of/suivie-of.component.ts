import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdreFab } from '../models/ordre-fab';
import { OrdreFabService } from '../service/ordre-fab.service';
import { SuiviProd } from '../models/suivi-prod';
import { SuiviProdService } from '../service/suivi-prod.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-suivie-of',
  templateUrl: './suivie-of.component.html',
  styleUrls: ['./suivie-of.component.css']
})
export class SuivieOfComponent implements OnInit {

  suiviForm!:FormGroup
  submitted=false
  ordres!: OrdreFab[];
  selectedOrdre!: number;

  suiviProd: SuiviProd = new SuiviProd();


  constructor(private formBuilder:FormBuilder,private ordreService:OrdreFabService,private suiviService:SuiviProdService) { }

  ngOnInit(): void {
    this.suiviForm=this.formBuilder.group({
      nbrePiDe:['',[Validators.required]],
      ordre:['',[Validators.required]],
      dateFinAc:['',[Validators.required]],
      periodeFabActuelle:['',[Validators.required]],
      periodeFabPrevue:['',[Validators.required]]
      
      
    })
    this.listeOrdres();
  }

  onSubmit(){
    this.submitted=true
    this.saveSuivi();
    if(this.suiviForm.invalid){
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
    title: 'Suivi ajouté avec succès!'
    });

  }
  
  listeOrdres(){
    this.ordreService.getOrdreFabList().subscribe(data=>{
      this.ordres=data;
    });
  }

  saveSuivi(){
    this.suiviService.addSuivi(this.selectedOrdre,this.suiviProd).subscribe( data =>{
    },
    error => console.log(error));
  }

  selectChangeHandlerOrdre(event: any) {
    // update the ui
    this.selectedOrdre = event.target.value;
    console.log(this.selectedOrdre);
  }

}
