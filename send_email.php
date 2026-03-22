<?php
// メール送信設定
header('Content-Type: application/json');

// CORS対応
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // JSON形式のデータを取得
    $input = json_decode(file_get_contents('php://input'), true);
    
    // メール送信先（サイト運営側）
    $to = 'y_ohashi@dreambase-hikone.jp';
    
    // メール件名
    $subject = 'DreamBase お問い合わせ: ' . $input['subject'];
    
    // メール本文を作成
    $body = "お問い合わせをいただきありがとうございます。\n\n";
    $body .= "【お問い合わせ内容】\n";
    $body .= "お名前: " . htmlspecialchars($input['name']) . "\n";
    $body .= "メールアドレス: " . htmlspecialchars($input['email']) . "\n";
    
    if (!empty($input['phone'])) {
        $body .= "電話番号: " . htmlspecialchars($input['phone']) . "\n";
    }
    
    if (!empty($input['company'])) {
        $body .= "会社名: " . htmlspecialchars($input['company']) . "\n";
    }
    
    $body .= "お問い合わせ内容: " . htmlspecialchars($input['subject']) . "\n";
    $body .= "メッセージ:\n" . htmlspecialchars($input['message']) . "\n\n";
    $body .= "---\nこのメールは自動送信されています。\n";
    
    // ヘッダー設定
    $headers = "From: " . htmlspecialchars($input['email']) . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    // メール送信
    $result = mail($to, $subject, $body, $headers);
    
    if ($result) {
        echo json_encode(['success' => true, 'message' => 'メールを送信しました']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'メール送信に失敗しました']);
    }
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => '不正なリクエストです']);
}
?>
