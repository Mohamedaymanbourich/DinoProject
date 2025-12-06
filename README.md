# 🦖 Forgebots Dino Jump Game

**UM6P Robotics & AI Club - Exhibition 2025**

> A Chrome Dino-style game where players physically jump and duck to control the dinosaur! Built for the Forgebots exhibition stand.

---

## 🎯 Project Goal

For the Exhibition event, we're creating an interactive game where:
- The player **physically jumps** → dinosaur jumps over cacti
- The player **physically ducks** → dinosaur ducks under birds
- A camera detects the player's movements in real-time

**Current Status:** ✅ Keyboard controls working | ✅ Camera integration COMPLETE!

---

## 🎮 How to Play

### Keyboard Controls (Traditional)
1. Open `index.html` in any browser (Chrome recommended)
2. Press **SPACE** to start
3. Controls:
   - `SPACE` or `↑` → Jump
   - `↓` → Duck  
   - `R` → Restart

### 🎥 Camera Controls (NEW!)
1. Open `index.html` in a browser
2. Click **"Enable Camera"** button
3. Allow camera access when prompted
4. Stand in view and click **"Calibrate Standing Position"**
5. **Jump in real life** to make the dino jump!
6. **Duck down** to make the dino duck!

---

## 📁 Project Structure

```
DinoProject/
│
├── index.html              # 🌐 Main page - open this to play!
│
├── css/
│   └── style.css           # 🎨 All styling (Forgebots orange theme)
│
├── js/                     # 🧠 Game logic (MAIN CODE)
│   ├── config.js           # ⚙️ SETTINGS - speed, physics, sizes
│   ├── player.js           # 🦖 Dinosaur - drawing & movement
│   ├── obstacles.js        # 🌵 Cactus & birds
│   ├── input.js            # 🎮 INPUT HANDLER ⭐ (keyboard + future camera)
│   ├── game.js             # 🎯 Game loop, collision, scoring
│   └── main.js             # 🚀 Starts everything
│
├── camera/                 # 📷 CAMERA INTEGRATION (✅ IMPLEMENTED!)
│   └── cameraHandler.js    # MediaPipe Pose detection - COMPLETE!
│
├── assets/                 # 🖼️ Images
│   ├── forgebots-logo.png  # Add the orange robot logo here
│   └── exhibition-logo.png # Add the exhibition logo here
│
└── README.md               # 📖 This file
```

---

## ✅ What's DONE

| Feature | Status | File |
|---------|--------|------|
| Game canvas & rendering | ✅ Done | `game.js` |
| Dinosaur with jump/duck animations | ✅ Done | `player.js` |
| Cactus obstacles (jump over) | ✅ Done | `obstacles.js` |
| Bird obstacles (duck under) | ✅ Done | `obstacles.js` |
| Keyboard controls | ✅ Done | `input.js` |
| **Camera-based jump detection** | ✅ Done | `cameraHandler.js` |
| **MediaPipe Pose integration** | ✅ Done | `cameraHandler.js` |
| **Real-time pose tracking** | ✅ Done | `cameraHandler.js` |
| Score & high score | ✅ Done | `game.js` |
| Game over & restart | ✅ Done | `game.js` |
| Speed adjustment | ✅ Done | `config.js` |
| Forgebots orange theme | ✅ Done | `style.css` |
| Logo placeholders | ✅ Done | `index.html` |

---

## 🔄 What's LEFT TO DO

### Priority 1: Polish for Exhibition
| Task | Difficulty | Status |
|------|------------|--------|
| Add Forgebots logo images | Easy | Pending |
| Add sound effects | Easy | Pending |
| Test with actual jumping | Medium | Ready to test! |
| Fine-tune detection thresholds | Medium | Adjustable in code |

### Camera Integration Details ✅

The camera system is **fully implemented** using MediaPipe Pose:
- ✅ Webcam access and video feed
- ✅ Real-time pose detection (33 body landmarks)
- ✅ Shoulder position tracking for jump/duck detection
- ✅ Calibration system for different player heights
- ✅ Position smoothing to reduce jitter
- ✅ Visual feedback with pose overlay
- ✅ UI controls (Enable/Disable/Calibrate)

**How it works:**
1. MediaPipe detects your body pose in real-time
2. System tracks shoulder position (landmarks 11 & 12)
3. When you jump, shoulders move up → triggers dino jump
4. When you duck, shoulders move down → triggers dino duck
5. Automatic smoothing prevents false triggers

---

## ⚙️ How to Adjust Game Settings

Everything is in **`js/config.js`**:

```javascript
// Speed (current: starts at 4, max 10)
CONFIG.SPEED.INITIAL = 4;      // Starting speed
CONFIG.SPEED.MAX = 10;         // Maximum speed
CONFIG.SPEED.INCREMENT = 0.0005; // How fast it speeds up

// Jump physics
CONFIG.PLAYER.JUMP_FORCE = -15;  // Jump height (more negative = higher)
CONFIG.PLAYER.GRAVITY = 0.8;     // Fall speed

// Obstacles
CONFIG.OBSTACLES.MIN_GAP = 300;  // Minimum space between obstacles
CONFIG.OBSTACLES.MAX_GAP = 600;  // Maximum space between obstacles
```

---

## 📷 Camera Controls - User Guide

### Setup Requirements:
- Modern web browser (Chrome, Edge, or Firefox recommended)
- Working webcam
- Good lighting conditions
- Stable internet connection (for MediaPipe library)

### Best Practices:
1. **Lighting**: Ensure you're well-lit so the camera can see you
2. **Distance**: Stand 1-2 meters from the camera
3. **Framing**: Make sure your shoulders and head are visible
4. **Calibration**: Stand still and upright when calibrating
5. **Movement**: Make clear, distinct jumps for best detection

### Adjusting Sensitivity:
Edit `camera/cameraHandler.js` to change detection thresholds:

```javascript
// Default: 0.08 (8% vertical movement)
this.JUMP_THRESHOLD = 0.08;   // Lower = more sensitive jumps
this.DUCK_THRESHOLD = 0.08;   // Lower = more sensitive ducks
this.historySize = 3;         // Smoothing (higher = smoother but slower)
```

### Technical Details:
- **Library**: MediaPipe Pose (Google)
- **Detection**: 33 body landmarks at 30+ FPS
- **Tracking**: Shoulder position (landmarks 11 & 12)
- **Coordinates**: Normalized (0-1) for resolution independence
- **Smoothing**: 3-frame moving average

---

## 🛠️ Quick Fixes

**Game too fast?**
→ Lower `CONFIG.SPEED.INITIAL` in `config.js`

**Dinosaur doesn't jump high enough?**
→ Change `CONFIG.PLAYER.JUMP_FORCE` to -18 or -20

**Obstacles too close together?**
→ Increase `CONFIG.OBSTACLES.MIN_GAP`

**Want to change colors?**
→ Edit `css/style.css` (orange theme: `#FF6B00`)

---

## 📱 For the Exhibition Stand

### Setup Checklist:
- [x] Camera integration complete
- [ ] Laptop with webcam (or external camera)
- [ ] Large screen/monitor for game display
- [x] Camera UI with preview and controls
- [ ] Good lighting (important for pose detection!)
- [ ] Tape on floor to mark player position (1-2m from camera)
- [x] Keyboard controls as backup

### Camera Testing Tips:
1. ✅ Test camera permissions in your browser first
2. ✅ Ensure pose landmarks appear on video preview
3. ✅ Calibrate while standing normally (not jumping)
4. ✅ Test with different player heights
5. ✅ Verify lighting - green skeleton should be clearly visible
6. ✅ Adjust thresholds if needed (see code comments)

### Live Demo Tips:
- Show the camera preview to players so they can see the pose detection
- Do a quick calibration for each new player
- Remind players to make BIG jumps for better detection
- Keep the camera at chest height for best results
- Have keyboard controls ready as backup

---

## 👥 Team

**Forgebots** - UM6P Robotics, AI & IoT Club

Made for **Exhibition 2025** 🎉

---

## 💬 Questions?

**Camera not working?**
- Check browser camera permissions
- Try Chrome/Edge (best MediaPipe support)
- Ensure HTTPS or localhost (camera requires secure context)
- Refresh the page and try again

**Detection too sensitive/not sensitive enough?**
- Adjust `JUMP_THRESHOLD` and `DUCK_THRESHOLD` in `camera/cameraHandler.js`
- Default is 0.08 (8% movement) - lower = more sensitive

**Pose skeleton not showing?**
- Improve lighting
- Move closer to camera
- Ensure upper body is fully visible
- Check internet connection (MediaPipe loads from CDN)

For code questions, check the detailed comments in:
- `camera/cameraHandler.js` - Full MediaPipe implementation
- `js/input.js` - Camera integration and controls
