import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  currentUser: any;

  constructor(private storageService: StorageService,) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

}
