// お問い合わせフォームの処理
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // フォームデータを取得
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // ボタンを無効化
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '送信中...';
    
    try {
        // サーバーにデータを送信
        const response = await fetch('./send_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('ご送信ありがとうございました。\n確認メールをお送りします。');
            this.reset();
        } else {
            alert('エラー: ' + (result.message || 'メール送信に失敗しました'));
        }
    } catch (error) {
        console.error('エラー:', error);
        alert('メール送信に失敗しました。\nしばらく時間をおいてからお試しください。');
    } finally {
        // ボタンを復帰
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
});
