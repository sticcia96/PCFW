module.exports = function(grunt) {

    "use strict";

    var readOptionalJSON = function(filepath) {
            var data = {};
            try {
                data = grunt.file.readJSON(filepath);
            } catch(e) {}
            return data;
        };

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        dst: readOptionalJSON("dist/.destination.json"),
        testswarm: {
            tests: (function() { return require('fs').readdirSync('./test/unit/'); })()
        },
    });

    grunt.registerTask("testswarm", function(commit,configFile) {
        var jobName,
            testswarm = require("testswarm"),
            testUrls = [],
            pull = /PR-(\d+)/.exec(commit),
            config = grunt.file.readJSON(configFile),
            tests = grunt.config([this.name,"tests"]),
            testNames = tests;

        if ( pull ) {
            jobName = "PCFW pull <a href='https://github.com/TATDK/PCFW/pull/" +
                pull[ 1 ] + "'>#" + pull[ 1 ] + "</a>";
        } else {
            jobName = "PCFW commit #<a href='https://github.com/TATDK/PCFW/commit/" +
                commit + "'>" + commit.substr( 0, 10 ) + "</a>";
        }

        tests.forEach(function(test) {
            testUrls.push(config.testUrl + commit + "/test/index.html?module=" + test);
        });
        tests.forEach(function(test) {
            testNames.push(test+" min");
            testUrls.push(config.testUrl + commit + "/test/index.min.html?module=" + test);
        });

        testswarm({
            url: config.swarmUrl,
            pollInterval: 10000,
            timeout: 1000 * 60 * 30,
            done: this.async()
        }, {
            authUsername: config.authUsername,
            authToken: config.authToken,
            jobName: jobName,
            runMax: config.runMax,
            "runNames[]": testNames,
            "runUrls[]": testUrls,
            "browserSets[]": "PCFW"
        });
    });

    // Default grunt
    grunt.registerTask("default",[]);
};