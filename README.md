npm install  
touch .env  
set env vars  
truffle migrate --reset --network mumbai  
truffle migrate --reset --network goerli  
truffle exec scripts/rootChild.js  --network mumbai  
truffle exec scripts/rootChild.js  --network goerli  
