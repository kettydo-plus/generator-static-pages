
var fs = require("fs");
module.exports = function (grunt) {

    grunt.registerTask("sitemap-generator",function(){

        var template =fs.readFileSync("grunt-tasks/utils/html-template.html", "utf-8");
        console.log(template);

        var files = fs.readdirSync("src");

         var content= files.filter(function(file) { return file.substr(-5) === '.html'; })
            .reduce(function(prev,next) {
                return prev + "<li href=\""+next+"\" >"+next+"</li>";
            },"");

         template = template.replace("{{content}}",content);
         console.log(template);

         fs.writeFile("grunt-tasks/utils/sitemap.html", template, 'utf8', function (err) {
                 if (err) return console.log(err);
         });

    });
};


