/**
 * Created by mgobbi on 04/09/2015.
 */
var utils = require("../utils/Utils");
module.exports = {
    all: {
        options: {
            bases: [utils.getHTDOCS()],
            port: 8080,
            hostname: "localhost",
            livereload: true
        }
    }
};