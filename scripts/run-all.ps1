
# Master runner - executes all parts in order
$ErrorActionPreference = "Continue"
Set-Location "c:\Users\Asus\FLUTTER_CLUB\ft-club-hub"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GENERATING 300 COMMITS" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$scripts = @(
    "scripts/generate-commits.ps1",
    "scripts/generate-commits-p2.ps1",
    "scripts/generate-commits-p3.ps1",
    "scripts/generate-commits-p4.ps1",
    "scripts/generate-commits-p5.ps1",
    "scripts/generate-commits-p6.ps1",
    "scripts/generate-commits-p7.ps1"
)

foreach ($script in $scripts) {
    Write-Host "`nRunning $script..." -ForegroundColor Yellow
    & ".\$script"
}

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "  ALL COMMITS GENERATED!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Count total commits
$totalCommits = (git log --oneline | Measure-Object -Line).Lines
Write-Host "Total commits in repo: $totalCommits" -ForegroundColor Cyan

# Push to remote
Write-Host "`nPushing to remote..." -ForegroundColor Yellow
git push origin main 2>$null
if ($LASTEXITCODE -ne 0) {
    git push origin master 2>$null
}
Write-Host "Done! All commits pushed." -ForegroundColor Green
