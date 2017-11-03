<!DOCTYPE HTML system "about:legacy-compat">
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Petrarchive: People</title>

	<script type="text/javascript" src="js/auxillary_page.js"></script>

    <link href="stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
</head>
<body>
<?php include("nav.html"); ?>
<!-- number index, first line index, visual index, genre index -->

<div id="content">
<h1>Technical Architecture</h1>

<p>Petrarchive documents are encoded in XML according to the Text Encoding Initiative (TEI) <cite><a href="http://www.tei-c.org/release/doc/tei-p5-doc/en/html/index.html">P5: Guidelines for Electronic Text Encoding and Interchange</a></cite>. </p>

<p><a href="http://teiboilerplate.org">TEI Boilerplate</a> is used to render both diplomatic transcriptions and edited views of the text. TEI Boilerplate code has been extensively modified to display diplomatic and edited views of the text and to accurately render the Petrarchan visual poetics of Vat. Lat. 3195.</p>

<p>The TEI/XML content, XSLT, CSS, JavaScript, and other files are maintained, with version control, in a GitHub repository.</p>
</div>
<?php include("footer.html"); ?>

</body>
</html>
