interface DirectorInfo {
  director_id: string;
  director_name: string;
  director_movies: string[];
}

export async function getDirectorMovies(directorId: string): Promise<DirectorInfo> {
  const response = await fetch(`${process.env.API_URL}/api/directors/${directorId}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch director info for ${directorId}`);
  }

  return response.json();
}