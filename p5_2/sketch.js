function setup() {
  createCanvas(600, 400);
  noLoop();
}

function draw() {
  background(235);

  // ===== 팔레트 =====
  const skin  = color(230, 205, 180);
  const hair  = color(15);
  const hairShadow = color(0, 0, 0, 25);
  const glass = color(28);
  const hoodie = color(80, 120, 200);
  const hoodieDark = color(55, 95, 175);
  const seam = color(40, 80, 160, 180);
  const cord      = color(20, 30, 90);    

  // ===== 후드(몸통 뒤 배경) =====
  stroke(hoodieDark);
  strokeWeight(6);
  fill(hoodie);
  rect(160, 290, 280, 140, 30);                 // 몸통
  fill(hoodie);                                  // 후드(목 뒤)
  arc(300, 290, 220, 60, PI, TWO_PI, CHORD);

  // 후드 외곽선을 살짝 넣어 머리와 구분
  stroke(hoodieDark);
  strokeWeight(6);
  fill(hoodie);
  arc(300, 290, 220, 60, 150 * PI / 180, 390 * PI / 180, OPEN);
  noStroke();

  // 소매/팔 구분(은은)
  stroke(seam);
  strokeWeight(6);
  line(220, 330, 220, 390);   // 왼팔
  line(380, 330, 380, 390);   // 오른팔
  noStroke();

  // ===== 목 =====
  fill(skin);
  rect(270, 260, 60, 55, 15);   

  // 목 윗부분에 살짝 그림자(단순화)
  noStroke();
  fill(0, 0, 0, 30);            // 연한 회색 그림자
  arc(300, 260, 80, 20, 0, PI, CHORD);

  // ===== 얼굴 =====
  fill(skin);
  ellipse(300, 200, 180, 210);

  // ===== 머리 (투블럭) =====
  // 윗머리
  fill(hair);
  arc(300, 160, 180, 150, PI, 0, CHORD);



  // 언더컷 경계 '컷팅' (피부색으로 잘라 직선 라인 만들기)
  fill(skin);
  rect(240, 165, 18, 90, 4);   // 왼쪽 컷
  rect(342, 165, 18, 90, 4);   // 오른쪽 컷


  // ===== 귀 (머리 위로 올려서 보이게) =====
  fill(skin);
  ellipse(210, 205, 26, 38);
  ellipse(390, 205, 26, 38);

  // ===== 눈썹 =====
  stroke(35);
  strokeWeight(7);
  line(245, 172, 285, 168);
  line(315, 168, 355, 172);

  // ===== 안경 =====
  stroke(glass);
  strokeWeight(5);
  noFill();
  const R = 36;
  ellipse(255, 195, R*2, R*2);
  ellipse(345, 195, R*2, R*2);
  line(290, 195, 310, 195);
  // 템플
  line(224, 195, 210, 192);
  line(376, 195, 390, 192);

  // ===== 눈 =====
  noStroke();
  fill(35);
  ellipse(268, 198, 12, 12);
  ellipse(332, 198, 12, 12);
  fill(255);
  ellipse(265.5, 196, 3, 3);
  ellipse(329.5, 196, 3, 3);

  // ===== 입 =====
  stroke(90);
  strokeWeight(3);
  noFill();
  arc(300, 238, 48, 22, 0, PI);

  // ===== 볼터치 =====
  noStroke();
  fill(255, 230, 220, 45);
  ellipse(262, 222, 26, 16);
  ellipse(338, 222, 26, 16);

  // ===== 후드 끈 =====
  stroke(255,255,255);
  strokeWeight(7);
  line(255, 320, 255, 360);
  line(345, 320, 345, 360);
  noStroke();
}
