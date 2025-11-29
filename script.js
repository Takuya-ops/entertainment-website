// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// FV (First View) Animation
document.addEventListener('DOMContentLoaded', () => {
    // FV要素のフェードイン
    const subtitleText = document.querySelector('.subtitle-text');
    const titleText = document.querySelector('.title-text');
    const subtitleContainer = document.querySelector('.subtitle-container');

    // 背景画像が読み込まれた後にアニメーション開始
    const kvImage = document.querySelector('.kv-image');
    if (kvImage) {
        const img = new Image();
        img.onload = () => {
            setTimeout(() => {
                if (subtitleText) subtitleText.classList.add('visible');
            }, 500);
            setTimeout(() => {
                if (titleText) titleText.classList.add('visible');
            }, 700);
            setTimeout(() => {
                if (subtitleContainer) subtitleContainer.classList.add('visible');
            }, 900);
        };
        // SVG画像の場合は即座に実行
        setTimeout(() => {
            if (subtitleText) subtitleText.classList.add('visible');
            setTimeout(() => {
                if (titleText) titleText.classList.add('visible');
            }, 200);
            setTimeout(() => {
                if (subtitleContainer) subtitleContainer.classList.add('visible');
            }, 400);
        }, 500);
    }

    // スクロールアニメーション対象要素を監視
    const animatedElements = document.querySelectorAll(`
        .story-title,
        .story-subtitle-container,
        .story-description,
        .cast-title,
        .person,
        .contents .section-title,
        .content-card,
        .making .section-title,
        .making-item,
        .news .section-title,
        .news-item,
        .staff .section-title,
        .staff-item
    `);

    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // タブ切り替え機能
    const tabItems = document.querySelectorAll('.tab-item');
    const movieImage = document.querySelector('.movie-image');
    
    tabItems.forEach(tab => {
        tab.addEventListener('click', () => {
            tabItems.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // 画像を切り替え
            if (movieImage) {
                if (tab.textContent === 'Pilot Film') {
                    movieImage.style.backgroundImage = "url('Assets/Trailer_01.svg')";
                } else if (tab.textContent === 'Promotional Trailer') {
                    movieImage.style.backgroundImage = "url('Assets/Trailer_02.svg')";
                }
            }
        });
    });

    // スムーススクロール
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ヘッダーのスクロール時の挙動
    let lastScroll = 0;
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 100) {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.98)';
        } else {
            header.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
        }
        lastScroll = currentScroll;
    });

    // 動画プレイヤーのホバーエフェクト
    const movie = document.querySelector('.movie');
    const playButton = document.querySelector('.play-button');
    
    if (movie && playButton) {
        movie.addEventListener('mouseenter', () => {
            const overlay = document.createElement('div');
            overlay.style.position = 'absolute';
            overlay.style.top = '10px';
            overlay.style.left = '10px';
            overlay.style.width = 'calc(100% - 20px)';
            overlay.style.height = 'calc(100% - 20px)';
            overlay.style.backgroundColor = 'rgba(17, 17, 17, 0.4)';
            overlay.style.zIndex = '5';
            overlay.classList.add('movie-overlay');
            movie.appendChild(overlay);
            
            const playBtnSvg = playButton.querySelector('svg');
            if (playBtnSvg) {
                playBtnSvg.style.width = '120px';
                playBtnSvg.style.height = '120px';
            }
        });

        movie.addEventListener('mouseleave', () => {
            const overlay = movie.querySelector('.movie-overlay');
            if (overlay) {
                overlay.remove();
            }
            
            const playBtnSvg = playButton.querySelector('svg');
            if (playBtnSvg) {
                playBtnSvg.style.width = '100px';
                playBtnSvg.style.height = '100px';
            }
        });
    }
});

// テキストリンクのチカチカアニメーション（CSSで実装済み）
// blinkアニメーションはCSSで定義されているため、追加のJavaScriptは不要

