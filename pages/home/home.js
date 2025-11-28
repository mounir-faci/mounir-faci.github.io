// Recommendations Slider
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.recommendations-slider');
    if (!slider) return;

    const wrapper = slider.querySelector('.slider-wrapper');
    const slides = slider.querySelectorAll('.slide');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    const dotsContainer = slider.querySelector('.slider-dots');

    let currentIndex = 1;
    const totalSlides = slides.length;
    let isTransitioning = false;

    // Clone first and last slides for infinite loop
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);
    
    wrapper.appendChild(firstClone);
    wrapper.insertBefore(lastClone, slides[0]);

    // Update slides reference after cloning
    const allSlides = wrapper.querySelectorAll('.slide');
    currentIndex = 1; // Start at first real slide (after clone)

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index + 1));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    // Set initial position and active slide
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    allSlides[currentIndex].classList.add('active');

    function updateSlider(transition = true) {
        if (transition) {
            wrapper.style.transition = 'transform 0.5s ease-in-out';
        } else {
            wrapper.style.transition = 'none';
        }
        
        wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots (map to real slide index)
        const realIndex = ((currentIndex - 1) % totalSlides + totalSlides) % totalSlides;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === realIndex);
        });
        
        // Update active slide
        allSlides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateSlider();
    }

    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex--;
        updateSlider();
    }

    // Handle infinite loop jump
    wrapper.addEventListener('transitionend', () => {
        isTransitioning = false;
        
        if (currentIndex === 0) {
            currentIndex = totalSlides;
            updateSlider(false);
        }
        
        if (currentIndex === totalSlides + 1) {
            currentIndex = 1;
            updateSlider(false);
        }
    });

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Auto-play
    let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    slider.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(nextSlide, 5000);
    });

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
        }
        if (touchEndX > touchStartX + 50) {
            prevSlide();
        }
    }
});
