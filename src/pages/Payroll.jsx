import { useI18n } from '../context/I18nContext';

const payrollHistory = [
  { id: 1, period: 'Jan 1 - Jan 15, 2026', payDate: 'Jan 20, 2026', employees: 248, grossPay: '$842,560.00', deductions: '$168,512.00', netPay: '$674,048.00', status: 'processing' },
  { id: 2, period: 'Dec 16 - Dec 31, 2025', payDate: 'Jan 5, 2026', employees: 246, grossPay: '$823,400.00', deductions: '$164,680.00', netPay: '$658,720.00', status: 'completed' },
  { id: 3, period: 'Dec 1 - Dec 15, 2025', payDate: 'Dec 20, 2025', employees: 244, grossPay: '$818,200.00', deductions: '$163,640.00', netPay: '$654,560.00', status: 'completed' }
];

function Payroll() {
  const { t } = useI18n();

  return (
    <section className="page active">
      <div className="page-header">
        <h1>{t('payroll.title')}</h1>
        <button className="btn btn-primary">{t('payroll.runPayroll')}</button>
      </div>

      <div className="payroll-summary">
        <div className="payroll-card">
          <h4>{t('payroll.summary.currentPeriod')}</h4>
          <span className="payroll-date">January 1 - January 15, 2026</span>
          <span className="payroll-status processing">{t('payroll.status.processing')}</span>
        </div>
        <div className="payroll-card">
          <h4>{t('payroll.summary.totalPayroll')}</h4>
          <span className="payroll-amount">$842,560.00</span>
          <span className="payroll-change">{t('payroll.summary.fromLastPeriod', { change: '+2.3%' })}</span>
        </div>
        <div className="payroll-card">
          <h4>{t('payroll.summary.nextPayDate')}</h4>
          <span className="payroll-date">January 20, 2026</span>
          <span className="payroll-sublabel">{t('payroll.summary.directDeposit')}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>{t('payroll.history.title')}</h2>
          <button className="btn btn-secondary">{t('payroll.history.exportReport')}</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>{t('payroll.columns.payPeriod')}</th>
              <th>{t('payroll.columns.payDate')}</th>
              <th>{t('payroll.columns.employeesPaid')}</th>
              <th>{t('payroll.columns.grossPay')}</th>
              <th>{t('payroll.columns.deductions')}</th>
              <th>{t('payroll.columns.netPay')}</th>
              <th>{t('payroll.columns.status')}</th>
            </tr>
          </thead>
          <tbody>
            {payrollHistory.map((record) => (
              <tr key={record.id}>
                <td>{record.period}</td>
                <td>{record.payDate}</td>
                <td>{record.employees}</td>
                <td>{record.grossPay}</td>
                <td>{record.deductions}</td>
                <td>{record.netPay}</td>
                <td>
                  <span className={`status-badge ${record.status}`}>
                    {t(`payroll.status.${record.status}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Payroll;
