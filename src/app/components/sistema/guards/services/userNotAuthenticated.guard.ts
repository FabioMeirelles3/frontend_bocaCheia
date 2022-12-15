import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../login/users/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserNotAuthenticatedGuard implements CanActivate{
    constructor(
      private userService: UserService,
      private router: Router) { }

      canActivate(){
        if (this.userService.logged) {
          this.router.navigate(['restaurant']);
          return false;
        }
         return true;
        }
}
