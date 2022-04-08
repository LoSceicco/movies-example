import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(
    private backend:BackendService,
  ) { }

  getMovies(accessToken:string): Observable<Movie[]> {
    return this.backend.getMovies(accessToken);
  }
}
