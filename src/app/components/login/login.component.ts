import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/interfaces/login';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username: string = ''
  password: string = ''
  loading: boolean = false

  constructor(private toastr: ToastrService, private _serviceUser: UserService, private router: Router, 
    private _serviceError: ErrorService, private _serviceLogin: LoginService){

  }

  ngOnInit(): void {
  }

  /*login(){
    console.log(this.username)
    if(this.username === '' || this.password === ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    const user: User = {
      username: this.username,
      password: this.password
    }

    this.loading = true
    this._serviceUser.login(user).subscribe({
      next: (token) => {
        console.log(token)
        localStorage.setItem('token', token)
        localStorage.setItem('user', this.username)
        this.router.navigate(['/confirm'])
      },
      error: (e: HttpErrorResponse) => {
        this._serviceError.msjError(e)
        this.loading = false
      }
    })
  }*/

  login(){
    console.log(this.username)
    if(this.username === '' || this.password === ''){
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return
    }

    const login: Login = {
      email: this.username,
      password: this.password
    }

    
    this.loading = true
    this._serviceLogin.login(login).subscribe({
      next: (data) => {
        console.log(data)
        //localStorage.setItem('token', token)
        
        localStorage.setItem('user', this.username)
        this.router.navigate(['/confirm'])
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._serviceError.msjError(e)
        console.log(e)
      }
    })

  }

}
