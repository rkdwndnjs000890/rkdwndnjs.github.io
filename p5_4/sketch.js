// ==== 전역 변수 ====

// 공 관련
let ballX, ballY;
let ballVX, ballVY;
let ballD;        // 실제 그려지는 공 크기
let ballTargetD;  // 목표 공 크기 (lerp로 서서히 변화)
let ballColor;

// 배경 색 (한 번만 랜덤으로 정하고 고정)
let baseBG;

// 마름모 패턴 색상의 기본 hue (한 번만 랜덤)
let diamondHue;

// 공 크기 / 속도 범위
const MIN_D = 30;
const MAX_D = 90;
const MIN_SPEED = 1.2;
const MAX_SPEED = 3.0;

function setup() {
  createCanvas(600, 400);

  // 랜덤 배경색 한 번만 결정
  baseBG = color(random(60, 140), random(80, 160), 120);

  // 마름모 패턴용 hue 한 번만 결정
  diamondHue = random(360);

  // 공 초기 설정
  ballX = width / 2;
  ballY = height / 2;
  ballVX = 2.5;
  ballVY = 1.8;

  ballD = 50;
  ballTargetD = 50;

  ballColor = color(255);
}

function draw() {
  // ==== 0) 배경: 매 프레임 고정 색 (GIF 용량 줄이기용) ====
  background(baseBG);

  // ===== 1) 대각선 격자 =====
  stroke(0);
  strokeWeight(1);

  line(-600,0,0,400); line(-550,0,50,400); line(-500,0,100,400);
  line(-450,0,150,400); line(-400,0,200,400); line(-350,0,250,400);
  line(-300,0,300,400); line(-250,0,350,400); line(-200,0,400,400);
  line(-150,0,450,400); line(-100,0,500,400); line(-50,0,550,400);
  line(0,0,600,400); line(50,0,650,400); line(100,0,700,400);
  line(150,0,750,400); line(200,0,800,400); line(250,0,850,400);
  line(300,0,900,400); line(350,0,950,400); line(400,0,1000,400);
  line(450,0,1050,400); line(500,0,1100,400); line(550,0,1150,400);
  line(600,0,1200,400);

  line(0,0,-600,400); line(50,0,-550,400); line(100,0,-500,400);
  line(150,0,-450,400); line(200,0,-400,400); line(250,0,-350,400);
  line(300,0,-300,400); line(350,0,-250,400); line(400,0,-200,400);
  line(450,0,-150,400); line(500,0,-100,400); line(550,0,-50,400);
  line(600,0,0,400); line(650,0,50,400); line(700,0,100,400);
  line(750,0,150,400); line(800,0,200,400); line(850,0,250,400);
  line(900,0,300,400); line(950,0,350,400); line(1000,0,400,400);
  line(1050,0,450,400); line(1100,0,500,400); line(1150,0,550,400);
  line(1200,0,600,400);

  // ===== 2) 마름모 패턴 (고정, 시간·랜덤 의존 없음) =====
  noStroke();
  fillDiamonds();

  // ===== 3) 숨쉬는 빛 (고양이 뒤) =====
  let pulse = 120 + 30 * sin(frameCount * 0.05);
  fill(255, 255, 255, 40);
  ellipse(150, 150, pulse, pulse);

  // ===== 4) 고양이 몸 =====
  noStroke();
  fill(0);
  triangle(20,50,120,120,150,250);
  triangle(120,20,190,120,200,220);
  circle(150,150,100);

  // ===== 5) 고양이 눈 (공 크기에 따라 크기 변화 + 공 쳐다보기) =====
  let eyeBase1 = { x:130, y:150 };
  let eyeBase2 = { x:175, y:135 };

  // 눈 크기 = 공 크기 비율로 변경 (ballD는 부드럽게 변함)
  let eyeDia = map(ballD, MIN_D, MAX_D, 8, 18);
  let eyeOffset = 6;

  function drawEyeFollow(bx, by) {
    let angle = atan2(ballY - by, ballX - bx);
    let ex = bx + cos(angle) * eyeOffset;
    let ey = by + sin(angle) * eyeOffset;
    fill(255);
    circle(ex, ey, eyeDia);
  }

  drawEyeFollow(eyeBase1.x, eyeBase1.y);
  drawEyeFollow(eyeBase2.x, eyeBase2.y);

  // 눈 위의 삼각형 (원래 코드)
  fill(255);
  triangle(32,63,110,120,95,150);
  triangle(127,33,180,115,162,110);

  // ===== 나머지 고양이 몸 =====
  fill(0);
  ellipse(270, 200, 270, 85);
  arc(175, 230, 100, 45, 0.1, 4);
  ellipse(370, 220, 100, 45);

  // 꼬리 애니메이션
  drawAnimatedTail();

  // 하이라이트 선들
  stroke(255);
  strokeWeight(1);
  line(85,179,110,170);
  line(86,194,115,180);
  line(84,210,121,190);
  line(186,150,225,152);
  line(190,160,230,165);
  line(194,170,234,180);

  // ===== 6) 공 업데이트 + 그리기 =====
  updateBall();
  drawBall();
}

/* ================================================
                공 업데이트 (벽만 충돌)
================================================ */
function updateBall() {
  // 위치 업데이트
  ballX += ballVX;
  ballY += ballVY;

  let r = ballD / 2;
  let hit = false;

  // 좌우 벽 충돌
  if (ballX - r < 0) {
    ballX = r;
    ballVX *= -1;
    hit = true;
  } else if (ballX + r > width) {
    ballX = width - r;
    ballVX *= -1;
    hit = true;
  }

  // 상하 벽 충돌
  if (ballY - r < 0) {
    ballY = r;
    ballVY *= -1;
    hit = true;
  } else if (ballY + r > height) {
    ballY = height - r;
    ballVY *= -1;
    hit = true;
  }

  if (hit) {
    // 공 크기: 목표값만 랜덤으로 변경 (실제 그려지는 크기는 아래에서 lerp)
    ballTargetD = random(MIN_D, MAX_D);

    // 공 색 랜덤
    ballColor = color(random(255), random(255), random(255));

    // 속도에 약간 랜덤성 추가
    ballVX += random(-0.4, 0.4);
    ballVY += random(-0.4, 0.4);

    // 속도 크기 제한 (너무 빠르거나 느려지지 않게)
    let speed = sqrt(ballVX * ballVX + ballVY * ballVY);
    if (speed > 0) {
      let clamped = constrain(speed, MIN_SPEED, MAX_SPEED);
      let scale = clamped / speed;
      ballVX *= scale;
      ballVY *= scale;
    }
  }

  // 공 크기를 목표 크기 쪽으로 부드럽게 이동 (연속적인 변화)
  ballD = lerp(ballD, ballTargetD, 0.08);
}

/* ================================================
                공 그리기
================================================ */
function drawBall() {
  // 공 흰색 테두리
  stroke(255);
  strokeWeight(4);
  fill(ballColor);
  circle(ballX, ballY, ballD);
}

/* ================================================
                마름모 + 꼬리
================================================ */

// 격자 교점 계산
function intersect(k1,k2){
  const x = (k1 + k2) / 2;
  const y = (2/3)*(x - k1);
  return createVector(x,y);
}

function inBounds(p){
  return p.x >= -10 && p.x <= width+10 && p.y >= -10 && p.y <= height+10;
}

// 시간/랜덤 의존 없는 마름모 색 채우기
function fillDiamonds(){
  const step = 50;
  let baseHue = diamondHue;  // setup에서 한 번만 정해둔 hue 사용

  push();
  colorMode(HSB,360,100,100,255);

  for(let k1=-600;k1<=600-step;k1+=step){
    for(let k2=-600;k2<=1200-step;k2+=step){
      const p00 = intersect(k1,k2);
      const p10 = intersect(k1+step,k2);
      const p11 = intersect(k1+step,k2+step);
      const p01 = intersect(k1,k2+step);

      if(inBounds(p00)&&inBounds(p10)&&inBounds(p11)&&inBounds(p01)){
        // 위치(x, y)에 따라서만 색이 달라지도록
        let col1 = color((baseHue + p00.x * 0.1) % 360, 80, 95, 150);
        let col2 = color((baseHue + 120 + p00.y * 0.1) % 360, 80, 95, 150);

        let amt = (sin((p00.x + p00.y) * 0.05) + 1) / 2;

        let mixed = lerpColor(col1, col2, amt);
        fill(mixed);
        quad(p00.x,p00.y,p10.x,p10.y,p11.x,p11.y,p01.x,p01.y);
      }
    }
  }
  pop();
}

// 꼬리 애니메이션
function drawAnimatedTail(){
  let baseTail=[
    {x:400,y:200},{x:420,y:190},{x:440,y:180},{x:460,y:185},
    {x:480,y:175},{x:500,y:170},{x:520,y:165},{x:540,y:168},
    {x:555,y:175},{x:565,y:190},{x:560,y:205},{x:545,y:215},
    {x:530,y:218},{x:520,y:210}
  ];

  let t = frameCount * 0.1;
  let globalLift = sin(t * 0.5) * 3;

  stroke(0);
  strokeWeight(20);

  for(let i=0;i<baseTail.length-1;i++){
    let p1 = baseTail[i];
    let p2 = baseTail[i+1];

    let k1 = i / (baseTail.length - 1);
    let k2 = (i + 1) / (baseTail.length - 1);

    let curl1 = sin(t + k1 * 1.5);
    let curl2 = sin(t + k2 * 1.5);

    let ampY1 = 80 * k1;
    let ampY2 = 80 * k2;

    let ampX1 = 5 * k1;
    let ampX2 = 5 * k2;

    let x1 = p1.x + ampX1 * curl1;
    let y1 = p1.y + globalLift + ampY1 * curl1;

    let x2 = p2.x + ampX2 * curl2;
    let y2 = p2.y + globalLift + ampY2 * curl2;

    line(x1,y1,x2,y2);
  }
}

