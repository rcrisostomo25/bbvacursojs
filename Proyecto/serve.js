console.log("Ronal Crisostoo matias");

let express = require("express");
let app = express();

app.use("/", express.static(__dirname + "/"));

app.listen(process.env.npm_package_config_port);