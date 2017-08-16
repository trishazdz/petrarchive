<?php
$dir = __DIR__ . '/images/visindex/';
$url = $_SERVER['SERVER_NAME'];

$files = new DirectoryIterator($dir);
foreach ($files as $f) {
    if (!$f->isDot()) {
    	$file_name = $f->getFilename();

    	if (explode(".", $file_name)[1] !== 'svg') {
    		return;
    	}

        $url = explode(".", $file_name)[0] . '.xml';
        $alt = explode(".", $file_name)[0];

        $html = '<a class="col-1" href="content/' . $url . '"><img alt="' . $alt . '" class="vi-img" src="images/visindex/' . $file_name . '" /></a>';
        echo $html;
    }
}
?>
