/*
 *  Custom handlers for Jillix Maps application
 *
 * */
(function (window) {

    window.Maps = window.Maps || {};

    // modules
    var Layout = null
      , MonoMaps = null
      , howManyModules = 2
      , moduleLoadComplete = 0
      ;

    /*************************
     *        LAYOUT         *
     *************************/
    window.Maps.ready = {
        /**
         *  Layout ready
         *  Layout is ready.
         *
         */
        layout: function () {

            // set layout
            Layout = this;

            // call module loaded handler
            moduleLoadedHandler();
        }
        /**
         *  Layout ready
         *  Layout is ready.
         *
         */
      , mono_maps: function (miid) {

            // set layout
            MonoMaps = miid;

            // call module loaded handler
            moduleLoadedHandler();
        }
    };

    /**
     *  This function is called every time when a module is
     *  loaded in page
     *
     */
    function moduleLoadedHandler () {

        // not loaded all modules yet
        if (++moduleLoadComplete !== howManyModules) { return; }

        console.log("Load complete");
    }
})(window);
