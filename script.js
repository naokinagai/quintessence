document.addEventListener('DOMContentLoaded', function() {
    const CONTACT_EMAIL = 'hello@quintec.com';

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'linear-gradient(135deg, rgba(26, 32, 44, 0.98) 0%, rgba(23, 25, 35, 0.98) 100%)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.35)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1a202c 0%, #171923 100%)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Contact form — opens mail client with message to Quintessence
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const organization = this.querySelector('input[name="organization"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Please fill in your name, email, and message.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid work email.', 'error');
                return;
            }
            
            sendViaMailto({
                from_name: name,
                from_email: email,
                organization: organization || 'Not provided',
                message: message,
                to_email: CONTACT_EMAIL
            });
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to cards
    const animatedElements = document.querySelectorAll('.about-card, .venture-card, .contact-info, .contact-form');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });

    // Enhanced Pacific Bridge parallax effect
    const pacificBridge = document.querySelector('.pacific-bridge');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        // Pacific bridge subtle movement
        if (pacificBridge) {
            pacificBridge.style.transform = `translateY(${rate * 0.1}px)`;
        }
        
        // Floating elements parallax
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.15;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    // Add hover effects to venture links
    const ventureLinks = document.querySelectorAll('.venture-link');
    
    ventureLinks.forEach(link => {
        // Skip the Ala Moana Letter link since it has a real URL
        if (link.getAttribute('href') !== '#') {
            return;
        }
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Reach out via Contact and we\'ll discuss how we can help.', 'info');
        });
    });

    // Enhanced Pacific bridge animation on scroll
    const dots = document.querySelectorAll('.dot');
    const hawaiiHub = document.querySelector('.hawaii-hub');
    
    window.addEventListener('scroll', function() {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Animate connection strength based on scroll
        dots.forEach((dot, index) => {
            const delay = index * 0.1;
            const opacity = Math.sin(scrollPercent * Math.PI * 2 + delay) * 0.3 + 0.7;
            dot.style.opacity = opacity;
        });
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function getInterestLabel(value) {
    const interests = {
        'regional': 'Regional Collaboration',
        'innovation': 'Cross-Sector Innovation',
        'cultural': 'Cultural Bridge',
        'energy': 'Energy & Resilience',
        'government': 'Government Partnerships',
        'nonprofit': 'Nonprofit Networks',
        'private': 'Private Sector Innovation',
        'creative': 'Creative Collaborations',
        'other': 'Other Opportunities'
    };
    return interests[value] || value;
}

function sendViaMailto(emailParams) {
    const to = emailParams.to_email || 'hello@quintec.com';
    const form = document.getElementById('contact-form');
    const submitButton = form ? form.querySelector('button[type="submit"]') : null;
    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
        submitButton.textContent = 'Opening email...';
        submitButton.disabled = true;
    }

    const subject = encodeURIComponent(`BD inquiry from ${emailParams.from_name}`);
    const body = encodeURIComponent(
        `Name: ${emailParams.from_name}\n` +
        `Email: ${emailParams.from_email}\n` +
        `Organization: ${emailParams.organization}\n\n` +
        `Opportunity / market:\n${emailParams.message}\n\n` +
        `---\nSent from Quintessence LLC website contact form`
    );

    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;

    // Same approach as tradina.com — open the visitor's mail app
    window.location.href = mailtoLink;

    setTimeout(() => {
        if (submitButton) {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
        showNotification('Email client opened! Please send the email from your email app.', 'success');
        if (form) form.reset();
    }, 1000);
}

function showNotification(message, type = 'success') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles with energy and resilience-themed colors
    const bgColor = type === 'success' ? '#38b2ac' : 
                   type === 'error' ? '#e53e3e' : 
                   type === 'info' ? '#3182ce' : '#38b2ac';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1.2rem 1.8rem;
        border-radius: 12px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s ease;
        max-width: 450px;
        font-family: 'Inter', sans-serif;
        border-left: 4px solid rgba(255, 255, 255, 0.4);
        backdrop-filter: blur(10px);
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
        line-height: 1.5;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        opacity: 0.8;
        transition: opacity 0.3s ease;
        margin-top: -2px;
        flex-shrink: 0;
    `;
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        this.style.transform = 'scale(1.1)';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.opacity = '0.8';
        this.style.transform = 'scale(1)';
    });
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    closeButton.addEventListener('click', function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 400);
    });
    
    // Auto close after duration based on message length and type
    const baseDuration = type === 'success' ? 7000 : type === 'error' ? 6000 : 5000;
    const duration = Math.max(baseDuration, message.length * 50);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 400);
        }
    }, duration);
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Set initial body opacity
document.body.style.opacity = '0'; 