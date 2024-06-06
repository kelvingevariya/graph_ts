import axios from "axios";

const botUrl = "https://api.recall.ai/api/v1/bot/";

//Recall Ai API is bot service provided by API endpoints

export function createAndSendBot() {
  const body = {
    meeting_url:
      "https://teams.live.com/meet/9582249354430?p=q5lgLhsM2Esn5aJBj3",
    bot_name: "TestBot",
  };
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      Authorization: `Token cd444749ea8d51e2951497330662ad51ec9c6d24`,
    },
    body: JSON.stringify(body),
  };
  try {
    fetch(botUrl, options)
      .then((res) => {
        console.log(res);
        return res;
      })

      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  } catch (error) {}

  return;
}

try {
  createAndSendBot();
} catch (error) {
  console.log(JSON.stringify(error));
}
