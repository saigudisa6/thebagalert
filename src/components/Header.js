export default function Header() {
    return (
      <header className="max-w-6xl pt-4 pb-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
          <div className="font-['Times_New_Roman'] text-4xl font-bold text-gray-800">
            THE BAG ALERT
          </div>
          
          <div className="flex gap-4">
            <button className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              SUBSCRIBE
            </button>
            <button className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              SIGN IN
            </button>
            <button className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              GET STARTED
            </button>
          </div>
        </div>
      </header>
    );
}
