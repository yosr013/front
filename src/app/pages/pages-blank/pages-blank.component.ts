import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/service/client.service';

@Component({
  selector: 'app-pages-blank',
  templateUrl: './pages-blank.component.html',
  styleUrls: ['./pages-blank.component.css']
})
export class PagesBlankComponent implements OnInit {

  id !:number
  client!:Client

  constructor(private route:ActivatedRoute , private clientService :ClientService) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

      this.client=new Client();
      this.clientService.getClientById(this.id).subscribe(data=>{
        this.client=data;
      }); 
  }

}
