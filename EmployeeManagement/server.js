const app = require("./app");
const config = require("./config");

app.listen(config.PORT, config.IP, ()=>console.log(`Server start at port ${config.PORT}`));

