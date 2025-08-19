// DOM elements
const greetBtn = document.getElementById('greet-btn');
const contactInfo = document.getElementById('contact-info');

// Array of fun messages
const messages = [
    "Hello! Welcome to Git Practice! 🎉",
    "Great job exploring the site! 👍",
    "Keep practicing those Git commands! 💪",
    "You're doing awesome! 🌟",
    "Git is powerful - keep learning! 🚀",
    "Version control mastery incoming! 🎯"
];

// Counter for message rotation
let messageIndex = 0;

// Function to get random color
function getRandomColor() {
    const colors = ['#667eea', '#764ba2', '#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to create animated notification
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getRandomColor()};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: bold;
        max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Function to animate button
function animateButton() {
    greetBtn.style.transform = 'scale(0.95)';
    greetBtn.style.background = getRandomColor();
    
    setTimeout(() => {
        greetBtn.style.transform = 'scale(1)';
    }, 150);
}

// Function to update contact info dynamically
function updateContactInfo() {
    const currentTime = new Date().toLocaleTimeString();
    const originalContent = contactInfo.innerHTML;
    
    contactInfo.innerHTML = `
        <p>Email: practice@git.com</p>
        <p>Phone: (555) 123-4567</p>
        <p><strong>Last interaction: ${currentTime}</strong></p>
    `;
    
    // Reset after 5 seconds
    setTimeout(() => {
        contactInfo.innerHTML = originalContent;
    }, 5000);
}

// Function to highlight current section in navigation
function highlightNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Function to add smooth scrolling
function addSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Function to add typing effect to hero text
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-content h2');
    const originalText = heroTitle.textContent;
    let index = 0;
    
    heroTitle.textContent = '';
    
    function typeWriter() {
        if (index < originalText.length) {
            heroTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
}

// Function to add command card interactions
function addCommandCardInteractions() {
    const commandCards = document.querySelectorAll('.command-card');
    
    commandCards.forEach(card => {
        card.addEventListener('click', () => {
            const commands = card.querySelectorAll('code');
            commands.forEach((cmd, index) => {
                setTimeout(() => {
                    cmd.style.background = '#e8f5e8';
                    cmd.style.borderLeft = '4px solid #28a745';
                    
                    setTimeout(() => {
                        cmd.style.background = '#f1f3f4';
                        cmd.style.borderLeft = '4px solid #667eea';
                    }, 1000);
                }, index * 200);
            });
            
            showNotification(`✅ ${card.querySelector('h3').textContent} commands highlighted!`);
        });
    });
}

// Main event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Button click event
    greetBtn.addEventListener('click', () => {
        animateButton();
        showNotification(messages[messageIndex]);
        updateContactInfo();
        
        // Cycle through messages
        messageIndex = (messageIndex + 1) % messages.length;
    });
    
    // Initialize features
    highlightNavigation();
    addSmoothScrolling();
    addTypingEffect();
    addCommandCardInteractions();
    
    // Add CSS for active navigation
    const style = document.createElement('style');
    style.textContent = `
        .nav-links a.active {
            color: #ffd700 !important;
            border-bottom: 2px solid #ffd700;
        }
    `;
    document.head.appendChild(style);
});

// Console easter egg
console.log(`
🎉 Welcome to the Git Practice Project! 🎉

Try these Git commands with this project:

1. git status
2. git add .
3. git commit -m "Initial commit"
4. git branch feature-branch
5. git checkout feature-branch
6. git merge feature-branch

Happy learning! 🚀
`);

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        getRandomColor,
        updateContactInfo
    };
}
