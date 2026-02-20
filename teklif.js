// Task 4.1 - Smart Quote Module
// Fiyat hesaplama modülü

// DOM Elementlerini Seç
const sayfaSayisi = document.getElementById('sayfaSayisi');
const hizmetTuru = document.getElementById('hizmetTuru');
const sesDizayn = document.getElementById('sesDizayn');
const narrativeDesign = document.getElementById('narrativeDesign');
const testOptimizasyon = document.getElementById('testOptimizasyon');
const btnHesapla = document.getElementById('btnHesapla');
const resultValue = document.getElementById('resultValue');
const resultBreakdown = document.getElementById('resultBreakdown');

// Hesaplama fonksiyonu
function maliyetHesapla() {
  // Temel değerleri al
  const seviyeSayisi = parseInt(sayfaSayisi.value) || 1;
  const hizmetBedelKatsayisi = parseInt(hizmetTuru.value);
  
  // Seviye başına maliyet hesapla
  const seviyeMaliyeti = seviyeSayisi * 3000;
  
  // Hizmet bedeli
  let toplamMaliyet = hizmetBedelKatsayisi + seviyeMaliyeti;
  
  // Ek hizmetler
  let ekHizmetler = [];
  
  if (sesDizayn.checked) {
    toplamMaliyet += 15000;
    ekHizmetler.push('Ses & Ambiyans: 15,000 TL');
  }
  
  if (narrativeDesign.checked) {
    toplamMaliyet += 18000;
    ekHizmetler.push('Narrative Design: 18,000 TL');
  }
  
  if (testOptimizasyon.checked) {
    toplamMaliyet += 10000;
    ekHizmetler.push('Playtest: 10,000 TL');
  }
  
  // Sonuçları göster
  animateValue(resultValue, 0, toplamMaliyet, 800);
  
  // Detaylı kırılım göster
  let breakdownHTML = `
    <div class="breakdown-title">Maliyet Detayı:</div>
    <div class="breakdown-item">
      <span>Temel Hizmet:</span>
      <span>${hizmetBedelKatsayisi.toLocaleString('tr-TR')} TL</span>
    </div>
    <div class="breakdown-item">
      <span>Seviye Geliştirme (${seviyeSayisi} × 3,000):</span>
      <span>${seviyeMaliyeti.toLocaleString('tr-TR')} TL</span>
    </div>
  `;
  
  if (ekHizmetler.length > 0) {
    ekHizmetler.forEach(hizmet => {
      const [isim, fiyat] = hizmet.split(': ');
      breakdownHTML += `
        <div class="breakdown-item">
          <span>${isim}:</span>
          <span>${fiyat}</span>
        </div>
      `;
    });
  }
  
  resultBreakdown.innerHTML = breakdownHTML;
}

// Sayı animasyonu fonksiyonu
function animateValue(element, start, end, duration) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeProgress);
    
    element.textContent = current.toLocaleString('tr-TR');
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// Event listener
btnHesapla.addEventListener('click', maliyetHesapla);

// Sayfa yüklendiğinde ilk hesaplamayı yap
window.addEventListener('DOMContentLoaded', maliyetHesapla);
