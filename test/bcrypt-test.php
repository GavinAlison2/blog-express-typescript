<?php
$data['password'] = '123456';
$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

error_log(sprintf('hashed password:  %s \n', $hashedPassword));
$passwdFlag = password_verify('123456', $hashedPassword);
error_log(sprintf('password verify: %s \n', $passwdFlag));
if ($passwdFlag) {
    error_log('ok');
} else {
    error_log('no');
}
?>