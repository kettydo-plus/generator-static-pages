

var utils = require("../utils/Utils");
module.exports = {
    main: {
        files: [
            // includes files within path and its sub-directories
            {cwd:utils.getSRC(), expand: true, src: ['**/*.*','!**/*.xlsx','!**/*.less','!**/*-tpl.html'], dest: utils.getHTDOCS()}
        ]
    }
};