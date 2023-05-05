import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login } from 'src/app/interfaces/login';
import { User } from 'src/app/interfaces/user';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  username: string = ''
  password: string = ''
  confirmPassword: string = ''
  loading: boolean = false

  constructor(private toastr: ToastrService, private _userService: UserService,
    private router: Router, private _serviceError: ErrorService, private _serviceLogin: LoginService) {

  }

  ngOnInit(): void {

  }

  /*addUser() {
    if (this.username === '' || this.password === '' || this.confirmPassword === '') {
      this.toastr.error('Todos los campos son obligatorios', 'error')
      console.log(this.username)
      return
    }

    if (this.password != this.confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas son dintintas', 'error')
      return
    }

    const user: User = {
      username: this.username,
      password: this.password
    }
    this.loading = true

    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`El usuario ${this.username} fue registrado con éxito`, 'success')
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._serviceError.msjError(e)
      }
    })
  }*/

  addUser() {
    if (this.username === '' || this.password === '' || this.confirmPassword === '') {
      this.toastr.error('Todos los campos son obligatorios', 'error')
      console.log(this.username)
      return
    }

    if (this.password != this.confirmPassword) {
      this.toastr.error('Las contraseñas ingresadas son dintintas', 'error')
      return
    }

    const login: Login = {
      email: this.username,
      password: this.password
    }
    this.loading = true

    this._serviceLogin.createUser(login).subscribe({
      next: (v) => {
        this.loading = false
        this.toastr.success(`El usuario ${this.username} fue registrado con éxito`, 'success')
        this.router.navigate(['/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false
        this._serviceError.msjError(e)
      }
    })
  }


}
