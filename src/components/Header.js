import { useState } from "react";

export default function Header() {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
    { code: 'CN', name: '中文' }
  ];

  const subscriptionOptions = [
    "This thing",
    "Yearly Subscription",
    "Lifetime Access",
    "Family Plan",
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

  const translations = {
    'English': {
      subscribe: 'SUBSCRIBE',
      help: 'HELP',
      account: 'ACCOUNT',
      bagAlert: 'THE BAG ALERT'
    },
    'Español': {
      subscribe: 'SUSCRIBIR',
      help: 'AYUDA',
      account: 'CUENTA',
      bagAlert: 'LA ALERTA DE BAG'
    },
    'Français': {
      subscribe: 'S\'ABONNER',
      help: 'AIDE',
      account: 'COMPTE',
      bagAlert: 'L\'ALERTE BAG'
    },
    '中文': {
      subscribe: '订阅',
      help: '帮助',
      account: '账户',
      bagAlert: '包包警报'
    }
  };
  // Modify the return section:
  return (
    <header className="max-w-6xl pt-4 pb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 h-16">
        <div className="font-['Times_New_Roman'] text-4xl font-bold text-gray-800">
          {translations[selectedLanguage].bagAlert}
        </div>
  
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
            {translations[selectedLanguage].subscribe}
          </button>
  
          <button className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            {translations[selectedLanguage].help}
          </button>
          <button className="font-['Times_New_Roman'] font-bold px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
            {translations[selectedLanguage].account}
          </button>
        </div>
      </div>

      {/* Subscription Overlay */}
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
