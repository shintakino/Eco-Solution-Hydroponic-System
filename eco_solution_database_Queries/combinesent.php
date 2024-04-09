<?php

class SensorDataHandler {
    private $link = '';

    function __construct() {
        $this->connect();
    }

    function connect() {
        $this->link = mysqli_connect('localhost', 'root', '') or die('Cannot connect to the DB');
        mysqli_select_db($this->link, 'eco_solution') or die('Cannot select the DB');
    }

    function storeDHT11Data($temperature, $humidity) {
        $query = "INSERT INTO sensordata (temperature, humidity) VALUES ('$temperature', '$humidity')";
        mysqli_query($this->link, $query) or die('Errant query: ' . $query);
    }

    function storeTSL2561Data($light) {
        $query = "INSERT INTO tsl2561_data (light) VALUES ('$light')";
        mysqli_query($this->link, $query) or die('Errant query: ' . $query);
    }

    function storeECData($EC) {
        $query = "INSERT INTO ec_data (EC) VALUES ('$EC')";
        mysqli_query($this->link, $query) or die('Errant query: ' . $query);
    }
    function storePHData($ph_value) {
        $query = "INSERT INTO ph_data (ph_value) VALUES ('$ph_value')";
        mysqli_query($this->link, $query) or die('Errant query: ' . $query);
    }
    function storeTIMEData($time_duration) {
        $query = "UPDATE light_settings SET time_duration = '$time_duration' WHERE id = 1";
        mysqli_query($this->link, $query) or die('Errant query: ' . $query);
    }
}

if(isset($_GET['temperature'], $_GET['humidity'], $_GET['light'], $_GET['EC'], $_GET['ph_value'])) {
    $temperature = $_GET['temperature'];
    $humidity = $_GET['humidity'];
    $light = $_GET['light'];
    $EC = $_GET['EC'];
    $ph_value = $_GET['ph_value'];
    $time_duration = $_GET['time_duration'];

    $sensorDataHandler = new SensorDataHandler();
    $sensorDataHandler->storeDHT11Data($temperature, $humidity);
    $sensorDataHandler->storeTSL2561Data($light);
    $sensorDataHandler->storeECData($EC);
    $sensorDataHandler->storePHData($ph_value);
    $sensorDataHandler->storeTIMEData($time_duration);
}

?>
