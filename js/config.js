/**
 * GAME CONFIGURATION
 * ===================
 * All game settings in one place for easy tweaking
 * 
 * Forgebots - UM6P Robotics & AI Club
 */

const CONFIG = {
    // Canvas dimensions
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 300,
    
    // Ground position (from top of canvas)
    GROUND_Y: 250,
    
    // Player settings
    PLAYER: {
        WIDTH: 44,
        HEIGHT: 47,
        DUCK_HEIGHT: 30,        // Height when ducking
        X_POSITION: 50,         // Fixed X position of player
        COLOR: '#535353',       // Dino color (Google style gray)
        
        // Jump physics
        JUMP_FORCE: -15,        // Initial jump velocity (negative = up)
        GRAVITY: 0.8,           // Gravity acceleration
        
        // Animation
        RUN_ANIMATION_SPEED: 5  // Frames between leg switches
    },
    
    // Obstacle settings
    OBSTACLES: {
        MIN_GAP: 300,           // Minimum gap between obstacles
        MAX_GAP: 600,           // Maximum gap between obstacles
        
        // Cactus (ground obstacle)
        CACTUS: {
            WIDTH: 25,
            MIN_HEIGHT: 40,
            MAX_HEIGHT: 60,
            COLOR: '#2d5a27'    // Cactus green
        },
        
        // Bird (flying obstacle - need to duck)
        BIRD: {
            WIDTH: 46,
            HEIGHT: 30,
            FLY_HEIGHT: 190,    // Y position (from top)
            COLOR: '#535353'
        }
    },
    
    // Game speed settings
    SPEED: {
        INITIAL: 4,             // Starting game speed (was 6)
        MAX: 10,                // Maximum speed (was 15)
        INCREMENT: 0.0005       // Speed increase per frame (slower ramp up)
    },
    
    // Scoring
    SCORE: {
        POINTS_PER_FRAME: 0.1   // Score increment per frame
    }
};

// Make config immutable to prevent accidental changes
Object.freeze(CONFIG);
Object.freeze(CONFIG.PLAYER);
Object.freeze(CONFIG.OBSTACLES);
Object.freeze(CONFIG.OBSTACLES.CACTUS);
Object.freeze(CONFIG.OBSTACLES.BIRD);
Object.freeze(CONFIG.SPEED);
Object.freeze(CONFIG.SCORE);
