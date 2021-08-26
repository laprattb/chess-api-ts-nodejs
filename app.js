const express = require("express");
const app = express();
const swaggerUI = require("swagger-ui-express");
const port = process.env.PORT || 3000

app.get("/url", (req, res, next) => {
    res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.listen(port, () => {
    console.log("Server running on port %d", port);
});

