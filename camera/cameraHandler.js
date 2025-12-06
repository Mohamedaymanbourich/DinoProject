/**
 * CAMERA HANDLER - MediaPipe Pose Integration
 * ============================================
 * Implements camera-based player detection using MediaPipe Pose
 * 
 * Detects player jumping and ducking in real-time
 * 
 * Forgebots - UM6P Robotics & AI Club
 */

class CameraHandler {
    constructor() {
        // Video elements
        this.video = null;
        this.poseCanvas = null;
        this.canvasCtx = null;
        
        // MediaPipe Pose model
        this.pose = null;
        this.camera = null;
        
        // Callback functions - set by InputHandler
        this.onJump = null;
        this.onDuck = null;
        this.onStandUp = null;
        
        // Player position tracking
        this.previousShoulderY = 0;
        this.baselineY = 0;        // Player's standing position
        this.isCalibrated = false;
        
        // Thresholds for detecting jumps and ducks (in normalized coordinates)
        this.JUMP_THRESHOLD = 0.08;   // Normalized distance above baseline to trigger jump
        this.DUCK_THRESHOLD = 0.08;   // Normalized distance below baseline to trigger duck
        
        // State tracking
        this.currentState = 'standing';  // 'standing', 'jumping', 'ducking'
        this.isRunning = false;
        
        // Smoothing
        this.positionHistory = [];
        this.historySize = 3;
    }
    
    /**
     * Initialize camera and pose detection
     */
    async initialize() {
        try {
            // Get video element
            this.video = document.getElementById('cameraVideo');
            this.poseCanvas = document.getElementById('poseCanvas');
            this.canvasCtx = this.poseCanvas.getContext('2d');
            
            // Set canvas size to match video
            this.poseCanvas.width = 640;
            this.poseCanvas.height = 480;
            
            // Initialize MediaPipe Pose
            this.pose = new Pose({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
                }
            });
            
            // Configure pose detection
            this.pose.setOptions({
                modelComplexity: 1,
                smoothLandmarks: true,
                enableSegmentation: false,
                smoothSegmentation: false,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            
            // Set up pose detection callback
            this.pose.onResults((results) => this.onPoseResults(results));
            
            // Get camera stream
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: 640,
                    height: 480,
                    facingMode: 'user'  // Front camera
                }
            });
            
            this.video.srcObject = stream;
            
            // Wait for video to be ready
            await new Promise((resolve) => {
                this.video.onloadedmetadata = () => {
                    resolve();
                };
            });
            
            console.log('📷 Camera initialized successfully');
            return true;
            
        } catch (error) {
            console.error('❌ Camera initialization failed:', error);
            alert('Failed to access camera. Please ensure you have granted camera permissions.');
            return false;
        }
    }
    
    /**
     * Calibrate player's standing position
     * Call this when player is standing normally
     */
    calibrate(shoulderY) {
        this.baselineY = shoulderY;
        this.isCalibrated = true;
        this.positionHistory = [];
        console.log('✅ Calibration complete. Baseline Y:', this.baselineY.toFixed(3));
        
        // Update UI
        const instructions = document.getElementById('cameraInstructions');
        if (instructions) {
            instructions.innerHTML = '<p><strong>✅ Calibrated!</strong> Jump or duck to control the dino!</p>';
        }
    }
    
    /**
     * Start processing camera frames
     */
    start() {
        if (!this.video || !this.pose) {
            console.error('Camera not initialized. Call initialize() first.');
            return;
        }
        
        this.isRunning = true;
        
        // Start MediaPipe camera
        this.camera = new Camera(this.video, {
            onFrame: async () => {
                if (this.isRunning) {
                    await this.pose.send({image: this.video});
                }
            },
            width: 640,
            height: 480
        });
        
        this.camera.start();
        console.log('🎥 Camera processing started');
    }
    
    /**
     * Stop processing
     */
    stop() {
        this.isRunning = false;
        if (this.camera) {
            this.camera.stop();
        }
    }
    
    /**
     * Process pose detection results from MediaPipe
     */
    onPoseResults(results) {
        if (!this.isRunning) return;
        
        // Clear canvas
        this.canvasCtx.save();
        this.canvasCtx.clearRect(0, 0, this.poseCanvas.width, this.poseCanvas.height);
        
        // Draw the video feed (mirrored)
        this.canvasCtx.translate(this.poseCanvas.width, 0);
        this.canvasCtx.scale(-1, 1);
        this.canvasCtx.drawImage(results.image, 0, 0, this.poseCanvas.width, this.poseCanvas.height);
        
        // Draw pose landmarks if detected
        if (results.poseLandmarks) {
            // Draw connections
            drawConnectors(this.canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
                color: '#00FF00',
                lineWidth: 2
            });
            
            // Draw landmarks
            drawLandmarks(this.canvasCtx, results.poseLandmarks, {
                color: '#FF0000',
                lineWidth: 1,
                radius: 3
            });
            
            // Process pose for game controls
            this.processPose(results.poseLandmarks);
        }
        
        this.canvasCtx.restore();
    }
    
    /**
     * Process pose landmarks to detect jumping/ducking
     */
    processPose(landmarks) {
        // Get shoulder positions (landmarks 11 and 12)
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];
        
        // Calculate average shoulder Y position (normalized 0-1)
        const shoulderY = (leftShoulder.y + rightShoulder.y) / 2;
        
        // Smooth the position using history
        this.positionHistory.push(shoulderY);
        if (this.positionHistory.length > this.historySize) {
            this.positionHistory.shift();
        }
        
        const smoothedY = this.positionHistory.reduce((a, b) => a + b, 0) / this.positionHistory.length;
        
        // First detection - calibrate automatically if not calibrated
        if (!this.isCalibrated && this.positionHistory.length >= this.historySize) {
            this.calibrate(smoothedY);
        }
        
        // Detect player state
        if (this.isCalibrated) {
            this.detectPlayerState(smoothedY);
        }
        
        this.previousShoulderY = smoothedY;
    }
    
    /**
     * Detect if player is jumping, ducking, or standing
     */
    detectPlayerState(shoulderY) {
        const offsetFromBaseline = this.baselineY - shoulderY;
        
        // Player jumped (shoulders are higher, Y is smaller in screen coordinates)
        if (offsetFromBaseline > this.JUMP_THRESHOLD) {
            if (this.currentState !== 'jumping') {
                this.currentState = 'jumping';
                console.log('🦘 Jump detected! Offset:', offsetFromBaseline.toFixed(3));
                if (this.onJump) this.onJump();
            }
        }
        // Player ducked (shoulders are lower, Y is larger)
        else if (offsetFromBaseline < -this.DUCK_THRESHOLD) {
            if (this.currentState !== 'ducking') {
                this.currentState = 'ducking';
                console.log('🦆 Duck detected! Offset:', offsetFromBaseline.toFixed(3));
                if (this.onDuck) this.onDuck();
            }
        }
        // Player is standing
        else {
            if (this.currentState === 'ducking') {
                console.log('🧍 Stand up detected!');
                if (this.onStandUp) this.onStandUp();
            }
            this.currentState = 'standing';
        }
    }
    
    /**
     * Get current shoulder position for manual calibration
     */
    getCurrentShoulderPosition() {
        return this.previousShoulderY;
    }
    
    /**
     * Clean up resources
     */
    destroy() {
        this.stop();
        
        if (this.video && this.video.srcObject) {
            this.video.srcObject.getTracks().forEach(track => track.stop());
        }
        
        if (this.pose) {
            this.pose.close();
        }
    }
}
