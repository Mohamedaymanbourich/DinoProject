# 🎥 Camera Integration - Quick Setup Guide

## ✅ Implementation Complete!

The camera-based jump detection system is **fully integrated** and ready to use.

---

## 🚀 Quick Start

1. **Open the game**: Double-click `index.html` or serve via a local server
2. **Click "Enable Camera"**: Grant camera permissions when prompted
3. **Stand in view**: Make sure your shoulders are visible
4. **Click "Calibrate"**: While standing normally
5. **Jump!**: Jump in real life to control the dino!

---

## 🛠️ Technology Used

- **MediaPipe Pose**: Real-time human pose estimation
- **Detection**: 33 body landmarks tracked at 30+ FPS
- **Method**: Shoulder position tracking (landmarks 11 & 12)
- **Smoothing**: 3-frame moving average for stability

---

## ⚙️ How It Works

### Detection Logic

```
Standing Position (Baseline)
     ↓
Camera tracks shoulder Y position
     ↓
Shoulder moves UP (Y decreases)
     → JUMP DETECTED
     
Shoulder moves DOWN (Y increases)
     → DUCK DETECTED
     
Back to baseline
     → STAND UP
```

### Thresholds

- **Jump**: Shoulders move up by 8% of frame height
- **Duck**: Shoulders move down by 8% of frame height
- **Smoothing**: 3-frame history to prevent jitter

---

## 🎯 Calibration Tips

### For Best Results:

1. **Stand normally** (upright, arms at sides)
2. **Face the camera** (front view works best)
3. **Good lighting** (evenly lit, no backlighting)
4. **Stable position** (don't move while calibrating)
5. **Distance**: 1-2 meters from camera

### When to Re-calibrate:

- Different player height
- Camera moved/adjusted
- Detection seems off
- Lighting changed significantly

---

## 🔧 Adjusting Sensitivity

Edit `camera/cameraHandler.js` (lines 26-27):

```javascript
// More sensitive (easier to trigger)
this.JUMP_THRESHOLD = 0.05;  // Default: 0.08
this.DUCK_THRESHOLD = 0.05;  // Default: 0.08

// Less sensitive (harder to trigger)
this.JUMP_THRESHOLD = 0.12;
this.DUCK_THRESHOLD = 0.12;

// Smoother detection (slower response)
this.historySize = 5;  // Default: 3

// Faster detection (more jittery)
this.historySize = 1;  // Default: 3
```

---

## 📊 Technical Specifications

### MediaPipe Pose Landmarks Used

```
Landmark 11: Left Shoulder
Landmark 12: Right Shoulder

Average Y position = (L11.y + L12.y) / 2
```

### Coordinate System

- X: 0 (left) → 1 (right)
- Y: 0 (top) → 1 (bottom)
- Normalized coordinates (resolution independent)

### Detection States

1. **Standing**: Shoulders near baseline (±8%)
2. **Jumping**: Shoulders > 8% above baseline
3. **Ducking**: Shoulders > 8% below baseline

### Performance

- Frame Rate: 30+ FPS (depends on device)
- Latency: ~50-100ms (detection to game response)
- CPU Usage: Moderate (MediaPipe optimized)

---

## 🐛 Troubleshooting

### Camera Not Initializing

**Problem**: "Camera initialization failed" error

**Solutions**:
- ✅ Check browser permissions (allow camera access)
- ✅ Try Chrome or Edge (best compatibility)
- ✅ Ensure HTTPS or localhost (required for camera)
- ✅ Close other apps using the camera
- ✅ Refresh the page

### Pose Not Detected

**Problem**: No green skeleton on video

**Solutions**:
- ✅ Improve lighting (face towards light)
- ✅ Move closer to camera (1-2 meters)
- ✅ Ensure upper body is fully visible
- ✅ Check internet connection (MediaPipe CDN)
- ✅ Try a different camera angle

### Detection Too Sensitive

**Problem**: Dino jumps with small movements

**Solutions**:
- ✅ Increase `JUMP_THRESHOLD` (try 0.10 or 0.12)
- ✅ Increase `historySize` (try 5 for more smoothing)
- ✅ Re-calibrate while standing very still
- ✅ Ensure camera is stable (not shaking)

### Detection Not Sensitive Enough

**Problem**: Have to jump very high to trigger

**Solutions**:
- ✅ Decrease `JUMP_THRESHOLD` (try 0.05 or 0.06)
- ✅ Decrease `historySize` (try 1 or 2)
- ✅ Re-calibrate
- ✅ Ensure good lighting for accurate tracking

### Delayed Response

**Problem**: Lag between jumping and dino jumping

**Solutions**:
- ✅ Reduce `historySize` (faster but more jittery)
- ✅ Check internet speed (MediaPipe CDN)
- ✅ Close other browser tabs
- ✅ Use a faster computer if possible

---

## 📱 Browser Compatibility

### Recommended

- ✅ **Chrome 90+**: Best performance
- ✅ **Edge 90+**: Excellent support
- ✅ **Firefox 88+**: Good support

### Requirements

- Camera access permission
- WebRTC support
- HTTPS (or localhost for testing)
- Modern JavaScript (ES6+)
- Canvas 2D support

---

## 🎮 UI Controls

### Buttons

1. **Enable Camera**: Initializes camera and starts pose detection
2. **Calibrate Standing Position**: Sets current pose as baseline
3. **Disable Camera**: Stops camera and switches to keyboard

### Status Indicators

- 🔴 **Red dot**: Camera disabled
- 🟢 **Green blinking dot**: Camera active and tracking

### Video Preview

- Shows mirrored camera feed (natural for user)
- Green skeleton overlay shows detected pose
- Red dots show landmark positions

---

## 🔬 Testing Checklist

### Pre-Exhibition Testing

- [ ] Test camera initialization in target browser
- [ ] Verify pose detection with different people
- [ ] Test with different heights (short/tall)
- [ ] Check detection accuracy in exhibition lighting
- [ ] Test camera angle and distance
- [ ] Verify calibration process is clear
- [ ] Test keyboard fallback mode
- [ ] Check performance on exhibition laptop

### During Exhibition

- [ ] Quick camera test before opening
- [ ] Mark floor position for players (1-2m from camera)
- [ ] Have calibration instructions visible
- [ ] Monitor detection accuracy
- [ ] Adjust thresholds if needed
- [ ] Keep keyboard controls ready as backup

---

## 📞 Support

For technical issues or questions:

1. Check console logs (F12 → Console)
2. Review error messages
3. Consult code comments in `cameraHandler.js`
4. Test with keyboard controls to isolate issues

---

## 🎉 Ready to Demo!

The system is production-ready. Just remember:

1. ✅ Good lighting is crucial
2. ✅ Calibrate for each player
3. ✅ Show the video preview to players
4. ✅ Encourage big, clear jumps
5. ✅ Have fun!

**Forgebots - UM6P Robotics & AI Club**
