<?php
    include_once("config.php");
    include_once("auth.php");
    include_once("dbManager.php");
?>
<!doctype html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Labirintus</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" type="image/x-icon" href="https://sajnibercel.web.elte.hu/Labirintus/icon.png">
</head>
<body>
    <table style="margin-bottom: 30px">
        <tr>
            <th>Játékos Neve</th>
            <th>Játék Idő</th>
            <th>Pálya méret</th>
            <th>Pálya "azanosítója"</th>
        </tr>
        <?php
        $rowList = getLeaderBoard(getConnection());
        foreach ($rowList as $row) {
            $outputRow = "<tr>";
            $outputRow .=
                "<td>".$row[0]."</td>".
                "<td>".$row[1]."mp</td>".
                "<td>".$row[2]. "x" . $row[2] . "</td>".
                "<td>".$row[3]."</td>";

            $outputRow .= "</tr>";
            echo $outputRow;
        }
        ?>
    </table>
<a href="manual.php" class="button" style="margin-left: 48%; margin-top: 20px">Vissza</a>
</body>
</html>