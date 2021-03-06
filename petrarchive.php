<?php

Class Petrarchive {
	private $_base; 

	private static $_js = [
		'lib' => [
			'jquery' => '/jquery/jquery.min.js',
			'jquery_ui' => '/jquery-ui/ui/minified/jquery-ui.min.js'
		],

		'files' => [
			'petrarchive' => '/petrarchive.js',
			'facsimile' => '/facsimile.js'
		]
	];

	private static $_css = [
		'lib' => [
			'bootstrap' => '/lib/bootstrap.min.css',
			'jquery_ui_css' => '/lib/jquery-ui/themes/base/minified/jquery-ui.min.css'

		],

		'files' => [
			'custom' => '/custom.css',
			'screen' => '/stylesheets/screen.css'
		]
	];

	function __construct() {
		if ($_SERVER['HTTP_HOST'] == 'localhost') {
			$this->_base = dirname($_SERVER['PHP_SELF']);
		} else {
			$this->_base = '.';
		}
	}

	public function load_css() {
		$payload = '';

		$base = $this->_base . '/css';

		foreach (self::$_css as $key => $val) :
			if ($key == 'lib') :
				foreach ($val as $lib_name => $lib_route) {
					$src = $base . $lib_route;

    				$payload .= 
    					'<link href="'
    					. $src
    					. '" media="screen, projection" rel="stylesheet" type="text/css" />';
				}
			else :
				foreach ($val as $file_name => $file_route) {
					$src = $base . $file_route;
					
					$payload .= 
    					'<link href="'
    					. $src
    					. '" media="screen, projection" rel="stylesheet" type="text/css" />';
				}
			endif;

		endforeach;

		echo $payload;
	}

	public function load_js($ignore = null) {
		/* 
			$ignore = OPTIONAL ARRAY of files to ignore. Listed files
			will not be loaded. All others will be loaded.

			Default: null - no files ignored

			Format : [
				'lib': [],
				'files': []
			]
		*/

		$ignore = self::process_ignore($ignore);

		$payload = '';

		$base = $this->_base . '/js';

		foreach (self::$_js as $key => $val) :
			if ($key == 'lib') :
				foreach ($val as $lib_name => $lib_route) {
					if (! in_array($lib_name, $ignore['lib']) ) {
						$src = $base . $lib_route;
						$payload .= '<script type="text/javascript" src="' . $src . '"></script>';
					}
				}
			else :
				foreach ($val as $file_name => $file_route) {
					if (! in_array($file_name, $ignore['files']) ) {
						$src = $base . $file_route;
						$payload .= '<script type="text/javascript" src="' . $src . '"></script>';
					}
				}
			endif;

		endforeach;

		echo $payload;
	}

	private static function process_ignore($ignore) {
		if (!$ignore) {
			$ignore = [
				'lib' => [],
				'files' => []
			];
		} else {
			if (! array_key_exists('lib', $ignore) ) {
				$ignore['lib'] = [];
			}
			if (! array_key_exists('files', $ignore) ) {
				$ignore['files'] = [];
			}
		}

		return $ignore;
	}
}

?>
