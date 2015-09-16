/**
 * Created by mgobbi on 01/09/2015.
 */



var R = require("ramda");
var _ = require("lodash");
module.exports = function (grunt) {

    var getNewTask = R.curryN(3, (config, locale, item) => {
        var filename = config.pagePattern.replace("{{page}}", item.page).replace("{{locale}}", locale);
        var files = {};
        files[filename] = [config.templateUrl];
        var newTask = {};
        var name = item.page + locale;
        newTask[name] = {
            files,
            options: {
                data: locale ? item.messages[locale] : item.messages
            }
        };
        return {
            task: newTask,
            target: "processhtml:" + name
        }
    });

    function runHtmlProcessTasks(apList, getMessagesPerPage) {
        return R.compose(
            R.tap(grunt.task.run.bind(grunt.task)),
            R.map(item=> {
                grunt.config.merge({
                    processhtml: item.task
                });
                //
                return item.target;
            }),
            R.ap(apList),
            R.map(getMessagesPerPage)
        )
    }

    function getMessagesPerPage(commonLabels) {
        return item=> {
            //
            var messages = Object.assign({}, commonLabels);

            return {
                page: item.name,
                messages: !item.messages ? messages : _.merge(messages, grunt.file.readJSON(item.messages))
            };

        }
    }

    grunt.registerMultiTask("pages-builder", function()  {

        //
        var commonLabels = !this.data.options.commonLabels ? {} : grunt.file.readJSON(this.data.options.commonLabels);
        var locales = this.data.options.locales || [""];
        //
        var templateUrl = this.data.options.templateUrl;
        var pages = this.data.options.pages;
        var pagePattern = this.data.options.pagePattern;

        //
        var localesFnList = R.map(getNewTask({pagePattern: pagePattern, templateUrl: templateUrl}), locales);

        runHtmlProcessTasks(localesFnList, getMessagesPerPage(commonLabels))(pages);

    });
};