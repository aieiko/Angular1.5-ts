module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: "public/lib",
                    layout: "byComponent",
                    cleanTargetDir: false
                }
            }
        },

        tsd: {
            refresh: {
                options: {
                    command: 'reinstall',
                        latest: true,
                        config: 'tsd.json',
                        opts: {
                    }
                }
            }
        },

        typescript: {
            base: {
                src: ['DevAcces/angular/**/*.ts'],
                dest: 'public/app.js',
                options: {
                    module: 'amd',
                    target: 'es5'
                }
            }
        }
});

grunt.registerTask("default", ["bower:install"]);

grunt.loadNpmTasks("grunt-bower-task");
grunt.loadNpmTasks("grunt-tsd");
grunt.loadNpmTasks("grunt-typescript");
};