<!DOCTYPE HTML system "about:legacy-compat">
<html lang="en">

<head>
    <meta charset="utf-8" />
    <title>Petrarchive: No., first line, and genre index</title>

    <link rel="stylesheet" type="text/css" href="css/lib/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="js/jquery-ui/jquery-ui.min.css" />

    
    <link href="css/teibp.css" media="screen, projection" rel="stylesheet" type="text/css" />  
    <link href="css/custom.css" media="screen, projection" rel="stylesheet" type="text/css" />  
    <link href="css/auxillaryPage.css" media="screen, projection" rel="stylesheet" type="text/css" />      

    <link rel="stylesheet" type="text/css" href="css/stylesheets/screen.css" />
</head>

<body>
    <main class="container">
        <header>
            <?php include( "sticky_header.html"); ?>
        </header>

        <main class="row">
            <div style='margin-top: 2em;' class="col-12">
                <?php include( "textindex.html"); ?>
            </div>
        </main>
    </main>

    <?php include "footer.html"; ?>


    <script src="https://use.fontawesome.com/57840704ee.js"></script>

    <script type="text/javascript" src="js/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui/jquery-ui.min.js"></script>
    
    <script type="text/javascript" src="js/tether/tether.min.js"></script>
    <script type="text/javascript" src="js/bootstrap/bootstrap.min.js"></script>


    <script type="text/javascript" src="js/auxillary_page.js"></script>

    <script>
        function onetime(node, type) {

            // create event
            node.addEventListener(type, function (e) {
                // remove event
                e.target.removeEventListener(e.type, arguments.callee);
                // call handler
            });

        }



        function scrollToAnchor(anchor) {
            var lineSort = document.getElementsByTagName('th')[2].getAttribute('class');
            if (lineSort==' ' || !lineSort) {
                eventFire(document.getElementsByTagName('th')[2], 'click');

                $('.sorttable_sorted').removeClass()
            }
            if (lineSort == ' sorttable_sorted_reverse') {
                x = $('td[id]');
                for (var i = 0; i < x.length; i++) {
                    if (x[i].getAttribute('id') == anchor) {
                        x[i - 1].parentNode.nextSibling.setAttribute('id', 'reverse' + anchor);
                        $('html,body').animate({
                            scrollTop: $("#reverse" + anchor).offset().top
                        }, 800);
                    }
                }
            } else {
                $('html,body').animate({
                    scrollTop: $("#" + anchor).offset().top
                }, 800);
            }

            return false;
        }


        function eventFire(el, etype) {
                if (el.fireEvent) {
                    el.fireEvent('on' + etype);
                } else {
                    var evObj = document.createEvent('Events');
                    evObj.initEvent(etype, true, false);
                    el.dispatchEvent(evObj);
                }
            }
            //-->
    </script>
    <script type="text/javascript" src="js/sortable/sorttable.js">
        <!-- -->
    </script>

    <link type="text/css" rel="subresource" href="js/sortable/example.css" />   

</body>

</html>
