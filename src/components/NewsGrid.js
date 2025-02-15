import NewsCard from "./NewsCard";
import { useState } from "react";

export default function NewsGrid({ articles }) {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleCardClick = (article) => {
        setSelectedArticle(article);
    };

    const closeOverlay = () => {
        setSelectedArticle(null);
    };

    return (
        <div className="relative">
            <div className="container mx-auto bg-slate-50">
                <div className="grid grid-cols-3 h-[1200px]">
                    {/* Featured Story */}
                    <NewsCard
                        article={articles[0]}
                        variant="wide"
                        className="border-t-2 border-r-2 border-b-2 border-black"
                        onClick={() => handleCardClick(articles[0])}
                    /> 
                
                {/* Tall Story */}
                    <NewsCard
                        article={articles[1]}
                        variant="normal"
                        className="border-t-2 border-b-2 border-black"
                        onClick={() => handleCardClick(articles[1])}
                    />
                
                {/* Wide Story */}
                <NewsCard
                    article={articles[2]}
                    variant="squished"
                    className="border-b-2 border-black"
                    onClick={() => handleCardClick(articles[2])}
                />
                <NewsCard
                    article={articles[2]}
                    variant="squished"
                    className="border-b-2 border-black"
                    onClick={() => handleCardClick(articles[2])}
                />
                <NewsCard
                    article={articles[2]}
                    variant="squished"
                    className="border-b-2 border-black"
                    onClick={() => handleCardClick(articles[2])}
                />
                <NewsCard
                    article={articles[3]}
                    variant="tall"
                    className="border-r-2 border-black"
                    onClick={() => handleCardClick(articles[3])}
                />

                <NewsCard
                    article={articles[2]}
                    variant="wide"
                    className="border-b-2 border-black"
                    onClick={() => handleCardClick(articles[2])}
                />
                </div>
            </div>

            {/* Overlay */}
            {selectedArticle && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center font-serif">
        <div className="bg-white noise p-8 max-w-2xl rounded-lg relative">
            <button 
                onClick={closeOverlay}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>

            {selectedArticle.title === "Daily Game" ? (
                // Custom output for "game"
                <>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900" >{selectedArticle.title}</h2>
                    <p className="text-gray-600 mb-4">SCENARIO PROMPT</p>
                    {/* <img 
                        src={selectedArticle.image}     
                        alt={selectedArticle.problem}
                        className="w-full h-64 object-cover mb-4"
                    /> */}
                    <div className="text-gray-800">
                        <p>Based on today's reading, how would you resolve this situation?.</p>
                        <textarea
                        placeholder="Enter your response here..."
                        className="w-full p-4 text-lg border border-gray-300 rounded-md mt-2 h-32 resize-none"
                    ></textarea>

                    </div>
                </>
            ) : (
                // Default content for other articles
                <>
                    <h2 className="text-2xl font-bold mb-4 text-gray-900">{selectedArticle.title}</h2>
                    <p className="text-gray-600 mb-4">{selectedArticle.description}</p>
                    <img 
                        src={selectedArticle.image}     
                        alt={selectedArticle.title}
                        className="w-full h-64 object-cover mb-4"
                    /> 
                    <p className="text-gray-800">{selectedArticle.content}</p>
                </>
            )}
        </div>
    </div>
)}

        </div>
    );
}

