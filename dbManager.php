<?php
include_once("config.php");

/**
 * létrehoz egy adabázis kapcsolatot
 * @return PDO
 */
function getConnection(): PDO {
    // ELTE:
    $host = 'mysql.caesar.elte.hu';
    $dbName = 'sajnibercel';
    $userName = 'sajnibercel';
    $password = 'fwgihHmjH6sL4FxM';

    //LOCALHOST:
//    $host = 'localhost';
//    $dbName = 'maze';
//    $userName = 'root';
//    $password = '';

    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ];

    $pdo = null;
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbName;charset=utf8mb4", $userName, $password, $options); //TODO: a jelszót localhost-on null-ra kell írni
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

function updateUser(PDO $pdo, int $userID, float $time, int $size, int $seed): void {
    $sql = "INSERT INTO game (player_id, time, size, seed) 
            VALUES (:userID, :time, :size, :seed)";
    $stmt = $pdo->prepare($sql);

    try {
        $stmt->execute([
            ':userID' => $userID,
            ':time' => $time,
            ':size' => $size,
            ':seed' => $seed,
        ]);
    } catch (PDOException $e) {

    }
}

/**
 * string tömb (táblázatos formában)
 * @param PDO $pdo
 * @return array
 */
function getLeaderBoard(PDO $pdo) {
    $query = "SELECT u.name, g.time, g.size, g.seed 
              FROM user u
              JOIN game g ON u.id = g.player_id
              ORDER BY g.time DESC";

    $stmt = $pdo->prepare($query);
    $stmt->execute();

    $leaderboard = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = [];
    foreach ($leaderboard as $row) {
        $result[] = [
            $row['name'],
            (string)$row['time'],
            (string)$row['size'],
            (string)$row['seed']
        ];
    }

    return $result;
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
    PRIMARY KEY (`id`)
    )";

     $pdo = getConnection();

    try {
        $pdo->exec($createTableUser);
        $pdo->exec($createTableGame);
    } catch (PDOException $e) {
        die("[dbManager.createDbIfNotExists] Adatbázis hiba adatázis létrehozás közben: " . $e->getMessage());
    }

}