export interface MovieWithNoShowtimes {
  directors: string;
  tags: string;
  year: string;
  title: string;
  countries: string;
  original_title: string;
  id: string;
  language: string;
  category?: string;
}

export interface MovieInfo {
  language?: string;
  title: string;
  original_title?: string;
  directors: string;
  countries?: string;
  tags?: string;
}

export interface Movie extends MovieWithNoShowtimes {
  showtimes_theater: ShowtimesTheater[];
}

export interface MovieWithShowtimesByDay extends MovieWithNoShowtimes {
  showtimes_by_day: { [day: string]: ShowtimesTheater[] };
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

export interface ShowtimesTheater {
  showtimes: number[];
  location_2: string;
  zipcode_clean: string;
  clean_name: string;
}

export interface Review {
  directors: string;
  review_date: string;
  review: string;
  title: string;
  category?: string;
  id: string;
  year: number;
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
  screenings: { [date: string]: ShowtimesTheater[] };
  screenwriters: string;
  tags?: string;
  title: string;
  year: string;
  // Review information
  category?: string;
  review?: string;
  review_date?: string;
}

export interface MovieDetailWithImage extends MovieDetail {
  image_file?: string;
}
