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
}

export interface ShowtimesTheater {
  showtimes: number[];
  location_2: string;
  zipcode_clean: string;
  clean_name: string;
}
