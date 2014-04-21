/*
 *  Custom handlers for Jillix Maps application
 *
 * */
(function (window) {

    var Maps = window.Maps || {};
    window.Maps = Maps;

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
                }
              , "position.lng": {
                    type: "number"
                  , label: "Lng"
                }
              , visible: {
                    type: "boolean"
                  , label: "Visible"
                }
              , icon: {
                    type: "objectid"
                  , label: "Icon"
                }
              , infowin: {
                    type: "objectid"
                  , label: "Info Window"
                }
            }
        }
      , infowins: {
            options: {}
          , schema: {
                title: {
                    type: "string"
                  , label: "Title"
                }
              , content: {
                    type: "string"
                  , label: "Content"
                }
              , "pixelOffset.x": {
                    type: "number"
                  , label: "Offset X"
                }
              , "pixelOffset.y": {
                    type: "number"
                  , label: "Offset Y"
                }
            }
        }
      , icons: {
            options: {}
          , schema: {
                path: {
                    type: 'string'
                  , label: "Image"
                }
              , "size.w": {
                    type: 'number'
                  , label: "Width"
                }
              , "size.h": {
                    type: 'number'
                  , label: "Height"
                }
              , "origin.x": {
                    type: 'number'
                  , label: "Origin X"
                }
              , "origin.y": {
                    type: 'number'
                  , label: "Origin Y"
                }
              , "anchor.x": {
                    type: 'number'
                  , label: "Anchor X"
                }
              , "anchor.y": {
                    type: 'number'
                  , label: "Anchor Y"
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

        // read maps and render them
        M.miids.mono_maps.read({type: "map", query: {}}, function (err, data) {
            M.miids.maps_table.renderItemsFromResult(err, data)
        });

        // create map
        $(".btn.btn-create-map").on("click", function () {

            // load form
            M.miids.forms.loadForm ({ formId: "create_map" }, function (err, data) {

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
                }
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

            // read maps and render them
            M.miids.mono_maps.read({type: "map", query: {}}, function (err, data) {
                M.miids.maps_table.renderItemsFromResult(err, data)

                // show modal
                $("#modal").modal("hide");
            });
        });
    }
})(window);
