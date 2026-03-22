// ハンバーガーメニューの処理
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // ナビゲーションリンククリック時にメニューを閉じる
        const navLinks = navMenu.querySelectorAll('.nav-link:not(.service-toggle), .submenu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                // サブメニューも閉じる
                const submenu = document.querySelector('.submenu');
                if (submenu) {
                    submenu.classList.remove('active');
                }
            });
        });
    }

    // サービスサブメニューのトグル
    const serviceToggle = document.querySelector('.service-toggle');
    const submenu = document.querySelector('.submenu');

    if (serviceToggle && submenu) {
        serviceToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                submenu.classList.toggle('active');
            }
            // PCでは遷移する
        });
    }
});
