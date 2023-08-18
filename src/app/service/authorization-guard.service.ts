import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthorizationGuardService implements CanActivate{

  constructor(private router: Router, private storageService: StorageService,private authService: AuthService,) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.storageService.isLoggedIn() || !this.storageService.getUser().roles.includes('ROLE_CHEF')) {
      this.router.navigateByUrl('/pages-error404');
      return false;
    }
    return true;
}
}

  


  

