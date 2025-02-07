document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const songSelector = document.getElementById("songSelector");
    const volumeSlider = document.getElementById("volumeSlider");

    // Saved volume and song from localStorage
    const savedVolume = localStorage.getItem("volume");
    const savedSong = localStorage.getItem("selectedSong");

    const songs = [
        "music/daylight-piano-music-292993.mp3",
        "music/no-copyright-music-emotional-piano-296804.mp3",
        "music/emotional-piano-music-dramatic-296400.mp3"
    ];

    let currentSongIndex = 0;

    function loadAndPlaySong(index) {
        audio.src = songs[index];
        audio.play();
        playPauseBtn.textContent = "▐▐"
    }

    if (savedVolume !== null) {
        audio.volume = parseFloat(savedVolume);
        volumeSlider.value = savedVolume;
    } else {
        audio.volume = 0.9; // Default volume
        volumeSlider.value = 0.9;
    }

    if (savedSong !== null) {
        currentSongIndex = savedSong;
        songSelector.selectedIndex = savedSong;
    } else {
        // Using default from the selector value if nothing is saved
        currentSongIndex = songSelector.value;
    }

    // Play music automatically when the page loads up
    audio.volume = 0.9; // Default volume
    audio.play().catch(err => console.log("Autoplay blocked by browser"));

    // Play/Pause button
    playPauseBtn.addEventListener("click", function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "▐▐"; // Change to pause icon
        } else {
            audio.pause();
            playPauseBtn.textContent = "▶"; // Change to play icon
        }
    });

    // Change song when user selects a new one
    songSelector.addEventListener("change", function () {
        currentSongIndex = songSelector.selectedIndex;
        loadAndPlaySong(currentSongIndex)
        playPauseBtn.textContent = "▐▐"; //Ensure the play icon updates
    });

    // Adjust volume
    volumeSlider.addEventListener("input", function () {
        audio.volume = volumeSlider.value;
        localStorage.setItem("volume", volumeSlider.value);
    });

    audio.addEventListener('ended', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadAndPlaySong(currentSongIndex);
    });

    loadAndPlaySong(currentSongIndex)
});