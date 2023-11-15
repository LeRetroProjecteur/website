export interface Movie {
  directors: string;
  tags: string;
  year: string;
  title: string;
  countries: string;
  original_title: string;
  id: string;
  language: string;
  showtimes_theater: ShowtimesTheater[];
  category?: string;
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
  title: string;
  directors: string;
  original_title: string;
  year: string;
  distributor: string;
  tags: string;
  screenings: { [date: string]: ShowtimesTheater[] };
  id: string;
  duration: string;
  countries: string;
  category?: string;
  genre?: string;
  image_file?: string;
  review?: string;
  review_date?: string;
}
