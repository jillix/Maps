var Application = require("../application");

/**
 * Init crud
 *
 */
setTimeout(function () {

    // get module field
    var module = Application.miids.crud.module;

    // dev version?
    if (module.substring(module.lastIndexOf("/") + 1) === "dev") {
        module += "_" + M.config.app.id;
    }

    // require that file to initialize the server events
    require(M.app.getPath() + "/mono_modules/" +  module + "/operations");

}, 3000);
