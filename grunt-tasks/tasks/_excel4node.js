/**
 * Created by mgobbi on 02/09/2015.
 */
"use strict";
var xl = require('excel4node');
var R = require("ramda");


var path = require('path');
var xlsxRows = require('../utils/xlsx-rows');
module.exports = function (grunt) {

    var regexp_filename = /([\w\d_-]*)\.?[^\\\/]*$/i;

    //CREATE XLS -- start
    var createXLSData = R.curryN(3, function (wb, locale, msgs) {
        var ws = wb.WorkSheet(locale);

        Object.keys(msgs).forEach((title, i)=> {
            //crea i titoli
            ws.Cell(i + 1, 1).String(title);
            //crea contenuti
            ws.Cell(i + 1, 2).String(msgs[title]);
        });
        return wb;

    });

    function getPromisePerWorkbook(dest, locales) {
        return messages=> {
            var wb = new xl.WorkBook();
            var page = Object.keys(messages);
            R.compose(
                R.map(R.apply(createXLSData(wb))),
                R.map(locale=>  locale ? [locale, messages[page][locale]] : ["default", messages[page]])
            )(locales);
            //
            return new Promise((resolve, reject)=> {
                wb.write(dest, (err, resp)=> {
                    if (err) {
                        reject();
                    } else {
                        console.log("pagina creata:", dest);
                        resolve();
                    }

                });
            });
        }
    }

    function getPromisesChain(dest, locales) {
        return R.compose(
            Promise.all.bind(Promise),
            R.flatten,
            R.map(getPromisePerWorkbook(dest, locales)),
            R.of,
            R.reduce((prev, pagename)=> {
                prev[pagename.match(regexp_filename)[1]] = grunt.file.readJSON(pagename);
                return prev;
            }, {}),
            R.filter(grunt.file.exists.bind(grunt.file))
        );
    }

    function writeXLS(files, locales, done) {
        R.forEach(f=> getPromisesChain(f.dest, locales)(f.src).then(done), files);
    }

    // CREATE XLS -- end
    //
    // WRITE FROM EXCEL TO JSON --- start
    var writeChain = dest=>R.compose(
        R.forEach(data=> {
            grunt.file.write(dest, JSON.stringify(data));
            grunt.log.writeln('File "' + dest + '" created.');
        }),
        R.map(data=>  data.default ? data.default : data),

        R.map(xlsxRows),
        R.filter(grunt.file.exists.bind(grunt.file))
    );
    var writeJSON = R.forEach(f=> writeChain(f.dest)(f.src));
    // WRITE FROM EXCEL TO JSON --- end
    //
    grunt.registerMultiTask("excel4node", function () {

        var locales = this.data.options.locales || [null];
        var isXLS = this.data.options.target == "xls";
        if (isXLS) {
            writeXLS(this.files, locales, this.async());
        } else {
            writeJSON(this.files);
        }

    });
};