/**
 *  This function represents the custom code of the login providers module
 *  This will callback the session data that must be set
 *
 */
exports.login = function (link, userData, callback) {

    // create the crud role
    var crudRole = "5290e568e5519a4c3f000009";

    // callback
    callback(null, "user_" + Math.random().toString(36), "*", {
        login: userData.username
      , email: userData.email
      , fullname: userData.fullname
      , crudRole: crudRole
      , provider: "github"
    });
}
