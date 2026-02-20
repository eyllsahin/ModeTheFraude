// Task 4.2 - Q-Line HR Assessment Quiz Application
// Quiz verilerini Array of Objects formatında saklama

const quizData = [
  {
    soru: "JavaScript'te değişken tanımlamak için hangi anahtar kelimeler kullanılır?",
    secenekler: ["var, let, const", "int, float, string", "define, declare, assign", "variable, value, data"],
    dogruCevap: 0
  },
  {
    soru: "HTML'de sayfa başlığını belirlemek için hangi etiket kullanılır?",
    secenekler: ["<header>", "<h1>", "<title>", "<head>"],
    dogruCevap: 2
  },
  {
    soru: "CSS'te bir elementin arka plan rengini değiştirmek için hangi özellik kullanılır?",
    secenekler: ["color", "background-color", "bg-color", "fill"],
    dogruCevap: 1
  },
  {
    soru: "JavaScript'te bir dizinin eleman sayısını öğrenmek için hangi özellik kullanılır?",
    secenekler: ["size", "count", "length", "total"],
    dogruCevap: 2
  },
  {
    soru: "Responsive tasarım için CSS'te hangi teknik yaygın olarak kullanılır?",
    secenekler: ["Tables", "Media Queries", "Frames", "Flash"],
    dogruCevap: 1
  },
  {
    soru: "Git'te değişiklikleri kaydetmek için hangi komut kullanılır?",
    secenekler: ["git push", "git save", "git commit", "git update"],
    dogruCevap: 2
  },
  {
    soru: "JavaScript'te bir fonksiyonu tanımlamak için hangi anahtar kelime kullanılır?",
    secenekler: ["function", "def", "func", "method"],
    dogruCevap: 0
  },
  {
    soru: "HTML'de bir listeyi oluşturmak için hangi etiket kullanılır?",
    secenekler: ["<list>", "<ol> veya <ul>", "<menu>", "<items>"],
    dogruCevap: 1
  },
  {
    soru: "CSS'te flex container oluşturmak için hangi özellik kullanılır?",
    secenekler: ["display: flex", "flex: true", "layout: flex", "position: flex"],
    dogruCevap: 0
  },
  {
    soru: "JavaScript'te DOM'dan bir elementi seçmek için hangi method kullanılır?",
    secenekler: ["getElement()", "selectElement()", "querySelector()", "findElement()"],
    dogruCevap: 2
  }
];

// Uygulama durumu
let mevcutSoruIndex = 0;
let toplamPuan = 0;
let dogruSayisi = 0;
let yanlisSayisi = 0;
let secilenCevap = null;

// DOM elementleri
const startScreen = document.getElementById('startScreen');
const questionScreen = document.getElementById('questionScreen');
const resultScreen = document.getElementById('resultScreen');
const btnStart = document.getElementById('btnStart');
const btnNext = document.getElementById('btnNext');
const btnRestart = document.getElementById('btnRestart');
const btnHome = document.getElementById('btnHome');
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const currentQuestion = document.getElementById('currentQuestion');
const currentScore = document.getElementById('currentScore');
const progressBar = document.getElementById('progressBar');

// Ekran geçiş fonksiyonu
function ekranGoster(ekran) {
  startScreen.classList.remove('active');
  questionScreen.classList.remove('active');
  resultScreen.classList.remove('active');
  ekran.classList.add('active');
}

// Sınavı başlat
function sinaviBaslat() {
  mevcutSoruIndex = 0;
  toplamPuan = 0;
  dogruSayisi = 0;
  yanlisSayisi = 0;
  secilenCevap = null;
  
  ekranGoster(questionScreen);
  soruGoster();
}

// Soruyu ekrana yazdır
function soruGoster() {
  const soru = quizData[mevcutSoruIndex];
  
  // Soru metnini göster
  questionText.textContent = soru.soru;
  
  // İlerleme bilgilerini güncelle
  currentQuestion.textContent = `Soru: ${mevcutSoruIndex + 1}/${quizData.length}`;
  currentScore.textContent = `Puan: ${toplamPuan}`;
  
  // İlerleme çubuğunu güncelle
  const ilerlemeYuzdesi = ((mevcutSoruIndex) / quizData.length) * 100;
  progressBar.style.width = `${ilerlemeYuzdesi}%`;
  
  // Seçenekleri oluştur
  optionsList.innerHTML = '';
  soru.secenekler.forEach((secenek, index) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = secenek;
    button.addEventListener('click', () => cevapSec(index, button));
    li.appendChild(button);
    optionsList.appendChild(li);
  });
  
  // Next butonunu devre dışı bırak
  btnNext.disabled = true;
  secilenCevap = null;
}

// Cevap seçimi
function cevapSec(secimIndex, buton) {
  // Önceki seçimleri temizle
  const tumButonlar = document.querySelectorAll('.option-btn');
  tumButonlar.forEach(btn => {
    btn.classList.remove('selected', 'correct', 'wrong');
    btn.disabled = false;
  });
  
  // Yeni seçimi işaretle
  buton.classList.add('selected');
  secilenCevap = secimIndex;
  
  // Next butonunu aktif et
  btnNext.disabled = false;
}

// Sonraki soruya geç
function sonrakiSoru() {
  if (secilenCevap === null) return;
  
  const soru = quizData[mevcutSoruIndex];
  const tumButonlar = document.querySelectorAll('.option-btn');
  
  // Cevabı kontrol et
  if (secilenCevap === soru.dogruCevap) {
    toplamPuan += 10;
    dogruSayisi++;
    tumButonlar[secilenCevap].classList.add('correct');
  } else {
    yanlisSayisi++;
    tumButonlar[secilenCevap].classList.add('wrong');
    tumButonlar[soru.dogruCevap].classList.add('correct');
  }
  
  // Tüm butonları devre dışı bırak
  tumButonlar.forEach(btn => btn.disabled = true);
  
  // Kısa bir bekleme sonrası ilerle
  setTimeout(() => {
    mevcutSoruIndex++;
    
    if (mevcutSoruIndex < quizData.length) {
      soruGoster();
    } else {
      sonuclariGoster();
    }
  }, 1000);
}

// Sonuçları göster
function sonuclariGoster() {
  // İlerleme çubuğunu tamamla
  progressBar.style.width = '100%';
  
  // Sonuç ekranını hazırla
  const basariOrani = Math.round((dogruSayisi / quizData.length) * 100);
  
  document.getElementById('finalScore').textContent = `${toplamPuan} / 100`;
  document.getElementById('totalQuestions').textContent = quizData.length;
  document.getElementById('correctAnswers').textContent = dogruSayisi;
  document.getElementById('wrongAnswers').textContent = yanlisSayisi;
  document.getElementById('successRate').textContent = `${basariOrani}%`;
  
  // Başarı durumuna göre mesaj
  const resultIcon = document.getElementById('resultIcon');
  const resultTitle = document.getElementById('resultTitle');
  const resultMessage = document.getElementById('resultMessage');
  
  if (toplamPuan >= 70) {
    resultIcon.textContent = '🎉';
    resultTitle.textContent = 'Tebrikler!';
    resultTitle.style.color = '#00e5ff';
    resultMessage.textContent = 'Sınavı başarıyla tamamladınız. Q-Line ekibine hoş geldiniz!';
  } else if (toplamPuan >= 50) {
    resultIcon.textContent = '👍';
    resultTitle.textContent = 'İyi Bir Performans!';
    resultTitle.style.color = '#f39c12';
    resultMessage.textContent = 'Başarılı bir performans sergiledıniz. Gelişmeye devam edin!';
  } else {
    resultIcon.textContent = '📚';
    resultTitle.textContent = 'Gelişime Açık';
    resultTitle.style.color = '#e74c3c';
    resultMessage.textContent = 'Tekrar denemenizi öneririz. Pratik yaparak gelişebilirsiniz.';
  }
  
  // Sonuç ekranını göster
  ekranGoster(resultScreen);
}

// Ana sayfaya dön
function anaSayfayaDon() {
  window.location.href = 'index.html';
}

// Event Listener'lar
btnStart.addEventListener('click', sinaviBaslat);
btnNext.addEventListener('click', sonrakiSoru);
btnRestart.addEventListener('click', sinaviBaslat);
btnHome.addEventListener('click', anaSayfayaDon);

// Sayfa yüklendiğinde başlangıç ekranını göster
window.addEventListener('DOMContentLoaded', () => {
  ekranGoster(startScreen);
});
