<!DOCTYPE html>
<html lang="en">
<head>
 <!-- Required meta tags -->
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

	<title>Petrachive: An Edition of Petrarch’s Songbook</title>

  <link rel="stylesheet" type="text/css" href="css/lib/bootstrap.min.css" />
  <link rel="stylesheet" type="text/css" href="js/jquery-ui/jquery-ui.min.css" />

  <link rel="stylesheet" type="text/css" href="css/stylesheets/screen.css" />
  <link rel="stylesheet" type="text/css" href="css/stylesheets/index.css" />
</head>
<body>

<main class="container">

<?php include("nav.html"); ?>

<!-- number index, first line index, visual index, genre index -->
<div class="row" id="banner">
  <div class="hidden-sm-down show-md-up">
    <div id="bannertitle">Petr<span class="archive">archive</span></div>
    <div id="bannersubtitle">An edition of Petrarch’s songbook</div>
    <div id="bannerrvf">Rerum vulgarium fragmenta</div>
    <div id="bannerresp">Edited by 
      <a href="http://frit.indiana.edu/faculty/storey.shtml" target="_blank">H. Wayne Storey</a>, 
      <a href="http://info.ils.indiana.edu/~jawalsh/" target="_blank">John A. Walsh</a> and 
      <a href="http://isamagni.com/" target="_blank">Isabella Magni</a>
    </div>
  </div>

  <div class="hidden-md-up show-sm-down">
    <div id="bannertitle">Petr<span class="archive">archive</span></div>
    <div id="bannersubtitle">An edition of Petrarch’s songbook</div>
    <div id="bannerrvf">Rerum vulgarium fragmenta</div>
    <div id="bannerresp">Edited by 
      <a href="http://frit.indiana.edu/faculty/storey.shtml" target="_blank">H. Wayne Storey</a>, 
      <a href="http://info.ils.indiana.edu/~jawalsh/" target="_blank">John A. Walsh</a> and 
      <a href="http://isamagni.com/" target="_blank">Isabella Magni</a>
    </div>
  </div>
</div>

<div id="vizindex" class="container">
  <div class="row built-vizindex">
    <?php require 'vizindex_builder.php'; ?>
    <?php include('vizindex.html'); ?>
  </div>

  <div class="row built-vizindex hide">
    <?php //include("vizindex.html"); ?>
  </div>
</div>

<section class="row">
  <main class="col-12">
    <p>
      When you hear the words <em>sonnet</em>, <em>Renaissance</em>, 
      <em>western literature</em>, <em>love songs</em>, 
      you are hearing the direct influence of Francesco Petrarca 
      (Petrarch) and of his collection of lyric poems that he called 
      “Fragments in the Vernacular” (<cite>Rerum vulgarium 
      fragmenta</cite>).
    </p>

    <p>
      The Petrarchive is designed as a tool both to introduce Petrarch’s 
      collection—a collection that continues to influence modern cultures 
      in many languages—and to give advanced users access to 
      Petrarch’s “original” text and an extensive “material” 
      commentary for each poem. Within the Petrarchive you will find 
      edited and diplomatic transcriptions of Petrarch’s songbook; 
      visual maps illustrating Petrarch’s design, layout, and 
      visual poetics; and multi-layered commentary addressing prosodic, historic, 
      textual, and thematic issues along with an English translation 
      of the poems.
    </p>
  </main>
</section>
</main>

<?php include "footer.html"; ?>

<script type="text/javascript" src="js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="js/jquery-ui/jquery-ui.min.js"></script>

    
<script type="text/javascript" src="js/index.js"></script>
</body>
</html>
