// Lelaki atu jogging di luar
// ---------
// The man is jogging outside - 100%
// The person is jogging outside - 90%
// He is joggin outside - 80%
// Jogging outside - 50%

$(document).ready(function () {
    var probability = $('#probability');
    var audio = document.getElementById('voice');
    var score = 0;

    // The man is joggin outside
    $('#js-input-guess').on('keypress', function (e) {
        console.log(audio)
        if (e.which == 13) {
            if ($(this).val().toLowerCase().includes("the")) {
                score++;
            }

            if ($(this).val().toLowerCase().includes("man")) {
                score++;
            }

            if ($(this).val().toLowerCase().includes("is")) {
                score++;
            }

            if ($(this).val().toLowerCase().includes("jogging")) {
                score++;
            }

            if ($(this).val().toLowerCase().includes("outside")) {
                score++;
            }

            probability.text(((score / 5) * 100) + '%')
            score = 0;
        }
    })
});

function emphasize(audio) {
    var interval = setInterval(function () {
        var context = document.getElementById('context')
        var description = document.getElementById('description')

        if (audio.currentTime > 0) {
            // console.log(audio.currentTime);
            context.src = "guess/man.jpg"
            description.innerHTML = "<b>Lelaki</b> atu jogging di luar"
        }
        
        // 2.9 jog
        if (audio.currentTime > 2.9) {
            context.src = "guess/jog.jpg"
            description.innerHTML = "Lelaki atu <b>jogging</b> di luar"
        }

        // 4.5 outside
        if (audio.currentTime > 4.5) {
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