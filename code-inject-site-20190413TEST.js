/*
  SQSHX
  20210426 timeline2019
  
  LU: 
    imageMax
    centerEvents
    logoResponsiveColor
    triggerLink
    configsite
    Audio Clips
    Timeline2019 Body Images
    sumnolnk
    Timeline2019
    Slick Testimonials (This looks to be only in CSS)
    Dynamic Color: Color Slick Elements
    Link Panels
    Dynamic Color: Color Quotes
    Dynamic Color: Color Summary Tags
    Social Bullets
    sectionClass: Add classes to sections based off of page title 
    sectionscroll - on page (not query) and using class
    infinAccord
    detectCreateAccordion: 
      place an image URL that's hosted on SQS and it's turned into an image and centered - .jpg, .png, .svg, .gif
      Turn tildes (~) into bullets
    scrollToSection: #footer takes you down to the footer
  
  contentFilter
  timeline2019
  bios
  infinAccord
  sectionClass
  socialBullets
  lnkPanels
  blogsections
  expandLink
  summaryCenter
  scrollToSection
  stickyNav
  siteConfig
  tabsBuild
  interactiveAnimation
  dynamicColorPanel
  SummaryPop
  PanelPop
  No Image Overlay [noover]
  Circle Image
  create Accordian
  create Table
  Content Character Styles
  Modals
  create Slick Carousel
  create Timeline
  create Compressed Summary Popup
*/

$(document).ready(function () {
  stackedImageGallery();
  connectIcons();
  bulletCarousel();
  summaryBlockTweakFunc();
  sqs_tagcloud_yah();
  popvideo();
  imageMax();
  centerEvents();
  logoResponsiveColor();
  //targetLinks();  //not ready yet until configsites is working
  triggerLink();
  contentFilter();
  audioclips();
  prodClickThru();
  sumnolnk();
  bios();
  infinAccord();
  sectionClass();
  socialBullets();
  lnkPanels();
  blogsections();
  expandlink();
  summaryCenter();
  scrollToSection();
  stickyNav();
  tabsBuild();
  panelpop();
  noover();
  circImage();
  detectCreateAccordion();
  detectCreateTable();
  contentCharacterStyles();
  setupModals();
  makeSlickCarousel();
  createTimeline();
  timeline2019();
  makeCompressedSummary();
  summaryPop();
  dynamicColorPanel();
  //interactiveAnimation();
});

$(window).on('load', function() {
    sumLinkOverRide();
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ siteConfig ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* new sep2019 */
function configsite(varname){

  SQSPageJSON = "/config-site?format=json";

  var success = false;
  var vartoget;

  $.getJSON(SQSPageJSON, function(data){
    success = true;
    vartoget = data.mainContent;
    vartoget = vartoget.substring(vartoget.indexOf(varname + ':')+varname.length + 1);
    vartoget = vartoget.substring(0,vartoget.indexOf(';')+0);

  }).fail(function(jqXHR) {
    if (jqXHR.status == 404) {

    } else {

    }
  });
  return vartoget;
}

function siteConfig(configVar){
  var getvar;
  for (var key in siteConfigVars) {
    if (siteConfigVars.hasOwnProperty(key)) {
      getvar = siteConfigVars[key][configVar];
    }
  }
  return getvar;
}

// Adding for a common function
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function clearCookie(cname){
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


function stackedImageGallery(){
  $('.image-wrapper').each(function(){ 
    $(this).next('.meta').addBack().wrapAll('<div class="imageAndMetaWrap" />');
  });
}
/* 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~ connectIcons ~~~~~~~~~~~~~~~~~~~~~~~~~~~ 
  ~connecticons
*/
function connectIcons() {
  // Find the trigger
  var chk;
  $(".sqs-block-content ul li").each(function (index) {
    chk = $(this).html();

    if (chk.indexOf("~connectIcons") != -1 || chk.indexOf("~connecticons") != -1) {
      $(this).parent("ul").addClass("connectIcons");
      $(this).detach(); // Remove this li
    }
  }); // First Loop

  $("ul.connectIcons li").each(function () {
    var $this = $(this);
    chk = $this.find("a").html();

    if (typeof chk !== "undefined" && chk !== null) {
      var chkSocial = $(this).text();

      if (chkSocial.toLowerCase().indexOf("twitter") != -1) {
        $this.addClass("socialIcon twitter");
        $this.find("p a").addClass("socialIconLink twitter");
      }

      if (chkSocial.toLowerCase().indexOf("youtube") != -1) {
        $this.addClass("socialIcon youtube");
        $this.find("p a").addClass("socialIconLink youtube");
      }

      if (chkSocial.toLowerCase().indexOf("instagram") != -1) {
        $this.addClass("socialIcon instagram");
        $this.find("p a").addClass("socialIconLink instagram");
      }

      if (chkSocial.toLowerCase().indexOf("facebook") != -1) {
        $this.addClass("socialIcon facebook");
        $this.find("p a").addClass("socialIconLink facebook");
      }

      if (chkSocial.toLowerCase().indexOf("linkedin") != -1) {
        $this.addClass("socialIcon linkedin");
        $this.find("p a").addClass("socialIconLink linkedin");
      } else {
        // If we've not found any, assign base class so we can assign a link
        $this.find("p a").addClass("socialIconLink");
      }
    }
  }); // Second Loop

  $("a.socialIconLink").each(function () {
    // First we add the LINK icon in case no matches are found
    $(this).html(svgicon_Link);
  });
  $("a.socialIconLink.twitter").each(function () {
    $(this).html(svgicon_Twitter);
  });
  $("a.socialIconLink.youtube").each(function () {
    $(this).html(svgicon_Youtube);
  });
  $("a.socialIconLink.instagram").each(function () {
    $(this).html(svgicon_Instagram);
  });
  $("a.socialIconLink.facebook").each(function () {
    $(this).html(svgicon_Facebook);
  });
  $("a.socialIconLink.linkedin").each(function () {
    $(this).html(svgicon_Linkedin);
  });
}

var styles_string = "a.socialIconLink{border-style:none !important;} ul.connectIcons li>*:first-child::before{padding:0;content:'';} ul.connectIcons{padding:0;list-style:none;text-align:center}ul.connectIcons li{display:inline-block;margin:0 .5rem}";
addStyle(styles_string);

function addStyle(styles) {
  var css = document.createElement("style");
  css.type = "text/css";
  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));
  document.getElementsByTagName("head")[0].appendChild(css);
}

var svgicon_Twitter =
  '<svg width="34" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33 6.1c-1.2.5-2.4.9-3.8 1a6.5 6.5 0 002.9-3.6c-1.3.8-2.7 1.3-4.2 1.6A6.4 6.4 0 0023.2 3a6.6 6.6 0 00-6.6 6.6l.2 1.5A18.5 18.5 0 013.3 4.2c-.6 1-.9 2.1-.9 3.3 0 2.3 1.2 4.3 2.9 5.5-1.1 0-2.1-.3-3-.8v.1c0 3.2 2.3 5.8 5.3 6.4l-1.7.2-1.2-.1a6.7 6.7 0 006.1 4.6 13 13 0 01-8.2 2.8L1 26.1C3.9 28 7.4 29 11.1 29c12.1 0 18.7-10 18.7-18.7v-.8c1.2-1 2.3-2.1 3.2-3.4z" fill="#7E7E7E"/></svg>';
var svgicon_Youtube =
  '<svg width="34" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M31.4 5.8c1 1 1.3 3.4 1.3 3.4s.3 2.7.3 5.5v2.6c0 2.8-.3 5.5-.3 5.5s-.3 2.4-1.3 3.4c-1.1 1.2-2.3 1.3-3 1.4a8.8 8.8 0 00-.2 0C23.7 28 17 28 17 28s-8.3 0-10.9-.3l-.4-.1c-.8-.1-2.1-.3-3.1-1.4-1-1-1.3-3.4-1.3-3.4S1 20.1 1 17.3v-2.6c0-2.8.3-5.5.3-5.5s.3-2.4 1.3-3.4c1-1.2 2.3-1.4 3-1.4h.2C10.3 4 17 4 17 4s6.7 0 11.2.3h.2c.7.1 1.9.3 3 1.5zM23 16l-10 6V10l10 6z" fill="#7E7E7E"/></svg>';
var svgicon_Instagram =
  '<svg width="34" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 3.7h6c4.1.3 6 2.2 6.2 6.2a104.2 104.2 0 010 12.2c-.2 4-2 6-6.1 6.1a103.7 103.7 0 01-12.2 0c-4-.2-6-2.1-6.1-6.1a103.7 103.7 0 010-12.2c.2-4 2-6 6.1-6.1l6.1-.1zM17 1h-6.2c-5.4.3-8.5 3.4-8.7 8.8a105.4 105.4 0 000 12.4c.2 5.4 3.3 8.5 8.7 8.7a107 107 0 0012.4 0c5.4-.2 8.5-3.3 8.7-8.7a105.4 105.4 0 000-12.4c-.2-5.4-3.3-8.5-8.7-8.7L17 1zm0 7.3a7.7 7.7 0 100 15.4 7.7 7.7 0 000-15.4zM17 21a5 5 0 110-10 5 5 0 010 10zm8-14.8a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6z" fill="#7E7E7E"/></svg>';
var svgicon_Facebook =
  '<svg width="34" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.1 31V17.3h4.6l.7-5.3h-5.3V8.6c0-1.5.4-2.6 2.6-2.6h2.8V1.2L20.4 1c-4.1 0-6.9 2.5-6.9 7v4H9v5.3h4.6V31h5.5z" fill="#7E7E7E"/></svg>';
var svgicon_Linkedin =
  '<svg width="34" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.4 10.8H8V31H1.4V10.8zM4.8 1C2.5 1 1 2.5 1 4.5S2.4 8 4.7 8C7 8 8.5 6.4 8.5 4.5 8.5 2.5 7 1 4.8 1zm19.5 9.3c-3.5 0-5 2-6 3.3v-2.8h-6.6V31h6.7V19.7c0-.6 0-1.2.2-1.6.5-1.3 1.6-2.5 3.4-2.5 2.4 0 3.4 1.8 3.4 4.6V31H32V19.4c0-6.2-3.3-9.1-7.7-9.1z" fill="#7E7E7E"/></svg>';
var svgicon_Link =
  '<svg width="34" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25 8c2.2 0 4.1.8 5.7 2.4A7.7 7.7 0 0133 16a8 8 0 01-8 8h-6.4v-3H25c1.4 0 2.5-.5 3.5-1.4a4.8 4.8 0 000-7c-1-1-2.1-1.5-3.5-1.5h-6.4V8H25zm-14.4 9.6v-3.1h12.8v3.1H10.6zm-5.2-5c-1 1-1.4 2-1.4 3.4a5 5 0 001.4 3.6A5 5 0 009 21h6.4v3H9a8 8 0 01-8-8c0-2.2.8-4 2.3-5.6A7.5 7.5 0 019 8h6.4v3H9c-1.4 0-2.6.6-3.6 1.6z" fill="#7E7E7E"/></svg>';





/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Summery Link Overide ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function sumLinkOverRide(){
  /* */
  $('.summary-excerpt p a').each(function(){
    var chk = $(this).text();
    var overRideLink = '';

    if(chk.indexOf('~') != -1){
      overRideLink = $(this).attr('href');

      $(this).closest('.summary-content').find('a.summary-title-link').attr('href',overRideLink);
      $(this).closest('.summary-item').find('a.summary-thumbnail-container.sqs-gallery-image-container').attr('href',overRideLink);

      $(this).html($(this).html().replace('~',''));
    }
  });
}


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Bullet Carousel ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* // https://codepen.io/garyricke/pen/bGwWOOr?editors=1111 */
function bulletCarousel(){

  var glideArrows = '';
  glideArrows += '<div class="glide__arrows" data-glide-el="controls">';
  glideArrows += '  <button class="glide__arrow glide__arrow--left" data-glide-dir="<">';
  glideArrows += '    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">';
  glideArrows += '      <path d="M0 12l10.975 11 2.848-2.828-6.176-6.176H24v-3.992H7.646l6.176-6.176L10.975 1 0 12z"></path>';
  glideArrows += '    </svg>';
  glideArrows += '  </button>';
  glideArrows += '  <button class="glide__arrow glide__arrow--right" data-glide-dir=">">';
  glideArrows += '    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">';
  glideArrows += '      <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"></path>';
  glideArrows += '    </svg>';
  glideArrows += '  </button>';
  glideArrows += '</div>';
  
  $('.sqs-block-content ul li p').each(function(){
    var chk = $(this).html();
    var parentSection;
    
    // Classing for testimonial detection
    /* If two quotes exist and a emdash, then trigger this */

    // Checking for testimonails
    if(chk.indexOf('“') != -1 && chk.indexOf('—') != -1){
      $(this).closest('li').addClass('testimonial');
      //Isolate the quote marks for styling
      chk = chk.replace(/“/g,'<span class="testimonialQuotationMark">“</span>');
      chk = chk.replace(/”/g,'<span class="testimonialQuotationMark">”</span>');
      $(this).html(chk);
      // isolate the source
      var testimonialSource = chk.split('—');
      chk = chk.replace(chk,testimonialSource[0] + '<span class="testimonailSource"><span>—</span>' + testimonialSource[1] + '</span>');
      $(this).html(chk);
    }
    
    // Making the carousel
    if(chk.indexOf('~bulletCarousel') != -1){
      parentSection = $(this).closest('section').attr('id');

      $(this).closest('section').addClass('bulletCarousel');
      $(this).closest('ul').addClass('glide__slides');
      $(this).closest('ul').wrap('<div class="glide"><div class="glide__track" data-glide-el="track"></div></div>');
      $(this).closest('ul').find('li').addClass('glide__slide');

      $(this).closest('li').remove();

      // How many slides
      var howManySlides = $('section#' + parentSection + ' li.glide__slide').length;

      for(i = 0; i < howManySlides; i++){
        if(i == 0){
          var glideBullets = '<div class="glide__bullets" data-glide-el="controls[nav]">';
        }

        glideBullets += '  <button class="glide__bullet" data-glide-dir="=' + i + '"></button>';

        if(i == howManySlides - 1){
          glideBullets += '</div>';
        }
      }

      $('section#' + parentSection + ' .glide__track').after(glideArrows);
      $('section#' + parentSection + ' .glide__arrows').after(glideBullets);

      $('head').append('<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/glidejs@2.1.0/dist/css/glide.core.min.css">');
      
      $.getScript("https://cdn.jsdelivr.net/npm/@glidejs/glide", function() {

        if(typeof parentSection !== 'undefined' && parentSection !== null){
          //console.log('data-section-id HERE ');
        }else{
          $(this).each(function(brand) {
          });
        }
        new Glide('section#' + parentSection + ' .glide', {
          autoplay: 5000,
          hoverpause: true
        }).mount();
      });
    }
  });
  
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Summary Block Tweak ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function summaryBlockTweakFunc(){
  /* 
    ***** Any summary that has a title that matches the blog post will be removed ****

    Add to blog -- Page Header Code Injection -- this variable below
    summaryBlockTweak = 'see_also_hide_active 
    
  */
  if(typeof summaryBlockTweak !== 'undefined' && summaryBlockTweak !== null) {
    if(summaryBlockTweak.indexOf('see_also_hide_active') != -1){
      
      // Get the title
      var BlogTitle = $('h1.BlogItem-title').text();
      $('.summary-item').each(function(){
        var sumTitle = $(this).find('.summary-title a').text();
        if(sumTitle == BlogTitle){
          $(this).remove();
        }
      });
    }
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tag Cloud Navigation ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// codepen.io/garyricke/pen/ExPXgpp
function sqs_tagcloud_yah() {
  // Check for a category _nav -- if detected highlight any category as active if it matches the page
  var tagNames = document.querySelectorAll("ul.sqs-tagcloud li span.name");
  var isTagcloudNav = false;
  tagNames.forEach(function (tagName) {
    if (tagName.innerText == "_nav") {
      isTagcloudNav = true;
    }
  });

  if (isTagcloudNav == true) {
    var count = 0;
    var curpage = document.getElementsByClassName("BlogList-filter")[0].innerText;
    curpage = curpage.toLowerCase();
    curpage = curpage.replace("posts in ", "");
    tagNames.forEach(function (tagName) {
      var spanClassString;

      if (tagName.innerText.toLowerCase() == curpage) {
        spanClassString = document.querySelectorAll("ul.sqs-tagcloud li span.name")[count].className;
        var newSpanClass = spanClassString.concat(" active");
        document.querySelectorAll("ul.sqs-tagcloud li span.name")[count].className = newSpanClass;
        document.querySelectorAll("ul.sqs-tagcloud li")[count].className = "active";
      }

      count += 1;
    });
    count = 0;
    tagNames.forEach(function (tagName) {
      if (tagName.innerText == "_nav") {
        document.querySelectorAll("ul.sqs-tagcloud li")[count].remove();
      }

      count += 1;
    });
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Pop Up Video ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function popvideo(){
  //console.log('pop video');
  $('.sqs-block-content p a').each(function(){
    var chk = $(this).attr('href');

    if(chk.indexOf('#pop-video') != -1){
      $('section' + chk).css('display','none');
      $(this).click(function(e){
        //console.log('getting it here');
        $('section' + chk + ' .sqs-video-wrapper.video-none').trigger( "click" );
        return false;
      });
    }
  });

  $('a.Index-gallery-item-image').each(function(){
    var chk = $(this).attr('href');

    if(chk.indexOf('#pop-video') != -1){
      $(this).addClass('popvideo');
      $('section' + chk).css('display','none');
      $(this).click(function(e){
        //console.log('getting it here b');
        $('section' + chk + ' .sqs-video-wrapper.video-none').trigger( "click" );
        return false;
      });
    }
  });

  $('a.Index-gallery-item-content-link').each(function(){
    var chk = $(this).attr('href');

    if(chk.indexOf('#pop-video') != -1){
      $(this).addClass('popvideo');
      $('section' + chk).css('display','none');
      $(this).click(function(e){
        //console.log('getting it here b');
        $('section' + chk + ' .sqs-video-wrapper.video-none').trigger( "click" );
        return false;
      });
    }
  });  

}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Max Image imgmx ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function imageMax(){
  $('.summary-metadata-item--tags a').each(function(){
    if($(this).html().indexOf('_imgmx') != -1){
      $(this).closest('.summary-item').find('.summary-thumbnail-outer-container').addClass('imgmx');
      //console.log('imgmx ' + $(this).html());
      $(this).remove();
    }
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ center events ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function centerEvents(){
  $('.summary-item.summary-item-record-type-event').each(function(){
  //$('.summary-item').each(function(){
    $(this).addClass('events-center');

    chkHref = $(this).find('a').attr('href');

    if(typeof chkHref !== 'undefined' && chkHref !== null){
      if(chkHref.indexOf('-cntr') != -1){
        $(this).addClass('events-center');
        $(this).closest('div').addClass('events-center');
        $(this).after('...');
      }
    }
  });
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ logo rspclr ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function logoResponsiveColor(){
  var checkLogo = siteConfig('logoRspClr');
  if(typeof checkLogo !== 'undefined' && checkLogo !== null) {
    if(checkLogo.length > 1){
      $('.Header--overlay img.Header-branding-logo').attr('src',checkLogo);
    }
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ targetLinks ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function targetLinks() {
  var targetLinksExternal = configsite('all-site-external-links-new-window');
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ triggerLink ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function triggerLink(){
  hideLightBoxFormButton();
  /* 
    Any link with "#trigger-"
    Grab whatever is after, match an existing SQS form pop up and open it
  */
  $('a').each(function(){
    var chk = $(this).attr('href');
    var thisLink = $(this);

    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('trigger-') != -1){
        var formLink = chk.substring(chk.indexOf('trigger-')+8).replace(/-/g,' ');
        /* loop through all form buttons and find the one that matches our link */
        $('.lightbox-handle.sqs-system-button').each(function(){
          var chkButton = $(this).text().trim().toLowerCase().replace('\'','');
          if(chkButton == formLink){
            thisLink.addClass('triggerFormButton');
            thisLink.attr('data-formbuttontarget',formLink);
            $(this).addClass('formbutton-trigger-' + formLink.replace(/ /g,'-'));
          }
        });
      }
    }
  });

  // Check the Query String
  var getTriggerButtonFromQuery = getParameterByName('trigger');
  if(getTriggerButtonFromQuery != null){
    
    var formLink = getTriggerButtonFromQuery.substring(getTriggerButtonFromQuery.indexOf('trigger-')+8).replace(/-/g,' ');

    $('button.lightbox-handle.sqs-system-button.sqs-editable-button').trigger("click");
    //$(formLink).trigger("click");
    var thisLink = $(this);
    var queryTriggerInterval;

    $('.lightbox-handle.sqs-system-button').each(function(){
      var chkButton = $(this).text().trim().toLowerCase().replace('\'','');

      if(chkButton == formLink){
        $(this).addClass('query-form-trigger');
        $(this).trigger("click");
        queryTriggerInterval = setInterval(queryTrigger,1000,$(this));
      }
    });
    
    var count = 0;

    function queryTrigger(objelement){
      if(count == 1){
        clearInterval(queryTriggerInterval);
      }else{
        objelement.trigger('click');
        count = count + 1;
      }

    }


  }

  $('a.triggerFormButton').click(function(){
    var formtotrigger = '.formbutton-trigger-' + $(this).attr('data-formbuttontarget').replace(/ /g,'-');
    $(formtotrigger).trigger("click");
    return false;
  });
}

function hideLightBoxFormButton(){
  $('.lightbox-handle.sqs-system-button').each(function(){
    var chk = $(this).text().trim();
    
    if(chk.indexOf('†') != -1){
      $(this).html($(this).html().replace('†',''));
      $(this).css('display','none');
    }
  });
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ contentFilter ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function contentFilter(){
  var sectionFilterOn;

  $('section.Index-page').each(function(){
    var chk = $(this).attr('id');                                                                       // Sectio ID

    if(chk.indexOf('c-ftr') != -1){
      $(this).find('.summary-v2-block').addClass('content-filter-summary');

      // JOgle - 20260602 Patch: Squarespace no longer reliably outputs data-block-json on summary-v2-block.
      // Default imageAspectRatio to 1 so contentFilter() can still build the blog category filter UI.
		
      //old method for getting aspect ratio from data-block-json:
      //var aspectRatio = JSON.parse($('.summary-v2-block.content-filter-summary').attr('data-block-json'));
		
	  // start patch:
	  //var blockJson = $(this).find('.summary-v2-block.content-filter-summary').attr('data-block-json');
      //var imageAspectRatio = 1.5;

      //if (blockJson) {
      //  imageAspectRatio = JSON.parse(blockJson).imageAspectRatio || 1.5;
      //}
      // end patch

      //New method to get aspect ratio from changed Squarespace carousel output, sets a default value for future-proofing:
      var imageAspectRatio = $(this).find('.summary-block-wrapper').attr('data-image-aspect-ratio');
      if (!imageAspectRatio) {
        imageAspectRatio = '1.5';
      }

      /* Check Display Type: Panel, List, Grid */
      if(chk.indexOf('c-ftr-l') != -1){
        runContentFilter('list',$(this),imageAspectRatio);
      }else if(chk.indexOf('c-ftr-g') != -1){
        /* grid */
        runContentFilter('grid',$(this),imageAspectRatio);
      }else if(chk.indexOf('c-ftr-p') != -1){
        /* panel */
        runContentFilter('panel',$(this),imageAspectRatio);
      }else if(chk.indexOf('c-ftr-x') != -1){
        /* TEST */
        runContentFilter('grid2',$(this),imageAspectRatio);
      }else{
        runContentFilter('panel',$(this),imageAspectRatio);
      }

      // lightDark 0 DARK, 1 LIGHT
      var lightDark = chk.substring(chk.indexOf('c-ftr')+7,chk.indexOf('c-ftr')+8);

      // Tabs Off/on
      var tagsDisplay = chk.substring(chk.indexOf('c-ftr')+8,chk.indexOf('c-ftr')+9);

      // List Style Switcher On or Off
      var switchDisplay = chk.substring(chk.indexOf('c-ftr')+9,chk.indexOf('c-ftr')+10);

      // Radio buttons or Toggle Tokens for category selector menu
      var categoryButtonStyle = chk.substring(chk.indexOf('c-ftr')+10,chk.indexOf('c-ftr')+11);

      // All button category
      //var allButtonCategory = chk.substring(chk.indexOf('c-ftr')+11,chk.indexOf('c-ftr')+12);
      
      switch(lightDark){
        case '0':
          $(this).find('.summary-v2-block').addClass('dark');
          break;
        case '1':
          $(this).find('.summary-v2-block').addClass('light');
          break;
        default:
          $(this).find('.summary-v2-block').addClass('light');
      }

      switch(tagsDisplay){
        case 'f':
          $(this).find('.content-filter-summary').addClass('tagsoff');
          break;
        case 'n':
          $(this).find('.content-filter-summary').removeClass('tagsoff');
          break;
        default:
          $(this).find('.content-filter-summary').removeClass('tagsoff');
      }
      
      switch(switchDisplay){
        case '0':
          $(this).find('.content-filter-summary').addClass('switchOff');
          break;
        case '1':
          $(this).find('.content-filter-summary').removeClass('switchOff');
          break;
        default:
          $(this).find('.content-filter-summary').removeClass('switchOff');
      }

      switch(categoryButtonStyle){
        case 't':
          $(this).find('.content-filter-summary').addClass('toggleTaken');
          break;
        case 'r':
          $(this).find('.content-filter-summary').removeClass('radioButton');
          break;
        default:
          $(this).find('.content-filter-summary').removeClass('radioButton');
      }

      // SEE BELOW
      //allButtonCategory
    }
  });

  function runContentFilter(displayType,sectionFilter,aspectRatio){
    /*
        sectionFilter Passed In

        ON CLICK - we are picking up multiple
    */

    //console.log(sectionFilter);

    var collectionLink = $('#' + sectionFilter.attr('id') + ' .content-filter-summary').find('a.summary-title-link').attr('href');
    
    if(typeof collectionLink !== 'undefined' && collectionLink !== null){
      var collectionLinkSplit = collectionLink.split('/');
    }else{
      var collectionLinkSplit = null;
    }

    var collectionLinkFromCategories = $('#' + sectionFilter.attr('id') + ' .content-filter-summary').find('span.summary-metadata-item--cats a').attr('href');

    if(typeof collectionLinkFromCategories !== 'undefined' && collectionLinkFromCategories !== null){
      /*
        If a collection has custom URLs assigned method above pics that up and not the actual collection
        If meta categories is turned on, we can get it from there so we do
      */
      collectionLinkFromCategories = collectionLinkFromCategories.substring(1,collectionLinkFromCategories.indexOf('?'));
      collectionLinkSplit[1] = collectionLinkFromCategories;
    }

    var jsonURL = 'https://' + window.location.hostname + '/' + collectionLinkSplit[1] + '?format=json&random='+Math.random();

    /* Not yet working - exceed limits when blog used - galleries / product pages not limiting */
    var jUrl = setJsonURL('/' + collectionLinkSplit[1],'first');

    function setJsonURL(collectionLink,offset){
      var jsonDynamicURL = '';
      
      if(offset == 'first'){
        jsonDynamicURL = collectionLink + '?format=json&random='+Math.random();
      }else if(offset !== null){
        // We only get to this if it's more than one page
        jsonDynamicURL = collectionLink + '?offset=' + offset + '&format=json&random='+Math.random();
      }
      return jsonDynamicURL;
    }
    /* Not yet working - exceed limits when blog used - galleries / product pages not limiting */

    $('a[href*="-c-ftr"]').each(function() {
      $(this).closest('.summary-v2-block').addClass('content-filter-summary');
    });

    var h = '';

    /* THE ITEMS */
    h += '<div class="summary-items SQSX-contentFilter" data-displaytype="' + displayType + '">';

    $.getJSON(jsonURL, function(data){

      var allCatsArray = [];      //  No ALL to start in case we want a featured - ALL added later if not
      var allTagsArray = ["All"]; //  Automatically adding all as the first for tags

      //console.log(jsonURL);
      //console.log(data);

      //var isOffset = data.pagination.nextPageOffset;    /* This BREAKS when not pointing to a blog as pagination doesn't exist */
      //console.log('isOffset ' + isOffset);

      $.each(data.items, function(key,val,index){
        var imageURL = val.assetUrl;
        var contentTitle = val.title;
        var summaryContent = val.excerpt;
        var contentLink = val.fullUrl;
        var clickthroughUrl = val.clickthroughUrl;

        if(typeof clickthroughUrl !== 'undefined' && clickthroughUrl !== null){
          contentLink = clickthroughUrl;
        }

        buildAllCatsArray(val.categories);
        buildAllTagsArray(val.tags);

        function buildAllCatsArray(catsData){
          if(typeof catsData !== 'undefined'){
            if(catsData.length > 1){
              for (i = 0; i < catsData.length; i++) {
                if(allCatsArray.indexOf(catsData[i]) == -1){
                  allCatsArray.push(catsData[i]);
                }
              }
            }else{
              if(allCatsArray.indexOf(catsData[0]) == -1){
                if(typeof catsData[0] !== 'undefined' && catsData[0] !== null) {
                  allCatsArray.push(catsData[0]);
                }
              }
            }
          }
        }

        function buildAllTagsArray(tagsData){
          if(typeof tagsData !== 'undefined' && tagsData !== null) {
            if(tagsData.length > 1){
              for (i = 0; i < tagsData.length; i++) {
                if(allTagsArray.indexOf(tagsData[i]) == -1){
                  allTagsArray.push(tagsData[i]);
                }
              }
            }else{
              if(allTagsArray.indexOf(tagsData[0]) == -1){
                if(typeof tagsData[0] !== 'undefined' && tagsData[0] !== null) {
                  allTagsArray.push(tagsData[0]);
                }
              }
            }
          }
        }

        var itemCatsClass = '';

        for (i = 0; i < val.categories.length; i++) {
          itemCatsClass += ' cat-' + val.categories[i].toLowerCase().replace(/ /g,'-').replace(/&/g,'');
        }

        var itemTagsClass = '';

        if(typeof val.tags !== 'undefined' && val.tags !== null) {
          for (i = 0; i < val.tags.length; i++) {
            itemTagsClass += ' tag-' + val.tags[i].toLowerCase().replace(/ /g,'-');
          }
        }

        /* 
          Sqr --    1       505   505   100
          3:2 --    1.5     461   336   66.667%
          2:3 vert  0.7     757   757   150%
          4:3       1.3     461   378   75%
          3:4       0.8     673   673   133.33%
          16:9      1.8     461   283   56.25%
          2.4 ana   2.4     461   210   41.6%
      */
        var aspectRatioClass = 'aspectSQR';

        aspectRatio = Math.round( aspectRatio * 10 ) / 10;

        //console.log('aspectRatio ' + aspectRatio);

        switch(aspectRatio){
          case 1:
            aspectRatioClass = 'aspectSQR';
            break;
          case 1.5:
            aspectRatioClass = 'aspect32';
            break;
          case 0.7:
            aspectRatioClass = 'aspect23vert';
            break;
          case 1.3:
            aspectRatioClass = 'aspect43';
            break;
          case 0.8:
            aspectRatioClass = 'aspect34';
            break;
          case 1.8:
            aspectRatioClass = 'aspect169';
            break;
          case 2.4:
            aspectRatioClass = 'aspect24';
            break;
          default:
            aspectRatioClass = 'aspectSQR';
        }

        // Check for summaryNoLink
        var turningOffLinks = false;
        var chk = $('#' + sectionFilter.attr('id') + ' .section-products-filter').attr('class');
        if(typeof chk !== 'undefined' && chk !== null) {
          if(chk.indexOf('summaryNoLink') != -1){
            turningOffLinks = true;
          }
        }

        // Each Element
        h += '<div class="summary-item' + itemCatsClass + itemTagsClass + '">';
        h += '  <div class="summary-thumbnail ' + aspectRatioClass + '">';
        //h += '    <a href="' + contentLink + '" class="BlogList-item-image-link">';  // BlogList-item-image-link    class is full sizing the image - need to work on containing that
        if(turningOffLinks == false){
          h += '    <a href="' + contentLink + '" class="Filter-BlogList-item-image-link">';
          h += '    <img class="summary-thumbnail-image" data-parent-ratio="' + aspectRatio + '" data-image-resolution="250w" src="' + imageURL + '?250w">';
          h += '    </a>';
        }else{
          h += '    <a href="#nolink" style="cursor:default;" class="Filter-BlogList-item-image-link">';
          h += '    <img class="summary-thumbnail-image" data-parent-ratio="' + aspectRatio + '" data-image-resolution="250w" src="' + imageURL + '?250w">';
          h += '    </a>';
        }
        h += '  </div>';
        h += '  <div class="item-summary">';
        h += '    <div class="summary-title">';
        if(turningOffLinks == false){
          h += '      <a href="' + contentLink + '">';
          h += '        ' + contentTitle;
          h += '      </a>';
        }else{
          h += '        ' + contentTitle;
        }
        h += '    </div>';
        h += '    <div class="summary-excerpt">';
        h += '      <p>' + summaryContent + '</p>';
        h += '    </div>';
        h += '    <div class="summary-metadata-container">';
        h += '      <div class="summary-metadata-item--cats">';
        h += '        ' + val.categories;
        h += '      </div>';
        if(typeof val.tags !== 'undefined' && typeof val.tags !== null){
          h += '      <div class="summary-metadata-item--tags">...';
          h += '        ' + val.tags;
          h += '      </div>';
        }
        h += '    </div>'; 
        h += '  </div>';
        h += '</div>';

      }); // End each

      h += '</div>';

      /* /////////////// Add to DOM ////////////// */
      $('#' + sectionFilter.attr('id') + ' .content-filter-summary').html(h);

      // *************   NEXT: Add Filtering Nav *************

      // Adding all to start unless we see a "featured" tag
      if(allCatsArray.toString().toLowerCase().indexOf('featured') == -1){
        //allCatsArray.unshift('All');
      }
      var chk = (sectionFilter).attr('id');
      var allButtonCategory = chk.substring(chk.indexOf('c-ftr')+11,chk.indexOf('c-ftr')+12);

      switch(allButtonCategory){
        case '0':
          
          break;
        case '1':
          allCatsArray.unshift('All');  // Added to beginning of array
          break;
        case '2':
          allCatsArray.push('All');     // Added to end of arrary
          break;
        default:
      }

      //Alphabetize 
      /*  
        PAGE Script Injection
          Add this as a page injection or a code block of the page
      */
      if(typeof filterCategoryOrder !== 'undefined' && filterCategoryOrder !== null){
        if(filterCategoryOrder == 'alpha'){
          allCatsArray.sort();
        }
        // To Be Done
        // filterCategoryOrder = "Contemporary Fixtures, Traditional Lanterns, Bases Poles, Bollard, Post Top Mount, Wall Mount, Accessories";
        /* If we see commas in the variable, use this as an explicit sort which is needed if we can drag the order - like we can with products or galleries - **** can't with blog posts */
      }

      // If featured is there, move it first
      if(allCatsArray.toString().toLowerCase().indexOf('featured') != -1){
        var first = "Featured";
        allCatsArray.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });
      }else if(allCatsArray.toString().toLowerCase().indexOf('new') != -1){
        var first = "New";
        allCatsArray.sort(function(x,y){ return x == first ? -1 : y == first ? 1 : 0; });
      }

      /* ** Reseting h ** */
      var howManyFilterNavs = document.querySelectorAll('.filter-nav');
      h = '';
      h += '<div class="filter-nav" id="filterNav_' + howManyFilterNavs.length + '">';
      // ***************** CATEGORIES
      //console.log('allCatsArray');
      //console.log(allCatsArray);
      h += '  <ul class="cats">';
                for (i = 0; i < allCatsArray.length; i++) {
                  //console.log('allCatsArray[i] ' + allCatsArray[i]);
                  var catFirstWord = allCatsArray[i].toLowerCase();
                  catFirstWord = catFirstWord.split(/\s+/g);
                  var fullcat = allCatsArray[i].toLowerCase().replace(/ /g,'-').replace(/&/g,'');
                  if(catFirstWord == fullcat){
                    fullcat = '';
                  }
                  h += '<li class="cat' + ' ' + catFirstWord[0] + ' ' + fullcat + '" data-cat="' + allCatsArray[i].toLowerCase().replace(/ /g,'-').replace(/&/g,'') + '">' + allCatsArray[i] + '</li>';
                }
      h += '  </ul>';

      // ***************** TAGS
      if(allTagsArray.length > 1){
        // If we just have "ALL" then we don't have any tags
        h += '  <ul class="tags">';

        for (i = 0; i < allTagsArray.length; i++) {
          h += '    <li class="tag">' + allTagsArray[i] + '</li>';
        }

        h += '  </ul>';
        h += '</div>';
      }

      /* ////////////////  Add to DOM  ////////////// */

      $('#' + sectionFilter.attr('id') + ' .content-filter-summary').prepend(h);

      // ~~~~~~~~~~~~~~~~~~~ Grouping Categories ~~~~~~~~~~~~~~~~~~~ 
      /* If the first word is the same - create groups */

      for (i = 1; i < allCatsArray.length; i++) {

        var thisWord = allCatsArray[i].split(/\s+/g);
        var prevWord = allCatsArray[i - 1].split(/\s+/g);

        if(thisWord[0] == prevWord[0]){

          var updatedWord = $('#' + sectionFilter.attr('id') + ' li.cat.' + thisWord[0]).html();

          if(updatedWord != undefined){
            updatedWord = updatedWord.replace(thisWord[0],'');
          }

          $('#' + sectionFilter.attr('id') + ' li.cat.' + thisWord[0].toLowerCase()).each(function(){
            $(this).html($(this).html().replace(thisWord[0],''));
          });

          $('#' + sectionFilter.attr('id') + ' li.cat.' + thisWord[0].toLowerCase()).wrapAll('<div class="radiogroup ' + thisWord[0].toLowerCase() + '">');

          if($('#' + sectionFilter.attr('id') + ' .radiogroup.' + thisWord[0].toLowerCase() + ' span').length == 0){
            $('#' + sectionFilter.attr('id') + ' .radiogroup.' + thisWord[0].toLowerCase()).prepend('<span>' + thisWord[0] + '</span>');
          }
        }
      }

      /* Set the ALL Radio to Selected */
      
      $('#' + sectionFilter.attr('id') + ' .filter-nav ul.tags li.tag:first').addClass('active');

      /* 
        Check if cookie set for last selected category 
        **ONLY do this if there is one filter
      */
      var howManyFilterBlocks = 0;
      $('section[id*="-c-ftr"]').each(function(){
        howManyFilterBlocks += 1;
      });

      var filterLastCategory = getCookie('filterCategoryChoice');

      if(howManyFilterBlocks > 1){
        /* 
          If more than 1 filter blocks,
          we're not storing the last choice of cat
        */
        filterLastCategory = '';
      }
      
      if(getParameterByName('clearCookie') == 'true'){
        /* 
          Clear a broken cookie 
          Ex: https://chicagotakes10.squarespace.com/?clearCookie=true
        */
        filterLastCategory = '';
      }

      if(filterLastCategory.length > 0){
        $('#' + sectionFilter.attr('id') + ' .filter-nav ul.cats li.cat.' + filterLastCategory.replace(/&/,'')).addClass('active');
      }else{
        $('#' + sectionFilter.attr('id') + ' .filter-nav ul.cats li.cat:first').addClass('active');
      }
      //>>>>>NEXT
      /* *** *** ***  CLICK Filternav - not Panel Type *** *** *** */
      $('.filter-nav ul li').click(function(){
        // Radio and Checks
        //console.log('here ' + $(this).closest('section').attr('id'));
        $(this).closest('ul').find('li.cat').removeClass('active'); // Only turn off cats (ie radios) / ignores anyone else - checks
        $(this).toggleClass('active');

        if($(this)[0].textContent == 'All' && $(this)[0].className.indexOf('tag') != -1){
          /* All tag clicked, not cat tag */
          $(this).closest('ul').find('li.tag').removeClass('active');
          $(this).closest('ul').find('li.tag:first-child').addClass('active');
        }else if($(this)[0].className.indexOf('tag') != -1){
          $(this).closest('ul').find('li.tag:first-child').removeClass('active');
        }

        // Store choice in a cookie
        var selectedCategory = $(this).text().toLowerCase().replace(/ /g,'-');
        //console.log('selectedCategory ' + selectedCategory);
        /* save to cookie */
        document.cookie = "filterCategoryChoice=" + selectedCategory.replace(/ /g,'-');
        var parentSection = $(this).closest('section').attr('id');
        //console.log('parentSection');
        //console.log(parentSection);
        displayHideItems($(this),parentSection);
      });

      // On load, see which of the cats are selected and select
      var onLoadSelected = $('#' + sectionFilter.attr('id') + ' .filter-nav ul.cats li.cat.active').attr('data-cat');
      var catNavSelected = $('#' + sectionFilter.attr('id') + ' .filter-nav ul.cats li.cat.active[data-cat="' + onLoadSelected + '"]');

      /* ON LOAD - SET THE FILTER */
      if(onLoadSelected != undefined){
        displayHideItems(catNavSelected);
      }

      // *** +++ *** +++ *** 
      //  Display / Hide Items 
      // *** +++ *** +++ *** 
      function displayHideItems(catNavSelected,parentSection){
        //console.log(catNavSelected.attr('class'));
        //console.log(catNavSelected.attr('data-cat'));
        //console.log('parentSection ' + parentSection);

        if(catNavSelected.attr('class').indexOf('cat') != -1){

          /* ----------- Cats -----------  */
          if(catNavSelected[0].dataset.cat.toLowerCase() == 'all'){
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-item').css('position','static');
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-item').css('visibility','visible');
          }else{
            //var catNavSelectCats = 'cat-' + catNavSelected[0].dataset.cat.toLowerCase().replace(/ /g,'-');
            var catNavSelectCats = 'cat-' + catNavSelected.attr('data-cat').toLowerCase().replace(/ /g,'-');

            // hide all
            /*
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-item').css('position','absolute');
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-item').css('visibility','hidden');
            */

            if(typeof parentSection == 'undefined'){
              parentSection = sectionFilter.attr('id');
            }

            $('#' + parentSection + ' .content-filter-summary .summary-item').css('position','absolute');
            $('#' + parentSection + ' .content-filter-summary .summary-item').css('visibility','hidden');

            //  show selected
            /*
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-item.' + catNavSelectCats).css('position','static');
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-item.' + catNavSelectCats).css('visibility','visible');
            */
            //console.log('#' + parentSection + ' .content-filter-summary .summary-item.' + catNavSelectCats);
            $('#' + parentSection + ' .content-filter-summary .summary-item.' + catNavSelectCats).css('position','static');
            $('#' + parentSection + ' .content-filter-summary .summary-item.' + catNavSelectCats).css('visibility','visible');
          }
        }else{
          /* ----------- Tags -----------  */
          /* what tags are selected */
          var tagsSelected = $('#' + sectionFilter.attr('id') + ' li.tag.active').text();

          if(tagsSelected.toLowerCase() == 'all'){
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-item').css('position','static');
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-item').css('visibility','visible');
          }else{
            // First remove all
            allTagsArray.forEach(function (item, index) {
              if(tagsSelected.indexOf(item) == -1){
                $('#' + sectionFilter.attr('id') + ' .tag-' + item.toLowerCase().replace(/ /g,'-')).css('position','absolute');
                $('#' + sectionFilter.attr('id') + ' .tag-' + item.toLowerCase().replace(/ /g,'-')).css('visibility','hidden');
              }
            });
            // Then add back
            allTagsArray.forEach(function (item, index) {
              if(typeof item !== 'undefined' && item !== null){
                if(tagsSelected.indexOf(item) != -1){
                  $('#' + sectionFilter.attr('id') + ' .tag-' + item.toLowerCase().replace(/ /g,'-')).css('position','static');
                  $('#' + sectionFilter.attr('id') + ' .tag-' + item.toLowerCase().replace(/ /g,'-')).css('visibility','visible');
                }
              }
            });
          }
        }
      }

      /* ********** \\\\ SWITCH: Panel, List, Grid ///// ********** */
      // Add VIEW TYPE - Panel vs List
      var panelCheck = '';
      var listCheck = '';
      var gridCheck = '';

      switch(displayType) {
        case 'panel':
          panelCheck = ' checked'
          break;
        case 'list':
          listCheck = ' checked'
          break;
        case 'grid':
          gridCheck = ' checked'
          break;
        default:
          panelCheck = ' checked'
          // defualt
      }

      h = '<div class="switch">';
      h += '  <input name="switch" id="a" type="radio" value="panel"' + panelCheck + '/>';
      h += '  <label for="a" class="switch__label panel">&nbsp;</label>';
        
      h += '  <input name="switch" id="b" type="radio" value="list"' + listCheck + '/>';
      h += '  <label for="b" class="switch__label list">&nbsp;</label>';
        
      h += '  <input name="switch" id="c" type="radio" value="grid"' + gridCheck + '/>';
      h += '  <label for="c" class="switch__label grid" >&nbsp;</label>';
        
      h += '  <div class="switch__indicator" /></div>';
      h += '</div>';

      var defaultSelection = 'b';
      setDefaultSelection();
      getSelectedOption();

      function setDefaultSelection(){
        /* these are the ids of each switch state */

        switch(defaultSelection) {
          case 'a':
              $('#' + sectionFilter.attr('id') + ' input#a').attr('checked', 'checked');
              break;
          case 'b':
              $('#' + sectionFilter.attr('id') + ' input#b').attr('checked', 'checked');
              break;
          case 'c':
              $('#' + sectionFilter.attr('id') + ' input#c').attr('checked', 'checked');
              break;
          default:
              $('#' + sectionFilter.attr('id') + ' input#a').attr('checked', 'checked');
        }
        getSelectedOption();
      }

      function getSelectedOption(){

        var chkSelected = $('#' + sectionFilter.attr('id') + ' input[name=switch]:checked').val();

        $('#' + sectionFilter.attr('id') + ' .summary-items.SQSX-contentFilter').attr('data-displaytype',chkSelected);

        $(sectionFilter).find('.content-filter-summary').removeClass('filter-panel-style');
        $(sectionFilter).find('.content-filter-summary').removeClass('filter-list-style');
        $(sectionFilter).find('.content-filter-summary').removeClass('filter-grid-style');

        if(typeof chkSelected !== 'undefined' && checkSelected !== null){
          $(sectionFilter).find('.content-filter-summary').addClass('filter-' + chkSelected + '-style');
        }

        /* \\\\\\ CLICK //////// */
        $('.filter-nav').on("click", function(){
          // This runs for multiple sections - have to move dynamicColor out
          dynamicColor();
        });
      }

      $('#' + sectionFilter.attr('id') + ' .filter-nav').prepend('' + h + '');

      if(displayType == 'list'){
        $(sectionFilter).find('.switch.item-view input').prop("checked",true);
        $(sectionFilter).find('.content-filter-summary').addClass('filter-list-style');
      }else if(displayType == 'grid'){
        $(sectionFilter).find('.content-filter-summary').addClass('filter-grid-style');
      }

      /* \\\\\\\  CLICK Panel Type 2-way /////// */
      $('.filter-nav label.switch').on("mousedown", function(){
        var viewstyle = $(this).find('input').is(':checked');
        console.log(viewstyle);
        if(viewstyle == false){
          // It's off and turning ON
          $(this).closest('.content-filter-summary').addClass('filter-list-style');
        }else{
          // It's on and turning OFF
          $(this).closest('.content-filter-summary').removeClass('filter-list-style');
        }
      });

      // Dynamic Color
      dynamicColor();

      function dynamicColor(){
        var dynClr = $('#' + sectionFilter.attr('id') + ' .summary-v2-block.content-filter-summary').closest('section').attr('class');
        dynClr = dynClr.substring(dynClr.indexOf('d-clr')+6);
        dynClrAray = dynClr.split('-');

        if(dynClrAray[1].length == 6){
          var RGBclr_R = hexToRgb(dynClrAray[1]).r;
          var RGBclr_G = hexToRgb(dynClrAray[1]).g;
          var RGBclr_B = hexToRgb(dynClrAray[1]).b;
        }

        function hexToRgb(hex) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          } : null;
        }

        RGBclr_R = 255;
        RGBclr_G = 255;
        RGBclr_B = 255;

        switch(dynClrAray.length){
          case 3:
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary ul.cats li.cat').css('color','#' + dynClrAray[1]);
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary ul.cats li.cat.active').css('color','#' + dynClrAray[0]);
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary a').css('color','#' + dynClrAray[2]);
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-excerpt p').css('color','#' + dynClrAray[1]);
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-metadata-item--cats').css('color','#' + dynClrAray[1]);
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-metadata-item--tags').css('color','#' + dynClrAray[1]);
            $('#' + sectionFilter.attr('id') + ' .content-filter-summary .summary-items .summary-item .item-summary .summary-metadata-container').css('border-top-color','rgba(' + RGBclr_R + ',' + RGBclr_G + ',' + RGBclr_B + ',.2) !important;');
            //console.log('border-top-color','rgba(' + RGBclr_R + ',' + RGBclr_G + ',' + RGBclr_B + ',.2);');
            break;
          case 2:
            break;
          case 1:
            break;
          default:
        }
      }
      
    }); // End getJSON
  } // End runContentFilter

  document.addEventListener('mouseup', function (item) {
    /* Out side of the upper functions because capturing multiple sections */
    var sectionFilter = item.path;
    if(typeof sectionFilter !== 'undefined' && sectionFilter !== null){
      sectionFilter = item.path[2].closest('section');
      if(typeof item.path[0].control !== 'undefined' && item.path[0].control !== null){
        var chkSelected = item.path[0].control.value;
        sectionFilter.querySelector('.summary-items.SQSX-contentFilter').setAttribute('data-displaytype',chkSelected);
        sectionFilter.querySelector('.content-filter-summary').classList.remove('filter-panel-style');
        sectionFilter.querySelector('.content-filter-summary').classList.remove('filter-list-style');
        sectionFilter.querySelector('.content-filter-summary').classList.remove('filter-grid-style');
        sectionFilter.querySelector('.content-filter-summary').classList.add('filter-' + chkSelected + '-style');
      }
    }
  }, false);

} // contentFilter
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ audioclips ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function audioclips(){
  // Look for any links with ::: in the copy and then turn the .mp3 into a player
  $('a').each(function(index){
    var chk = $(this).html();
    if(chk.indexOf(':::') != -1){
      var mp3File = $(this).attr('href');
      var audioHtml = '';
      
      audioHtml += '<audio controls id="audioid_' + index + '">';
      audioHtml += '  <source src="' + mp3File + '" type="audio/mpeg">';
      audioHtml += '  Your browser does not support the audio element.';
      audioHtml += '</audio>';
      
      $(this).after(audioHtml);
      $(this).remove();
    }
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ prodClickThru ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function prodClickThru(){
  var chk;

  $('section').each(function(){
    chk = $(this).attr('id');
    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('-prodclickthru') != -1){
        $(this).addClass('product-clickthru');
      }
    }
  });

  $('section.product-clickthru .summary-excerpt a').each(function(index){
    chk = $(this).html();
    chk = chk.toLowerCase();
    
    if(chk.indexOf('clickthrough') != -1){
      var lnk = $(this).attr('href');
      $(this).closest('.summary-item').find('a').attr('href',lnk);
      $(this).detach();
    }
  });  
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Summary No Link ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function sumnolnk(){
  // Summary - turn of linking
  $('section').each(function(){
    var chk = $(this).attr('id');
    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('sumnolnk') != -1){
        $(this).addClass('summaryNoLink');
      }
    }
  });
  $('section.summaryNoLink .summary-title a').contents().unwrap();
  $('section.summaryNoLink a.summary-thumbnail-container').contents().unwrap();
  $('section.summaryNoLink .summary-title').addClass('sumNoLnk');
}

function infinAccord(){
  $('li').each(function(){
    var chk = $(this).text();
    if(chk.indexOf('~infinaccord') != -1){
      $(this).closest('ul').addClass('infiniteAccordion');
    }
  });

  //https://stackoverflow.com/questions/29036227/traversing-through-nested-list-jquery
  var level = 1;
  var $list = $('ul.infiniteAccordion');
  traverseList($list, level);

  function traverseList($list, level) {
    if($list.length > 0) {

      $list.children('li').each(function() {
        $(this).addClass('accordion_level');
        $(this).addClass('level_' + level);
        $(this).closest('ul').addClass('ul_level_' + level);
        $(this).closest('ul').attr('data-level',level);

        if(level > 1){
          $(this).closest('ul').css('display','none');
        }

        if($(this).parents('li').length) {
          $(this).parents('li').addClass('has_children');
        }

        if($(this).children('ul')) {
          traverseList($(this).children('ul'), level + 1);
        }

        $(this).click(function(e){
          if($(this).attr('class').indexOf('active') == -1){
            e.stopPropagation();
            $(this).addClass('active');
          }else{
            e.stopPropagation();
            $(this).removeClass('active');
          }
        });
      });
    }
  }
}

function bios(){
  // Add a tag "_bio" to a gallery item to activate hiding anything in italic within the summary descriptioin
  // NOTE 21 SEP 2020 - not built for multiple bios on a page - styles arrows to the first color encountered
  $('.summary-metadata-item--tags a').each(function(){
    if($(this).html().indexOf('_bio') != -1){
      
      $(this).closest('.summary-content').find('.summary-excerpt').each(function(){
        // Loop through all paragraphs for this item for an italic - class it
        $(this).find('p').each(function(){
          if($(this).html().indexOf('<em') != -1){
            $(this).addClass('biopara');
            $(this).closest('.summary-item').addClass('bio');
            //$(this).closest('.summary-item').find('a').attr('href','#nolink');
            $(this).closest('.summary-item').find('a').attr('style','pointer-events: none;');
          }
        });
      });

      $(this).closest('.summary-item').find('.summary-thumbnail.img-wrapper').addClass('bio');

      // Getting the current colors from existing p tag
      var clr = $(this).closest('.summary-content').find('p').css('color');
      var fntsz = $(this).closest('.summary-content').find('p').css('font-size');

      var sectionLinkDclr = $(this).closest('section').attr('id');

      if(sectionLinkDclr.indexOf('d-clr') != -1){
        var sectionColors = sectionLinkDclr.substring(sectionLinkDclr.indexOf('d-clr')+6);
        var sectionColorsArray = sectionColors.split('-');
      }

      if(typeof sectionColorsArray !== 'undefined' && sectionColorsArray !== null) {
        switch(sectionColorsArray.length){
          case 0:
            clr = $(this).closest('.summary-content').find('p').css('color');
            break;
          case 1:
            clr = $(this).closest('.summary-content').find('p').css('color');
            break;
          case 2:
            clr = '#' + sectionColorsArray[1];
            break;
          case 3:
            clr = '#' + sectionColorsArray[2];
            break;
          default:
        }
      }

      // Wrap all the paragraphs up in a single 
      if($(this).closest('.summary-content').find('.bioparagraphs').length == 0){
        $(this).closest('.summary-content').find('.biopara').wrapAll('<div class="bioparagraphs">');
      }

      // Add the "BIO" and arrow trigger
      if($(this).closest('.summary-content').find('.trigger.bio').length == 0){
        $(this).closest('.summary-content').find('.bioparagraphs').before('<div class="trigger open bio" style="font-size:' + fntsz + ';color:' + clr + ';">BIO <span class="arrowOuter"><span class="arrow"></span></span></span></div>');
      }

      // Style the bio arrows
      //console.log('style.arrowstyles ' + clr);
      if($('style.arrowstyles').length == 0){
        $('<style class="arrowstyles">.arrow:before{background-color:' + clr + ' !important;}</style>').appendTo('head');
        $('<style class="arrowstyles">.arrow:after{background-color:' + clr + ' !important;}</style>').appendTo('head');
      }

      // Remove the _bio tag
      //$(this).remove();
      //$(this).css('visibility','hidden');
      //$(this).css('position','absolute');
      //console.log('tags ' + $(this).html());
      //$(this).closest('.summary-metadata-item--tags').remove(); //If bio is one of the tags, remove all tags
      $(this).closest('.summary-metadata-container').css('visibility','hidden').css('position','absolute');
    }
  });

  $('.trigger.open.bio').click(function(){
    $(this).toggleClass('active');
    $(this).closest('.summary-item').toggleClass('bioactive');
    $(this).closest('.summary-excerpt').find('.bioparagraphs').slideToggle(100, function(){});
  });

  document.addEventListener('click', function (event) {
    $(event.target).closest('.excerpt').find('.bioparagraphs').slideToggle(100, function(){});
    $(event.target).closest('.excerpt').find('.trigger.open.bio').toggleClass('active');
  }, true);

}

function sectionClass(){
  /* 
    Grab the page title of a section and add "section-" + page title
    This gives us unique class identification we can control
    We're using the index nav elements (whether it's displayed on or not)
  */
  $('nav.Index-nav .Index-nav-text').each(function(index){
    var chk = $(this).closest('a').attr('href');
    var section_class = $(this).text();
    section_class = section_class.toLowerCase();
    section_class = section_class.replace(/ /g,'-'); //Replace all spaces with a dash
    $('section' + chk).addClass('section-' + section_class);
  });
}

function socialBullets(){
  
  var chkSocial;
  // Isolate social links to pages with "Connect With" as an H3
  $('.sqs-block-content H3').each(function(index) {
    chkSocial = $(this).html();
    chkSocial = chkSocial.toLowerCase();

    if(chkSocial.indexOf('connect with') != -1){
      // If we have an H3 that's connect with...tag the adjacent UL as social links
      $(this).next('ul').addClass('connectWith');
      $('body').addClass('bioPage');
    }
  });

  $('.summary-excerpt').each(function(index){

    chkSocial = $(this).find('a').text();

    $(this).find('a').each(function(){
      chkSocial = $(this).text();
      if(chkSocial.indexOf('^') != -1){
        $(this).addClass('social-link');
        
        var socialLnk = $(this).attr('href').toLowerCase();
      
        chkSocial = chkSocial.replace('^','');
        $(this).text(chkSocial);
      
        if(socialLnk.indexOf('linkedin.com') != -1){
          $(this).addClass('linkedin');
        }
      }
    });
  });

  $('ul.connectWith li').each(function(index) {
    chkSocial = $(this).find('a').attr('href');
    if (typeof chkSocial !== 'undefined' && chkSocial !== null) {
      // LINKED IN
      if(chkSocial.indexOf('linkedin.com') != -1){
        $(this).addClass('socialicon linkedin');
        $(this).parents('ul').addClass('socialLinks');
      }
      // INSTAGRAM
      if(chkSocial.indexOf('instagram.com') != -1){
        $(this).addClass('socialicon instagram');
        $(this).parents('ul').addClass('socialLinks');
      }
      // TWITTER
      if(chkSocial.indexOf('twitter.com') != -1){
        $(this).addClass('socialicon twitter');
        $(this).parents('ul').addClass('socialLinks');
      }
      // EMAIL
      if(chkSocial.indexOf('@') != -1){
        $(this).addClass('socialicon email');
        $(this).parents('ul').addClass('socialLinks');
      }
      // Phone
      if(chkSocial.indexOf('tel:') != -1){
        $(this).addClass('socialicon phone');
        $(this).parents('ul').addClass('socialLinks');
      }
    }
  });
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ lnkPanels ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function lnkPanels(){
  $('.sqs-block-content ul li').each(function(index) {
    chk = $(this).html();
    if(chk.indexOf('~lnkpanels') != -1){
      $(this).parent('ul').addClass('lnkPanels');
      if(chk.indexOf('-sbt') != -1){
        $(this).parent('ul').addClass('space-between');
      }
      $(this).detach();  // Remove this li
    }
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ blogsections ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function blogsections(){
  
  // look for a tag on the blog: blogsections
  var chk = $('a.Blog-meta-item-tag').html();
  if(typeof chk !== 'undefined' && chk !== null) {
    if(chk.indexOf('blogsections') != -1){
      $('body').addClass('blogsections');
      $('.sqs-block.horizontalrule-block').each(function(index){ 
        $(this).addClass('blogsectionshr');
        var $set = $(this).nextUntil(".sqs-block.horizontalrule-block");
        $set.wrapAll('<div class="blog-section' + ' sectionIndex-' + index + '" />');
      });
      $(".blog-section:even").addClass("even");
      $(".blog-section:odd").addClass("odd");
    }
  }
  // If a section is a single gallery, add a class so we don't constrain the width
  $('body.blogsections .sqs-gallery-block-grid').each(function(){
    $(this).closest('.blog-section').addClass('image-gallery-grid');
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ expandLink ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
/* 
  Find any link with "#expandlink" as the url and then surround all content after that link and hide. Then open when clicking the link.
*/
function expandlink(){
  var chk;
  $('.sqs-block-content a').each(function(index) {
    chk = $(this).attr('href');
    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('#expandlink') != -1){
        $(this).parents('.row.sqs-row').addClass('expandlink-row');
        $(this).parents('.row.sqs-row.expandlink-row').next('.row.sqs-row').addClass('row-compressed-expanded');
        $(this).parents('.row.sqs-row.expandlink-row').next('.row.sqs-row').css('display','none');
        $(this).addClass('expandlink');
        $(this).append('<i class="ion ion-ios-arrow-down"></i>');

        $(this).click(function() {
          $(this).parents('.row.sqs-row').siblings('.row.sqs-row.row-compressed-expanded').slideToggle();
          $(this).toggleClass('expanded');
          $(this).parents('.row.sqs-row').find('svg').toggleClass('expandedsvg');
          $(this).parents('section').toggleClass('expandedsection');
          return false;
        });

        // Color it
        var colors = getColor($(this));
        if(typeof colors !== 'undefined' && colors !== null) {
          colors = JSON.parse(colors);
          $(this).find('i').css('color',colors.links);
        }
      }
    }
  });
}

function getColor(element){
  
  var dynClr = $(element).closest('section').attr('id');

  if(dynClr.indexOf('d-clr') != -1){
    dynClr = dynClr.substring(dynClr.indexOf('d-clr')+6);
    dynClrAray = dynClr.split('-');
    var colorsArray = '';

    switch(dynClrAray.length){
      case 3:
        colorsArray += '{';
        colorsArray += '"background":"#' + dynClrAray[0] + '",';
        colorsArray += '"copy":"#' + dynClrAray[1] + '",';
        colorsArray += '"links":"#' + dynClrAray[2] + '"';
        colorsArray += '}';
        return colorsArray;
        break;
      case 2:
        break;
      case 1:
        break;
      default:
    }
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ summaryCenter ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function summaryCenter(){

  var chk;
  $('.summary-item').each(function() {
    chk = $(this).find('.summary-thumbnail').html();
    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('-sumctr') != -1){
        $(this).parents('div.summary-block-wrapper').addClass('summarycenter');
        //console.log('SC ');
        //console.log(chk);
      }
    }
    chk = $(this).find('.summary-metadata-item--tags a').text();
    if(chk.indexOf('_center') != -1){
      $(this).parents('div.summary-block-wrapper').addClass('summarycenter');
      $(this).find('.summary-metadata-item--tags a').remove();
    }
  });

  // Gallery Item
  $('.sqs-gallery .slide').each(function() {
    chk = $(this).find('img.thumb-image').attr('data-src');
    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('-sumctr') != -1){
        $(this).parents('div.sqs-gallery-container').addClass('summarycenter');
      }
    }
  });

  // Section Name
  $('section').each(function(){
    chk = $(this).attr('id');
    if (typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('-sumctr') != -1){
        $(this).find('div.summary-block-wrapper').addClass('summarycenter');
      }
    }
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ scrollToSection ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
var changingPages = true;

function scrollToSection(){
  /*
    /about-orbis?sectionscroll=audio-conversations
    https://orbisdesign.squarespace.com/about-orbis/?sectionscroll=audio-conversations
  */

  // See if scroll is coming from query string
  var scrollToSectionQuery = getParameterByName('sectionscroll');

  if(scrollToSectionQuery != null){
    scrollToSectionID('#' + scrollToSectionQuery);
  }

  // See if a section scroll is defined within a URL
  var fullPageURL = window.location.href;
  if(fullPageURL.indexOf('#section-') != -1){
    var scrollto = fullPageURL.substring(fullPageURL.indexOf('#section-')).replace('#','.');
    scrollToSectionID(scrollto);
  }

  var lnk;
  $('a').each(function() {
    lnk = $(this).attr('href');
    
    if(typeof lnk !== 'undefined' && lnk !== null) {
      lnk = lnk.toLowerCase();
      if(lnk.indexOf('squarespace.com') != -1){
        lnk = lnk.substring(lnk.indexOf('squarespace.com')+15);
      }
      if(lnk != undefined){
        if(lnk.indexOf('#.') != -1){
          lnk = lnk.replace('#.','#'); // Remove the dot as it will cause a console error
          $(this).attr('href',lnk);
          $(this).addClass('sectionscroll');
        }
      }
    }
  });

  // Mobile Link clean up
  $('.Mobile-overlay-menu a').each(function() {
    lnk = $(this).attr('href');
    lnk = lnk.toLowerCase();
    
    if(lnk.indexOf('squarespace.com') != -1){
      lnk = lnk.substring(lnk.indexOf('squarespace.com')+15);
    }
    if(lnk != undefined){
      if(lnk.indexOf('#.') != -1){
        lnk = lnk.replace('#.','#'); // Remove the dot as it will cause a console error
        $(this).attr('href',lnk);
        $(this).addClass('sectionscroll');
      }
    }
  });

  $('body').on( "click", "a.sectionscroll", function(event) {
    
    var linkHref = $(this).attr('href');

    if(linkHref.indexOf('#footer') != -1){
      scrollToSectionID('.Footer');
    }

    //  Are we headed to another page?
    var destinationPage = linkHref.substring(0,linkHref.indexOf('#'));

    if(destinationPage.length == 0){
      //We are on the home page
      destinationPage = '/';
    }

    //  Get the section we want to scroll to after we get to the page
    var scrollIndex = linkHref.substring(linkHref.indexOf('#')+1);
    //  Pass our scroll as part of URL
    var newURL = destinationPage + '?sectionscrollto=' + scrollIndex;
    //  Let's go
    var currentPage = window.location.pathname;

    if(currentPage == destinationPage){
      // We are on the page already so just start scrolling
      changingPages = false;
      var section_scroll_id = '#' + $('.' + scrollIndex).attr('ID');
      scrollToSectionID(section_scroll_id);
    }else{
      // We need to go to the page first
      window.location.href = newURL;
    }
    return false;
  });

  // Check the Query String
  var getSectionScrollTo = getParameterByName('sectionscrollto');
  if(getSectionScrollTo != null){
    var section_scroll_id = '#' + $('.' + getSectionScrollTo).attr('ID');
    scrollToSectionID(section_scroll_id);
  }

} // End scrollToSection

function scrollToSectionID(secionId){
  if (typeof secionId !== 'undefined' && secionId !== null) {

    if($(secionId).length){
      var scrollpoint;
      var stickyNavOn = '';

      stickyNavOn = siteConfig('stickynav');
      scrollpoint = $(secionId).offset().top;

      if(stickyNavOn == true){
        var headerHeight = $('header').outerHeight();
        scrollpoint = scrollpoint - headerHeight;
      }

      if(typeof scrollpoint !== 'undefined' && scrollpoint !== null) {
        if(changingPages == false){
          // Close the mobile menu overlay to allow scrolling when we are on the same page
          var chkMobileView = $('body').attr('class');
          if(chkMobileView.indexOf('is-mobile') != -1){
            $('button.Mobile-overlay-close').click();
          }
        }
        
        $("html, body").animate({
          scrollTop: scrollpoint
          // The animation time is proportionate to how far down
        //}, scrollpoint/2, function() {
        }, 1000, function() {
          //anim complete
        });
      }
    }
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ stickyNav ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function stickyNav(){

  var stickyNavOn = siteConfig('stickynav');
  var scrollStartPoint = 400;
  var headerHeight = $('header').outerHeight();
  var previousScroll = 0;
  var currentScroll;
  var currentLogoImg = $('img.Header-branding-logo').attr('src');

  if(stickyNavOn == true){
    $(window).scroll(function(){
      currentScroll = $(this).scrollTop();

      if(currentScroll > scrollStartPoint && currentScroll < $(document).height() - $(window).height()){
        if(currentScroll > previousScroll){
          window.setTimeout(hideNav, 300);
        }else{
          // currentScroll < previousScroll - we're going up!
          window.setTimeout(showNav, 300);
        }
        previousScroll = currentScroll;
      }else{
        window.setTimeout(hideNav, 300);
      }
      // Add class when header is out of view
      var top = $(window).scrollTop();
      divBottom = $('header.Header').offset().top + $('header.Header').outerHeight();
      if (divBottom > top || top < 150) {
        $('header.Header').removeClass('outOfView');
      }else{
        $('header.Header').addClass('outOfView');
      }
    }); // Scroll
  }

  function showNav() {
    var stickyNavLogo = siteConfig('stickynavlogo');
    
    $('header.Header').addClass('stickynav');

    // Adjust for nav going fixed
    $('.Site').css('margin-top',headerHeight);
    
    // Different stickynav logo when stickied up
    if(typeof stickyNavLogo !== 'undefined' && stickyNavLogo !== null){
      $('img.Header-branding-logo').attr('src',stickyNavLogo);
    }
    $('img.Header-branding-logo').addClass('stickynav');
  }
  function hideNav() {
    // Reversing above
    $('header.Header').removeClass('stickynav');
    $('.Site').css('margin-top',0);
    $('img.Header-branding-logo').attr('src',currentLogoImg);
    $('img.Header-branding-logo').removeClass('stickynav');
  }
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ tabsBuild ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function tabsBuild() {
  // open tab via querystring
  // https://OOO.squarespace.com/?tab=tab-congress

  //  Find tab sections

  /* Hide any sections with "tab-" in the URL Slug */
  var sectionId;
  var getClass;

  $('section.Index-page').each(function() {
    sectionId = $(this).attr('id');
    // This section is tab content
    if(sectionId.indexOf('tab-') != -1){
      $(this).addClass('sqr-tab');
      $(this).find('h2').closest('.col').addClass('col-tab-content');
    }

    /* ******* INCOMPLETE ******** */
    if(sectionId.indexOf('tabopen') != -1){
      $(this).addClass('sqs-tabopen');
      $(this).css('display','block');
      $(this).attr('style','display:block;');
    }
  });

  //  Tab links / Triggers
  /* 
    Any link with "#tab-"
      open the hidden section
      mark the link as active 
  */
  $('a').each(function() {
    var lnk = $(this).attr('href');
    if(lnk != undefined){
      // Check for #. which means we're passing a section class
      if(lnk.indexOf('#.') != -1){
        lnk = lnk.replace('.',''); // Remove the dot as it will cause a console error
        $(this).attr('href',lnk);
        $(this).addClass('tab-trigger-by-section-class');
      }

      if(lnk.indexOf('#tab-') != -1){
        
        //  CLASS the image block
        $(this).closest('.image-block').addClass('tab-block');
        $(this).closest('.col').addClass('tab-col');
        $(this).closest('.image-block-outer-wrapper').find('.image-card-wrapper p').addClass('tab-copy');
        $(this).closest('.image-block.tab-block').append('<div class="tab-selected-downline bordercolor"></div>');
        $(this).closest('section').addClass('section-tab-trigger');

        // CLASS a link / image-overlay
        $(this).addClass('tablink');

        // ***** CLICK ***** a tab link
        $(this).click(function(e) {

          lnk = $(this).attr('href');
          getClass = $(this).attr('class');

          if(getClass.indexOf('active-tablink') != -1){
            //Tab is already open, so close it for everyone else
            $('a.tablink').removeClass('active-tablink');
            $('.image-block.tab-block').removeClass('active-tab-block');
          }else{
            $('a.tablink').removeClass('active-tablink');
            $('.image-block.tab-block').removeClass('active-tab-block');
            $(this).addClass('active-tablink');   // class this as active
            $(this).closest('.image-block.tab-block').addClass('active-tab-block');
            //ga('send', 'event', 'Tab','Click','' + lnk + '');   /* Google Analytics */
          }

          // If any tabs are open, class the parent row so we can target the untagged tabs - i.e. make them opaque
          var anyTabsOpen = $(this).closest('.row').find('.active-tablink');
          if(anyTabsOpen.length > 0){
            $(this).closest('.row').addClass('a-tab-is-open');
          }else{
            $(this).closest('.row').removeClass('a-tab-is-open');
          }

          // If it's a section class, find ID by the section class
          if(getClass.indexOf('tab-trigger-by-section-class') != -1){
            lnk = lnk.replace('#','');
            lnk = '.section-' + lnk;
            var section_class_id = $(lnk).attr('id');
            lnk = '#' + section_class_id;
          }

          openTab(lnk);
          return false;
        });
      }
    }
  });

  queryOpenTab();
} // End tabsBuild

function queryOpenTab(){
  // https://hyp0.squarespace.com/?tab=tab-one

  var tabFromLink = getParameterByName('tab');

  if(tabFromLink != null){
    tabFromLink = '#' + getParameterByName('tab');
  }

  if(tabFromLink != null){

    $('a.tablink').each(function(){
      var check = $(this).attr('href');
      
      if(check == tabFromLink){
        
        var tabTriggerSection = $(this).closest('section').attr('id');
        //console.log('got it! ' + tabTriggerSection);
        if(tabTriggerSection != undefined){
          //scrollToSectionID('#' + tabTriggerSection);
          $(this).trigger('click'); 
          var brwWidth = document.documentElement.clientWidth;

          if(brwWidth < 640){
            // Browser is mobile so scroll to content
            scrollToSectionID(tabFromLink);
          }else{
            // Browser is desktop so scroll to trigger section
            scrollToSectionID('#' + tabTriggerSection);
          }
        }
      }
    });
  }
}

function openTab(tabID) {

  /* ~~~~~~~~~~~~~~~~~ [ CLASS the triggered section when tab is selected ] ~~~~~~~~~~~~~~~ */
  var chk = '';
  var sectionId = '';

  $('a.tablink').each(function(index){
    chk += $(this).attr('class');
    if(chk.indexOf('active-tablink') != -1){
      var getParentSectionId = $(this).closest('section').attr('id');

      if(typeof getParentSectionId !== 'undefined' && getParentSectionId !== null) {
        sectionId = getParentSectionId;
      }
    }
  });

  if(sectionId.length > 0){
    $('section#' + sectionId).addClass('tab-trigger-triggered');                  // Classing the parent section of the triggers
  }else{
    $('section.section-tab-trigger').removeClass('tab-trigger-triggered');
  }

  /* ~~~~~~~~~~~~~~~~~ [ CLASS the section that's opened ] ~~~~~~~~~~~~~~~ */
  var sectionToGet = '.section-' + tabID.replace('#','') + '.sqr-tab';
  var getClass = $(sectionToGet).attr('class');
  
  if(typeof getClass !== 'undefined' && getClass !== null) {
    if(getClass.indexOf('sqr-tab-active') != -1){
      //Tab is already open, so close it and everyone else
      $('.sqr-tab').removeClass('sqr-tab-active'); 
    }else{
      $('.sqr-tab').removeClass('sqr-tab-active');
      $(sectionToGet).addClass('sqr-tab-active');   // class this as active
    }
  }

  /* ~~~~~~~~~~~~~~~~~ [ MOBILE - move the content ] ~~~~~~~~~~~~~~~ */
  var brwWidth = document.documentElement.clientWidth;

  jQuery(window).resize(function(){
    brwWidth = document.documentElement.clientWidth;
  });

  if(brwWidth < 641){
    /* Move the tab content in under the trigger if in mobile  */
    $(tabID + '.sqr-tab').not('.mobilized').detach().insertAfter('.active-tab-block');
    $(tabID + '.sqr-tab').addClass('mobilized');
  }else{
    /* Move any mobilized tab content back as a section after the trigger section */
    $(tabID + '.sqr-tab.mobilized').detach().insertAfter('section.section-tab-trigger');
    $(tabID + '.sqr-tab.mobilized').removeClass('mobilized');
  }
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ interactiveAnimation ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function interactiveAnimation(){
  // set up 
  var chk;
  var animtype;
  $('.image-block').each(function(index) {
    chk = $(this).find('img').attr('src');

    if(chk.indexOf('_anim') != -1) {
      animtype = chk.substring(chk.indexOf('_anim-') + 6,chk.lastIndexOf('.'));
      $(this).addClass('aos-item aos-init aos-animate');
      $(this).attr('data-aos',animtype);
      $(this).wrap('<div class="aos-all"></div>');
    }
  });

  //load animation scripts AOS
  $.getScript("https://cdn.rawgit.com/michalsnik/aos/2.1.1/dist/aos.js")
    .done(function( script, textStatus ) {
      /* inititalize */
      AOS.init({
        duration: 1200,
      })
    })
    .fail(function( jqxhr, settings, exception ) {
  });
}
// Custom, targeted animations
function interactiveAnimTarget(el,anim){
  $(el).addClass('aos-item aos-init aos-animate');
  $(el).attr('data-aos',anim);
  $(el).wrap('<div class="aos-all"></div>');
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Dynamic Color Panel ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function dynamicColorPanel(){
  var chkImg;
  var dclrBackground;
  var dclrCopy;
  var dclrClass;
  var dclrLink;
  var chkBackground;

  // Index Page Gallery Block
  $('figure.Index-gallery-item-image').each(function(index) {
    
    chkImg = $(this).find('img').attr('src');
    //console.log('chkImg ' + chkImg);
    
    if(chkImg.indexOf('d-clr') != -1){
      $(this).addClass('dynamicColorPanel');

      dclrBackground = chkImg.substr(chkImg.indexOf('d-clr')+6,6);
      dclrCopy = chkImg.substr(chkImg.indexOf('d-clr')+13,6);

      $(this).css('background-color','#' + dclrBackground);
      $(this).parents('.Index-gallery-item-inner').find('h2').css('color','#' + dclrCopy);
      $(this).parents('.Index-gallery-item-inner').find('p').css('color','#' + dclrCopy);
      $(this).parents('.Index-gallery-item-inner').find('p a').css('background-color','#' + dclrCopy);
      $(this).parents('.Index-gallery-item-inner').find('p a').css('color','#' + dclrBackground);
      $(this).parents('.Index-gallery-item-inner').find('.Index-gallery-item-content').addClass('dynamicColorContent');
    }
  });

  // Sections
  $('body section').each(function(index) {
    chkDclr = $(this).attr('id');

    if(typeof chkDclr !== 'undefined' && chkDclr !== null) {

      if(chkDclr.indexOf('d-clr') != -1){
        
        dclrClass = chkDclr.substr(chkDclr.indexOf('d-clr'));

        $(this).addClass('dynamicColorSection');
        $(this).addClass(dclrClass);
        
        dclrBackground =  chkDclr.substr(chkDclr.indexOf('d-clr')+6,6);
        dclrCopy =  chkDclr.substr(chkDclr.indexOf('d-clr')+13,6);
        dclrLink = chkDclr.substr(chkDclr.indexOf('d-clr')+20,6);

        if(dclrCopy.length == 0){
          dclrCopy = $(this).find('p').css('color');
        }
        if(dclrLink.length == 0){
          dclrLink = $(this).closest('body').find('a').css('color');
        }

        var testValidHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + dclrCopy);
        
        if(testValidHex == false){
          dclrCopy = dclrCopy.replace(/ /g,'').replace(/\(|\)/g, "").replace('rgb','')
          var dclrCopyArray = dclrCopy.split(',');
          dclrCopy = rgbToHex(parseInt(dclrCopyArray[0]),parseInt(dclrCopyArray[1]),parseInt(dclrCopyArray[2]));
        }

        testValidHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test('#' + dclrLink);

        if(testValidHex == false){
          dclrLink = dclrLink.replace(/ /g,'').replace(/\(|\)/g, "").replace('rgb','')
          var dclrLinkArray = dclrLink.split(',');
          dclrLink = rgbToHex(parseInt(dclrLinkArray[0]),parseInt(dclrLinkArray[1]),parseInt(dclrLinkArray[2]));
        }

        function componentToHex(c) {
          var hex = c.toString(16);
          return hex.length == 1 ? "0" + hex : hex;
        }

        function rgbToHex(r, g, b) {
          return componentToHex(r) + componentToHex(g) + componentToHex(b);
        }

        // Color any buttons
        var $this = $(this);
        $this.find('a.sqs-block-button-element').each(function(){
          chkBackground = $(this).css('background-color');

          if(chkBackground == 'rgba(0, 0, 0, 0)'){
            // No background, just border

            $(this).css('border-color','#' + dclrLink);
            $(this).css('color','#' + dclrLink);

            $(this).hover(function() {
              $(this).css('background-color','#' + dclrLink);
              $(this).css('border-color','#' + dclrLink);

              if(dclrBackground == 'xxxxxx'){
                $(this).css('color','#' + dclrCopy);
              }else{
                $(this).css('color','#' + dclrBackground);
              }
              
            }, function() {
              if(dclrBackground == 'xxxxxx'){
                $(this).css('background-color','transparent');
              }else{
                $(this).css('background-color','#' + dclrBackground);
              }
              $(this).css('border-color','#' + dclrLink);
              $(this).css('color','#' + dclrLink);
            });

            if(dclrBackground == 'xxxxxx'){
              $(this).addClass('nonDOM-Outline-Button-X-background');
            }else{
              $(this).addClass('nonDOM-Outline-Button');
            }

          }else{
            // solid button
            $(this).css('color','#' + dclrBackground);
            $(this).css('background-color','#' + dclrLink);
            $(this).addClass('nonDOM-Solid-Button');
          }
        });

        // Request Buttons
        $(this).find('.newsletter-form-button').css('background-color','#' + dclrLink);
        $(this).find('.newsletter-form-button').css('color','#' + dclrCopy);

        $(this).find('.lightbox-handle.sqs-system-button').css('background-color','#' + dclrLink);
        $(this).find('.lightbox-handle.sqs-system-button').css('color','#' + dclrBackground);

        // Color other elements
        $(this).css('background-color','#' + dclrBackground);
        $(this).find('h1').css('color','#' + dclrCopy);
        $(this).find('h2').css('color','#' + dclrCopy);
        $(this).find('h3').css('color','#' + dclrCopy);
        
        $(this).find('p').css('color','#' + dclrCopy);
        $(this).find('.image-card p').css('color',$('.image-card-wrapper .image-card p').css('color')); // This reverses out the above P tag coloring image posters BETTER
        
        // Timeline2019
        $(this).find('.timeline-body-content p').css('color','#' + dclrBackground);
        $(this).find('.timeline-body-content .audioicon').css('border-color','#' + dclrLink);
        $(this).find('.timeline-item .timeline-img').css('background-color','#' + dclrCopy);
        /* see nondom belo */

        // Admin
        var chkAdmin = window.frameElement;
        if(chkAdmin != null){
          // in admin mode
          $(this).find('*').css('color','#' + dclrCopy);
          $(this).find('h1').css('color','#' + dclrCopy);
          $(this).find('h2').css('color','#' + dclrCopy);
          $(this).find('h3').css('color','#' + dclrCopy);
          $(this).find('.yui3-widget.sqs-widget.sqs-rte.yui3-texteditor.yui3-texteditor-content.ProseMirror.rte.sqs-html-content').css('color','#' + dclrCopy);
          /* SEE ALSO NONDOMSTYLES below */
        }

        $(this).find('p a').css('color','#' + dclrLink);
        $(this).find('h3 a').css('color','#' + dclrLink);
        $(this).find('h3 a strong').css('color','#' + dclrLink);
        $(this).find('p a').css('border-bottom','1px solid ' + '#' + dclrLink);
        
        // Summary
        $(this).find('a.summary-title-link').css('color','#' + dclrLink);
        $(this).find('a.summary-read-more-link').css('color','#' + dclrLink);
        $(this).find('.summary-title.sumNoLnk').css('color','#' + dclrCopy);
        $(this).find('.summary-metadata').css('color','#' + dclrCopy);
        $(this).find('.summary-metadata-container a').css('color','#' + dclrLink);
        $(this).find('.summary-item-list-container .summary-block-header .summary-heading .summary-header-text').css('color','#' + dclrCopy);
        
        $(this).find('.summary-carousel-pager.sqs-gallery-controls span.summary-carousel-pager-prev.previous').attr('style','color:#' + dclrLink + ' !important;');
        $(this).find('.summary-carousel-pager.sqs-gallery-controls span.summary-carousel-pager-next.next').attr('style','color:#' + dclrLink + ' !important;');

        /* Event summaries */
        $(this).find('.summary-block-collection-type-events .summary-item a.summary-title-link').each(function(){
          $(this).css('color','#' + dclrLink);
          $(this).attr('style','color:#' + dclrLink + ';');
          $(this).addClass('dyn-color-link');
        });

        // Quote
        $(this).find('.quote-block blockquote').css('color','#' + dclrCopy);
        $(this).find('.quote-block figcaption.source').css('color','#' + dclrCopy);

        // Forms
        $(this).find('.sqs-block-content .form-item div').css('color','#' + dclrCopy);
        $(this).find('.sqs-block-content .form-item label').css('color','#' + dclrCopy);
        $(this).find('.sqs-block-content .form-item legend').css('color','#' + dclrCopy);
        $(this).find('.sqs-block-content .form-button-wrapper input.button').css('background-color','#' + dclrLink);
        $(this).find('.sqs-block-content .form-button-wrapper input.button').css('color','#' + dclrBackground);


        //$(this).find('.lightbox-content .form-item div').css('color','#000');
        //$(this).find('.lightbox-content .form-item label').css('color','#000');
        //$(this).find('.lightbox-content .form-item legend').css('color','#000');

        // Tabs
        $(this).find('.bordercolor').css('background-color','#' + dclrCopy);  // Currently set within tabs for downline
        /* see non dom below */

        var RGBclrCopy_R = '0';
        var RGBclrCopy_G = '0';
        var RGBclrCopy_B = '0';

        var RGBclrLink_R = '0';
        var RGBclrLink_G = '0';
        var RGBclrLink_B = '0';

        if(dclrCopy.length == 6){
          RGBclrCopy_R = hexToRgb(dclrCopy).r;
          RGBclrCopy_G = hexToRgb(dclrCopy).g;
          RGBclrCopy_B = hexToRgb(dclrCopy).b;
        }

        if(dclrLink.length == 6){
          RGBclrLink_R = hexToRgb(dclrLink).r;
          RGBclrLink_G = hexToRgb(dclrLink).g;
          RGBclrLink_B = hexToRgb(dclrLink).b;
        }

        function hexToRgb(hex) {
          var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          } : null;
        }

        var afterLoad = setInterval(colorElementsAfter(), 100);

        function colorElementsAfter(){
          var nonDomStyles = '';

          if(dclrBackground == 'xxxxxx'){
            dclrBackground = 'ffffff';  
          }
          
          // Slick elements
          nonDomStyles += 'section.' + dclrClass + ' .slick-from-SS button.slick-arrow:before {color:#' + dclrLink + ';}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .slick-from-SS ul.slick-dots button:before {color:#' + dclrLink + ';}\r\n';
          
          // Accordion Buttons

          nonDomStyles += 'section.' + dclrClass + ' .accordion_button {background-color:rgba(' + RGBclrCopy_R + ',' + RGBclrCopy_G + ',' + RGBclrCopy_B + ',.2) !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .accordion_button p {color:#' + dclrLink + ' !important;}\r\n';
          
          nonDomStyles += 'section.' + dclrClass + ' .accordion_button .arrow:before {background-color:#' + dclrLink + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .accordion_button .arrow:after {background-color:#' + dclrLink + ' !important;}\r\n';

          nonDomStyles += 'section.' + dclrClass + ' .accordion_button.active .arrow:before {background-color:#' + dclrBackground + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .accordion_button.active .arrow:after {background-color:#' + dclrBackground + ' !important;}\r\n';

          nonDomStyles += 'section.' + dclrClass + ' .accordion_button.active {background-color:#' + dclrLink + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .accordion_button.active p {color:#' + dclrBackground + ' !important;}\r\n';


          //nonDomStyles += 'section.' + dclrClass + ' .accordion_content li p {color:#' + dclrCopy + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .accordion_content li p {color:#' + dclrBackground + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .accordion_content {background-color:#' + dclrCopy + ' !important;}\r\n';

          //  Tab lines
          nonDomStyles += 'section.' + dclrClass + ' a.tablink.active-tablink:after {border-bottom-color:#' + dclrCopy + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .tab-col .image-inset.content-fill:after {color:#' + dclrCopy + ' !important;}\r\n';
          
          //  Solid buttons
          nonDomStyles += 'section.' + dclrClass + ' a.nonDOM-Solid-Button {color:#' + dclrBackground + ' !important;background-color:#' + dclrLink + ' !important;}\r\n';

          //  Outline request buttons
          nonDomStyles += 'section.' + dclrClass + ' a.nonDOM-Outline-Button {border-color:#' + dclrLink + ' !important;color:#' + dclrLink + ' !important;background-color:transparent !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' a.nonDOM-Outline-Button:hover {border-color:#' + dclrLink + ' !important;background-color:#' + dclrLink + ' !important;color:#' + dclrBackground + ' !important;}\r\n';

          nonDomStyles += 'section.' + dclrClass + ' a.nonDOM-Outline-Button-X-background {border-color:#' + dclrLink + ' !important;background-color:transparent !important;color:#' + dclrLink + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' a.nonDOM-Outline-Button-X-background:hover {border-color:#' + dclrLink + ' !important;background-color:#' + dclrLink + ' !important;color:#' + dclrCopy + ' !important;}\r\n';

          //  Link Border
          nonDomStyles += 'section.' + dclrClass + ' a {border-bottom-color: rgba(' + RGBclrLink_R + ',' + RGBclrLink_G + ',' + RGBclrLink_B + ',.3);}\r\n';

          //  Expand Link colors
          //var dclrLinkLight = lighten(hsl(90, 80%, 50%), 20%);

          nonDomStyles += 'section.' + dclrClass + ' a.expandLink {color:#' + dclrLink + ' !important;}\r\n';

          // Events
          nonDomStyles += 'section.' + dclrClass + ' .summary-block-collection-type-events .summary-item a.summary-title-link {color:#' + dclrLink + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .summary-block-collection-type-events .summary-item .summary-metadata-container a {color:#' + dclrLink + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .summary-block-collection-type-events .summary-item .summary-excerpt p {color:#' + dclrCopy + ' !important;}\r\n';

          // Timeline
          nonDomStyles += 'section.' + dclrClass + ' .timeline:before {background-color:#' + dclrCopy + ';opacity:.3;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .timeline-body-content .description .expand span.arrow:before {background-color:#' + dclrBackground + ' !important;}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .timeline-body-content .description .expand span.arrow:after {background-color:#' + dclrBackground + ' !important;}\r\n';

          // Form lightbox
          nonDomStyles += '.lightbox-content .form-item div {color:#000 !important;}\r\n';
          nonDomStyles += '.lightbox-content .form-item label {color:#000 !important;}\r\n';
          nonDomStyles += '.lightbox-content .form-item legend {color:#000 !important;}\r\n';
          //$(this).find('.lightbox-content .form-item label').css('color','#000');
          //$(this).find('.lightbox-content .form-item legend').css('color','#000');
          //$(this).find('.lightbox-content .form-item div').css('color','#000');

          // ADMIN
          
          nonDomStyles += 'section.' + dclrClass + ' .sqs-html-content h2 {color:#' + dclrCopy + ';}\r\n';  // This is required after an edit is made and saved
          nonDomStyles += 'section.' + dclrClass + ' .sqs-widget.sqs-html-content h2 {color:#' + dclrCopy + ';}\r\n';
          nonDomStyles += 'section.' + dclrClass + ' .sqs-widget.sqs-html-content h3 {color:#' + dclrCopy + ';}\r\n';

          if($('style.' + dclrClass).length == 0){
            $('<style class="' + dclrClass + '">' + nonDomStyles + '</style>').appendTo('head');
          }else{
            clearInterval(afterLoad);
          }
        } // End colorElementsAfter

      }  // end if d-clr is part of the section name
    } // end check for section id
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ Summary Pop ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function summaryPop(){

  $('.summary-item-list.sqs-gallery').each(function(index) {
  
    summaryGridID = $(this).attr('id');

    $('#' + summaryGridID + ' a.summary-thumbnail-container').each(function(index) {
      chk = $(this).attr('href');  
      // Get ID of Summary to Compressed        
      if(chk.indexOf('-summarypop') != -1){
        $(this).closest('div.summary-item-list-container').addClass('summaryPopSummaryContainer');
        makeCompressedID = summaryGridID;
        popSummary(makeCompressedID);
        return false;
      }
    });  
  });

  function popSummary(sumID){
    var newCompressedID = "sumCompressed_" + sumID;
    var chk;

    $('#' + sumID + '.summary-item-list .summary-item').each(function(index) {
      var $this = $(this);

      chk = $(this).find('p').length;

      if(chk > 1){
        $(this).find('.summary-excerpt').children('p').not(':first-child').wrapAll('<div class="summaryPopWrap" />');
        $(this).find('.summaryPopWrap').before('<div class="expand">+</div>');
      }
    });
  } // popSummary  

  // Clicking on the expand link
  //$(document).on('click', '.summaryPopSummaryContainer .expand', function(event) { 
  $(document).on('click', '.expand', function(event) { 
    $(this).closest('.summary-item').find('.summary-thumbnail-container').trigger( "click" );
    $(this).closest('.summary-excerpt').find('.summaryPopWrap').css('display','block');
    //$( "#foo" ).trigger( "click" );
    //$(this).find('a.summary-thumbnail-container.sqs-gallery-image-container').click();
    //event.preventDefault(); 
  });

  // Clicking on the title
  $(document).on('click', '.summaryPopSummaryContainer .summary-title a', function(event) { 
    //$(this).find('a.summary-thumbnail-container.sqs-gallery-image-container').click();
    //event.preventDefault(); 
  });
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ PANELPOP ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function panelpop(){
  var chk;
  var cnt;
  var pHeight;
  //  Index-gallery-item-content--has-title-and-body   this is the container with the copy

  $('.Index-gallery-item-content--has-title-and-body').each(function(index) {
    chk = $(this).parents('section').attr('id');
    if(chk.indexOf('panelpop') != -1){
      chk = $(this).find('.Index-gallery-item-content-body p').length;

      pHeight = $(this).find('.Index-gallery-item-content-body').outerHeight();

      if(pHeight > 320) {
        $(this).find('.Index-gallery-item-content-body').addClass('tallPanelPop');
      }
      if(chk > 1){
        $(this).find('.Index-gallery-item-content-body').children('p').not(':first-child').wrapAll('<div class="wrapit" />');
        $(this).find('.Index-gallery-item-content-body .wrapit').before('<div class="expand">+</div>');
        $(this).parents('.Index-gallery-item-inner').prepend('<div class="panelPop"><div class="panelPopInner"><div class="expand">+</div>' + $(this).find('.wrapit').html() + '<div></div>');
      }
    }
  });

  $('.Index-gallery-item-content-body .expand').click(function() {
    $(this).parents().find('.panelPop').toggleClass('expanded');
  });
  
  $('.panelPopInner .expand').click(function() {
    $(this).parents().find('.panelPop').toggleClass('expanded');
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ NO OVERLAY ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function noover(){
  var chk;

  // Galleries
  $('article.Index-gallery-item').each(function(index) {
    chk = $(this).find('img').attr('src');
    if (typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('_noover') != -1){
        $(this).addClass('noover');
      }
      if(chk.indexOf('_wht') != -1){
        $(this).addClass('wht');
      }
    }
  });
  // Sections
  $('.Parallax-item').each(function(index) {
    chk = $(this).find('img').attr('src');
    if (typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('_noover') != -1){
        $(this).addClass('noover');
      }
    }
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ CIRCLE IMAGE ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function circImage(){

  // New tag checking
  $('.summary-metadata-item--tags a').each(function(index){
    if($(this).html().indexOf('_') != -1){
      if($(this).html().indexOf('_circ') != -1){
        //console.log('CIRC ' + $(this).text());
        $(this).closest('.summary-item').find('img').addClass('circleImage');
        $(this).remove();
      }
    }
    //chkTags += $(this).html();
  });
  // All image checks
  var chk;
  $('img.thumb-image').each(function(index) {
    chk = $(this).attr('src');

    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('_circ') != -1 || chk.indexOf('-circ') != -1 ){
        $(this).addClass('circleImage withinSlick thumbimage');
      }
    }
  }); 
  $('img.summary-thumbnail-image').each(function(index) {
    chk = $(this).attr('data-src');
    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('_circ') != -1 || chk.indexOf('-circ') != -1 ){
        $(this).addClass('circleImage withinSlick summarythumbimage');
      }
    }
  }); 
  $('img.summary-thumbnail-image').each(function(index) {
    chk = $(this).attr('data-src');
    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('_bNw') != -1){
        $(this).addClass('blackAndWhite');
      }
    }
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ create ACCORDION ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function detectCreateAccordion(){
  var chk;
  var dynamicColorArray = [];

  // Find and mark ULs designated as accordians
  $('.sqs-block-content ul').each(function(indexTop) {
    $(this).find('li').each(function() { 
      chk = $(this).text();
      if(chk.indexOf('~accord') != -1){
        $(this).parent('ul').addClass('makeAccordion accordion_' + indexTop);
        
        if(chk.indexOf('-limit') != -1){
          var limitnumber = chk.substr(chk.indexOf('-limit') + 6,1);
          $(this).parent('ul').addClass('accordionlimit');
          $(this).parent('ul').attr('data-acordlimitnum',limitnumber);
        }
        if(chk.indexOf('d-clr') != -1){
          var dynamicColorString = chk.substr(chk.indexOf('d-clr') + 6);
          dynamicColorArray = dynamicColorString.split('-');
          $(this).parent('ul').attr('data-dclrarray',dynamicColorArray);
          $(this).parent('ul').addClass('accordioncustcolor');
        }
        $(this).detach();  // Remove this li
      }
    });
  });

  // Turn sub ULs into content - detach and wrap
  $('ul.makeAccordion li').each(function() {
    var moveCnt = $(this).find('ul').detach();

    // Check if there's any images within the content
    var moveCntString = moveCnt.html();

    if(typeof moveCntString !== 'undefined' && moveCntString !== null) {
      if(moveCntString.indexOf('https://static1.squarespace.com') != -1){

        var imageURL = moveCntString.substring(moveCntString.indexOf('https://static1.squarespace.com'));

        if(imageURL.indexOf('.jpg') != -1){
          imageURL = imageURL.substring(0,imageURL.indexOf('.jpg')+4);
        }else if(imageURL.indexOf('.png') != -1){
          imageURL = imageURL.substring(0,imageURL.indexOf('.png')+4);
        }else if(imageURL.indexOf('.svg') != -1){
          imageURL = imageURL.substring(0,imageURL.indexOf('.svg')+4);
        }else if(imageURL.indexOf('.gif') != -1){
          imageURL = imageURL.substring(0,imageURL.indexOf('.gif')+4);
        }

        moveCntString = moveCntString.replace(imageURL,'<div class="accordion content image"><img src="' + imageURL + '"/></div>');

        moveCnt.html(moveCntString);
      }
    }

    // Check for bullets
    var bulletsInString = moveCnt.html();
    if(typeof bulletsInString !== 'undefined' && bulletsInString !== null) {
      bulletsInString = bulletsInString.replace(/~/g,'&nbsp;&#8226;&nbsp;');
      moveCnt.html(bulletsInString);
    }
    // If no content, add class so we can turn this into a bullet
    var checkContent = typeof moveCnt.html();
    if(checkContent.indexOf('undefined') == 0){
      $(this).after('<div class="accordion_content"></div>');
      $(this).addClass('nocontent');
    }else{
      $(this).after('<div class="accordion_content">' + moveCnt.html() + '</div>');
    }
  });

  // Build accordion
  $("ul.makeAccordion > li").addClass('accordion_button');
  $('.accordion_button').prepend('<span class="arrow"></span>');

  //Limit
  var setViewLimit = $('ul.makeAccordion.accordionlimit').attr('data-acordlimitnum');
  
  if(setViewLimit != undefined){
    $('ul.makeAccordion.accordionlimit li.accordion_button').each(function(index){
      if(index > setViewLimit){
        $(this).addClass('limitThisFromView');
        $(this).next('.accordion_content').addClass('limitThisFromView');
      }
    });
    $('.limitThisFromView').wrapAll('<div class="limitedFromView"></div>');
    $('.limitedFromView').before('<div class="expandLimitedAccordion"><p><a href="javascript:void(0);">Show More</a></p></div>');
    $('.expandLimitedAccordion a').click(function(){
      chk = $('.expandLimitedAccordion a').text().toLowerCase();
      if(chk == 'show more'){
        $('.expandLimitedAccordion a').text('Show Less');
        $('.limitedFromView').slideDown('fast');
      }else{
        $('.expandLimitedAccordion a').text('Show More');
        $('.limitedFromView').slideUp('fast');
      }
      return false;
    });
  }

  // Custom Color
  var accordionColorArrary = $('ul.makeAccordion.accordioncustcolor').attr('data-dclrarray');
  var thisSectionID = $('ul.makeAccordion.accordioncustcolor').closest('section').attr('id');

  //console.log('thisSectionID ' + thisSectionID);
  //console.log($(this));
  
  /*
  if(typeof accordionColorArrary !== 'undefined' && accordionColorArrary !== null) {
    accordionColorArrary = accordionColorArrary.split(',');
    var forceStyle = setInterval(forceStyleFunction, 1000);
    var count = 0;
    function forceStyleFunction() {
      console.log('count ' + count);
      if(count < 2){
        $('section#' + thisSectionID + ' ul.makeAccordion.accordioncustcolor li.accordion_button').css('background-color','#' + accordionColorArrary[0]);
        count += 1;
      }else{
        clearInterval(forceStyle);
      }
      
    }
  }
  */
  
  // Run Accordion
  $('.accordion_button').on('click',function() {
    $('.accordion_content').slideUp('fast');
    $('.accordion_button').removeClass('active');

    var chkNextContent = $(this).next('.accordion_content');
    if(chkNextContent.css('display') == 'none'){
      $(this).next('.accordion_content').slideDown('fast');  
      $(this).addClass('active');
    }
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ create TABLE ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function detectCreateTable(){
  var chk;

  $('.sqs-block-content ul').each(function(indexTop) {
   $(this).find('li').each(function() { 
    chk = $(this).html();
    if(chk.indexOf('~tbl') != -1){

      $(this).parent('ul').addClass('makeTable table_' + indexTop);

      var pipeArray;
      var table = $('<table class="tableFromUl lineitems">');
      var tbody = $('<tbody>');
      var tr_build = '';
      var ht = '';
      var ulTableID = 'ul.makeTable.table_' + indexTop;
      var ulTableIDLI = 'ul.makeTable.table_' + indexTop + ' li';

      $(ulTableIDLI).each(function(index){
        chk = $(this).html();
        if(chk.indexOf('|') != -1){
          ht += '<tr class="row_' + index + '">';
          tr_build = '';
          pipeArray = chk.split('|');
          $.each(pipeArray, function(y) {
            tr_build += '<td class="subrow">' + pipeArray[y].trim() + '</td>';
          });
          ht += tr_build;
        }else if(chk.indexOf('~~tbl') != -1 || chk.indexOf('~tbl') != -1){
          //Skip this
        }else if(chk.indexOf('|') == -1 && chk.indexOf('<strong>') != -1 ){
          ht += '<tr class="subheader row_' + index + '">';
          ht += '<td colspan="2">' + chk + '</td>';        
        }else{
          ht += '<tr class="fullrow row_' + index + '">';
          ht += '<td colspan="2">' + chk + '</td>';
        }
        
        ht += '</tr>';
      });
      
      tbody.append(ht);
      table.append(tbody);
      $(ulTableID).after(table);

      // change any tildes to bullets
      $('.tableFromUl .subrow').each(function() {
        chk = $(this).html();
        if(typeof chk !== 'undefined' && chk !== null) {
          if(chk.indexOf('~') != -1){
            chk = chk.replace(/~/g,"<li>");
            chk = chk.replace(/<br>/g,"</li>");
            chk = chk.replace(/<p>/g,"");
            chk = chk.replace(/<\/p>/g,"");
            chk = '<ul class="makeTableBullets">' + chk + '</ul>';
            $(this).html(chk);
          }
        }
      });
    }
   });
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ CONTENT CHARACTER STYLES ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function contentCharacterStyles(){
  var chk;
  //  H1
  //  If H1 has a dagger - set the entire page to dagger style
  $('.sqs-block-content h1').each(function(index) {
    chk = $(this).html();
    if(chk.indexOf('†') != -1){
      $('body').addClass('bdy-dagger');
      $(this).addClass('ele-cnt-dagger');
      chk = chk.replace('†','');
      jQuery(this).html(chk);
    }
  });

  $('.sqs-block-content h2').each(function(index) {
    chk = $(this).html();
    if(chk.indexOf('†') != -1){
      $('body').addClass('bdy-dagger');
      $(this).addClass('ele-cnt-dagger');
      $(this).closest('.col').addClass('col-cnt-dagger');
      chk = chk.replace('†','');
      jQuery(this).html(chk);
    }
    if(chk.indexOf('^') != -1){
      $(this).addClass('ele-cnt-caret');
      $(this).closest('section').addClass('sec-cnt-caret');
      $(this).closest('.col').addClass('col-cnt-caret');
      chk = chk.replace('^','');
      jQuery(this).html(chk);
    }
  });

  // P
  $('.sqs-block-content p').each(function(index) {
    chk = $(this).html();
    // Dagger
    if(chk.indexOf('†') != -1){
      $(this).closest('.col').addClass('cnt-dagger');
      $(this).closest('.row').addClass('cnt-row-dagger');
      $(this).addClass('ele-cnt-dagger');
      chk = chk.replace('†','');
      jQuery(this).html(chk);
    }
    // DoubleDagger
    if(chk.indexOf('‡') != -1){
      $(this).closest('section').addClass('cnt-sec-doubleDagger');
      $(this).closest('.col').addClass('cnt-col-doubleDagger');
      $(this).closest('.row').addClass('cnt-row-doubleDagger');
      $(this).addClass('cnt-ele-doubleDagger');
      chk = chk.replace('‡','');
      jQuery(this).html(chk);
    }
    // Dotplus
    if(chk.indexOf('∔') != -1){
      $(this).closest('section').addClass('cnt-sec-dotplus');
      $(this).closest('.col').addClass('cnt-col-dotplus');
      $(this).closest('.row').addClass('cnt-row-dotplus');
      $(this).addClass('cnt-ele-dotplus');
      chk = chk.replace('∔','');
      jQuery(this).html(chk);
    }
    // Caret
    if(chk.indexOf('^') != -1){
      $(this).addClass('ele-cnt-caret');
      $(this).closest('section').addClass('sec-cnt-caret');
      $(this).closest('.col').addClass('col-cnt-caret');
      $(this).closest('.row').addClass('row-cnt-caret');
      $(this).closest('.sqs-block-content').addClass('cnt-caret');

      chk = chk.replace('^','');
      jQuery(this).html(chk);
    }
    // Hero Image Gradient «    dbl-left-angle   (alr or option + | pipe)
    if(chk.indexOf('«') != -1){
      $(this).addClass('ele-cnt-dblLeftAngle');
      $(this).closest('section').addClass('hero-left-gradient-over');
      $(this).closest('section').addClass('ele-cnt-dblLeftAngle');
      $(this).closest('.col').addClass('ele-cnt-dblLeftAngle');
      $(this).closest('.row').addClass('ele-cnt-dblLeftAngle');
      chk = chk.replace('«','');
      jQuery(this).html(chk);
    }
  });

  // Gallery Copy
  $('.Index-gallery-item-content-body p').each(function(index) {
    chk = $(this).html();
    // Dagger
    if(chk.indexOf('†') != -1){
      //$(this).closest('.col').addClass('cnt-dagger');
      $(this).addClass('ele-cnt-dagger');
      chk = chk.replace('†','');
      jQuery(this).html(chk);
    }
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ MODALS ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function setupModals(){
  
  var animateonend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
  var modalArea = ' .page-content';
      modalArea = ' .Index-page-content .sqs-layout';
  var modalindex = '.index-section';
      modalindex = '.Index-page';

  //  Hook links to modals
  var lnk;
  var mousePosTop;
  var linkOffset;

  //  Add class to modals
  var section;
  $(modalindex).each(function() {
    section = $(this).attr('id');
    //  Add close X
    if(section.indexOf('modal-') != -1){
      $(this).addClass('sqr-modal');
      $(this).find(modalArea).prepend('<a class="close-reveal-modal" aria-label="Close">×</a>');
    }
  });

  // Open modal when #modal detected
  $('a').each(function() {
    lnk = $(this).attr('href');
    if(lnk != undefined){
      if(lnk.indexOf('#modal-') != -1){
        $(this).click(function(e) {
          lnk = $(this).attr('href');
          linkOffset = $(this).offset();
          mousePosTop = e.pageY;

          /* Google Analytics */
          //ga('send', 'event', 'Modal','Click','' + lnk + ''); 

          /* Lower Page Cut-off */
          //$('main.Index').css('padding-bottom',600);  //See next function - just turned off the overflow on the section

          openModal(lnk,mousePosTop);
          return false;
        });
      }
    }
  });

  var modalOpenAnim = 'zoomIn';
  var modalCloseAnim = 'zoomOut';

  //  Open Modal
  function openModal(modalID,mousePosTop){

    var modalSection = modalID + '';
    var modalContentArea = modalSection + modalArea;

    $(modalSection).css('visibility','visible');
    $(modalSection).css('overflow','visible');    //Fixes issues when close to footer

    mousePosTop = window.pageYOffset;           // Puts at top of window rather than where link was clicked  
    $(modalContentArea).css('top',mousePosTop);

    //  annimate modal in
    $(modalSection + modalArea).addClass('animated ' + modalOpenAnim).one(animateonend,function() {
      $(modalSection + modalArea).removeClass('animated ' + modalOpenAnim);
    });
  }

  //  Close modal
  $('.close-reveal-modal').click(function() {
    //$('main.Index').css('padding-bottom','inherit');
    $(this).parents(modalArea).addClass('animated ' + modalCloseAnim).one(animateonend,function() {
      $(modalArea).removeClass('animated ' + modalCloseAnim);
      $(this).parents(modalindex).css('visibility','hidden');
    });
    $(modalSection).css('overflow','hidden');
  });

  //  Edge Images
  $('.image-block img').each(function() {
    var filename = $(this).attr('data-src');
    if(filename.indexOf('edge') != -1){
      $(this).parents('.sqs-block.image-block.sqs-block-image').addClass('modal-fullwidth');
    }
  });

  var openModalbyQuery = getParameterByName('modal');
  if(openModalbyQuery != null){
    openModal('#'+openModalbyQuery,20);
  }

  // Clean up index navigation / i.e. right side nav
  var chk;
  $('.Index-nav-inner .Index-nav-item').each(function() {
    chk = $(this).find('span').html();
    if(chk.indexOf('modal ') != -1){
      chk = chk.replace('modal ','');
      $(this).find('span').html(chk);
      $(this).addClass('hide');
    }
  });
} // End setupModals

function getParameterByName(name, url) {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ create SLICK CAROUSEL ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function makeSlickCarousel() {
  $.getScript('https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.js', function(){
    $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="https://unpkg.com/ionicons@4.4.6/dist/css/ionicons.min.css" type="text/css" />');
    makeSlickCarouselGo();
  });
}

function makeSlickCarouselGo() {
  var chk;
  var chkslick = false;
  var makeSlickID;
  var summaryID;
  var slickImgsToShow = 1;
  
  $('.summary-item-list').each(function(index) {
    // Check each summary for slick, if, then make slick
    // ID method grabs one at a time 
    summaryID = $(this).attr('id');

    $('#' + summaryID + ' a.summary-title-link').each(function(index) {
      chk = $(this).attr('href');

      // Check for number of slides
      if(chk.indexOf('-slick-') != -1){
        slickImgsToShow = chk.substring(chk.indexOf('-slick-')+7,chk.indexOf('-slick-')+8);
        slickImgsToShow = parseInt(slickImgsToShow);
      }
      
      // Get ID of Summary to Slick        
      if(chk.indexOf('-slick') != -1){
        makeSlickID = summaryID;
        outputSlick(makeSlickID);
        return false;
      }
    });  
  });

  function outputSlick(sumID){
    var newSlickID = "slicked_" + sumID;
    var ht;
    var summ_image = '';
    var summ_title = '';
    var summ_title_split;
    var summ_excerpt = '';
    var summ_fontsize;
    var elements_order;
    var image_style;

    // Get the font size based on what the Summary has been set to in layout: small,medium,large,extralarge
    summ_fontsize = $('#' + sumID).parents('.sqs-block-content').find('div').attr('class');
    summ_fontsize = summ_fontsize.substring(summ_fontsize.indexOf('summary-block-setting-text-size-')+32);
    summ_fontsize = summ_fontsize.substring(0,summ_fontsize.indexOf(' ')-1);

    ht = '<div class="slick-from-SS font_' + summ_fontsize +'" id="' + newSlickID + '">';

    $('#' + sumID + ' .summary-item').each(function(index) {
      
      ht += '<div class="el';

        var chkTags = '';
        
        // Adding tags assigned as classes
        $(this).find('.summary-metadata-item--tags a').each(function(index){
          if(chkTags.indexOf($(this).html()) == -1){
            ht += ' ' + $(this).html();
            if($(this).html().indexOf('_') != -1){
              elements_order = $(this).html();
            }
            chkTags += $(this).html();
          }
        });

      if(typeof elements_order !== 'undefined' && elements_order !== null) {}else{
        elements_order = 'default';
      }

      ht += ' tags_' + elements_order + '">';

      summ_image = $(this).find('.summary-thumbnail-outer-container .summary-thumbnail.img-wrapper img').attr('data-src');
      summ_excerpt = $(this).find('.summary-excerpt').html();

      // Look for special characters within title and wrap a span around second half to style differently
      var summ_title_class = $(this).find('.summary-title').attr('class');
      var summ_title_link = $(this).find('.summary-title a').attr('href');
      var summ_title_style = $(this).find('.summary-title a').attr('style');
      var summ_title_content = $(this).find('.summary-title').contents().unwrap().text().trim();
      var summ_title_content_formatted;

      //Check for em dash
      summ_title_content = summ_title_content.replace(/\u2013|\u2014/g, "~");

      if(summ_title_content.indexOf('|') != -1){
        summ_title_content_split = summ_title_content.split('|');
        summ_title_content_formatted = '<span class="part1">' + summ_title_content_split[0] + '</span> | <span class="part2">' + summ_title_content_split[1] + '</span>';
      }else if(summ_title_content.indexOf('-') != -1){
        summ_title_content_split = summ_title_content.split('-');
        summ_title_content_formatted = '<span class="part1">' + summ_title_content_split[0] + '</span> - <span class="part2">' + summ_title_content_split[1] + '</span>';
      }else if(summ_title_content.indexOf('~') != -1){
        //em dash
        summ_title_content_split = summ_title_content.split('~');
        //summ_title_content_formatted = '<span class="part1">' + summ_title_content_split[0] + ' ⁠&mdash; ' + '<span>' + summ_title_content_split[1] + '</span>';
        summ_title_content_formatted = '<span class="part1">' + summ_title_content_split[0] + '</span> &mdash; <span class="part2">' + summ_title_content_split[1] + '</span>';
      }else{
        summ_title_content_formatted = '<span class="part1">' + summ_title_content + '</span>';
      }

      // Remove href if this is a testimonial
      if(chkTags.indexOf('Testimonial') == -1 && chkTags.indexOf('testimonial') == -1){
        summ_title = '<a href="' + summ_title_link + '" class="' + summ_title_class + '" style="' + summ_title_style + '">' + summ_title_content_formatted + '</a>';
      }else{
        summ_title = '<span style="color:' + $(this).find('p').css('color') + ';">' + summ_title_content_formatted + '</span>';
      }



      // Testimonial check for expanding option
      if(chkTags.indexOf('Testimonial') == -1 && chkTags.indexOf('testimonial') == -1){

      }else{ 
        //
        summ_excerpt = '<div class="testimonialsOuter">' + summ_excerpt + '</div>';
        var HTMLNodes = $($.parseHTML(summ_excerpt));

        HTMLNodes.find('p').each(function(){
          var chk = $(this).find('em').length;
          if(chk > 0){
            $(this).addClass('compress');
            $(this).closest('.testimonialsOuter').find('p').first().addClass('show');
          }
        });

        HTMLNodes.find('.compress').wrapAll( "<div class='compressed' />");
        HTMLNodes.find('.show').after('<a class="testimonialMoreLink">MORE</a>');

        summ_excerpt = HTMLNodes[0].outerHTML;

        /* CSS */
        var cssString = '.compressed{display:none}.testimonialMoreLink{cursor:pointer;text-decoration:underline}';
        $('<style type="text/css">' + cssString + '</style>').appendTo("head");

        /* ***** 
          See Testimonials More Link Click Event Below 
        ****** */
      }

      //elements_order = $(this).find('.summary-metadata-item--tags a').html(); // Get the order from the tag added to the image *** Grabs the first tag only

      // Circle Image
      if (typeof summ_image !== 'undefined' && summ_image !== null) {
        if(summ_image.indexOf('_circ') != -1 || summ_image.indexOf('-circ') != -1){
          image_style = ' class="circleImage withinSlick"';          
        }
      }

      switch(elements_order) {
        case '_TIE':
          // Title, Image, Excerpt
          if(summ_title != undefined){
            ht += '<div class="title">' + summ_title + '</div>';  
          }
          if (typeof summ_image !== 'undefined' && summ_image !== null) {
            ht += '<div class="slickimg"><img src="' + summ_image + '" '+ image_style + '></div>';
          }
          if(summ_excerpt != undefined){
            ht += '<div class="excerpt">' + summ_excerpt + '</div>';
          }            
          break;
        case '_IET':
          // Image, Excerpt, Title
          if (typeof summ_image !== 'undefined' && summ_image !== null) {
            ht += '<div class="slickimg"><img src="' + summ_image + '" '+ image_style + '></div>';
          }
          if(summ_excerpt != undefined){
            ht += '<div class="excerpt">' + summ_excerpt + '</div>';
          }
          if(summ_title != undefined){
            ht += '<div class="title">' + summ_title + '</div>';  
          }
          break;
        case '_EIT':
          // Excerpt, Image, Title
          if(summ_excerpt != undefined){
            ht += '<div class="excerpt">' + summ_excerpt + '</div>';
          }
          if (typeof summ_image !== 'undefined' && summ_image !== null) {
            ht += '<div class="slickimg"><img src="' + summ_image + '" '+ image_style + '></div>';
          }
          if(summ_title != undefined){
            ht += '<div class="title">' + summ_title + '</div>';  
          }
          break;
        case '_ETI':
          // Excerpt, Title, Image
          if(summ_excerpt != undefined){
            ht += '<div class="excerpt">' + summ_excerpt + '</div>';
          }
          if(summ_title != undefined){
            ht += '<div class="title">' + summ_title + '</div>';  
          }
          if (typeof summ_image !== 'undefined' && summ_image !== null) {
            ht += '<div class="slickimg"><img src="' + summ_image + '" '+ image_style + '></div>';
          }
          break;
        case '_ET':
          // Hide Image: Title, Excerpt
          if(summ_excerpt != undefined){
            ht += '<div class="excerpt">' + summ_excerpt + '</div>';
          }
          if(summ_title != undefined){
            ht += '<div class="title">' + summ_title + '</div>';  
          }
          break;
        case '_TE':
          // Hide Image: Excerpt, Title
          if(summ_title != undefined){
            ht += '<div class="title">' + summ_title + '</div>';  
          }
          if(summ_excerpt != undefined){
            ht += '<div class="excerpt">' + summ_excerpt + '</div>';
          }
          break;
        default:
          // Image, Title, Excerpt
          if (typeof summ_image !== 'undefined' && summ_image !== null) {
            ht += '<div class="slickimg"><img src="' + summ_image + '" ' + image_style + '></div>';
          }
          if(summ_title != undefined){
            ht += '<div class="title">' + summ_title + '</div>';  
          }
          if(summ_excerpt != undefined){
            ht += '<div class="excerpt">' + summ_excerpt + '</div>';
          }
        }
      ht += '</div>';
    }); // End each summary item

    ht += '</div>';

    $('#' + sumID).parents('.sqs-block-content').before(ht);
    $('#' + sumID).parents('.summary-item-list-container').detach();
    $('#' + sumID).detach();

    $("#" + newSlickID).slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: slickImgsToShow,
      slidesToScroll: slickImgsToShow,
      autoplay: true,
      autoplaySpeed: 6000,
        responsive: [
          {
            breakpoint: 1,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          }
        ]
    });

    $('.testimonialMoreLink').click(function(){
      var isOpen = $(this).closest('.testimonialsOuter').find('.compressed').css('display');
      if(isOpen == 'none'){
        $(this).closest('.testimonialsOuter').find('.compressed').slideDown();
        $(this).html('LESS');
      }else{
        $(this).closest('.testimonialsOuter').find('.compressed').slideUp();
        $(this).html('MORE');
      }
    });

  } //outputSlick

  function responsiveSlick(brkpoint,slides){
    /* 
      Pass breakpoint
      Check num slides, if more than 2, reduce down by 1
      return new number 
      *note done yet*
    */
  } // responsiveSlick
} // makeSlickCarousel
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ create TIMELINE ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function createTimeline(){
  // Identify the timeline
  $('.sqs-block-content ul').each(function(indexTop) {
    $(this).find('li').each(function() { 
      chk = $(this).html();
      if(chk.indexOf('~tmln') != -1){
        $(this).parent('ul').addClass('makeTimeline timeline_' + indexTop);
        $(this).parents('section').addClass('timeline-section');
        $('body.blogsections section').removeClass('timeline-section'); //Remove the timeline-section class from any blogs since there's only one section - not an index page
        $(this).closest('.sqs-block-content').addClass('timeline-section-block-content');
        $(this).detach();  // Remove this li
      }
    });
  });

  // Set up the classes
  $("ul.makeTimeline > li").addClass('timeline-block');
  //$("ul.makeTimeline > li").wrapInner('<div class="timeline-content" data-aos="zoom-in-up" data-aos-anchor-placement="top-center"></div>');
  $("ul.makeTimeline > li").wrapInner('<div class="timeline-content" data-aos="zoom-in-up" data-aos-anchor-placement="top-bottom"></div>');

  // Extract out date and icon
  var geticon = ' ';
  var getdate = ' ';
  $('ul.makeTimeline li').each(function() {
    
    var $this = $(this);
    $this.closest('.timeline-content ul li').each(function(){
      var chk = $this.find('p').html();
      if(typeof chk !== 'undefined' && chk !== null) {
        // icon
        if(chk.indexOf('^') != -1){
          geticon = $this.find('p').html();
          geticon = geticon.replace('^','');
          $this.parents('.timeline-block').prepend('<div class="timeline-icon ' + geticon + '" data-aos="anim-color"></div>');
          $this.detach();
        }
        // date
        if(chk.indexOf('#') != -1){
          getdate = $this.find('p').html();
          getdate = getdate.replace('#','');
          $this.parents('.timeline-block').prepend('<div class="timeline-date">' + getdate + '</div>');
          $this.parents('.timeline-content').prepend('<div class="timeline-date mobile">' + getdate + '</div>');
          $this.detach();
        }
      }
    });
  });

  // Compress longer content
  var chk;
  var str1;
  var str2;
  $('.timeline-content').each(function() {
    chk = $(this).find('p').html();

    $(this).html(chk);
    if(typeof chk !== 'undefined' && chk !== null) {
      if(chk.indexOf('<br><br>') != -1){
        str1 = chk.substring(0,chk.indexOf('<br><br>'));
        //str2 = '<div class="reveal">' + chk.substring(chk.indexOf('<br><br>'),chk.indexOf('<ul></ul>')) + '</div>';
        str2 = '<div class="reveal">' + chk.substring(chk.indexOf('<br><br>')) + '</div>';
        $(this).html(str1 + str2 + '<div class="expand"></div>');
      }
    }
  });

  $('.expand').click(function() {
    $(this).parent('.timeline-content').find('.reveal').slideToggle( 200, function() {});
    $(this).toggleClass('expanded');
  });
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ timeline2019 ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function timeline2019(){
  $('.sqs-block-content ul').each(function(indexTop) {
    $(this).find('li').each(function() { 
      chk = $(this).html();
      if(chk.indexOf('~timeline2019') != -1){
        $(this).parent('ul').addClass('timeline2019 timeline_' + indexTop);
        $(this).parents('section').addClass('timeline-section');
        $('body.blogsections section').removeClass('timeline-section'); //Remove the timeline-section class from any blogs since there's only one section - not an index page
        $(this).closest('.sqs-block-content').addClass('timeline-section-block-content');
        $(this).detach();  // Remove this li

        $.getScript('https://cdn.jsdelivr.net/scrollreveal.js/3.3.1/scrollreveal.min.js', function(){
          runScrollReveal();
        });
      }
    });
  });

  var h= '';
  var numberOfElements = $('ul.timeline2019 > li').length;

  h += '<div class="timeline">';

  $('ul.timeline2019 > li').each(function(index) {
    var elementRaw = $(this).find('p').html();
    var title;
    var description;

    var subElements;
    var timelineDate;
    var timelineImage = '';
    var ifImageCardAddClass = '';               //If an image is present, the element is a structured with a header

    // Sub Elements DATES - HEADER IMAGE
    $(this).find('li').each(function(index){
      subElements = $(this).find('p');

      if(index == 0){
        timelineDate = subElements.html();
      }else if(index == 1){
        if(typeof subElements !== 'undefined' && subElements !== null) {
          timelineImage = subElements.find('a').attr('href');
          ifImageCardAddClass = ' timeline-card'; // We're going to add this class
        }
      }
    });

    var timelineImageClass = '';

    if(typeof timelineImage !== 'undefined' && timelineImage !== null) {
      timelineImageClass = ' hasBannerImage';
    }else{
      timelineImageClass = ' noBannerImage';
    }

    //  Start Timeline Items
    h += '<div class="timeline-item' + timelineImageClass + '">';
    h += '  <div class="timeline-img"></div>';

    //  Odd even tagging
    if (index % 2 === 0) { 
      /* EVEN */ 
      h += '  <div class="timeline-body-content' + ifImageCardAddClass + ' js--fadeInRight">';
    }else{
      /* ODD */ 
      h += '  <div class="timeline-body-content' + ifImageCardAddClass + ' js--fadeInLeft">';
    }

    var timeLineTitle = $(this).find('p').find('em').html();
    if(typeof timeLineTitle !== 'undefined' && timeLineTitle !== null){

    }else{
      timeLineTitle = ' '; // Fixes null titles
    }

    //  Header Image

    if(typeof timelineImage !== 'undefined' && timelineImage !== null) {
      if(timelineImage.length > 0){
        if(timelineImage.indexOf('nooverlay') != -1){
          h += '<div class="timeline-img-header" style="background: url(' + timelineImage + ') center center no-repeat;">';
          h += '  <h3 class="timelinetitle">' + timeLineTitle + '</h2>';
          h += '</div>';
        }else{
          h += '<div class="timeline-img-header" style="background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0, .6)), url(' + timelineImage + ') center center no-repeat;">';
            h += '  <h3 class="timelinetitle">' + timeLineTitle + '</h2>';
          h += '</div>';
        }
        
      }
    }

    //  Date
    if(timelineDate.length > 0){
      h += '    <div class="date">' + timelineDate + '</div>';
    }

    // This does not appear to be doing anything
    if(typeof timelineImage !== 'undefined' && timelineImage !== null) {
      if(timelineImage.length == 0){
        h += '    <h3 class="timelinetitle overBannerImage">' + timeLineTitle + '</h2>';                  // Title
      }
    }

    // Audio / Body Image SVG
    $(this).find('a').each(function(){
      if($(this).html().indexOf('.mp3') != -1){
        var mp3File = $(this).attr('href');
        var audioHtml = '';
        
        audioHtml += '<audio controls id="audioid_' + index + '">';
        audioHtml += '  <source src="' + mp3File + '" type="audio/mpeg">';
        audioHtml += '  Your browser does not support the audio element.';
        audioHtml += '</audio>';
        $(this).after(audioHtml);
        $(this).remove();

        // Add an audio icon so we see it withough expanding
        h += '    <div class="audioicon audioid_' + index + '"></div>';
      }
      if($(this).html().indexOf('.svg') != -1 || $(this).html().indexOf('.png') != -1){
        var bodyImageSvgFile = $(this).attr('href');
        var imagePosition = '';

        if(bodyImageSvgFile.indexOf('-center') != -1){
          imagePosition = ' center';
        }else if(bodyImageSvgFile.indexOf('-right') != -1){
          imagePosition = ' right';
        }else if(bodyImageSvgFile.indexOf('-left') != -1){
          imagePosition = ' left';
        }

        var bodyImageSvgHtml = '';
        bodyImageSvgHtml += '<img class="bodyImage' + imagePosition + '" src="' + bodyImageSvgFile + '" alt="' + bodyImageSvgFile + '" />';
        $(this).after(bodyImageSvgHtml);
        $(this).remove();
      }
    });

    // Full description
    description = $(this).find('p');
    description.find('em').remove();

    // HIDE/REVEAL secondary paragraphs
    var descriptionHTML = description.html();

    if(descriptionHTML.length > 0){

      h += '<div class="description">';

      if(typeof timelineImage == 'undefined' || timelineImage == null) {
        h += '<h3 class="timelinetitle noimagebanner">' + timeLineTitle.replace('<br>','') + '</h3>';
      }

      if(typeof descriptionHTML !== 'undefined' && descriptionHTML !== null) {
        
        // Single paras
        if(descriptionHTML.indexOf('<br><br>') == -1){
          descriptionHTML = descriptionHTML.replace('<br>','');
          h += '<p class="singlePara">' + descriptionHTML + '</p>';
        }
        // Multi paras
        if(descriptionHTML.indexOf('<br><br>') != -1){

          // First paragraph
          var firstPara = descriptionHTML.substring(0,descriptionHTML.indexOf('<br><br>'));

          firstPara = firstPara.replace('<br>','');
          h += '<p>' + firstPara + '</p>';

          // Hide Reveal
          var descriptionReveal = descriptionHTML.substring(descriptionHTML.indexOf('<br><br>'));
          var cleanRevealArray = descriptionReveal.split("<br><br>");
          cleanRevealArray.shift(); // Remove the first item which is blank

          h += '<div class="reveal">';
          for(i = 0; i < cleanRevealArray.length; i++) {
            h += '<p>' + cleanRevealArray[i] + '</p>';
          }

          h += '</div>';
          h += '<div class="timeline expand"><span class="arrowOuter"><span class="arrow"></span></span></span></div>';
        }
      }
      h += '  </div>';

    }

    h += '  </div>';  // timeline-body-content
    h += '</div>';  // timeline-time

    var isLastElement = index == numberOfElements -1;

    if (isLastElement) {
      /* Last Item */
      h += '</div>';
      $('ul.timeline2019').after(h);
      $('ul.timeline2019').remove();
    }
  });
  
  var sounds = document.getElementsByTagName('audio');

  // Bottom expand arrow click
  $('.timeline.expand').click(function(){
    $(this).toggleClass('active');
    $(this).closest('.description').find('.reveal').slideToggle(100, function(){});    
    for(i=0; i<sounds.length; i++) sounds[i].pause();
  });

  // Audio icon click
  $('.audioicon').click(function(){
    for(i=0; i<sounds.length; i++) sounds[i].pause();
    $(this).closest('.timeline-item').find('.timeline.expand').toggleClass('active');
    $(this).closest('.timeline-item').find('.description .reveal').slideToggle(100, function(){});
    var audioplayid = $(this).attr('class');
    audioplayid = audioplayid.substr(10); //remove the base class
    $('html, body').animate({
        scrollTop: $("#" + audioplayid).offset().top - 100
    }, 1000);
    var audioplay = document.getElementById(audioplayid);
    audioplay.play();
  });

  // Animate in the panels on scroll
  function runScrollReveal(){
    window.sr = ScrollReveal();

    if ($(window).width() < 768) {
      if ($('.timeline-content').hasClass('js--fadeInLeft')) {
        $('.timeline-content').removeClass('js--fadeInLeft').addClass('js--fadeInRight');
      }
      sr.reveal('.js--fadeInRight', {
        origin: 'right',
        distance: '300px',
        easing: 'ease-in-out',
        duration: 800,
      });
    } else {
      sr.reveal('.js--fadeInLeft', {
        origin: 'left',
        distance: '300px',
        easing: 'ease-in-out',
        duration: 800,
      });

      sr.reveal('.js--fadeInRight', {
        origin: 'right',
        distance: '300px',
        easing: 'ease-in-out',
        duration: 800,
      });
    }

    sr.reveal('.js--fadeInLeft', {
      origin: 'left',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });

    sr.reveal('.js--fadeInRight', {
      origin: 'right',
      distance: '300px',
      easing: 'ease-in-out',
      duration: 800,
    });
  }

}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~ create COMPRESSED SUMMARY POP UP ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function makeCompressedSummary() {
  var chk;
  var summaryGridID;
  var makeCompressedID;
  
  //$('body').find('.sqs-lightbox-meta').addClass('overlay-description-visual');

  $('.summary-item-list.sqs-gallery-design-autogrid').each(function(index) {
    // Same as carousel
    summaryGridID = $(this).attr('id');

    $('#' + summaryGridID + ' a.summary-thumbnail-container').each(function(index) {
      chk = $(this).attr('href');  
      // Get ID of Summary to Compressed        
      if(chk.indexOf('-compressed') != -1){
        makeCompressedID = summaryGridID;
        compressSummary(makeCompressedID);
        $(this).parents('.sqs-gallery-design-autogrid').addClass('compressedSummaryContainer');

        return false;
      }
    });  
  });

  function compressSummary(sumID){
    var newCompressedID = "compressed_" + sumID;
    var chk;

    $('#' + sumID + '.sqs-gallery-design-autogrid .summary-item').each(function(index) {
      var $this = $(this);
      $this.find("p").each(function(){
        chk = $(this).html();
        if(chk.indexOf('strong') == -1){
          $(this).addClass('compress');
          $(this).parents('.summary-item').addClass('compressedSummary');
        }
        if(chk.indexOf('strong') != -1){
          $(this).addClass('strong');
        }
      });
    });
  } // compressSummary
} // makeCompressedSummary
/* +++++++++++++++++++++++++++++ +++++++++++++++++++++++++++++++++++++ ++++++++++++++++++++++++++++++++++++++ */
