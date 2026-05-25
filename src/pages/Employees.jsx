import { useState, useMemo } from 'react';
import { useI18n } from '../context/I18nContext';

const employees = [
  { id: 'EMP-001', initials: 'JD', name: 'John Davidson', email: 'j.davidson@company.com', department: 'engineering', position: 'Senior Software Engineer', status: 'active', employmentType: 'fullTime', startDate: 'Mar 15, 2019' },
  { id: 'EMP-002', initials: 'SR', name: 'Sarah Rodriguez', email: 's.rodriguez@company.com', department: 'marketing', position: 'Marketing Manager', status: 'active', employmentType: 'fullTime', startDate: 'Jul 8, 2020' },
  { id: 'EMP-003', initials: 'MK', name: 'Michael Kim', email: 'm.kim@company.com', department: 'sales', position: 'Sales Representative', status: 'onLeave', employmentType: 'fullTime', startDate: 'Jan 20, 2021' },
  { id: 'EMP-004', initials: 'AL', name: 'Amy Lee', email: 'a.lee@company.com', department: 'engineering', position: 'Senior Developer', status: 'remote', employmentType: 'fullTime', startDate: 'Sep 5, 2018' },
  { id: 'EMP-005', initials: 'TW', name: 'Tom Wilson', email: 't.wilson@company.com', department: 'finance', position: 'Financial Analyst', status: 'active', employmentType: 'contract', startDate: 'Apr 12, 2022' },
  { id: 'EMP-006', initials: 'EJ', name: 'Emily Johnson', email: 'e.johnson@company.com', department: 'humanResources', position: 'HR Coordinator', status: 'active', employmentType: 'fullTime', startDate: 'Nov 28, 2021' },
  { id: 'EMP-007', initials: 'RB', name: 'Robert Brown', email: 'r.brown@company.com', department: 'engineering', position: 'VP of Engineering', status: 'active', employmentType: 'fullTime', startDate: 'Feb 10, 2017' },
  { id: 'EMP-008', initials: 'LC', name: 'Lisa Chen', email: 'l.chen@company.com', department: 'sales', position: 'Sales Director', status: 'active', employmentType: 'fullTime', startDate: 'Jun 15, 2018' },
  { id: 'EMP-009', initials: 'DM', name: 'David Martinez', email: 'd.martinez@company.com', department: 'engineering', position: 'DevOps Engineer', status: 'remote', employmentType: 'partTime', startDate: 'Aug 22, 2023' },
  { id: 'EMP-010', initials: 'JM', name: 'Jennifer Moore', email: 'j.moore@company.com', department: 'marketing', position: 'Marketing Director', status: 'active', employmentType: 'fullTime', startDate: 'Mar 5, 2019' }
];

const departments = ['engineering', 'marketing', 'sales', 'humanResources', 'finance'];
const statuses = ['active', 'onLeave', 'remote'];
const employmentTypes = ['fullTime', 'partTime', 'contract'];

function Employees() {
  const { t } = useI18n();
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('all');

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      if (departmentFilter !== 'all' && employee.department !== departmentFilter) {
        return false;
      }
      if (statusFilter !== 'all' && employee.status !== statusFilter) {
        return false;
      }
      if (employmentTypeFilter !== 'all' && employee.employmentType !== employmentTypeFilter) {
        return false;
      }
      return true;
    });
  }, [departmentFilter, statusFilter, employmentTypeFilter]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'active': return 'active';
      case 'onLeave': return 'leave';
      case 'remote': return 'remote';
      default: return '';
    }
  };

  return (
    <section className="page active">
      <div className="page-header">
        <h1>{t('employees.title')}</h1>
        <button className="btn btn-primary">{t('employees.addEmployee')}</button>
      </div>

      <div className="filters-bar">
        <div className="filter-group">
          <label>{t('employees.filters.department')}</label>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="all">{t('employees.filters.allDepartments')}</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {t(`departments.names.${dept}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>{t('employees.filters.status')}</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">{t('employees.filters.allStatus')}</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {t(`employees.status.${status}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>{t('employees.filters.employmentType')}</label>
          <select
            value={employmentTypeFilter}
            onChange={(e) => setEmploymentTypeFilter(e.target.value)}
          >
            <option value="all">{t('employees.filters.allTypes')}</option>
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {t(`employees.filters.${type}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="card">
        <table className="data-table employee-table">
          <thead>
            <tr>
              <th>{t('employees.columns.employee')}</th>
              <th>{t('employees.columns.employeeId')}</th>
              <th>{t('employees.columns.department')}</th>
              <th>{t('employees.columns.position')}</th>
              <th>{t('employees.columns.status')}</th>
              <th>{t('employees.columns.startDate')}</th>
              <th>{t('employees.columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="employee-cell">
                      <span className="avatar">{employee.initials}</span>
                      <div className="employee-info">
                        <span className="name">{employee.name}</span>
                        <span className="email">{employee.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{employee.id}</td>
                  <td>{t(`departments.names.${employee.department}`)}</td>
                  <td>{employee.position}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(employee.status)}`}>
                      {t(`employees.status.${employee.status}`)}
                    </span>
                  </td>
                  <td>{employee.startDate}</td>
                  <td>
                    <button className="btn-icon" title={t('common.view')}>👁</button>
                    <button className="btn-icon" title={t('common.edit')}>✎</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>
                  {t('common.noData')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="table-footer">
          <span className="showing-info">
            {t('employees.pagination.showing', {
              from: filteredEmployees.length > 0 ? 1 : 0,
              to: filteredEmployees.length,
              total: filteredEmployees.length
            })}
          </span>
          <div className="pagination">
            <button className="btn-page" disabled>«</button>
            <button className="btn-page active">1</button>
            <button className="btn-page">»</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Employees;
