import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  
  roles: string[] = [];
  isAuthorized: boolean = false;
  isAuthorizedAdmin: boolean = false;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.isAuthorized = this.storageService.getUser().roles.includes('ROLE_CHEF');
    this.isAuthorizedAdmin=this.storageService.getUser().roles.includes('ROLE_ADMIN');
    
  }
  }


