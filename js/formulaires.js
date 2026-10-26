/* =============================================================
   PÉPITES FRANCE — formulaires.js
   Envoie « Demander un cours » et « Devenir intervenant » à l'espace
   d'administration (Supabase, serveurs en Irlande) et affiche la réponse.
   Remplace l'ancien service d'envoi externe. L'adresse du formulaire est publique par conception :
   elle n'ouvre rien d'autre que le dépôt d'un formulaire.
   Sans JavaScript, le formulaire part quand même par l'attribut « action ».
   ============================================================= */
(function () {
  'use strict';

  var TEL = '06\u00a017\u00a096\u00a050\u00a027';
  var DELAI_MS = 20000;

  // le serveur nomme « nom » le champ que le site appelle « name » ; « contact » = ni téléphone ni email
  var CHAMP_ERREUR = { nom: 'name', telephone: 'telephone', email: 'email', cv: 'cv', consent: 'consent', contact: 'telephone' };

  function creer(tag, classe, texte) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texte) el.textContent = texte;
    return el;
  }

  function effacerErreurs(form) {
    form.querySelectorAll('.field-error, .form-alert').forEach(function (n) { n.remove(); });
    form.querySelectorAll('[aria-invalid]').forEach(function (n) {
      n.removeAttribute('aria-invalid');
      n.removeAttribute('aria-describedby');
    });
  }

  function erreurSurChamp(form, nomChamp, message) {
    var champ = form.elements[CHAMP_ERREUR[nomChamp] || nomChamp];
    if (!champ || champ.type === 'hidden') return null;
    var conteneur = champ.closest('.form-group') || champ.closest('.form-consent') || champ.parentNode;
    var id = 'err-' + (champ.id || champ.name);
    var p = creer('p', 'field-error', message);
    p.id = id;
    p.setAttribute('role', 'alert');
    conteneur.appendChild(p);
    champ.setAttribute('aria-invalid', 'true');
    champ.setAttribute('aria-describedby', id);
    return champ;
  }

  function alerte(form, message) {
    var bouton = form.querySelector('button[type="submit"]');
    var a = creer('div', 'form-alert');
    a.setAttribute('role', 'alert');
    a.appendChild(document.createTextNode(message));
    a.appendChild(document.createElement('br'));
    a.appendChild(document.createTextNode('Téléphone : '));
    var lien = creer('a', '', TEL);
    lien.href = 'tel:+33617965027';
    a.appendChild(lien);
    form.insertBefore(a, bouton);
  }

  function succes(form, message) {
    var carte = form.closest('.form-card') || form.parentNode;
    var titre = form.getAttribute('data-formulaire') === 'candidature' ? 'Candidature envoyée' : 'Demande envoyée';
    var boite = creer('div', 'form-success');
    boite.setAttribute('role', 'status');
    boite.setAttribute('tabindex', '-1');
    boite.appendChild(creer('div', 'form-success__icon', '✓'));
    boite.appendChild(creer('h2', '', titre));
    boite.appendChild(creer('p', '', message));
    var suite = creer('p', 'muted');
    suite.appendChild(document.createTextNode('Une question ? Appelez-nous au '));
    var lien = creer('a', '', TEL);
    lien.href = 'tel:+33617965027';
    suite.appendChild(lien);
    suite.appendChild(document.createTextNode('.'));
    boite.appendChild(suite);
    carte.innerHTML = '';
    carte.appendChild(boite);
    boite.focus({ preventScroll: true });
    boite.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function donnees(form) {
    var out = {};
    new FormData(form).forEach(function (valeur, cle) {
      if (typeof valeur === 'string') out[cle] = valeur.trim();
    });
    out.consent = Boolean(form.elements.consent && form.elements.consent.checked);
    return out;
  }

  function envoyer(form) {
    var bouton = form.querySelector('button[type="submit"]');
    var texte = bouton.textContent;
    var url = form.getAttribute('action');

    effacerErreurs(form);
    if (!form.checkValidity()) { form.reportValidity(); return; }

    bouton.disabled = true;
    bouton.textContent = 'Envoi en cours…';
    form.setAttribute('aria-busy', 'true');
    var rendre = function () {
      bouton.disabled = false;
      bouton.textContent = texte;
      form.removeAttribute('aria-busy');
    };

    var controle = 'AbortController' in window ? new AbortController() : null;
    var minuteur = setTimeout(function () { if (controle) controle.abort(); }, DELAI_MS);

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donnees(form)),
      signal: controle ? controle.signal : undefined
    }).then(function (r) {
      return r.json().then(function (corps) { return { statut: r.status, corps: corps || {} }; }, function () { return { statut: r.status, corps: {} }; });
    }).then(function (rep) {
      clearTimeout(minuteur);
      if (rep.statut === 200 && rep.corps.ok) {
        succes(form, rep.corps.message || 'Merci ! Nous revenons vers vous très vite.');
        return;
      }
      rendre();
      var premier = null;
      var champs = rep.corps.champs || {};
      Object.keys(champs).forEach(function (k) {
        var c = erreurSurChamp(form, k, champs[k]);
        if (c && !premier) premier = c;
      });
      if (premier) { premier.focus(); return; }
      alerte(form, rep.corps.erreur || 'Un problème est survenu. Réessayez dans un instant.');
    }).catch(function () {
      clearTimeout(minuteur);
      rendre();
      alerte(form, 'L’envoi n’a pas abouti : vérifiez votre connexion puis réessayez.');
    });
  }

  document.querySelectorAll('form[data-formulaire]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      envoyer(form);
    });
  });
})();
