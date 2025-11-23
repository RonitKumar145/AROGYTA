@echo off
rem Simple batch file to start a local development server for the AROGYTA frontend
rem Ensure you have Node.js installed. This will use npx to run http-server.

echo Starting local server on http://localhost:8000
npx http-server -p 8000
