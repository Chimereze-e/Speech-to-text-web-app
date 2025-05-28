document.addEventListener("DOMContentLoaded", function () {
    const textOutput = document.getElementById("text-output");
    const startBtn = document.getElementById("start-btn");
    const stopBtn = document.getElementById("stop-btn");

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!window.SpeechRecognition) {
        alert("Your browser does not support Speech-to-Text. Try using Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; 
    recognition.interimResults = true; 
    recognition.lang = "en-US"; 

    
    startBtn.addEventListener("click", function () {
        recognition.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    });

    
    stopBtn.addEventListener("click", function () {
        recognition.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    });
 
    recognition.onresult = function (event) {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        textOutput.value = transcript;
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
        alert("Speech recognition error: " + event.error);
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    recognition.onend = function () {
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };
});
