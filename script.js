// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// ========== MEMORY GAME ==========
class MemoryGame {
    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.resetBtn = document.getElementById('reset-game');
        this.movesDisplay = document.getElementById('moves');
        this.matchesDisplay = document.getElementById('matches');
        this.messageDisplay = document.getElementById('game-message');
        
        this.cards = ['🎮', '🎮', '🎯', '🎯', '🎲', '🎲', '🎪', '🎪', '🎨', '🎨', '🎭', '🎭', '🎸', '🎸', '🎬', '🎬'];
        this.moves = 0;
        this.matches = 0;
        this.flipped = [];
        this.matched = [];
        
        this.resetBtn.addEventListener('click', () => this.reset());
        this.init();
    }
    
    init() {
        this.shuffle();
        this.render();
    }
    
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    
    render() {
        this.gameBoard.innerHTML = '';
        this.cards.forEach((card, index) => {
            const cardEl = document.createElement('button');
            cardEl.className = 'card';
            cardEl.textContent = this.matched.includes(index) ? card : '?';
            cardEl.disabled = this.matched.includes(index);
            
            if (this.matched.includes(index)) {
                cardEl.classList.add('matched');
            }
            
            cardEl.addEventListener('click', () => this.flip(index));
            this.gameBoard.appendChild(cardEl);
        });
    }
    
    flip(index) {
        if (this.flipped.length === 2 || this.matched.includes(index) || this.flipped.includes(index)) {
            return;
        }
        
        this.flipped.push(index);
        this.render();
        
        if (this.flipped.length === 2) {
            this.moves++;
            this.movesDisplay.textContent = this.moves;
            this.checkMatch();
        }
    }
    
    checkMatch() {
        const [first, second] = this.flipped;
        
        if (this.cards[first] === this.cards[second]) {
            this.matched.push(first, second);
            this.matches++;
            this.matchesDisplay.textContent = this.matches;
            this.flipped = [];
            this.render();
            
            if (this.matches === 8) {
                this.messageDisplay.textContent = `🎉 You won in ${this.moves} moves!`;
            }
        } else {
            setTimeout(() => {
                this.flipped = [];
                this.render();
            }, 800);
        }
    }
    
    reset() {
        this.moves = 0;
        this.matches = 0;
        this.flipped = [];
        this.matched = [];
        this.messageDisplay.textContent = '';
        this.movesDisplay.textContent = '0';
        this.matchesDisplay.textContent = '0/8';
        this.init();
    }
}

// Initialize memory game
new MemoryGame();

// ========== RANDOM FACTS ==========
const facts = [
    "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that were over 3000 years old and still edible!",
    "A group of flamingos is called a 'flamboyance'.",
    "Octopuses have three hearts - two pump blood to the gills, and one pumps blood to the rest of the body.",
    "Bananas are berries, but strawberries aren't!",
    "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the iron.",
    "A day on Venus is longer than its year.",
    "Cats have a third eyelid called the nictitating membrane.",
    "The smell of freshly cut grass is actually a chemical defense mechanism of the plant.",
    "Wombats poop in cubes to prevent it from rolling away.",
    "A group of crows is called a 'murder'.",
    "Cleopatra lived closer to the invention of the iPhone than to the construction of the Great Pyramid.",
    "Sharks have been around longer than dinosaurs.",
    "The fingerprints of koalas are so similar to humans that they could confuse crime scene investigators.",
    "Butterflies taste with their feet.",
    "A cockroach can survive for a week without its head.",
];

const factBtn = document.getElementById('new-fact-btn');
const factDisplay = document.getElementById('fact-display');

factBtn.addEventListener('click', () => {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factDisplay.innerHTML = `<p>${randomFact}</p>`;
});

// ========== DICE ROLLER ==========
const diceTypeSelect = document.getElementById('dice-type');
const rollBtn = document.getElementById('roll-btn');
const diceResult = document.getElementById('dice-result');

rollBtn.addEventListener('click', () => {
    const diceType = diceTypeSelect.value;
    const max = parseInt(diceType.substring(1));
    const result = Math.floor(Math.random() * max) + 1;
    diceResult.textContent = `🎲 You rolled: ${result}`;
});

// ========== COLOR GENERATOR ==========
const genColorBtn = document.getElementById('gen-color-btn');
const colorBox = document.getElementById('color-box');
const colorCode = document.getElementById('color-code');

function generateRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
}

genColorBtn.addEventListener('click', () => {
    const color = generateRandomColor();
    colorBox.style.backgroundColor = color;
    colorCode.textContent = color;
});

// Generate initial color
generateRandomColor();

// ========== COIN FLIP ==========
const flipBtn = document.getElementById('flip-btn');
const flipResult = document.getElementById('flip-result');

flipBtn.addEventListener('click', () => {
    flipResult.textContent = '';
    flipBtn.disabled = true;
    
    // Animate the flip
    let flips = 0;
    const flipInterval = setInterval(() => {
        flipResult.textContent = Math.random() > 0.5 ? '🪙 Heads' : '🪙 Tails';
        flips++;
        
        if (flips > 10) {
            clearInterval(flipInterval);
            flipBtn.disabled = false;
        }
    }, 100);
});