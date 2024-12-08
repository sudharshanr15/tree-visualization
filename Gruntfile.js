module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      files: ["Gruntfile.js", "./src/js/**/*.js"],
      tasks: ["uglify", "concat"]
    },

    uglify: {
      target: {
        files: {
          "dest/js/main.min.js": ["dest/js/**/*.js"]
        }
      }
    },

    concat: {
      dist: {
        src: ["src/js/**/*.js"],
        dest: "dest/js/main.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-concat");

  grunt.registerTask("default", ["watch", "concat", "uglify"]);
};
