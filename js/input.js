/**
 * INPUT HANDLER
 * ==============
 * Handles all input sources for the game
 * 
 * ⭐ THIS IS THE FILE TO MODIFY FOR CAMERA INPUT ⭐
 * 
 * Currently supports: Keyboard
 * Future: Camera-based pose detection
 * 
 * Forgebots - UM6P Robotics & AI Club
 */

class InputHandler {
    constructor(player) {
        this.player = player;
        
        // Input state
        this.jumpPressed = false;
        this.duckPressed = false;
        
        // Input source mode
        this.inputMode = 'keyboard';  // 'keyboard' or 'camera'
        
        // Initialize keyboard controls
        this.initKeyboardControls();
        
        // =====================================================
        // 🎥 CAMERA INTEGRATION POINT
        // =====================================================
        // When you're ready to add camera input, uncomment:
        // this.initCameraControls();
        // =====================================================
    }
    
    /**
     * Initialize keyboard event listeners
     */
    initKeyboardControls() {
        // Key down events
        document.addEventListener('keydown', (event) => {
            if (this.inputMode !== 'keyboard') return;
            
            switch(event.code) {
                case 'Space':
                case 'ArrowUp':
                    event.preventDefault();
                    this.triggerJump();
                    break;
                    
                case 'ArrowDown':
                    event.preventDefault();
                    this.triggerDuck();
                    break;
            }
        });
        
        // Key up events (for stopping duck)
        document.addEventListener('keyup', (event) => {
            if (this.inputMode !== 'keyboard') return;
            
            if (event.code === 'ArrowDown') {
                this.triggerStandUp();
            }
        });
    }
    
    // =========================================================
    // 🎥 CAMERA CONTROLS - INTEGRATION SECTION
    // =========================================================
    // This section is where you'll add camera-based controls
    // 
    // STEPS TO INTEGRATE CAMERA:
    // 1. Set up camera feed (see camera/cameraHandler.js template)
    // 2. Use pose detection (e.g., TensorFlow.js PoseNet or MediaPipe)
    // 3. Call triggerJump() when player jumps
    // 4. Call triggerDuck() when player crouches
    // 5. Call triggerStandUp() when player stands up
    // =========================================================
    
    /**
     * Initialize camera-based controls
     * Uncomment and implement when ready
     */
    /*
    initCameraControls() {
        this.inputMode = 'camera';
        document.getElementById('cameraMode').textContent = 'Enabled';
        document.getElementById('cameraStatus').classList.add('active');
        
        // Initialize your camera handler here
        // Example:
        // this.cameraHandler = new CameraHandler();
        // this.cameraHandler.onJump = () => this.triggerJump();
        // this.cameraHandler.onDuck = () => this.triggerDuck();
        // this.cameraHandler.onStandUp = () => this.triggerStandUp();
        // this.cameraHandler.start();
    }
    */
    
    /**
     * Switch between keyboard and camera input
     */
    setInputMode(mode) {
        this.inputMode = mode;
        document.getElementById('cameraMode').textContent = 
            mode === 'camera' ? 'Enabled' : 'Disabled';
        
        if (mode === 'camera') {
            document.getElementById('cameraStatus').classList.add('active');
        } else {
            document.getElementById('cameraStatus').classList.remove('active');
        }
    }
    
    // =========================================================
    // ACTION TRIGGERS
    // These methods are called by both keyboard and camera input
    // =========================================================
    
    /**
     * Trigger jump action
     * Call this from any input source to make player jump
     */
    triggerJump() {
        this.jumpPressed = true;
        this.player.jump();
    }
    
    /**
     * Trigger duck action
     * Call this from any input source to make player duck
     */
    triggerDuck() {
        this.duckPressed = true;
        this.player.duck();
    }
    
    /**
     * Trigger stand up action
     * Call this from any input source to make player stand up from ducking
     */
    triggerStandUp() {
        this.duckPressed = false;
        this.player.standUp();
    }
    
    /**
     * Reset input state
     */
    reset() {
        this.jumpPressed = false;
        this.duckPressed = false;
    }
}
