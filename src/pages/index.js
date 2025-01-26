import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import NewsGrid from "@/components/NewsGrid";
import Header from "@/components/Header";
import Topics from "@/components/Topics";
import { useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function HomePage() {

  const topics = ["Investing", "Insurance", "Credit", "Loans", "Taxes"];
  const levels = [1,2,3,3,1]

  const [title, setTitle] = useState('BAG ALERT');


  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-300 pt-8">
      <div class="max-w-4xl mx-auto bg-slate-50 noise">
        <Header setTitle={setTitle}/>
        <div className="text-center font-['Times_New_Roman'] font-bold text-9xl text-black border-t-4 border-b-4 border-black py-4 pt-12 pb-12">
          {title}
        </div>
        <Topics topics={topics}/>
        <NewsGrid topics={topics} levels={levels}/>
        {/* <Charts/> */}
      </div>
    </main>
  );
}

export default HomePage
