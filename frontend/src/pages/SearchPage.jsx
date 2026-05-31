import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../components/Avatar.jsx';
import Stars from '../components/Stars.jsx';

const CAIRO_AREAS = [
  'Maadi', 'Zamalek', 'Heliopolis', 'New Cairo',
  'Nasr City', 'Dokki', 'Mohandessin', '6th of October',
];

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [q, setQ] = useState(searchParams.get('q') || '');
  const [area, setArea] = useState(searchParams.get('area') || '');
  const [minRating, setMinRating] = useState('');
  const [pkg, setPkg] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (searchParams.get('q') || searchParams.get('area')) {
      doSearch(searchParams.get('q') || '', searchParams.get('area') || '', '', '');
    }
  }, []);

  function doSearch(qVal, areaVal, ratingVal, pkgVal) {
    setLoading(true);
    setSearched(true);
    const params = new URLSearchParams();
    if (qVal) params.set('q', qVal);
    if (areaVal) params.set('area', areaVal);
    if (ratingVal) params.set('minRating', ratingVal);
    if (pkgVal) params.set('package', pkgVal);

    axios.get(`/api/search?${params.toString()}`)
      .then(r => { setResults(r.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }

  function handleSubmit(e) {
    e.preventDefault();
    doSearch(q, area, minRating, pkg);
  }

  return (
    <div>
      <div className="page-header">
        <h1>Search Babysitters — ابحثي عن مربية</h1>
        <p className="sub">Filter by area, rating, and package type</p>
      </div>
      <div className="search-page">
        <form className="search-filters" onSubmit={handleSubmit}>
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              placeholder="Name or keyword..."
              value={q}
              onChange={e => setQ(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Cairo Area — المنطقة</label>
            <select value={area} onChange={e => setArea(e.target.value)}>
              <option value="">All Areas</option>
              {CAIRO_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label>Min Rating</label>
            <select value={minRating} onChange={e => setMinRating(e.target.value)}>
              <option value="">Any Rating</option>
              <option value="4.5">4.5+</option>
              <option value="4.7">4.7+</option>
              <option value="4.9">4.9+</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Package</label>
            <select value={pkg} onChange={e => setPkg(e.target.value)}>
              <option value="">Any Package</option>
              <option value="daily">Daily — يومي</option>
              <option value="weekly">Weekly — أسبوعي</option>
              <option value="monthly">Monthly — شهري</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" style={{ alignSelf: 'flex-end' }}>
            Search
          </button>
        </form>

        {loading && <div className="loading">Searching...</div>}

        {!loading && searched && (
          <>
            <p className="results-count">{results.length} babysitter{results.length !== 1 ? 's' : ''} found</p>
            {results.length === 0 ? (
              <div className="empty">
                <div className="icon">🔍</div>
                <p>No babysitters match your filters. Try broadening your search.</p>
              </div>
            ) : (
              <div className="cards-grid">
                {results.map(s => (
                  <div key={s.id} className="sitter-card" onClick={() => navigate(`/babysitters/${s.id}`)}>
                    <div className="sitter-card-header">
                      <Avatar name={s.name} />
                      <div className="sitter-card-name">
                        <h3>{s.name}</h3>
                        <div className="name-ar">{s.nameAr}</div>
                      </div>
                    </div>
                    <div className="sitter-card-body">
                      <div className="rating-row">
                        <Stars rating={s.rating} showValue={false} />
                        <span className="rating-num">{s.rating.toFixed(1)}</span>
                        <span className="review-count">({s.reviewCount})</span>
                      </div>
                      <div className="tags">
                        <span className="tag">{s.experience} yrs exp</span>
                        <span className="tag green">{s.availability}</span>
                      </div>
                      <div className="tags">
                        {s.areas.map(a => <span key={a} className="tag">{a}</span>)}
                      </div>
                    </div>
                    <div className="sitter-card-footer">
                      <div className="price-hint">from <strong>150</strong> EGP/day</div>
                      <button className="btn-secondary">View Profile</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {!searched && (
          <div className="empty">
            <div className="icon">🍼</div>
            <p>Use the filters above to find the perfect babysitter in Cairo.</p>
          </div>
        )}
      </div>
    </div>
  );
}
