/**
 Alex Scott
 INF133 -> Midterm / Final Project
 **/

// forces scrolling to the top
function force_top() {
   $("html, body").animate({scrollTop: 0}, 300, 'swing');
}

// returns true if we should change the panel with the hash id
// that was given to us, otherwise returns false
function check_hash(hash, panels) {
    return (hash && hash in panels);
}

function restore_default_glyphicons() {
    var $portfolio = $('nav a[href=#portfolio]');
    var $contact =  $('nav a[href=#contact]');
    var $final = $('nav a[href=#final]');
    if($portfolio.hasClass('fa-folder-open-o')) {
        $portfolio.removeClass('fa-folder-open-o');
        $portfolio.addClass('fa-folder-o');
    }
    if($contact.hasClass('fa-envelope-open-o')) {
        $contact.removeClass('fa-envelope-open-o');
        $contact.addClass('fa-envelope-o');
    }
    if($final.hasClass('fa-comment')) {
        $final.removeClass('fa-comment');
        $final.addClass('fa-comment-o');
    }
}

$(document).ready(function(){

    var $main = $('#main');
    var $panels = $main.find('.panel');
    var $footer = $('#footer');

    var $nav = $('#nav').find('a');

    var current_hash = window.location.hash;

    var panels = [];
    var current_panel = null;
    var last_panel = null;

    var is_same_panel = false;

    // set up panels and add activate_panel function to each panel
    $panels.each(function(i) {
        var t = $(this);
        var panel_id = t.attr('id');
        panels[panel_id] = t;

        if(i == 0) {
            last_panel      = panel_id;
            current_panel   = panel_id;
        } else {
            t.hide();
        }

        // if fade_status is set to true, fade is instant
        // this function will change the active panel and force scroll to top
        t.activate_panel = function(fade_status){
            if(is_same_panel == true || current_panel == panel_id) {
                return false;
            }
            is_same_panel = true;
            $nav.removeClass('active');
            $nav.filter('[href="#'+panel_id+'"]').addClass('active');

            if(i == 0)  { window.location.hash = '#';              }
            else        { window.location.hash = '#' + panel_id;   }

            $footer.fadeTo("fast",0.001);
            panels[current_panel].fadeOut(fade_status ? 0 : "fast", function(){
                // set the current panel
                current_panel = panel_id;
                force_top();
                $main.animate({
                    height: panels[current_panel].outerHeight()
                }, fade_status ? 0 : "fast", 'swing', function (){
                    // bring in new, current panel
                    $footer.fadeTo(fade_status ? 0 : "fast", 1.0);
                    panels[current_panel].fadeIn(fade_status ? 0 : "fast", function(){
                        is_same_panel = false;
                    });
                });
            });
        };

    });

    // on click, change the panel
    $nav.click(function(e) {

        if ($(this).attr('href').substring(0,1) == '#') {
            e.preventDefault();
            e.stopPropagation();

            var article_id = $(this).attr('href').substring(1);

            if(article_id in panels) {
                panels[article_id].activate_panel();
                restore_default_glyphicons();
                if(article_id == 'portfolio') {
                    var $portfolio = $('nav a[href=#portfolio]');
                    $portfolio.removeClass('fa-folder-o');
                    $portfolio.addClass('fa-folder-open-o');
                } else if(article_id == 'contact') {
                    var $contact =  $('nav a[href=#contact]');
                    $contact.removeClass('fa-envelope-o');
                    $contact.addClass('fa-envelope-open-o');
                } else if(article_id == 'final') {
                    var $final = $('nav a[href=#final]');
                    $final.removeClass('fa-comment-o')
                    $final.addClass('fa-comment');
                }
            }
        }
    });

    // initialize site
    $(window).trigger('resize');
    if(check_hash(current_hash, panels)) {
        panels[current_hash].activate_panel(true);
    }

    $('#wrapper').fadeTo(400,1.0);

});