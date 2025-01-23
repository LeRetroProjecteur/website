import { Metadata } from "next";
import { getMovie } from "@/lib/movies";
import { doc, getDoc } from 'firebase/firestore';
import { getFirebase } from '@/lib/firebase';
import PageHeader from "@/components/layout/page-header";
import { filterDates } from "@/lib/util";
import { size } from "lodash-es";
import { BodyCopy, SectionTitle } from "@/components/typography/typography";
import MultiDaySeances from "@/components/seances/multiday-seances";
import { TwoColumnPage } from "@/components/layout/page";
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
     <TwoColumnPage
       narrow
       left={
         <div className="flex flex-col">
           {movies.map(movie => (
             <Link
               key={movie.id}
               href={`/film/${movie.id}`}
               className="border-b py-12px lg:py-16px lg:hover:bg-retro-pale-green"
             >
               <u>{movie.title}</u>, {movie.directors} ({movie.year})
             </Link>
           ))}
         </div>
       }
       right={
         <>
           <SectionTitle>Prochaines séances à Paris</SectionTitle>
           <div className="flex flex-col">
             {movies.map(movie => {
               const screenings = movie?.screenings ? filterDates(movie.screenings) : {};
               return size(screenings) > 0 ? (
                 <div key={movie.id} className="border-b">
                     <div className="py-12px text-16px lg:text-20px font-bold tracking-tight">{movie.title}</div>
                     <MultiDaySeances
                         screenings={screenings}
                         groupClassName="py-8px lg:py-12px"
                     />
                 </div>
               ) : null;
             })}
           </div>
         </>
       }
     />
   </>
 );
}