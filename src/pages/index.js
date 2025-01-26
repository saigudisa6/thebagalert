import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import NewsGrid from "@/components/NewsGrid";
import Header from "@/components/Header";

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

  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-100">
      
      <div class="max-w-6xl mx-auto bg-white">
        <Header/>
        <NewsGrid articles={articles} />
      </div>
    </main>
  );
}
