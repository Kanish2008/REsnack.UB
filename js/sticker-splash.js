document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('stickerCanvas');
    const counter = document.getElementById('stickerCount');
    let stickerCount = 0;
    
    // Sticker emojis array
    const stickers = ['🍪', '🍭', '🍫', '🍬', '🧃', '🥨', '✨', '💫', '⭐️', '🌟'];
    
    // Random number between min and max
    const random = (min, max) => Math.random() * (max - min) + min;
    
    // Create a sticker element
    const createSticker = (x, y) => {
        const sticker = document.createElement('div');
        sticker.className = 'sticker';
        sticker.style.left = `${x}px`;
        sticker.style.top = `${y}px`;
        sticker.style.fontSize = `${random(20, 40)}px`;
        sticker.style.transform = `rotate(${random(-30, 30)}deg)`;
        sticker.textContent = stickers[Math.floor(random(0, stickers.length))];
        return sticker;
    };

    // Handle click/touch events
    const handleInteraction = (e) => {
        // Get click position relative to canvas
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create sticker burst
        for (let i = 0; i < 5; i++) {
            const offsetX = random(-20, 20);
            const offsetY = random(-20, 20);
            const sticker = createSticker(x + offsetX, y + offsetY);
            canvas.appendChild(sticker);
            
            // Remove sticker after animation
            setTimeout(() => {
                if (canvas.contains(sticker)) {
                    canvas.removeChild(sticker);
                }
            }, 3000);
        }
        
        // Update counter
        stickerCount += 5;
        counter.textContent = stickerCount;
        
        // Add particle burst effect
        const burst = new mojs.Burst({
            left: x,
            top: y,
            radius: { 0: 100 },
            count: 10,
            duration: 800,
            children: {
                shape: 'circle',
                fill: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'],
                radius: { 8: 0 },
                scale: { 1: 0 },
                duration: 600,
                easing: 'quad.out'
            }
        });
        
        burst.tune({ x: x, y: y }).replay();
    };

    // Add event listeners
    if ('ontouchstart' in window) {
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            handleInteraction(touch);
        });
    } else {
        canvas.addEventListener('click', handleInteraction);
    }
});