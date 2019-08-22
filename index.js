const express = require('express');
const cors = require('cors');
const app = express();
const authMiddleware = require('./middlewares/auth');
app.use(cors());
app.use(authMiddleware);
app.use(express.static(__dirname + '/client/dist/client'));

app.get("/api/v1/products", (req, res) => {
    console.log(req._parsedOriginalUrl.pathname);
    res.send({wena: "wena"});
});

app.listen(process.env.PORT || 6060);