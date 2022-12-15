import { Component, OnInit } from '@angular/core';
import { GlobalVariable } from 'src/environments/globals';
import { UserLoggedService } from '../sistema/login/services/user-logged.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
    constructor(
      public userLoggedService: UserLoggedService,
    ) { }

  ngOnInit() {
    setTimeout(() => {console.log('Iniciando configuração do sistema')}, GlobalVariable.lagToInit)
  }
}
