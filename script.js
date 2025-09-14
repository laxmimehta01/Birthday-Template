// Play music + hearts
function playMusic() {
  document.getElementById("bgMusic").play();
  startHearts();
}
// Countdown
const birthday = new Date("December 31, 2050 00:00:00").getTime();
const timer = setInterval(() => {
  const now = new Date().getTime();
  const distance = birthday - now;
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    `⏳ ${days}d ${hours}h ${minutes}m ${seconds}s until your Birthday! 🎉`;

  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML =
      "🎊 It's your Birthday Today! 🎁";
  }
}, 1000);

// cake 
function showCake() {
  const cakeDiv = document.getElementById("cake");
  const iframe = document.getElementById("cakeFrame");

  if (cakeDiv.classList.contains("hidden")) {
    // Reload cake.html each time button is clicked to restart animation
    iframe.src = "cake.html";
    cakeDiv.classList.remove("hidden");
  } else {
    cakeDiv.classList.add("hidden");
    iframe.src = ""; // clear to reset next time
  }
}

// love letter
function openLetter() {
  const flap = document.querySelector(".envelope .flap");
  const paper = document.querySelector(".envelope .paper");
  const letter = document.getElementById("letter");

  // Animate envelope
  flap.style.transform = "rotateX(180deg)";
  paper.style.transform = "translateY(0)";

  // Show letter with delay
  setTimeout(() => {
    letter.style.opacity = "1";
  }, 800);

  // Release hearts
  releaseHearts();
}

function releaseHearts() {
  const heartsContainer = document.getElementById("hearts");
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = ["❤️","💖","💕","💓","💘"][Math.floor(Math.random()*5)];
    heart.style.left = Math.random() * 80 + 10 + "%";
    heart.style.animationDelay = (i * 0.2) + "s";
    heartsContainer.appendChild(heart);

    // Remove after animation ends
    setTimeout(() => {
      heart.remove();
    }, 3000);
  }
}
  

// Quiz Data
const quizData = [
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing elit?",
    options: ["Similiquee", "inventore", "tempore"],
    correct: 0
  },
  {
    question: "Consectetur veniam veritatis ipsam, mollitia corrupti officia?",
    options: ["Similiquee", "inventore", "tempore"],
    correct: 1
  },
  {
    question: "Dolore excepturi sint modi inventore quaerat nulla?",
    options: ["Similiquee", "inventore", "tempore"],
    correct: 2
  },
  // you can add more quiz here
];

let currentQuestion = 0;
let answered = false;

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("quizQuestion").textContent = q.question;
  const optionsDiv = document.getElementById("quizOptions");
  const result = document.getElementById("quizResult");
  const nextBtn = document.getElementById("nextBtn");

  result.textContent = "";
  nextBtn.style.display = "none";
  answered = false;

  // Clear old options
  optionsDiv.innerHTML = "";

  // Create new options
  q.options.forEach((opt, index) => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(index);
    optionsDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (answered) return; // prevent multiple clicks
  const q = quizData[currentQuestion];
  const result = document.getElementById("quizResult");
  const nextBtn = document.getElementById("nextBtn");

  if (selected === q.correct) {
    result.textContent = "Correct!";
  } else {
    result.textContent = "Oops! Incorrect";
  }

  answered = true;
  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    document.getElementById("quizContainer").innerHTML = 
      "<h3>🎉 Quiz Complete! 🎉</h3><p>You did amazing!</p>";
  }
}

// Load first question
window.onload = loadQuestion;



// Heart animation
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];
for (let i = 0; i < 80; i++) {
  hearts.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 10,
    speed: Math.random() * 2 + 1,
    color: Math.random() > 0.5 ? "#ff4b6e" : "#ff99ac"
  });
}

function drawHeart(ctx, x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  let topCurveHeight = size * 0.3;
  ctx.moveTo(x, y + topCurveHeight);
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2,
    x, y + (size + topCurveHeight) / 2, x, y + size);
  ctx.bezierCurveTo(x, y + (size + topCurveHeight) / 2,
    x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + topCurveHeight);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < hearts.length; i++) {
    let h = hearts[i];
    drawHeart(ctx, h.x, h.y, h.size, h.color);
    h.y += h.speed;
    if (h.y > canvas.height + 30) {
      h.y = -30;
      h.x = Math.random() * canvas.width;
    }
  }
  requestAnimationFrame(drawHearts);
}

function startHearts() {
  drawHearts();
}


function revealTimeline() {
  const items = document.querySelectorAll(".timeline-item");
  const triggerBottom = window.innerHeight * 0.85;

  items.forEach(item => {
    const boxTop = item.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      item.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealTimeline);
window.addEventListener("load", revealTimeline);


