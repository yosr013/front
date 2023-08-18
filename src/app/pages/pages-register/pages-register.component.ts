import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {

  
  
  id !:number
  user!:User


  constructor(private route:ActivatedRoute , private userService :UserService) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];

    this.user=new User();
    this.userService.getUserById(this.id).subscribe(data=>{
      this.user=data;
    }); 
}
     
      
  }

  
    


