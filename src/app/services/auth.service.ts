import { Injectable } from '@angular/core';
import { User, UserResponse } from '../interfaces/user';
import { BackendService } from './backend.service';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private backend:BackendService,
  ) { }

  public loggedUser?: User;
  public accessToken?:string;
  public get isLogged():boolean {
    return !!this.loggedUser;
  }

  createUser(name: string, email:string, password:string):Observable<User | boolean> {
    return this.backend.createUser(name, email, password)
      .pipe(
        tap((ur:UserResponse) => {
          this.loggedUser = ur.user;
          this.accessToken = ur.accessToken;
        }),
        map((ur:UserResponse) => ur.user),
        catchError((err) => {
          return of(false);
        }),
      );
  }

  login(email:string, password:string):Observable<User | boolean> {
    return this.backend.login(email, password)
    .pipe(
      tap((ur:UserResponse) => {
        this.loggedUser = ur.user;
        this.accessToken = ur.accessToken;
      }),
      map((ur:UserResponse) => ur.user),
      catchError((err) => {
        return of(false);
      }),
    );
  }
  
  logout() {
    this.accessToken = '';
    this.loggedUser = undefined;
  }
}
