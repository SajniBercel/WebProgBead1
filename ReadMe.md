# A játék használata
Az index.html-ben van hosszabb leírás. Röviden: 
W A S D az irányításhoz (vagy nyilak) egy labirintust kell megoldani, meg lehet addni a méretét és hogy milyen random seed-ből generálja.
A játék végén meg lehet nézni 2 "animációt" az egy a legrövidebb út a másik a labirintus generálásának vizualizációja (az animációk sebessége állítható) 
ezeket nem lehet megszakítani.
Ha a játékos "kitalál" a labirintusból akkor egy felugró ablak gratulál illetve kiirja hogy mennyi ideig tartott a játék.

# Előadásokból elsajátított és felhasznált témák
## JavaScript nyelvi elemei
export/import, osztályok (class). Funkionális nyelv szerű függvények tömbökön (.select .filter stb...). (jsDoc)

## DOM
Adatok bekérése a felhasználótól input tag-el. DOM elemek létrehozáse, majd hátter/keret manipulálása.

## Eseménykezelés
A gombok lenyomását EventListener-ek figyelik illevte a billenytűlenyomást is.

## Kódszervezés, adatok tárolása
Module függvények, Module osztályok, az osztályok file-okra vannak osztva 

## Űrlapok, képek, táblázatok
form, number típusú input aminek az értéke van felhasználva, 
button típusú input ami folyamatokat tud elindítani, időzítő amivel "animáció szerű" hatást probál elérni a program

## Canvas, animációk, API-k
Se canvas-t se hagyományos értelembe vett animációt nem csináltam, mindent meg tudtam oldani DOM manipulációval amire szükségem volt.

# További források
Nem lenne fair ha az előadás diák mellett nem említeném meg a többi forrást

## Devileoper.Mozilla
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
akkor használtam álltalában amikor js beépített objektumok/függvények müködése nem volt világos

## Wikipedia Maze generation algorithm
https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_implementation
Utánna kerestem hogy milyen megoldások vannak labirintus generálásra és itt találtam egyszerű megoldást, rövid leírással.

## Wikipedia Linear congruential generator
https://en.wikipedia.org/wiki/Linear_congruential_generator
Erre azért volt szükség mert js-ben nem lehet "kézzel" beállítani a "seed"-et a Math.random-hoz 
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).
Szóval utánna néztem hogy mit lehet csinálni és azt találtam hogy alig pár sorból lehet "pseudo random" számot generálni, 
és így már könnyű volt beállítani a seed-et (az index.html-ben részletezem hogy miért van erre szükség)
