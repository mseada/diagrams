import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../components/Avatar.jsx';
import Stars from '../components/Stars.jsx';
import BookingModal from './BookingModal.jsx';

const PACKAGE_INFO = {
  daily:   { name: 'Daily Package',   nameAr: 'الباقة اليومية',   price: 150, desc: 'Full day, up to 8 hours' },
  weekly:  { name: 'Weekly Package',  nameAr: 'الباقة الأسبوعية', price: 800, desc: '5 days/week' },
  monthly: { name: 'Monthly Package', nameAr: 'الباقة الشهرية',   price: 2500, desc: 'Full month coverage' },
};

export default function BabysitterProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sitter, setSitter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    axios.get(`/api/babysitters/${id}`)
      .then(r => { setSitter(r.data.data); setLoading(false); })
      .catch(() => { setLoading(false); });
  }, [id]);

  if (loading) return <div className="loading">Loading profile...</div>;
  if (!sitter) return (
    <div className="empty" style={{ marginTop: '4rem' }}>
      <div className="icon">😕</div>
      <p>Babysitter not found.</p>
      <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/babysitters')}>
        Back to List
      </button>
    </div>
  );

  return (
    <div className="profile-page">
      <button
        onClick={() => navigate(-1)}
        style={{ background: 'none', border: 'none', color: '#a07050', cursor: 'pointer', marginBottom: '1rem', fontSize: '0.9rem' }}
      >
        ← Back
      </button>

      {/* Hero */}
      <div className="profile-hero">
        <Avatar name={sitter.name} size="lg" />
        <div className="profile-info">
          <h1>{sitter.name}</h1>
          <div className="name-ar">{sitter.nameAr}</div>
          <div className="rating-row" style={{ margin: '0.4rem 0' }}>
            <Stars rating={sitter.rating} />
            <span className="review-count">({sitter.reviewCount} reviews)</span>
          </div>
          <div className="profile-meta">
            <span className="meta-badge">{sitter.experience} yrs experience</span>
            <span className="meta-badge">Age {sitter.age}</span>
            <span className="meta-badge">{sitter.availability}</span>
            {sitter.languages.map(l => <span key={l} className="meta-badge">{l}</span>)}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="profile-section">
        <h2>About — نبذة</h2>
        <p>{sitter.bio}</p>
      </div>

      {/* Areas */}
      <div className="profile-section">
        <h2>Service Areas — مناطق الخدمة</h2>
        <div className="tags">
          {sitter.areas.map(a => <span key={a} className="tag">{a}</span>)}
        </div>
      </div>

      {/* Certifications */}
      <div className="profile-section">
        <h2>Certifications — الشهادات</h2>
        <ul className="cert-list">
          {sitter.certifications.map(c => <li key={c}>{c}</li>)}
        </ul>
      </div>

      {/* Packages */}
      <div className="profile-section">
        <h2>Available Packages — الباقات المتاحة</h2>
        <div className="packages-grid">
          {sitter.packages.map(pkgId => {
            const pkg = PACKAGE_INFO[pkgId];
            return (
              <div
                key={pkgId}
                className={`package-card ${selectedPkg === pkgId ? 'selected' : ''}`}
                onClick={() => setSelectedPkg(pkgId)}
              >
                <h3>{pkg.name}</h3>
                <div className="pkg-ar">{pkg.nameAr}</div>
                <div className="package-price">
                  {pkg.price.toLocaleString()} <span className="currency">EGP</span>
                </div>
                <div className="package-desc">{pkg.desc}</div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <button
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}
            onClick={() => {
              if (!selectedPkg) setSelectedPkg(sitter.packages[0]);
              setShowBooking(true);
            }}
          >
            Book Now — احجزي الآن
          </button>
          {!selectedPkg && (
            <p style={{ fontSize: '0.82rem', color: '#a07050', marginTop: '0.4rem' }}>
              Select a package above or we'll choose the first available.
            </p>
          )}
        </div>
      </div>

      {showBooking && (
        <BookingModal
          sitter={sitter}
          selectedPkg={selectedPkg || sitter.packages[0]}
          packageInfo={PACKAGE_INFO}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  );
}
