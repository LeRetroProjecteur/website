// app/director/[directorId]/page.tsx
import { Metadata } from "next";
import { getMovie } from "@/lib/movies";
import { doc, getDoc } from 'firebase/firestore';
import { getFirebase } from '@/lib/firebase';
import PageHeader from "@/components/layout/page-header";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DirectorInfo {
 director_id: string;
 director_name: string;
 director_movies: string[];
}

async function getDirectorMovies(directorId: string): Promise<DirectorInfo> {
 const { db } = getFirebase();
 const docRef = doc(db, "director-info", directorId);
 const docSnap = await getDoc(docRef);

 if (!docSnap.exists()) {
   throw new Error('Director not found');
 }

 return docSnap.data() as DirectorInfo;
}

export async function generateMetadata({
 params: { directorId },
}: {
 params: { directorId: string };
}): Promise<Metadata> {
 const directorInfo = await getDirectorMovies(directorId);
 return {
   title: `Films by ${directorInfo.director_name}`,
   description: `Movies by ${directorInfo.director_name}`,
 };
}

export default async function DirectorPage({
 params: { directorId },
}: {
 params: { directorId: string };
}) {
 const directorInfo = await getDirectorMovies(directorId);
 const movies = await Promise.all(
   directorInfo.director_movies.map(movieId => getMovie(movieId))
 );

 return (
   <>
     <PageHeader text={directorInfo.director_name} />
     <div className="flex grow flex-col">
       {movies.map(movie => (
         <Link
           key={movie.id}
           href={`/film/${movie.id}`}
           className="border-b even:bg-retro-pale-green lg:hover:bg-retro-pale-green py-10px pl-5px text-15px font-medium uppercase leading-20px lg:py-18px lg:pl-10px lg:text-18px lg:leading-21px lg:tracking-[0.01em]"
         >
           <u>{movie.title}</u>, {movie.directors} ({movie.year})
           {movie.screenings && movie.screenings.length > 0 && (
             <div className="text-sm mt-2">
               {movie.screenings.map((screening, index) => (
                 <p key={index} className="text-gray-600">
                   {screening.theater} - {screening.date}
                 </p>
               ))}
             </div>
           )}
         </Link>
       ))}
     </div>
   </>
 );
}