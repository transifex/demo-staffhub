import { useI18n } from '../context/I18nContext';

const openPositions = [
  { id: 1, title: 'Senior Software Engineer', department: 'engineering', location: 'San Francisco, CA', posted: 'Jan 5, 2026', applications: 34, status: 'active' },
  { id: 2, title: 'Product Manager', department: 'product', location: 'Remote', posted: 'Jan 8, 2026', applications: 28, status: 'active' },
  { id: 3, title: 'Marketing Specialist', department: 'marketing', location: 'New York, NY', posted: 'Jan 10, 2026', applications: 19, status: 'active' },
  { id: 4, title: 'Financial Analyst', department: 'finance', location: 'Chicago, IL', posted: 'Dec 28, 2025', applications: 42, status: 'interviewing' }
];

function Recruitment() {
  const { t } = useI18n();

  return (
    <section className="page active">
      <div className="page-header">
        <h1>{t('recruitment.title')}</h1>
        <button className="btn btn-primary">{t('recruitment.postNewJob')}</button>
      </div>

      <div className="recruitment-stats">
        <div className="recruit-stat">
          <span className="recruit-stat-value">12</span>
          <span className="recruit-stat-label">{t('recruitment.stats.openPositions')}</span>
        </div>
        <div className="recruit-stat">
          <span className="recruit-stat-value">156</span>
          <span className="recruit-stat-label">{t('recruitment.stats.totalApplications')}</span>
        </div>
        <div className="recruit-stat">
          <span className="recruit-stat-value">23</span>
          <span className="recruit-stat-label">{t('recruitment.stats.interviewsScheduled')}</span>
        </div>
        <div className="recruit-stat">
          <span className="recruit-stat-value">8</span>
          <span className="recruit-stat-label">{t('recruitment.stats.offersExtended')}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>{t('recruitment.openPositions')}</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('recruitment.columns.position')}</th>
              <th>{t('recruitment.columns.department')}</th>
              <th>{t('recruitment.columns.location')}</th>
              <th>{t('recruitment.columns.posted')}</th>
              <th>{t('recruitment.columns.applications')}</th>
              <th>{t('recruitment.columns.status')}</th>
              <th>{t('recruitment.columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {openPositions.map((position) => (
              <tr key={position.id}>
                <td><strong>{position.title}</strong></td>
                <td>{t(`departments.names.${position.department}`)}</td>
                <td>{position.location}</td>
                <td>{position.posted}</td>
                <td>{position.applications}</td>
                <td>
                  <span className={`status-badge ${position.status}`}>
                    {t(`recruitment.status.${position.status}`)}
                  </span>
                </td>
                <td>
                  <button className="btn-icon" title={t('common.view')}>👁</button>
                  <button className="btn-icon" title={t('common.edit')}>✎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Recruitment;
