/*
 *  Custom handlers for Jillix Maps application
 *
 * */
(function (window) {

    window.Maps = window.Maps || {};

    /**
     *  Logged in view layout is ready
     *
     * */
    window.Maps.ready = function () {

        // set table template
        M.miids.maps_table.setTemplate ({
            id: "dummy"
          , options: {}
          , schema: {
                name: {
                    type: 'string'
                  , label: "Name"
                  , order: 1
                }
              , "options.center.lat": {
                    type: 'number'
                  , label: "Lat"
                  , order: 2
                }
              , "options.center.lng": {
                    type: 'number'
                  , label: "Lng"
                  , order: 3
                }
              , "options.zoom": {
                    type: 'number'
                  , label: "Zoom"
                  , order: 4
                }
              , "options.type": {
                    type: 'string'
                  , label: "Type"
                  , order: 5
                }
            }
        });

        M.miids.mono_maps.read({type: "map", query: {}}, function (err, data) {
            M.miids.maps_table.renderItemsFromResult(err, data)
        });
    };
})(window);
