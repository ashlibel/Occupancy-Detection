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

# Running Frontend Locally
1. Go into project directory: `cd Occupancy-Detection`
2. Change to the frontend branch: `git checkout frontend`
3. Go into app directory: `cd room-occupancy-app` 
4. `npm install` (only needed first time, or when dependencies change)
5. Start the local frontend: `npm run dev`
6. Open 'http://localhost:5173' in browser
7. Stop server: `Ctrl + c`

# Publishing An Update to GitHub Pages
1. Stage, commit, and push to GitHub (see git workflow below)
2. Make sure you're in correct directory: `cd room-occupancy-app`
3. Deploy to GitHub Pages: `npm run deploy`
4. Wait a minute or two, then check the live site to confirm changes

# Git Workflow for Frontend

## Get Up To Date
1. Make sure you're in the frontend branch: `git checkout frontend`
2. Pull the latest changes from GitHub: `git pull` 

## After Making Changes
1. Stage: `git add .` OR `git add <file-name>`
2. Commit: `git commit -m "description of what you changed"`
3. Push to GitHub: `git push`
