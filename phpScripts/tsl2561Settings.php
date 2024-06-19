<?php
class TSL2561Sensor {
    public $link='';
    function __construct($lux_settings) {
        $this->connect();
        $this->storeInDB($lux_settings);
    }
 
    function connect() {
        $this->link = mysqli_connect('localhost', 'root', '') or die('Cannot connect to the DB');
        mysqli_select_db($this->link, 'eco_solution') or die('Cannot select the DB');
    }

 
    function storeInDB($lux_settings) {
        $query = "UPDATE light_settings SET lux_settings='$lux_settings'";
        $result = mysqli_query($this->link, $query) or die('Errant query: ' . $query);
    }
}
if(isset($_GET['lux_settings']) && $_GET['lux_settings'] != '') {
    $tsl2561_sensor = new TSL2561Sensor($_GET['lux_settings']);
}
?>
