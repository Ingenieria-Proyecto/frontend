import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm-code',
  templateUrl: './confirm-code.component.html',
  styleUrls: ['./confirm-code.component.css']
})
export class ConfirmCodeComponent implements OnInit{

  loading: boolean = false
  confirm: string = ''
  email: string

  constructor(private toastr: ToastrService, private _serviceUser: UserService, private _serviceError: ErrorService,
    private router: Router){
      this.email = localStorage.getItem('user') || ''
  }
  ngOnInit(): void {
    
  }

  confirmCode(){
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
  }

}
