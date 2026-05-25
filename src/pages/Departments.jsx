import { useI18n } from '../context/I18nContext';

const departments = [
  { id: 1, name: 'engineering', icon: '💻', color: 'blue', employees: 64, teams: 5, openRoles: 3, manager: { initials: 'RB', name: 'Robert Brown', title: 'vpEngineering' } },
  { id: 2, name: 'sales', icon: '📈', color: 'green', employees: 42, teams: 4, openRoles: 2, manager: { initials: 'LC', name: 'Lisa Chen', title: 'salesDirector' } },
  { id: 3, name: 'marketing', icon: '📢', color: 'orange', employees: 28, teams: 3, openRoles: 4, manager: { initials: 'JM', name: 'Jennifer Moore', title: 'marketingDirector' } },
  { id: 4, name: 'finance', icon: '💰', color: 'purple', employees: 18, teams: 2, openRoles: 1, manager: { initials: 'PT', name: 'Paul Thompson', title: 'cfo' } },
  { id: 5, name: 'humanResources', icon: '👥', color: 'pink', employees: 12, teams: 2, openRoles: 1, manager: { initials: 'JD', name: 'Jane Doe', title: 'hrDirector' } },
  { id: 6, name: 'operations', icon: '🔧', color: 'teal', employees: 34, teams: 4, openRoles: 1, manager: { initials: 'MW', name: 'Mark Williams', title: 'coo' } }
];

function Departments() {
  const { t } = useI18n();

  return (
    <section className="page active">
      <div className="page-header">
        <h1>{t('departments.title')}</h1>
        <button className="btn btn-primary">{t('departments.addDepartment')}</button>
      </div>

      <div className="departments-grid">
        {departments.map((dept) => (
          <div key={dept.id} className="department-card">
            <div className="dept-header">
              <div className={`dept-icon ${dept.color}`}>{dept.icon}</div>
              <h3>{t(`departments.names.${dept.name}`)}</h3>
            </div>
            <div className="dept-stats">
              <div className="dept-stat">
                <span className="stat-num">{dept.employees}</span>
                <span className="stat-label">{t('departments.stats.employees')}</span>
              </div>
              <div className="dept-stat">
                <span className="stat-num">{dept.teams}</span>
                <span className="stat-label">{t('departments.stats.teams')}</span>
              </div>
              <div className="dept-stat">
                <span className="stat-num">{dept.openRoles}</span>
                <span className="stat-label">{t('departments.stats.openRoles')}</span>
              </div>
            </div>
            <div className="dept-manager">
              <span className="avatar">{dept.manager.initials}</span>
              <div>
                <span className="manager-name">{dept.manager.name}</span>
                <span className="manager-title">{t(`departments.titles.${dept.manager.title}`)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Departments;
