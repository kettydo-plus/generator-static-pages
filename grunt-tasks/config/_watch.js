/**
 * Created by mgobbi on 02/09/2015.
 */
var utils = require("../utils/Utils");
module.exports = {
    html: {

        files: [utils.getSRC() + '*.html'],
        options: {livereload: true},
        tasks: ['pages-builder']

    },
    less: {
        // We watch and compile sass files as normal but don't live reload here
        files: [utils.getSourcePath(utils.LESS) + '*.less'],
        tasks: ['less']
    }

};