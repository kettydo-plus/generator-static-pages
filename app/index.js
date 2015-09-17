/**
 * Created by mgobbi on 16/09/2015.
 */
'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
//var chalk = require('chalk');

var Generator = yeoman.generators.Base.extend({
    prompting: function () {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        var prompts = [{
            name: 'appname',
            message: 'What is your app\'s name ?',
            type: "input"
        }, {
            name: 'addSampleFiles',
            message: 'Would you like add sample files ?',
            type: "confirm"
        }];

        this.prompt(prompts, function (props) {
            this.appname = props.appname;
            this.addSampleFiles = props.addSampleFiles;

            done();
        }.bind(this));
    },
    /* scaffoldFolders: function () {

     },*/
    writing: {
        folders: function () {
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
        files: function () {
            this.fs.copyTpl(
                this.templatePath('_package.json'),
                this.destinationPath('package.json'),
                {site_name: this.appName}
            );

            this.fs.copy(this.templatePath("_gruntfile.js"), this.destinationPath("Gruntfile.js"));
            //this.fs.copy(this.templatePath("_package.json"),this.destinationPath( "package.json"));

            this.fs.copy(this.templatePath("grunt-tasks/config/_connect.js"), this.destinationPath("grunt-tasks/config/connect.js"));
            this.fs.copy(this.templatePath("grunt-tasks/config/_express.js"), this.destinationPath("grunt-tasks/config/express.js"));
            this.fs.copy(this.templatePath("grunt-tasks/config/_excel4node.js"), this.destinationPath("grunt-tasks/config/excel4node.js"));
            this.fs.copy(this.templatePath("grunt-tasks/config/_less.js"), this.destinationPath("grunt-tasks/config/less.js"));
            this.fs.copy(this.templatePath("grunt-tasks/config/_open.js"), this.destinationPath("grunt-tasks/config/open.js"));
            this.fs.copy(this.templatePath("grunt-tasks/config/_pages-builder-no-sample.js"), this.destinationPath("grunt-tasks/config/pages-builder.js"));
            this.fs.copy(this.templatePath("grunt-tasks/config/_processhtml.js"), this.destinationPath("grunt-tasks/config/processhtml.js"));
            this.fs.copy(this.templatePath("grunt-tasks/config/_sitemap-generator.js"), this.destinationPath("grunt-tasks/config/sitemap-generator.js"));
            this.fs.copy(this.templatePath("grunt-tasks/config/_watch.js"), this.destinationPath("grunt-tasks/config/watch.js"));
            this.fs.copy(this.templatePath("grunt-tasks/tasks/_excel4node.js"), this.destinationPath("grunt-tasks/tasks/excel4node.js"));
            this.fs.copy(this.templatePath("grunt-tasks/tasks/_pages-builder.js"), this.destinationPath("grunt-tasks/tasks/pages-builder.js"));
            this.fs.copy(this.templatePath("grunt-tasks/tasks/_sitemap-generator.js"), this.destinationPath("grunt-tasks/tasks/sitemap-generator.js"));
            this.fs.copy(this.templatePath("grunt-tasks/utils/_utils.js"), this.destinationPath("grunt-tasks/utils/Utils.js"));
            this.fs.copy(this.templatePath("grunt-tasks/utils/_xlsx-rows.js"), this.destinationPath("grunt-tasks/utils/xlsx-rows.js"));

        },
        sampleFiles: function () {
            if (this.addSampleFiles) {
                this.fs.copy(this.templatePath("grunt-tasks/config/_pages-builder.js"), this.destinationPath("grunt-tasks/config/pages-builder.js"));

                this.fs.copy(this.templatePath("src/_index-tpl.html"), this.destinationPath("src/index-tpl.html"));
                this.fs.copy(this.templatePath("src/less/_index.less"), this.destinationPath("src/less/index.less"));
                this.fs.copy(this.templatePath("src/partials/_header.html"), this.destinationPath("src/partials/header.html"));
                this.fs.copy(this.templatePath("src/json/pages/_common-labels.json"), this.destinationPath("src/json/pages/common-labels.json"));
                this.fs.copy(this.templatePath("src/excel/_common-labels.xlsx"), this.destinationPath("src/excel/common-labels.xlsx"));
                this.fs.copy(this.templatePath("src/json/pages/_index.json"), this.destinationPath("src/json/pages/index.json"));
                this.fs.copy(this.templatePath("src/excel/_index.xlsx"), this.destinationPath("src/excel/index.xlsx"));

            }
        }
    },
    install: function () {
        this.npmInstall([''], {'saveDev': true}, function () {
            console.log('Everything is ready!');
        });

    }

});

module.exports = Generator;