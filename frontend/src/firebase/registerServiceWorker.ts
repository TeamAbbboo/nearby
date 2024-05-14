export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then(function () {})
        .catch(function () {});
    });
  }
}
