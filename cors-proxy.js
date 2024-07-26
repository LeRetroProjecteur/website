const cors_proxy = require("cors-anywhere");

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;

cors_proxy
  .createServer({
    originWhitelist: [
      "https://leretroprojecteur.com",
      "https://leretroprojecteur-staging.fly.dev",
      "http://localhost:3000",
      "http://localhost:3001",
      "https://deploy-preview-335--leretroprojecteur.netlify.app",
    ],
    requireHeader: ["origin", "x-requested-with"],
    removeHeaders: ["cookie", "cookie2"],
    // Set custom headers
    setHeaders: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept",
    },
  })
  .listen(port, host, function () {
    console.log("Running CORS Anywhere on " + host + ":" + port);
  });
