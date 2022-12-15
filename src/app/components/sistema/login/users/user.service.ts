import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IUser } from '../interfaces/IUser';
const apiUrlUser = environment.baseApiUrl();
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  login(user: IUser): Observable<any> {
    return this.httpClient.post<any>(apiUrlUser + 'auth/login', user).pipe(
      tap((res) => {
        if (!res.sucesso) return;
        setWithExpiry('token', btoa(JSON.stringify(res['token'])), 12);
        this.router.navigate(['restaurant']);
      })
    );
  }

  logoff() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  get getUserLogged(): IUser {
    return localStorage.getItem('user')
      ? JSON.parse(atob(localStorage.getItem('user')!))
      : null;
  }

  get getIdUserLogged(): string {
    return localStorage.getItem('user')
      ? (JSON.parse(atob(localStorage.getItem('user')!)) as IUser).id
      : '';
  }

  get getTokenUser(): string {
    return getWithExpiry('token')
      ? JSON.parse(atob(getWithExpiry('token')!))
      : null;
  }

  get logged(): boolean {
    return getWithExpiry('token') ? true : false;
  }
}

function setWithExpiry(key: string, value: any, time: number) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.setTime(now.getTime() + time * 60 * 60 * 1000),
  };
  localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}
