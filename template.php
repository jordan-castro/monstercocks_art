<!-- This file is what goes before each HTML file in the build. This allows de metas!!! -->

<?php
    $GLOBALS['BASE_PATH'] = $_SERVER['DOCUMENT_ROOT'] . '/api/';

    # Busca el URL currentamente en uso
    $url = $_SERVER['REQUEST_URI'];
    
    # Los metas default
    $og_title = "MonsterCocks Art";
    $og_description = "The worlds largest digitial collection of MonsterCocks!";
    $og_image = "/logo.png";
    $og_url = "http://www.monstercocks.art";
    $og_site_name = "MonsterCocks Art";

    # Chequea is el URL es para un cock individual
    # We check by seeing if the url contains "/cock/"
    if (strpos($url, "/cock/") !== false) {
        # Si es así, busca el ID del cock
        $id = explode("/cock/", $url)[1];

        # Busca el cock en la base de datos.
        # Hacemos un include_once de el api/read.php con el SERVER_ROOT
        include_once($GLOBALS['BASE_PATH'] . "data/read.php");

        # Busca el cock desde el $id
        $cock = readCock((int) $id);

        $og_title = $cock['name'];
        $og_description = "Check out " . $cock['name'] . " on MonsterCocks!";
        
        // Chequea si el cock tiene una imagen
        if ($cock['image']) {
            $og_image = "https://www.monstercocks.art/" . $cock['image'];
        }
        $og_url = "https://www.monstercocks.art/cock/" . $cock['id'];
        $og_site_name = "MonsterCocks Art";

    } elseif (strpos($url, '/owner/') !== false) {
        # Si es así, busca el address del owner
        $address = explode("/owner/", $url)[1];

        # Include el api/data/read.php
        include_once($GLOBALS['BASE_PATH'] . "data/read.php");

        # Busca el owner desde el $address
        $owner = readAuthor($address);
        // Chequea si el owner existe
        if (count($owner) > 0) {
            $og_title = $owner['name'];
            $og_description = "Check out " . $owner['name'] . "'s account on MonsterCocks!";
            if ($owner['image']) {
                $og_image = "https://www.monstercocks.art/" . $owner['image'];
            }
            $og_url = "https://www.monstercocks.art/owner/" . $owner['address'];
            $og_site_name = "MonsterCocks Art";
        }
    }
?>
