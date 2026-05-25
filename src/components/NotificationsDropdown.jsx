import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../context/I18nContext';

const notifications = [
  { id: 1, type: 'leave', title: 'leaveRequest', name: 'Michael Kim', time: 2, read: false },
  { id: 2, type: 'onboarding', title: 'onboardingComplete', name: 'Sarah Rodriguez', time: 4, read: false },
  { id: 3, type: 'review', title: 'reviewDue', name: 'John Davidson', time: 24, read: true },
];

function NotificationsDropdown() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(notifications);
  const dropdownRef = useRef(null);

  const unreadCount = items.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, read: true } : item
    ));
  };

  const markAllAsRead = () => {
    setItems(items.map(item => ({ ...item, read: true })));
  };

  const getNotificationText = (notification) => {
    switch (notification.title) {
      case 'leaveRequest':
        return t('notifications.leaveRequest', { name: notification.name });
      case 'onboardingComplete':
        return t('notifications.onboardingComplete', { name: notification.name });
      case 'reviewDue':
        return t('notifications.reviewDue', { name: notification.name });
      default:
        return '';
    }
  };

  const getTimeText = (hours) => {
    if (hours < 24) {
      return t('notifications.hoursAgo', { count: hours });
    }
    return t('notifications.daysAgo', { count: Math.floor(hours / 24) });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'leave': return '📅';
      case 'onboarding': return '✅';
      case 'review': return '📋';
      default: return '📌';
    }
  };

  return (
    <div className="notifications-dropdown" ref={dropdownRef}>
      <button
        className="header-btn notification-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('header.notifications')}
      >
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        🔔
      </button>

      {isOpen && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <h3>{t('notifications.title')}</h3>
            {unreadCount > 0 && (
              <button className="mark-all-read" onClick={markAllAsRead}>
                {t('notifications.markAllRead')}
              </button>
            )}
          </div>
          <div className="notifications-list">
            {items.length > 0 ? (
              items.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <span className="notification-icon">{getTypeIcon(notification.type)}</span>
                  <div className="notification-content">
                    <p>{getNotificationText(notification)}</p>
                    <span className="notification-time">{getTimeText(notification.time)}</span>
                  </div>
                  {!notification.read && <span className="unread-dot"></span>}
                </div>
              ))
            ) : (
              <div className="no-notifications">
                {t('notifications.empty')}
              </div>
            )}
          </div>
          <div className="notifications-footer">
            <button className="view-all-btn">{t('notifications.viewAll')}</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationsDropdown;
