import React from 'react';

export default function Stars({ rating, showValue = true }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="stars">
      {Array(full)
        .fill(null)
        .map((_, i) => (
          <span key={`f${i}`} className="star">★</span>
        ))}
      {half && <span className="star">⯨</span>}
      {Array(empty)
        .fill(null)
        .map((_, i) => (
          <span key={`e${i}`} className="star empty">★</span>
        ))}
      {showValue && (
        <span
          style={{
            marginLeft: '4px',
            fontSize: '0.82rem',
            color: '#92400e',
            fontWeight: 600,
          }}
        >
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
