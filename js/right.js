document.addEventListener('DOMContentLoaded', function() {
    /* ====================== 轮播图功能 ====================== */
    // 轮播图控制器
    let currentIndex = 0;
    let timer;
    
    // 获取DOM元素
    const leftItems = document.querySelectorAll('.swiper-left .swiperItem');
    const rightItems = document.querySelectorAll('.swiper-right .swiperItems');
    const points = document.querySelectorAll('.points a');
    const marks = document.querySelectorAll('.timeline-marks .mark');
    
    // 轮播项总数
    const totalItems = leftItems.length;
    
    // 切换轮播图的函数
    function changeSlide(targetIndex) {
        // 边界检查
        if (targetIndex < 0) targetIndex = totalItems - 1;
        if (targetIndex >= totalItems) targetIndex = 0;
        
        // 更新当前索引
        currentIndex = targetIndex;
        
        // 计算上一个和下一个索引
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
        const nextIndex = (currentIndex + 1) % totalItems;
        
        // 重置所有轮播项的类名
        leftItems.forEach(item => {
            item.className = 'swiperItem def';
        });
        
        rightItems.forEach(item => {
            item.className = 'swiperItems def';
        });
        
        // 更新左侧轮播图状态
        if (leftItems[prevIndex]) leftItems[prevIndex].className = 'swiperItem a';
        if (leftItems[currentIndex]) leftItems[currentIndex].className = 'swiperItem b';
        if (leftItems[nextIndex]) leftItems[nextIndex].className = 'swiperItem c';
        
        // 更新右侧轮播图状态
        if (rightItems[prevIndex]) rightItems[prevIndex].className = 'swiperItems a';
        if (rightItems[currentIndex]) rightItems[currentIndex].className = 'swiperItems b';
        if (rightItems[nextIndex]) rightItems[nextIndex].className = 'swiperItems c';
        
        // 更新指示点状态
        points.forEach((point, index) => {
            if (point) {
                point.classList.toggle('show', index === currentIndex);
            }
        });
        
        // 更新时间轴标记状态
        marks.forEach((mark, index) => {
            if (mark) {
                mark.classList.toggle('active', index === currentIndex);
            }
        });
    }
    
    function autoPlay() {
        clearInterval(timer);
        timer = setInterval(() => {
            // 直接调用changeSlide处理边界
            changeSlide(currentIndex + 1);
        }, 4000);
    }

    // 设置指示点点击事件
    points.forEach((point, index) => {
        if (point) {
            point.addEventListener('click', function(e) {
                e.preventDefault();
                clearInterval(timer);
                changeSlide(index);
                autoPlay();
            });
        }
    });
    
    // 设置时间轴标记点击事件
    marks.forEach((mark, index) => {
        if (mark) {
            mark.addEventListener('click', function() {
                clearInterval(timer);
                changeSlide(index);
                autoPlay();
            });
        }
    });
    
    // 初始化轮播图
    changeSlide(0);
    
    // 启动自动轮播
    autoPlay();
    
    // 悬停暂停功能
    const swiperContainer = document.querySelector('.swiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', () => {
            clearInterval(timer);
        });
        
        swiperContainer.addEventListener('mouseleave', () => {
            autoPlay();
        });
    }
    
    /* ====================== 粒子效果 ====================== */
    // 创建粒子画布
    let canvas = document.createElement("canvas");
    canvas.id = "particle-canvas";
    document.body.prepend(canvas);
    
    // 设置画布样式
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1"; // 确保在背景之下
    canvas.style.pointerEvents = "none"; // 允许鼠标事件穿透
    
    // 设置画布尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext("2d");
    
    // 粒子系统
    let particles = [];
    let pcount = 180; // 粒子数量
    let actions = ["right", "up", "left", "down", "around"];
    let action = 0;
    
    // 点击切换粒子运动模式
    document.body.addEventListener("click", function() {
        action++;
        action = action % actions.length;
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = 0.3 + Math.random() * 0.9; // 速度范围0.2-1.0
            this.size = 1 + this.vx * 2; // 粒子大小基于速度
        }
    
        update() {
            switch (actions[action]) {
                case "right":
                    this.x += this.vx * 0.8;
                    if (this.x > canvas.width) this.x = 0;
                    break;
                case "left":
                    this.x -= this.vx * 0.8;
                    if (this.x < 0) this.x = canvas.width;
                    break;
                case "up":
                    this.y -= this.vx * 0.8;
                    if (this.y < 0) this.y = canvas.height;
                    break;
                case "down":
                    this.y += this.vx * 0.8;
                    if (this.y > canvas.height) this.y = 0;
                    break;
                case "around":
                    let deg = Math.atan2((this.y - canvas.height / 2), (this.x - canvas.width / 2));
                    let r = Math.sqrt(Math.pow(this.x - canvas.width / 2, 2) + Math.pow(this.y - canvas.height / 2, 2));
                    this.x = r * Math.cos(deg + this.vx / 200) + canvas.width / 2;
                    this.y = r * Math.sin(deg + this.vx / 200) + canvas.height / 2;
                    break;
            }
        }
    
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // 使用金色主题色 (230, 184, 0)
            ctx.fillStyle = `rgba(230, 184, 0, ${0.3 * this.vx})`;
            ctx.fill();
        }
    }
    
    // 窗口大小调整处理
    window.onresize = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    // 动画循环
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (particles.length < pcount) {
            particles.push(new Particle());
        }
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    // 初始化粒子
    for (let i = 0; i < pcount; i++) {
        particles.push(new Particle());
    }
    
    // 启动动画
    animateParticles();
});
