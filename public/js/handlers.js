/*
 *  Custom handlers for Jillix Maps application
 *
 * */
(function (window) {

    var Maps = window.Maps || {};
    window.Maps = Maps;

    /**
     *  This function computes the embed link
     *
     * */
    Maps.computeEmbedLink = function (module, data) {
        return "<a target='_blank' href='/embed?mapId=" + data._id + "'>Open Map</a>";
    };

    var Data = {};

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
                    Data[cType] = data;
                });
            })(types[i]);
        }
    }

    /**
     *  This function updates the <select> elements
     *
     * */
    function updateLinkedFields (formId) {
        switch (formId) {
            case "map":

                var $markers = []

                // create icons
                for (var i = 0; i < Data.marker.length; ++i) {
                    var cMarker = Data.marker[i];
                    $markers.push (
                        $("<option>", {
                            value: cMarker._id
                          , html: cMarker.label || cMarker._id
                        })
                    );
                }

                // refresh markers
                $("#forms [data-field='markers']").empty().append($markers);
                break;
            case "marker":

                // icons and infowindows options
                var $selectOneOption = $("<option>", {
                        value: ""
                      , html: "Choose an option"
                    })
                  , $icons = [$selectOneOption.clone()]
                  , $infoWins = [$selectOneOption.clone()]
                  ;

                // create icons
                for (var i = 0; i < Data.icon.length; ++i) {
                    var cIcon = Data.icon[i];
                    $icons.push (
                        $("<option>", {
                            value: cIcon._id
                          , html: cIcon.label || cIcon._id
                        })
                    );
                }

                // create infowindows
                for (var i = 0; i < Data.infowin.length; ++i) {
                    var cInfoWin = Data.infowin[i];
                    $infoWins.push (
                        $("<option>", {
                            value: cInfoWin._id
                          , html: cInfoWin.label || cInfoWin._id
                        })
                    );
                }

                // append icons and infowindows
                $("#forms [data-field='icon']").empty().append($icons);
                $("#forms [data-field='infowin']").empty().append($infoWins);
                break;
            case "icon":
                $("#forms [data-field='path']").imageUpload({
                    formAction:        "/@/uploadImageEmitter/emit"
                  , inputFileName:     "inputImage"
                  , browseButtonClass: "ml-xs btn btn-xs btn-success"
                  , browseButtonValue: '<i class="fa fa-upload"></i>'
                  , deleteButtonClass: "ml-xs btn btn-xs btn-danger btn-delete-image"
                  , deleteButtonValue: '<i class="fa fa-times"></i>'
                  , automaticUpload:   true
                  , hideDeleteButton:  true
                }).on("imageChanged", function () {
                    console.log("Changed the src");
                });
                break;
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
              , "embedLink": {
                    type: "string"
                  , label: "Embed Link"
                  , order: 6
                  , nosort: true
                  , filter: "Maps.computeEmbedLink"
                }
            }
        }
      , markers: {
            options: {}
          , schema: {
                label: {
                    type: "string"
                  , label: "Label"
                  , order: -1
                  , nosort: true
                }
              , title: {
                    type: "string"
                  , label: "Title"
                  , order: 0
                  , nosort: true
                }
              , "position.lat": {
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
                label: {
                    type: "string"
                  , label: "Label"
                  , order: 0
                  , nosort: true
                }
              , content: {
                    type: "string"
                  , label: "Content"
                  , order: 2
                  , nosort: true
                }
            }
        }
      , icons: {
            options: {}
          , schema: {
                label: {
                    type: "string"
                  , label: "Label"
                  , order: 0
                  , nosort: true
                }
              , path: {
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

        // load jQuery dependents
        $.getScript ("//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js");
        $.getScript ("/js/lib/jQuery-image-upload.js");

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

            // get the form id
            var formId = $(this).attr("data-form");

            // load form
            M.miids.forms.loadForm ({ formId: formId }, function (err, data) {

                // handle error
                if (err) {
                    return console.error (err);
                }

                updateLinkedFields (formId);

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

        // create or update object
        var cuObject = {
            type: formObj.formType
        };
        delete formObj.formType;

        var method = null;

        // we have an update operation
        if (formObj._id) {

            // build the query
            cuObject.query = {
                _id: formObj._id
            };

            // delete the id
            delete formObj._id;

            // set data
            cuObject.data = {
                $set: formObj
            };

            // set method value
            method = "update";
        } else {
            // delete the id
            delete formObj._id;

            // set data
            cuObject.data = formObj;

            // set method value
            method = "create";
        }

        // create maps, markers, infowindows, icon
        M.miids.mono_maps[method](cuObject, function (err, data) {

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

    /**
     *  Edit documents in tables
     *
     * */
    Maps.edit = function (formId) {

        // load form
        M.miids.forms.loadForm ({ formId: formId }, function (err, data) {

            // handle error
            if (err) {
                // fill form
                M.miids.forms.showError (err);
            }

            updateLinkedFields (formId);

            // fill form
            M.miids.forms.fillForm (
                M.miids[formId + "s_table"].getSelected(true)[0]
            );

            // show modal
            $("#modal").modal("show");
        });
    };
})(window);
