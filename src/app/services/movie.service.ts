import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Page } from 'src/models/page.model';
import { Movie } from 'src/models/movie.model';

const { apiUrl, apiKey, imagesUrl } = { ...environment };


@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getTopRatedMovies(page = 1): Observable<Page> {
    return this.httpClient.get<Page>(`${apiUrl}/movie/popular?api_key=${apiKey}&page=${page}`);
  }

  getMovieDetails(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(`${apiUrl}/movie/${id}?api_key=${apiKey}`);
  }

  getImageUrl(movie: Movie, size: string): string{
    return `${imagesUrl}/${size}${movie.poster_path}`;
  }
}
