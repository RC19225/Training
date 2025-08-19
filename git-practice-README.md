# Git Practice Project

A simple web project designed for practicing Git version control commands. This project contains HTML, CSS, and JavaScript files that provide plenty of opportunities to practice Git workflows.

## Files in this project:

- `index.html` - Main HTML structure
- `styles.css` - CSS styling and animations
- `script.js` - JavaScript functionality and interactions
- `README.md` - Project documentation
- `.gitignore` - Git ignore rules

## Git Practice Exercises:

### 1. Basic Git Operations
```bash
# Check repository status
git status

# Add files to staging area
git add index.html
git add styles.css
git add script.js

# Or add all files at once
git add .

# Commit changes
git commit -m "Add basic website files"

# View commit history
git log
git log --oneline
```

### 2. Branching Practice
```bash
# Create and switch to a new branch
git checkout -b feature/navbar-improvements

# Make some changes to the navigation in index.html
# Then commit the changes
git add index.html
git commit -m "Improve navigation styling"

# Switch back to main branch
git checkout git

# Merge the feature branch
git merge feature/navbar-improvements
```

### 3. Working with CSS Changes
```bash
# Create a branch for styling changes
git checkout -b feature/color-scheme

# Modify colors in styles.css
# Change the gradient colors or button colors
# Commit your changes
git add styles.css
git commit -m "Update color scheme"

# Switch branches and see the differences
git checkout git
git checkout feature/color-scheme
```

### 4. JavaScript Feature Branch
```bash
# Create a branch for new JavaScript features
git checkout -b feature/new-interactions

# Add new functions or modify existing ones in script.js
# Commit your changes
git add script.js
git commit -m "Add new interactive features"

# Create potential merge conflicts by editing the same file
# in different branches, then practice resolving them
```

### 5. Viewing Differences
```bash
# See what files have changed
git status

# See specific changes in files
git diff
git diff styles.css
git diff --staged

# Compare branches
git diff git feature/navbar-improvements
```

### 6. Advanced Git Operations
```bash
# View detailed commit information
git show HEAD
git show <commit-hash>

# Undo changes (be careful with these!)
git checkout -- filename.css  # Discard unstaged changes
git reset HEAD filename.js     # Unstage a file
git reset --soft HEAD~1        # Undo last commit (keep changes)

# Create tags
git tag v1.0.0
git tag -a v1.1.0 -m "Version 1.1.0 with new features"
```

## Practice Scenarios:

1. **Make styling changes**: Modify colors, fonts, or layouts in `styles.css`
2. **Add new HTML content**: Add sections, forms, or elements to `index.html`
3. **Enhance JavaScript**: Add new functions or interactive features to `script.js`
4. **Create feature branches**: Work on isolated features in separate branches
5. **Practice merging**: Merge completed features back to the main branch
6. **Simulate conflicts**: Make conflicting changes in different branches and resolve them

## Website Features:

- Responsive design
- Interactive button with animations
- Smooth scrolling navigation
- Dynamic content updates
- Animated notifications
- Command cards that highlight on click
- Console easter egg message

## Getting Started:

1. Open `index.html` in your web browser to see the website
2. Use Git commands to track changes as you modify the files
3. Practice different Git workflows with the provided files
4. Experiment with branching and merging strategies

This project provides a realistic scenario for practicing Git in a web development context!
