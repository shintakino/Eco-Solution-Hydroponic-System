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

// Get values from POST request
$min_vpd = $_POST['min'];
$max_vpd = $_POST['max'];

// Check if data already exists
$sqlCheck = "SELECT * FROM temperature_settings";
$resultCheck = $conn->query($sqlCheck);

if ($resultCheck->num_rows > 0) {
    // Data exists, update the existing record
    $sqlUpdate = "UPDATE temperature_settings SET min_vpd='$min_vpd', max_vpd='$max_vpd'";
    $resultUpdate = $conn->query($sqlUpdate);

    if ($resultUpdate) {
        echo "VPD settings updated successfully";
    } else {
        echo "Error updating vpd settings: " . $conn->error;
    }
} else {
    // No data exists, insert a new record
    $sqlInsert = "INSERT INTO temperature_settings (min_vpd, max_vpd) VALUES ('$min_vpd', '$max_vpd')";
    $resultInsert = $conn->query($sqlInsert);

    if ($resultInsert) {
        echo "VPD settings saved successfully";
    } else {
        echo "Error saving VPD settings: " . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>
