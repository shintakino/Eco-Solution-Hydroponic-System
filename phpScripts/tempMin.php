<?php
// Database connection parameters
$servername = "localhost"; // Change this to your database server name
$username = "root"; // Change this to your database username
$password = ""; // Change this to your database password
$dbname = "eco_solution"; // Change this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Query to select min_vpd and max_vpd from temperature_settings where id is 1
$sql_vpd = "SELECT min_vpd, max_vpd FROM temperature_settings WHERE id = 1";
$result_vpd = $conn->query($sql_vpd);

// Query to select time_duration from light_settings where id is 1
$sql_light = "SELECT set_time, time_duration FROM light_settings WHERE id = 1";
$result_light = $conn->query($sql_light);

// Query to select min_pH, max_pH , min_EC and max_EC from solution_settings where id is 1
$sql_solution = "SELECT min_pH, max_pH , min_EC, max_EC FROM solution_settings WHERE id = 1";
$result_solution = $conn->query($sql_solution);

if ($result_vpd->num_rows > 0 && $result_light->num_rows > 0 && $result_solution->num_rows > 0) {
    // Output data of the first row of temperature_settings
    $row_vpd = $result_vpd->fetch_assoc();
    $min_vpd = $row_vpd["min_vpd"];
    $max_vpd = $row_vpd["max_vpd"];

    // Output data of the first row of light_settings
    $row_light = $result_light->fetch_assoc();
    $set_time = $row_light["set_time"];
    $time_duration = $row_light["time_duration"];

    // Output data of the first row of solution_settings
    $row_solution = $result_solution->fetch_assoc();
    $min_pH = $row_solution["min_pH"];
    $max_pH = $row_solution["max_pH"];
    $min_EC = $row_solution["min_EC"];
    $max_EC = $row_solution["max_EC"];

    // Output both vpd and time_duration separated by a comma
    echo "$min_vpd,$max_vpd,$time_duration,$min_pH,$max_pH,$min_EC,$max_EC,$set_time";
} else {
    echo "0,0,0,0,0,0,0,0"; // Output all values as 0 if no data is found
}

$conn->close();
?>
