import { Component ,ElementRef} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { EventBusService } from './_shared/event-bus.service';
import { AuthService } from './service/auth.service';
import { StorageService } from './service/storage.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admindashboard';

  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  eventBusSub?: Subscription;
  showAdminBoard = false;
  
  
isResetPassword: boolean = false;

   
 
  constructor(private elementRef: ElementRef,  public  _router: Router,private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventBusService,private router: Router) {
      
     }

   ngOnInit() {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
    



  }

 
   
}
