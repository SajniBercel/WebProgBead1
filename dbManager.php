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
 * -1: már létezik a felhasználó név <br>
 * -2: egyéb ismeretlen hiba <br>
 * mindenmás: a létrejött userID
 * @param PDO $pdo
 * @param string $username
 * @param string $password
 * @return int
 */
function addUser(PDO $pdo, string $username, string $password): int {
    $sql = "SELECT COUNT(*) FROM user WHERE name = :username";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':username' => $username]);
    $userCount = $stmt->fetchColumn();

    if ($userCount > 0) {
        return -1;
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    $sql = "INSERT INTO user (name, password) VALUES (:name, :password)";
    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            ':name' => $username,
            ':password' => $hash,
        ]);

        return (int) $pdo->lastInsertId();
    } catch (PDOException $e) {
        echo $e->getMessage();
        return -2;
    }
}

// csak hogy ha kell akkor gyorsan lehessen db-t csinálni
function createDbIfNotExists(){
    $createTableUser = "CREATE TABLE IF NOT EXISTS `user` 
    (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(127)  NOT NULL,
    `password` VARCHAR(255)  NOT NULL,
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