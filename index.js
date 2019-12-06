require("dotenv").config();

const server = require('./server.js');

const port = process.env.PORT || 7000;
server.listen(port, () => {
    console.log(`\n*** Server running on http://localhost:${port} ***\n`);
});