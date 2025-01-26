import { useState } from "react";

export default function Header() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'CN', name: '中文' }
  ];

  const toggleOverlay = () => {
    setIsOverlayOpen((prev) => !prev);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  const selectLanguage = (code) => {
    setSelectedLanguage(code);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <header className="max-w-6xl pt-4 pb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
        <div className="font-['Times_New_Roman'] text-4xl font-bold text-gray-800">
          THE BAG ALERT
        </div>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={toggleLanguageDropdown}
            className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-1"
          >
            {selectedLanguage} <span className="ml-1">▼</span>
          </button>
          
          {isLanguageDropdownOpen && (
            <div className="absolute top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang.name)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 font-['Times_New_Roman'] text-gray-600 hover:text-gray-800"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 relative">
          <button
            onClick={toggleOverlay}
            className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            SUBSCRIBE
          </button>

          <button className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            HELP
          </button>
          <button className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            ACCOUNT
          </button>
        </div>
      </div>

      {/* Subscription Overlay */}
      {isOverlayOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          {/* ... rest of your overlay code ... */}
        </div>
      )}
    </header>
  );
}
