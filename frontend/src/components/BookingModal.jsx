import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookingModal({ sitter, onClose }) {
  const [packages, setPackages] = useState([]);
  const [selectedPkg, setSelectedPkg] = useState('');
  const [form, setForm] = useState({ parentName: '', parentPhone: '', parentEmail: '', date: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/packages').then(r => {
      const all = r.data.data;
      const available = all.filter(p => sitter.packages.includes(p.id));
      setPackages(available);
      if (available.length) setSelectedPkg(available[0].id);
    });
  }, [sitter]);

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.parentName || !form.parentPhone || !form.parentEmail) {
      setError('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      await axios.post('/api/bookings', {
        babysitterId: sitter.id,
        packageId: selectedPkg,
        ...form,
      });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedPkgObj = packages.find(p => p.id === selectedPkg);

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {success ? (
          <div style={{ textAlign: 'center', padding: '1rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{ color: '#166534', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
            <p style={{ color: '#57534e', marginBottom: '0.5rem' }}>
              You've successfully booked <strong>{sitter.name}</strong>.
            </p>
            <p style={{ color: '#92400e', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              A confirmation will be sent to <strong>{form.parentEmail}</strong>.
            </p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="modal-title">📅 Book {sitter.name}</h2>
            <p style={{ color: '#92400e', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{sitter.nameAr}</p>

            <div className="form-group">
              <label>Package | الباقة</label>
              <select value={selectedPkg} onChange={e => setSelectedPkg(e.target.value)}>
                {packages.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.price} {p.currency}
                  </option>
                ))}
              </select>
              {selectedPkgObj && (
                <span style={{ fontSize: '0.8rem', color: '#92400e' }}>{selectedPkgObj.description}</span>
              )}
            </div>

            <div className="form-group">
              <label>Start Date | تاريخ البدء</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Parent Name * | اسم الوالد</label>
              <input type="text" name="parentName" placeholder="e.g. Ahmed El-Masry" value={form.parentName} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone * | الهاتف</label>
              <input type="tel" name="parentPhone" placeholder="+20 1XX XXX XXXX" value={form.parentPhone} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email * | البريد الإلكتروني</label>
              <input type="email" name="parentEmail" placeholder="you@example.com" value={form.parentEmail} onChange={handleChange} required />
            </div>

            {error && (
              <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.6rem 0.9rem', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                {error}
              </div>
            )}

            {selectedPkgObj && (
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#7c2d12', fontWeight: 600 }}>Total</span>
                <span style={{ color: '#c2410c', fontWeight: 800, fontSize: '1.2rem' }}>{selectedPkgObj.price} EGP</span>
              </div>
            )}

            <div className="modal-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Confirming…' : 'Confirm Booking ✓'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
