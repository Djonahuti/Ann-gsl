<?php
// /httpdocs/api/submit_contact.php - PLESK MAIL() FIXED

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer.php';
require __DIR__ . '/SMTP.php';
require __DIR__ . '/Exception.php';

header('Content-Type: application/json');

// === DATABASE ===
$conn = new mysqli("localhost", "annhurst", "Annhurst123#", "annhurst");
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "DB error"]);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
if (!$data || empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
    exit;
}

// === SAVE TO MYSQL ===
$stmt = $conn->prepare("INSERT INTO contact_us (name, email, phone, company, subject, message, newsletter) VALUES (?, ?, ?, ?, ?, ?, ?)");
$newsletter = $data['newsletter'] ? 1 : 0;
$stmt->bind_param("ssssssi", $data['name'], $data['email'], $data['phone'], $data['company'], $data['service'], $data['message'], $newsletter);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "DB save failed"]);
    exit;
}
$stmt->close();
$conn->close();

// === EMAIL TO ADMIN (PLESK MAIL() - NO SMTP) ===
$adminSubject = "New Contact Form Submission from " . $data['name'];
$adminBody = "
New Contact from {$data['name']}

Email: {$data['email']}
Phone: {$data['phone']}
Company: {$data['company']}
Service: {$data['service']}
Message: {$data['message']}
Newsletter: " . ($data['newsletter'] ? 'Yes' : 'No') . "

---
Annhurst Global Services Ltd
";

$adminHeaders = "From: noreply@annhurst-gsl.com\r\n";
$adminHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";

if (mail('dutibe@annhurst-gsl.com', $adminSubject, $adminBody, $adminHeaders)) {
    // Admin email sent
} else {
    // Log failure (but don't stop)
}

// === AUTO-REPLY TO USER (PLESK MAIL()) ===
$userSubject = "Thank You for Contacting Annhurst Global";
$userBody = "
<div style='font-family: Arial; padding: 20px; background: #f9f9f9; border-radius: 10px;'>
    <h2 style='color: #dc2626;'>Hi {$data['name']},</h2>
    <p>We've received your message and will reply within 24 hours.</p>
    <p><em>\"{$data['message']}\"</em></p>
    <hr>
    <small>Annhurst Global Services Ltd • Lagos, Nigeria • +234 809 348 7556</small>
</div>
";

$userHeaders = "From: noreply@annhurst-gsl.com\r\n";
$userHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";

if (mail($data['email'], $userSubject, $userBody, $userHeaders)) {
    // Auto-reply sent
} else {
    // Log failure
}

echo json_encode(["status" => "success", "message" => "Message saved and emails sent"]);
?>