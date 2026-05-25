import { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import { languageNames } from '../locales';

function Settings() {
  const { t, language, changeLanguage, availableLanguages } = useI18n();
  const [activeSection, setActiveSection] = useState('companyProfile');

  const settingsNav = [
    'companyProfile',
    'userPreferences',
    'notifications',
    'security',
    'integrations',
    'billing'
  ];

  return (
    <section className="page active">
      <div className="page-header">
        <h1>{t('settings.title')}</h1>
      </div>

      <div className="settings-container">
        <div className="settings-nav">
          <ul>
            {settingsNav.map((item) => (
              <li
                key={item}
                className={activeSection === item ? 'active' : ''}
                onClick={() => setActiveSection(item)}
              >
                {t(`settings.nav.${item}`)}
              </li>
            ))}
          </ul>
        </div>

        <div className="settings-content">
          <div className="settings-section">
            <h3>{t('settings.company.title')}</h3>
            <div className="form-group">
              <label>{t('settings.company.name')}</label>
              <input type="text" defaultValue="Acme Corporation" />
            </div>
            <div className="form-group">
              <label>{t('settings.company.industry')}</label>
              <select defaultValue="technology">
                <option value="technology">{t('settings.company.industries.technology')}</option>
                <option value="healthcare">{t('settings.company.industries.healthcare')}</option>
                <option value="finance">{t('settings.company.industries.finance')}</option>
                <option value="manufacturing">{t('settings.company.industries.manufacturing')}</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('settings.company.size')}</label>
              <select defaultValue="large">
                <option value="small">{t('settings.company.sizes.small')}</option>
                <option value="medium">{t('settings.company.sizes.medium')}</option>
                <option value="large">{t('settings.company.sizes.large')}</option>
                <option value="enterprise">{t('settings.company.sizes.enterprise')}</option>
                <option value="corporate">{t('settings.company.sizes.corporate')}</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>{t('settings.regional.title')}</h3>
            <div className="form-group">
              <label>{t('settings.regional.language')}</label>
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {languageNames[lang]}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>{t('settings.regional.timezone')}</label>
              <select defaultValue="et">
                <option value="pt">Pacific Time (PT)</option>
                <option value="et">Eastern Time (ET)</option>
                <option value="ct">Central Time (CT)</option>
                <option value="mt">Mountain Time (MT)</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('settings.regional.dateFormat')}</label>
              <select defaultValue="mdy">
                <option value="mdy">MM/DD/YYYY</option>
                <option value="dmy">DD/MM/YYYY</option>
                <option value="ymd">YYYY-MM-DD</option>
              </select>
            </div>
            <div className="form-group">
              <label>{t('settings.regional.currency')}</label>
              <select defaultValue="usd">
                <option value="usd">USD ($)</option>
                <option value="eur">EUR (€)</option>
                <option value="gbp">GBP (£)</option>
                <option value="jpy">JPY (¥)</option>
              </select>
            </div>
          </div>

          <div className="settings-actions">
            <button className="btn btn-secondary">{t('settings.actions.cancel')}</button>
            <button className="btn btn-primary">{t('settings.actions.saveChanges')}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;
