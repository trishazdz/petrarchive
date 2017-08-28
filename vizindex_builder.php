<?php
$dir = __DIR__ . '/images/visindex/';
$url = $_SERVER['SERVER_NAME'];

$meta_file = file_get_contents('charta-meta.json');
$meta = json_decode($meta_file, true);

$files = new DirectoryIterator($dir);
foreach ($files as $f) {
    if (!$f->isDot()) {
    	$file_name = $f->getFilename();

    	if (explode(".", $file_name)[1] !== 'svg') {
    		return;
    	}

        // remove .svg
        $exploded_file_name = explode(".", $file_name)[0];
        $subbed_file_name = substr($exploded_file_name, 1);

        if (array_key_exists($subbed_file_name, $meta)) {
            $charta_meta = $meta[$subbed_file_name];

            if (array_key_exists('document', $charta_meta)) {
                $url = $charta_meta['document'];
            } else {
                $url = $exploded_file_name;
            }

            if ($charta_meta['commentary']) {
                $url .= '_with_commentary';
            }
        } else {
            $url = $exploded_file_name;
        }

        $url .= '.xml';

        $html = '<a class="col-1" href="content/' . $url . '"><img alt="' 
        . $exploded_file_name 
        . '" class="vi-img" src="images/visindex/' 
        . $file_name . '" /></a>';

        echo $html;
    }
}
?>
