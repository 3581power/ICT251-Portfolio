// ============ GALLERY FADE ============
var galleryImg = document.getElementById("gallery-image");
var galleryCap = document.getElementById("gallery-caption");
var counterEl  = document.getElementById("gallery-counter");
var prevBtn    = document.getElementById("prev-btn");
var nextBtn    = document.getElementById("next-btn");

var myImages = [
    "images/photo1.jpeg",
    "images/photo2.jpeg",
    "images/photo3.jpeg"
];
var myCaptions = [
    "My First Photo",
    "My Second Photo",
    "My Third Photo"
];

var idx = 0;
var busy = false;

function showImage(newIdx) {
    if (busy) return;
    busy = true;

    galleryImg.classList.add("hidden");

    setTimeout(function () {
        idx = newIdx;
        if (idx < 0) idx = myImages.length - 1;
        if (idx >= myImages.length) idx = 0;

        galleryImg.src = myImages[idx];
        galleryCap.textContent = myCaptions[idx];
        counterEl.textContent = (idx + 1) + " / " + myImages.length;

        galleryImg.classList.remove("hidden");
        busy = false;
    }, 800);
}

nextBtn.addEventListener("click", function () { showImage(idx + 1); });
prevBtn.addEventListener("click", function () { showImage(idx - 1); });

// ============ CALCULATOR ============
var calcBtn    = document.getElementById("calc-btn");
var hoursInput = document.getElementById("hours-per-day");
var daysInput  = document.getElementById("days-per-week");
var resultBox  = document.getElementById("calc-result");

calcBtn.addEventListener("click", function () {
    var h = parseFloat(hoursInput.value);
    var d = parseFloat(daysInput.value);

    if (isNaN(h) || isNaN(d) || h < 0 || d < 1 || d > 7) {
        resultBox.textContent = "Please enter valid numbers (Days: 1-7).";
        resultBox.style.backgroundColor = "#ff6b6b";
        resultBox.style.color = "#1f1f1f";
        resultBox.classList.add("show");
        return;
    }

    var total = h * d;
    resultBox.textContent = "Total Study Hours Per Week: " + total + " hours";
    resultBox.style.backgroundColor = "#6ab0ff";
    resultBox.style.color = "#1f1f1f";
    resultBox.classList.add("show");
});

// ============ PROJECT TOGGLE BUTTONS ============
var toggleBtns = document.querySelectorAll(".toggle-btn");
toggleBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-target");
        var targetDiv = document.getElementById(targetId);
        var expanded = btn.getAttribute("aria-expanded") === "true";

        if (expanded) {
            targetDiv.hidden = true;
            btn.textContent = "Show details";
            btn.setAttribute("aria-expanded", "false");
        } else {
            targetDiv.hidden = false;
            btn.textContent = "Hide details";
            btn.setAttribute("aria-expanded", "true");
        }
    });
});

// ============ CONTACT FORM ============
var contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        var isValid = true;
        var nameError = document.getElementById("name-error");
        var emailError = document.getElementById("email-error");
        var messageError = document.getElementById("message-error");

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";

        if (document.getElementById("name").value.trim() === "") {
            nameError.textContent = "Name is required.";
            isValid = false;
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(document.getElementById("email").value.trim())) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (document.getElementById("message").value.trim() === "") {
            messageError.textContent = "Message is required.";
            isValid = false;
        }

        if (isValid) {
            document.getElementById("form-preview").textContent = "Form submitted successfully! (Demo only)";
            contactForm.reset();
        }
    });
}