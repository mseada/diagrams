import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../components/Avatar.jsx';
import Stars from '../components/Stars.jsx';

const CAIRO_AREAS = [
  'Maadi', 'Zamalek', 'Heliopolis', 'New Cairo',
  'Nasr City', 'Dokki', 'Mohandessin', '6th of October',
];

const PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&h=420&fit=crop&q=80',
    label: 'Babies', labelAr: 'رضّع', caption: 'Gentle care for your little ones',
  },
  {
    url: 'https://images.unsplash.com/photo-1476703993599-0035a44b0963?w=600&h=420&fit=crop&q=80',
    label: 'Toddlers', labelAr: 'أطفال صغار', caption: 'Fun & learning every day',
  },
  {
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=420&fit=crop&q=80',
    label: 'Big Kids', labelAr: 'أطفال كبار', caption: 'Adventures & activities for school age',
  },
  {
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=420&fit=crop&q=80',
    label: 'Happy Families', labelAr: 'عائلات سعيدة', caption: 'Trusted by hundreds of Cairo families',
  },
  {
    url: 'https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600&h=420&fit=crop&q=80',
    label: 'Newborns', labelAr: 'مواليد', caption: 'Specialised newborn care',
  },
  {
    url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600&h=420&fit=crop&q=80',
    label: 'Playtime', labelAr: 'وقت اللعب', caption: 'Creative play & imagination',
  },
];

function PhotoCard({ photo }) {
  return (
    <div className="photo-card">
      <img
        src={photo.url}
        alt={photo.label}
        loading="eager"
        onError={e => { e.target.style.display = 'none'; }}
      />
      <div className="photo-overlay">
        <div className="photo-label">{photo.label} — {photo.labelAr}</div>
        <div className="photo-caption">{photo.caption}</div>
      </div>
    </div>
  );
}

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
        <h1>انيسه — مربيات موثوقة في القاهرة</h1>
        <p className="subtitle">Find Trusted Babysitters in Cairo — Daily & Weekly Packages</p>
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

      {/* Photo strip — visible on load, 3 photos */}
      <div className="photo-strip">
        <PhotoCard photo={PHOTOS[0]} />
        <PhotoCard photo={PHOTOS[1]} />
        <PhotoCard photo={PHOTOS[2]} />
      </div>

      {/* Packages Banner */}
      <section className="packages-banner">
        <div className="packages-banner-inner">
          <h2>Flexible Packages — باقات مرنة</h2>
          <p>Choose the care schedule that fits your family</p>
          <div className="packages-row">
            <div className="pkg-item">
              <h3>Daily Package</h3>
              <div className="ar">الباقة اليومية</div>
              <div className="price">120 <span>EGP/hr</span></div>
              <div className="desc">Min 4 hrs · Max 8 hrs/day</div>
              <div className="desc" style={{ fontSize: '0.78rem', marginTop: '0.2rem' }}>From 480 EGP/day</div>
            </div>
            <div className="pkg-item featured">
              <h3>Weekly Package</h3>
              <div className="ar">الباقة الأسبوعية</div>
              <div className="price">100 <span>EGP/hr</span></div>
              <div className="desc">Min 20 hrs/week · Best value</div>
              <div className="desc" style={{ fontSize: '0.78rem', marginTop: '0.2rem' }}>From 2,000 EGP/week</div>
            </div>
            <div className="pkg-item" style={{ opacity: 0.6 }}>
              <h3>Monthly Package</h3>
              <div className="ar">الباقة الشهرية</div>
              <div className="price" style={{ fontSize: '1.1rem', color: '#999' }}>Coming Soon</div>
              <div className="desc">Not available currently — قريباً</div>
            </div>
          </div>
          <div style={{ marginTop: '1.2rem', padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: '0.83rem', color: '#fff' }}>
            ℹ️ Min 4 hrs, Max 8 hrs per day &nbsp;·&nbsp; Transportation fees calculated per day based on area
          </div>
        </div>
      </section>

      {/* Wide feature photo + side photo */}
      <div className="photo-feature-row">
        <div className="photo-feature-main">
          <PhotoCard photo={PHOTOS[3]} />
        </div>
        <div className="photo-feature-side">
          <PhotoCard photo={PHOTOS[4]} />
          <PhotoCard photo={PHOTOS[5]} />
        </div>
      </div>

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
        <div className="price-hint">from <strong>120</strong> EGP/hr</div>
        <button className="btn-secondary">View Profile</button>
      </div>
    </div>
  );
}
