<?php

require "SecureHasher.php";
require "Md5.php";
require "Sha1.php";
require "Sha2.php";

$isSentGet = isset($_GET['password']);
$isSentPost = isset($_POST['password']);

$doHashing = ($isSentGet || $isSentPost);

if ($doHashing) {
    $inputPassword = $isSentPost ? $_POST['password'] : $_GET['password'];
    $inputSalt = $isSentPost ? $_POST['salt'] : $_GET['salt'];

    $fullString = $inputPassword . $inputSalt;

	$originalPass = $inputPassword;
	$saltString = $inputSalt;

	$md5 = new Md5();
	$sha1 = new Sha1();
	$sha2 = new Sha2();

	$hasher = new SecureHasher($md5);
	$md5Hashed = $hasher->hashIt($fullString);

	$hasher = new SecureHasher($sha1);
	$sha1Hashed = $hasher->hashIt($fullString);

	$hasher = new SecureHasher($sha2);
	$sha2Hashed = $hasher->hashIt($fullString);

}

?>

<html>
<head>
    <meta charset="UTF-8">
    <title>HashingFunctions</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
	<h1>Welcome! Enter information below to see it secured...</h1>
    <form action="<?= $_SERVER['PHP_SELF'] ?>" method="get">
        <label>Password: </label>
        <input title="password" id="password" name="password" type="text" value="<?= $doHashing ? $inputPassword : '' ?>"> <br>
        <label>Salt String: </label>
        <input class="mar-right" title="text" id="salt" name="salt" type="text" value="<?= $doHashing ? $inputSalt : '' ?>"> <br>
        <input type="submit" class="btn">
    </form>

<?php if ($doHashing) : ?>
    <h2> RESULTS: </h1>
    <p> Original Password: <?= $originalPass ?> </p>
    <p> Salt String: <?= $saltString ?> </p>
    <p> MD5: <?= $md5Hashed ?> </p>
    <p> SHA-1: <?= $sha1Hashed ?> </p>
    <p> SHA-2 (256): <?= $sha2Hashed ?> </p>
<?php endif; ?>

</body>
</html>
