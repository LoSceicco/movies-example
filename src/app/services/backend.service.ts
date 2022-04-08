import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { User, UserResponse } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private httpClient:HttpClient,
  ) { }

  private baseUrl:string = 'http://localhost:4200/api/';

  createUser(name: string, email:string, password:string): Observable<UserResponse> {
    // const id = Math.round(Math.random() * 1000);
    const newUser:User = {
      name,
      email,
      password,
    }
    return this.httpClient.post<UserResponse>(
      this.baseUrl + 'users',
      newUser,
    )
  }

  login(email:string, password:string): Observable<UserResponse> {
    return this.httpClient.post<UserResponse>(
      this.baseUrl + 'login',
      {
        email,
        password
      }
    )
  }

  getMovies(accessToken:string):Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      this.baseUrl + 'movie/popular',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    )
  }

}
