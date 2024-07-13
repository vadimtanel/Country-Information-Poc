const API_URL = 'http://localhost:5000';

export const COUNTRIES_API_URL = `${API_URL}/api/countries`;
export const COUNTRY_API_URL = id => `${COUNTRIES_API_URL}/${id}`;
