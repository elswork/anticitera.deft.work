---
layout: layouts/base.njk
title: Section des Liens
description: Liens pertinents pour le Projet .IA Île d'Anticythère.
date: Last Modified
lang: fr
eleventyNavigation:
  key: Links
  order: 3
---
<h1>Liens Anticythère</h1>

<div class="links-container">
{% for link in links %}
    <div class="link-item">
        <a href="{{ link.url }}" target="_blank" rel="noopener" class="link-title">{{ link.title }}</a>
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
                    <img src="{{ imageUrl }}" alt="Image connexe">
                {% endfor %}
            </div>
        {% endif %}
    </div>
{% endfor %}
</div>
