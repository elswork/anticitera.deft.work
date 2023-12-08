---
layout: layouts/base.njk
title: Sección de Links
description: Links relevantes del Proyecto .IA Isla Anticitera.
date: Last Modified
eleventyNavigation:
  key: Links
  order: 3
---

<h1>Anticitera Links</h1>

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
                    <img src="{{ imageUrl }}" alt="Imagen relacionada">
                {% endfor %}
            </div>
        {% endif %}
    </div>
{% endfor %}
</div>
