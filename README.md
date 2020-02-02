
# Pricing intelligence application

Due to the transparency offered with online buying, pricing becomes a key differentiating factor for e-commerce purchasing decisions. Better pricing can go a long way in converting customers and capturing market share. The only way this can happen is through a pricing tool that constantly compares product pricing against a slew of websites and recommends changes when necessary.

## Functionalities

-   A list of websites to get the necessary information from, for this exercise only one.
-   A list of brands and their URLs for the listing page.
-   A list of categories and their URLs for the listing page.down
 ## How to run the app
  
  
 - Download/clone the app
 - Open terminal and navigate to root folder of the app
 - run **npm install**
 - navigate to scripts/db/ and execute all the files in `scripts/db/` directory using `mongo test-products <file_name>.ql`. It will make entery in the database for all the collections
 - execute app by using **npm start** or **node server.js**
 - App will start listening on port 5100
 - Browse http://localhost:5100
 
## Technologies used
 - NodeJS
 - ExpressJS
 - MongoDB
 - 
## Database
Database  - MongoDB
Database name - test-products

Collections
 - websites
 - products
 - categories
 - brands

## App directory Structure
client/app

 - css - Css dependencies
 - js - Javascript dependencies
 - index.html - Files Page
 - 404.html

server
 - api - All the apis within their module
 - routes - routing handlers
 - db - db access handlers for all the entities
 - config - config files
 - utils 

scripts 
node_modules
