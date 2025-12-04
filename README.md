# 🦖 Forgebots Dino Jump Game

**UM6P Robotics & AI Club - Exhibition 2025**

> A Chrome Dino-style game where players physically jump and duck to control the dinosaur! Built for the Forgebots exhibition stand.

---

## 🎯 Project Goal

For the Exhibition event, we're creating an interactive game where:
- The player **physically jumps** → dinosaur jumps over cacti
- The player **physically ducks** → dinosaur ducks under birds
- A camera detects the player's movements in real-time

**Current Status:** ✅ Keyboard controls working | 🔄 Camera integration pending

---

## 🎮 How to Play (Current Version)

1. Open `index.html` in any browser (Chrome recommended)
2. Press **SPACE** to start
3. Controls:
   - `SPACE` or `↑` → Jump
   - `↓` → Duck  
   - `R` → Restart

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
├── camera/                 # 📷 CAMERA STUFF (TO BE IMPLEMENTED)
│   └── cameraHandler.js    # Template ready for pose detection
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
| Score & high score | ✅ Done | `game.js` |
| Game over & restart | ✅ Done | `game.js` |
| Speed adjustment | ✅ Done | `config.js` |
| Forgebots orange theme | ✅ Done | `style.css` |
| Logo placeholders | ✅ Done | `index.html` |

---

## 🔄 What's LEFT TO DO

### Priority 1: Camera Integration 📷
**Files to modify:** `camera/cameraHandler.js`, `js/input.js`

| Task | Difficulty | Notes |
|------|------------|-------|
| Set up webcam access | Easy | Use `navigator.mediaDevices.getUserMedia` |
| Add pose detection library | Easy | PoseNet or MediaPipe |
| Detect player head position | Medium | Track Y coordinate of nose/head |
| Calibrate standing position | Medium | Save baseline when player stands |
| Trigger jump when head goes UP | Medium | Call `inputHandler.triggerJump()` |
| Trigger duck when head goes DOWN | Medium | Call `inputHandler.triggerDuck()` |

### Priority 2: Polish for Exhibition
| Task | Difficulty |
|------|------------|
| Add Forgebots logo images | Easy |
| Add sound effects | Easy |
| Add countdown before start | Easy |
| Test with actual jumping | Medium |
| Adjust detection thresholds | Medium |

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

## 📷 How to Add Camera Controls

### Step 1: Add a pose detection library
In `index.html`, add before the game scripts:
```html
<!-- Using TensorFlow.js + MoveNet (recommended) -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/pose-detection"></script>
```

### Step 2: Implement the camera handler
Edit `camera/cameraHandler.js`:
- The template is already there with comments
- Implement `getHeadPosition()` using your chosen library
- Adjust `JUMP_THRESHOLD` and `DUCK_THRESHOLD` (default: 50 pixels)

### Step 3: Connect camera to game
In `js/input.js`, uncomment `this.initCameraControls()` in the constructor.

### Key Functions to Use:
```javascript
// These are already set up - just call them!
game.getInputHandler().triggerJump();    // When player jumps
game.getInputHandler().triggerDuck();    // When player ducks
game.getInputHandler().triggerStandUp(); // When player stands back up
```

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
- [ ] Laptop with webcam (or external camera)
- [ ] Large screen/monitor for game display
- [ ] Good lighting (important for pose detection!)
- [ ] Tape on floor to mark player position
- [ ] Backup keyboard controls ready

### Testing Tips:
1. Test with different heights (short & tall players)
2. Adjust camera angle - chest height works best
3. Test in the actual exhibition lighting
4. Have a calibration step before each player

---

## 👥 Team

**Forgebots** - UM6P Robotics, AI & IoT Club

Made for **Exhibition 2025** 🎉

---

## 💬 Questions?

If something isn't clear, check the comments in each file - especially:
- `js/input.js` - marked with ⭐ for camera integration points
- `camera/cameraHandler.js` - full template with step-by-step comments
