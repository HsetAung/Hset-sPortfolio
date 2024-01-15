const username = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const submit = document.querySelector(".form-contact");

document.addEventListener("DOMContentLoaded", function () {
  var typed = new Typed(".animate", {
    strings: [
      "HELLO...",
      "I'M HSET AUNG",
      "I'M A <span class='red-text'>WEB</span> DEVELOPER",
      "I'M VERY <span class='green-text'> HARD</span> WORKER",
      "HSET AUNG",
    ],
    typeSpeed: 100,
    backSpeed: 100,
    backSplice: true,
    backDelay: 1500,
    loop: true,
  });

  const interval = 3000; // 3000 milliseconds (4 seconds)
  const paragraphs = document.querySelectorAll(".each");
  let currentSlide = 0;

  function showSlide(index) {
    paragraphs.forEach((p, i) => {
      if (i === index) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });
  }

  function slideNext() {
    currentSlide = (currentSlide + 1) % paragraphs.length;
    showSlide(currentSlide);
  }

  setInterval(slideNext, interval);

  // Typed animation initialization
  paragraphs.forEach((p, i) => {
    p.addEventListener("animationend", function () {
      // After animation ends, remove the active class from the current slide
      p.classList.remove("active");
      // Show the next slide after a short delay
      setTimeout(slideNext, 500);
    });
  });

  // Trigger the initial animation
  slideNext();

  submit.addEventListener("submit", function (e) {
    e.preventDefault();

    let ebody = `
        <b>Name:</b>${username.value}
        <br>
        <b>Email:</b>${email.value}
        <br>
        <b>Subject:</b>${subject.value}
        <br>
        `;

    Email.send({
      SecureToken: "ae34b045-e467-4ffa-a50e-7fbf8f7cb54a",
      To: "yourhset@gmail.com",
      From: "yourhset@gmail.com",
      Subject: "email from" + email.value,

      Body: ebody,
    }).then((message) => alert('Message Sent Successfully'));

    // Clear input values after displaying alert
    username.value = "";
    email.value = "";
    subject.value = "";
  });
});
