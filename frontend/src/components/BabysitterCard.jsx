import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import Stars from './Stars.jsx';

export default function BabysitterCard({ sitter, onBook }) {
  return (
    <div className="babysitter-card">
      <div className="babysitter-card-body">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
          <Avatar name={sitter.name} />
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#7c2d12' }}>{sitter.name}</div>
            <div style={{ fontSize: '0.9rem', color: '#c2410c', marginBottom: '0.25rem' }}>{sitter.nameAr}</div>
            <Stars rating={sitter.rating} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          <span className="badge badge-orange">⏳ {sitter.experience} yrs exp</span>
          <span className="badge badge-green">🕒 {sitter.availability}</span>
          <span style={{ fontSize: '0.75rem', color: '#92400e' }}>({sitter.reviewCount} reviews)</span>
        </div>

        <div style={{ fontSize: '0.85rem', color: '#7c2d12', marginBottom: '0.5rem' }}>
          📍 {sitter.areas.join(' · ')}
        </div>

        <p style={{ fontSize: '0.85rem', color: '#57534e', lineHeight: 1.5, flex: 1 }}>
          {sitter.bio.length > 110 ? sitter.bio.slice(0, 110) + '…' : sitter.bio}
        </p>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          {sitter.packages.map(pkg => (
            <span key={pkg} className="badge badge-blue">{pkg}</span>
          ))}
        </div>
      </div>

      <div className="babysitter-card-footer">
        <span style={{ fontWeight: 700, color: '#c2410c', fontSize: '1rem' }}>
          From 150 <span style={{ fontSize: '0.75rem' }}>EGP/day</span>
        </span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link to={`/babysitters/${sitter.id}`} className="btn btn-secondary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
            View Profile
          </Link>
          {onBook && (
            <button className="btn btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }} onClick={() => onBook(sitter)}>
              Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
