import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../login/users/user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor(private userService : UserService) {}

  public getToken(): string {
    return this.userService.getTokenUser;
  }

  public decodePayloadJWT(): any {
    try {
      return jwt_decode(this.getToken());
    } catch (Error) {
      return null;
    }
  }
}
