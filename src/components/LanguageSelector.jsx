import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../context/I18nContext';
import { languageNames } from '../locales';

const FlagUS = () => (
  <svg viewBox="0 0 640 480" className="flag-icon">
    <path fill="#bd3d44" d="M0 0h640v480H0"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h640M0 129h640M0 203h640M0 277h640M0 351h640M0 425h640"/>
    <path fill="#192f5d" d="M0 0h364.8v258.5H0"/>
    <marker id="us-star" markerHeight="12" markerWidth="12" viewBox="-1 -1 3 3" refX="1" refY="1">
      <path fill="#fff" d="m1 0 .3.96-.82-.6h1.04l-.82.6z"/>
    </marker>
    {[...Array(9)].map((_, row) => (
      <path key={row} fill="none" markerMid="url(#us-star)" markerStart="url(#us-star)" markerEnd="url(#us-star)"
        d={row % 2 === 0 ? `M30 ${21.6 + row * 25.9}h307` : `M60.4 ${21.6 + row * 25.9}h244`}
      />
    ))}
  </svg>
);

const FlagES = () => (
  <svg viewBox="0 0 640 480" className="flag-icon">
    <path fill="#c60b1e" d="M0 0h640v480H0z"/>
    <path fill="#ffc400" d="M0 120h640v240H0z"/>
  </svg>
);

const FlagFR = () => (
  <svg viewBox="0 0 640 480" className="flag-icon">
    <path fill="#002654" d="M0 0h213.3v480H0z"/>
    <path fill="#fff" d="M213.3 0h213.4v480H213.3z"/>
    <path fill="#ce1126" d="M426.7 0H640v480H426.7z"/>
  </svg>
);

const FlagDE = () => (
  <svg viewBox="0 0 640 480" className="flag-icon">
    <path fill="#000" d="M0 0h640v160H0z"/>
    <path fill="#d00" d="M0 160h640v160H0z"/>
    <path fill="#ffce00" d="M0 320h640v160H0z"/>
  </svg>
);

const languageFlags = {
  en: <FlagUS />,
  es: <FlagES />,
  fr: <FlagFR />,
  de: <FlagDE />
};

function LanguageSelector() {
  const { language, changeLanguage, availableLanguages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
      >
        <span className="language-flag">{languageFlags[language]}</span>
        <span className="language-code">{language.toUpperCase()}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              className={`language-option ${lang === language ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang)}
            >
              <span className="language-flag">{languageFlags[lang]}</span>
              <span className="language-name">{languageNames[lang]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;
