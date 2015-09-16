/**
 * Created by mgobbi on 02/09/2015.
 */
var utils=require("../utils/Utils");
module.exports={
    options: {
        port: 3000,
        hostname: 'localhost'
    },
    dev: {
        options: {
            keepalive:true,
            base: utils.getHTDOCS(),
            middleware: function (connect) {
                return [
                    require('connect-livereload')()
                ];
            }
        }
    }
};