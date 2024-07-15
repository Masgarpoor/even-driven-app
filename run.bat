@echo off
set command=npm start

start wt -w 0 nt --title "Database Service" cmd /k "cd /d database-service && %command%"
start wt -w 0 nt --title "HTTPS Connection Service" cmd /k "cd /d https-connection-service && %command%"
start wt -w 0 nt --title "Kafka Consumer Service" cmd /k "cd /d kafka-consumer-service && %command%"
start wt -w 0 nt --title "Query Service" cmd /k "cd /d query-service && %command%"
