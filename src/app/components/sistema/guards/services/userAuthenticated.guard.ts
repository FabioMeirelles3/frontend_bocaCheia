import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../login/users/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticatedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate() {
    if (this.userService.logged) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
