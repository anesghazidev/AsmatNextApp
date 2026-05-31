export function formatTimeAgo(date) {
  const target = date instanceof Date ? date : new Date(date);
  if (!(target instanceof Date) || Number.isNaN(target.getTime())) {
    return '';
  }

  const diffMs = Date.now() - target.getTime();
  if (diffMs < 0) {
    return 'dans le futur';
  }

  const seconds = Math.floor(diffMs / 1000);
  const units = [
    { name: 'an', seconds: 31536000 },
    { name: 'mois', seconds: 2592000 },
    { name: 'jour', seconds: 86400 },
    { name: 'heure', seconds: 3600 },
    { name: 'minute', seconds: 60 },
    { name: 'seconde', seconds: 1 },
  ];

  for (const unit of units) {
    const value = Math.floor(seconds / unit.seconds);
    if (value > 0) {
      const label = unit.name === 'mois' || value === 1 ? unit.name : `${unit.name}s`;
      return `il y a ${value} ${label}`;
    }
  }

  return 'à l\'instant';
}

export default formatTimeAgo;
