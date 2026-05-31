import React from 'react';

const COLORS = [
  '#f97316', '#ea580c', '#dc2626', '#9333ea',
  '#2563eb', '#059669', '#d97706', '#db2777',
];

function getColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase();
}

export default function Avatar({ name, size = 'md' }) {
  const color = getColor(name);
  const initials = getInitials(name);
  const cls =
    size === 'lg' ? 'avatar avatar-lg' : size === 'sm' ? 'avatar avatar-sm' : 'avatar';
  return (
    <div
      className={cls}
      style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
    >
      {initials}
    </div>
  );
}
