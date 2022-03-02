"use strict";

// select elements
const imageFileInput = document.querySelector("#imageFileInput");
// console.log(imageFileInput);
const topTextInput = document.querySelector("#topTextInput");
// console.log(topTextInput);
const bottomTextInput = document.querySelector("#bottomTextInput");
// console.log(bottomTextInput.value);
const canvas = document.querySelector("#meme");
// console.log(canvas);

// img
let image;

// coosing image
imageFileInput.addEventListener("change", () => {
  const imageDataUrl = URL.createObjectURL(imageFileInput.files[0]);

  image = new Image();
  image.src = imageDataUrl;

  image.addEventListener(
    "load",
    () => {
      updateMemeCanvas(
        canvas,
        image,
        topTextInput.value,
        bottomTextInput.value
      );
    },
    { once: true }
  );
});

// rpdating changes
topTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

bottomTextInput.addEventListener("change", () => {
  updateMemeCanvas(canvas, image, topTextInput.value, bottomTextInput.value);
});

// render meme
function updateMemeCanvas(canvas, image, topText, bottomText) {
  const ctx = canvas.getContext("2d");
  const width = image.width;
  const height = image.height;
  const fontSize = Math.floor(width / 15);
  const yOffset = height / 10;

  //   update canvas background
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);

  //   prepare text
  ctx.strokeStyle = "black";
  ctx.lineWidth = Math.floor(fontSize / 4);
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.font = `${fontSize}px sans-serif`;

  // add top text
  ctx.textBaseLine = "alphabetic";
  ctx.strokeText(topText, width / 2, 65);
  ctx.fillText(topText, width / 2, 65);

  // add bottom text
  ctx.textBaseLine = "hanging";
  ctx.strokeText(bottomText, width / 2, height - yOffset);
  ctx.fillText(bottomText, width / 2, height - yOffset);
}
