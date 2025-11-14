<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer.php';
require 'SMTP.php';
require 'Exception.php';

// Database connection
$servername = "localhost";
$username = "annhurst";
$password = "Annhurst123#";
$dbname = "annhurst";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die(json_encode(["status" => "error", "message" => "DB connection failed: " . $conn->connect_error]));
}

// Get JSON data from React form
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['message'])) {
  die(json_encode(["status" => "error", "message" => "Missing required fields"]));
}

// Insert into MySQL
$stmt = $conn->prepare("INSERT INTO contact_us (name, email, phone, company, subject, message, newsletter) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssssi", $data['name'], $data['email'], $data['phone'], $data['company'], $data['service'], $data['message'], $data['newsletter']);

if (!$stmt->execute()) {
  die(json_encode(["status" => "error", "message" => "DB insert failed: " . $stmt->error]));
}

$stmt->close();
$conn->close();

// Send emails with PHPMailer
$mail = new PHPMailer(true);

try {
  // Server settings
  $mail->isSMTP();
  $mail->Host = 'annhurst-gsl.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'dutibe@annhurst-gsl.com';
  $mail->Password = '#Ibr4hhO2*Gpdb7s';
  $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
  $mail->Port = 465;

  // Email to Admin
  $mail->setFrom('dutibe@annhurst-gsl.com', 'Annhurst Admin');
  $mail->addAddress('dutibe@annhurst-gsl.com'); // Admin email
  $mail->isHTML(true);
  $mail->Subject = 'New Contact Form Submission';
  $mail->Body = "
    <h2>New Contact from {$data['name']}</h2>
    <p><strong>Email:</strong> {$data['email']}</p>
    <p><strong>Phone:</strong> {$data['phone']}</p>
    <p><strong>Company:</strong> {$data['company']}</p>
    <p><strong>Service:</strong> {$data['service']}</p>
    <p><strong>Message:</strong> {$data['message']}</p>
    <p><strong>Newsletter:</strong> " . ($data['newsletter'] ? 'Yes' : 'No') . "</p>
  ";
  $mail->send();

  // Auto-reply to Sender
  $mail->clearAddresses();
  $mail->addAddress($data['email'], $data['name']);
  $mail->Subject = 'Thank You for Contacting Annhurst Global';
  $mail->Body = "
    <div style='font-family: Arial; padding: 20px; background: #f9f9f9; border-radius: 10px;'>
      <h2 style='color: #dc2626;'>Hi {$data['name']},</h2>
      <p>We've received your message and will reply within 24 hours.</p>
      <p><em>\"{$data['message']}\"</em></p>
      <hr>
      <small>Annhurst Global Services Ltd • Lagos, Nigeria • +234 809 348 7556</small>
    </div>
  ";
  $mail->send();

  echo json_encode(["status" => "success"]);

} catch (Exception $e) {
  echo json_encode(["status" => "error", "message" => "Email failed: {$mail->ErrorInfo}"]);
}
?>
