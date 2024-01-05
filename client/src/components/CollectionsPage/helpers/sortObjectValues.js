export function sortObjectValues(obj, descending = false, sortBy = null) {
  const sortedObj = {};
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      sortedObj[key] = obj[key].slice().sort((a, b) => {
        if (sortBy === 'name' || sortBy === 'created_at') {
          if (sortBy === 'name') {
            return descending ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
          } else if (sortBy === 'created_at') {
            return descending ? new Date(b.created_at) - new Date(a.created_at) : new Date(a.created_at) - new Date(b.created_at);
          }
        }
        return 0;
      });
    }
  }
  return sortedObj;
}