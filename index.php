<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Petrachive: An Edition of Petrarch’s Songbook</title>

  <link rel="stylesheet" type="text/css" href="css/lib/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="js/jquery-ui/themes/base/minified/jquery-ui.min.css" />


  <link rel="stylesheet" type="text/css" href="css/custom.css" />
  <link rel="stylesheet" type="text/css" href="css/stylesheets/screen.css" />
  <link rel="stylesheet" type="text/css" href="css/stylesheets/index.css" />
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
</div>

<script type="text/javascript" src="js/jquery/jquery.min.js"></script>
<script
        src="http://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
        integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
        crossorigin="anonymous"></script>
    
<script type="text/javascript" src="js/index.js"></script>
</body>
</html>
