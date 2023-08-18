import { Component, OnInit } from '@angular/core';
import { Employe } from '../models/employe';
import { ActivatedRoute } from '@angular/router';
import { EmployeService } from '../service/employe.service';

@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.css']
})
export class DetailsEmployeeComponent implements OnInit {

  id !:number
  employe!:Employe

  constructor(private route:ActivatedRoute , private employeService :EmployeService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

      this.employe=new Employe();
      this.employeService.getEmployeById(this.id).subscribe(data=>{
        this.employe=data;
      }); 
  }
  }


