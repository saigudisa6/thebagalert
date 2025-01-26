export default function Topics({ topics }) {
    return (
        <div className="flex justify-between items-center px-8 py-4 max-w-6xl mx-auto pr-8">
            {topics.map((topic, index) => (
                <div 
                    key={index} 
                    className="font-['Times_New_Roman'] font-bold text-lg text-black hover:text-gray-600 transition-colors cursor-pointer"
                >
                    {topic}
                </div>
            ))}
        </div>
    );
}
