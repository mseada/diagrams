import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../components/Avatar.jsx';
import Stars from '../components/Stars.jsx';

export default function BabysittersPage() {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/babysitters')
      .then(r => { setSitters(r.data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <h1>All Babysitters — كل المربيات</h1>
        <p className="sub">Browse our verified caregivers across Cairo</p>
      </div>
      <div className="section">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <p className="results-count">{sitters.length} babysitters available in Cairo</p>
            <div className="cards-grid">
              {sitters.map(s => (
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
                      <span className="tag">{s.experience} yrs experience</span>
                      <span className="tag green">{s.availability}</span>
                    </div>
                    <div className="tags">
                      {s.areas.slice(0, 3).map(a => (
                        <span key={a} className="tag">{a}</span>
                      ))}
                    </div>
                    <p style={{ fontSize: '0.83rem', color: '#8a6040', marginTop: '0.5rem', lineHeight: '1.5' }}>
                      {s.bio.slice(0, 90)}...
                    </p>
                  </div>
                  <div className="sitter-card-footer">
                    <div className="price-hint">from <strong>150</strong> EGP/day</div>
                    <button className="btn-secondary">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
