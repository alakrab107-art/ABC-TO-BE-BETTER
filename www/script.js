// Phonetics data
const phoneticsData = {
    consonants: [
        { symbol: "/p/", examples: ["pen", "copy", "happen"], audio: "con_p.mp3" },
        { symbol: "/b/", examples: ["bad", "baby", "job"], audio: "con_b.mp3" },
        { symbol: "/t/", examples: ["tea", "butter", "cat"], audio: "con_t.mp3" },
        { symbol: "/d/", examples: ["day", "ladder", "odd"], audio: "con_d.mp3" },
        { symbol: "/k/", examples: ["key", "clock", "school"], audio: "con_k.mp3" },
        { symbol: "/g/", examples: ["get", "giggle", "ghost"], audio: "con_g.mp3" },
        { symbol: "/f/", examples: ["fat", "coffee", "rough"], audio: "con_f.mp3" },
        { symbol: "/v/", examples: ["view", "heavy", "move"], audio: "con_v.mp3" },
        { symbol: "/θ/", examples: ["thin", "author", "path"], audio: "con_theta.mp3" },
        { symbol: "/ð/", examples: ["this", "other", "smooth"], audio: "con_eth.mp3" },
        { symbol: "/s/", examples: ["soon", "cease", "sister"], audio: "con_s.mp3" },
        { symbol: "/z/", examples: ["zero", "music", "roses"], audio: "con_z.mp3" },
        { symbol: "/ʃ/", examples: ["ship", "sure", "national"], audio: "con_sh.mp3" },
        { symbol: "/ʒ/", examples: ["measure", "vision", "beige"], audio: "con_zh.mp3" },
        { symbol: "/h/", examples: ["hot", "whole", "ahead"], audio: "con_h.mp3" },
        { symbol: "/tʃ/", examples: ["check", "church", "match"], audio: "con_ch.mp3" },
        { symbol: "/dʒ/", examples: ["judge", "age", "soldier"], audio: "con_j.mp3" },
        { symbol: "/m/", examples: ["man", "hammer", "sum"], audio: "con_m.mp3" },
        { symbol: "/n/", examples: ["no", "funny", "sun"], audio: "con_n.mp3" },
        { symbol: "/ŋ/", examples: ["ring", "anger", "sung"], audio: "con_ng.mp3" },
        { symbol: "/l/", examples: ["light", "valley", "feel"], audio: "con_l.mp3" },
        { symbol: "/r/", examples: ["right", "sorry", "arrange"], audio: "con_r.mp3" },
        { symbol: "/j/", examples: ["yes", "yellow", "beyond"], audio: "con_y.mp3" },
        { symbol: "/w/", examples: ["wet", "one", "when"], audio: "con_w.mp3" }
    ],
    vowels: [
        { symbol: "/iː/", examples: ["see", "heat", "me"], audio: "vow_i_long.mp3" },
        { symbol: "/ɪ/", examples: ["sit", "busy", "women"], audio: "vow_i_short.mp3" },
        { symbol: "/e/", examples: ["bed", "head", "many"], audio: "vow_e_short.mp3" },
        { symbol: "/æ/", examples: ["cat", "bad", "apple"], audio: "vow_ae.mp3" },
        { symbol: "/ɑː/", examples: ["father", "car", "heart"], audio: "vow_a_long.mp3" },
        { symbol: "/ɒ/", examples: ["got", "wash", "sock"], audio: "vow_o_short.mp3" },
        { symbol: "/ɔː/", examples: ["saw", "thought", "north"], audio: "vow_o_long.mp3" },
        { symbol: "/ʊ/", examples: ["put", "could", "book"], audio: "vow_u_short.mp3" },
        { symbol: "/uː/", examples: ["blue", "food", "rude"], audio: "vow_u_long.mp3" },
        { symbol: "/ʌ/", examples: ["cup", "luck", "son"], audio: "vow_uh.mp3" },
        { symbol: "/ɜː/", examples: ["bird", "word", "nurse"], audio: "vow_er_long.mp3" },
        { symbol: "/ə/", examples: ["about", "common", "standard"], audio: "vow_schwa.mp3" },
        { symbol: "/eɪ/", examples: ["face", "day", "break"], audio: "vow_ei.mp3" },
        { symbol: "/aɪ/", examples: ["price", "high", "try"], audio: "vow_ai.mp3" },
        { symbol: "/ɔɪ/", examples: ["choice", "boy", "noise"], audio: "vow_oi.mp3" },
        { symbol: "/əʊ/", examples: ["goat", "show", "no"], audio: "vow_ou.mp3" },
        { symbol: "/aʊ/", examples: ["mouth", "now", "down"], audio: "vow_au.mp3" },
        { symbol: "/ɪə/", examples: ["near", "here", "beer"], audio: "vow_ia.mp3" },
        { symbol: "/eə/", examples: ["square", "fair", "various"], audio: "vow_ea.mp3" },
        { symbol: "/ʊə/", examples: ["poor", "tour", "cure"], audio: "vow_ia.mp3" }
    ]
};

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const consonantsGrid = document.querySelector('#consonants .phonemes-grid');
const vowelsGrid = document.querySelector('#vowels .phonemes-grid');
const splashScreen = document.getElementById('splash-screen');

// Currently playing audio
let currentAudio = null;

// Initialize the application
function init() {
    // Show splash screen for 2 seconds
    setTimeout(() => {
        splashScreen.classList.add('hidden');
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500);
    }, 2000);
    
    // Set up tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Populate phonemes
    populatePhonemes('consonants', consonantsGrid);
    populatePhonemes('vowels', vowelsGrid);
}

// Create phoneme cards and add them to the grid
function populatePhonemes(type, gridElement) {
    phoneticsData[type].forEach(phoneme => {
        const card = createPhonemeCard(phoneme);
        gridElement.appendChild(card);
    });
}

// Create a phoneme card element
function createPhonemeCard(phoneme) {
    const card = document.createElement('div');
    card.className = 'phoneme-card';
    
    const symbol = document.createElement('div');
    symbol.className = 'phoneme-symbol';
    symbol.textContent = phoneme.symbol;
    
    const examples = document.createElement('div');
    examples.className = 'phoneme-examples';
    phoneme.examples.forEach(example => {
        const span = document.createElement('span');
        span.textContent = example;
        examples.appendChild(span);
    });
    
    const playButton = document.createElement('button');
    playButton.className = 'play-btn';
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    playButton.setAttribute('data-audio', phoneme.audio);
    playButton.addEventListener('click', function() {
        playAudio(phoneme.audio, this);
    });
    
    card.appendChild(symbol);
    card.appendChild(examples);
    card.appendChild(playButton);
    
    return card;
}

// Play audio function with visual feedback
function playAudio(filename, buttonElement) {
    // Stop any currently playing audio
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        
        // Reset all play buttons
        document.querySelectorAll('.play-btn').forEach(btn => {
            btn.innerHTML = '<i class="fas fa-play"></i>';
            btn.classList.remove('playing');
        });
    }
    
    // Determine the correct folder based on the filename prefix
    const folder = filename.startsWith('con_') ? 'consonants' : 'vowels';
    
    // Update button to show loading state
    buttonElement.innerHTML = '<span class="loading"></span>';
    
    // Create and play the audio using the Audio API
    const audio = new Audio(`sounds/${folder}/${filename}`);
    currentAudio = audio;
    
    // Add event listeners for audio
    audio.addEventListener('canplaythrough', () => {
        buttonElement.innerHTML = '<i class="fas fa-pause"></i>';
        buttonElement.classList.add('playing');
        audio.play();
    });
    
    audio.addEventListener('ended', () => {
        buttonElement.innerHTML = '<i class="fas fa-play"></i>';
        buttonElement.classList.remove('playing');
        currentAudio = null;
    });
    
    // Error handling
    audio.onerror = function() {
        console.error(`Error playing audio file: ${filename}`);
        buttonElement.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        setTimeout(() => {
            buttonElement.innerHTML = '<i class="fas fa-play"></i>';
        }, 1500);
    };
    
    // Play the audio
    audio.play().catch(error => {
        console.error('Audio playback error:', error);
    });
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);