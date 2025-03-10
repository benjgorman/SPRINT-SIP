// This file contains the main JavaScript functionality for the website.

document.addEventListener('DOMContentLoaded', function() {
    // Accessible Buy Buttons
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            const productName = this.closest('.product').querySelector('.product-name').textContent;
            const notification = document.createElement('div');
            notification.setAttribute('role', 'status');
            notification.setAttribute('aria-live', 'polite');
            notification.className = 'notification';
            notification.textContent = productName + ' added to cart!';
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        });
    });

    // Accessible Image Slider
    const sliderImages = document.querySelectorAll('.slider-image');
    let currentImageIndex = 0;
    
    if (sliderImages.length > 0) {
        const prevButton = document.querySelector('.prev-button');
        const nextButton = document.querySelector('.next-button');
        
        function showImage(index) {
            sliderImages.forEach(img => img.classList.remove('active'));
            sliderImages[index].classList.add('active');
            
            // Announce image change for screen readers
            const liveRegion = document.querySelector('.slider-live-region') || createLiveRegion();
            liveRegion.textContent = `Image ${index + 1} of ${sliderImages.length}: ${sliderImages[index].alt}`;
        }
        
        function createLiveRegion() {
            const region = document.createElement('div');
            region.className = 'slider-live-region sr-only';
            region.setAttribute('aria-live', 'polite');
            document.querySelector('.image-slider').appendChild(region);
            return region;
        }
        
        function showPrevImage() {
            currentImageIndex = (currentImageIndex - 1 + sliderImages.length) % sliderImages.length;
            showImage(currentImageIndex);
        }
        
        function showNextImage() {
            currentImageIndex = (currentImageIndex + 1) % sliderImages.length;
            showImage(currentImageIndex);
        }
        
        if (prevButton) prevButton.addEventListener('click', showPrevImage);
        if (nextButton) nextButton.addEventListener('click', showNextImage);
        
        // Keyboard navigation for slider
        document.querySelector('.image-slider').addEventListener('keydown', function(event) {
            if (event.key === 'ArrowLeft') {
                showPrevImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            }
        });
        
        // Auto rotation with pause on hover/focus
        let autoRotation = setInterval(showNextImage, 5000);
        
        const slider = document.querySelector('.image-slider');
        
        function pauseAutoRotation() {
            clearInterval(autoRotation);
        }
        
        function resumeAutoRotation() {
            autoRotation = setInterval(showNextImage, 5000);
        }
        
        slider.addEventListener('mouseenter', pauseAutoRotation);
        slider.addEventListener('mouseleave', resumeAutoRotation);
        slider.addEventListener('focusin', pauseAutoRotation);
        slider.addEventListener('focusout', resumeAutoRotation);
    }

    // Accessible Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            
            if (expanded) {
                navMenu.classList.remove('active');
                this.setAttribute('aria-expanded', 'false');
            } else {
                navMenu.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && 
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when pressing Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.focus();
            }
        });
    }

    // Accessible Newsletter Modal
    const modal = document.getElementById('newsletter-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modal && modalClose) {
        // Show modal after delay but allow it to be dismissed
        setTimeout(function() {
            modal.removeAttribute('hidden');
            
            // Focus trap for modal
            const focusableElements = modal.querySelectorAll('button, input, a');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            firstElement.focus();
            
            modal.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    closeModal();
                } else if (event.key === 'Tab') {
                    if (event.shiftKey && document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    } else if (!event.shiftKey && document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }, 5000);
        
        function closeModal() {
            modal.setAttribute('hidden', 'true');
        }
        
        modalClose.addEventListener('click', closeModal);
        
        // Also close when clicking outside modal content
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});