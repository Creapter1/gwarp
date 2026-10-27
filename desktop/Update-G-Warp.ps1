# G-Warp Desktop updater: copies the newest app.html from GitHub into this G-Warp folder.
# Put this file and Update-G-Warp.bat next to G-Warp.exe. Nothing else on the PC is touched.
$ErrorActionPreference = 'Stop'
$dir = Join-Path $PSScriptRoot 'resources\app'
$cur = Join-Path $dir 'app.html'
$new = Join-Path $env:TEMP 'gwarp-new.html'
$ver = { param($t) [regex]::Match($t, "GW_BUILD=\{version:'([0-9.]+)'").Groups[1].Value }
if (-not (Test-Path $cur)) { Write-Host "Can't find resources\app\app.html. Put this file next to G-Warp.exe."; exit 1 }
Write-Host 'Getting the newest G-Warp from GitHub...'
try { Invoke-WebRequest 'https://raw.githubusercontent.com/Creapter1/gwarp/main/app.html' -OutFile $new -UseBasicParsing }
catch { Write-Host 'No internet, or GitHub did not answer. Nothing was changed.'; exit 1 }
$nv = & $ver (Get-Content $new -Raw); $ov = & $ver (Get-Content $cur -Raw)
if (-not $nv -or (Get-Item $new).Length -lt 1000000) { Write-Host 'The download looked broken. Nothing was changed.'; exit 1 }
if ($nv -eq $ov) { Write-Host "You already have the newest version (v$ov)."; exit 0 }
Copy-Item $cur (Join-Path $dir 'app-backup.html') -Force
Copy-Item $new $cur -Force
Write-Host "Updated: v$ov -> v$nv. The old version is saved as resources\app\app-backup.html."
Write-Host 'Close G-Warp and open it again to use the new version.'
