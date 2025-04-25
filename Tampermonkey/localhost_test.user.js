

console.log('fetch');

// — fetch() version —
fetch(url, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    data,
})
    .then(response => {
    console.log('fetch status:', response.status);
    return response.text();
})
    .then(body => {
    console.log('fetch body:', body);
})
    .catch(err => {
    console.error('fetch error:', err);
});