<?php

require_once "HashAlgorithm.php";
require_once "HasherInjectable.php";

class SecureHasher implements HasherInjectable
{
    protected $hasher = null;

    public function __construct(HashAlgorithm $instance)
    {
        $this->hasher = $instance;
    }

    public function hashIt($data)
    {
    	$reversedStr = strrev($data);
    	$convertedStrToBase64 = base64_encode($reversedStr);

        return strtoupper($this->hasher->hashData($convertedStrToBase64));
    }
}

?>
