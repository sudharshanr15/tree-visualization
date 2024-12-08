module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      files: ["Gruntfile.js", "./src/js/**/*.js"],
      tasks: ["concat", "uglify", "obfuscator"]
    },

    uglify: {
      target: {
        files: {
          "dest/js/main.min.js": ["dest/js/main.js"]
        }
      }
    },

    concat: {
      dist: {
        src: ["src/js/**/*.js"],
        dest: "dest/js/main.js"
      }
    },

    obfuscator: {
      task: {
        files: {
          "dest/js/main.o.js": ["dest/js/main.min.js"]
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-obfuscator");

  grunt.registerTask("default", ["concat", "uglify", "obfuscator", "watch"]);
};
