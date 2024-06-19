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
$minPH = $_POST['minPH'];
$maxPH = $_POST['maxPH'];
$minEC = $_POST['minEC'];
$maxEC = $_POST['maxEC'];

// Check if data already exists
$sqlCheck = "SELECT * FROM solution_settings";
$resultCheck = $conn->query($sqlCheck);

if ($resultCheck->num_rows > 0) {
    // Data exists, update the existing record
    $sqlUpdate = "UPDATE solution_settings SET min_pH='$minPH', max_pH='$maxPH', min_EC='$minEC', max_EC='$maxEC'";
    $resultUpdate = $conn->query($sqlUpdate);

    if ($resultUpdate) {
        echo "Solutions settings updated successfully";
    } else {
        echo "Error updating Solutions settings: " . $conn->error;
    }
} else {
    // No data exists, insert a new record
    $sqlInsert = "INSERT INTO solution_settings (min_pH, max_pH, min_EC, max_EC) VALUES ('$minPH', '$maxPH','$minEC', '$maxEC')";
    $resultInsert = $conn->query($sqlInsert);

    if ($resultInsert) {
        echo "Solutions settings saved successfully";
    } else {
        echo "Error saving Solutions settings: " . $conn->error;
    }
}

// Close the database connection
$conn->close();
?>
