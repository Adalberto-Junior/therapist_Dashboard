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

:: Voltar à raiz e iniciar React
cd ../frontend
echo 🔄 Iniciando frontend React...

:: Verifica se existe a pasta build (produção) ou roda o React dev server
IF EXIST "build" (
    echo 🧱 Modo PRODUÇÃO - React será servido pelo Flask.
    timeout /t 2
    start "" http://localhost:5000
) ELSE (
    echo ⚛️ Modo DEV - Iniciando React dev server...
    start "frontend" cmd /k "npm run dev"
)

:: Voltar à raiz
cd ..
