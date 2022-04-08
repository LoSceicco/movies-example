import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private movieService:MovieService,
  ) { }

  ngOnInit(): void {
    if(this.authService.accessToken) {
      this.movieService.getMovies(
        this.authService.accessToken
      ).subscribe(
        (res:Movie[]) => {
          this.movies = res;
        }
      )
    }
    
  }

  public movies:Movie[] = [];

}
