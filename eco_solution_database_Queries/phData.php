<?php

// Database connection parameters
$servername = "localhost"; // Change this if your database is hosted elsewhere
$username = "root"; // Change this to your MySQL username
$password = ""; // Change this to your MySQL password
$dbname = "eco_solution"; // Change this to your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// pH value obtained from the sensor
$ph_value = $_GET['ph']; // pH value received as a parameter

// SQL query to insert pH data into ph_data table
$sql = "INSERT INTO ph_data (ph_value) VALUES ($ph_value)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();

?>
