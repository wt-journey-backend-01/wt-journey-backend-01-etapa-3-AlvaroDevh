const express = require('express');
const app = express();
const port = 3000;

const agentesRoutes = require("./routes/agentesRoutes");
const casosRoutes = require("./routes/casosRoutes.js");
const setupSwagger = require('./docs/swagger'); 
const errorHandler = require('./utils/errorHandler');


app.use(express.json()); 

setupSwagger(app);

app.use("/casos", casosRoutes);
app.use( agentesRoutes);

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
