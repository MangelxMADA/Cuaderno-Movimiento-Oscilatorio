$skills = @("fisica-doctoral","matematicas-doctoral","python-cientifico","latex-lualatex","web-interactiva","ux-ui-design","bases-de-datos","analisis-datos","procesamiento-documentos","diseno-grafico", "pedagogia-gamificacion", "quimica-biologia")

foreach ($skill in $skills) {
    $path = "$env:USERPROFILE\.gemini\antigravity\skills\$skill"
    New-Item -ItemType Directory -Force -Path $path
    
    # Create an empty or minimally formatted SKILL.md
    $content = "# $skill`n`nActivado por Guía ATLAS Skills Doctoral."
    Set-Content -Path "$path\SKILL.md" -Value $content -Encoding UTF8
}
