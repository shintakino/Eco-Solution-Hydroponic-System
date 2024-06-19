<?php
// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = "";
$database = "eco_solution";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from tsl2561_data table
$tsl2561_query = "SELECT light, `date` FROM tsl2561_data ORDER BY `date` DESC";
$tsl2561_result = $conn->query($tsl2561_query);

// Fetch data from sensordata table
$sensordata_query = "SELECT temperature, humidity, `date` FROM sensordata ORDER BY `date` DESC";
$sensordata_result = $conn->query($sensordata_query);

// Fetch data from ec_data table
$ec_data_query = "SELECT ec, `timestamp` FROM ec_data ORDER BY `timestamp` DESC";
$ec_data_result = $conn->query($ec_data_query);

// Fetch data from ph_data table
$ph_data_query = "SELECT ph_value, `timestamp` FROM ph_data ORDER BY `timestamp` DESC";
$ph_data_result = $conn->query($ph_data_query);

// Create an associative array to store all data
$data = array();

// Add tsl2561 data to the array
$tsl2561_data = array();
if ($tsl2561_result->num_rows > 0) {
    while($row = $tsl2561_result->fetch_assoc()) {
        $tsl2561_data[] = $row;
    }
}
$data['tsl2561_data'] = $tsl2561_data;

// Add sensordata to the array
$sensordata = array();
if ($sensordata_result->num_rows > 0) {
    while($row = $sensordata_result->fetch_assoc()) {
        $sensordata[] = $row;
    }
}
$data['sensordata'] = $sensordata;

// Add ec_data to the array
$ec_data = array();
if ($ec_data_result->num_rows > 0) {
    while($row = $ec_data_result->fetch_assoc()) {
        $ec_data[] = $row;
    }
}
$data['ec_data'] = $ec_data;

// Add ph_data to the array
$ph_data = array();
if ($ph_data_result->num_rows > 0) {
    while($row = $ph_data_result->fetch_assoc()) {
        $ph_data[] = $row;
    }
}
$data['ph_data'] = $ph_data;

// Close connection
$conn->close();

// Convert data array to JSON format
$json_data = json_encode($data);

// Output JSON
echo $json_data;

?>