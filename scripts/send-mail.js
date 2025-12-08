const submitMessage = () => {
  fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${MJ_APIKEY_PUBLIC}:${MJ_APIKEY_PRIVATE}`),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        console.error("API request failed with status:", response.status);
      }
      return response.json();
    })
    .then((result) => {
      console.log("Success:", result);
      if (result.Messages && result.Messages[0].Status === "success") {
        console.log("Email sent successfully!");
      }
    })
    .catch((error) => {
      console.error("Error during fetch operation:", error);
    });
};
