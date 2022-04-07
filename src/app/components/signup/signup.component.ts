import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  public signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  submitForm() {
    const {
      name,
      email,
      password,
    } = this.signupForm.value;
    this.authService.createUser(name, email, password).subscribe(
      (response: User | boolean) => {
        if(response) {
          this.router.navigateByUrl('movies');
        } else {
          alert('qualcosa non va....');
        }
      }
    );
  }
}
