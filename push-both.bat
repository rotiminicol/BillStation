@echo off
echo Pushing to both repositories...
echo.
echo Pushing to personal repo (origin)...
git push origin main
echo.
echo Pushing to company repo (company)...
git push company main
echo.
echo Done! Pushed to both repositories.
pause
