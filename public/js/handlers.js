/*
 *  Custom handlers for Jillix Maps application
 *
 * */
(function (window) {

    window.Maps = window.Maps || {};

    // modules
    var Layout = null
      , howManyModules = 1
      , moduleLoadComplete = 0
      ;

    /*************************
     *        LAYOUT         *
     *************************/
    window.Maps.layout = {
        /**
         *  Layout ready
         *  Layout is ready.
         *
         */
        ready: function () {

            // set layout
            Layout = this;

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
