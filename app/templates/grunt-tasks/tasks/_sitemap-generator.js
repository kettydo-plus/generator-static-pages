var fs = require("fs");
var R = require("ramda");
module.exports = function (grunt) {

    function makeGetPromise(templateStart, templateEnd) {

        var makeGetTemplate = function (writeFile) {
            return R.compose(
                writeFile,
                data=> data.concat("</ul>" + templateEnd),
                R.reduce((prev, curr)=>  prev + "<li><a href=\"" + curr + "\" >" + curr + "</a></li>", templateStart + "<ul>"),
                R.filter(file=> (file.match(/.html/g) && !file.match(/-tpl.html/g)))
            );
        };
        var writeFile = R.curryN(4, (url, resolve, reject, sitemapData)=> {

            fs.writeFile(url, sitemapData, 'utf8', err=> {
                if (err) {
                    reject();
                } else {
                    resolve(sitemapData);
                }

            });
        });

        return (dirname, dest)=>  new Promise((resolve, reject)=> {
            fs.readdir(dirname, R.flip(makeGetTemplate(writeFile(dest, resolve, reject))));
        });

    }

    grunt.registerMultiTask("sitemap-generator", function () {

        var done = this.async();
        var getPromise = makeGetPromise("<html><head></head><body>", "</body></html>");

        var getSitemap = R.compose(
            R.bind(Promise.all, Promise),
            R.flatten,
            R.map(f=>R.map(dirname=>getPromise(dirname, f.dest), f.src))
        );
        getSitemap(this.files)
            .then(console.log.bind(console, "sitemap done"))
            .then(done)

    });
};


