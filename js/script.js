document.addEventListener('DOMContentLoaded', function() {
    // تنشيط القائمة المتنقلة من v2
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // تغيير لون الشريط العلوي عند التمرير من v2
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // السلايدر الرئيسي من v2 - محدث
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;

    // إنشاء نقاط السلايدر
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // السلايدر التلقائي
    let slideInterval = setInterval(nextSlide, 5000);

    function goToSlide(index) {
        clearInterval(slideInterval);
        showSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // أزرار التحكم في السلايدر - مُصلحة
    const nextBtn = document.querySelector('.hero-section .next-btn');
    const prevBtn = document.querySelector('.hero-section .prev-btn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // عرض السلايد الأول عند التحميل
    showSlide(currentSlide);

    // إصلاح أزرار السلايدر - كل زر يؤدي لوظيفته الصحيحة
    function setupSlideButtons() {
        slides.forEach((slide, index) => {
            const slideButton = slide.querySelector('.btn');
            if (slideButton) {
                slideButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }

    // تطبيق الأزرار
    setupSlideButtons();
    
    // وظيفة الشرائح المنزلقة العامة من v1
    function setupSlider(sliderClass) {
        const slider = document.querySelector(`.${sliderClass} .slider-container`);
        if (!slider) return;
        
        const images = slider.querySelectorAll('img');
        const prevBtn = document.querySelector(`.${sliderClass} .prev`);
        const nextBtn = document.querySelector(`.${sliderClass} .next`);
        
        let currentIndex = 0;
        
        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }
        
        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }
        
        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }
        
        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', nextImage);
            prevBtn.addEventListener('click', prevImage);
        }
        
        // التمرير التلقائي (اختياري)
        let slideInterval = setInterval(nextImage, 5000);
        
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextImage, 5000);
        });
        
        // عرض الصورة الأولى عند التحميل
        showImage(currentIndex);
    }
    
    // تهيئة جميع الشرائح من v1
    setupSlider('image-slider');
    setupSlider('documents-slider');
    setupSlider('accreditation-slider');
    
    // تأثير التمرير السلس عند النقر على روابط القائمة من v1
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // إضافة تأثير التحميل للصفحة (اختياري) من v1
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // ضبط ارتفاع السلايدر من v1
    function adjustSliderHeight() {
        const sliders = document.querySelectorAll('.image-slider, .documents-slider, .accreditation-slider');
        
        sliders.forEach(slider => {
            if (window.innerWidth <= 992) {
                const width = slider.offsetWidth;
                slider.style.height = `${width * 0.75}px`;
            } else {
                if (slider.classList.contains('image-slider')) {
                    slider.style.height = '400px';
                } else {
                    slider.style.height = '600px';
                }
            }
        });
    }
    
    window.addEventListener('load', adjustSliderHeight);
    window.addEventListener('resize', adjustSliderHeight);
    
    // إضافة النشط للرابط الحالي من v2
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});