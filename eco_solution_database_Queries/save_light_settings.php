<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: http://192.168.100.15:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Retrieve data sent from the React application
$data = json_decode(file_get_contents("php://input"), true);

// Extract the data fields
$type = $data['type'];
$set_time = $data['set_time'];
$dli = $data['dli'];
$time_duration = $data['time_duration'];
$date_today = $data['date_today'];
// Convert set_time to decimal format (HH.MM)
$set_time_decimal = convertToDecimalTime($set_time);
// Database connection parameters
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

// Check if a row with id = 1 already exists
$sql_check_id = "SELECT * FROM light_settings WHERE id = 1";
$result_check_id = $conn->query($sql_check_id);

if ($result_check_id->num_rows == 0) {
    // No row with id = 1 exists, insert a new record
    $sql_insert = "INSERT INTO light_settings (id, type, set_time, dli, time_duration, date_today)
                   VALUES (1, '$type', '$set_time_decimal', '$dli', '$time_duration', '$date_today')";
    
    if ($conn->query($sql_insert) === TRUE) {
        echo json_encode(array("message" => "New record created successfully"));
    } else {
        echo json_encode(array("error" => "Error: " . $sql_insert . "<br>" . $conn->error));
    }
} else {
    // A row with id = 1 already exists, update the existing record
    $sql_update = "UPDATE light_settings SET set_time = '$set_time_decimal', dli = '$dli', time_duration = '$time_duration',date_today = '$date_today' WHERE id = 1";
    
    if ($conn->query($sql_update) === TRUE) {
        echo json_encode(array("message" => "Record updated successfully"));
    } else {
        echo json_encode(array("error" => "Error updating record: " . $conn->error));
    }
}

$conn->close();
// Function to convert time from HH:MM:SS format to decimal format (HH.MM)
function convertToDecimalTime($time) {
    $time_parts = explode(':', $time);
    $hours = $time_parts[0];
    $minutes = $time_parts[1];
    $seconds = $time_parts[2];
    $decimal_time = $hours + ($minutes / 60) + ($seconds / 3600); // Calculate decimal time
    return number_format($decimal_time, 2); // Format decimal time to 2 decimal places
}
?>
