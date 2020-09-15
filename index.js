const express = require('express');
const app = express();


require('./config/middlewares')(app);
app.use('/', require('./routes/index'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));