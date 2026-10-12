// Reusable Badge component for game cards, tags, and status labels
import React from 'react';

export default function Badge({ type, label, size = 'md' }) {
  let badgeClass = 'badge-default';
  let displayLabel = label;

  switch (type) {
    case 'BROWSER GAME':
    case 'browser':
      badgeClass = 'badge-browser';
      displayLabel = displayLabel || 'BROWSER GAME';
      break;
    case 'CLOUD PREVIEW':
    case 'cloud':
      badgeClass = 'badge-cloud';
      displayLabel = displayLabel || 'CLOUD PREVIEW';
      break;
    case 'FREE ACCESS':
    case 'free':
      badgeClass = 'badge-free';
      displayLabel = displayLabel || 'FREE ACCESS';
      break;
    case 'PREMIUM ACCESS':
    case 'premium':
      badgeClass = 'badge-premium';
      displayLabel = displayLabel || 'PREMIUM ACCESS';
      break;
    case 'playable':
      badgeClass = 'badge-playable';
      displayLabel = displayLabel || 'PLAYABLE NOW';
      break;
    default:
      badgeClass = 'badge-default';
  }

  return <span className={`nexus-badge ${badgeClass} size-${size}`}>{displayLabel}</span>;
}
