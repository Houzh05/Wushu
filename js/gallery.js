document.addEventListener('DOMContentLoaded', function() {
  const b = document.querySelector(".b");
  const d = document.getElementsByClassName("d");
  const rightTop = document.getElementById("rightTop");
  const weaponTitle = document.getElementById("weaponTitle");
  const weaponDescription = document.getElementById("weaponDescription");
  let time;
  let index = 0;
  
  // 更新后的兵器描述数据（十八般兵器）
  const weaponData = [
      {
          title: "刀",
          description: "以劈砍威力著称，主杀伐近距离敌军，历史上关羽用青龙偃月刀，在斩颜良等战役中助力其建立赫赫战功，是冷兵器时代近战核心兵器之一。"
      },
      {
          title: "枪",
          description: "以突刺精准见长，主杀伐中远距离敌人，赵云使用龙胆亮银枪，长坂坡七进七出救主，枪在古代战场冲锋陷阵中作用关键。"
      },
      {
          title: "剑",
          description: "以轻巧锋利闻名，主杀伐单个目标，既是兵器也象征身份，李白 '十步杀一人，千里不留行' 咏剑，剑在刺客行动、文人佩剑文化中意义非凡。"
      },
      {
          title: "戟",
          description: "集戈与矛功能于一身，以勾啄刺兼具著称，主杀伐多样战场目标，吕布用方天画戟，虎牢关三英战吕布尽显其威力，曾是战场多功能兵器代表。"
      },
      {
          title: "斧",
          description: "以沉重劈砍力著称，主杀伐身披重甲敌军，程咬金用八卦宣花斧，瓦岗寨起义中屡立战功，斧在破甲作战中优势明显。"
      },
      {
          title: "钺",
          description: "形似大斧，兼具兵器与礼器属性，以威严庄重著称，主杀伐重要敌方首领，商周时期常用于祭祀与军事统帅象征，彰显权力与战力。"
      },
      {
          title: "钩",
          description: "以钩拉擒敌为特点，主杀伐并控制敌人，可钩住敌军兵器或身体，在水战、近战缠斗中效果显著，助士兵在复杂战况中占据主动。"
      },
      {
          title: "叉",
          description: "以多齿刺击著称，主杀伐集群或单个目标，可叉刺、格挡，古代猎户与士兵均有使用，在对抗野兽、战场近战中发挥作用。"
      },
      {
          title: "鞭",
          description: "分软鞭、硬鞭，以灵活抽打著称，主杀伐无甲或轻甲敌人，呼延灼用双鞭，梁山征战中表现出色，软鞭便于携带，硬鞭近战威力强。"
      },
      {
          title: "锏",
          description: "以短柄双持、砸击著称，主杀伐近距离敌人，秦琼用熟铜双锏，随李世民南征北战，锏无刃却能破甲，适合近战突袭。"
      },
      {
          title: "锤",
          description: "以沉重砸击力著称，主杀伐重甲敌军，岳云用擂鼓瓮金锤，郾城大战中大败金军，锤在对抗重装部队时能有效摧毁防御。"
      },
      {
          title: "抓",
          description: "以爪状抓取、刺击著称，主杀伐并擒获敌人，可抓握敌军兵器或锁住身体，在江湖打斗、战场特殊作战中使用，攻防兼具。"
      },
      {
          title: "镗",
          description: "形似叉却有镗杆，以刺、砸、挡著称，主杀伐中远距离敌人，宇文成都用凤翅镏金镗，隋唐演义中其战力突出，镗在马战中能有效攻击敌方战马与士兵。"
      },
      {
          title: "棍",
          description: "以长柄击打、灵活著称，主杀伐中近距离敌人，是基础兵器，少林棍法闻名，棍无刃却适合大众练习，战场与民间防身均常用。"
      },
      {
          title: "槊",
          description: "长柄矛类兵器，以长距离突刺著称，主杀伐骑兵与重甲敌军，古代骑兵常用，能在冲锋时有效刺穿敌方防御，是骑兵重要兵器。"
      },
      {
          title: "棒",
          description: "较棍粗短，以沉重击打著称，主杀伐近距离敌人，民间与战场均有使用，制作简单，便于应急，击打力度大，适合近战防身与作战。"
      },
      {
          title: "拐",
          description: "分单拐、双拐，以特殊形状格挡、击打著称，主杀伐并防御，适合老弱或特殊身形者使用，在近战中可灵活躲避攻击并反击。"
      },
      {
          title: "流星锤",
          description: "以绳索系锤、远程击打著称，主杀伐中远距离敌人，可投掷攻击，也能缠绕敌军兵器，在偷袭、牵制敌人时效果显著，是远程作战的灵活兵器。"
      }
  ];
  
  // 更新右侧内容
  function updateRightContent() {
      const weapon = weaponData[index];
      // 设置右侧图片
      rightTop.style.backgroundImage = `url('images/${index + 1}.png')`;
      weaponTitle.textContent = weapon.title;
      weaponDescription.textContent = weapon.description;
  }
  
  // 重置所有图片样式
  function resetImages() {
      for(let i = 0; i < d.length; i++) {
          d[i].className = "d";
      }
  }
  
  // 设置当前图片为活跃状态
  function setActiveImage() {
      resetImages();
      d[index].className = "d dd";
  }
  
  // 自动轮播函数
  function startSlideShow() {
      time = setInterval(function() {
          setActiveImage();
          // 设置左侧背景图片
          b.style.backgroundImage = `url('images/${index + 1}.jpg')`;
          
          // 更新右侧内容
          updateRightContent();
          
          // 循环索引
          index++;
          if(index >= d.length) {
              index = 0;
          }
      }, 3000); // 适当延长轮播时间
  }
  
  // 为每个缩略图添加鼠标移动事件
  for(let i = 0; i < d.length; i++) {
      d[i].addEventListener('mouseenter', function() {
          // 停止自动轮播
          clearInterval(time);
          // 设置左侧背景图片
          b.style.backgroundImage = `url('images/${i + 1}.jpg')`;
          // 重置图片样式并设置当前为活跃
          resetImages();
          d[i].className = "d dd";
          // 更新索引
          index = i;
          // 更新右侧内容
          updateRightContent();
          // 重新开始自动轮播
          startSlideShow();
      });
  }
  
  // 初始化轮播
  updateRightContent(); // 初始化右侧内容
  startSlideShow();
});
