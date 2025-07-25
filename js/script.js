document.addEventListener('DOMContentLoaded', function() {
    // تنشيط القوائم المتنقلة للهواتف
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navUl = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navUl.classList.remove('show');
        });
    });
    
    // وظيفة الشرائح المنزلقة العامة
    function setupSlider(sliderClass) {
        const slider = document.querySelector(`.${sliderClass} .slider-container`);
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
        
        nextBtn.addEventListener('click', nextImage);
        prevBtn.addEventListener('click', prevImage);
        
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
    
    // تهيئة جميع الشرائح
    setupSlider('image-slider');
    setupSlider('documents-slider');
    setupSlider('accreditation-slider');
    
    // تأثير التمرير السلس عند النقر على روابط القائمة
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
    
    // إضافة تأثير التحميل للصفحة (اختياري)
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    function adjustSliderHeight() {
    const sliders = document.querySelectorAll('.image-slider, .documents-slider, .accreditation-slider');
    
    sliders.forEach(slider => {
        if (window.innerWidth <= 992) {
            // على الهاتف، نجعل الارتفاع متناسب مع العرض
            const width = slider.offsetWidth;
            slider.style.height = `${width * 0.75}px`;
        } else {
            // على الكمبيوتر، نعيد الارتفاع الأصلي
            if (slider.classList.contains('image-slider')) {
                slider.style.height = '400px';
            } else {
                slider.style.height = '600px';
            }
        }
    });
    }

    // نستدعي الوظيفة عند التحميل وعند تغيير حجم النافذة
    window.addEventListener('load', adjustSliderHeight);
    window.addEventListener('resize', adjustSliderHeight);
});
