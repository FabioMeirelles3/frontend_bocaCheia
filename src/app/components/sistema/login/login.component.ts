import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Helpers } from 'src/environments/helpers';
import { IUser } from './interfaces/IUser';
import { UserService } from './users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  requires!: {login: string, password: string};
  erro: boolean = false;

  constructor(
    private userService: UserService,
  ){
    this.requires = Helpers.requires;
  }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get login() {return this.formLogin.get('login')!;}
  get password() {return this.formLogin.get('password')!;}

  userLogin(){
    if(this.formLogin.invalid) return;
    var user = this.formLogin.getRawValue() as IUser;
    this.userService.login(user).subscribe((response) => {
        this.erro = false;

        if(!response.sucesso){
          return false;
        }else{
          return true;
        }
    },
    (err) => {
      this.erro = true;
    });
  }

}
