/**
 * MAIN ENTRY POINT
 * =================
 * Initializes and starts the game
 * 
 * Forgebots - UM6P Robotics & AI Club
 */

// Global game instance
let game;

/**
 * Initialize game when page loads
 */
window.onload = function() {
    console.log('🦖 Forgebots Dino Game - Initializing...');
    console.log('🤖 UM6P Robotics & AI Club - Exhibition 2025');
    
    // Create game instance
    game = new Game();
    
    // Draw initial frame
    game.draw();
    
    console.log('✅ Game ready! Press SPACE to start.');
    console.log('');
    console.log('📷 To enable camera controls:');
    console.log('   1. Implement camera/cameraHandler.js');
    console.log('   2. Uncomment initCameraControls() in input.js');
    console.log('   3. Call game.getInputHandler().setInputMode("camera")');
};

// =====================================================
// 🎥 CAMERA INTEGRATION - QUICK START GUIDE
// =====================================================
// 
// When you're ready to add camera-based player detection:
//
// 1. Add your camera library (e.g., TensorFlow.js + PoseNet, or MediaPipe)
//    Add script tag in index.html:
//    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
//    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet"></script>
//
// 2. Create your camera handler (template provided in camera/cameraHandler.js)
//
// 3. In input.js, uncomment initCameraControls() and implement it
//
// 4. Use these methods to control the player:
//    - game.getInputHandler().triggerJump()   - when player jumps
//    - game.getInputHandler().triggerDuck()   - when player crouches
//    - game.getInputHandler().triggerStandUp() - when player stands up
//
// Example pose detection logic:
// if (playerHeadY < previousHeadY - threshold) {
//     game.getInputHandler().triggerJump();
// }
// if (playerHeadY > previousHeadY + threshold) {
//     game.getInputHandler().triggerDuck();
// }
//
// =====================================================
