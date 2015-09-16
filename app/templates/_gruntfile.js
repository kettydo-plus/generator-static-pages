/**
 * Created by mgobbi on 01/09/2015.
 */
module.exports = function (grunt) {
    grunt.loadTasks('./grunt-tasks/tasks');
    var path = require('path');

    require('load-grunt-config')(grunt, {
        // path to task.js files, defaults to grunt dir
        configPath: path.join(process.cwd(), 'grunt-tasks/config'),

        loadGruntTasks: {
            pattern: 'grunt-*',
            config: require('./package.json'),
            scope: 'devDependencies'
        }

    });
    grunt.registerTask('server', [
        'express',
        'pages-builder',
        'open',
        'watch'
    ]);

};

