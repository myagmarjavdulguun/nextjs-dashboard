import Link from "next/link";
import { isLoggedIn } from "./lib/data";
import { redirect } from "next/navigation";

export default async function Page() {
  const data = await isLoggedIn();

  if (data) {
    redirect('/home');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Header with Login Button */}
      <header className="w-full py-4 px-8 bg-blue-600 flex justify-between items-center text-white shadow-md">
        <h1 className="text-3xl font-semibold">Систем</h1>
        <Link 
          href="/login"
          className="px-6 py-2 bg-blue-800 rounded-lg hover:bg-blue-900 transition duration-300"
        >
          Нэвтрэх
        </Link>
      </header>

      {/* Main Content Container */}
      <main className="w-full max-w-4xl p-6 mx-auto mt-12 space-y-12">

        {/* Hero Section with Full Image Background */}
        <div className="relative w-full bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-white py-28 px-10 rounded-3xl shadow-2xl overflow-hidden">
          <h1 className="relative text-5xl font-extrabold text-center z-10">Системд тавтай морил!</h1>
          <p className="relative text-xl text-center z-10 mt-3">Үргэлжлүүлэхийн тулд нэвтрэх шаардлагатай.</p>
        </div>

        {/* Descriptive Text Section */}
        <div className="mt-8 text-center space-y-4 text-lg text-gray-700">
          <p>Уг систем нь их дээд сургуулийн төгсөгчдийг чадавхжуулахад дэмжлэг үзүүлэхэд чиглэсэн.</p>
        </div>

      </main>
    </div>
  );
}
