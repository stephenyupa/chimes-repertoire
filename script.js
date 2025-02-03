const songs = [
    { title: "Anytime", starting_note: "G4" },
    { title: "Caroline", starting_note: "C4" },
    { title: "Dear Hearts", starting_note: "Ab4" },
    { title: "Don't Blame Me", starting_note: "D4" },
    { title: "Don't Tell Me", starting_note: "F4" },
    { title: "First Hello", starting_note: "C#4" },
    { title: "Gold", starting_note: "D4" },
    { title: "Good Day", starting_note: "F4" },
    { title: "Imagination", starting_note: "F4" },
    { title: "I'm Gonna Sit Right Down", starting_note: "C4" },
    { title: "In the Heart of the City", starting_note: "D4" },
    { title: "Lida Rose / Till There Was You", starting_note: "E4" },
    { title: "Little Girl", starting_note: "Eb4" },
    { title: "Moving Picture Ball", starting_note: "Bb4" },
    { title: "So Long Dearie", starting_note: "Ab4" },
    { title: "Ten Feet", starting_note: "E4" },
    { title: "That Old Quartet", starting_note: "G4" },
    { title: "What'll I Do", starting_note: "A4" },
    { title: "Who Told You", starting_note: "D4" }
];

function playNote(note) {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease(note, "1s");
}

function displaySongs() {
    const list = document.getElementById("songList");
    const dropdown = document.getElementById("nowListening");
    list.innerHTML = "";
    dropdown.innerHTML = '<option value="">Select a Song</option>';

    songs.forEach(song => {
        let li = document.createElement("li");
        li.innerHTML = `${song.title} - <button onclick="playNote('${song.starting_note}')">Play ${song.starting_note}</button>`;
        list.appendChild(li);

        let option = document.createElement("option");
        option.value = song.title;
        option.textContent = song.title;
        dropdown.appendChild(option);
    });
}

function updateNowListening() {
    const neoName = document.getElementById("neoName").value;
    const selectedSong = document.getElementById("nowListening").value;
    if (neoName && selectedSong) {
        localStorage.setItem(neoName, selectedSong);
        displayListening();
    }
}

function displayListening() {
    const tracker = document.getElementById("liveTracker");
    tracker.innerHTML = "";
    
    for (let i = 0; i < localStorage.length; i++) {
        let neo = localStorage.key(i);
        let song = localStorage.getItem(neo);
        let li = document.createElement("li");
        li.textContent = `${neo} is listening to ${song}`;
        tracker.appendChild(li);
    }
}

displaySongs();
displayListening();