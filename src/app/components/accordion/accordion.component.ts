import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Operation } from 'src/app/models/operation';
import { OperationService } from 'src/app/service/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  id!:number;
  submitted=false
  editForm!:FormGroup
  operation: Operation = new Operation();

  constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private operationService:OperationService) { }

  ngOnInit(): void {
    this.editForm=this.formBuilder.group({
      name:['',[Validators.required]],
      temps:['',[Validators.required]],
      code:['',[Validators.required]],
    })
    this.id=this.route.snapshot.params['id'];
    this.operationService.getOperationById(this.id).subscribe(data=>{
      this.operation=data;
      console.log(data)
    },error=>console.log(error));
  }

  onSubmit() {
    this.submitted = true;
  
    if (this.editForm.invalid) {
      return;
    }
    this.operationService.updateOperation(this.id, this.operation)
    .subscribe(
      response => {
        console.log('Opération modifiée avec succès !', response);
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Opération modifiée avec succès !'
        });
      },
      error => {
        console.error('Erreur lors de la mise à jour de l\'opération', error);
        let errorMessage = 'Une erreur est survenue lors de la mise à jour de l\'opération. Veuillez réessayer.';
        
        // Vérifiez le type d'erreur et définissez le message d'erreur approprié
        if (error.status === 400) {
          errorMessage = error.error;
        } else if (error.status === 404) {
          errorMessage = 'Opération non trouvée.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: errorMessage
        });
      }
    );
   
  }
  
}



