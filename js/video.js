// 武术课程视频轮播控制器
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const carousel = document.querySelector('.video-carousel');
    const carouselContainer = document.querySelector('.video-carousel-container');
    const videoItems = document.querySelectorAll('.video-item');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    const indicators = document.querySelectorAll('.indicator');
    const videoPlayerContainer = document.querySelector('.video-player-container');
    const videoPlayer = document.getElementById('video-player');
    const closeBtn = document.querySelector('.close-player');
    
    // 轮播相关变量
    let currentPosition = 0;
    let slidesVisible = 4; // 默认显示4张
    let autoSlideInterval;
    let isDragging = false;
    let startPosX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    
    // 响应式调整显示数量
    function updateSlidesVisible() {
        if (window.innerWidth >= 992) {
            slidesVisible = 4;
        } else if (window.innerWidth >= 768) {
            slidesVisible = 3;
        } else if (window.innerWidth >= 576) {
            slidesVisible = 2;
        } else {
            slidesVisible = 1;
        }
        
        // 重置位置
        moveToPosition(0);
        updateIndicators();
    }
    
    // 移动轮播轨道
    function moveToPosition(position) {
        // 计算最大可移动位置
        const maxPosition = (videoItems.length - slidesVisible) * (100 / slidesVisible);
        
        // 确保位置在有效范围内
        currentPosition = Math.max(0, Math.min(position, maxPosition));
        
        // 应用变换
        carousel.style.transform = `translateX(-${currentPosition}%)`;
        
        // 更新指示器
        updateIndicators();
    }
    
    // 更新指示器状态
    function updateIndicators() {
        const activeIndex = Math.floor((currentPosition * slidesVisible) / 100);
        indicators.forEach((indicator, index) => {
            if (index === activeIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // 导航到下一个位置
    function nextSlide() {
        const maxPosition = (videoItems.length - slidesVisible) * (100 / slidesVisible);
        let newPosition = currentPosition + (100 / slidesVisible);
        
        if (newPosition > maxPosition) {
            newPosition = 0; // 循环到开头
        }
        
        moveToPosition(newPosition);
    }
    
    // 导航到上一个位置
    function prevSlide() {
        const maxPosition = (videoItems.length - slidesVisible) * (100 / slidesVisible);
        let newPosition = currentPosition - (100 / slidesVisible);
        
        if (newPosition < 0) {
            newPosition = maxPosition; // 循环到结尾
        }
        
        moveToPosition(newPosition);
    }
    
    // 启动自动轮播
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 3000); // 每5秒切换一次
    }
    
    // 停止自动轮播
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // 视频播放功能
    function openVideoPlayer(videoId) {
        // 模拟不同的视频源
        const videoSources = {
            1: './video/video_1.mp4',
            2: './video/video_2.mp4',
            3: './video/video_3.mp4',
            4: './video/video_4.mp4',
            5: './video/video_5.mp4',
            6: './video/video_6.mp4',
            7: './video/video_7.mp4',
            8: './video/video_8.mp4'
        };
        
        if (videoSources[videoId]) {
            videoPlayer.src = videoSources[videoId];
            videoPlayerContainer.classList.add('active');
            stopAutoSlide(); // 播放视频时暂停轮播
            
            // 延迟播放确保视频加载
            setTimeout(() => {
                videoPlayer.play().catch(e => console.log('视频播放失败:', e));
            }, 300);
        }
    }
    
    // 关闭视频播放器
    function closeVideoPlayer() {
        videoPlayer.pause();
        videoPlayerContainer.classList.remove('active');
        videoPlayer.src = '';
        startAutoSlide(); // 关闭视频后恢复轮播
    }
    
    // 触摸/拖动交互功能
    function setupDragInteraction() {
        // 触摸事件
        carousel.addEventListener('touchstart', handleTouchStart);
        carousel.addEventListener('touchmove', handleTouchMove);
        carousel.addEventListener('touchend', handleTouchEnd);
        
        // 鼠标事件
        carousel.addEventListener('mousedown', handleMouseDown);
        carousel.addEventListener('mousemove', handleMouseMove);
        carousel.addEventListener('mouseup', handleMouseEnd);
        carousel.addEventListener('mouseleave', handleMouseEnd);
    }
    
    // 触摸开始
    function handleTouchStart(e) {
        startPosX = e.touches[0].clientX;
        isDragging = true;
        stopAutoSlide();
    }
    
    // 触摸移动
    function handleTouchMove(e) {
        if (!isDragging) return;
        const currentPosX = e.touches[0].clientX;
        const diffX = currentPosX - startPosX;
        
        // 应用拖动效果
        currentTranslate = prevTranslate + diffX / (carouselContainer.clientWidth / slidesVisible);
        carousel.style.transform = `translateX(calc(-${currentPosition}% + ${currentTranslate}px))`;
    }
    
    // 触摸结束
    function handleTouchEnd() {
        if (!isDragging) return;
        isDragging = false;
        
        // 计算滑动方向
        const threshold = carouselContainer.clientWidth * 0.1; // 10%阈值
        if (Math.abs(currentTranslate) > threshold) {
            if (currentTranslate > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        // 复位
        prevTranslate = 0;
        currentTranslate = 0;
        carousel.style.transform = `translateX(-${currentPosition}%)`;
        startAutoSlide();
    }
    
    // 鼠标按下
    function handleMouseDown(e) {
        startPosX = e.clientX;
        isDragging = true;
        stopAutoSlide();
        carousel.style.cursor = 'grabbing';
        carousel.style.transition = 'none';
    }
    
    // 鼠标移动
    function handleMouseMove(e) {
        if (!isDragging) return;
        const currentPosX = e.clientX;
        const diffX = currentPosX - startPosX;
        
        // 应用拖动效果
        currentTranslate = prevTranslate + diffX / (carouselContainer.clientWidth / slidesVisible);
        carousel.style.transform = `translateX(calc(-${currentPosition}% + ${currentTranslate}px))`;
    }
    
    // 鼠标释放/离开
    function handleMouseEnd() {
        if (!isDragging) return;
        isDragging = false;
        carousel.style.cursor = 'grab';
        carousel.style.transition = '';
        
        // 计算拖动方向
        const threshold = carouselContainer.clientWidth * 0.1; // 10%阈值
        if (Math.abs(currentTranslate) > threshold) {
            if (currentTranslate > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        // 复位
        prevTranslate = 0;
        currentTranslate = 0;
        carousel.style.transform = `translateX(-${currentPosition}%)`;
        startAutoSlide();
    }
    
    // 事件监听器
    function setupEventListeners() {
        // 导航按钮
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
        
        // 指示器点击
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                stopAutoSlide();
                moveToPosition(index * (100 / slidesVisible));
                startAutoSlide();
            });
        });
        
        // 视频项目点击
        videoItems.forEach(item => {
            item.addEventListener('click', function() {
                const videoId = this.getAttribute('data-video');
                openVideoPlayer(videoId);
            });
        });
        
        // 关闭视频按钮
        closeBtn.addEventListener('click', closeVideoPlayer);
        
        // 点击视频播放器外部区域关闭
        videoPlayerContainer.addEventListener('click', function(e) {
            if (e.target === this) {
                closeVideoPlayer();
            }
        });
        
        // 按ESC键关闭视频播放器
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoPlayerContainer.classList.contains('active')) {
                closeVideoPlayer();
            }
        });
        
        // 鼠标悬停暂停轮播
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
        
        // 窗口大小变化时更新
        window.addEventListener('resize', updateSlidesVisible);
    }
    
    // 初始化指示器data-index属性
    function initIndicators() {
        indicators.forEach((indicator, index) => {
            indicator.setAttribute('data-index', index);
        });
    }
    
    // 初始化函数
    function init() {
        initIndicators();
        setupDragInteraction();
        setupEventListeners();
        updateSlidesVisible();
        startAutoSlide();
    }
    
    // 初始化组件
    init();
});
