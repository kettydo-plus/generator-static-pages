/**
 * Created by mgobbi on 16/09/2015.
 */
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
//var chalk = require('chalk');

var Generator = yeoman.generators.Base.extend({
    promptUser: function() {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        } ];

        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.addDemoSection = props.addDemoSection;

            done();
        }.bind(this));
    },
    scaffoldFolders: function(){
        this.mkdir("grunt-tasks");
        this.mkdir("grunt-tasks/config");
        this.mkdir("grunt-tasks/tasks");
        this.mkdir("grunt-tasks/utils");
        this.mkdir("htdocs");
        this.mkdir("src");
        this.mkdir("src/css");
        this.mkdir("src/excel");
        this.mkdir("src/js");
        this.mkdir("src/json/pages");
        this.mkdir("src/less");
        this.mkdir("src/partials");
    },
    copyMainFiles: function(){

        this.bulkCopy("_gruntfile.js", "Gruntfile.js");
        this.bulkCopy("_package.json", "package.json");
        this.bulkCopy("grunt-tasks/config/_connect.js","grunt-tasks/config/connect.js");
        this.bulkCopy("grunt-tasks/config/_express.js","grunt-tasks/config/express.js");
        this.bulkCopy("grunt-tasks/config/_excel4node.js","grunt-tasks/config/excel4node.js");
        this.bulkCopy("grunt-tasks/config/_less.js","grunt-tasks/config/less.js");
        this.bulkCopy("grunt-tasks/config/_open.js","grunt-tasks/config/open.js");
        this.bulkCopy("grunt-tasks/config/_pages-builder.js","grunt-tasks/config/pages-builder.js");
        this.bulkCopy("grunt-tasks/config/_processhtml.js","grunt-tasks/config/processhtml.js");
        this.bulkCopy("grunt-tasks/config/_sitemap-generator.js","grunt-tasks/config/sitemap-generator.js");
        this.bulkCopy("grunt-tasks/config/_watch.js","grunt-tasks/config/watch.js");
        this.bulkCopy("grunt-tasks/tasks/_excel4node.js","grunt-tasks/tasks/excel4node.js");
        this.bulkCopy("grunt-tasks/tasks/_pages-builder.js","grunt-tasks/tasks/pages-builder.js");
        this.bulkCopy("grunt-tasks/tasks/_sitemap-generator.js","grunt-tasks/tasks/sitemap-generator.js");
        this.bulkCopy("grunt-tasks/utils/_utils.js","grunt-tasks/utils/Utils.js");
        this.bulkCopy("grunt-tasks/utils/_xlsx-rows.js","grunt-tasks/utils/xlsx-rows.js");

        //this.directory("grunt-tasks/","grunt-tasks");
        //this.copy("_main.css", "app/css/main.css");

        var context = {
            site_name: this.appName
        };

        //this.template("_header.html", "app/header.html", context);
    },
    runNpm: function(){
        var done = this.async();
        this.npmInstall("", function(){
            console.log("\nEverything Setup !!!\n");
            done();
        });
    }
});


module.exports = Generator;