<?php
// api/settings.php

// === CORS Headers (for React frontend) ===
header("Access-Control-Allow-Origin: *"); // Change * to your domain in production
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// === DATABASE CONNECTION ===
$conn = new mysqli("localhost", "annhurst", "Annhurst123#", "annhurst");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);
    exit;
}

// === FETCH SETTINGS ===
$sql = "SELECT * FROM settings WHERE id = 1 LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Parse JSON fields safely
    $row['phone'] = json_decode($row['phone'], true) ?? [];
    $row['email'] = json_decode($row['email'], true) ?? [];
    $row['services'] = json_decode($row['services'], true) ?? [];
    $row['bottom_right'] = json_decode($row['bottom_right'], true) ?? [];

    // Only send needed fields to frontend
    $settings = [
        "logo" => $row['logo'],
        "logo_blk" => $row['logo_blk'],
        "footer_write" => $row['footer_write'],
        "footer_head" => $row['footer_head'],
        "footer_head2" => $row['footer_head2'],
        "phone" => $row['phone'],
        "email" => $row['email'],
        "address" => $row['address'],
        "bottom_left" => $row['bottom_left'],
        "bottom_right" => $row['bottom_right']
    ];

    echo json_encode([
        "status" => "success",
        "data" => $settings
    ]);
} else {
    http_response_code(404);
    echo json_encode([
        "status" => "error",
        "message" => "Settings not found"
    ]);
}

$conn->close();
?>