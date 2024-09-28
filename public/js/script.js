if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/js/service.js')
        .then(registration => {
            console.log('service worker registered');
        })
        .catch(error => {
            console.error('service worker registration failed:', error);
        });
    });
}