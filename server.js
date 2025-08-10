const express = require('express');
const app = express();
const port = 3000;

const agentesRoutes = require("./routes/agentesRoutes");
const casosRoutes = require("./routes/casosRoutes");
const setupSwagger = require('./docs/swagger'); 
const errorHandler = require('./utils/errorHandler');


app.use(express.json()); 

app.use(casosRoutes);
app.use(agentesRoutes);
app.use(errorHandler);


setupSwagger(app);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
