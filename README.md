#API Deployment with Nginx Recerse Proxy and HTTPS

#Project overview

This project simulates a simple server deployment process using Node.js API+Nginx reverse proxy+HTTPS encryption
The goal is to demonstrate how a backend API serivce can be deploy behind an Nginx server,and how HTTPS communication can be enabled using a self-signed sertificate
This project simulates a common real-world architecture:
Clinet->Nginx->API server
Throught this proejct,the following concepts are demonstrated:
-Basic REST API service
-Nginx reverse proxy configuration
-HTTP request forwarding
-HTTPS encryption using SSL certificate
-Basic server deployment workflow

#Environment

-OS:Win11
-Runtime:Node.js
-Web Server:Nginx
-API Framework:Express.js


##Objectives
-Build a simple API service using Node.js
-Deploy the API behind Nginx reverse proxy
-Enable HTTPS encryption
-Understand the interaction between API,Nginx and HTTPS


##Architecture
Client(Browser)---(HTTP Request)--->Nginx Server---(Reverse Proxy)--->Node.js API Server(Port 3000)
Nginx receives requests from the client and forwards them to the backend API service


##Project structure
-nignx&api&https
--README.md
-scripts
--app.js
-nginx
--nginx.conf

--

##Step Perfoemed

##1.Install Node.js and Nginx
Base requirement,create a new API project
-mkdir my-api
-cd my-api
-npm init -y
-npm install express
--node app.js
---start nginx

##2.Ceate API service
Create app.js:
-const espress=require('express')
-const app=express()
-app.get('/health',(req,res)=>{
-    res.josn({
-        status:"ok",
-        message:"API server running"
-    })
-})
-app.listen(3000,()=>{
-    console.log("API running on prot 3000")
-})
Start the API server:
-node app.js

##3.Configure Nginx reverse proxy
Change it document nginx.conf,after this,user can though nginx to reach API
Modify nginx.conf:
-server{
-    listen 80;
-    loaction/{
-        proxy_pass http:127.0.0.1:3000;
-        proxy_set_header Host $host;
-        proxy_set_header X-Real-IP $remote_addr;
-    }
-}

##4.Add HTTPS with Self-signed certificate
Create document cert.pem and key.pem at C:\nginx\..
Generate certificate:
-openssl req -x509 -nodes -days 365 \
-newkey rsa:2048 \
-keyout key.pem \
-out cert.pem
Add HTTPS configuration in nginx.conf:
-server{
-    listen 443 ssl;
-     ssl_certificate cert.pem;
-    ssl_certificate_key key.pem;
-    location / {
-        proxy_pass http://127.0.0.1:3000;
-    }
-}

##5. Test proxy and reboot nginx
Test configuration:
-.\nginx.exe -t
Reload server:
-.\nginx.exe -s reload

##6.Browser access
API can be accessed through:
-https://localhost/health
Expected response:
-{
-    "status":"ok",
-    "message":"API server running"
-}

##7.Details perfetion and bugs fix

-

##Security Improvements
The following security improvements were applied:
-Disable direct API exposure
-Use Nginx reverse proxy
-Enable HTTPS encrypted communication
-Add basic security headers
-Configure access logs and error logs
-Implement a health check API endpoint


##Result
The API service is successfully deployed behind Nginx.
Nginx handles incoming client requests and forwards them to the backend API server. HTTPS encryption ensures secure communication between client and server.
This project demonstrates a basic deployment architecture commonly used in real-world environments.