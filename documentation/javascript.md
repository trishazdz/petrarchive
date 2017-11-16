# Petrarchive Javascript - How the poems operate

### poem.js - /js/poem.js
This is equivalent to what many applications call 'app.js' or 'main.js'. All functionality needed by  the poem page is located and 'run' here. a new Petrarchive object is inited and set to the global scope as PT like so: `window.PT = new Petrarchive()`

One other thing poem.js does is to setup functionality related to the sticky-header.
###### Vendor Dependencies
    jQuery 3.2.1
        jQuery-ui 1.12.1 *Also need jquery-ui css theme
    Bootstrap 4.0.0 JS and CSS
    Knockout 3.4.2
###### Homebrew Dependencies (Located in /js/)
    Petrarchive
        NavUtil
        CommentaryUtil
        Frame
        PetrarchiveDocument
_*Since we are using es5.js rather than the more modern es6/es7, every js file must be evoked the old school way via <script> tags in the html... thus there is not point in repeating the dependencies throughout this documentation, since the entire poem experience requires each js file_

### Petrarchive `object` - /js/petrarchive.js
poem.js runs the functionality for the poem pages, but it does so by using a Petrarchive object. Similar to how all of jQuery's functionality gets encapsulated within a variable name of $ or jQuery, the functionality that poem.js needs is encapsulated within a Petrarchive object. 

navigational functionality @`Petrarchive.nav` which is a `NavUtil` object
commentary functionality @ `Petrarchive.commentary` which is a `CommentaryUtil` object
facsimle functionality @ `Petrarchive.facs` which is a `Frame` object

Another thing `Petrarchive` performs is the switching of themes. This theme switching functionality relies on the `knockout` library.

### NavUtil `object` - /js/navutil.js
Allows for navigation between chartas. Previous and Next `<a>` tags have their `href` attributes set by `NavUtil`.

### CommentaryUtil `object` - /js/commentaryutil.js
Functionality related to the commentary section located here. This is still subject to a large amount of change once Wayne reveals more .xml documents with multiple commentary sections and even embeded media within the commentary.

### Frame `object` - /js/frame.js
Allows for `<img>` to be framed. Framed `<img>` can be explored via drag and drop, zoomed in and out via mousescroll/zoom buttons. Frames can even be resized.

_This is a standalone module that I wrote for another project but fit in perfectly with the required facsimile functionality. I will probably be open sourcing this file in the future, so petrarchive and any other project can simply pull changes/updates from the repo._

