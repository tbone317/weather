console.log(`clientside js file is logged! this is where the magic happens`);

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const msg1 = document.querySelector("#message-1");
const msg2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  msg1.textContent = "loading...";
  msg2.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msg1.textContent = data.error;
        } else {
          msg1.textContent = data.location;
        }
      });
    }
  );
});

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });
