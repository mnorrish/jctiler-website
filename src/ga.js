const siteData = require('./site-data');

// create the ga function on the window
window.GoogleAnalyticsObject = 'ga';
window.ga = window.ga || function ga(...args) {
  (window.ga.q = window.ga.q || []).push(args);
};
window.ga.l = 1 * new Date();

// attach new script element to DOM to load the Google Analytics script
const gaScript = document.createElement('script');
const firstScript = document.getElementsByTagName('script')[0];
gaScript.async = 1;
gaScript.src = 'https://www.google-analytics.com/analytics.js';
firstScript.parentNode.insertBefore(gaScript, firstScript);

// start Google Analytics and track pageview
window.ga('create', siteData.GA_TRACKING_ID, 'auto');
window.ga('send', 'pageview');
