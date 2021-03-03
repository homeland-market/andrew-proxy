const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const {carouselServiceURL, descriptionServiceURL, reviewServiceURL} = require('./services_config.js');

const port = '5000';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(`serving ${req.method} for ${req.path}`);
  next();
})

app.use('/products/', express.static(path.resolve(__dirname, 'public')));
app.use('/products/:id', express.static(path.resolve(__dirname, 'public')));


app.listen(port, () => {
  console.log(`Home.com has launched on port ${port}`);
});