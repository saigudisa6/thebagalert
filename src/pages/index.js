import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import NewsGrid from "@/components/NewsGrid";
import Header from "@/components/Header";
import Topics from "@/components/Topics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function HomePage() {
  const articles = [
    {
      title: "Major Global Summit Reaches Historic Climate Agreement",
      imageUrl: "/summit.jpg",
      excerpt: "World leaders announce groundbreaking climate initiatives in unprecedented gathering..."
    },
    {
      title: "Tech Innovation Breakthrough",
      imageUrl: "/tech.jpg",
      excerpt: "Revolutionary new technology promises to transform industry..."
    },
    {
      title: "Sports Championship Finals",
      imageUrl: "/sports.jpg",
      excerpt: "Dramatic finish in championship match..."
    },
    {
      title: "Sports Championship Finals",
      imageUrl: "/sports.jpg",
      excerpt: "Dramatic finish in championship match..."
    },
    {
      title: "Sports Championship Finals",
      imageUrl: "/sports.jpg",
      excerpt: "Dramatic finish in championship match..."
    },
    {
      title: "Local Community Story",
      imageUrl: "/local.jpg",
      excerpt: "Neighborhood initiative brings positive change..."
    },
    {
      title: "Breaking Entertainment News",
      imageUrl: "/entertainment.jpg",
      excerpt: "Latest updates from Hollywood..."
    },
    // Add more articles as needed
  ];

  const topics = ["Topic", "Topic", "Topic", "Topic", "Topic"];

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-300 pt-8">
      <div class="max-w-4xl mx-auto bg-slate-50 noise">
        <Header/>
        <div className="text-center font-['Times_New_Roman'] font-bold text-9xl text-black border-t-4 border-b-4 border-black py-4 pt-12 pb-12">
          BAG ALERT
        </div>
        <Topics topics={topics}/>
        <NewsGrid articles={articles} />
        {/* <Charts/> */}
      </div>
    </main>
  );
}
