set firstCommand=npm uninstall nodemon
set secondCommand=npm i nodemon @types/node --save-dev

start cmd /k "cd api-gateway && %firstCommand% && %secondCommand% && exit"
start cmd /k "cd database-service && %firstCommand% && %secondCommand% && exit" 
start cmd /k "cd https-connection-service && %firstCommand% && %secondCommand% && exit"
start cmd /k "cd kafka-consumer-service && %firstCommand% && %secondCommand% && exit"
start cmd /k "cd query-service && %firstCommand% && %secondCommand% && exit"