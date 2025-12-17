# !!! A js readme részt bent hagytam a file végére írtam a php readme rész (56. sor) !!!

Játék: https://sajnibercel.web.elte.hu/Labirintus/ <br/>
GitHub: https://github.com/SajniBercel/WebProgBead1 <br/>
(érdemes lehet ezt a file-t is inkább github-on megnézni inkább mert ott a github szépen be formázza)

# A játék használata
Az index.html-ben van hosszabb leírás. Röviden: 
W A S D az irányításhoz (vagy nyilak) egy labirintust kell megoldani, meg lehet adni a méretét és hogy milyen random seed-ből generálja.
A játék végén meg lehet nézni 2 "animációt" az egy a legrövidebb út a másik a labirintus generálásának vizualizációja (az animációk sebessége állítható) 
ezeket nem lehet megszakítani.
Ha a játékos "kitalál" a labirintusból akkor egy felugró ablak gratulál illetve kiírja hogy mennyi ideig tartott a játék.

# Előadásokból elsajátított és felhasznált témák
## JavaScript nyelvi elemei
export/import, osztályok (class). Funkcionális nyelvszerű függvények tömbökön (.select .filter stb...). (jsDoc)

## DOM
Adatok bekérése a felhasználótól input tag-el. DOM elemek létrehozása, majd háttér/keret manipulálása.

## Eseménykezelés
A gombok lenyomását EventListener-ek figyelik illetve a billentyűlenyomást is.

## Kódszervezés, adatok tárolása
Module függvények, Module osztályok, az osztályok file-okra vannak osztva 

## Űrlapok, képek, táblázatok
form, number típusú input aminek az értéke van felhasználva, 
button típusú input ami folyamatokat tud elindítani, időzítő amivel "animáció szerű" hatást próbál elérni a program

## Canvas, animációk, API-k (nincs)
Se canvas-t se hagyományos értelembe vett animációt nem csináltam, mindent meg tudtam oldani DOM manipulációval amire szükségem volt.

# További források
Nem lenne fair ha az előadás diák mellett nem említeném meg a többi forrást

## developer.mozilla.org
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
akkor használtam általában amikor js beépített objektumok/függvények működése nem volt világos

## Wikipedia Maze generation algorithm
https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_implementation
Utána kerestem hogy milyen megoldások vannak labirintus generálásra és itt találtam egyszerű megoldást, rövid leírással.

## Wikipedia Linear congruential generator
https://en.wikipedia.org/wiki/Linear_congruential_generator
Erre azért volt szükség mert js-ben nem lehet "kézzel" beállítani a "seed"-et a Math.random-hoz 
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).
Szóval utána néztem hogy mit lehet csinálni és azt találtam hogy alig pár sorból lehet "pseudo random" számot generálni, 
és így már könnyű volt beállítani a seed-et (az index.html-ben részletezem hogy miért van erre szükség)

## Legrövidebb út
Mivel régebben is csináltam ilyen megoldásokat ezért most ehhez nem használtam forrást.
Annyi tudok mondani hogy egy elég naív algoritmust használtam a Dijkstra-algoritmus

# Php rész, Hogyan működik a weboldal?
Ha nincs bejelentkezve a felhasználó akkor az index.php-ről a loginPage.php-ra lesz átirányítva ami egy egyszerű bejelentkező felület.
Itt van egy link a regisztrációs oldalra is ha még nincsen felhasználói fiókja, a regsztráció után be is jelentkezik nem kell külön regisztrálni majd belépni.
A validáció viszont mind a regisztrációnál mind a bejelentkezésnél érvényes (a jelszavak természetesn hash-elve vannak tárolva) ha hibás egy regisztráció akkor az authResponse.php oldaról csak az index.php-ra lehet vissza menni ami meg a login oldalra irányít át
ami kicsit megzavaró, bejelentkezésnél ilyen gond nyílván nincs, de a böngészőkbe épített vissza nyillal a regisztrációhoz rak vissza természetesen.
A bejelentkezés után van egy gomb amivel a játékot tudjuk elindítani, illetve egy gomb amivel a LeaderBoard-ot tudjuk megnézni, ezt adatbázisból kérdezi le természetesen és idő szerint van sorba rakva
az oldalt php kód generálja le, a harmadik gomb a kijelentkezés, törli a session-t és a session változó tartalmát.
Ha végig játszunk egy játékot akkor a játék végén elmenti az eredményünket (egy pályát két adat határozza meg, a mérete és a seed amit a fentebb olvasható pszeudo random szám generálásához használok) a játék végén a bejelentkezett felhasználó ID-ja (ezzel lehet majd visszanyerni a nevét)
és a pálya mérete és a seed mentődik el az adatbázisba nyilván való okokból

## php nyelvi elemei
használtam függvényeket, "const"-ot és OOP-s megoldásokat mint pl a PDO, session stb.

## Kimenet generálása PHP-vel
a "LeaderBoard"-nak a nagyrészét php generálja az adatbázisból kapott adatokból, de van még egy-két apró hely ahol php generál le kisebb részeket 

## Bemeneti adatok a környezettől (pl.: szerverbeállítások)
ebben a témában nem igen csináltam semmit ami látható, annyi apróságot csináltam hogy a "phpinfo()" függvénnyel megnéztem az ELTE szerveren
futó php engine verzióját mert nem akart müködni az egyik függvény amit használtam és kiderült hogy azért nem mert egy régebbi (7.4-es) php van az ELTE szerveren

## Űrlapkezelés: validálás és adatok feldolgozása
szerver oldalon validálom a felhasználó nevet és a jelszót is bejelentkezésnél és regisztrációnál

## Adattárolás: fájlban vagy adatbázisban
az ELTE mysql (InnoDB) adatbázisát használtam (természetes lokálisan sokat teszteletem mielőtt az ELTE szervereire került a project)
szerint ilyen célokra az sql szerver az kicsit elegánsabb mint file-ban tárolni

## Munkamenet kezelés szerver oldali megoldással
Session-t használtam, szokásos "session_start()" illetve használtam a  "$_SESSION" változót is, kilépéskor természetesen
a session-t megszüntetetem a "$_SESSION" változót meg üresre deffiniálom

## Hitelesítés (regisztráció, bejelentkezés, kijelentkezés), jogosultság kezelés
minden file elején van egy ilyen "guard" szerű dolog ami annyit csinál hogy ha nincs bejelentkezve a felhasználó akkor vissza rakja az index.php-ra ami
meg a bejelentkező oldalra ha nincs bejelentkezve, különben meg a főmenü szerű oldalra (manual.php) oldalra irányítja át

## Kódszervezés: logikai (osztályok és függvények) és fizikai (fájlok)
függbényeket használtam és sima php file-okat, szerintem ekkora méretű project-hez ez még nem karban tarthatatlan.
mivel problémám volt azzal amikor a file-ok szét voltak pakolva mappákba, ezért inkább kiraktam mindent a js-en kívül root könyvtárba,
tisztában vagyok vele hogy visszataszítóan csúnya így és ez így nem helyes de sajnos idő szűkében vagyok és az volt az elsődeleges hogy müködjön

## Aszinkron programozás szerver oldali kiszolgálása
ezt a téma címet nem értem pontosan, használtam ajax-ot (a játék végén a mentéshez) de a php engine megoldja hogy több kérést is ki tudjon szolgálni egyszerre nem kell hozzá semmit pluszba csinálni
remélem nem értettem nagyon félre

## Hibakezelés
ha jól emlékszem minden adatbázissal kapcsolatos dolot try catch-be raktam (ha nem akkor az csak figyelmetlenséből volt) és minden más bejövő adatot validálok

## Tesztelés
xampp-al lokálisan sok dinamikus teszten esett át a project a készülése alatt