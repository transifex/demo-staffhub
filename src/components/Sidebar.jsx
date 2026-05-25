import { useI18n } from '../context/I18nContext';

const navItems = [
  { id: 'dashboard', icon: '▣' },
  { id: 'employees', icon: '👥' },
  { id: 'departments', icon: '🏢' },
  { id: 'leave', icon: '📅' },
  { id: 'payroll', icon: '💰' },
  { id: 'recruitment', icon: '📋' },
  { id: 'settings', icon: '⚙' }
];

function Sidebar({ currentPage, onNavigate, collapsed }) {
  const { t } = useI18n();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">S</span>
          {!collapsed && <span className="logo-text">{t('app.name')}</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!collapsed && <span className="nav-text">{t(`nav.${item.id}`)}</span>}
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">JD</div>
          {!collapsed && (
            <div className="user-details">
              <span className="user-name">Jane Doe</span>
              <span className="user-role">{t('user.role.hrManager')}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
