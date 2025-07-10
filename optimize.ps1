# Script PowerShell per minificare i file CSS e JavaScript
Write-Host "Inizio processo di ottimizzazione dei file..."

# Crea directory per file ottimizzati se non esistono
if (-not (Test-Path -Path ".\dist\css")) {
    New-Item -ItemType Directory -Path ".\dist\css" -Force
}

if (-not (Test-Path -Path ".\dist\js")) {
    New-Item -ItemType Directory -Path ".\dist\js" -Force
}

# Installa il pacchetto necessario se non è già installato
if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "Per utilizzare questo script, assicurati di avere Node.js installato"
    exit 1
}

# Verifica se i pacchetti necessari sono già installati
if (-not (Test-Path -Path ".\node_modules\uglify-js") -or -not (Test-Path -Path ".\node_modules\clean-css-cli")) {
    Write-Host "Installazione dei pacchetti necessari..."
    npm install uglify-js clean-css-cli --save-dev
}

# Minifica i file CSS
$cssFiles = Get-ChildItem -Path ".\css\*.css" -Recurse
foreach ($file in $cssFiles) {
    $outputFile = ".\dist\css\$($file.Name)"
    Write-Host "Minificazione di $($file.Name)..."
    npx cleancss -o $outputFile $file.FullName
}

# Minifica i file JavaScript
$jsFiles = Get-ChildItem -Path ".\js\*.js" -Recurse
foreach ($file in $jsFiles) {
    $outputFile = ".\dist\js\$($file.Name)"
    Write-Host "Minificazione di $($file.Name)..."
    npx uglifyjs $file.FullName -c -m -o $outputFile
}

# Crea una versione combinata dei file CSS principali
$cssContent = ""
foreach ($file in ("styles.css", "animations.css", "skills.css", "interests.css", "contacts.css", "faq.css", "footer.css", "text-alignment.css")) {
    $cssContent += (Get-Content -Path ".\dist\css\$file" -Raw) + "`n"
}
$cssContent | Set-Content -Path ".\dist\css\main.min.css"

# Crea una versione combinata dei file JS principali
$jsContent = ""
foreach ($file in ("animations.js", "chi-sono.js", "dots-navigation.js", "dynamic-shadows.js", "scroll-transitions.js", "skills.js", "projects.js")) {
    $jsContent += (Get-Content -Path ".\dist\js\$file" -Raw) + "`n"
}
$jsContent | Set-Content -Path ".\dist\js\main.min.js"

Write-Host "Ottimizzazione completata! I file minificati sono nella directory 'dist'."
