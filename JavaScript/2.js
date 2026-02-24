        // 获取返回顶部按钮元素
        const backToTopBtn = document.getElementById('backToTopBtn');

        // 监听页面滚动事件
        window.addEventListener('scroll', function () {
            if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
                // 当页面滚动超过200px时显示按钮
                backToTopBtn.style.display = 'block';
            } else {
                // 否则隐藏按钮
                backToTopBtn.style.display = 'none';
            }
        });

        // 给返回顶部按钮添加点击事件监听器
        backToTopBtn.addEventListener('click', function () {
            // 实现页面平滑滚动到顶部，使用了window.scrollTo方法，第一个参数是水平滚动位置（这里设为0），第二个参数是垂直滚动位置（设为0即顶部）
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        