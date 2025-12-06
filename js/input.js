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
        
        // Camera handler
        this.cameraHandler = null;
        
        // Initialize keyboard controls
        this.initKeyboardControls();
        
        // Set up camera control buttons
        this.setupCameraButtons();
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
    
    /**
     * Set up camera control buttons
     */
    setupCameraButtons() {
        const enableBtn = document.getElementById('enableCameraBtn');
        const disableBtn = document.getElementById('disableCameraBtn');
        const calibrateBtn = document.getElementById('calibrateBtn');
        
        if (enableBtn) {
            enableBtn.addEventListener('click', () => this.enableCamera());
        }
        
        if (disableBtn) {
            disableBtn.addEventListener('click', () => this.disableCamera());
        }
        
        if (calibrateBtn) {
            calibrateBtn.addEventListener('click', () => this.calibrateCamera());
        }
    }
    
    /**
     * Enable camera-based controls
     */
    async enableCamera() {
        const enableBtn = document.getElementById('enableCameraBtn');
        const calibrateBtn = document.getElementById('calibrateBtn');
        const disableBtn = document.getElementById('disableCameraBtn');
        const statusDot = document.getElementById('statusDot');
        const cameraMode = document.getElementById('cameraMode');
        
        // Disable button during initialization
        if (enableBtn) enableBtn.disabled = true;
        if (cameraMode) cameraMode.textContent = 'Initializing...';
        
        try {
            // Create camera handler if not exists
            if (!this.cameraHandler) {
                this.cameraHandler = new CameraHandler();
                
                // Set up callbacks
                this.cameraHandler.onJump = () => this.triggerJump();
                this.cameraHandler.onDuck = () => this.triggerDuck();
                this.cameraHandler.onStandUp = () => this.triggerStandUp();
            }
            
            // Initialize camera
            const success = await this.cameraHandler.initialize();
            
            if (success) {
                // Start camera
                this.cameraHandler.start();
                
                // Update UI
                this.setInputMode('camera');
                if (statusDot) statusDot.classList.add('active');
                if (cameraMode) cameraMode.textContent = 'Active';
                if (enableBtn) enableBtn.style.display = 'none';
                if (calibrateBtn) calibrateBtn.disabled = false;
                if (disableBtn) disableBtn.disabled = false;
                
                console.log('✅ Camera enabled successfully');
            } else {
                throw new Error('Camera initialization failed');
            }
            
        } catch (error) {
            console.error('Failed to enable camera:', error);
            if (cameraMode) cameraMode.textContent = 'Failed';
            if (enableBtn) {
                enableBtn.disabled = false;
                enableBtn.textContent = 'Retry Camera';
            }
            alert('Failed to enable camera. Please check permissions and try again.');
        }
    }
    
    /**
     * Disable camera controls
     */
    disableCamera() {
        if (this.cameraHandler) {
            this.cameraHandler.destroy();
            this.cameraHandler = null;
        }
        
        // Update UI
        this.setInputMode('keyboard');
        const statusDot = document.getElementById('statusDot');
        const cameraMode = document.getElementById('cameraMode');
        const enableBtn = document.getElementById('enableCameraBtn');
        const calibrateBtn = document.getElementById('calibrateBtn');
        const disableBtn = document.getElementById('disableCameraBtn');
        const instructions = document.getElementById('cameraInstructions');
        
        if (statusDot) statusDot.classList.remove('active');
        if (cameraMode) cameraMode.textContent = 'Disabled';
        if (enableBtn) {
            enableBtn.style.display = 'inline-block';
            enableBtn.disabled = false;
            enableBtn.textContent = 'Enable Camera';
        }
        if (calibrateBtn) calibrateBtn.disabled = true;
        if (disableBtn) disableBtn.disabled = true;
        if (instructions) {
            instructions.innerHTML = `
                <p><strong>How to play with camera:</strong></p>
                <ol>
                    <li>Click "Enable Camera" and allow camera access</li>
                    <li>Stand in view and click "Calibrate Standing Position"</li>
                    <li>Jump in real life to make the dino jump!</li>
                    <li>Duck down to make the dino duck!</li>
                </ol>
            `;
        }
        
        console.log('📷 Camera disabled');
    }
    
    /**
     * Calibrate camera for standing position
     */
    calibrateCamera() {
        if (this.cameraHandler && this.cameraHandler.previousShoulderY > 0) {
            this.cameraHandler.calibrate(this.cameraHandler.previousShoulderY);
            console.log('✅ Camera calibrated');
        } else {
            alert('Please wait for pose detection to start, then try calibrating again.');
        }
    }
    
    /**
     * Initialize camera-based controls (legacy method - now using buttons)
     */
    initCameraControls() {
        // This method is kept for backwards compatibility
        // Camera is now enabled via UI buttons
        console.log('Camera controls available via UI buttons');
    }
    
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
