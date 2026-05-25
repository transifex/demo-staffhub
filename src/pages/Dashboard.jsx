import { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import ConfirmationModal from '../components/ConfirmationModal';

const recentActivities = [
  { id: 1, initials: 'MK', name: 'Michael Kim', action: 'submittedLeave', dates: 'December 23-27', time: 2 },
  { id: 2, initials: 'SR', name: 'Sarah Rodriguez', action: 'completedOnboarding', time: 4 },
  { id: 3, initials: 'TW', name: 'Tom Wilson', action: 'updatedContact', time: 'yesterday' },
  { id: 4, initials: 'AL', name: 'Amy Lee', action: 'wasPromoted', position: 'Senior Developer', time: 2, unit: 'days' }
];

const upcomingEvents = [
  { id: 1, day: '20', month: 'Jan', titleKey: 'townHall', descKey: 'townHallDesc' },
  { id: 2, day: '22', month: 'Jan', titleKey: 'newHireOrientation', descKey: 'newHireOrientationDesc', count: 3 },
  { id: 3, day: '25', month: 'Jan', titleKey: 'benefitsDeadline', descKey: 'benefitsDeadlineDesc', time: '5:00 PM' }
];

const initialPendingApprovals = [
  { id: 1, initials: 'MK', name: 'Michael Kim', type: 'annualLeave', typeClass: 'leave', details: 'December 23-27, 2025 (5 days)', submitted: 'Jan 15, 2026' },
  { id: 2, initials: 'EJ', name: 'Emily Johnson', type: 'expenseClaim', typeClass: 'expense', details: 'Client dinner - $156.00', submitted: 'Jan 14, 2026' },
  { id: 3, initials: 'DM', name: 'David Martinez', type: 'trainingRequest', typeClass: 'training', details: 'AWS Certification Course', submitted: 'Jan 12, 2026' }
];

function Dashboard() {
  const { t } = useI18n();
  const [pendingApprovals, setPendingApprovals] = useState(initialPendingApprovals);
  const [modalState, setModalState] = useState({ isOpen: false, action: null, item: null });

  const handleApprove = (id) => {
    const approval = pendingApprovals.find(a => a.id === id);
    if (approval) {
      setModalState({ isOpen: true, action: 'approve', item: approval });
    }
  };

  const handleReject = (id) => {
    const approval = pendingApprovals.find(a => a.id === id);
    if (approval) {
      setModalState({ isOpen: true, action: 'reject', item: approval });
    }
  };

  const handleModalConfirm = () => {
    if (modalState.item) {
      setPendingApprovals(pendingApprovals.filter(a => a.id !== modalState.item.id));
    }
    setModalState({ isOpen: false, action: null, item: null });
  };

  const handleModalCancel = () => {
    setModalState({ isOpen: false, action: null, item: null });
  };

  const getModalMessage = () => {
    if (!modalState.item) return '';
    return modalState.action === 'approve'
      ? t('confirmations.approveRequest', { name: modalState.item.name })
      : t('confirmations.rejectRequest', { name: modalState.item.name });
  };

  const getTimeAgo = (activity) => {
    if (activity.time === 'yesterday') {
      return t('dashboard.recentActivity.yesterday');
    }
    if (activity.unit === 'days') {
      return t('dashboard.recentActivity.daysAgo', { count: activity.time });
    }
    return t('dashboard.recentActivity.hoursAgo', { count: activity.time });
  };

  const getActivityText = (activity) => {
    switch (activity.action) {
      case 'submittedLeave':
        return t('dashboard.recentActivity.submittedLeave', { name: activity.name, dates: activity.dates });
      case 'completedOnboarding':
        return t('dashboard.recentActivity.completedOnboarding', { name: activity.name });
      case 'updatedContact':
        return t('dashboard.recentActivity.updatedContact', { name: activity.name });
      case 'wasPromoted':
        return t('dashboard.recentActivity.wasPromoted', { name: activity.name, position: activity.position });
      default:
        return '';
    }
  };

  return (
    <section className="page active">
      <div className="page-header">
        <h1>{t('dashboard.title')}</h1>
        <p className="page-subtitle">{t('dashboard.welcome', { name: 'Jane' })}</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">👤</div>
          <div className="stat-info">
            <span className="stat-value">248</span>
            <span className="stat-label">{t('dashboard.stats.totalEmployees')}</span>
          </div>
          <span className="stat-trend positive">{t('dashboard.stats.thisMonth', { count: 12 })}</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div className="stat-info">
            <span className="stat-value">18</span>
            <span className="stat-label">{t('dashboard.stats.onLeaveToday')}</span>
          </div>
          <span className="stat-trend neutral">{t('dashboard.stats.pendingApproval', { count: 5 })}</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">💼</div>
          <div className="stat-info">
            <span className="stat-value">12</span>
            <span className="stat-label">{t('dashboard.stats.openPositions')}</span>
          </div>
          <span className="stat-trend positive">{t('dashboard.stats.newThisWeek', { count: 3 })}</span>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">📅</div>
          <div className="stat-info">
            <span className="stat-value">8</span>
            <span className="stat-label">{t('dashboard.stats.upcomingReviews')}</span>
          </div>
          <span className="stat-trend neutral">{t('dashboard.stats.nextDays', { count: 7 })}</span>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card recent-activity">
          <div className="card-header">
            <h2>{t('dashboard.recentActivity.title')}</h2>
            <a href="#" className="view-all">{t('dashboard.recentActivity.viewAll')}</a>
          </div>
          <div className="card-content">
            <ul className="activity-list">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="activity-item">
                  <div className="activity-avatar">{activity.initials}</div>
                  <div className="activity-details">
                    <p dangerouslySetInnerHTML={{ __html: getActivityText(activity) }} />
                    <span className="activity-time">{getTimeAgo(activity)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card upcoming-events">
          <div className="card-header">
            <h2>{t('dashboard.upcomingEvents.title')}</h2>
            <a href="#" className="view-all">{t('dashboard.upcomingEvents.viewCalendar')}</a>
          </div>
          <div className="card-content">
            <ul className="event-list">
              {upcomingEvents.map((event) => (
                <li key={event.id} className="event-item">
                  <div className="event-date">
                    <span className="day">{event.day}</span>
                    <span className="month">{event.month}</span>
                  </div>
                  <div className="event-details">
                    <h4>{t(`events.${event.titleKey}`)}</h4>
                    <p>{t(`events.${event.descKey}`, { count: event.count, time: event.time })}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="card pending-approvals">
        <div className="card-header">
          <h2>{t('dashboard.pendingApprovals.title')}</h2>
          <span className="badge-count">{t('dashboard.pendingApprovals.items', { count: 5 })}</span>
        </div>
        <div className="card-content">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('dashboard.pendingApprovals.columns.employee')}</th>
                <th>{t('dashboard.pendingApprovals.columns.requestType')}</th>
                <th>{t('dashboard.pendingApprovals.columns.details')}</th>
                <th>{t('dashboard.pendingApprovals.columns.submitted')}</th>
                <th>{t('dashboard.pendingApprovals.columns.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {pendingApprovals.map((approval) => (
                <tr key={approval.id}>
                  <td>
                    <div className="employee-cell">
                      <span className="avatar">{approval.initials}</span>
                      <span>{approval.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`request-type ${approval.typeClass}`}>
                      {t(`requestTypes.${approval.type}`)}
                    </span>
                  </td>
                  <td>{approval.details}</td>
                  <td>{approval.submitted}</td>
                  <td>
                    <button className="btn btn-approve" onClick={() => handleApprove(approval.id)}>{t('common.approve')}</button>
                    <button className="btn btn-reject" onClick={() => handleReject(approval.id)}>{t('common.reject')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        isOpen={modalState.isOpen}
        message={getModalMessage()}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />
    </section>
  );
}

export default Dashboard;
