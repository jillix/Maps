(function (window) {

    // create the namespace
    var Maps = {embed: {}};

    /**
     *  Embed layout is ready
     *
     * */
    Maps.embed.ready = function () {

        var mapId = queryString ("mapId")
          , $map  = $(".map")
          , $debugPre = $("pre.debug")
          ;

        // no map id
        if (!mapId) {
            $map.hide();
            $debugPre.text("Missing mapId.");
        }

        M.miids.mono_maps.embed ({mapId: mapId}, function (err, data) {
            $debugPre.text(err || JSON.stringify (data, null, 4));
        });
    };

    /**
     *  Util query string function
     *  Thanks: http://stackoverflow.com/a/901144/1420197
     *
     * */
    function queryString (name) {
        // return Url.queryString(name);
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    // set the namespace
    window.Maps = Maps;
})(window);
