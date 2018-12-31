function playSound(event) {
  const audio = document.querySelector(
    `audio[data-key="${getDataAttribute(event)}"]`
  );
  const key = document.querySelector(
    `div[data-key="${getDataAttribute(event)}"]`
  );

  function getDataAttribute(event) {
    if (event.type === "keydown") {
      // if event is "keydown", get the keyCode pressed
      return event.keyCode;
      // else if the event is "click" and is within the class "key",
      //get the dataset.key from the class "key" that was clicked on
    } else if (event.type === "click" && event.target.closest(".key")) {
      return event.target.closest(".key").dataset.key;
    }
  }

  if (
    // if key pressed does not have audio element XOR element clicked on does not have class of "key"
    (event.type === "keydown" && !audio) ||
    (event.type === "click" && !event.target.closest(".key"))
  ) {
    return;
  }
  //reset audio for multiple presses/clicks
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");
}

function removeTransition(event) {
  if (event.propertyName !== "transform") return;
  this.classList.remove("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => {
  key.addEventListener("transitionend", removeTransition, false);
});
document.addEventListener("keydown", playSound, false);
document.addEventListener("click", playSound, false);
