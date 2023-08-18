import { Component, OnInit } from '@angular/core';
import { Employe } from '../models/employe';
import { EmployeService } from '../service/employe.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employees!: Employe[];

  constructor(private employeService : EmployeService,private router:Router) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  private getEmployees (){
    this.employeService.getEmployeesList().subscribe(data=>{
      this.employees=data;
    });
    
    
  }

  deleteEmployee(id:number){
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Voulez vous vraiment supprimer cet employé?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui!',
      cancelButtonText: 'Non!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeService.deleteEmploye(id).subscribe(data=>{
          console.log(data);
        }) ;
        this.goToEmployeesList();
        swalWithBootstrapButtons.fire(
          'Employé supprimé avec succès!',
          '',
          'success'
        )
        
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Suppression annulé',
          '',
          'error'
        )
      }
    })
    }
  
      updateEmployee(id:number){
        this.router.navigate(['edit-employee',id]);
      }
  
      employeeDetails(id: number){
        this.router.navigate(['details-employee', id]);
      }
  
      

    

    goToEmployeesList(){
      this.router.navigate(['/list-employees']);
    }

}
