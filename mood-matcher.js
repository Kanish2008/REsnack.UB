// Mood-based snack recommendations
const snackRecommendations = {
    energiboost: {
        title: 'Energy Bar Pack 🍫',
        description: 'Perfekt når du trenger et energikick! En mix av nøtter, sjokolade og tørket frukt.',
        icon: '⚡️'
    },
    stress: {
        title: 'Chill Mix 🫖',
        description: 'Ta en pause med vår beroligende mix av grønne snacks og en kopp te.',
        icon: '🍵'
    },
    focus: {
        title: 'Brain Food Bundle 🧠',
        description: 'Hold fokus med vår spesielle blanding av nøtter, mørk sjokolade og superfoods.',
        icon: '🎯'
    },
    chill: {
        title: 'Lounge Snacks 😎',
        description: 'Laid-back mix perfekt for Netflix og chill!',
        icon: '🍿'
    },
    celebration: {
        title: 'Party Pack 🎉',
        description: 'Delbare godbiter som gjør enhver feiring ekstra spesiell!',
        icon: '🎈'
    },
    social: {
        title: 'Share & Care Pack 🤝',
        description: 'Perfekt for å dele med venner - noe for enhver smak!',
        icon: '🫂'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const moodButtons = document.querySelectorAll('.mood-button');
    const moodResult = document.getElementById('mood-result');
    const matchIcon = document.getElementById('match-icon');
    const matchTitle = document.getElementById('match-title');
    const matchDescription = document.getElementById('match-description');
    const shareButton = document.getElementById('share-match');
    let currentMood = null;

    // Handle mood button clicks
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            const mood = button.dataset.mood;
            const recommendation = snackRecommendations[mood];
            
            // Update result display
            matchIcon.textContent = recommendation.icon;
            matchTitle.textContent = recommendation.title;
            matchDescription.textContent = recommendation.description;
            
            // Show result with animation
            moodResult.style.display = 'block';
            moodResult.style.opacity = '0';
            setTimeout(() => {
                moodResult.style.opacity = '1';
            }, 50);

            currentMood = mood;

            // Highlight selected button
            moodButtons.forEach(btn => btn.style.border = 'none');
            button.style.border = '2px solid #ff6b6b';
        });
    });

    // Handle share button
    shareButton.addEventListener('click', async () => {
        if (!currentMood) return;

        const recommendation = snackRecommendations[currentMood];
        const shareText = `Min YumBite stemning i dag: ${recommendation.title} ${recommendation.icon}\nSjekk din matstemning på REsnack! 🍭`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Min YumBite Matstemning',
                    text: shareText,
                    url: window.location.href
                });
            } else {
                // Fallback to clipboard
                await navigator.clipboard.writeText(shareText);
                alert('Delt til utklippstavlen! 📋');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    });
});