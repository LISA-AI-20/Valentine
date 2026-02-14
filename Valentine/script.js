const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const question = document.getElementById('question');
const buttonsDiv = document.querySelector('.buttons');
const responseDiv = document.getElementById('response');
const mainGif = document.getElementById('main-gif');

const noTexts = [
    "No 😢",
    "Are you sure? 🥺",
    "Really sure? 💔",
    "Think again! 🌹",
    "Last chance... 😭",
    "You're breaking my heart! 😿",
    "Please say yes! 🙏",
    "I'll be so sad... 😔",
    "Give it a thought! ✨",
    "Don't do this to me! 🧸"
];

let noCount = 0;
let yesButtonSize = 1;

noBtn.addEventListener('click', () => {
    noCount++;
    
    // Update No button text
    if (noCount < noTexts.length) {
        noBtn.innerText = noTexts[noCount];
    } else {
        noBtn.classList.add('hidden'); // Eventually No button disappears
    }

    // Make Yes button bigger!
    yesButtonSize += 0.4;
    yesBtn.style.transform = `scale(${yesButtonSize})`;
    
    // Move the No button slightly to make it harder to click
    const x = (Math.random() - 0.5) * 100;
    const y = (Math.random() - 0.5) * 100;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

yesBtn.addEventListener('click', () => {
    question.classList.add('hidden');
    buttonsDiv.classList.add('hidden');
    mainGif.classList.add('hidden');
    responseDiv.classList.remove('hidden');
    
    createConfetti();
});

// Navigation for new pages
const viewGiftsBtn = document.getElementById('view-gifts-btn');
const decisionPage = document.getElementById('decision-page');
const showFloatingGiftsBtn = document.getElementById('show-floating-gifts');
const floatingGiftsContainer = document.getElementById('floating-gifts-container');

viewGiftsBtn.addEventListener('click', () => {
    responseDiv.classList.add('hidden');
    decisionPage.classList.remove('hidden');
});

showFloatingGiftsBtn.addEventListener('click', () => {
    decisionPage.classList.add('hidden');
    floatingGiftsContainer.classList.remove('hidden');
});

// Gift Page Navigation (gift #5 removed)
const giftPages = {
    1: document.getElementById('gift1-page'),
    2: document.getElementById('gift2-page'),
    3: document.getElementById('gift3-page'),
    4: document.getElementById('gift4-page')
};

// Love Bank Logic
const hugBtn = document.getElementById('send-hug-btn');
const kissBtn = document.getElementById('send-kiss-btn');
const hugCountDisplay = document.getElementById('hugs-count');
const kissCountDisplay = document.getElementById('kisses-count');
const loveNotif = document.getElementById('love-notification');

// Reset to zero every time the page loads
let hugCount = 0;
let kissCount = 0;

// Initialize displays on load
if (hugCountDisplay) hugCountDisplay.innerText = hugCount;
if (kissCountDisplay) kissCountDisplay.innerText = kissCount;

const claimRewardBtn = document.getElementById('claim-reward-btn');
const rewardBtnContainer = document.getElementById('reward-button-container');
const videoMilestone = document.getElementById('video-milestone-reward');
const rewardVideo = document.getElementById('reward-video');

function checkMilestone() {
    if (hugCount >= 100 && kissCount >= 100) {
        // Only show the button if the video hasn't been shown yet
        if (rewardBtnContainer && videoMilestone && videoMilestone.classList.contains('hidden')) {
            rewardBtnContainer.classList.remove('hidden');
        }
    }
}

if (claimRewardBtn) {
    claimRewardBtn.addEventListener('click', () => {
        rewardBtnContainer.classList.add('hidden');
        videoMilestone.classList.remove('hidden');
        if (rewardVideo) {
            rewardVideo.play().catch(e => console.log('Autoplay blocked:', e));
        }
        videoMilestone.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Initial check
window.addEventListener('load', () => {
    checkMilestone();
    // TASK 2: Hide Preloader after everything is loaded
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loader-hidden');
            // Remove from DOM after transition
            setTimeout(() => preloader.remove(), 500);
        }, 1500); // Show for at least 1.5s for that aesthetic feel
    }
});

function updateLoveProgress() {
    const progressBar = document.getElementById('love-progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    if (progressBar && progressPercent) {
        // Goal is 100 hugs + 100 kisses = 200 total
        const total = 200;
        const current = Math.min(hugCount + kissCount, total);
        const percent = Math.floor((current / total) * 100);
        progressBar.style.width = percent + '%';
        progressPercent.innerText = percent + '%';
        
        // Change color to green when complete
        if (percent >= 100) {
            progressBar.style.background = 'linear-gradient(90deg, #4dff88, #75ff8f)';
            progressPercent.innerText = "READY! 🎁";
        }
    }
}

function showLoveNotif() {
    loveNotif.classList.add('show');
    setTimeout(() => loveNotif.classList.remove('show'), 1500);
}

if (hugBtn) {
    hugBtn.addEventListener('click', () => {
        hugCount++;
        hugCountDisplay.innerText = hugCount;
        showLoveNotif();
        createSpecificConfetti('🫂');
        updateLoveProgress(); // Update Progress Bar
        checkMilestone();
    });
}

if (kissBtn) {
    kissBtn.addEventListener('click', () => {
        kissCount++;
        kissCountDisplay.innerText = kissCount;
        showLoveNotif();
        createSpecificConfetti('💋');
        updateLoveProgress(); // Update Progress Bar
        checkMilestone();
    });
}

function createSpecificConfetti(emoji) {
    for (let i = 0; i < 8; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = emoji;
        confetti.style.position = 'fixed';
        confetti.style.left = (Math.random() * 80 + 10) + 'vw';
        confetti.style.top = '100vh';
        confetti.style.fontSize = '2rem';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        
        confetti.animate([
            { transform: 'translateY(0) scale(1)', opacity: 1 },
            { transform: `translateY(-100vh) scale(1.5)`, opacity: 0 }
        ], {
            duration: 2000,
            easing: 'ease-out'
        }).onfinish = () => confetti.remove();
    }
}

const music = document.getElementById('bg-music');
const gift2Music = document.getElementById('gift2-music');
const gift3Music = document.getElementById('gift3-music');
const darlaVideo = document.getElementById('darla-video');
const darlaVideoContainer = document.getElementById('darla-video-container');
const showDarlaText = document.getElementById('show-darla-text');

if (gift3Music) {
    gift3Music.volume = 1.0; // Set to full volume
}

if (gift2Music) {
    gift2Music.addEventListener('play', () => {
        if (gift2Music.currentTime < 5) {
            gift2Music.currentTime = 5;
        }
    });
    // Ensure it starts at 5s even when it loops
    gift2Music.addEventListener('ended', () => {
        gift2Music.currentTime = 5;
        gift2Music.play();
    });
}

const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');

if (playPauseBtn) {
    const songCard = document.querySelector('.song-card');
    playPauseBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            playPauseBtn.classList.add('playing');
            if (songCard) songCard.classList.add('playing-active');
        } else {
            music.pause();
            playPauseBtn.classList.remove('playing');
            if (songCard) songCard.classList.remove('playing-active');
        }
    });
}

if (music) {
    music.addEventListener('timeupdate', () => {
        const progress = (music.currentTime / music.duration) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

document.getElementById('open-gift1').addEventListener('click', () => showPage(1));
document.getElementById('open-gift2').addEventListener('click', () => showPage(2));
document.getElementById('open-gift3').addEventListener('click', () => showPage(3));
document.getElementById('open-gift4').addEventListener('click', () => showPage(4));

function showPage(num) {
    giftPages[num].classList.remove('hidden');
    floatingGiftsContainer.classList.add('hidden'); // Hide the gift room
    document.body.style.overflow = 'hidden'; // Disable scroll on main page

    // If it's the music page, try to play it
    if (num === 1) {
        if (music) {
            const songCard = document.querySelector('.song-card');
            music.currentTime = 0; // Restart from beginning
            music.play()
                .then(() => {
                    playPauseBtn.classList.add('playing');
                    if (songCard) songCard.classList.add('playing-active');
                })
                .catch(e => {
                    console.log("Auto-play blocked, user needs to click play.");
                    playPauseBtn.classList.remove('playing');
                    if (songCard) songCard.classList.remove('playing-active');
                });
        }
    }

    // If it's the memory page, play all videos
    if (num === 2) {
        if (gift2Music) {
            gift2Music.currentTime = 5; // Start from 5 seconds
            gift2Music.play().catch(e => console.log("Music autoplay blocked:", e));
        }
        const memoryVideos = giftPages[num].querySelectorAll('video');
        memoryVideos.forEach(v => {
            v.currentTime = 0;
            v.play().catch(e => console.log("Video autoplay blocked:", e));
        });
    }

    // If it's the message page, play music
    if (num === 3) {
        if (gift3Music) {
            gift3Music.currentTime = 0;
            gift3Music.play().catch(e => console.log("Music autoplay blocked:", e));
        }
    }

    // gift5/shop was removed — no reset needed here
}

document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Hide all gift pages
        Object.values(giftPages).forEach(page => page.classList.add('hidden'));
        floatingGiftsContainer.classList.remove('hidden'); // Show gift room again
        document.body.style.overflow = 'auto';
        
        // Reset the shop for next time
        resetShop();

        // Stop music if it's playing
        if (music) {
            music.pause();
            playPauseBtn.classList.remove('playing');
            const songCard = document.querySelector('.song-card');
            if (songCard) songCard.classList.remove('playing-active');
        }
        if (gift2Music) {
            gift2Music.pause();
        }
        // Stop all videos in Gift 2 Memory page
        const memoryVideos = giftPages[2].querySelectorAll('video');
        memoryVideos.forEach(v => {
            v.pause();
            v.currentTime = 0;
        });

        if (gift3Music) {
            gift3Music.pause();
        }
        
        // Stop Darla video if it's playing
        if (darlaVideo) {
            darlaVideo.pause();
            darlaVideo.currentTime = 0;
            // Also reveal the link again for next time and hide container
            if (darlaVideoContainer) darlaVideoContainer.classList.add('hidden');
            if (showDarlaText) showDarlaText.style.display = 'block';
        }
    });
});

function createConfetti() {
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        const emojis = ['❤️', '💖', '💗', '🌹', '✨'];
        confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-5vh';
        confetti.style.fontSize = Math.random() * 20 + 20 + 'px';
        confetti.style.zIndex = '1000';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 3000,
            easing: 'linear'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Relationship Timer Logic
function updateRelationshipTimer() {
    // Updated start date per request: February 25, 2025
    const startDate = new Date('February 25, 2025 00:00:00'); 
    const now = new Date();
    
    let diff = now - startDate;
    
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    diff -= years * (1000 * 60 * 60 * 24 * 365.25);
    
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
    diff -= months * (1000 * 60 * 60 * 24 * 30.44);
    
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));
    diff -= weeks * (1000 * 60 * 60 * 24 * 7);
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    
    const minutes = Math.floor(diff / (1000 * 60));
    diff -= minutes * (1000 * 60);
    
    const seconds = Math.floor(diff / 1000);
    
    document.getElementById('years').innerText = years;
    document.getElementById('months').innerText = months;
    document.getElementById('weeks').innerText = weeks;
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
}

// Update timer every second
setInterval(updateRelationshipTimer, 1000);
updateRelationshipTimer(); // Initial call

// Darla Video Pop-up Logic
if (showDarlaText) {
    showDarlaText.addEventListener('click', () => {
        darlaVideoContainer.classList.remove('hidden');
        showDarlaText.style.display = 'none'; // Hide the link after clicking
        
        // Pause background music when video starts
        if (gift3Music) {
            gift3Music.pause();
        }

        if (darlaVideo) {
            darlaVideo.loop = true; // Set loop attribute
            darlaVideo.addEventListener('timeupdate', function() {
                if (this.currentTime >= 6) {
                    this.currentTime = 0;
                }
            });
            darlaVideo.play().catch(e => console.log('Video autoplay blocked:', e));
        }
        darlaVideoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Reply Message Logic
const sendReplyBtn = document.getElementById('send-reply-btn');
const replyMessageInput = document.getElementById('reply-message');

if (sendReplyBtn) {
    sendReplyBtn.addEventListener('click', () => {
        const message = replyMessageInput.value.trim();
        if (!message) {
            alert("Please write something first! ✨❤️");
            return;
        }

        // Encode the message for WhatsApp
        const encodedMsg = encodeURIComponent(`💌 Message from Kunju:\n\n"${message}"\n\nSent with love! ❤️`);
        const whatsappUrl = `https://wa.me/9207246309?text=${encodedMsg}`;

        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Clear the box for next time
        replyMessageInput.value = "";
    });

    // Add a small hover effect for the button
    sendReplyBtn.addEventListener('mousedown', () => sendReplyBtn.style.transform = 'scale(0.95)');
    sendReplyBtn.addEventListener('mouseup', () => sendReplyBtn.style.transform = 'scale(1)');
}
document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        Object.values(giftPages).forEach(page => page.classList.add('hidden'));
        floatingGiftsContainer.classList.remove('hidden');
        document.body.style.overflow = 'auto';

        if (music) music.pause();
        if (gift2Music) gift2Music.pause();
        if (gift3Music) gift3Music.pause();

        document.querySelectorAll('video').forEach(v => {
            v.pause();
            v.currentTime = 0;
        });
    });
});