<?php
    include_once("config.php");
    include_once("auth.php");
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
    <h1>Gyors Talpaló (érdemes egyszer elolvasni)</h1>
    <section class="menu">
        <h2 class="title">Labirintus (D6N2QU)</h2>
        <p>
            Ebben a játékban egy labirintust kell megoldani.
            Meg lehet adni a randomizációhoz szükséges "seed"-et <i>(pszeudo random)</i>, úgy tervezem hogy ez majd ahhoz fog kelleni hogy "ugyanazon" a pályán tudjanak majd játszani a játékosok, és így lehessen majd "leaderboard"-ot csinálni.
            Illetve meg lehet adni a labirintus méretét (ez a 2 adat ír le egy labirintust, ha megegyezik ez a 2 akkor a 2 labirintus biztosan ugyanaz), az ajánlott tartomány az 10 és 40 közötti számok (50 felett figyelmeztetést kapunk arról hogy lehet hogy a pálya méret miatt a játék kicsit lassabban fog futni).
            Majd a <i>Start</i> gombbal lehet legenerálni a labirintust, és ezzel a játék is elindul. A <b>W,A,S,D</b> (vagy nyilak) billentyűkkel lehet mozogni.
        </p>
        <p>
            Érdemes a játék végén kipróbálni a legrövidebb út kirajzolásának animációját illetve a generálás animációját a <i>Show Path Animation</i> és a <i>Show Generation Animation</i> gombokkal.
            Természetesen játék közben is el lehet indítani (viszont a pályának léteznie kell) ezeket az "animációkat" viszont úgy romlik a játék élmény ha már tudjuk a legrövidebb utat.
            Be lehet állítani hogy mennyi időt várjon a program 2 animációs lépés között, ezt ezredmásodpercben (ms)-ben lehet megadni.
            Érdemes kicsi számmal (tehát gyors animációval) kipróbálni először mert kicsit lassú tud néha lenni és ezt az animációt nem lehet megszakítani, csak az oldal újra töltésével.
        </p>
        <p>
            UI:<br>
            Az animációkat nem lehet addig megnézni ameddig a játékos nem indítja el a játékot.
            A generálás animáció után automatikusan elindul egy új játék (mivel ugyanúgy néz ki az animáció után a pálya mint amikor elindul a játék)
            viszont a legrövidebb elérési útnál ott a játékosnak kell manuálisan új játékot indítani (mivel így addig tudja nézegetni az utat ameddig ő szeretné)
        </p>
        <div style="text-align: center; margin-top: 40px;">
            <a href="GamePage.php" class="button">Játék indítása</a>
            <a href="logout.php" class="button">Kijelentkezés</a>
        </div>
    </section>
</body>
</html>