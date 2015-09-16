/**
 * Created by mgobbi on 02/09/2015.
 */
var utils=require("../utils/Utils");
module.exports = {
    // crea gli xlsx dai json
    "XLSSfy all messages": {
        options: {
            target: "xls", //crea un xlsx da un json
            locales: ["it_IT"]//optionale
        },
        files: [{
            expand: true,
            cwd: utils.getSourcePath(utils.JSON)+"pages",
            src: [
                '*.json',
                "!**/templates/"
            ],
            dest: utils.getSourcePath(utils.EXCEL),
            ext: '.xlsx'
        }]
    },
    // crea i json dagli xlsx
    "JSONfy all messages": {
        options: {
            target: "json"// crea un json da un xlsx
        },
        files: [{
            expand: true,
            cwd: utils.getSourcePath(utils.EXCEL),
            src: [
                '*.xlsx',
                "!**/templates/",
                "!**/~$*.xlsx"
            ],
            dest: utils.getSourcePath(utils.JSON)+"pages",
            ext: '.json'
        }]
    },
    "xls common":{
        options: {
            target: "xls", //crea un xlsx da un json
            locales: ["it_IT","vi_VN"]//optionale
        },
        files: [{
            expand: true,
            cwd: utils.getSourcePath(utils.JSON)+"pages",
            src: [
                'common-labels.json',
                "!**/templates/"
            ],
            dest: utils.getSourcePath(utils.EXCEL),
            ext: '.xlsx'
        }]
    }
};