import React, { useState } from 'react';
import axios from 'axios';

export default function BookingModal({ sitter, selectedPkg, packageInfo, onClose }) {
  const pkg = packageInfo[selectedPkg];
  const [form, setForm] = useState({ parentName: '', parentPhone: '', parentEmail: '', date: '' });
  const [activePkg, setActivePkg] = useState(selectedPkg);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('/api/bookings', {
        babysitterId: sitter.id,
        packageId: activePkg,
        ...form,
      });
      setDone(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {done ? (
          <div className="success-msg">
            <div className="icon">✅</div>
            <h3>Booking Confirmed! — تم الحجز</h3>
            <p>
              You've booked <strong>{sitter.name}</strong> for the{' '}
              <strong>{packageInfo[activePkg].name}</strong> ({packageInfo[activePkg].ratePerHour} EGP/hr).
            </p>
            <p style={{ marginTop: '0.5rem' }}>We'll be in touch shortly.</p>
            <button className="btn-primary" style={{ marginTop: '1.5rem' }} onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <h2>Book {sitter.name}</h2>
            <p className="sub">Complete your booking details below</p>

            {/* Package selector inside modal */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
              {sitter.packages.filter(pkgId => packageInfo[pkgId].available !== false).map(pkgId => (
                <button
                  key={pkgId}
                  type="button"
                  onClick={() => setActivePkg(pkgId)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    border: `2px solid ${activePkg === pkgId ? '#e07b39' : '#e8d0b8'}`,
                    borderRadius: '8px',
                    background: activePkg === pkgId ? '#fff8f2' : '#fdf6ee',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: activePkg === pkgId ? '#e07b39' : '#8a6040',
                  }}
                >
                  {packageInfo[pkgId].name}<br />
                  <span style={{ fontWeight: 400 }}>{packageInfo[pkgId].ratePerHour} EGP/hr</span>
                </button>
              ))}
            </div>
            {activePkg && packageInfo[activePkg] && (
              <div style={{ fontSize: '0.78rem', color: '#92400e', background: '#fff8f0', border: '1px solid #f5d9b0', borderRadius: '6px', padding: '0.5rem 0.75rem', marginBottom: '1rem' }}>
                ℹ️ Min {packageInfo[activePkg].minHours} hrs · Min charge {packageInfo[activePkg].ratePerHour * packageInfo[activePkg].minHours} EGP · Transportation calculated per day based on area
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name — اسمك</label>
                <input
                  name="parentName"
                  required
                  placeholder="Full name"
                  value={form.parentName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Phone — الهاتف</label>
                <input
                  name="parentPhone"
                  required
                  placeholder="+20 1XX XXX XXXX"
                  value={form.parentPhone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email — البريد الإلكتروني</label>
                <input
                  name="parentEmail"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={form.parentEmail}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Start Date — تاريخ البدء</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {error && <p className="error-msg">{error}</p>}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ flex: 2 }} disabled={loading}>
                  {loading ? 'Booking...' : `Confirm — ${packageInfo[activePkg].ratePerHour} EGP/hr`}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
