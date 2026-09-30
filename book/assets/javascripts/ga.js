---
---
// Google Analytics. Kept in a file, not inline, so the CSP needs no 'unsafe-inline'.
// The empty front matter makes Jekyll fill in the GA id.
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "{{ site.google_analytics }}");
