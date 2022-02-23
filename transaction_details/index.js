function fetchTransactionDetails() {
  fetch("http://localhost:8084/transaction/13", {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      
      const html = Object.keys(data)
        .map((key) => {
          const modifiedKey = key.replace(/([A-Z])/g, " $1");
          const camelCaseToTitleCase =
            modifiedKey.charAt(0).toUpperCase() + modifiedKey.slice(1);

          return `<div class='detail-container'>
          <p class='detail-label'>${camelCaseToTitleCase}: </p>
          <p class='detail-value'>${
            key == "transactionTime"
              ? new Date(data[key]).toLocaleString("en-US")
              : data[key]
          }</p>
          </div>`;
        })
        .join("");
      document.querySelector("#app").insertAdjacentHTML("afterbegin", html);
    });
}
fetchTransactionDetails();