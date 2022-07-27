import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/models/movie.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  movies: Movie[] = [];
  currentPage = 1;
  totalPages = 1;
  totalResults = 0;

  constructor(public movieService: MovieService) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies(page = 1, event?: InfiniteScrollCustomEvent): void {
    if (page <= this.totalPages) {
      this.movieService.getTopRatedMovies(page).subscribe(p => {
        this.movies.push(...p.results);
        this.currentPage = p.page;
        this.totalPages = p.total_pages;
        this.totalResults = p.total_results;

        event?.target.complete();
        if(this.currentPage === this.totalPages){
          event.target.disabled = true;
        }
      });
    }
  }

  public loadMore(event: Event): void {
    const infiniteScrollEvent = event as InfiniteScrollCustomEvent;
    this.loadMovies(this.currentPage + 1, infiniteScrollEvent);
  }

}
