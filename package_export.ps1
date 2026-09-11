$src = 'C:\Users\Windows\.gemini\antigravity\scratch\heritage-quest'
$destFolder = 'C:\Users\Windows\Downloads\heritage-quest'
$zipPath = 'C:\Users\Windows\Downloads\Heritage-Quest-Project.zip'

if (Test-Path $destFolder) {
    Remove-Item -Recurse -Force $destFolder
}
if (Test-Path $zipPath) {
    Remove-Item -Force $zipPath
}

New-Item -ItemType Directory -Path $destFolder -Force | Out-Null

# Copy source files
Get-ChildItem -Path $src | Where-Object { $_.Name -ne 'node_modules' -and $_.Name -ne 'package_export.ps1' } | ForEach-Object {
    Copy-Item -Path $_.FullName -Destination $destFolder -Recurse -Force
}

# Create zip archive in Downloads
Compress-Archive -Path "$destFolder\*" -DestinationPath $zipPath -Force

Write-Host "SUCCESS: Exported zip file to $zipPath"
Write-Host "SUCCESS: Exported ready folder to $destFolder"
