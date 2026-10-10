// ICT251 Activity 3 - Interactive features
// Author: Bwalya Musonda
// Date: 2026

console.log("script.js loaded successfully");

/* =========================
   D1 - CONTACT FORM VALIDATION + PREVIEW
   ========================= */

// Grab the form and its input elements once, so we can reuse them.
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");
const preview = document.getElementById("form-preview");

// Regex: a simple but reliable email pattern.
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Clear any error messages and reset field styles.
 */
function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    nameInput.classList.remove("invalid", "valid");
    emailInput.classList.remove("invalid", "valid");
    messageInput.classList.remove("invalid", "valid");
}

/**
 * Validate one field: returns true if valid, false if not.
 * Also writes an error message and applies a CSS class.
 */
function validateField(input, errorSpan, message) {
    if (message) {
        errorSpan.textContent = message;
        input.classList.add("invalid");
        input.classList.remove("valid");
        return false;
    }
    input.classList.remove("invalid");
    input.classList.add("valid");
    return true;
}

// Listen for the form submission.
form.addEventListener("submit", function (event) {
    event.preventDefault();   // keep submission local
    clearErrors();

    let isValid = true;

    // 1. NAME - not empty, not whitespace-only
    const nameValue = nameInput.value.trim();
    if (nameValue === "") {
        isValid = validateField(nameInput, nameError, "Please enter your name.") && isValid;
    } else {
        validateField(nameInput, nameError, "");
    }

    // 2. EMAIL - not empty, must match pattern
    const emailValue = emailInput.value.trim();
    if (emailValue === "") {
        isValid = validateField(emailInput, emailError, "Please enter your email.") && isValid;
    } else if (!emailPattern.test(emailValue)) {
        isValid = validateField(emailInput, emailError, "Please enter a valid email address.") && isValid;
    } else {
        validateField(emailInput, emailError, "");
    }

    // 3. MESSAGE - not empty, not whitespace-only
    const messageValue = messageInput.value.trim();
    if (messageValue === "") {
        isValid = validateField(messageInput, messageError, "Please enter a message.") && isValid;
    } else {
        validateField(messageInput, messageError, "");
    }

    // Show preview only if everything is valid.
    if (isValid) {
        // Use textContent for safety (prevents HTML injection).
        preview.innerHTML = "";

        const heading = document.createElement("h3");
        heading.textContent = "✅ Your data was validated successfully";
        preview.appendChild(heading);

        const note = document.createElement("p");
        note.textContent = "This is a browser demonstration only — no message was sent.";
        preview.appendChild(note);

        const namePara = document.createElement("p");
        namePara.textContent = "Name: " + nameValue;
        preview.appendChild(namePara);

        const emailPara = document.createElement("p");
        emailPara.textContent = "Email: " + emailValue;
        preview.appendChild(emailPara);

        const msgPara = document.createElement("p");
        msgPara.textContent = "Message: " + messageValue;
        preview.appendChild(msgPara);

        preview.classList.add("show");
    } else {
        preview.classList.remove("show");
        preview.innerHTML = "";
    }
});
/* =========================
   D2 - EXPANDABLE CONTENT
   ========================= */

// Find all the toggle buttons on the page.
const toggleButtons = document.querySelectorAll(".toggle-btn");

// For each button, listen for a click.
toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        // Get the id of the block this button controls.
        const targetId = button.getAttribute("data-target");
        const details = document.getElementById(targetId);

        // Toggle the hidden state.
        const isHidden = details.hasAttribute("hidden");

        if (isHidden) {
            details.removeAttribute("hidden");
            button.textContent = "Hide details";
            button.setAttribute("aria-expanded", "true");
        } else {
            details.setAttribute("hidden", "");
            button.textContent = "Show details";
            button.setAttribute("aria-expanded", "false");
        }
    });
});
/* =========================
   D3 - GALLERY VIEWER
   ========================= */

const galleryPhotos = [
    { src: "images/photo1.jpeg", caption: "My First Photo" },
    { src: "images/photo2.jpeg", caption: "My Second Photo" },
    { src: "images/photo3.jpeg", caption: "My Third Photo" }
];

let currentPhoto = 0;

const galleryImage = document.getElementById("gallery-image");
const galleryCaption = document.getElementById("gallery-caption");
const galleryCounter = document.getElementById("gallery-counter");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

/**
 * Display the photo at the given index and update UI.
 */
function showPhoto(index) {
    // Safety: make sure index is within bounds
    if (index < 0) index = 0;
    if (index > galleryPhotos.length - 1) index = galleryPhotos.length - 1;

    currentPhoto = index;

    const photo = galleryPhotos[index];
    galleryImage.src = photo.src;
    galleryImage.alt = photo.caption;
    galleryCaption.textContent = photo.caption;
    galleryCounter.textContent = (index + 1) + " / " + galleryPhotos.length;

    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === galleryPhotos.length - 1);
}

prevBtn.addEventListener("click", function () {
    showPhoto(currentPhoto - 1);
});

nextBtn.addEventListener("click", function () {
    showPhoto(currentPhoto + 1);
});

// START at first photo
showPhoto(0);

console.log("D3 initialized, current photo:", currentPhoto);
/* =========================
   D4 - STUDY HOURS CALCULATOR
   ========================= */

const calcBtn = document.getElementById("calc-btn");
const hoursInput = document.getElementById("hours-per-day");
const daysInput = document.getElementById("days-per-week");
const calcError = document.getElementById("calc-error");
const calcResult = document.getElementById("calc-result");

calcBtn.addEventListener("click", function () {
    // Clear any previous messages
    calcError.textContent = "";
    calcResult.textContent = "";

    // Read the raw values and remove spaces
    const hoursRaw = hoursInput.value.trim();
    const daysRaw = daysInput.value.trim();

    // 1. Must not be blank
    if (hoursRaw === "" || daysRaw === "") {
        calcError.textContent = "Please fill in both fields.";
        return;
    }

    const hours = Number(hoursRaw);
    const days = Number(daysRaw);

    // 2. Must be numbers
    if (isNaN(hours) || isNaN(days)) {
        calcError.textContent = "Please enter numbers only.";
        return;
    }

    // 3. Hours cannot be negative
    if (hours < 0) {
        calcError.textContent = "Hours per day cannot be negative.";
        return;
    }

    // 4. Days must be a whole number between 1 and 7
    if (!Number.isInteger(days) || days < 1 || days > 7) {
        calcError.textContent = "Days per week must be a whole number from 1 to 7.";
        return;
    }

    // 5. All valid — calculate total
    const total = hours * days;

    calcResult.textContent = "Total weekly study hours: " + total + " hours";
});