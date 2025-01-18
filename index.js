const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

function findFirstUniqueChar(str) {
  const charFrequency = {};

  for (let char of str) {
    charFrequency[char] = (charFrequency[char] || 0) + 1;
  }

  for (let i = 0; i < str.length; i++) {
    if (charFrequency[str[i]] === 1) {
      return { char: str[i], index: i };
    }
  }

  return { char: null, index: -1 };
}

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.get("/", (req,res) => {
  return res.send("Welcome to home page")
})
app.post("/first-unique-character", (req, res) => {
  try {
    const { text_to_process } = req.body;

    if (!text_to_process || typeof text_to_process !== "string") {
      return res.status(400).json({
        error: "Invalid input ",
      });
    }

    console.log(
      `[${new Date().toISOString()}] Endpoint /first-unique-character called with input: ${text_to_process}`
    );

    const result = findFirstUniqueChar(text_to_process);

    res.json({
      first_unique_char: result.char,
      first_unique_char_index: result.index,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({error: "Internal server error."})
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
