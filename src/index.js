const express = require('express');
const apiRoutes = require('./routers/index');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.get('*', function(req, res) {
  res.send({error: -2, descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`});
});

const connectedServer = app.listen(PORT, ()=> {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.error('Error: ', error);
})