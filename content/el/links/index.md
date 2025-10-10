---
layout: layouts/base.njk
title: Τμήμα Συνδέσμων
description: Σχετικοί σύνδεσμοι για το Πρόγραμμα .IA Νησί Αντικυθήρων.
date: Last Modified
lang: el
eleventyNavigation:
  key: Links
  order: 3
---

<h1>Σύνδεσμοι Αντικυθήρων</h1>

<div class="links-container">
{% for link in links %}
    <div class="link-item">
        <a href="{{ link.url }}" target="_blank" class="link-title">{{ link.title }}</a>
        <p class="link-description">{{ link.description }}</p>
        {% if link.url and (link.url.includes('youtube.com') or link.url.includes('youtu.be')) %}
            <div class="video-container">
                <iframe src="https://www.youtube.com/embed/{{ link.url | youtubeID }}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        {% else %}
            <div class="gallery">
                <button class="gallery-prev">◀</button>
                <button class="gallery-next">▶</button>
                {% for imageUrl in link.imageUrls %}
                    <img src="{{ imageUrl }}" alt="Σχετική εικόνα">
                {% endfor %}
            </div>
        {% endif %}
    </div>
{% endfor %}
</div>
- [✍️ Επίσημη Λίστα Κρατήσεων](https://docs.google.com/spreadsheets/d/1y-aLEKfQySJeDgZd4QeHa57G9P9Pp4mqWhLJSqxcB0o/edit?usp=sharing)
- [Πίνακας Ατόμων και Οργανισμών](https://docs.google.com/spreadsheets/d/1-6lBWrMexLKKDpfI2u8zKnvit3mXeZT9Zs6ngZk4glI/edit?usp=sharing)
- [Ας ζητήσουμε τη Δημιουργία του Νέου Τομέα Ανώτατου Επιπέδου ccTLD .IA](https://chng.it/hqCyzBpwgW) Πρόταση στο Change.org
- [Προώθηση της Καινοτομίας και της Πολιτισμικής Κληρονομιάς με τον Τομέα .IA του Νησιού των Αντικυθήρων](https://citizens-initiative-forum.europa.eu/discuss/idea/impulsando-la-innovacion-y-la-herencia-cultural-con-el-dominio-ia-de-la-isla-de_es) Πρόταση στο Φόρουμ Ευρωπαϊκής Πολιτικής Πρωτοβουλίας.
- [~~Πρόταση για Δημιουργία Τομέα .IA~~](https://futureu.europa.eu/processes/Digital/f/15/proposals/27592?locale=es) ~~Πρόταση στην ευρωπαϊκή πλατφόρμα Futureu.~~
- [Εγγραφή στη Λίστα 📧 Email](https://docs.google.com/forms/d/e/1FAIpQLSeptFS3-XMVTeBFQzDEl1O55hkXhtOgYmMSEfpLLJk11UZEOA/viewform?usp=sf_link) υπόσχεται να μην μοιραστούμε το email σας, να μην στείλουμε διαφημίσεις, ούτε να στείλουμε πάρα πολλά emails.

## Κοινωνικά Δίκτυα και Κοινότητα

- [📱 Κανάλι Telegram](https://t.me/+oAeZGMsePDg2ZDI0) - Μαθητής Hacker του Αρχιμήδη
- [Αποθετήριο GitHub](https://github.com/elswork/anticitera.deft.work) - Πηγαίος κώδικας και συνεισφορές
- [Έργο LinkedIn](https://www.linkedin.com/posts/eloy-lopez_proyecto-ia-isla-anticitera-activity-7129072968439349248-FXE7) - Επαγγελματικές ενημερώσεις

## Βίντεο και Μέσα

{% youtube "https://youtu.be/x1DeBF8bBVc" %}

{% youtube "https://youtu.be/PNA0f05zsC4" %}

## Εξωτερικά Άρθρα και Κάλυψη

- [Un informático en el lado del mal: Το έργο Country-Code Top-Level-Domain .IA για το Νησί των Αντικυθήρων](https://www.elladodelmal.com/2023/12/el-proyecto-del-country-code-top-level.html?m=1)
- [Un informático en el lado del mal: Υποστηρίξτε την αναφορά του Έργου Αντικυθήρων στην Ευρωπαϊκή Ένωση](https://www.elladodelmal.com/2024/02/apoya-la-peticion-del-proyecto-de.html)

## Σχετική Έρευνα και Τεκμηρίωση

- [Πύλη: Anticitera.deft.work](https://anticitera.deft.work) - Κύριος ιστότοπος
- [LinkedIn: Eloy López, Προωθητής Έργου](https://www.linkedin.com/in/eloy-lopez/) - Προφίλ του επικεφαλής του έργου

## Εκπαιδευτικοί Πόροι

- [Μηχανισμός των Αντικυθήρων - Wikipedia](https://el.wikipedia.org/wiki/Μηχανισμός_των_Αντικυθήρων) - Ιστορικό υπόβαθρο
- [Πληροφορίες ICANN ccTLD](https://www.icann.org/resources/pages/cctlds-21-2012-02-25-en) - Για τους Τομείς Ανώτατου Επιπέδου Κωδικού Χώρας

---

**Σημείωση**: Αυτή η περιοχή ενημερώνεται τακτικά με νέους σχετικούς συνδέσμους και πόρους. Έχετε έναν σύνδεσμο που θα έπρεπε να προστεθεί; Επικοινωνήστε μαζί μας μέσω της [λίστας email μας](https://docs.google.com/forms/d/e/1FAIpQLSeptFS3-XMVTeBFQzDEl1O55hkXhtOgYmMSEfpLLJk11UZEOA/viewform?usp=sf_link) ή [GitHub Issues](https://github.com/elswork/anticitera.deft.work/issues).