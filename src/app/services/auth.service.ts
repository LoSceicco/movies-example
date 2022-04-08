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
  ) {
    const userFromStorage = localStorage.getItem('logged-user');
    if(userFromStorage) {
      this.loggedUser = JSON.parse(userFromStorage);
    }

    const tokenFromStorage = localStorage.getItem('access-token');
    if(tokenFromStorage) {
      this.accessToken = tokenFromStorage;
    }
  }

  public loggedUser?: User;
  public accessToken?:string;
  public get isLogged():boolean {
    return !!this.loggedUser;
  }

  private setData(user:User, token:string) {
    this.loggedUser = user;
    this.accessToken = token;
    localStorage.setItem('logged-user', JSON.stringify(this.loggedUser));
    localStorage.setItem('access-token', this.accessToken);
  }

  createUser(name: string, email:string, password:string):Observable<User | boolean> {
    return this.backend.createUser(name, email, password)
      .pipe(
        tap((ur:UserResponse) => {
          this.setData(ur.user, ur.accessToken);
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
        this.setData(ur.user, ur.accessToken);
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
    localStorage.removeItem('logged-user');
    localStorage.removeItem('access-token');
  }
}
