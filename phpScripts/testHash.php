$hashedPassword = '$2y$10$Mit39OJzTe1U0Qliz6wNTO6STyHT9AyG3pu4pyp0Mvg';
$passwordToCheck = 'password_to_check';

if (password_verify($passwordToCheck, $hashedPassword)) {
    echo 'Password is valid!';
} else {
    echo 'Invalid password.';
}
