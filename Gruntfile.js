module.exports = function (grunt) {

    var commonUrl = 'localhost';

    // Configure grunt here
    grunt.initConfig({
        concurrent: {
            target: {
                tasks: ["ts:app"],
                options: {
                    logConcurrentOutput: true,
                    declaration: true
                }
            }
        },
        ts: {
            options: {
                logConcurrentOutput: true,
                sourceMap: true,
                declaration: true
            },
            app: {                          // a particular target
                src: ["app/scripts/*.ts"], // The source typescript files, http://gruntjs.com/configuring-tasks#files
                out: 'productApp.js'
                // watch: 'app/scripts'
                // If specified, generate an out.js file which is the merged js file
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '',
                    keepalive: true,
                    open: {
                        target: 'http://localhost:9001/app/index.html#'
                    }
                }
            }
        }
    });
    // load the task
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-injector');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html2js');


    // register the defaults
    grunt.registerTask("default", ["concurrent:target"]);
    grunt.registerTask("start", ["connect:server"]);
}

