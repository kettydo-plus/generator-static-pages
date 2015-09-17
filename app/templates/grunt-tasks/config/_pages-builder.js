/**
 * Created by mgobbi on 01/09/2015.
 */

var utils = require("../utils/Utils");
module.exports = {

    "index-tpl": {
        options: {
            commonLabels: utils.getSourcePath(utils.JSON) + "pages/common-labels.json",// le labels comuni al sito [opzionale]

            locales: ["it_IT"],
            templateUrl: utils.getSRC() + "index-tpl.html", // template da compilare
            pagePattern: utils.getHTDOCS() + "{{page}}.html", // pattern per pagina di destinazione
            pages: [{
                name: "index",//[required]
                messages: utils.getSourcePath(utils.JSON) + "pages/index.json"// lista json dei messaggi per pagina [opzionale]
            }] // lista di nomi della pagina declinata dal template
        }
    }

};