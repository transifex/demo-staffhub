import { useState } from 'react';
import { useI18n } from '../context/I18nContext';
import ConfirmationModal from '../components/ConfirmationModal';

const initialLeaveRequests = [
  { id: 1, initials: 'MK', name: 'Michael Kim', type: 'annual', startDate: 'Jan 23, 2026', endDate: 'Jan 27, 2026', duration: 5, status: 'pending' },
  { id: 2, initials: 'AL', name: 'Amy Lee', type: 'sick', startDate: 'Jan 18, 2026', endDate: 'Jan 19, 2026', duration: 2, status: 'approved' },
  { id: 3, initials: 'JD', name: 'John Davidson', type: 'personal', startDate: 'Jan 30, 2026', endDate: 'Jan 30, 2026', duration: 1, status: 'pending' },
  { id: 4, initials: 'SR', name: 'Sarah Rodriguez', type: 'annual', startDate: 'Feb 10, 2026', endDate: 'Feb 14, 2026', duration: 5, status: 'approved' },
  { id: 5, initials: 'EJ', name: 'Emily Johnson', type: 'parental', startDate: 'Mar 1, 2026', endDate: 'May 31, 2026', duration: 92, status: 'approved' }
];

function LeaveRequests() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('all');
  const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
  const [modalState, setModalState] = useState({ isOpen: false, action: null, item: null });

  const handleApprove = (id) => {
    const request = leaveRequests.find(r => r.id === id);
    if (request) {
      setModalState({ isOpen: true, action: 'approve', item: request });
    }
  };

  const handleReject = (id) => {
    const request = leaveRequests.find(r => r.id === id);
    if (request) {
      setModalState({ isOpen: true, action: 'reject', item: request });
    }
  };

  const handleModalConfirm = () => {
    if (modalState.item) {
      setLeaveRequests(leaveRequests.filter(r => r.id !== modalState.item.id));
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

  const filteredRequests = activeTab === 'all'
    ? leaveRequests
    : leaveRequests.filter(req => req.status === activeTab);

  const getDuration = (days) => {
    return days === 1
      ? t('leave.duration.day', { count: days })
      : t('leave.duration.days', { count: days });
  };

  return (
    <section className="page active">
      <div className="page-header">
        <h1>{t('leave.title')}</h1>
        <button className="btn btn-primary">{t('leave.newRequest')}</button>
      </div>

      <div className="leave-summary">
        <div className="leave-stat-card">
          <h4>{t('leave.summary.pendingRequests')}</h4>
          <span className="leave-stat-value">5</span>
          <span className="leave-stat-sublabel">{t('leave.summary.awaitingApproval')}</span>
        </div>
        <div className="leave-stat-card">
          <h4>{t('leave.summary.onLeaveToday')}</h4>
          <span className="leave-stat-value">18</span>
          <span className="leave-stat-sublabel">{t('leave.summary.acrossDepartments')}</span>
        </div>
        <div className="leave-stat-card">
          <h4>{t('leave.summary.upcomingLeave')}</h4>
          <span className="leave-stat-value">24</span>
          <span className="leave-stat-sublabel">{t('leave.summary.nextDays', { count: 30 })}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>{t('leave.allRequests')}</h2>
          <div className="tab-filters">
            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {t(`leave.tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('leave.columns.employee')}</th>
              <th>{t('leave.columns.leaveType')}</th>
              <th>{t('leave.columns.startDate')}</th>
              <th>{t('leave.columns.endDate')}</th>
              <th>{t('leave.columns.duration')}</th>
              <th>{t('leave.columns.status')}</th>
              <th>{t('leave.columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>
                  <div className="employee-cell">
                    <span className="avatar">{request.initials}</span>
                    <span>{request.name}</span>
                  </div>
                </td>
                <td>{t(`leave.types.${request.type}`)}</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{getDuration(request.duration)}</td>
                <td>
                  <span className={`status-badge ${request.status}`}>
                    {t(`leave.status.${request.status}`)}
                  </span>
                </td>
                <td>
                  {request.status === 'pending' ? (
                    <>
                      <button className="btn btn-approve" onClick={() => handleApprove(request.id)}>{t('common.approve')}</button>
                      <button className="btn btn-reject" onClick={() => handleReject(request.id)}>{t('common.reject')}</button>
                    </>
                  ) : (
                    <button className="btn-icon" title={t('common.view')}>👁</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default LeaveRequests;
