//var fs = require("fs");
//var R = require("ramda");
//module.exports = function (grunt) {
//
//    function makeGetPromise(templateStart, templateEnd) {
//
//        var makeGetTemplate = function (writeFile) {
//            return R.compose(
//                writeFile,
//                data=> data.concat("</ul>" + templateEnd),
//                R.reduce((prev, curr)=>  prev + "<li><a href=\"" + curr + "\" >" + curr + "</a></li>", templateStart + "<ul>"),
//                R.filter(file=> (file.match(/.html/g) && !file.match(/-tpl.html/g)))
//            );
//        };
//        var writeFile = R.curryN(4, (url, resolve, reject, sitemapData)=> {
//
//            fs.writeFile(url, sitemapData, 'utf8', err=> {
//                if (err) {
//                    reject();
//                } else {
//                    resolve(sitemapData);
//                }
//
//            });
//        });
//
//        return (dirname, dest)=>  new Promise((resolve, reject)=> {
//            fs.readdir(dirname, R.flip(makeGetTemplate(writeFile(dest, resolve, reject))));
//        });
//
//    }
//
//    grunt.registerMultiTask("sitemap-generator", function () {
//
//        var done = this.async();
//        var getPromise = makeGetPromise("<html><head></head><body>", "</body></html>");
//
//        var getSitemap = R.compose(
//            R.bind(Promise.all, Promise),
//            R.flatten,
//            R.map(f=>R.map(dirname=>getPromise(dirname, f.dest), f.src))
//        );
//        getSitemap(this.files)
//            .then(console.log.bind(console, "sitemap done"))
//            .then(done)
//
//    });
//};

var fs = require("fs");
var most = require("most");
var _ = require("lodash");
var R = require("ramda");
var walk = require('walk');

module.exports = function (grunt) {
    grunt.registerMultiTask("sitemap-generator", function () {

        var templateStart = "<html><head></head><body>";
        var templateEnd = "</body></html>";
        var done = this.async();

        var options = Object.assign({followLinks: false}, this.data.options || {});

        function parseObj(baseURL, root, nodeNames) {
            var result = {};
            var filtered = nodeNames.filter(function (filename) {
                return filename.match(/.html/g) && !filename.match(/-tpl.html/g);
            });
            if (filtered.length) {
                var normalized = root.replace(/..\//g, "").replace(/\\|\\\\/g, "/");
                /* var directories = normalized.split("/").filter(function (name) {
                 return name != baseURL;
                 });
                 directories.reduce(function (prev, curr) {
                 return prev[curr] = {};
                 }, {});*/
                var d=normalized.split("/").filter(function (name) {
                    return name != baseURL;
                }).join("/");
                result[normalized] = filtered.map(function (name) {
                    return {
                        path:  d + "/" + name,
                        name
                    };
                });

            }

            return result;
        }

        function getMarkup(pages) {
            return pages.reduce((prev, curr)=>  prev + "<li><a href=\"" + curr.path + "\" >" + curr.name + "</a></li>", "<ul>").concat("</ul>");
        };

        var promises = this.files.map(function (f) {

            return f.src.map(function (dir) {

                walker = walk.walk(dir, options);

                var oNames = most.create(function (add, end, err) {
                        walker.on("names", function (root, nodeNamesArray) {
                            // console.log(root,nodeNamesArray);
                            add({root, nodeNamesArray});
                        });
                        walker.on("end", function () {
                            end();
                        })
                    })
                    .map(function (config) {
                        return parseObj(dir,config.root, config.nodeNamesArray);
                    });

                return oNames.reduce(function (prev, curr) {
                    return _.merge(prev, curr);
                }, {}).then(function (groups) {
                    return Object.keys(groups)
                        .reduce(function (prev, curr) {
                            var li = "<li><h1>" + curr + "</h1>" + getMarkup(groups[curr]) + "</li>";
                            return prev.concat(li);
                        }, templateStart + "<ul>")
                        .concat("</ul>" + templateEnd)
                }).then(function (html) {
                    fs.writeFileSync(f.dest, html, 'utf8');
                    return html;
                });

            });

        });

        Promise.all(R.flatten(promises)).then(function (a) {
            console.log("weee", a);
            done();
        });

        //var walker;

        // walker = walk.walk("../../src", options);

// OR
// walker = walk.walkSync("/tmp", options);

    });
};

