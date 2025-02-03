// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

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
        db.ref('nowListening/' + neoName).set(selectedSong);
    }
}

function listenForUpdates() {
    db.ref('nowListening').on('value', (snapshot) => {
        const tracker = document.getElementById("liveTracker");
        tracker.innerHTML = "";
        snapshot.forEach(childSnapshot => {
            let li = document.createElement("li");
            li.textContent = `${childSnapshot.key} is listening to ${childSnapshot.val()}`;
            tracker.appendChild(li);
        });
    });
}

displaySongs();
listenForUpdates();