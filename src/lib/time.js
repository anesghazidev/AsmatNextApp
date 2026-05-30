export function convertDateToFrenchFormat(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return dateString.toLocaleDateString('fr-FR', options);
}