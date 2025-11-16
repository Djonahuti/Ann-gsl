<?php

header("Access-Control-Allow-Origin: *"); // Change to your domain in prod
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Database connection
$conn = new mysqli("localhost", "annhurst", "Annhurst123#", "annhurst");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit;
}

// Fetch recent investments (limit to 3 for performance)
$sql = "SELECT title, price, investors, image, sold_out FROM recent_investments ORDER BY created_at DESC LIMIT 3";
$result = $conn->query($sql);

if (!$result) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Query failed"]);
    $conn->close();
    exit;
}

$opportunities = [];
while ($row = $result->fetch_assoc()) {
    $opportunities[] = [
        "title" => $row['title'] ?? "Untitled Opportunity",
        "price" => $row['price'] ?? "Price not set",
        "investors" => (int)($row['investors'] ?? 0),
        "image" => $row['image'] ?? "/ann.png", // fallback
        "soldOut" => (bool)($row['sold_out'] ?? 0)
    ];
}

$conn->close();

echo json_encode([
    "status" => "success",
    "data" => $opportunities
]);
?>