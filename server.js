const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const {carouselServiceURL, descriptionServiceURL, reviewServiceURL} = require('./services_config.js');

const port = '80';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log(`serving ${req.method} for ${req.path} from ${req.ip}`);
  next();
})

app.use('/products/', express.static(path.resolve(__dirname, 'public')));
app.use('/products/:id', express.static(path.resolve(__dirname, 'public')));

// ReRoutes

// Image Carousel Service
app.use('/products/:productid/images/bundle.js', createProxyMiddleware({ target: carouselServiceURL, changeOrigin: true }));
app.use('/images/:id', createProxyMiddleware({ target: carouselServiceURL, changeOrigin: true }));

app.listen(port, () => {
  console.log(`Home.com has launched on port ${port}`);
});