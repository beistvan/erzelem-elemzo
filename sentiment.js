const sentence = document.getElementById("sentence");
const sendButton = document.querySelector(".send-button");
const result = document.querySelector(".result");

const API_KEY = "API_KEY_HERE";

const API_URL =
  "https://api.openai.com/v1/engines/text-davinci-003/completions";
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${API_KEY}`,
};

async function analyzeEmotion(sentence) {
  try {
    const prompt = `What is the primary emotion expressed in the following text: "${sentence}"?`;
    const response = await axios.post(
      API_URL,
      {
        prompt,
        max_tokens: 5,
        temperature: 0.5,
        top_p: 1,
        n: 1,
      },
      { headers }
    );

    const emotion = response.data.choices[0].text.trim();
    result.value = emotion;
  } catch (error) {
    console.log("Error:", error.response);
  }
}

sendButton.addEventListener("click", () => {
  if (!sentence) return;
  analyzeEmotion(sentence.value);
});