// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
    
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
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Enhanced form handling with EmailJS
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[name="name"]').value;
            const email = this.querySelector('input[name="email"]').value;
            const organization = this.querySelector('input[name="organization"]').value;
            const message = this.querySelector('textarea[name="message"]').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show sending notification
            showNotification('Sending message across the Pacific...', 'info');
            
            // Prepare email parameters
            const emailParams = {
                from_name: name,
                from_email: email,
                organization: organization || 'Not specified',
                message: message,
                to_email: 'hello@quintessence.llc'
            };
            
            // Try to send email via EmailJS (if configured)
            if (typeof emailjs !== 'undefined' && emailjs.send) {
                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', emailParams)
                    .then(function(response) {
                        showNotification('Aloha! Your message has been sent successfully. We\'ll connect with you soon across the Pacific!', 'success');
                        contactForm.reset();
                    })
                    .catch(function(error) {
                        console.log('EmailJS Error:', error);
                        // Fallback to mailto
                        sendViaMailto(emailParams);
                    });
            } else {
                // Fallback to mailto if EmailJS is not available
                sendViaMailto(emailParams);
            }
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

    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
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
            showNotification('Pacific venture details coming soon! Stay tuned for updates.', 'info');
        });
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sendViaMailto(emailParams) {
    const subject = encodeURIComponent(`Pacific Connection from ${emailParams.from_name}`);
    const body = encodeURIComponent(`
Name: ${emailParams.from_name}
Email: ${emailParams.from_email}
Organization: ${emailParams.organization}

Message:
${emailParams.message}

---
Sent via Quintessence LLC Pacific Bridge Contact Form
`);
    
    const mailtoLink = `mailto:hello@quintessence.llc?subject=${subject}&body=${body}`;
    
    try {
        window.location.href = mailtoLink;
        showNotification('Opening your email client to send the message...', 'success');
        document.getElementById('contact-form').reset();
    } catch (error) {
        showNotification('Unable to open email client. Please send your message directly to hello@quintessence.llc', 'error');
    }
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
    
    // Add styles with Pacific-themed colors
    const bgColor = type === 'success' ? '#38b2ac' : 
                   type === 'error' ? '#e53e3e' : 
                   type === 'info' ? '#3182ce' : '#38b2ac';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
        border-left: 4px solid rgba(255, 255, 255, 0.3);
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
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
    `;
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.opacity = '0.8';
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
        }, 300);
    });
    
    // Auto close after duration based on message length
    const duration = Math.max(5000, message.length * 50);
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
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