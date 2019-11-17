<?php

require_once "HashAlgorithm.php";

class Md5 extends HashAlgorithm
{
    public function hashData($str)
    {
        return hash('md5', $str);
    }
}

?>
