var service = {};

if (process.env.NODE_ENV === 'production') {
    service.API_URL = 'http://localhost:5005';
} else {
    service.API_URL = 'http://localhost:5005';
}

export default service;