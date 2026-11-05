# Prerequisites
1. Homebrew
- Check if installed: `brew --version`
- Update if needed: `brew update`
- Install: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
2. Node.js
- Check if installed: `node -v`
- Update if needed: `brew upgrade node`
- Install: `brew install node`
3. Git
- Check if installed: `git --version`
- Update if needed: `brew upgrade git`
- Install: `brew install git`

# First Time Setup
1. Clone repo: `git clone https://github.com/ashlibel/Occupancy-Detection.git`
2. Go into project directory: `cd Occupancy-Detection`
3. Go to frontend branch: `git checkout frontend`
4. Go into app: `cd room-occupancy-app`
5. Install dependencies: `npm install`

# Running Frontend Locally
1. Go into project directory: `cd Occupancy-Detection`
2. Change to the frontend branch: `git checkout frontend`
3. Get latest code: `git pull`
4. Go into app directory: `cd room-occupancy-app` 
5. Run if dependencies change: `npm install`
6. Start the local frontend: `npm run dev`
6. Open 'http://localhost:5173' in browser
7. Stop server: `Ctrl + c`