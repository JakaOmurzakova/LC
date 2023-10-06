const express = require("express");
const cors = require("cors"); // Import the 'cors' package

const app = express();
const port = 8443;

// Allow requests from your React app running on http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));

// ... Rest of your server code ...

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
