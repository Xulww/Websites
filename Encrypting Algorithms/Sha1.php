<?php

require_once "HashAlgorithm.php";

class Sha1 extends HashAlgorithm
{
    public function hashData($str)
    {
        return hash('sha1', $str);
    }
}

?>
