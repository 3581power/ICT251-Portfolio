# ICT251 Activity 3 — Interactive Personal Portfolio

**Author:** Bwalya Musonda  
**Student Number:** 202503581  
**Course:** ICT251 Web Technologies — Mulungushi University  
**Live Site:** *(update after Render deployment)*  
**GitHub Repository:** https://github.com/3581power/ICT251-Portfolio

---

## About the Website

A responsive, interactive personal portfolio built with **HTML5**, **external CSS**, and **vanilla JavaScript**. The site contains the following sections:

- About Me
- My Hobbies
- My Learning Plan (with a study hours calculator)
- Projects & Skills
- My Photos (with a gallery viewer)
- My Media (video + audio from Activity 2)
- Contact (with a validated form)
- Web Development Resources

The site is fully static (no build step, no server) and is deployed on **Render**.

---

## JavaScript Features

### 1. Contact Form Validation + Preview (Compulsory)
- Validates **name**, **email**, and **message** on submit.
- Rejects whitespace-only names and messages, and invalid email formats.
- Shows inline error messages next to each field.
- Displays a local preview of the entered data — **no data is sent**.
- Uses `event.preventDefault()` to keep submission local.
- Uses `textContent` to safely insert user input.

### 2. Expandable Content
- Each project card has a **"Show details" / "Hide details"** toggle button.
- Uses the HTML `hidden` attribute and `aria-expanded` for accessibility.

### 3. Gallery Viewer
- **Previous** and **Next** buttons cycle through three photos.
- A counter shows the current position (e.g. `2 / 3`).
- The **Previous** button is disabled on the first photo.
- The **Next** button is disabled on the last photo.

### 4. Study Hours Calculator
- Accepts **hours per day** and **days per week**.
- Rejects blank fields, non-numbers, negative hours, and days outside 1–7.
- Displays the **total weekly hours** on the page.

---

## How to Test

| Feature | Action | Expected Result |
|---------|--------|-----------------|
| Contact form | Submit the empty form | Three red inline errors appear |
| Contact form | Enter spaces-only name | "Please enter your name." |
| Contact form | Enter invalid email | "Please enter a valid email address." |
| Contact form | Fill in valid data | Green preview panel appears below the form |
| Expandable content | Click "Show details" on a project | Details open; button text becomes "Hide details" |
| Gallery | Click "Next" three times | Counter reaches `3 / 3`; Next button greys out |
| Gallery | Click "Previous" at photo 1 | Button is disabled, no change |
| Calculator | Enter 2 hours × 5 days | "Total weekly study hours: 10 hours" |
| Calculator | Enter days = 10 | Error about days range (1–7) |
| Keyboard | Tab through the page | Every link, button and input shows a visible focus ring |
| Responsive | Resize to 375 px | No horizontal scroll; nav stacks vertically |

---

## File Structure