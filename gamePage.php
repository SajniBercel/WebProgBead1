<?php
include_once("auth.php");
?>
<!doctype html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Labirintus</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" type="image/x-icon" href="https://sajnibercel.web.elte.hu/Labirintus/icon.png">
</head>
<body>
    <form class="form-flex">
        <div class="row full">
            <h1 class="smallFontHeader">Labirintus (<?php echo $_SESSION["username"]?>)</h1>
        </div>
        <div class="row separator">
            <label for="numberOfRowsAndCols" title="leave as 0 if don't know what is this (the default is 11)">Seed for the randomization: </label>
            <input type="number" id="randomizationSeed" title="leave as 0 if don't know what is this (the default is 11)" placeholder="number" value="11" min="0">

            <label for="numberOfRowsAndCols">Maze Size: </label>
            <input type="number" id="numberOfRowsAndCols" placeholder="number" value="15" min="2" max="100">
        </div>
        <div class="row">
            <input type="button" class="button" id="startButton" value="Start">
        </div>
        <div class="row separator">
            <label for="animationStepTimer">Animation Timer (ms):</label>
            <input type="number" id="animationStepTimer" placeholder="number in ms" value="50" min="1">
        </div>
        <div class="row">
            <input type="button" class="button" id="showPathButton" value="Show Path Animation">
            <input type="button" class="button" id="showSmoothGeneration" value="Show Generation Animation">
        </div>
        <div class="row">
            <a href="manual.php" class="button" style="margin-top: 10px">Vissza A Főmenübe</a>
        </div>
    </form>
    <div class="container" id="tableContainer"></div>

<script type="module" src="js/GameManager.js"></script>
</body>
</html>