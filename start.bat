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

 cmd /k "npm run dev"


:: Voltar à raiz
cd ..
