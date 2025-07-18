// Sample Spotify Top 100 data
const spotifyTop100 = [
    { id: 1, title: "Blinding Lights", artist: "The Weeknd", votes: 0, duration: "3:20" },
    { id: 2, title: "Save Your Tears", artist: "The Weeknd", votes: 0, duration: "3:35" },
    { id: 3, title: "Stay", artist: "The Kid LAROI, Justin Bieber", votes: 0, duration: "2:21" },
    { id: 4, title: "good 4 u", artist: "Olivia Rodrigo", votes: 0, duration: "2:58" },
    { id: 5, title: "Levitating", artist: "Dua Lipa", votes: 0, duration: "3:23" },
    { id: 6, title: "Montero", artist: "Lil Nas X", votes: 0, duration: "2:17" },
    { id: 7, title: "Peaches", artist: "Justin Bieber ft. Daniel Caesar, Giveon", votes: 0, duration: "3:18" },
    { id: 8, title: "Kiss Me More", artist: "Doja Cat ft. SZA", votes: 0, duration: "3:28" },
    { id: 9, title: "Butter", artist: "BTS", votes: 0, duration: "2:42" },
    { id: 10, title: "Deja Vu", artist: "Olivia Rodrigo", votes: 0, duration: "3:35" },
];

let currentSong = null;
let isPlaying = false;
let isAdmin = false;

// DOM elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const cancelLogin = document.getElementById('cancelLogin');
const confirmLogin = document.getElementById('confirmLogin');
const adminControls = document.getElementById('adminControls');
const playBtn = document.getElementById('playBtn');
const playNextBtn = document.getElementById('playNextBtn');
const pauseBtn = document.getElementById('pauseBtn');
const stopBtn = document.getElementById('stopBtn');
const currentSongTitle = document.getElementById('currentSongTitle');
const currentSongArtist = document.getElementById('currentSongArtist');
const songList = document.getElementById('songList');

// Load songs on page load
document.addEventListener('DOMContentLoaded', function() {
    renderSongList();
    
    // Set event listeners
    loginBtn.addEventListener('click', showLoginModal);
    cancelLogin.addEventListener('click', hideLoginModal);
    confirmLogin.addEventListener('click', attemptLogin);
    playBtn.addEventListener('click', togglePlayback);
    playNextBtn.addEventListener('click', playNextSong);
    pauseBtn.addEventListener('click', pausePlayback);
    stopBtn.addEventListener('click', stopPlayback);
});

function renderSongList() {
    songList.innerHTML = '';
    
    // Sort by votes (descending)
    const sortedSongs = [...spotifyTop100].sort((a, b) => b.votes - a.votes);
    
    sortedSongs.forEach((song, index) => {
        const songRow = document.createElement('div');
        songRow.className = 'song-row';
        songRow.innerHTML = `
            <div class="song-number">${index + 1}</div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
            <div class="song-duration">${song.duration}</div>
            <div class="vote-section">
                <div class="vote-count" id="votes-${song.id}">${song.votes}</div>
                <button class="vote-btn" onclick="voteForSong(${song.id})">+</button>
            </div>
        `;
        songList.appendChild(songRow);
    });
}

function voteForSong(songId) {
    const song = spotifyTop100.find(s => s.id === songId);
    if (song) {
        song.votes++;
        document.getElementById(`votes-${songId}`).textContent = song.votes;
        renderSongList();
    }
}

function showLoginModal() {
    loginModal.style.display = 'flex';
}

function hideLoginModal() {
    loginModal.style.display = 'none';
    document.getElementById('password').value = '';
}

function attemptLogin() {
    const password = document.getElementById('password').value;
    
    if (password === "iluvfanta") {
        isAdmin = true;
        adminControls.style.display = 'block';
        loginBtn.textContent = 'Admin Mode';
        hideLoginModal();
        alert('Login successful! Admin controls enabled.');
    } else {
        alert('Incorrect password. Try again.');
    }
}

function togglePlayback() {
    if (!currentSong) {
        playNextSong();
        return;
    }
    
    isPlaying = !isPlaying;
    updatePlayButton();
    
    if (isPlaying) {
        currentSongTitle.textContent = currentSong.title;
        currentSongArtist.textContent = currentSong.artist;
    }
}

function updatePlayButton() {
    playBtn.textContent = isPlaying ? '❚❚' : '▶';
}

function playNextSong() {
    // Get song with most votes that isn't current song
    const nextSong = [...spotifyTop100]
        .sort((a, b) => b.votes - a.votes)
        .find(song => song.id !== (currentSong?.id || null));
    
    if (nextSong) {
        currentSong = nextSong;
        isPlaying = true;
        updatePlayButton();
        currentSongTitle.textContent = currentSong.title;
        currentSongArtist.textContent = currentSong.artist;
        
        // Reset votes for this song (optional)
        // currentSong.votes = 0;
        renderSongList();
    }
}

function pausePlayback() {
    if (!isAdmin) return;
    isPlaying = false;
    updatePlayButton();
}

function stopPlayback() {
    if (!isAdmin) return;
    isPlaying = false;
    currentSong = null;
    updatePlayButton();
    currentSongTitle.textContent = 'No song selected';
    currentSongArtist.textContent = 'Cast your votes!';
}