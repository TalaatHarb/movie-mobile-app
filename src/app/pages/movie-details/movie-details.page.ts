import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  id: number;
  currentMovie: Movie;
  constructor(public movieService: MovieService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'), 10);

    this.movieService.getMovieDetails(this.id).subscribe(movie => {
      this.currentMovie = movie;
    });
  }

  public openHomePage(): void {
    window.open(this.currentMovie.homepage);
  }

}
