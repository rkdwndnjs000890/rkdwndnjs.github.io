// ===== 상태 =====
let hoodTarget = 0;   // S:0(내림), W:1(올림)
let hoodLift   = 0;   // 0~1, draw에서 lerp

// 후드 컬러(통일)
let hoodR = 80, hoodG = 120, hoodB = 200;
let hoodDarkR = 55, hoodDarkG = 95, hoodDarkB = 175;

let eyeOffset = 0, eyeTarget = 0;
const EYE_MAX = 8;

const skin  = [230,205,180];
const hair  = [15,15,15];
const glass = [28,28,28];
const seam  = [40,80,160,180];

function setup() {
  createCanvas(600, 400);
  frameRate(30);
}

function draw() {
  background(235);
  hoodLift  = lerp(hoodLift, hoodTarget, 0.18);
  eyeOffset = lerp(eyeOffset, eyeTarget, 0.20);

  // ===== 1) 후드 '캡' 
  const cx = 300;
  const cy = lerp(270, 190, hoodLift);   // 더 위로 올려서 얼굴을 감싸게
  const w  = lerp(250, 280, hoodLift);   // 폭 크게
  const h  = lerp(110, 280, hoodLift);   // 높이 크게
  const a1 = lerp(0.75*PI, 0.6*PI, hoodLift);   // 높이 크게
  const a2 = lerp(0.25*PI, 0.4*PI, hoodLift);   // 높이 크게

  // ===== 몸통/목뒤 아치 =====
  stroke(hoodDarkR, hoodDarkG, hoodDarkB);
  strokeWeight(6);
  fill(hoodR, hoodG, hoodB);
  rect(160, 290, 280, 140, 30);
  fill(hoodR, hoodG, hoodB);
  
  // 팔 경계선
  stroke(hoodDarkR, hoodDarkG, hoodDarkB);
  strokeWeight(6);
  line(220, 330, 220, 390);
  line(380, 330, 380, 390);
  noStroke();
  
  // 캡(반원) – 후드색과 동일, 뒤에 깔림
  stroke(hoodDarkR, hoodDarkG, hoodDarkB);
  strokeWeight(6);
  fill(hoodR, hoodG, hoodB);
  arc(cx, cy, w, h, a1, a2, OPEN);  // 180~360°

  // 끈(후드 색과 통일된 진한색)
  stroke(hoodDarkR, hoodDarkG, hoodDarkB);
  strokeWeight(7);
  line(255, 320, 255, 360);
  line(345, 320, 345, 360);
  
  drawAvatarFaceAndDetails(); //얼굴 에나중에

}

function drawAvatarFaceAndDetails() {
  // 목
  noStroke();
  fill(skin[0], skin[1], skin[2]);
  rect(270, 260, 60, 55, 15);
  fill(0, 0, 0, 30);
  arc(300, 260, 80, 20, 0, PI, CHORD);

  // 얼굴
  fill(skin[0], skin[1], skin[2]);
  ellipse(300, 200, 180, 210);

  // 머리
  fill(hair[0], hair[1], hair[2]);
  arc(300, 160, 180, 150, PI, 0, CHORD);

  // 언더컷 컷팅
  fill(skin[0], skin[1], skin[2]);
  rect(240, 165, 18, 90, 4);
  rect(342, 165, 18, 90, 4);

  // 귀
  fill(skin[0], skin[1], skin[2]);
  ellipse(210, 205, 26, 38);
  ellipse(390, 205, 26, 38);

  // 눈썹
  stroke(35); strokeWeight(7);
  line(245, 172, 285, 168);
  line(315, 168, 355, 172);

  // 안경
  stroke(glass[0], glass[1], glass[2]); strokeWeight(5); noFill();
  const R = 36;
  ellipse(255, 195, R*2, R*2);
  ellipse(345, 195, R*2, R*2);
  line(290, 195, 310, 195);
  line(224, 195, 210, 192);
  line(376, 195, 390, 192);

  // 눈(좌우 시선)
  noStroke(); fill(35);
  const lx = 268 + constrain(eyeOffset, -EYE_MAX, EYE_MAX);
  const rx = 332 + constrain(eyeOffset, -EYE_MAX, EYE_MAX);
  ellipse(lx, 198, 12, 12);
  ellipse(rx, 198, 12, 12);
  fill(255);
  ellipse(lx - 2.5, 196, 3, 3);
  ellipse(rx - 2.5, 196, 3, 3);

  // 입/볼터치
  stroke(90); strokeWeight(3); noFill();
  arc(300, 238, 48, 22, 0, PI);
  noStroke(); fill(255, 230, 220, 45);
  ellipse(262, 222, 26, 16);
  ellipse(338, 222, 26, 16);
}

// ===== 인터랙션 =====
function keyPressed() {
  const k = key.toLowerCase();
  if (k === 'w') hoodTarget = 1;      // 후드 올림(스윕 0→360°)
  else if (k === 's') hoodTarget = 0; // 후드 내림
  else if (k === 'a') eyeTarget  = -EYE_MAX;
  else if (k === 'd') eyeTarget  =  EYE_MAX;
  
  //  스페이스 누르면 10초(≈300프레임) GIF 저장
  if (key === 'f') {
    saveGif('my_character_motion', 10); // 파일 이름, 길이(초)
  }
}

function keyReleased() {
  const k = key.toLowerCase();
  if (k === 'a' || k === 'd') eyeTarget = 0;
}
function mousePressed() {
  // 후드 색상 통일 변경 (몸통+목뒤아치+후드캡+끈 외곽)
  hoodR = int(random(40, 255));
  hoodG = int(random(40, 255));
  hoodB = int(random(40, 255));
  hoodDarkR = max(0, hoodR - 25);
  hoodDarkG = max(0, hoodG - 25);
  hoodDarkB = max(0, hoodB - 25);
}
