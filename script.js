// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initProgressBars();
    initContactForm();
    initScrollToTop();
    initSmoothScrolling();
    initProjectInteractions();
});

// Navigation Toggle for Mobile
function initNavigation() {
    var navToggle = document.getElementById('navToggle');
    var navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        var navLinks = document.querySelectorAll('.nav-link');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        }
    }
}

// Typewriter Effect for Hero Section
function initTypewriter() {
    var typewriterText = document.getElementById('typewriter-text');
    if (!typewriterText) return;
    
    // No need to hide/show in JS - CSS handles it
    typewriterText.textContent = ''; // Clear initial content
    
    var texts = [
        "Crafting clean interfaces and small delightful experiences.",
        "Turning ideas into functional, beautiful web applications.", 
        "Building responsive websites with modern technologies."
    ];
    
    var textIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 100;
    
    function type() {
        var currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriterText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start the typewriter effect after a short delay
    setTimeout(type, 1000);
}

function initScrollAnimations() {
    var fadeElements = document.querySelectorAll('.fade-in');
    
    // First, make all fade-in elements visible immediately for testing
    for (var i = 0; i < fadeElements.length; i++) {
        fadeElements[i].classList.add('visible');
    }
    
    // Then set up the Intersection Observer for animated reveal
    var observer = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('visible');
            }
        }
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Remove the visible class and observe for animations
    for (var i = 0; i < fadeElements.length; i++) {
        fadeElements[i].classList.remove('visible'); // Remove this line if you want them always visible
        observer.observe(fadeElements[i]);
    }
}

// Animate Progress Bars in Skills Section
function initProgressBars() {
    var progressBars = document.querySelectorAll('.progress-bar');
    
    // Create Intersection Observer for progress bars
    var progressObserver = new IntersectionObserver(function(entries) {
        for (var i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                var progressBar = entries[i].target;
                var level = progressBar.getAttribute('data-level');
                progressBar.style.width = level + '%';
            }
        }
    }, {
        threshold: 0.5
    });
    
    // Observe all progress bars
    for (var i = 0; i < progressBars.length; i++) {
        progressObserver.observe(progressBars[i]);
    }
}

// Contact Form Handling
function initContactForm() {
    var contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // In a real application, we would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message, ' + name + '! I will get back to you soon.');
                       
            // Reset the form
            contactForm.reset();
        });
    }
}

// Scroll to Top Button
function initScrollToTop() {
    var scrollButton = document.getElementById('scrollToTop');
    
    if (scrollButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.classList.add('show');
            } else {
                scrollButton.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            var targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                var navMenu = document.querySelector('.nav-menu');
                var navToggle = document.getElementById('navToggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Project card interactions
function initProjectInteractions() {
    // Download CV button
    var downloadButtons = document.querySelectorAll('.download-btn');
    for (var i = 0; i < downloadButtons.length; i++) {
        downloadButtons[i].addEventListener('click', function(e) {
            e.preventDefault();
            alert('CV is WIP for now. Later I will add it.');
        });
    }
}

// Auto year update
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Debounce function for resize events
function debounce(func, wait) {
    var timeout;
    return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    };
}

// Window resize handler with debouncing
window.addEventListener('resize', debounce(function() {
    // Handle any resize-specific logic here
    console.log('Window resized');
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        var navMenu = document.getElementById('nav-menu');
        var navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});
