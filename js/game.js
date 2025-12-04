/**
 * GAME ENGINE
 * ============
 * Main game loop and state management
 * 
 * Forgebots - UM6P Robotics & AI Club
 */

class Game {
    constructor() {
        // Get canvas and context
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Game state
        this.isRunning = false;
        this.isGameOver = false;
        this.score = 0;
        this.highScore = this.loadHighScore();
        this.gameSpeed = CONFIG.SPEED.INITIAL;
        
        // Game objects
        this.player = new Player();
        this.obstacleManager = new ObstacleManager();
        this.inputHandler = new InputHandler(this.player);
        
        // Ground scroll position (for animation)
        this.groundX = 0;
        
        // Cloud positions
        this.clouds = this.initClouds();
        
        // Update UI
        this.updateScoreDisplay();
        
        // Setup restart key
        document.addEventListener('keydown', (event) => {
            if (event.code === 'KeyR') {
                this.restart();
            }
            // Start game on space if not running
            if ((event.code === 'Space' || event.code === 'ArrowUp') && !this.isRunning && !this.isGameOver) {
                this.start();
            }
            // Restart on space if game over
            if (event.code === 'Space' && this.isGameOver) {
                this.restart();
            }
        });
    }
    
    /**
     * Initialize decorative clouds
     */
    initClouds() {
        const clouds = [];
        for (let i = 0; i < 3; i++) {
            clouds.push({
                x: Math.random() * CONFIG.CANVAS_WIDTH,
                y: 30 + Math.random() * 50,
                width: 60 + Math.random() * 40,
                speed: 0.5 + Math.random() * 0.5
            });
        }
        return clouds;
    }
    
    /**
     * Start the game
     */
    start() {
        this.isRunning = true;
        this.isGameOver = false;
        document.getElementById('gameStatus').textContent = '';
        this.gameLoop();
    }
    
    /**
     * Main game loop
     */
    gameLoop() {
        if (!this.isRunning) return;
        
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update game state
        this.update();
        
        // Draw everything
        this.draw();
        
        // Check for collisions
        if (this.checkCollisions()) {
            this.gameOver();
            return;
        }
        
        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }
    
    /**
     * Update game state
     */
    update() {
        // Update player
        this.player.update();
        
        // Update obstacles
        this.obstacleManager.update(this.gameSpeed, this.score);
        
        // Update score
        this.score += CONFIG.SCORE.POINTS_PER_FRAME;
        this.updateScoreDisplay();
        
        // Increase game speed over time
        if (this.gameSpeed < CONFIG.SPEED.MAX) {
            this.gameSpeed += CONFIG.SPEED.INCREMENT;
        }
        
        // Update ground scroll
        this.groundX -= this.gameSpeed;
        if (this.groundX <= -20) {
            this.groundX = 0;
        }
        
        // Update clouds
        this.clouds.forEach(cloud => {
            cloud.x -= cloud.speed;
            if (cloud.x + cloud.width < 0) {
                cloud.x = CONFIG.CANVAS_WIDTH;
                cloud.y = 30 + Math.random() * 50;
            }
        });
    }
    
    /**
     * Draw all game elements
     */
    draw() {
        // Draw sky background (light blue gradient at top)
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 100);
        gradient.addColorStop(0, '#f7f7f7');
        gradient.addColorStop(1, '#ffffff');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, 100);
        
        // Draw clouds
        this.drawClouds();
        
        // Draw ground
        this.drawGround();
        
        // Draw obstacles
        this.obstacleManager.draw(this.ctx);
        
        // Draw player
        this.player.draw(this.ctx);
    }
    
    /**
     * Draw decorative clouds
     */
    drawClouds() {
        this.ctx.fillStyle = '#e8e8e8';
        this.clouds.forEach(cloud => {
            // Simple cloud shape with circles
            this.ctx.beginPath();
            this.ctx.arc(cloud.x, cloud.y, 15, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + 20, cloud.y - 5, 20, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + 40, cloud.y, 15, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    /**
     * Draw ground with scrolling effect
     */
    drawGround() {
        this.ctx.fillStyle = '#535353';
        
        // Main ground line
        this.ctx.fillRect(0, CONFIG.GROUND_Y, CONFIG.CANVAS_WIDTH, 2);
        
        // Ground texture (small bumps)
        this.ctx.fillStyle = '#535353';
        for (let i = this.groundX; i < CONFIG.CANVAS_WIDTH; i += 20) {
            if (Math.random() > 0.7) {
                this.ctx.fillRect(i, CONFIG.GROUND_Y + 5, 3, 2);
            }
            if (Math.random() > 0.8) {
                this.ctx.fillRect(i + 10, CONFIG.GROUND_Y + 8, 2, 2);
            }
        }
    }
    
    /**
     * Check for collisions between player and obstacles
     */
    checkCollisions() {
        const playerBox = this.player.getCollisionBox();
        return this.obstacleManager.checkCollision(playerBox);
    }
    
    /**
     * Handle game over
     */
    gameOver() {
        this.isRunning = false;
        this.isGameOver = true;
        
        // Update high score
        if (this.score > this.highScore) {
            this.highScore = Math.floor(this.score);
            this.saveHighScore();
        }
        this.updateScoreDisplay();
        
        // Draw game over screen
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 40px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 20);
        
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Score: ${Math.floor(this.score)}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
        this.ctx.fillText('Press SPACE or R to restart', this.canvas.width / 2, this.canvas.height / 2 + 50);
        
        document.getElementById('gameStatus').innerHTML = '<span class="game-over-text">Game Over! Press SPACE to restart</span>';
    }
    
    /**
     * Restart the game
     */
    restart() {
        // Reset game state
        this.score = 0;
        this.gameSpeed = CONFIG.SPEED.INITIAL;
        this.isGameOver = false;
        this.groundX = 0;
        
        // Reset game objects
        this.player.reset();
        this.obstacleManager.reset();
        this.inputHandler.reset();
        
        // Reset clouds
        this.clouds = this.initClouds();
        
        // Start game
        this.start();
    }
    
    /**
     * Update score display in UI
     */
    updateScoreDisplay() {
        document.getElementById('score').textContent = Math.floor(this.score);
        document.getElementById('highScore').textContent = this.highScore;
    }
    
    /**
     * Load high score from localStorage
     */
    loadHighScore() {
        return parseInt(localStorage.getItem('dinoHighScore')) || 0;
    }
    
    /**
     * Save high score to localStorage
     */
    saveHighScore() {
        localStorage.setItem('dinoHighScore', this.highScore);
    }
    
    /**
     * Get input handler (for external camera integration)
     */
    getInputHandler() {
        return this.inputHandler;
    }
}
