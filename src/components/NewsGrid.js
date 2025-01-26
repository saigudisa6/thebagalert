import NewsCard from "./NewsCard";

export default function NewsGrid({ articles }) {
    return (
      <div className="container mx-auto">
        <div className="grid grid-cols-3  h-[1200px]">
          {/* Featured Story */}
            <NewsCard
                article={articles[0]}
                variant="wide"
                className="border-t-2 border-r-2 border-b-2 border-black"
            /> 
          
          {/* Tall Story */}
            <NewsCard
                article={articles[1]}
                variant="normal"
                className="border-t-2 border-b-2 border-black"
            />
          
          {/* Wide Story */}
          <NewsCard
            article={articles[2]}
            variant="squished"
            className="border-b-2 border-black"
          />
          <NewsCard
            article={articles[2]}
            variant="squished"
            className="border-b-2 border-black"
          />
          <NewsCard
            article={articles[2]}
            variant="squished"
            className="border-r-2 border-b-2 border-black"
          />
          <NewsCard
            article={articles[3]}
            variant="tall"
            className="border-r-2 border-black"
          />

        <NewsCard
            article={articles[2]}
            variant="wide"
            className="border-b-2 border-black"
          />
          
        </div>
      </div>
    );
}
