import NewsCard from "./NewsCard";
import { useState } from "react";
import { useEffect } from "react";
import {getArticle, getQuestion} from "../pages/api/api";


export default function NewsGrid({topics, levels}) {
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [article, setArticle] = useState([]);
    
    useEffect(() => {
        const fetchArticles = async () => {
          for (let i = 0; i < topics.length; i++) {
            const articleData = await getArticle(topics[i], levels[i]); // Assuming getArticle() is defined elsewhere
            // const articleQuestion = await getQuestion(topics[i]); // Assuming getQuestion() is defined elsewhere
            setArticle((prevArticles) => [...prevArticles, articleData]); // Assuming setArticle adds to the previous state
          }
        };
      
        fetchArticles();
    }, [topics]); 

    const handleCardClick = (article) => {
        setSelectedArticle(article);
    };

    const closeOverlay = () => {
        setSelectedArticle(null);
    };
    console.log(article)
    if(article==null) return(<div>LOADING</div>)
    
    return (
        <div className="relative">
            <div className="container mx-auto bg-slate-50">
                <div className="grid grid-cols-3 h-[1200px]">
                    {/* Featured Story */}
                    <NewsCard
                        article={{title: "Message of the Day", text: "Every journey starts with one step..."}}
                        variant="wide"
                        className="border-t-2 border-r-2 border-b-2 border-black"
                        onClick={() => handleCardClick({title: "Message of the Day", text: "Every journey starts with one step..."})}
                    /> 
                
                {/* Tall Story */}
                    <NewsCard
                        article={{title: "sdjfsf", text: "ffdfds"}}
                        variant="normal"
                        className="border-t-2 border-b-2 border-black"
                        onClick={() => handleCardClick({title: "sdjfsf", text: "ffdfds"})}
                    />
                
                {/* Wide Story */}
                <NewsCard
                    article={article[0]}
                    variant="squished"
                    className="border-b-2 border-black"
                    imgLink={'https://thebagalert.s3.us-east-1.amazonaws.com/credit.png'}
                    onClick={() => handleCardClick(article[0])}
                />
                <NewsCard
                    article={article[1]}
                    variant="squished"
                    className="border-b-2 border-black"
                    imgLink={'https://thebagalert.s3.us-east-1.amazonaws.com/insurance.jpg'}
                    onClick={() => handleCardClick(article[1])}
                />
                <NewsCard
                    article={article[2]}
                    variant="squished"
                    className="border-b-2 border-black"
                    imgLink={'https://thebagalert.s3.us-east-1.amazonaws.com/investing.jpg'}
                    onClick={() => handleCardClick(article[2])}
                />
                <NewsCard
                    article={article[3]}
                    variant="tall"
                    className="border-r-2 border-black"
                    imgLink={'https://thebagalert.s3.us-east-1.amazonaws.com/taxes.jpg'}
                    onClick={() => handleCardClick(article[3])}
                />

                <NewsCard
                    article={article[4]}
                    variant="wide"
                    className="border-b-2 border-black"
                    imgLink={'https://thebagalert.s3.us-east-1.amazonaws.com/budgeting.jpg'}
                    onClick={() => handleCardClick(article[4])}
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
                    <p className="text-gray-600 mb-4">{selectedArticle.text}</p>
                </>
            )}
        </div>
    </div>
)}

        </div>
    );
}

