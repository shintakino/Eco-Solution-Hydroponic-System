<?php
class ecSensor {
    public $link='';
    function __construct($EC) {
        $this->connect();
        $this->storeInDB($EC);
    }
 
    function connect() {
        $this->link = mysqli_connect('localhost', 'root', '') or die('Cannot connect to the DB');
        mysqli_select_db($this->link, 'eco_solution') or die('Cannot select the DB');
    }

 
    function storeInDB($EC) {
        $query = "INSERT INTO ec_data (EC) VALUES ('$EC')";
        $result = mysqli_query($this->link, $query) or die('Errant query: ' . $query);
    }
}
if(isset($_GET['EC']) && $_GET['EC'] != '') {
    $ec_sensor = new ecSensor($_GET['EC']);
}
?>
