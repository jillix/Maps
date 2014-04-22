// dependencies
var Jipics  = require ("jipics");

/*
 *  This handles the image upload requests
 *
 * */
M.on("imageUpload", function (link) {

    debugger;
    // some validations
    if (!link.files || !link.files.inputImage || !link.files.inputImage.size) {
        return link.send(400, { error: "Invalid image upload" });
    }

    // get the image from the request
    var image = link.files.inputImage

        // get the application absolute path
      , appPath = M.app.getPath() + "/"

        // get the absolute path to the uploaded image
      , absoluteImagePath = appPath + image.path
      ;

    Jipics.upload ({
        path: absoluteImagePath
      , deleteAfterUpload: true
    }, function (err, data) {

        // handle error
        if (err) {
            return link.send (400, err);
        }

        // no image uploaded
        if (!data || !data.length) {
            return link.send (400, "No image uploaded.");
        }

        // send the url
        link.send (200, "http://jipics.net/?src=" + data[0]);
    });
});
