// Theme Management System with Local Storage
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme on load
        this.applyTheme(this.currentTheme);
        
        // Create theme toggle button
        this.createThemeToggle();
        
        // Add event listeners
        this.addEventListeners();
    }

    createThemeToggle() {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'theme-toggle-btn';
        toggleButton.setAttribute('aria-label', 'Tema Değiştir');
        toggleButton.setAttribute('type', 'button');
        toggleButton.innerHTML = `
            <span class="theme-toggle-icon">${this.currentTheme === 'dark' ? '☀️' : '🌙'}</span>
            <span class="theme-toggle-glow"></span>
        `;
        
        // Position button in navbar - wait for nav to be available
        const positionButton = () => {
            const navbar = document.querySelector('.fg-navbar');
            const navLinks = document.querySelector('.fg-navlinks');
            
            if (navbar && navLinks) {
                // Insert before the navigation links
                navbar.insertBefore(toggleButton, navLinks);
            } else {
                // Fallback to fixed position if navbar not found
                toggleButton.classList.add('theme-toggle-fixed');
                document.body.appendChild(toggleButton);
            }
        };
        
        // Try positioning immediately, then with delay as fallback
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', positionButton);
        } else {
            positionButton();
        }
        
        this.toggleButton = toggleButton;
    }

    addEventListeners() {
        this.toggleButton.addEventListener('click', () => {
            this.toggleTheme();
            this.triggerGlowEffect();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.currentTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(this.currentTheme);
                this.updateToggleButton();
            }
        });
    }

    triggerGlowEffect() {
        // Add glow animation class
        this.toggleButton.classList.add('glowing');
        
        // Remove after animation completes
        setTimeout(() => {
            this.toggleButton.classList.remove('glowing');
        }, 800);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.updateToggleButton();
        localStorage.setItem('theme', this.currentTheme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        
        // Add visual feedback for theme change
        const body = document.body;
        body.style.transition = 'all 0.5s ease';
        
        // Special handling for fraude pages
        if (body.classList.contains('fraude')) {
            // Pastel light theme is fully handled by CSS, just reset filter
            body.style.filter = 'none';
        } else {
            // For non-fraude pages, apply full theme changes
            if (theme === 'dark') {
                body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
                body.style.color = '#e9e9f2';
            } else {
                // Pastel light mode
                body.style.background = 'linear-gradient(135deg, #f3eefa 0%, #e8f0fe 50%, #fce4ec 100%)';
                body.style.color = '#3a3a4a';
            }
        }
        
        // Show theme change notification
        this.showThemeNotification(theme);
    }

    showThemeNotification(theme) {
        // Remove existing notification
        const existingNotification = document.querySelector('.theme-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Just show icon briefly, no text
        const notification = document.createElement('div');
        notification.className = 'theme-notification';
        notification.innerHTML = `
            <span style="font-size: 1.5rem;">${theme === 'dark' ? '🌙' : '☀️'}</span>
        `;
        
        // Style the notification - small circle
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1001;
            background: ${theme === 'dark' ? 'rgba(147, 0, 211, 0.9)' : 'rgba(167, 139, 218, 0.9)'};
            color: ${theme === 'dark' ? '#fff' : '#ffffff'};
            padding: 8px 12px;
            border-radius: 50%;
            font-weight: 700;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            backdrop-filter: blur(10px);
            transform: translateX(100px);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100px)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 1500);
    }

    updateToggleButton() {
        const icon = this.toggleButton.querySelector('.theme-toggle-icon');
        
        icon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
    }
}

// Mental Health Awareness Widget for The Fraude Games
class MentalHealthWidget {
    constructor() {
        this.stats = [
            {
                title: "Küresel Ruh Sağlığı Krizi",
                stat: "4'te 1",
                description: "kişi yılda ruh sağlığı sorunları yaşar",
                icon: "🧠"
            },
            {
                title: "İntihar Önleme Etkisi",
                stat: "%90",
                description: "intiharlar uygun destek ile önlenebilir",
                icon: "💚"
            },
            {
                title: "Oyun ve Ruh Sağlığı",
                stat: "%78",
                description: "oyuncular oyun oynayarak ruh sağlığı iyileşmesi bildiriyor",
                icon: "🎮"
            },
            {
                title: "Bizim Misyonumuz",
                stat: "%2",
                description: "karımızı ruh sağlığı tesislerine bağışlıyoruz",
                icon: "🤝"
            },
            {
                title: "Umut ve İyileşme",
                stat: "İyileşme",
                description: "her zaman mümkün. Yalnız değilsin.",
                icon: "🌟"
            }
        ];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.createWidget();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'mental-health-widget';
        widget.innerHTML = `
            <div class="widget-header">
                <div class="widget-title">💙 Ruh Sağlığı Farkındalığı</div>
                <div class="widget-subtitle">Birlikte daha güvenli bir gelecek inşa ediyoruz</div>
            </div>
            <div class="widget-content">
                <div class="stat-display">
                    <div class="stat-icon">${this.stats[0].icon}</div>
                    <div class="stat-main">
                        <div class="stat-number">${this.stats[0].stat}</div>
                        <div class="stat-title">${this.stats[0].title}</div>
                    </div>
                </div>
                <div class="stat-description">${this.stats[0].description}</div>
                <div class="widget-footer">
                    <div class="widget-navigation">
                        <button type="button" class="nav-btn prev-btn">◀</button>
                        <div class="progress-dots"></div>
                        <button type="button" class="nav-btn next-btn">▶</button>
                    </div>
                    <div class="fraude-commitment">
                        <small>🎯 The Fraude Games: Interaktif korku ile farkındalık yaratıyoruz</small>
                    </div>
                </div>
            </div>
            <div class="crisis-hotline">
                <small>🆘 Kriz Anında: 182 (TR) | "MERHABA" yazarak 741741'e mesaj at</small>
            </div>
        `;
        
        // Ensure widget is always visible
        widget.style.cssText += `
            opacity: 1 !important;
            visibility: visible !important;
            transform: translateY(0) !important;
            z-index: 1000 !important;
        `;
        
        document.body.appendChild(widget);
        this.widget = widget;
        this.updateProgressDots();
        
        // Add navigation event listeners
        this.widget.querySelector('.prev-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.previousStat();
        });
        
        this.widget.querySelector('.next-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.nextStat();
        });
        
        // Force visibility after a delay
        setTimeout(() => {
            widget.style.display = 'block';
            widget.style.opacity = '1';
            widget.style.visibility = 'visible';
        }, 100);
    }

    nextStat() {
        this.currentIndex = (this.currentIndex + 1) % this.stats.length;
        this.updateDisplay();
    }

    previousStat() {
        this.currentIndex = (this.currentIndex - 1 + this.stats.length) % this.stats.length;
        this.updateDisplay();
    }

    updateDisplay() {
        const currentStat = this.stats[this.currentIndex];
        
        // Add fade effect
        const content = this.widget.querySelector('.widget-content');
        content.style.opacity = '0.5';
        content.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            // Update content
            this.widget.querySelector('.stat-icon').textContent = currentStat.icon;
            this.widget.querySelector('.stat-number').textContent = currentStat.stat;
            this.widget.querySelector('.stat-title').textContent = currentStat.title;
            this.widget.querySelector('.stat-description').textContent = currentStat.description;
            
            this.updateProgressDots();
            
            // Fade back in
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 300);
    }

    updateProgressDots() {
        const dotsContainer = this.widget.querySelector('.progress-dots');
        dotsContainer.innerHTML = '';
        
        this.stats.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `progress-dot ${index === this.currentIndex ? 'active' : ''}`;
            dotsContainer.appendChild(dot);
        });
    }
}

// Enhanced page animations and interactions
class EnhancedUI {
    constructor() {
        this.init();
    }

    init() {
        this.addScrollEffects();
        this.addHoverEffects();
        this.addLoadingAnimations();
    }

    addScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Add animation to sections
        document.querySelectorAll('.fg-section, .card, .fg-service').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    addHoverEffects() {
        // Enhanced button hover effects
        document.querySelectorAll('.fg-btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Card tilt effect
        document.querySelectorAll('.card, .fg-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        });
    }

    addLoadingAnimations() {
        // Staggered animation for navigation items
        document.querySelectorAll('.fg-navlinks a').forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-10px)';
            
            setTimeout(() => {
                link.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Butterfly animation enhancement
        document.querySelectorAll('.butterfly').forEach((butterfly, index) => {
            butterfly.style.animationDelay = `${index * 0.5}s`;
        });
    }
}

/* ========================================
   MAGICAL DECORATIONS ENGINE
   ======================================== */

class MagicalDecorations {
    constructor() {
        this.createContainers();
        this.spawnLightOrbs();
        this.spawnFireflies();
        this.spawnStars();
        this.initButterflyTrails();
    }

    createContainers() {
        // Magical lights container
        if (!document.querySelector('.magical-lights')) {
            const lights = document.createElement('div');
            lights.className = 'magical-lights';
            lights.setAttribute('aria-hidden', 'true');
            document.body.prepend(lights);
        }

        // Twinkle stars container
        if (!document.querySelector('.twinkle-stars')) {
            const stars = document.createElement('div');
            stars.className = 'twinkle-stars';
            stars.setAttribute('aria-hidden', 'true');
            document.body.prepend(stars);
        }
    }

    // Floating light orbs that rise upward
    spawnLightOrbs() {
        const container = document.querySelector('.magical-lights');
        if (!container) return;

        const spawnOrb = () => {
            const orb = document.createElement('div');
            orb.className = 'light-orb';

            const size = Math.random() * 12 + 5;
            const drift = (Math.random() - 0.5) * 150;
            const duration = Math.random() * 8 + 8;
            const left = Math.random() * 100;

            orb.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                bottom: -20px;
                --drift: ${drift}px;
                animation-duration: ${duration}s;
                animation-delay: 0s;
            `;

            container.appendChild(orb);
            setTimeout(() => orb.remove(), duration * 1000);
        };

        // Spawn orbs periodically
        setInterval(spawnOrb, 3500);
        // Initial batch
        for (let i = 0; i < 2; i++) {
            setTimeout(spawnOrb, i * 400);
        }
    }

    // Firefly dots with random wandering
    spawnFireflies() {
        const container = document.querySelector('.magical-lights');
        if (!container) return;

        for (let i = 0; i < 6; i++) {
            const ff = document.createElement('div');
            ff.className = 'firefly';

            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const dur = Math.random() * 10 + 12;
            const glowDur = Math.random() * 3 + 2;
            const delay = Math.random() * -15;

            ff.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                --fx1: ${(Math.random()-0.5)*160}px;
                --fy1: ${(Math.random()-0.5)*120}px;
                --fx2: ${(Math.random()-0.5)*200}px;
                --fy2: ${(Math.random()-0.5)*160}px;
                --fx3: ${(Math.random()-0.5)*140}px;
                --fy3: ${(Math.random()-0.5)*100}px;
                --fx4: ${(Math.random()-0.5)*180}px;
                --fy4: ${(Math.random()-0.5)*140}px;
                animation: firefly-move ${dur}s linear infinite, firefly-glow ${glowDur}s ease-in-out infinite alternate;
                animation-delay: ${delay}s, ${delay * 0.7}s;
            `;

            container.appendChild(ff);
        }
    }

    // Twinkling star background
    spawnStars() {
        const container = document.querySelector('.twinkle-stars');
        if (!container) return;

        for (let i = 0; i < 15; i++) {
            const star = document.createElement('div');
            star.className = 'star';

            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 3 + 1;
            const dur = Math.random() * 3 + 2;
            const delay = Math.random() * -5;

            star.style.cssText = `
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${dur}s;
                animation-delay: ${delay}s;
            `;

            container.appendChild(star);
        }
    }

    // Sparkle trail behind butterflies
    initButterflyTrails() {
        const butterflies = document.querySelectorAll('.butterfly');
        if (!butterflies.length) return;

        const container = document.querySelector('.magical-lights') || document.body;

        butterflies.forEach(b => {
            setInterval(() => {
                const rect = b.getBoundingClientRect();
                if (rect.width === 0) return; // offscreen

                const trail = document.createElement('div');
                trail.className = 'butterfly-trail';

                const offsetX = (Math.random() - 0.5) * 12;
                const offsetY = (Math.random() - 0.5) * 12;

                trail.style.cssText = `
                    left: ${rect.left + rect.width / 2 + offsetX}px;
                    top: ${rect.top + rect.height / 2 + offsetY}px;
                    position: fixed;
                `;

                container.appendChild(trail);
                setTimeout(() => trail.remove(), 1200);
            }, 500);
        });
    }
}

// Initialize all systems when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    window.themeManager = new ThemeManager();
    
    // Initialize mental health widget ONLY on mental-health.html page
    const currentPage = window.location.pathname;
    if (currentPage.includes('mental-health')) {
        window.mentalHealthWidget = new MentalHealthWidget();
    }
    
    // Initialize enhanced UI
    window.enhancedUI = new EnhancedUI();

    // Initialize magical decorations
    window.magicalDecorations = new MagicalDecorations();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = performance.timing;
                const loadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`🚀 Sayfa ${loadTime}ms'de yüklendi`);
            }, 0);
        });
    }
});
