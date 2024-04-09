<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: http://192.168.100.15:3000");
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
$minTemperature = $_POST['min'];
$maxTemperature = $_POST['max'];

// Check if data already exists
$sqlCheck = "SELECT * FROM temperature_settings";
$resultCheck = $conn->query($sqlCheck);

if ($resultCheck->num_rows > 0) {
    // Data exists, update the existing record
    $sqlUpdate = "UPDATE temperature_settings SET min_temperature='$minTemperature', max_temperature='$maxTemperature'";
    $resultUpdate = $conn->query($sqlUpdate);

    if ($resultUpdate) {
        echo "Temperature settings updated successfully";
    } else {
        echo "Error updating temperature settings: " . $conn->error;
    }
} else {
    // No data exists, insert a new record
    $sqlInsert = "INSERT INTO temperature_settings (min_temperature, max_temperature) VALUES ('$minTemperature', '$maxTemperature')";
    $resultInsert = $conn->query($sqlInsert);

    if ($resultInsert) {
        echo "Temperature settings saved successfully";
    } else {
        echo "Error saving temperature settings: " . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>
