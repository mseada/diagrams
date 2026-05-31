import React, { useState } from 'react';
import axios from 'axios';

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const r = await axios.get('/api/admin/customers', {
        headers: { 'x-admin-key': key },
      });
      setCustomers(r.data.data);
      setBookings(r.data.bookings || []);
      setAuthed(true);
    } catch {
      setError('Invalid admin key. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (!authed) {
    return (
      <div style={{ background: '#fdf6ee', minHeight: '100vh', paddingTop: '2rem' }}>
        <div className="admin-login">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔐</div>
          <h1>Admin Portal</h1>
          <p className="sub">لوحة تحكم المشرف — Enter your admin key to continue</p>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Admin Key</label>
              <input
                type="password"
                required
                placeholder="Enter admin key..."
                value={key}
                onChange={e => setKey(e.target.value)}
              />
            </div>
            {error && <p className="error-msg">{error}</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Login — دخول'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#fdf6ee', minHeight: '100vh' }}>
      <div className="admin-page">
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard — لوحة التحكم</h1>
            <p style={{ color: '#a07050', fontSize: '0.9rem' }}>
              {customers.length} registered customers · {bookings.length} bookings
            </p>
          </div>
          <span className="admin-badge">Admin Access</span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Customers', labelAr: 'العملاء', value: customers.length, icon: '👨‍👩‍👧' },
            { label: 'Total Bookings', labelAr: 'الحجوزات', value: bookings.length, icon: '📅' },
            { label: 'Total Children', labelAr: 'الأطفال', value: customers.reduce((s, c) => s + c.children, 0), icon: '👶' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#fff', borderRadius: '14px', padding: '1.25rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center',
            }}>
              <div style={{ fontSize: '2rem' }}>{stat.icon}</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#e07b39' }}>{stat.value}</div>
              <div style={{ fontSize: '0.85rem', color: '#8a6040', fontWeight: 600 }}>{stat.label}</div>
              <div style={{ fontSize: '0.78rem', color: '#c0a080' }}>{stat.labelAr}</div>
            </div>
          ))}
        </div>

        {/* Customers Table */}
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#3d2c1e', marginBottom: '1rem' }}>
          Customer Profiles — ملفات العملاء
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Arabic Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Area</th>
                <th>Children</th>
                <th>Ages</th>
                <th>Bookings</th>
                <th>Preferred Sitter</th>
                <th>Registered</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600 }}>{c.name}</td>
                  <td>{c.nameAr}</td>
                  <td style={{ color: '#c0622a' }}>{c.email}</td>
                  <td>{c.phone}</td>
                  <td><span className="tag">{c.area}</span></td>
                  <td style={{ textAlign: 'center' }}>{c.children}</td>
                  <td>{c.childrenAges.join(', ')} yrs</td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{c.bookings}</td>
                  <td style={{ fontSize: '0.85rem' }}>{c.preferredBabysitter}</td>
                  <td style={{ fontSize: '0.82rem', color: '#a07050' }}>{c.registeredAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bookings Table */}
        {bookings.length > 0 && (
          <>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#3d2c1e', marginBottom: '1rem' }}>
              Recent Bookings — الحجوزات الأخيرة
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Parent Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Babysitter</th>
                    <th>Package</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontWeight: 600 }}>{b.parentName}</td>
                      <td>{b.parentEmail}</td>
                      <td>{b.parentPhone}</td>
                      <td>{b.babysitterName}</td>
                      <td>{b.packageName}</td>
                      <td style={{ fontWeight: 700, color: '#e07b39' }}>{b.price} {b.currency}</td>
                      <td>{b.date}</td>
                      <td>
                        <span className="tag green">{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <div style={{ marginTop: '2rem', textAlign: 'right' }}>
          <button
            className="btn-cancel"
            onClick={() => { setAuthed(false); setKey(''); }}
          >
            Logout — خروج
          </button>
        </div>
      </div>
    </div>
  );
}
