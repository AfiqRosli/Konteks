// Lelaki atu jogging di luar
// ---------
// The man is jogging outside - 100%
// The person is jogging outside - 90%
// He is joggin outside - 80%
// Jogging outside - 50%

$(document).ready(function () {
    var probability = $('#probability');
    var audio = document.getElementById('voice');
    var guess = {
        the_or_that: false,
        man: false,
        is: false,
        jogging: false,
        outside: false,
    };
    
    // The man is joggin outside
    $('#js-input-guess').on('keydown', function (e) {
        var correctness = Object.values(guess)

        if ($(this).val().toLowerCase().includes("the") || $(this).val().toLowerCase().includes("that")) {
            guess.the_or_that = true
        } else {
            guess.the_or_that = false
        }

        if ($(this).val().toLowerCase().includes("man")) {
            guess.man = true
        } else {
            guess.man = false
        }

        if ($(this).val().toLowerCase().includes("is")) {
            guess.is = true
        } else {
            guess.is = false
        }

        if ($(this).val().toLowerCase().includes("jogging")) {
            guess.jogging = true
        } else {
            guess.jogging = false
        }

        if ($(this).val().toLowerCase().includes("outside")) {
            guess.outside = true
        } else {
            guess.outside = false
        }

        var counts = {};
        correctness.forEach(function (x) {
            counts[x] = (counts[x] || 0) + 1;
        });

        console.log(counts.false)
        console.log(correctness)

        if (counts.true > 0) {
            probability.text(((counts.true / 5) * 100) + '%')
        } else {
            probability.text('0%')
        }
    })
});

function emphasize(audio) {
    var interval = setInterval(function () {
        var context = document.getElementById('context')
        var description = document.getElementById('description')

        if (audio.currentTime > 1) {
            console.log(audio.currentTime);
            context.src = "guess/man.jpg"
            description.innerHTML = "<b>Lelaki</b> atu jogging di luar"
        }

        // 2.9 jog
        if (audio.currentTime > 2.3) {
            context.src = "guess/jog.jpg"
            description.innerHTML = "Lelaki atu <b>jogging</b> di luar"
        }

        // 4.5 outside
        if (audio.currentTime > 3.1) {
            context.src = "guess/outside.jpg"
            description.innerHTML = "Lelaki atu jogging di <b>luar</b>"
        }

        if (audio.ended) {
            clearInterval(interval);
            var control = document.getElementById('control');
            control.innerText = "Play"
        }
    }, 50)
}

function play() {
    var audio = document.getElementById("voice");
    var control = document.getElementById('control');
    emphasize(audio)

    if (audio.paused) {
        audio.play();
        control.innerText = "Pause"
    } else {
        audio.pause();
        control.innerText = "Play"
    }
}