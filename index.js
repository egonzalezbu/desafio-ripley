const express = require('express');
const cors = require('cors');
const app = express();

// Middlware for validaring the Firebase Token
const authMiddleware = require('./middlewares/auth');

app.use(cors());
app.use(authMiddleware);

// Client static folder
app.use("/", express.static(__dirname + '/client/dist/client'));
app.use("/login", express.static(__dirname + '/client/dist/client'));

// Controllers
const productsController = require('./controllers/products');

// Get All Products
app.get("/api/v1/products", (req, res) => {
    productsController.getAllProducts().then((products) => {
        res.send(products);
    }, (err) => {
        res.status(500).send({error: "Unexpected error"});
    });
});


// Get One Product
app.get("/api/v1/products/:sku", (req, res) => {
    productsController.getProduct(req.params.sku).then((product) => {
        res.send(product);
    }, (err) => {
        res.status(500).send({error: "Unexpected error"});
    });
});

console.log("Starting Server");
app.listen(process.env.PORT || 6060);