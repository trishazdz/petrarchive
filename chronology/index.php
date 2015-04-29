<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<title>Petrachive: An Edition of Petrarch’s Songbook</title>
    <link href="../stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
    <script type="text/javascript">
<!--
    function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
    }
//-->
</script>
<script src="http://api.simile-widgets.org/timeline/2.3.1/timeline-api.js" type="text/javascript"></script>
<script src="http://www.simile-widgets.org/timeline/examples/examples.js" type="text/javascript"></script>

<!-- <script src="api/timeline-api.js" type="text/javascript"></script> -->
<!--
                <script src="http://localhost/~jawalsh/timeline/src/webapp/api/timeline-api.js" type="text/javascript" /> -->
<script type="text/javascript">
Timeline.GregorianDateLabeller.prototype.labelPrecise=function(date){
var x;
if ((date.getUTCDate() == 1) && (date.getUTCMonth() == 0)) {
  x = SimileAjax.DateTime.removeTimeZoneOffset( date, this._timeZone ).getUTCFullYear();
}
else {
x = SimileAjax.DateTime.removeTimeZoneOffset( date, this._timeZone ).toLocaleDateString();
}
return x;
};


var tl;
function onLoad() {
  var eventSourceSwinburne = new Timeline.DefaultEventSource();
  var eventSourceLiterature = new Timeline.DefaultEventSource();
  var eventSourceHistory = new Timeline.DefaultEventSource();
  
  

 var theme = Timeline.ClassicTheme.create();
            theme.event.bubble.width = 320;
            theme.event.bubble.height = 220;
            theme.event.track.height = 1.5;
            theme.event.track.gap = 0.1;
            
            //not working.  Think a versioning issue. Older versions worked.
            theme.ether.backgroundColors = [
                "#D1CECA",
                "#E7DFD6",
                "#E8E8F4",
                "#D0D0E8"
            ];


  var d = "Jan 1 1362 00:00:00 GMT"; 
  var bandInfos = [
    Timeline.createBandInfo({
   	    eventSource:    eventSourceSwinburne,
        date:           d,
        width:          "90%", 
        intervalUnit:   Timeline.DateTime.MONTH, 
        intervalPixels: 40,
        theme:          theme
    }),
    Timeline.createBandInfo({
        overview:       true,
        trackHeight:    0.5,
        trackGap:       0.2,
        eventSource:    eventSourceSwinburne,
        date:           d,
        width:          "10%", 
        intervalUnit:   Timeline.DateTime.YEAR, 
        intervalPixels: 40,
        theme:          theme
    }),
    Timeline.createBandInfo({
        eventSource:    eventSourceLiterature,
        date:           d,
        width:          "30%", 
        intervalUnit:   Timeline.DateTime.MONTH, 
        intervalPixels: 40,
        theme:          theme
    }),
    Timeline.createBandInfo({
        eventSource:    eventSourceHistory,
        date:           d,
        width:          "30%", 
        intervalUnit:   Timeline.DateTime.MONTH, 
        intervalPixels: 40,
        theme:          theme
    }),
  ];
  
  bandInfos[1].syncWith = 0;
  bandInfos[1].highlight = true;
  bandInfos[1].eventPainter.Layout=bandInfos[0].eventPainter.Layout; 
  //bandInfos[1].eventPainter.setLayout(bandInfos[0].eventPainter.getLayout());
  bandInfos[2].syncWith = 0;
  bandInfos[3].syncWith = 0;


  tl = Timeline.create(document.getElementById("my-timeline"), bandInfos);
  tl.loadXML("swinburne-events.xml", function(xml, url) {
                eventSourceSwinburne.loadXML(xml, url);
                //document.getElementById("swinburne-event-count").innerHTML = eventSourceSwinburne.getCount();
            });
  tl.loadXML("literature-events.xml", function(xml, url) {
                eventSourceLiterature.loadXML(xml, url);
                //document.getElementById("literature-event-count").innerHTML = eventSourceLiterature.getCount();
            });
  tl.loadXML("history-events.xml", function(xml, url) {
                eventSourceHistory.loadXML(xml, url);
                //document.getElementById("literature-event-count").innerHTML = eventSourceLiterature.getCount();
            });


}

var resizeTimerID = null;
function onResize() {
    if (resizeTimerID == null) {
        resizeTimerID = window.setTimeout(function() {
            resizeTimerID = null;
            tl.layout();
        }, 500);
    }
}

function centerTimeline(date) {
tl.getBand(0).setCenterVisibleDate(Timeline.DateTime.parseGregorianDateTime(date));
}



              
                </script>
                <script>
function clientSideInclude(id, url) {
  var req = false;
  // For Safari, Firefox, and other non-MS browsers
  if (window.XMLHttpRequest) {
    try {
      req = new XMLHttpRequest();
    } catch (e) {
      req = false;
    }
  } else if (window.ActiveXObject) {
    // For Internet Explorer on Windows
    try {
      req = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        req = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        req = false;
      }
    }
  }
 var element = document.getElementById(id);
 if (!element) {
  alert("Bad id " + id +
   "passed to clientSideInclude." +
   "You need a div or span element " +
   "with this id in your page.");
  return;
 }
  if (req) {
    // Synchronous request, wait till we have it all
    req.open('GET', url, false);
    req.send(null);
    element.innerHTML = req.responseText;
  } else {
    element.innerHTML =
   "Sorry, your browser does not support " +
      "XMLHTTPRequest objects. This page requires " +
      "Internet Explorer 5 or better for Windows, " +
      "or Firefox for any system, or Safari. Other " +
      "compatible browsers may also exist.";
  }
}
</script> 
                
                <style type="text/css">
           
#my-timeline, .simileAjax-bubble-container {
			line-height:1;
            margin:0;
            padding:0;
            font-family: Corbel, Verdana, Helvetica !important;
            font-size: small;
}

.timeline-event-label {
font-weight:bold;
}
div#my-timeline {margin:1em;}
div {padding:0;margin:0;}
h1 {padding:0;margin:0; font-size: 110%;}


span.legend-label {font-weight:bold; margin-right:1em; margin-left:.2em;}

.timeline-band-0 .timeline-ether-bg, .legend-swinburne {background-color:#D0D0E8;}
.timeline-band-1 .timeline-ether-bg{background-color:#E8E8F4;}
.timeline-band-2 .timeline-ether-bg, .legend-literature {background-color:#E7DFD6;}
.timeline-band-3 .timeline-ether-bg, .legend-history {background-color:#D1CECA;}

div.decades {margin:auto;
margin:.5em;
text-align:center;}

div.decades a {margin-right: 3em; font-size:110%; text-decoration:none;}

.bibl {
    display: block;
    margin-left: 2em;
    text-indent: -2em;
    padding: 0;
}

.works_cited {
padding-top:2em;
width:50%;
margin:auto;
}

.center {
text-align:center;
}





            </style> 
</head>
<body onload="onLoad();" onresize="onResize();">
<!-- number index, first line index, visual index, genre index -->
<?php include("../nav_chronology.html"); ?>
<!--<div id="banner" onclick="window.location='/swinburne/'">
</div>-->
<div id="chrono_container">
<div id="chrono_intro">
	<h1>A Petrarch Chronology: 1304-1374</h1> 
<p style="font-size:85%;">This <cite>Chronology</cite> is also available in <a href="../content/chronology_petrarch.xml">tabular form</a>.
	<!--<p>
		The scrolling timeline below displays a chronology of Swinburne's life, along with parallel timelines for the literary context and the historical and cultural context of Swinburne's life.
	</p> -->
</div>

    <div class="decades"><a href="javascript:centerTimeline(1300);">1300</a> <a href="javascript:centerTimeline(1310);">1310</a> <a href="javascript:centerTimeline(1320);">1320</a> <a href="javascript:centerTimeline(1330);">1330</a> <a href="javascript:centerTimeline(1340);">1340</a> <a href="javascript:centerTimeline(1350);">1350</a> <a href="javascript:centerTimeline(1360);">1360</a> <a href="javascript:centerTimeline(1370);">1370</a></div>
<div id="my-timeline" style="height: 575px; border: 1px solid #aaa">
</div>
        <div class="decades"><a href="javascript:centerTimeline(1300);">1300</a> <a href="javascript:centerTimeline(1310);">1310</a> <a href="javascript:centerTimeline(1320);">1320</a> <a href="javascript:centerTimeline(1330);">1330</a> <a href="javascript:centerTimeline(1340);">1340</a> <a href="javascript:centerTimeline(1350);">1350</a> <a href="javascript:centerTimeline(1360);">1360</a> <a href="javascript:centerTimeline(1370);">1370</a></div>
        <!--
    <div class="legend">
        <img class="legend-swinburne" align="middle" src="images/legend.png" alt="'foolscap blue'" /><span class="legend-label">Swinburne</span>
        <img class="legend-literature" align="middle" src="images/legend.png" alt="tan" /><span class="legend-label">Literary Context</span>
        <img class="legend-history" align="middle" src="images/legend.png" alt="taup" /><span class="legend-label">Historical and Cultural Context</span>
    </div>-->
<?php include("works_cited.html"); ?>
    
</div>
<?php include("../footer.html"); ?>
</body>
</html>
