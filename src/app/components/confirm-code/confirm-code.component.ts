import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Login, validateCode } from 'src/app/interfaces/login';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.css']
})
export class ConfirmCodeComponent implements OnInit{

  loading: boolean = false
  confirm: string = ''
  email: string

  constructor(private toastr: ToastrService, private _serviceLogin: LoginService, private _serviceError: ErrorService,
    private router: Router){
      this.email = localStorage.getItem('user') || ''
  }
  ngOnInit(): void {
    
  }


  /*confirmCode(){
    console.log(this.confirm,length)
    if(this.confirm.length>5){
      const code_confirm = '123456'
      if(this.confirm===code_confirm){
        this.loading = true
        this.toastr.info(`Bienvenido ${this.email}`,'Sesión correcta')
        this.router.navigate(['/'])
        this.loading = false
      }else{
        this.toastr.error('Código incorrecto')
      }
    }else{
      this.toastr.error('El código debe de ser de 6 dígitos')
    }
  }*/

  confirmCode(){
    console.log(this.confirm,length)
    if(this.confirm.length>5){
      
      //this._serviceLogin.validateAccess()
      const validateAccess: validateCode = {
        email: this.email,
        code_auth: this.confirm
      }
      console.log(validateAccess)

      this._serviceLogin.validateAccess(validateAccess).subscribe({
        next: (data) => {
          console.log(data)
          this.loading = true
          if(data.success!=true){
            this.toastr.error(data.message)
          }else{
            this.toastr.info(`Bienvenido ${this.email}`,'Sesión correcta')
            this.router.navigate(['/'])
          }
          this.loading = false
        },
        error: (e: HttpErrorResponse) => {
          this._serviceError.msjError(e)
          this.loading = false
        }
      })

    }else{
      this.toastr.error('El código debe de ser de 6 dígitos')
    }
  }

}
