---
---
// Google Analytics, sorti de la page.
//
// Ce fichier existe pour une raison de securite, pas de rangement. Tant que ces
// six lignes vivaient en ligne dans `ga.html`, la politique de securite du
// contenu devait autoriser `script-src 'unsafe-inline'`, et 'unsafe-inline'
// laisse passer exactement ce contre quoi elle sert : un attribut `onclick`
// injecte, une URL `javascript:`. Une politique qui porte 'unsafe-inline' pour
// script ne protege a peu pres de rien.
//
// Sorti dans un fichier, `script-src` n'a plus besoin que de 'self'.
//
// Le front matter vide au-dessus est ce qui fait passer Jekyll dessus. Sans
// lui, le fichier est copie tel quel et l'identifiant n'est jamais remplace.
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "{{ site.google_analytics }}");
