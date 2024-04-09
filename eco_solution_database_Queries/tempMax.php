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

// Query to select max_temperature from temperature_settings where id is 1
$sql = "SELECT max_temperature FROM temperature_settings WHERE id = 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Output data of the first row
    $row = $result->fetch_assoc();
    echo $row["max_temperature"];
} else {
    echo "0";
}
$conn->close();
?>
