<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Petrachive: An Edition of Petrarch’s Songbook</title>
  <?php 
    include "petrarchive.php"; 
    $PT = new Petrarchive();
    $PT->load_css();
    $PT->load_js();
  ?>
</head>
<body>
<!-- number index, first line index, visual index, genre index -->
<?php include "nav.html"; ?>
<div id="titlepage">
<div id="banner">
<div id="bannertitle">Petr<span class="archive">archive</span></div>
<div id="bannersubtitle">An edition of Petrarch’s songbook</div>
<div id="bannerrvf">Rerum vulgarium fragmenta</div>
<div id="bannerresp">Edited by H. Wayne Storey, John A. Walsh and associate editor Isabella Magni</div>
</div>
<?php include "footer.html"; ?>
</div>
</body>
</html>
