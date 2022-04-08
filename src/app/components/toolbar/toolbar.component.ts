import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
  }

  public getMessage() {
    if(this.authService.isLogged) {
      return `Benvenuto ${this.authService.loggedUser?.name}`;
    }
    return 'Ciao';
  }

}
