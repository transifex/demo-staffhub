import { useI18n } from '../context/I18nContext';
import LanguageSelector from './LanguageSelector';
import NotificationsDropdown from './NotificationsDropdown';

function Header({ onMenuToggle }) {
  const { t } = useI18n();

  return (
    <header className="top-header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          ☰
        </button>
        <div className="search-box">
          <input
            type="text"
            placeholder={t('header.searchPlaceholder')}
          />
        </div>
      </div>
      <div className="header-right">
        <LanguageSelector />
        <NotificationsDropdown />
        <button className="header-btn">⚙</button>
      </div>
    </header>
  );
}

export default Header;
