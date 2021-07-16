module.exports = {
    //https://pm2.keymetrics.io/docs/usage/application-declaration/
    apps : [{
        name            : "INFI_BACK",
        script          : "./app.js",
        watch           : true,
        ignore_watch    : ["./node_modules"],
        env_production  : {
            NODE_ENV: "production"
        }
    }]
}