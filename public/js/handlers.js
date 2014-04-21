/*
 *  Custom handlers for Jillix Maps application
 *
 * */
(function (window) {

    var Maps = window.Maps || {};
    window.Maps = Maps;

    /**
     *  This function reads the documents from database and refreshes
     *  the tables.
     *
     * */
    function refreshTables () {

        var types = [ "map", "marker", "infowin", "icon" ];

        // each type
        for (var i = 0; i < types.length; ++i) {
            (function (cType) {
                // read maps/markers/infowins/icons and render them
                M.miids.mono_maps.read({type: cType, query: {}}, function (err, data) {
                    M.miids[cType + "s_table"].renderItemsFromResult(err, data)
                });
            })(types[i]);
        }
    }

    // pseudo templates used for generating table headers
    const TEMPLATES = {
        maps: {
            options: {}
          , schema: {
                name: {
                    type: "string"
                  , label: "Name"
                  , order: 1
                  , nosort: true
                }
              , "options.center.lat": {
                    type: "number"
                  , label: "Lat"
                  , order: 2
                  , nosort: true
                }
              , "options.center.lng": {
                    type: "number"
                  , label: "Lng"
                  , order: 3
                  , nosort: true
                }
              , "options.zoom": {
                    type: "number"
                  , label: "Zoom"
                  , order: 4
                  , nosort: true
                }
              , "options.type": {
                    type: "string"
                  , label: "Type"
                  , order: 5
                  , nosort: true
                }
            }
        }
      , markers: {
            options: {}
          , schema: {
                "position.lat": {
                    type: "number"
                  , label: "Lat"
                  , order: 1
                  , nosort: true
                }
              , "position.lng": {
                    type: "number"
                  , label: "Lng"
                  , order: 2
                  , nosort: true
                }
              , visible: {
                    type: "boolean"
                  , label: "Visible"
                  , order: 3
                  , nosort: true
                }
              , icon: {
                    type: "objectid"
                  , label: "Icon"
                  , order: 4
                  , nosort: true
                }
              , infowin: {
                    type: "objectid"
                  , label: "Info Window"
                  , order: 5
                  , nosort: true
                }
            }
        }
      , infowins: {
            options: {}
          , schema: {
                title: {
                    type: "string"
                  , label: "Title"
                  , order: 1
                  , nosort: true
                }
              , content: {
                    type: "string"
                  , label: "Content"
                  , order: 2
                  , nosort: true
                }
              , "pixelOffset.x": {
                    type: "number"
                  , label: "Offset X"
                  , order: 3
                  , nosort: true
                }
              , "pixelOffset.y": {
                    type: "number"
                  , label: "Offset Y"
                  , order: 4
                  , nosort: true
                }
            }
        }
      , icons: {
            options: {}
          , schema: {
                path: {
                    type: 'string'
                  , label: "Image"
                  , order: 1
                  , nosort: true
                }
              , "size.w": {
                    type: 'number'
                  , label: "Width"
                  , order: 2
                  , nosort: true
                }
              , "size.h": {
                    type: 'number'
                  , label: "Height"
                  , order: 3
                  , nosort: true
                }
              , "origin.x": {
                    type: 'number'
                  , label: "Origin X"
                  , order: 4
                  , nosort: true
                }
              , "origin.y": {
                    type: 'number'
                  , label: "Origin Y"
                  , order: 5
                  , nosort: true
                }
              , "anchor.x": {
                    type: 'number'
                  , label: "Anchor X"
                  , order: 6
                  , nosort: true
                }
              , "anchor.y": {
                    type: 'number'
                  , label: "Anchor Y"
                  , order: 7
                  , nosort: true
                }
            }
        }
    };

    /**
     *  Logged in view layout is ready
     *
     * */
    Maps.ready = function () {

        // load bootstrap js
        $.getScript ("//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js");

        // set table templates
        var templatesToSet = Object.keys (TEMPLATES);

        // each template
        for (var i = 0; i < templatesToSet.length; ++i) {

            // get the current template
            var cTemplate = templatesToSet[i];

            // set template
            M.miids[cTemplate + "_table"].setTemplate (TEMPLATES[cTemplate]);
        }

        // refresh tables
        refreshTables ();

        // create map
        $("[data-form]").on("click", function () {

            // load form
            M.miids.forms.loadForm ({ formId: $(this).attr("data-form") }, function (err, data) {

                // handle error
                if (err) {
                    return console.error (err);
                }

                // show modal
                $("#modal").modal("show");
            });
        });
    };

    /**
     *  Form serializer module will call this function
     *
     * */
    Maps.dialogSaved = function (formObj) {

        // get the type
        var type = formObj.formType;
        delete formObj.formType;

        var data = null;
        switch (type) {
            case "map":
                data = {
                    name: formObj.name
                  , options: {
                        center: {
                            lat: Number (formObj.lat)
                          , lng: Number (formObj.lng)
                        }
                      , zoom: Number (formObj.zoom)
                      , type: formObj.type
                    }
                };
                break;
            case "marker":
                data = {
                    position: {
                        lat: Number (formObj.lat)
                      , lng: Number (formObj.lng)
                    }
                  , visible: Boolean (formObj.visible)
                  , icon: formObj.icon
                  , infowin: formObj.infowin
                };

                // no infowindow
                if (!formObj.infowin) {
                    delete data.infowin;
                }

                // no icon
                if (!formObj.icon) {
                    delete data.icon;
                }
                break;
            case "infowin":
                data = {
                    title: formObj.title
                  , content: formObj.content
                  , pixelOffset: {
                        x: Number (formObj.pixelOffsetX)
                      , y: Number (formObj.pixelOffsetY)
                    }
                };
                break;
            case "icon":
                data = {
                    path: formObj.path
                  , size: {
                        w: Number (formObj.width)
                      , h: Number (formObj.height)
                    }
                  , origin: {
                        x: Number (formObj.originX)
                      , y: Number (formObj.originY)
                    }
                  , anchor: {
                        x: Number (formObj.anchorX)
                      , y: Number (formObj.anchorY)
                    }
                };
                break;
        }

        // create maps, markers, infowindows, icon
        M.miids.mono_maps.create({
            type: type
          , data: data
        }, function (err, data) {

            // handle error
            if (err) {
                return alert (err);
            }

            // hide modal
            $("#modal").modal("hide");

            // refresh table
            refreshTables();
        });
    }
})(window);
