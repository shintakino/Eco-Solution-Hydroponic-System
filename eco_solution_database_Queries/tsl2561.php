<?php
class TSL2561Sensor {
    public $link='';
    function __construct($light) {
        $this->connect();
        $this->storeInDB($light);
    }
 
    function connect() {
        $this->link = mysqli_connect('localhost', 'root', '') or die('Cannot connect to the DB');
        mysqli_select_db($this->link, 'eco_solution') or die('Cannot select the DB');
    }

 
    function storeInDB($light) {
        $query = "INSERT INTO tsl2561_data (light) VALUES ('$light')";
        $result = mysqli_query($this->link, $query) or die('Errant query: ' . $query);
    }
}
if(isset($_GET['light']) && $_GET['light'] != '') {
    $tsl2561_sensor = new TSL2561Sensor($_GET['light']);
}
?>
