import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserLoggedService {
  id!: number;
  name!: string;
  email!: string;

  constructor() { }
}
