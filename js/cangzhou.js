// 沧州武术数据和坐标
const martialArtsData = {
    '新华区': {
        intro: '武术交流中心，代表性拳种：六合拳、燕青拳、劈挂拳、八极拳(吴氏)',
        img: './images/map1.jpg',
 
    },
    '运河区': {
        intro: '武术交流中心，代表性拳种：六合拳、燕青拳、劈挂拳、八极拳(吴氏)',
        img: './images/map2.jpg',
       
    },
    '泊头市': {
        intro: '六合拳重要传承地(尹家桥)，八极拳(吴氏)',
        img: './images/map3.jpg',
       
    },
    '任丘市': {
        intro: '北派翻子拳主要流传地(东凉、西凉)，动作迅猛刚脆',
        img: './images/map4.jpg',

    },
    '黄骅市': {
        intro: '通臂拳(白猿通臂为主)传承地，太祖拳流传',
        img: './images/map5.jpg',
      
    },
    '河间市': {
        intro: '花拳影响较大，风格舒展美观，戳脚传承',
        img: './images/map6.jpg',
     
    },
    '沧县': {
        intro: '劈挂拳发源地(大褚村)，燕青拳盛行(北陈屯)',
        img: './images/map7.jpg',
        
    },
    '青县': {
        intro: '戳脚重要流传地(马厂)，八极拳(罗疃系)根基深厚',
        img: './images/map8.jpg',
        
    },
    '东光县': {
        intro: '八卦掌传承有序(找王)，查滑拳影响',
        img: './images/map9.jpg',
   
    },
    '海兴县': {
        intro: '八极拳(罗疃系)重要传承区(赵毛陶)，太祖拳流传',
        img: './images/map10.jpg',
    
    },
    '盐山县': {
        intro: '左把大奇枪(疯魔棍)著名，劈挂拳流传',
        img: './images/map11.jpg',
        
    },
    '肃宁县': {
        intro: '八卦掌传承较好(梁家村镇)',
        img: './images/map12.jpg',
      
    },
    '南皮县': {
        intro: '唐拳(唐传拳术)代表(鲍官屯)，八极拳(吴氏)',
        img: './images/map13.jpg',
        
    },
    '吴桥县': {
        intro: '六合拳、太祖拳流传，武术基础深厚',
        img: './images/map14.jpg',
       
    },
    '献县': {
        intro: '太极拳(陈氏、杨氏)普及，形意拳流传',
        img: './images/map15.jpg',
   
    },
    '孟村回族自治县': {
        intro: '八极拳发源地(孟村镇)，享誉海内外',
        img: './images/map16.jpg',
      
    }
};

// 沧州区县坐标数据
const districtCoords = {
    '新华区': [116.87, 38.32],
    '运河区': [116.83, 38.31],
    '泊头市': [116.57, 38.08],
    '任丘市': [116.10, 38.72],
    '黄骅市': [117.35, 38.37],
    '河间市': [116.08, 38.43],
    '沧县': [117.00, 38.15],
    '青县': [116.83, 38.58],
    '东光县': [116.53, 37.89],
    '海兴县': [117.50, 38.13],
    '盐山县': [117.22, 38.06],
    '肃宁县': [115.83, 38.43],
    '南皮县': [116.70, 38.04],
    '吴桥县': [116.38, 37.62],
    '献县': [116.12, 38.19],
    '孟村回族自治县': [117.10, 38.07]
};

// 武术传承指数数据
const districtData = [
    {name: '新华区', value: 96},
    {name: '运河区', value: 92},
    {name: '泊头市', value: 94},
    {name: '任丘市', value: 89},
    {name: '黄骅市', value: 85},
    {name: '河间市', value: 87},
    {name: '沧县', value: 98},
    {name: '青县', value: 90},
    {name: '东光县', value: 82},
    {name: '海兴县', value: 79},
    {name: '盐山县', value: 84},
    {name: '肃宁县', value: 83},
    {name: '南皮县', value: 86},
    {name: '吴桥县', value: 88},
    {name: '献县', value: 85},
    {name: '孟村回族自治县', value: 99}
];
const fontStyle = document.createElement('style');
fontStyle.textContent = `
    @font-face {
        font-family: 'zhangcao';
        src: url('../font/逍遥.ttf') format('truetype');
    }
`;
document.head.appendChild(fontStyle);

// 初始化ECharts实例
var myChart = echarts.init(document.getElementById('map_1'));
var loadingElement = document.getElementById('loading');

// 固定缩放值和中心点
const FIXED_ZOOM = 1.25;
const FIXED_CENTER = [116.77, 38.218];

// 自动轮播相关变量
let currentIndex = 0;
let autoShowTimer = null;

// 创建自定义提示框容器
const tooltipContainer = document.createElement('div');
tooltipContainer.id = 'martial-tooltip';
tooltipContainer.style.cssText = `
    
`;

// 创建武术门派容器
const schoolContainer = document.createElement('div');
schoolContainer.id = 'martial-school';
schoolContainer.style.cssText = `
  
`;

// 将提示框添加到地图容器内
const mapContainer = document.getElementById('map_1');
if (mapContainer) {
    mapContainer.appendChild(tooltipContainer);
    mapContainer.appendChild(schoolContainer);
}

// 初始化轮播图
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const districtTitles = document.querySelectorAll('.carousel-district');
const districtTexts = document.querySelectorAll('.carousel-text');

let currentSlide = 0;
const districts = Object.keys(martialArtsData);

// 初始化轮播图内容
function initializeCarousel() {
    districts.forEach((district, index) => {
        districtTitles[index].textContent = district;
        districtTexts[index].textContent = martialArtsData[district].intro;
    });
}

// 显示当前幻灯片
function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentSlide = index;
}

// 下一个幻灯片
function nextSlide() {
    let newIndex = (currentSlide + 1) % slides.length;
    showSlide(newIndex);
    
    // 同步地图高亮
    const districtName = districts[newIndex];
    highlightDistrict(districtName);
}

// 上一个幻灯片
function prevSlide() {
    let newIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(newIndex);
    
    // 同步地图高亮
    const districtName = districts[newIndex];
    highlightDistrict(districtName);
}

// 显示武术门派
function showMartialSchool(districtName) {
    const schools = martialArtsData[districtName].school;
    if (!schools) return;
    
    // 创建内容HTML
    schoolContainer.innerHTML = `
        <div style="font-size:20px; font-weight:bold; color:rgb(255, 165, 0); 
                   margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgb(93, 64, 55);">
            ${districtName}武术门派
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; max-height: 280px; overflow-y: auto;">
            ${schools.map(school => `
                <div style="background: rgba(139, 69, 19, 0.6); 
                            padding: 6px 12px; 
                            border-radius: 16px; 
                            font-size: 14px;">
                    ${school}
                </div>
            `).join('')}
        </div>
    `;
    
    schoolContainer.style.display = 'block';
    setTimeout(() => {
        schoolContainer.style.opacity = 1;
    }, 10);
}

// 更新提示框位置
function updateTooltipPosition() {
    const mapRect = mapContainer.getBoundingClientRect();
    tooltipContainer.style.bottom = '10px';
    tooltipContainer.style.right = '10px';
}

// 显示自定义提示框
function showCustomTooltip(districtName) {
    const data = martialArtsData[districtName];
    if (!data) return;
    
    const district = districtData.find(d => d.name === districtName);
    const value = district ? district.value : '暂无数据';
    
    // 创建内容HTML
    tooltipContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; border-bottom: 1px solid rgb(93, 64, 55); padding-bottom: 8px;">
            <div style="font-size:22px; font-weight:bold; color:rgb(255, 165, 0); text-shadow: 1px 1px 2px rgb(0, 0, 0);">
                ${districtName}
            </div>
            <div style="font-size:16px; background: rgba(139, 69, 19, 0.6); padding: 4px 12px; border-radius: 16px;">
                传承指数: <strong style="color:rgb(255, 215, 0); font-size: 18px;">${value}</strong>
            </div>
        </div>
        <div style="display: flex; gap: 15px; height: 150px;">
            <img src="${data.img}" alt="${districtName}武术" 
                 style="width:140px; height:140px; object-fit: cover; border-radius:6px; border:2px solid rgb(139, 69, 19); box-shadow: 0 2px 6px rgba(0,0,0,0.4);">
            <div style="flex:1; font-size:15px; line-height:1.6; overflow-y: auto; padding-right: 5px;">
                ${data.intro}
            </div>
        </div>
        <div style="text-align:right; font-size:12px; font-style:italic; color:rgb(136, 136, 136); position: absolute; bottom: 5px; right: 15px;">
            ${districtName}武学传承
        </div>
    `;
    
    // 更新位置并显示提示框
    updateTooltipPosition();
    tooltipContainer.style.display = 'block';
    
    // 淡入效果
    setTimeout(() => {
        tooltipContainer.style.opacity = 1;
    }, 10);
    
    // 显示武术门派
    showMartialSchool(districtName);
}

// 隐藏自定义提示框
function hideCustomTooltip() {
    tooltipContainer.style.opacity = 0;
    schoolContainer.style.opacity = 0;
    
    setTimeout(() => {
        tooltipContainer.style.display = 'none';
        schoolContainer.style.display = 'none';
    }, 500);
}
// 新增：完善高亮+联动轮播逻辑
function highlightCurrentDistrict() {
    const districtName = districtData[currentIndex].name;
    const newData = districtData.map((item, i) => ({
        ...item,
        itemStyle: {
            areaColor: i === currentIndex ? 'rgba(255, 235, 135, 0.8)' : 'rgb(204, 204, 204)',
            borderColor: i === currentIndex ? '#ff9900' : 'rgb(136, 136, 136)',
            borderWidth: i === currentIndex ? 2 : 1
        }
    }));
    const currentCoord = districtCoords[districtName];
    const rippleData = currentCoord ? [{
        name: districtName,
        value: currentCoord,
        symbolSize: 42,
        rippleEffect: { brushType: 'fill', period: 3, scale: 15, color: '#ff9900', number: 3 },
        itemStyle: { color: '#ff0000', shadowBlur: 30, shadowColor: '#ff5500' }
    }] : [];
    myChart.setOption({ series: [{ data: newData }, { data: rippleData }] });
    showCustomTooltip(districtName);
    showSlide(currentIndex); // 核心：联动轮播
}
// 启动自动轮播
function startAutoShow() {
    clearInterval(autoShowTimer);
    
    setTimeout(() => {
        highlightDistrict(districtData[0].name);
        
        autoShowTimer = setInterval(() => {
            hideCustomTooltip();
            
            setTimeout(() => {
                currentIndex = (currentIndex + 1) % districtData.length;
                highlightDistrict(districtData[currentIndex].name);
                showSlide(currentIndex);
            }, 500);
        }, 4000);
    }, 1000);
}
// 从API获取沧州市地图数据
async function loadCangzhouMap() {
    try {
        loadingElement.innerHTML = '<div class="loading-text">正在加载地图数据...</div>';
        loadingElement.style.display = 'block';
        
const response = await fetch('./cangzhou_map.json');
        const geoJSON = await response.json();
        
        // 注册沧州市地图
        echarts.registerMap('沧州市', geoJSON);
        
        // 设置配置项（确保只有一个地图）
        var option = {
            title: {
                text: '沧州市武术传承地图',
                left: 'center',
                textStyle: {
                    fontSize: 36,
                    fontWeight: 'bold',
                    color: 'rgb(0, 0, 0)',
                    fontFamily: 'zhangcao, sans-serif', // 使用自定义字体
                    textShadow: '0 0 10px rgba(0,0,0,0.7)'
                },
                subtext: '武术之乡 · 传承不息',
                subtextStyle: {
                    fontSize: 26,
                    color: 'rgb(6, 6, 6)',
                    fontFamily: 'zhangcao, sans-serif',
                    padding: [10, 0, 0, 0]
                }
            },
            
            tooltip: {
                show: false // 禁用默认提示框
            },
            visualMap: {
                show: false,
                inRange: {
                    color: ['rgba(252, 252, 249, 0.47)', 'rgba(247, 247, 243, 0.62)'],
                    colorAlpha: [1, 1]
                }
            },
            series: [
                // 唯一的地图系列
                {
                    name: '武术传承',
                    type: 'map',
                    map: '沧州市', // 直接指定地图名称
                    
                    // 添加地图控制参数
                    roam: true,
                    zoom: FIXED_ZOOM,
                    center: FIXED_CENTER,
                    scaleLimit: {
                        min: 0.7,
                        max: 15
                    },
                    
                    // 添加地图样式
                    itemStyle: {
                        borderColor: 'rgb(136, 136, 136)',
                        borderWidth: 1,
                        areaColor: 'rgb(204, 204, 204)'
                    },
                    
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: 'rgb(102, 102, 102)'
                        },
                        itemStyle: {
                            areaColor: 'rgb(170, 170, 170)'
                        }
                    },
                    
                    // 初始设置为灰色
                    data: districtData.map(item => ({
                        ...item,
                        itemStyle: {
                            areaColor: 'rgb(204, 204, 204)'
                        }
                    })),
                    
                    label: {
                        show: true,
                        fontSize: 10,
                        color: 'rgb(51, 51, 51)',
                        formatter: function(params) {
                            return params.name.length > 4 ? params.name.substring(0, 3) + '...' : params.name;
                        }
                    }
                },
                // 涟漪点效果系列（增强版）
                {
                    name: '涟漪点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo', // 绑定地理坐标系
                    symbol: 'circle',        // 明确指定符号类型
                    symbolSize: 26,          // 设置基础大小
                    rippleEffect: {
                        brushType: 'fill',   // 使用填充效果更明显
                        period: 3.5,         // 波纹周期（秒）
                        scale: 12,           // 波纹缩放比例
                        number: 2,           // 同时显示2个涟漪圈
                        color: '#ffcc00'     // 更亮的涟漪颜色
                    },
                    hoverAnimation: true,
                    zlevel: 10,
                    data: [],
                    itemStyle: {
                        color: '#ff3300',    // 更鲜艳的红色
                        shadowBlur: 25,      // 增大阴影效果
                        shadowColor: '#ff6600'
                    },
                    emphasis: {              // 添加悬停强调效果
                        scale: 1.3,
                        itemStyle: {
                            color: '#ffff00'
                        }
                    },
                    label: {
                        show: false
                    }
                }
            ]
        };
        
        // 使用配置项和数据显示图表
        myChart.setOption(option);
        
myChart.on('click', function(params) {
    if (params.componentType === 'series' && params.seriesType === 'map') {
        const districtName = params.name;
        const index = districtData.findIndex(d => d.name === districtName);
        if (index !== -1) {
            clearInterval(autoShowTimer); // 停止当前自动轮播（防止冲突）
            currentIndex = index;
            highlightCurrentDistrict(); // 高亮+联动轮播
            
            // ========== 新增：重新启动自动轮播（保留自动轮播功能） ==========
            // 可选：添加5000ms延迟（5秒后恢复自动轮播，给用户足够时间查看当前区县）
            setTimeout(() => {
                startAutoShow();
            }, 5000);
            
            // 若想点击后立即恢复自动轮播，直接调用：startAutoShow();
        }
    }
});
        
        // 添加涟漪点点击事件
        myChart.on('click', { seriesName: '涟漪点' }, function(params) {
            if (params.data && params.data.name) {
                showCustomTooltip(params.data.name);
            }
        });
        
        // 隐藏加载动画
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }
        
        // 确保地图容器有相对定位
        mapContainer.style.position = 'relative';
        
        // 启动自动轮播
        startAutoShow();
        
    } catch (error) {
        console.error('加载地图数据失败:', error);
        if (loadingElement) {
            loadingElement.innerHTML = '<div class="loading-text">地图数据加载失败，请刷新页面重试</div>';
        }
    }
}

// 页面加载完成后执行
window.addEventListener('DOMContentLoaded', function() {
    if (mapContainer) {
        // 确保地图容器有相对定位
        mapContainer.style.position = 'relative';
        loadCangzhouMap();
    } else {
        console.error('地图容器未找到');
        if (loadingElement) {
            loadingElement.innerHTML = '<div class="loading-text">地图容器未找到</div>';
        }
    }
});

// 响应式调整时更新位置
window.addEventListener('resize', function() {
    myChart.resize();
    
    // 重新定位提示框
    if (tooltipContainer.style.display === 'block') {
        updateTooltipPosition();
    }
});

// 添加地图拖拽和缩放事件监听
myChart.on('georoam', function() {
    // 重新定位提示框
    if (tooltipContainer.style.display === 'block') {
        updateTooltipPosition();
    }
    
    // 更新涟漪点位置
    highlightCurrentDistrict();
});
