import { useState } from "react";

export default function Header() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  // List of subscription options
  const subscriptionOptions = [
    "This thing",
    "Yearly Subscription",
    "Lifetime Access",
    "Family Plan",
  ];

  const toggleOverlay = () => {
    setIsOverlayOpen((prev) => !prev);
  };

  return (
    <header className="max-w-6xl pt-4 pb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
        <div className="font-['Times_New_Roman'] text-4xl font-bold text-gray-800">
          THE BAG ALERT
        </div>

        <div className="flex gap-4 relative">
          {/* Subscribe Button */}
          <button
            onClick={toggleOverlay}
            className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            SUBSCRIBE
          </button>

          {}
          <button className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            HELP
          </button>
          <button className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            ACCOUNT
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isOverlayOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
            {/* Close Button */}
            <button
              onClick={toggleOverlay}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>

            {/* Subscription Options */}
            <h2 className="text-xl font-bold text-gray-600 mb-4">Choose a Subscription</h2>
            <ul className="flex flex-col gap-2">
              {subscriptionOptions.map((option, index) => (
                <li key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`option-${index}`}
                    className="w-4 h-4"
                  />
                  <label htmlFor={`option-${index}`} className="text-gray-700">
                    {option}
                  </label>
                </li>
              ))}
            </ul>

            {/* Confirm Button */}
            <button
              onClick={toggleOverlay}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
