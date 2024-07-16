export interface MovieInfo {
  language?: string;
  title: string;
  original_title?: string;
  directors: string;
  countries?: string;
  tags?: string;
}

export interface MovieDetail {
  // Movie information
  actors?: string;
  countries: string;
  directors: string;
  distributor?: string;
  duration: string;
  genre?: string;
  id: string;
  language: string;
  original_title: string;
  screenings: { [date: string]: TheaterScreenings[] };
  screenwriters: string;
  tags?: string;
  title: string;
  year: string;
  // Review information
  review?: string;
  review_category?: string;
  review_date?: string;
}

export interface MovieDetailWithImage extends MovieDetail {
  image_file?: string;
}

export interface Review {
  id: string;
  title: string;
  directors: string;
  year: number;
  review: string;
  review_category: string;
  review_date: string;
}

export interface SearchMovie {
  year: number;
  relevance_score: number;
  directors: string;
  title: string;
  id: string;
  search_field: string;
  original_title: string;
}

export interface MovieWithNoScreenings {
  directors: string;
  tags: string;
  year: string;
  title: string;
  countries: string;
  original_title: string;
  id: string;
  language: string;
  review_category?: string;
}

export interface MovieWithScreenings extends MovieWithNoScreenings {
  showtimes_theater: TheaterScreenings[];
}

export interface MovieWithScreeningsByDay extends MovieWithNoScreenings {
  showtimes_by_day: { [day: string]: TheaterScreenings[] };
}

export interface Screening {
  time: number;
  notes?: string;
}

export interface TheaterScreenings {
  screenings: Screening[];
  neighborhood: string;
  zipcode: string;
  name: string;
}
