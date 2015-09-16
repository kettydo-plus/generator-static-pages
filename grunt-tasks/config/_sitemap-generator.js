/**
 * Created by mgobbi on 02/09/2015.
 */
var utils=require("../utils/Utils");
module.exports = {
    // crea gli xlsx dai json
    "htdocs": {

        files: [{
            expand: true,
            cwd: utils.getS,
            src: [
                '*.html',
                "?*-tpl.html"
            ],
            dest: utils.getSourcePath(utils.JSON)+"pages",
            ext: '.json'
        }]
    }
};