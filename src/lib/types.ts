export interface MovieInfo {
  id: string;
  title: string;
  directors: string;
  year: string;
  original_title?: string;
  countries?: string;
  tags?: string;
}

export interface MovieDetail extends MovieInfo {
  // Movie information
  actors?: string;
  language?: string;
  distributor?: string;
  duration: string;
  genre?: string;
  screenings: { [date: string]: TheaterScreenings[] };
  screenwriters: string;
  // Review information
  review?: string;
  review_category?: string;
  review_date?: string;
}

export interface Review extends MovieInfo {
  review: string;
  review_category: string;
  review_date: string;
}

export interface SearchMovie extends MovieInfo {
  relevance_score: number;
}

export interface ReducedMovie {
  i: string; // id
  d: string; // directors
  t: string; // title
  y: string; // year
  o?: string; // original_title
  r: number; // relevance_score
}

export interface MovieWithScreeningsOneDay extends MovieInfo {
  review_category?: string;
  showtimes_theater: TheaterScreenings[];
}

export interface MovieWithScreeningsSeveralDays extends MovieInfo {
  review_category?: string;
  showtimes_by_day: { [day: string]: TheaterScreenings[] };
}

export interface Screening {
  time: number;
  notes?: string;
}

export interface TheaterScreenings {
  seances: { [time: string]: Screening };
  neighborhood: string;
  zipcode: string;
  name: string;
  preposition_and_name: string;
}

export interface SearchTheater {
  theater_id: string;
  name: string;
}
