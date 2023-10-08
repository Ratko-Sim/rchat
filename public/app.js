const socket = new io("ws://localhost:3500");

const activity = document.querySelector("#activity");
const msgInput = document.querySelector("#message");

function sendMessage(message) {
  message.preventDefault();
  if (msgInput.value) {
    socket.emit("message", msgInput.value);
    msgInput.value = "";
  }
  msgInput.focus();
}

document.querySelector("#message-form").addEventListener("submit", sendMessage);

socket.on("message", (data) => {
  activity.textContent = "";
  const li = document.createElement("li");
  li.textContent = data;
  document.querySelector("#message-container").appendChild(li);
});

msgInput.addEventListener("keypress", (e) => {
  socket.emit("activity", `${socket.id.substring(0, 5)} is typing...`);
});

socket.on("activity", (name) => {
  activity.textContent = name;
  setTimeout(() => {
    activity.textContent = "";
  }, 1000);
});