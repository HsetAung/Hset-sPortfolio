document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed('.animate', {
        strings: ["HELLO...",
            "I'M HSET AUNG",
            "I'M A <span class='red-text'>WEB</span> DEVELOPER",
            "I'M VERY <span class='green-text'> HARD</span> WORKER",
            "HSET AUNG"
        ],
        typeSpeed: 100,
        backSpeed: 100,
        backSplice: true,
        backDelay: 1500,
        loop: true
    });

    const interval = 3000; // 3000 milliseconds (4 seconds)
    const paragraphs = document.querySelectorAll('.each');
    let currentSlide = 0;

    function showSlide(index) {
        paragraphs.forEach((p, i) => {
            if (i === index) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
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
        p.addEventListener('animationend', function () {
            // After animation ends, remove the active class from the current slide
            p.classList.remove('active');
            // Show the next slide after a short delay
            setTimeout(slideNext, 500);
        });
    });

    // Trigger the initial animation
    slideNext();

    // Change background color when .send is clicked
    const sendButton = document.querySelector('.send');
    sendButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent form submission

        sendButton.style.backgroundColor = 'gray';

        // Reset background color after a delay (adjust as needed)
        setTimeout(function () {
            sendButton.style.backgroundColor = 'lightgray';
        }, 500); // 1000 milliseconds (1 second)

        // Send email
        sendEmail();
    });

    function sendEmail() {
        Email.send({
            SecureToken : "98585481-d4dc-4f90-9341-e2ea4865e4eb",
            To : 'mrhsetaung@gmail.com',
            From :'sattaung.bk19@gamil.com',
            Subject :"New Contact Form Inquiry",
            Body : "And this is the body"
        }).then(
          message => alert(message)
        );

    }
});
