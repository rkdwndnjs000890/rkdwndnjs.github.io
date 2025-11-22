function setup() {
  createCanvas(600, 400);
  background(120);
  noLoop(); // 정적이면 한 번만 그리기
}

function draw() {
  // 1) 대각선 격자 (네 코드 그대로)
  stroke(0);
  strokeWeight(1);

  line(-600, 0, 0, 400);
  line(-550, 0, 50, 400);
  line(-500, 0, 100, 400);
  line(-450, 0, 150, 400);
  line(-400, 0, 200, 400);
  line(-350, 0, 250, 400);
  line(-300, 0, 300, 400);
  line(-250, 0, 350, 400);
  line(-200, 0, 400, 400);
  line(-150, 0, 450, 400);
  line(-100, 0, 500, 400);
  line(-50, 0, 550, 400);
  line(0, 0, 600, 400);
  line(50, 0, 650, 400);
  line(100, 0, 700, 400);
  line(150, 0, 750, 400);
  line(200, 0, 800, 400);
  line(250, 0, 850, 400);
  line(300, 0, 900, 400);
  line(350, 0, 950, 400);
  line(400, 0, 1000, 400);
  line(450, 0, 1050, 400);
  line(500, 0, 1100, 400);
  line(550, 0, 1150, 400);
  line(600, 0, 1200, 400);

  line(0, 0, -600, 400);
  line(50, 0, -550, 400);
  line(100, 0, -500, 400);
  line(150, 0, -450, 400);
  line(200, 0, -400, 400);
  line(250, 0, -350, 400);
  line(300, 0, -300, 400);
  line(350, 0, -250, 400);
  line(400, 0, -200, 400);
  line(450, 0, -150, 400);
  line(500, 0, -100, 400);
  line(550, 0, -50, 400);
  line(600, 0, 0, 400);
  line(600, 0, 0, 400);
  line(650, 0, 50, 400);
  line(700, 0, 100, 400);
  line(750, 0, 150, 400);
  line(800, 0, 200, 400);
  line(850, 0, 250, 400);
  line(900, 0, 300, 400);
  line(950, 0, 350, 400);
  line(1000, 0, 400, 400);
  line(1050, 0, 450, 400);
  line(1100, 0, 500, 400);
  line(1150, 0, 550, 400);
  line(1200, 0, 600, 400);

  // 2) 마름모(다이아) 색 채우기
  noStroke();
  fillDiamonds();

  // 3) 캐릭터/도형 (네 코드)
  noStroke();
  fill(0);
  triangle(20,50,120,120,150,250);
  triangle(120,20,190,120,200,220);
  circle(150,150,100);

  fill(255);
  circle(130,150,10);
  circle(175,135,10);
  triangle(32,63,110,120,95,150);
  triangle(127,33,180,115,162,110);

  fill(0);
  ellipse(270, 200, 270, 85);
  arc(175, 230, 100, 45, 0.1, 4);
  ellipse(370, 220, 100, 45);

  // 꼬리 (line으로 S + 끝 말림)
  stroke(0);
  strokeWeight(20);
  line(400, 200, 420, 190);
  line(420, 190, 440, 180);
  line(440, 180, 460, 185);
  line(460, 185, 480, 175);
  line(480, 175, 500, 170);
  line(500, 170, 520, 165);
  line(520, 165, 540, 168);
  line(540, 168, 555, 175);
  line(555, 175, 565, 190);
  line(565, 190, 560, 205);
  line(560, 205, 545, 215);
  line(545, 215, 530, 218);
  line(530, 218, 520, 210);

  // 하이라이트 선들
  stroke(255);
  strokeWeight(1);
  line(85, 179, 110, 170);
  line(86, 194, 115, 180);
  line(84, 210, 121, 190);
  line(186, 150, 225, 152);
  line(190, 160, 230, 165);
  line(194, 170, 234, 180);
}

/* ====== 마름모 색 채우기 유틸 ====== */

// 두 직선군의 '시작 x'(k1, k2)로 교점 계산
// A군(↘): y = (2/3)(x - k1),  B군(↙): y = -(2/3)(x - k2)
function intersect(k1, k2) {
  const x = (k1 + k2) / 2;
  const y = (2/3) * (x - k1);
  return createVector(x, y);
}

// 화면 범위 체크
function inBounds(p) {
  return p.x >= -10 && p.x <= width + 10 && p.y >= -10 && p.y <= height + 10;
}

// 마름모 네 점을 quad로 칠하기
function fillDiamonds() {
  const step = 50;

  for (let k1 = -600; k1 <= 600 - step; k1 += step) {
    for (let k2 = -600; k2 <= 1200 - step; k2 += step) {
      const p00 = intersect(k1, k2);
      const p10 = intersect(k1 + step, k2);
      const p11 = intersect(k1 + step, k2 + step);
      const p01 = intersect(k1, k2 + step);

      if (inBounds(p00) && inBounds(p10) && inBounds(p11) && inBounds(p01)) {
        // 완전 랜덤 색상 + 알파값 120
        fill(random(255), random(255), random(255), 120);
        quad(p00.x, p00.y, p10.x, p10.y, p11.x, p11.y, p01.x, p01.y);
      }
    }
  }
}
