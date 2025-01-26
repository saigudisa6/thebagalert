import { useState, useEffect } from 'react';
import Image from 'next/image';


export default function NewsCard({ article, variant, className, onClick, imgLink }) {
  const [isLoading, setIsLoading] = useState(true);  // Track loading state
  
  useEffect(() => {
    if (article && article.title) {
      setIsLoading(false); // Set loading to false once article is populated
    }
  }, [article]);  // Dependency array will re-run when article changes

  const variants = {
    featured: "col-span-3 row-span-2 md:col-span-2 lg:col-span-3",
    tall: "col-span-1 row-span-1",
    wide: "col-span-2 row-span-1",
    normal: "col-span-1 row-span-1",
    wideShort: "col-span-2 row-span-1 h-[200px]",
    squished: "col-span-1/2 row-span-1" // half width variant
  };

  const headingSizes = {
    featured: "text-3xl md:text-4xl",
    tall: "text-xl",
    wide: "text-2xl",
    normal: "text-lg",
    wideShort: "text-xl",
    squished: "text-sm" // smaller text for squished variant
  };

  if(article == null) return (<div>LOADING...</div>)
    console.log(article)
  return (
    <div className={`
      ${variants[variant]}
      relative overflow-hidden
      transition-shadow duration-300
      flex flex-col
      noise
      ${className}
    `} onClick={onClick}>
      <div className={`
        relative w-full
        ${variant === 'featured' ? 'h-[400px]' : 
          variant === 'tall' ? 'h-[350px]' :
          variant === 'wide' ? 'h-[250px]' :
          variant === 'wideShort' ? 'h-[150px]' :
          variant === 'squished' ? 'h-[200px]' : 'h-[200px]'}
      `}>
        <Image
          alt={article.title}
          fill
          className="object-cover"
          priority
          src={imgLink}
        />
      </div>
      <div className="p-4 flex-1">
        <h2 className={`${headingSizes[variant]} font-serif font-bold text-gray-900 mb-2`}>
          {isLoading ? "Loading..." : article.title}  {/* Show Loading if the article is loading */}
        </h2>
        {variant !== 'wideShort' && variant !== 'squished' && (
          <p className="text-gray-600 line-clamp-3">
            {isLoading ? "Loading..." : article.text} {/* Show Loading if the article is loading */}
          </p>
        )}
      </div>
    </div>
  );
}
