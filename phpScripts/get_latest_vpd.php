<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// Replace with your database credentials
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eco_solution";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch latest vpd data
$sql = "SELECT vpd FROM sensordata ORDER BY date DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of the latest vpd
    $row = $result->fetch_assoc();
    $vpd = $row["vpd"];

    // Prepare JSON response
    $response = array('vpd' => $vpd);
    echo json_encode($response);
} else {
    echo "No vpd data found";
}
$conn->close();
?>
