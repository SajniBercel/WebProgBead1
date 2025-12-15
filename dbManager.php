<?php
include_once("config.php");

/**
 * létrehoz egy adabázis kapcsolatot
 * @return PDO
 */
function dbConnection(): PDO {
    global $dns;
    global $userName;
    global $password;
    global $options;

    $pdo = null;
    try {
        $pdo = new PDO($dns, $userName, null, $options); //TODO: át kell írni ha szerveren lesz
    } catch (PDOException $e) {
        die("[dbManager.dbConnection] Adatbázis hiba kapcsolodás közben: " . $e->getMessage());
    }

    return $pdo;
}

/**
 * -1: nincs találat <br>
 * -2: hibás jelszó <br>
 * mindenmás: userID
 * @param PDO $pdo
 * @param string $username
 * @param string $plainPassword
 * @return int
 */
function checkLogin(PDO $pdo, string $username, string $plainPassword): int {
    $sql = "SELECT id, password FROM user WHERE name = :name LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':name' => $username]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        $id = (int)$user['id'];
        $hashedPassword = $user['password'];

        if (password_verify($plainPassword, $hashedPassword)) {
            return $id;
        } else {
            return -2;
        }
    } else {
        return -1;
    }
}

/**
 * @param PDO $pdo
 * @param string $username
 * @param string $password
 * @return bool
 */
function addUser(PDO $pdo, string $username, string $password): bool {
    $hash = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO user (name, password) VALUES (:name, :password)";
    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            ':name' => $username,
            ':password' => $hash,
        ]);

        return true;
    } catch (PDOException $e) {
        echo $e->getMessage();
        return false;
    }
}

// csak hogy ha kell akkor gyorsan lehessen db-t csinálni
function createDbIfNotExists(){
    $createTableUser = "CREATE TABLE IF NOT EXISTS `user` 
    (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(25)  NOT NULL,
    `password` VARCHAR(40)  NOT NULL,
    PRIMARY KEY (`id`)
    )";

    $createTableGame = "CREATE TABLE IF NOT EXISTS `game` (
    `id`        INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `player_id` INT UNSIGNED NOT NULL,
    `time`      DOUBLE       NOT NULL,
    `size`      INT          NOT NULL,
    `seed`      INT          NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_game_user`
        FOREIGN KEY (`player_id`) REFERENCES `user`(`id`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )";

     $pdo = dbConnection();

    try {
        $pdo->exec($createTableUser);
        $pdo->exec($createTableGame);
    } catch (PDOException $e) {
        die("[dbManager.createDbIfNotExists] Adatbázis hiba adatázis létrehozás közben: " . $e->getMessage());
    }

}