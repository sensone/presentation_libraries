(function() {
  require.config({
    paths: {
      backbone: '../bower_components/backbone/backbone',
      'backbone-validation': '../bower_components/backbone-validation/backbone-validation',
      fotorama: '../bower_componentsfotorama/fotorama',
      jquery: '../bower_components/jquery/dist/jquery',
      underscore: '../bower_components/underscore/underscore',
      markdown: '../bower_components/reveal.js/plugin/markdown/markdown',
      marked: '../bower_components/reveal.js/plugin/markdown/marked',
      classList: '../bower_components/reveal.js/lib/js/classList'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      'backbone-validation': {
        deps: ['underscore', 'jquery', 'backbone'],
        exports: 'validation'
      },
      fotorama: {
        deps: ['jquery'],
        exports: 'fotorama'
      },
      markdown: {
        deps: ['marked'],
        exports: 'markdown'
      },
      marked: {
        deps: ['classList'],
        exports: 'marked'
      }

    }
  });

  require(['markdown', 'marked'], function(markdown, marked) {
    document.marked = marked
    console.log(666)
    console.log(marked)
    console.log(markdown)
// Reveal.initialize({
//                 controls: true,
//                 progress: true,
//                 history: true,
//                 center: true,

//                 theme: Reveal.getQueryHash().theme, // available themes are in /css/theme
//                 transition: Reveal.getQueryHash().transition || 'default', // default/cube/page/concave/zoom/linear/fade/none

//                 // Optional libraries used to extend on reveal.js
//                 dependencies: [
//                     { src: 'bower_components/reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
//                     { src: 'bower_components/reveal.js/plugin/markdown/marked.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
//                     { src: 'bower_components/reveal.js/plugin/markdown/markdown.js', condition: function() { return !!document.querySelector( '[data-markdown]' ); } },
//                     { src: 'bower_components/reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
//                     { src: 'bower_components/reveal.js/plugin/zoom-js/zoom.js', async: true, condition: function() { return !!document.body.classList; } },
//                     { src: 'bower_components/reveal.js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } },
//                     // { src: 'bower_components/reveal.js/plugin/search/search.js', async: true, condition: function() { return !!document.body.classList; } }
//                     //{ src: 'bower_components/reveal.js/plugin/remotes/remotes.js', async: true, condition: function() { return !!document.body.classList; } }

//                     { src: 'js/loadhtmlslides.js', condition: function() { return !!document.querySelector( '[data-html]' ); } }
//                 ]
//            });
  });

}).call(this);