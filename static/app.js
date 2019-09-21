const numberInput = document.getElementById("number");
const textInput = document.getElementById("msg");
const button = document.querySelector("button");

button.addEventListener("click", send, false);

function send() {
  const number = numberInput.value.replace(/\D/g, "");
  const msg = textInput.value;

  fetch("/send", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ number: number, msg: msg })
  })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
}
