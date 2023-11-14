import Link from "next/link";

export default function AdminPage() {
  return (
    <>
      <h2>Admin</h2>
      <div>
        <Link href="/admin/semaine">Semaine</Link>
      </div>
      <div>
        <Link href="/admin/semaine-au-cinema">
          Générateur de code pour &quot;une semaine au cinéma&quot;
        </Link>
      </div>
      <div>
        <Link href="/admin/tous-les-films">Tous les films</Link>
      </div>
    </>
  );
}
