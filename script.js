// PUB♧POKIES Casino Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initializeGameFilters();
    initializeAnimations();
    initializeMobileMenu();
    initializeJackpotCounters();
    initializeScrollEffects();
    initializeHoverEffects();

    // Game Category Filtering
    function initializeGameFilters() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const gameCards = document.querySelectorAll('.game-card');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter games with animation
                gameCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    } else {
                        card.style.animation = 'fadeOut 0.3s ease-out forwards';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Casino Animations
    function initializeAnimations() {
        // Floating cards animation enhancement
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-20px) rotate(5deg) scale(1.1)';
                this.style.zIndex = '10';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.zIndex = '';
            });
        });

        // Slot machine reel animation
        const slotReel = document.querySelector('.slot-reel');
        if (slotReel) {
            let isSpinning = false;
            slotReel.addEventListener('click', function() {
                if (!isSpinning) {
                    isSpinning = true;
                    this.style.animationDuration = '0.1s';
                    setTimeout(() => {
                        this.style.animationDuration = '2s';
                        isSpinning = false;
                    }, 2000);
                }
            });
        }

        // Game card hover effects
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(-8px) scale(1)';
            });
        });
    }

    // Mobile Menu
    function initializeMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
                
                // Change icon
                const icon = this.querySelector('i');
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
    }

    // Dynamic Jackpot Counters
    function initializeJackpotCounters() {
        const jackpotElements = document.querySelectorAll('.jackpot, .mega-jackpot');
        
        jackpotElements.forEach(element => {
            const originalValue = element.textContent.replace(/[^\d.]/g, '');
            const baseValue = parseFloat(originalValue);
            
            if (!isNaN(baseValue)) {
                setInterval(() => {
                    // Random increment between 1-50
                    const increment = Math.random() * 50 + 1;
                    const newValue = baseValue + increment;
                    
                    if (element.classList.contains('mega-jackpot')) {
                        element.textContent = `$${newValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
                    } else {
                        element.textContent = `$${newValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
                    }
                }, Math.random() * 10000 + 5000); // Update every 5-15 seconds
            }
        });
    }

    // Scroll Effects
    function initializeScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const elementsToAnimate = document.querySelectorAll('.game-card, .promo-card, .section-header');
        elementsToAnimate.forEach(el => {
            observer.observe(el);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            
            if (heroVisual) {
                heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }

    // Enhanced Hover Effects
    function initializeHoverEffects() {
        // Button ripple effect
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Navigation link effects
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Game overlay animations
        const gameOverlays = document.querySelectorAll('.game-overlay');
        gameOverlays.forEach(overlay => {
            const playBtn = overlay.querySelector('.play-btn');
            const demoBtn = overlay.querySelector('.demo-btn');
            
            if (playBtn) {
                playBtn.addEventListener('click', function() {
                    // Add clicking animation
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1.05)';
                    }, 100);
                    
                    // Simulate game launch
                    showGameLaunchModal();
                });
            }
            
            if (demoBtn) {
                demoBtn.addEventListener('click', function() {
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 100);
                    
                    showDemoModal();
                });
            }
        });
    }

    // Modal Functions
    function showGameLaunchModal() {
        const modal = createModal('🎰 Launching Game...', 'Get ready for an amazing gaming experience!');
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.remove();
        }, 2000);
    }

    function showDemoModal() {
        const modal = createModal('🎮 Demo Mode', 'Try the game risk-free with virtual credits!');
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.remove();
        }, 2000);
    }

    function createModal(title, message) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${title}</h3>
                <p>${message}</p>
                <div class="modal-spinner"></div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        `;
        
        const content = modal.querySelector('.modal-content');
        content.style.cssText = `
            background: var(--cream-white);
            padding: 2rem;
            border-radius: var(--radius-xl);
            text-align: center;
            max-width: 400px;
            width: 90%;
            box-shadow: var(--shadow-heavy);
            animation: slideInUp 0.4s ease-out;
        `;
        
        const spinner = modal.querySelector('.modal-spinner');
        spinner.style.cssText = `
            width: 40px;
            height: 40px;
            border: 4px solid var(--primary-beige);
            border-top: 4px solid var(--accent-gold);
            border-radius: 50%;
            margin: 1rem auto;
            animation: spin 1s linear infinite;
        `;
        
        return modal;
    }

    // Load More Games Functionality
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading
            setTimeout(() => {
                this.textContent = 'Load More Games';
                this.disabled = false;
                
                // Add visual feedback
                const gamesGrid = document.querySelector('.games-grid');
                const newGameCard = document.createElement('div');
                newGameCard.className = 'game-card';
                newGameCard.setAttribute('data-category', 'slots');
                newGameCard.innerHTML = `
                    <div class="game-image">
                        <div class="game-placeholder slots-bg">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="game-overlay">
                            <button class="play-btn">Play Now</button>
                            <button class="demo-btn">Try Demo</button>
                        </div>
                    </div>
                    <div class="game-info">
                        <h3 class="game-title">New Slot Game</h3>
                        <p class="game-provider">Pub♧Pokies Exclusive</p>
                        <div class="game-meta">
                            <span class="jackpot">$95,750</span>
                            <span class="rtp">RTP: 97.2%</span>
                        </div>
                    </div>
                `;
                
                gamesGrid.appendChild(newGameCard);
                newGameCard.style.animation = 'fadeInUp 0.6s ease-out';
                
                // Re-initialize hover effects for new card
                initializeNewCardEffects(newGameCard);
                
            }, 1500);
        });
    }

    function initializeNewCardEffects(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
        
        const overlay = card.querySelector('.game-overlay');
        const playBtn = overlay.querySelector('.play-btn');
        const demoBtn = overlay.querySelector('.demo-btn');
        
        playBtn.addEventListener('click', () => showGameLaunchModal());
        demoBtn.addEventListener('click', () => showDemoModal());
    }

    // Live indicators pulsing
    const liveDots = document.querySelectorAll('.live-dot');
    liveDots.forEach(dot => {
        setInterval(() => {
            dot.style.transform = 'scale(1.2)';
            setTimeout(() => {
                dot.style.transform = 'scale(1)';
            }, 200);
        }, 1500);
    });

    // Promotional countdown (simulate)
    const promoBadges = document.querySelectorAll('.promo-badge');
    promoBadges.forEach(badge => {
        if (badge.textContent.includes('WEEKEND')) {
            // Add countdown effect
            setInterval(() => {
                badge.style.background = 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
                setTimeout(() => {
                    badge.style.background = '';
                }, 500);
            }, 3000);
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(244, 241, 232, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = '';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Add CSS animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .animate-in {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @media (max-width: 1024px) {
            .nav-menu.active {
                display: flex;
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                height: calc(100vh - 80px);
                background: var(--cream-white);
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 2rem;
                z-index: 999;
                animation: slideInDown 0.3s ease-out;
            }
            
            @keyframes slideInDown {
                from { transform: translateY(-100%); }
                to { transform: translateY(0); }
            }
        }
    `;
    document.head.appendChild(style);

    console.log('🎰 PUB♧POKIES Casino loaded successfully! ♠ slip ♡ slop ◇ SLAP! ♧');
});