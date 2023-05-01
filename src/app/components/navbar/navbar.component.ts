import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  validate: boolean = false

  constructor(private router: Router){

  }
  ngOnInit(): void {
    this.buttonOut()
  }

  buttonOut(){
    const token = localStorage.getItem('token')
    if(token){
      this.validate = true
    }
  }

  logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.router.navigate(['/login'])

  }

}
