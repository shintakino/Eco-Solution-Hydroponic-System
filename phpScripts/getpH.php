<?php
class pHSensor {
    public $link='';
    function __construct($pH) {
        $this->connect();
        $this->storeInDB($pH);
    }
 
    function connect() {
        $this->link = mysqli_connect('localhost', 'root', '') or die('Cannot connect to the DB');
        mysqli_select_db($this->link, 'eco_solution') or die('Cannot select the DB');
    }

 
    function storeInDB($pH) {
        $query = "INSERT INTO tsl2561_data (light) VALUES ('$pH')";
        $result = mysqli_query($this->link, $query) or die('Errant query: ' . $query);
    }
}
if(isset($_GET['light']) && $_GET['light'] != '') {
    $tsl2561_sensor = new pHSensor($_GET['light']);
}
?>
