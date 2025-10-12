#!/usr/bin/env python3
"""
Script para detectar traducciones alucinadas en el sitio web.
Toma artículos de un idioma, los traduce al castellano y calcula el porcentaje de coincidencia con el original.
"""

import os
import sys
import difflib
from pathlib import Path

# Para traducción, necesitarás instalar googletrans: pip install googletrans==4.0.0rc1
try:
    from googletrans import Translator
    translator = Translator()
    TRANSLATION_AVAILABLE = True
except ImportError:
    print("Advertencia: googletrans no está instalado. Instala con: pip install googletrans==4.0.0rc1")
    TRANSLATION_AVAILABLE = False

def extract_content_from_md(file_path):
    """Extrae el contenido principal del archivo Markdown, ignorando frontmatter y cabeceras."""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    content_lines = []
    in_frontmatter = False
    for line in lines:
        if line.strip() == '---':
            in_frontmatter = not in_frontmatter
            continue
        if not in_frontmatter and not line.strip().startswith('#'):
            content_lines.append(line)

    return ''.join(content_lines).strip()

def translate_to_spanish(text, source_lang):
    """Traduce el texto al castellano."""
    if not TRANSLATION_AVAILABLE:
        print("Traducción no disponible. Simulando traducción (devuelve texto original).")
        return text

    try:
        translated = translator.translate(text, src=source_lang, dest='es')
        if translated and translated.text:
            return translated.text
        else:
            print("Error en traducción: respuesta inválida de la API")
            return text
    except Exception as e:
        print(f"Error en traducción: {e}")
        return text

def calculate_similarity(text1, text2):
    """Calcula el porcentaje de similitud entre dos textos usando difflib."""
    matcher = difflib.SequenceMatcher(None, text1, text2)
    return matcher.ratio() * 100

def process_language(lang):
    """Procesa todos los artículos de un idioma dado."""
    base_dir = Path('content')
    spanish_dir = base_dir / 'blog'
    lang_dir = base_dir / lang / 'blog'

    if not lang_dir.exists():
        print(f"Directorio {lang_dir} no existe.")
        return

    results = []

    for md_file in lang_dir.glob('*.md'):
        if md_file.name == 'blog.11tydata.js':
            continue  # Saltar archivos no Markdown

        spanish_file = spanish_dir / md_file.name
        if not spanish_file.exists():
            print(f"Archivo original no encontrado: {spanish_file}")
            continue

        print(f"Procesando: {md_file.name}")

        # Extraer contenido
        lang_content = extract_content_from_md(md_file)
        spanish_content = extract_content_from_md(spanish_file)

        # Traducir al castellano
        translated_content = translate_to_spanish(lang_content, lang)

        # Calcular similitud
        similarity = calculate_similarity(spanish_content, translated_content)

        # Calcular número de palabras y líneas
        original_words = len(spanish_content.split())
        translated_words = len(translated_content.split())
        original_lines = len(spanish_content.splitlines())
        translated_lines = len(translated_content.splitlines())

        # Calcular diferencias
        word_diff = abs(original_words - translated_words)
        word_diff_percent = (word_diff / original_words * 100) if original_words > 0 else 0
        line_diff = abs(original_lines - translated_lines)

        # Determinar si es alucinación
        is_hallucination = line_diff > 2 or word_diff_percent > 15

        results.append({
            'file': md_file.name,
            'similarity': similarity,
            'translated_length': len(translated_content),
            'original_length': len(spanish_content),
            'original_words': original_words,
            'translated_words': translated_words,
            'original_lines': original_lines,
            'translated_lines': translated_lines,
            'word_diff_percent': word_diff_percent,
            'line_diff': line_diff,
            'is_hallucination': is_hallucination
        })

        print(f"Similitud: {similarity:.2f}%")
        print(f"Palabras: original {original_words}, traducido {translated_words} (diferencia: {word_diff_percent:.2f}%)")
        print(f"Líneas: original {original_lines}, traducido {translated_lines} (diferencia: {line_diff})")
        if is_hallucination:
            print("¡POSIBLE ALUCINACIÓN DETECTADA!")
    # Reportar resultados
    print("\n=== RESULTADOS ===")
    hallucinations = [r for r in results if r['is_hallucination']]
    if hallucinations:
        print("Archivos con posibles alucinaciones (basado en diferencias de palabras y líneas):")
        for r in hallucinations:
            print(f"- {r['file']}: diferencia palabras {r['word_diff_percent']:.2f}%, diferencia líneas {r['line_diff']}")
    else:
        print("No se detectaron alucinaciones basadas en las métricas de palabras y líneas.")

    # Guardar resultados en un archivo
    with open(f'results_{lang}.txt', 'w', encoding='utf-8') as f:
        f.write("Resultados de detección de alucinaciones\n")
        f.write(f"Idioma: {lang}\n\n")
        f.write("Criterios de alucinación:\n")
        f.write("- Diferencia de líneas > 2\n")
        f.write("- Diferencia porcentual de palabras > 15%\n\n")
        for r in results:
            status = "ALUCINACIÓN DETECTADA" if r['is_hallucination'] else "Sin alucinación"
            f.write(f"{r['file']}: {status}\n")
            f.write(f"  Similitud: {r['similarity']:.2f}%\n")
            f.write(f"  Palabras: original {r['original_words']}, traducido {r['translated_words']} (diferencia: {r['word_diff_percent']:.2f}%)\n")
            f.write(f"  Líneas: original {r['original_lines']}, traducido {r['translated_lines']} (diferencia: {r['line_diff']})\n")
            f.write("\n")

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Uso: python detect_hallucinations.py <lang>")
        print("Ejemplo: python detect_hallucinations.py en")
        sys.exit(1)

    lang = sys.argv[1]
    process_language(lang)