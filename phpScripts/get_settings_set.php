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

// Fetch data from temperature_settings for id=1
$sql_temperature = "SELECT min_vpd, max_vpd FROM temperature_settings WHERE id = 1";
$result_temperature = $conn->query($sql_temperature);
$row_temperature = $result_temperature->fetch_assoc();

// Fetch data from light_settings for id=1
$sql_light = "SELECT dli FROM light_settings WHERE id = 1";
$result_light = $conn->query($sql_light);
$row_light = $result_light->fetch_assoc();

// Fetch data from solution_settings for id=1
$sql_solution = "SELECT min_pH, max_pH, min_EC, max_EC FROM solution_settings WHERE id = 1";
$result_solution = $conn->query($sql_solution);
$row_solution = $result_solution->fetch_assoc();

// Store data in an array
$data_array = array(
    "temperature" => array(
        "min_vpd" => $row_temperature["min_vpd"],
        "max_vpd" => $row_temperature["max_vpd"]
    ),
    "light" => array(
        "dli" => $row_light["dli"]
    ),
    "solution" => array(
        "min_pH" => $row_solution["min_pH"],
        "max_pH" => $row_solution["max_pH"],
        "min_EC" => $row_solution["min_EC"],
        "max_EC" => $row_solution["max_EC"]
    )
);

// Convert array to JSON format
$json_data = json_encode($data_array);

// Close connection
$conn->close();

// Set response content type to JSON
header("Content-Type: application/json");

// Output JSON data
echo $json_data;
?>
