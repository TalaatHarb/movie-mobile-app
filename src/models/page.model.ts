import { Movie } from "./movie.model";

export interface Page {
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[];
}
