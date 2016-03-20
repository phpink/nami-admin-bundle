/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    scripts: {
      'jquery':             [App.path + '/vendor/jquery/jquery.min.js'],
      'icons':              [App.path + '/vendor/skycons/skycons.js', App.path + '/vendor/fontawesome/css/font-awesome.min.css', App.path + '/vendor/simplelineicons/simple-line-icons.css', App.path + '/vendor/weathericons/css/weather-icons.min.css'],
      'modernizr':          [App.path + '/vendor/modernizr/modernizr.js'],
      'fastclick':          [App.path + '/vendor/fastclick/fastclick.js'],
      'filestyle':          [App.path + '/vendor/filestyle/bootstrap-filestyle.min.js'],
      'csspiner':           [App.path + '/vendor/csspinner/csspinner.min.css'],
      'animo':              [App.path + '/vendor/animo/animo.min.js'],
      'sparklines':         [App.path + '/vendor/sparklines/jquery.sparkline.min.js'],
      'slimscroll':         [App.path + '/vendor/slimscroll/jquery.slimscroll.min.js'],
      'store':              [App.path + '/vendor/store/store+json2.min.js'],
      'screenfull':         [App.path + '/vendor/screenfull/screenfull.min.js'],
      'classyloader':       [App.path + '/vendor/classyloader/js/jquery.classyloader.min.js'],
      'vector-map':         [App.path + '/vendor/jvectormap/jquery-jvectormap-1.2.2.min.js', App.path + '/vendor/jvectormap/maps/jquery-jvectormap-world-mill-en.js', App.path + '/vendor/jvectormap/jquery-jvectormap-1.2.2.css'],
      'loadGoogleMapsJS':   [App.path + '/vendor/gmap/load-google-maps.js'],
      'google-map':         [App.path + '/vendor/gmap/jquery.gmap.min.js'],
      'flot-chart':         [App.path + '/vendor/flot/jquery.flot.min.js'],
      'flot-chart-plugins': [App.path + '/vendor/flot/jquery.flot.tooltip.min.js', App.path + '/vendor/flot/jquery.flot.resize.min.js', App.path + '/vendor/flot/jquery.flot.pie.min.js', App.path + '/vendor/flot/jquery.flot.time.min.js', App.path + '/vendor/flot/jquery.flot.categories.min.js', App.path + '/vendor/flot/jquery.flot.spline.min.js'],
      'jquery-ui':          [App.path + '/vendor/jqueryui/js/jquery-ui-1.10.4.custom.min.js', App.path + '/vendor/touch-punch/jquery.ui.touch-punch.min.js'],
      'chosen':             [App.path + '/vendor/chosen/chosen.jquery.min.js', App.path + '/vendor/chosen/chosen.min.css'],
      'slider':             [App.path + '/vendor/slider/js/bootstrap-slider.js', App.path + '/vendor/slider/css/slider.css'],
      'moment' :            [App.path + '/vendor/moment/min/moment-with-langs.min.js'],
      'fullcalendar':       [App.path + '/vendor/fullcalendar/fullcalendar.min.js', App.path + '/vendor/fullcalendar/fullcalendar.css'],
      'codemirror':         [App.path + '/vendor/codemirror/lib/codemirror.js', App.path + '/vendor/codemirror/lib/codemirror.css'],
      'codemirror-plugins': [App.path + '/vendor/codemirror/addon/mode/overlay.js', App.path + '/vendor/codemirror/mode/markdown/markdown.js', App.path + '/vendor/codemirror/mode/xml/xml.js', App.path + '/vendor/codemirror/mode/gfm/gfm.js', App.path + '/vendor/marked/marked.js'],
      'datetimepicker':     [App.path + '/vendor/datetimepicker/js/bootstrap-datetimepicker.min.js', App.path + '/vendor/datetimepicker/css/bootstrap-datetimepicker.min.css'],
      'taginput' :          [App.path + '/vendor/tagsinput/bootstrap-tagsinput.min.js', App.path + '/vendor/tagsinput/bootstrap-tagsinput.css'],
      'inputmask':          [App.path + '/vendor/inputmask/jquery.inputmask.bundle.min.js'],
      'bwizard':            [App.path + '/vendor/wizard/js/bwizard.min.js'],
      'parsley':            [App.path + '/vendor/parsley/parsley.min.js'],
      'datatables':         [App.path + '/vendor/datatable/media/js/jquery.dataTables.min.js', App.path + '/vendor/datatable/extensions/datatable-bootstrap/css/dataTables.bootstrap.css'],
      'datatables-pugins':  [App.path + '/vendor/datatable/extensions/datatable-bootstrap/js/dataTables.bootstrap.js', App.path + '/vendor/datatable/extensions/datatable-bootstrap/js/dataTables.bootstrapPagination.js', App.path + '/vendor/datatable/extensions/ColVis/js/dataTables.colVis.min.js', App.path + '/vendor/datatable/extensions/ColVis/css/dataTables.colVis.css'],
      'flatdoc':            [App.path + '/vendor/flatdoc/flatdoc.js']
    },
    modules: [
      {
          name: 'toaster', files: [
              App.path + '/vendor/toaster/toaster.js',
              App.path + '/vendor/toaster/toaster.css'
          ]
      },
      {
          name: 'ngWig',
          files: [
              App.path + '/vendor/ng-wig/dist/ng-wig.min.js',
              App.path + '/vendor/ng-wig/src/css/ng-wig.css'
          ]
      }
    ]

  })
;