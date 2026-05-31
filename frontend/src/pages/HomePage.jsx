import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../components/Avatar.jsx';
import Stars from '../components/Stars.jsx';

const CAIRO_AREAS = [
  'Maadi', 'Zamalek', 'Heliopolis', 'New Cairo',
  'Nasr City', 'Dokki', 'Mohandessin', '6th of October',
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [area, setArea] = useState('');
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/babysitters').then(r => {
      const sorted = [...r.data.data].sort((a, b) => b.rating - a.rating);
      setFeatured(sorted.slice(0, 4));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (area) params.set('area', area);
    navigate(`/search?${params.toString()}`);
  }

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <h1>Find Trusted Babysitters in Cairo</h1>
        <p className="subtitle">أجدي مربية موثوقة في القاهرة — Daily, Weekly & Monthly Packages</p>
        <form className="hero-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search by name or area..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select value={area} onChange={e => setArea(e.target.value)}>
            <option value="">All Areas</option>
            {CAIRO_AREAS.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <button type="submit" className="btn-primary">Search</button>
        </form>
      </section>

      {/* Packages Banner */}
      <section className="packages-banner">
        <div className="packages-banner-inner">
          <h2>Flexible Packages — باقات مرنة</h2>
          <p>Choose the care schedule that fits your family</p>
          <div className="packages-row">
            <div className="pkg-item">
              <h3>Daily Package</h3>
              <div className="ar">الباقة اليومية</div>
              <div className="price">150 <span>EGP</span></div>
              <div className="desc">Full day, up to 8 hours</div>
            </div>
            <div className="pkg-item featured">
              <h3>Weekly Package</h3>
              <div className="ar">الباقة الأسبوعية</div>
              <div className="price">800 <span>EGP</span></div>
              <div className="desc">5 days/week, best value</div>
            </div>
            <div className="pkg-item">
              <h3>Monthly Package</h3>
              <div className="ar">الباقة الشهرية</div>
              <div className="price">2,500 <span>EGP</span></div>
              <div className="desc">Full month, priority scheduling</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Babysitters */}
      <section className="section">
        <h2 className="section-title">
          Top-Rated Babysitters
          <span className="ar"> | أفضل المربيات</span>
        </h2>
        <p className="section-subtitle">Highly rated professionals in Cairo</p>
        {loading ? (
          <div className="loading">Loading babysitters...</div>
        ) : (
          <div className="cards-grid">
            {featured.map(s => (
              <SitterCard key={s.id} sitter={s} onClick={() => navigate(`/babysitters/${s.id}`)} />
            ))}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn-primary" onClick={() => navigate('/babysitters')}>
            View All Babysitters
          </button>
        </div>
      </section>
    </div>
  );
}

function SitterCard({ sitter, onClick }) {
  return (
    <div className="sitter-card" onClick={onClick}>
      <div className="sitter-card-header">
        <Avatar name={sitter.name} />
        <div className="sitter-card-name">
          <h3>{sitter.name}</h3>
          <div className="name-ar">{sitter.nameAr}</div>
        </div>
      </div>
      <div className="sitter-card-body">
        <div className="rating-row">
          <Stars rating={sitter.rating} showValue={false} />
          <span className="rating-num">{sitter.rating.toFixed(1)}</span>
          <span className="review-count">({sitter.reviewCount} reviews)</span>
        </div>
        <div className="tags">
          <span className="tag">{sitter.experience} yrs exp</span>
          <span className="tag green">{sitter.availability}</span>
        </div>
        <div className="tags">
          {sitter.areas.slice(0, 2).map(a => (
            <span key={a} className="tag">{a}</span>
          ))}
          {sitter.areas.length > 2 && <span className="tag">+{sitter.areas.length - 2}</span>}
        </div>
      </div>
      <div className="sitter-card-footer">
        <div className="price-hint">from <strong>150</strong> EGP/day</div>
        <button className="btn-secondary">View Profile</button>
      </div>
    </div>
  );
}
