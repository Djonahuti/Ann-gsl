<?php

// CORS Headers
header("Access-Control-Allow-Origin: *"); // Restrict to your domain in production
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database Connection
$conn = new mysqli("localhost", "annhurst", "Annhurst123#", "annhurst");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// Fetch Page Content (assuming single row for home/main page)
$sql = "SELECT * FROM page LIMIT 1";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();

    // Decode any JSON fields (e.g., inv2_r_list)
    if (isset($row['inv2_r_list'])) {
        $row['inv2_r_list'] = json_decode($row['inv2_r_list'], true) ?? [];
    }
    // Add decoding for other JSON/array fields if needed in future

    echo json_encode([
        "status" => "success",
        "data" => $row
    ]);
} else {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => "Page content not found"]);
}

$conn->close();
?>