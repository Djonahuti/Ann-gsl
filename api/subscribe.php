<?php
// api/subscribe.php

// === CORS + Headers ===
header("Access-Control-Allow-Origin: *"); // Change to your domain in production
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// === Only allow POST ===
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

// === Read JSON input ===
$input = json_decode(file_get_contents('php://input'), true);
$email = $input['email'] ?? null;

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Valid email is required"]);
    exit;
}

// === DATABASE CONNECTION ===
$conn = new mysqli("localhost", "annhurst", "Annhurst123#", "annhurst");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// === Check if email already exists ===
$stmt = $conn->prepare("SELECT id FROM subscribers WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->close();
    $conn->close();
    http_response_code(409);
    echo json_encode(["status" => "error", "message" => "You're already subscribed!"]);
    exit;
}

$stmt->close();

// === Insert new subscriber ===
$stmt = $conn->prepare("INSERT INTO subscribers (email) VALUES (?)");
$stmt->bind_param("s", $email);

if ($stmt->execute()) {
    $stmt->close();
    $conn->close();
    echo json_encode([
        "status" => "success",
        "message" => "Thank you! You've been subscribed."
    ]);
} else {
    $stmt->close();
    $conn->close();
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Subscription failed. Try again."]);
}
?>