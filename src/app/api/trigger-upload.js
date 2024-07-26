import Cors from "cors";

// Initialize the cors middleware
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
  origin: [
    "https://leretroprojecteur.com",
    "https://leretroprojecteur-staging.fly.dev",
    "http://localhost:3000",
  ],
  credentials: true,
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req, res, fn, cb) {
  fn(req, res, (result) => {
    if (result instanceof Error) {
      return cb(result);
    }
    return cb(null, result);
  });
}

export default async function handler(req, res) {
  // Run the CORS middleware
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    try {
      const response = await fetch(
        "https://europe-west1-website-cine.cloudfunctions.net/trigger_upload_data_to_db",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error calling external API:", error);
      res.status(500).json({ error: "Error calling external API" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
