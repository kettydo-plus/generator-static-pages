/**
 * Created by mgobbi on 02/09/2015.
 */
var utils=require("../utils/Utils");
module.exports = {
    // crea gli xlsx dai json
    "htdocs": {
        options: {
            target: "xls"//, crea un xlsx da un json
            // locales: ["it_IT", "en_GB"]//optionale
        },
        files: [{
            expand: true,
            cwd: utils.getSourcePath("src"),
            src: [
                '*.html'
            ],
            dest: utils.getSourcePath(utils.JSON)+"pages",
            ext: '.json'
        }]
    },
    // crea i json dagli xlsx
    "src": {
        options: {
            target: "json"// crea un json da un xlsx
        },
        files: [{
            expand: true,
            cwd: utils.getSourcePath("src"),
            src: [
                '*.html'
            ],
            dest: utils.getSourcePath(utils.JSON)+"pages",
            ext: '.json'
        }]
    }
};