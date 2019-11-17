<?php

require_once "HashAlgorithm.php";

class Sha2 extends HashAlgorithm
{
    public function hashData($str)
    {
        return hash('sha256', $str);
    }
}

?>
