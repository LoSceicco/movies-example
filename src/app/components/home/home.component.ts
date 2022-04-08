import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router:Router,
  ) { }

  ngOnInit(): void {
    if(this.authService.isLogged) {
      this.router.navigateByUrl('movies');
    }
  }

  public isLogin:boolean = true;
  switchMode() {
    this.isLogin = !this.isLogin;
  }

  getLabel() {
    return this.isLogin ? 'Registrati' : 'Accedi';
  }

}
