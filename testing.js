function updateInputFields() {
  let inputContainer = document.getElementById("inputContainer");
  let inputSelector = document.getElementById("inputSelector");
  let selectedValue = parseInt(inputSelector.value);

  // Clear existing input fields
  inputContainer.innerHTML = "";

  for (let i = 0; i < selectedValue; i++) {
    let inputDiv = document.createElement("div");
    inputDiv.classList.add("input-div");
    let inputNumber = document.createElement("span");
    inputNumber.classList.add("input-number");
    let numbering = i + 1;
    inputNumber.textContent = `${numbering}.`;
    let inputTag = document.createElement("input");
    inputTag.classList.add("meta-value");
    // console.log(inputTag);
    inputTag.type = "password";
    // inputTag.setAttribute("autocomplete", "off");
    let contentToggle;
    if (numbering > 9) {
      inputNumber.style.marginRight = "0";
    }

    if (inputTag.type == "password") {
      contentToggle = document.createElement("i");
      contentToggle.classList.add("fa-regular", "fa-eye-slash");
    } else {
      contentToggle = document.createElement("i");
      contentToggle.classList.add("fa-solid", "fa-eye");
    }
    contentToggle.addEventListener("click", function () {
      if (inputTag.type === "password") {
        inputTag.type = "text";
        contentToggle.classList.remove("fa-regular", "fa-eye-slash");
        contentToggle.classList.add("fa-solid", "fa-eye");
      } else {
        inputTag.type = "password";
        contentToggle.classList.remove("fa-solid", "fa-eye");
        contentToggle.classList.add("fa-regular", "fa-eye-slash");
      }
    });
    inputDiv.appendChild(inputNumber);
    inputDiv.appendChild(inputTag);
    inputDiv.appendChild(contentToggle);
    inputContainer.appendChild(inputDiv);
  }
}

updateInputFields();

// var button = document.getElementById("myButton");
// button.addEventListener("click", function () {
//   alert("working");
// });
let submitButton = document.getElementById("myButton");
let metaData = document.querySelectorAll(".meta-value");

function validateInputs() {
  let enableButton = true;

  for (let i = 0; i < metaData.length; i++) {
    if (metaData[i].value === "") {
      enableButton = false;
      break; // Stop checking once an empty field is found
    }
  }

  if (enableButton) {
    submitButton.style.opacity = "1";
    submitButton.style.cursor = "pointer";
    submitButton.disabled = !enableButton;
  } else {
    submitButton.style.opacity = "0.5";
    submitButton.style.cursor = "not-allowed";
    submitButton.disabled = !enableButton;
  }
}

// Attach the validateInputs function to appropriate events
for (let i = 0; i < metaData.length; i++) {
  metaData[i].addEventListener("keyup", validateInputs);
}

// Call validateInputs initially to set the initial state
validateInputs();
