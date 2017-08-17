<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Petrachive: An Edition of Petrarch’s Songbook</title>

  <link rel="stylesheet" type="text/css" href="css/lib/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="js/jquery-ui/jquery-ui.min.css" />

  <link rel="stylesheet" type="text/css" href="css/stylesheets/screen.css" />
  <link rel="stylesheet" type="text/css" href="css/stylesheets/index.css" />
</head>
<body class="container">
<!-- number index, first line index, visual index, genre index -->
<div id="banner">
  <div id="bannertitle">Petr<span class="archive">archive</span></div>
  <div id="bannersubtitle">An edition of Petrarch’s songbook</div>
  <div id="bannerrvf">Rerum vulgarium fragmenta</div>
  <div id="bannerresp">Edited by 
    <a href="http://frit.indiana.edu/faculty/storey.shtml" target="_blank">H. Wayne Storey</a>, 
    <a href="http://info.ils.indiana.edu/~jawalsh/" target="_blank">John A. Walsh</a> and 
    <a href="http://isamagni.com/" target="_blank">Isabella Magni</a>
  </div>
</div>

<div id="vizindex" class="container">
  <div class="row">
  <?php include 'vi.php'; ?>
  </div>
  <div class="row">
    <p>
      Why is this built and why are you motivated to build it? Speak to commentary that is provided. State the contribution. Speak to the value of this and what you hope it allows other scholars to do (motivation). 
    </p>
  </div>

</div>

<?php include "footer.html"; ?>

<script type="text/javascript" src="js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui/jquery-ui.min.js"></script>

    
<script type="text/javascript" src="js/index.js"></script>
</body>
</html>
