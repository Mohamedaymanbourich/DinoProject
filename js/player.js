/**
 * PLAYER (DINOSAUR) CLASS
 * ========================
 * Handles player rendering, physics, and state
 * 
 * Forgebots - UM6P Robotics & AI Club
 */

class Player {
    constructor() {
        this.x = CONFIG.PLAYER.X_POSITION;
        this.y = CONFIG.GROUND_Y - CONFIG.PLAYER.HEIGHT;
        this.width = CONFIG.PLAYER.WIDTH;
        this.height = CONFIG.PLAYER.HEIGHT;
        
        // Physics
        this.velocityY = 0;
        this.gravity = CONFIG.PLAYER.GRAVITY;
        this.jumpForce = CONFIG.PLAYER.JUMP_FORCE;
        
        // State
        this.isJumping = false;
        this.isDucking = false;
        
        // Animation
        this.animationFrame = 0;
        this.frameCount = 0;
    }
    
    /**
     * Make the player jump
     * Called by InputHandler when jump action is detected
     */
    jump() {
        // Can only jump if on the ground
        if (!this.isJumping) {
            this.velocityY = this.jumpForce;
            this.isJumping = true;
            this.isDucking = false;  // Can't duck while jumping
        }
    }
    
    /**
     * Make the player duck
     * Called by InputHandler when duck action is detected
     */
    duck() {
        // Can only duck if on the ground
        if (!this.isJumping) {
            this.isDucking = true;
            this.height = CONFIG.PLAYER.DUCK_HEIGHT;
            this.y = CONFIG.GROUND_Y - this.height;
        }
    }
    
    /**
     * Stop ducking and return to normal stance
     */
    standUp() {
        this.isDucking = false;
        this.height = CONFIG.PLAYER.HEIGHT;
        this.y = CONFIG.GROUND_Y - this.height;
    }
    
    /**
     * Update player physics and state each frame
     */
    update() {
        // Apply gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;
        
        // Check if landed on ground
        const groundLevel = CONFIG.GROUND_Y - this.height;
        if (this.y >= groundLevel) {
            this.y = groundLevel;
            this.velocityY = 0;
            this.isJumping = false;
        }
        
        // Update animation frame
        this.frameCount++;
        if (this.frameCount >= CONFIG.PLAYER.RUN_ANIMATION_SPEED) {
            this.frameCount = 0;
            this.animationFrame = (this.animationFrame + 1) % 2;
        }
    }
    
    /**
     * Draw the player (dinosaur) on the canvas
     * Uses simple shapes to create a recognizable dino
     */
    draw(ctx) {
        ctx.fillStyle = CONFIG.PLAYER.COLOR;
        
        if (this.isDucking) {
            this.drawDuckingDino(ctx);
        } else {
            this.drawStandingDino(ctx);
        }
    }
    
    /**
     * Draw standing/running dinosaur
     */
    drawStandingDino(ctx) {
        const x = this.x;
        const y = this.y;
        
        // Body
        ctx.fillRect(x + 10, y + 10, 25, 25);
        
        // Head
        ctx.fillRect(x + 25, y, 19, 20);
        
        // Eye (white space)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 35, y + 5, 5, 5);
        ctx.fillStyle = CONFIG.PLAYER.COLOR;
        
        // Tail
        ctx.fillRect(x, y + 15, 15, 10);
        
        // Legs (animated)
        if (this.isJumping) {
            // Both legs together when jumping
            ctx.fillRect(x + 15, y + 35, 8, 12);
            ctx.fillRect(x + 27, y + 35, 8, 12);
        } else {
            // Alternating legs when running
            if (this.animationFrame === 0) {
                ctx.fillRect(x + 15, y + 35, 8, 12);
                ctx.fillRect(x + 27, y + 30, 8, 8);
            } else {
                ctx.fillRect(x + 15, y + 30, 8, 8);
                ctx.fillRect(x + 27, y + 35, 8, 12);
            }
        }
        
        // Arms (tiny T-Rex arms!)
        ctx.fillRect(x + 30, y + 20, 6, 4);
    }
    
    /**
     * Draw ducking dinosaur (shorter, longer)
     */
    drawDuckingDino(ctx) {
        const x = this.x;
        const y = this.y;
        
        // Elongated body when ducking
        ctx.fillRect(x, y + 5, 44, 15);
        
        // Head at front
        ctx.fillRect(x + 35, y, 15, 15);
        
        // Eye
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + 42, y + 3, 4, 4);
        ctx.fillStyle = CONFIG.PLAYER.COLOR;
        
        // Legs (animated)
        if (this.animationFrame === 0) {
            ctx.fillRect(x + 10, y + 20, 6, 10);
            ctx.fillRect(x + 25, y + 18, 6, 6);
        } else {
            ctx.fillRect(x + 10, y + 18, 6, 6);
            ctx.fillRect(x + 25, y + 20, 6, 10);
        }
    }
    
    /**
     * Get the collision box for the player
     * Used for collision detection with obstacles
     */
    getCollisionBox() {
        // Return a slightly smaller box for more forgiving collision
        const padding = 5;
        return {
            x: this.x + padding,
            y: this.y + padding,
            width: this.width - padding * 2,
            height: this.height - padding * 2
        };
    }
    
    /**
     * Reset player to initial state
     */
    reset() {
        this.y = CONFIG.GROUND_Y - CONFIG.PLAYER.HEIGHT;
        this.height = CONFIG.PLAYER.HEIGHT;
        this.velocityY = 0;
        this.isJumping = false;
        this.isDucking = false;
        this.animationFrame = 0;
        this.frameCount = 0;
    }
}
