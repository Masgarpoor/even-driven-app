@echo off
set command=npm start

start wt -w 0 nt --title "Database Service" cmd /k "cd /d C:\Users\MMD\Desktop\task-of-company\even-driven-app\database-service\src && %command%"
start wt -w 0 nt --title "HTTPS Connection Service" cmd /k "cd /d C:\Users\MMD\Desktop\task-of-company\even-driven-app\https-connection-service\src && %command%"
start wt -w 0 nt --title "Kafka Consumer Service" cmd /k "cd /d C:\Users\MMD\Desktop\task-of-company\even-driven-app\kafka-consumer-service\src && %command%"
start wt -w 0 nt --title "Query Service" cmd /k "cd /d C:\Users\MMD\Desktop\task-of-company\even-driven-app\query-service && %command%"
timeout /t 10
start wt -w 0 nt --title "API Gateway" cmd /k "cd /d C:\Users\MMD\Desktop\task-of-company\even-driven-app\api-gateway\src && %command%"