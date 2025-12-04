/**
 * OBSTACLES SYSTEM
 * =================
 * Handles creation, movement, and rendering of obstacles
 * 
 * Forgebots - UM6P Robotics & AI Club
 */

/**
 * Base Obstacle class
 */
class Obstacle {
    constructor(x, y, width, height, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;  // 'cactus' or 'bird'
    }
    
    /**
     * Move obstacle to the left
     */
    update(speed) {
        this.x -= speed;
    }
    
    /**
     * Check if obstacle is off screen (left side)
     */
    isOffScreen() {
        return this.x + this.width < 0;
    }
    
    /**
     * Get collision box
     */
    getCollisionBox() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}

/**
 * Cactus obstacle (ground level - jump over it)
 */
class Cactus extends Obstacle {
    constructor(x) {
        const width = CONFIG.OBSTACLES.CACTUS.WIDTH;
        const height = CONFIG.OBSTACLES.CACTUS.MIN_HEIGHT + 
            Math.random() * (CONFIG.OBSTACLES.CACTUS.MAX_HEIGHT - CONFIG.OBSTACLES.CACTUS.MIN_HEIGHT);
        const y = CONFIG.GROUND_Y - height;
        
        super(x, y, width, height, 'cactus');
        this.color = CONFIG.OBSTACLES.CACTUS.COLOR;
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        
        // Main trunk
        ctx.fillRect(this.x + 8, this.y, 10, this.height);
        
        // Left arm
        ctx.fillRect(this.x, this.y + 15, 10, 8);
        ctx.fillRect(this.x, this.y + 8, 5, 15);
        
        // Right arm
        ctx.fillRect(this.x + 15, this.y + 20, 10, 8);
        ctx.fillRect(this.x + 20, this.y + 12, 5, 16);
        
        // Spikes (small details)
        ctx.fillRect(this.x + 6, this.y - 3, 3, 5);
        ctx.fillRect(this.x + 17, this.y - 2, 3, 4);
    }
}

/**
 * Bird obstacle (flying - duck under it)
 */
class Bird extends Obstacle {
    constructor(x) {
        const width = CONFIG.OBSTACLES.BIRD.WIDTH;
        const height = CONFIG.OBSTACLES.BIRD.HEIGHT;
        const y = CONFIG.OBSTACLES.BIRD.FLY_HEIGHT;
        
        super(x, y, width, height, 'bird');
        this.color = CONFIG.OBSTACLES.BIRD.COLOR;
        this.wingUp = true;
        this.animationCounter = 0;
    }
    
    update(speed) {
        super.update(speed);
        
        // Wing flapping animation
        this.animationCounter++;
        if (this.animationCounter >= 10) {
            this.animationCounter = 0;
            this.wingUp = !this.wingUp;
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color;
        
        // Body
        ctx.fillRect(this.x + 10, this.y + 10, 25, 12);
        
        // Head
        ctx.fillRect(this.x + 30, this.y + 8, 12, 12);
        
        // Beak
        ctx.fillRect(this.x + 42, this.y + 12, 8, 4);
        
        // Eye
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(this.x + 36, this.y + 10, 3, 3);
        ctx.fillStyle = this.color;
        
        // Tail
        ctx.fillRect(this.x, this.y + 12, 12, 6);
        
        // Wings (animated)
        if (this.wingUp) {
            ctx.fillRect(this.x + 15, this.y, 15, 10);
        } else {
            ctx.fillRect(this.x + 15, this.y + 22, 15, 10);
        }
    }
}

/**
 * Obstacle Manager
 * Handles spawning and managing all obstacles
 */
class ObstacleManager {
    constructor() {
        this.obstacles = [];
        this.distanceSinceLastObstacle = 0;
        this.nextObstacleDistance = this.getRandomGap();
    }
    
    /**
     * Get random gap between obstacles
     */
    getRandomGap() {
        return CONFIG.OBSTACLES.MIN_GAP + 
            Math.random() * (CONFIG.OBSTACLES.MAX_GAP - CONFIG.OBSTACLES.MIN_GAP);
    }
    
    /**
     * Update all obstacles and spawn new ones
     */
    update(speed, score) {
        // Update existing obstacles
        this.obstacles.forEach(obstacle => obstacle.update(speed));
        
        // Remove off-screen obstacles
        this.obstacles = this.obstacles.filter(obstacle => !obstacle.isOffScreen());
        
        // Track distance for spawning
        this.distanceSinceLastObstacle += speed;
        
        // Spawn new obstacle if enough distance traveled
        if (this.distanceSinceLastObstacle >= this.nextObstacleDistance) {
            this.spawnObstacle(score);
            this.distanceSinceLastObstacle = 0;
            this.nextObstacleDistance = this.getRandomGap();
        }
    }
    
    /**
     * Spawn a new obstacle
     * Birds only appear after score > 100
     */
    spawnObstacle(score) {
        const x = CONFIG.CANVAS_WIDTH;
        
        // 30% chance for bird if score > 100
        if (score > 100 && Math.random() < 0.3) {
            this.obstacles.push(new Bird(x));
        } else {
            this.obstacles.push(new Cactus(x));
        }
    }
    
    /**
     * Draw all obstacles
     */
    draw(ctx) {
        this.obstacles.forEach(obstacle => obstacle.draw(ctx));
    }
    
    /**
     * Check collision with player
     */
    checkCollision(playerBox) {
        for (let obstacle of this.obstacles) {
            const obstacleBox = obstacle.getCollisionBox();
            
            if (this.boxesCollide(playerBox, obstacleBox)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * AABB collision detection
     */
    boxesCollide(box1, box2) {
        return box1.x < box2.x + box2.width &&
               box1.x + box1.width > box2.x &&
               box1.y < box2.y + box2.height &&
               box1.y + box1.height > box2.y;
    }
    
    /**
     * Reset obstacle manager
     */
    reset() {
        this.obstacles = [];
        this.distanceSinceLastObstacle = 0;
        this.nextObstacleDistance = this.getRandomGap();
    }
}
