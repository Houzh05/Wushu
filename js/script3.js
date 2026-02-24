document.addEventListener('DOMContentLoaded', function() {
    // 获取粒子容器
    const container = document.getElementById("particles-container");
    if (!container) return; // 确保容器存在
    
    // 创建canvas元素
    let canvas = document.createElement("canvas");
    canvas.style.display = "block"; // 确保显示
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    
    let ctx = canvas.getContext("2d");
    container.appendChild(canvas);

    let particles = [];
    let pcount = 150; // 增加粒子数量
    let actions = ["right", "up", "left", "down", "around"];
    let action = 0;

    // 点击粒子容器切换动作
    container.addEventListener("click", function() {
        action++;
        action = action % actions.length;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = Math.random() * 0.8 + 0.2; // 增加速度变化范围
            this.size = Math.random() * 2 + 1; // 随机粒子大小
            this.color = `rgba(${Math.random() > 0.5 ? 218 : 200}, ${
                Math.random() > 0.5 ? 165 : 120
            }, ${Math.random() > 0.5 ? 32 : 50}, ${Math.random() * 0.8 + 0.2})`;
        }

        update() {
            switch (actions[action]) {
                case "right":
                    this.x += this.vx * 3;
                    if (this.x > canvas.width) this.x = 0;
                    break;
                case "left":
                    this.x -= this.vx * 3;
                    if (this.x < 0) this.x = canvas.width;
                    break;
                case "up":
                    this.y -= this.vx * 3;
                    if (this.y < 0) this.y = canvas.height;
                    break;
                case "down":
                    this.y += this.vx * 3;
                    if (this.y > canvas.height) this.y = 0;
                    break;
                case "around":
                    let deg = Math.atan2((this.y - canvas.height / 2), (this.x - canvas.width / 2));
                    let r = Math.sqrt(Math.pow(this.x - canvas.width / 2, 2) + Math.pow(this.y - canvas.height / 2, 2));
                    this.x = r * Math.cos(deg + this.vx / 100) + canvas.width / 2;
                    this.y = r * Math.sin(deg + this.vx / 100) + canvas.height / 2;
                    break;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    // 窗口大小调整处理
    function handleResize() {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        
        // 重置所有粒子位置
        particles.forEach(p => {
            p.x = Math.random() * canvas.width;
            p.y = Math.random() * canvas.height;
        });
    }
    
    window.onresize = handleResize;

    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 动态调整粒子数量
        const targetCount = Math.floor((canvas.width * canvas.height) / 1000);
        pcount = Math.min(Math.max(targetCount, 100), 300);
        
        // 添加或移除粒子
        while (particles.length < pcount) {
            particles.push(new Particle());
        }
        while (particles.length > pcount) {
            particles.pop();
        }
        
        // 更新和绘制粒子
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }

    // 初始化粒子
    for (let i = 0; i < pcount; i++) {
        particles.push(new Particle());
    }
    
    // 启动动画
    animate();
});
