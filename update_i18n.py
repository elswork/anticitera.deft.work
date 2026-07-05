from deep_translator import GoogleTranslator
import json
import re

base_es = {
    "badge": "Comité Fundacional .IA",
    "title": "Reclama la Soberanía Digital",
    "subtitle": "El dominio .IA no debería ser solo un código territorial del Caribe, sino un bien público europeo que impulse el futuro de la Inteligencia Artificial de forma ética y abierta.",
    "sec2_title": "I. Inteligencia Aumentada en Europa",
    "sec2_body": "El proyecto Anticitera nace con el objetivo de reclamar la terminación .IA como una infraestructura pública. Queremos evitar que este dominio clave sea privatizado como un simple activo comercial y garantizar que se gestione pensando en los ciudadanos.",
    "sec3_title": "II. La Vía Legal: Iniciativa Ciudadana",
    "sec3_body": "Para lograrlo, vamos a recurrir a una Iniciativa Ciudadana Europea (ICE). El primer paso legal exige formar un comité organizador compuesto por al menos 7 ciudadanos que residan en 7 países diferentes de la UE. Buscamos a las personas comprometidas que formarán este grupo fundador.",
    "sec4_title": "III. El Siguiente Paso",
    "sec4_body": "Al unirte al comité, serás una pieza fundamental en las decisiones estratégicas de esta iniciativa. Trabajaremos juntos para llevar esta propuesta oficial ante la Comisión Europea y sentar un precedente real en nuestra soberanía digital.",
    "form_title": "Únete al Comité Fundacional",
    "form_desc": "Déjanos tu email para recibir la propuesta y las instrucciones para unirte al comité fundador.",
    "placeholder": "Introduce tu email...",
    "button": "Unirme a la Iniciativa",
    "success": "¡Gracias por dar el paso! Revisa tu bandeja de entrada; las instrucciones están en camino.",
    "error": "Hubo un error al procesar tu solicitud. Inténtalo de nuevo."
}

langs = ['es', 'bg', 'cs', 'da', 'de', 'el', 'en', 'et', 'fi', 'fr', 'ga', 'hr', 'hu', 'it', 'lt', 'lv', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk', 'sl', 'sv']

result = {}
for lang in langs:
    print(f"Translating to {lang}...")
    if lang == 'es':
        result[lang] = base_es
        continue
    
    target_lang = lang

    translator = GoogleTranslator(source='es', target=target_lang)
    translated_dict = {}
    for k, v in base_es.items():
        try:
            res = translator.translate(v)
            # Fix spacing issues with .IA
            res = res.replace(". IA", ".IA")
            translated_dict[k] = res
        except Exception as e:
            print(f"Error translating {k} to {lang}: {e}")
            translated_dict[k] = v
            
    result[lang] = translated_dict

print("Reading public/js/comite-i18n.js...")
with open('/home/pirate/anticitera.deft.work/public/js/comite-i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

dict_str = json.dumps(result, indent=4, ensure_ascii=False)
# Convert dict keys slightly to match JS object without quotes where possible, or just leave as JSON.
# Valid JSON is valid JS.
new_js = "const dictionary = " + dict_str + ";\n\ndocument.addEventListener"

# Replace everything from `const dictionary = {` up to `};` right before `document.addEventListener`
new_content = re.sub(r'const dictionary = \{.*?\};\n+document\.addEventListener', new_js, content, flags=re.DOTALL)

with open('/home/pirate/anticitera.deft.work/public/js/comite-i18n.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Translation applied successfully!")
