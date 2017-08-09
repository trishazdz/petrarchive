<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Petrachive: An Edition of Petrarch’s Songbook</title>
  <?php 
    include "petrarchive.php"; 
    $PT = new Petrarchive();
    $PT->load_css();
    $PT->load_js(
		['files' => ['facsimile']]
    );
  ?>
</head>
<body>
<!-- number index, first line index, visual index, genre index -->
<div id="titlepage">
<div id="banner">
<div id="bannertitle">Petr<span class="archive">archive</span></div>
<div id="bannersubtitle">An edition of Petrarch’s songbook</div>
<div id="bannerrvf">Rerum vulgarium fragmenta</div>
<div id="bannerresp">Edited by H. Wayne Storey, John A. Walsh and Isabella Magni</div>
</div>

<style>
  #bannertitle {color: #afafaf;}
  #vizindex img {width:100%;}
  #vizindex .col-1 {padding: 0; border: 2px solid #afafaf; max-width: 4%;}
</style>
  
<div id="vizindex" class="container">
  <div class="row">
  <?php include 'vi.php'; ?>
  </div>

  <div class="row">
    <p>
      Why is this built and why are you motivated to build it? Speak to commentary that is provided. State the contribution in a more poetic and digestible way. Point out the value of this and what you hope it allows other scholars to do (motivation). 
    </p>
  </div>

</div>

<?php include "footer.html"; ?>
</div>
</body>
</html>
