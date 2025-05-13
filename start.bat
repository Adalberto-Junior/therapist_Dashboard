@echo off
cls
echo ====================================
echo 🚀 Iniciando aplicação Full Stack
echo ====================================

:: Ativar o ambiente virtual
cd backend
echo 🔧 Ativando ambiente virtual...
call venv\Scripts\activate

:: Rodar Flask (em segundo plano)
echo 🔥 Iniciando backend Flask...
start "Backend" cmd /k "python app.py"
::wt --window 0 --title "Backend" cmd /k "venv\Scripts\activate && python app.py"

:: Voltar à raiz e iniciar React
@REM deactivate
cd ../GUI
echo 🔄 Iniciando frontend React...

start "Frontend" cmd /k "npm run dev"
::wt --window 0 --title "Frontend" cmd /k "npm run dev"
:: Voltar à rai
cd ..
