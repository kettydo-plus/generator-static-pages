/**
 * Created by mgobbi on 16/09/2015.
 */
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
//var chalk = require('chalk');

var OnepageGenerator = yeoman.generators.Base.extend({
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

        this.copy("_gruntfile.js", "Gruntfile.js");
        this.copy("_package.json", "package.json");
        this.directory("grunt-tasks/config")
        this.directory("grunt-tasks/tasks")
        this.directory("grunt-tasks/utils")
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

module.exports = OnepageGenerator;