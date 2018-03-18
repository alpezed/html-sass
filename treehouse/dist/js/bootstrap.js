if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){var e=jQuery.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher")}(),function(o){"use strict";o.fn.emulateTransitionEnd=function(t){var e=!1,i=this;o(this).one("bsTransitionEnd",function(){e=!0});return setTimeout(function(){e||o(i).trigger(o.support.transition.end)},t),this},o(function(){o.support.transition=function(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}(),o.support.transition&&(o.event.special.bsTransitionEnd={bindType:o.support.transition.end,delegateType:o.support.transition.end,handle:function(t){if(o(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(n){"use strict";var e='[data-dismiss="alert"]',a=function(t){n(t).on("click",e,this.close)};a.VERSION="3.3.1",a.TRANSITION_DURATION=150,a.prototype.close=function(t){var e=n(this),i=e.attr("data-target");i||(i=(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,""));var o=n(i);function s(){o.detach().trigger("closed.bs.alert").remove()}t&&t.preventDefault(),o.length||(o=e.closest(".alert")),o.trigger(t=n.Event("close.bs.alert")),t.isDefaultPrevented()||(o.removeClass("in"),n.support.transition&&o.hasClass("fade")?o.one("bsTransitionEnd",s).emulateTransitionEnd(a.TRANSITION_DURATION):s())};var t=n.fn.alert;n.fn.alert=function(i){return this.each(function(){var t=n(this),e=t.data("bs.alert");e||t.data("bs.alert",e=new a(this)),"string"==typeof i&&e[i].call(t)})},n.fn.alert.Constructor=a,n.fn.alert.noConflict=function(){return n.fn.alert=t,this},n(document).on("click.bs.alert.data-api",e,a.prototype.close)}(jQuery),function(n){"use strict";var s=function(t,e){this.$element=n(t),this.options=n.extend({},s.DEFAULTS,e),this.isLoading=!1};function i(o){return this.each(function(){var t=n(this),e=t.data("bs.button"),i="object"==typeof o&&o;e||t.data("bs.button",e=new s(this,i)),"toggle"==o?e.toggle():o&&e.setState(o)})}s.VERSION="3.3.1",s.DEFAULTS={loadingText:"loading..."},s.prototype.setState=function(t){var e="disabled",i=this.$element,o=i.is("input")?"val":"html",s=i.data();t+="Text",null==s.resetText&&i.data("resetText",i[o]()),setTimeout(n.proxy(function(){i[o](null==s[t]?this.options[t]:s[t]),"loadingText"==t?(this.isLoading=!0,i.addClass(e).attr(e,e)):this.isLoading&&(this.isLoading=!1,i.removeClass(e).removeAttr(e))},this),0)},s.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")&&(i.prop("checked")&&this.$element.hasClass("active")?t=!1:e.find(".active").removeClass("active")),t&&i.prop("checked",!this.$element.hasClass("active")).trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active"));t&&this.$element.toggleClass("active")};var t=n.fn.button;n.fn.button=i,n.fn.button.Constructor=s,n.fn.button.noConflict=function(){return n.fn.button=t,this},n(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(t){var e=n(t.target);e.hasClass("btn")||(e=e.closest(".btn")),i.call(e,"toggle"),t.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){n(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery),function(c){"use strict";var f=function(t,e){this.$element=c(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=e,this.paused=this.sliding=this.interval=this.$active=this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",c.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",c.proxy(this.pause,this)).on("mouseleave.bs.carousel",c.proxy(this.cycle,this))};function a(s){return this.each(function(){var t=c(this),e=t.data("bs.carousel"),i=c.extend({},f.DEFAULTS,t.data(),"object"==typeof s&&s),o="string"==typeof s?s:i.slide;e||t.data("bs.carousel",e=new f(this,i)),"number"==typeof s?e.to(s):o?e[o]():i.interval&&e.pause().cycle()})}f.VERSION="3.3.1",f.TRANSITION_DURATION=600,f.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},f.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},f.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(c.proxy(this.next,this),this.options.interval)),this},f.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},f.prototype.getItemForDirection=function(t,e){var i="prev"==t?-1:1,o=(this.getItemIndex(e)+i)%this.$items.length;return this.$items.eq(o)},f.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(i<t?"next":"prev",this.$items.eq(t))},f.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&c.support.transition&&(this.$element.trigger(c.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},f.prototype.next=function(){if(!this.sliding)return this.slide("next")},f.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},f.prototype.slide=function(t,e){var i=this.$element.find(".item.active"),o=e||this.getItemForDirection(t,i),s=this.interval,n="next"==t?"left":"right",a="next"==t?"first":"last",r=this;if(!o.length){if(!this.options.wrap)return;o=this.$element.find(".item")[a]()}if(o.hasClass("active"))return this.sliding=!1;var l=o[0],h=c.Event("slide.bs.carousel",{relatedTarget:l,direction:n});if(this.$element.trigger(h),!h.isDefaultPrevented()){if(this.sliding=!0,s&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var p=c(this.$indicators.children()[this.getItemIndex(o)]);p&&p.addClass("active")}var d=c.Event("slid.bs.carousel",{relatedTarget:l,direction:n});return c.support.transition&&this.$element.hasClass("slide")?(o.addClass(t),o[0].offsetWidth,i.addClass(n),o.addClass(n),i.one("bsTransitionEnd",function(){o.removeClass([t,n].join(" ")).addClass("active"),i.removeClass(["active",n].join(" ")),r.sliding=!1,setTimeout(function(){r.$element.trigger(d)},0)}).emulateTransitionEnd(f.TRANSITION_DURATION)):(i.removeClass("active"),o.addClass("active"),this.sliding=!1,this.$element.trigger(d)),s&&this.cycle(),this}};var t=c.fn.carousel;c.fn.carousel=a,c.fn.carousel.Constructor=f,c.fn.carousel.noConflict=function(){return c.fn.carousel=t,this};var e=function(t){var e,i=c(this),o=c(i.attr("data-target")||(e=i.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,""));if(o.hasClass("carousel")){var s=c.extend({},o.data(),i.data()),n=i.attr("data-slide-to");n&&(s.interval=!1),a.call(o,s),n&&o.data("bs.carousel").to(n),t.preventDefault()}};c(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),c(window).on("load",function(){c('[data-ride="carousel"]').each(function(){var t=c(this);a.call(t,t.data())})})}(jQuery),function(a){"use strict";var r=function(t,e){this.$element=a(t),this.options=a.extend({},r.DEFAULTS,e),this.$trigger=a(this.options.trigger).filter('[href="#'+t.id+'"], [data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};function s(t){var e,i=t.attr("data-target")||(e=t.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"");return a(i)}function l(o){return this.each(function(){var t=a(this),e=t.data("bs.collapse"),i=a.extend({},r.DEFAULTS,t.data(),"object"==typeof o&&o);!e&&i.toggle&&"show"==o&&(i.toggle=!1),e||t.data("bs.collapse",e=new r(this,i)),"string"==typeof o&&e[o]()})}r.VERSION="3.3.1",r.TRANSITION_DURATION=350,r.DEFAULTS={toggle:!0,trigger:'[data-toggle="collapse"]'},r.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},r.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t,e=this.$parent&&this.$parent.find("> .panel").children(".in, .collapsing");if(!(e&&e.length&&(t=e.data("bs.collapse"))&&t.transitioning)){var i=a.Event("show.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){e&&e.length&&(l.call(e,"hide"),t||e.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var s=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return s.call(this);var n=a.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",a.proxy(s,this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][n])}}}},r.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=a.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var e=this.dimension();this.$element[e](this.$element[e]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!a.support.transition)return i.call(this);this.$element[e](0).one("bsTransitionEnd",a.proxy(i,this)).emulateTransitionEnd(r.TRANSITION_DURATION)}}},r.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},r.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(t,e){var i=a(e);this.addAriaAndCollapsedClass(s(i),i)},this)).end()},r.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var t=a.fn.collapse;a.fn.collapse=l,a.fn.collapse.Constructor=r,a.fn.collapse.noConflict=function(){return a.fn.collapse=t,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var e=a(this);e.attr("data-target")||t.preventDefault();var i=s(e),o=i.data("bs.collapse")?"toggle":a.extend({},e.data(),{trigger:this});l.call(i,o)})}(jQuery),function(r){"use strict";var t=".dropdown-backdrop",l='[data-toggle="dropdown"]',o=function(t){r(t).on("click.bs.dropdown",this.toggle)};function n(o){o&&3===o.which||(r(t).remove(),r(l).each(function(){var t=r(this),e=h(t),i={relatedTarget:this};e.hasClass("open")&&(e.trigger(o=r.Event("hide.bs.dropdown",i)),o.isDefaultPrevented()||(t.attr("aria-expanded","false"),e.removeClass("open").trigger("hidden.bs.dropdown",i)))}))}function h(t){var e=t.attr("data-target");e||(e=(e=t.attr("href"))&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var i=e&&r(e);return i&&i.length?i:t.parent()}o.VERSION="3.3.1",o.prototype.toggle=function(t){var e=r(this);if(!e.is(".disabled, :disabled")){var i=h(e),o=i.hasClass("open");if(n(),!o){"ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length&&r('<div class="dropdown-backdrop"/>').insertAfter(r(this)).on("click",n);var s={relatedTarget:this};if(i.trigger(t=r.Event("show.bs.dropdown",s)),t.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),i.toggleClass("open").trigger("shown.bs.dropdown",s)}return!1}},o.prototype.keydown=function(t){if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)){var e=r(this);if(t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled")){var i=h(e),o=i.hasClass("open");if(!o&&27!=t.which||o&&27==t.which)return 27==t.which&&i.find(l).trigger("focus"),e.trigger("click");var s=" li:not(.divider):visible a",n=i.find('[role="menu"]'+s+', [role="listbox"]'+s);if(n.length){var a=n.index(t.target);38==t.which&&0<a&&a--,40==t.which&&a<n.length-1&&a++,~a||(a=0),n.eq(a).trigger("focus")}}}};var e=r.fn.dropdown;r.fn.dropdown=function(i){return this.each(function(){var t=r(this),e=t.data("bs.dropdown");e||t.data("bs.dropdown",e=new o(this)),"string"==typeof i&&e[i].call(t)})},r.fn.dropdown.Constructor=o,r.fn.dropdown.noConflict=function(){return r.fn.dropdown=e,this},r(document).on("click.bs.dropdown.data-api",n).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",l,o.prototype.toggle).on("keydown.bs.dropdown.data-api",l,o.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="menu"]',o.prototype.keydown).on("keydown.bs.dropdown.data-api",'[role="listbox"]',o.prototype.keydown)}(jQuery),function(n){"use strict";var a=function(t,e){this.options=e,this.$body=n(document.body),this.$element=n(t),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,n.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};function r(o,s){return this.each(function(){var t=n(this),e=t.data("bs.modal"),i=n.extend({},a.DEFAULTS,t.data(),"object"==typeof o&&o);e||t.data("bs.modal",e=new a(this,i)),"string"==typeof o?e[o](s):i.show&&e.show(s)})}a.VERSION="3.3.1",a.TRANSITION_DURATION=300,a.BACKDROP_TRANSITION_DURATION=150,a.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},a.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},a.prototype.show=function(i){var o=this,t=n.Event("show.bs.modal",{relatedTarget:i});this.$element.trigger(t),this.isShown||t.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',n.proxy(this.hide,this)),this.backdrop(function(){var t=n.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.options.backdrop&&o.adjustBackdrop(),o.adjustDialog(),t&&o.$element[0].offsetWidth,o.$element.addClass("in").attr("aria-hidden",!1),o.enforceFocus();var e=n.Event("shown.bs.modal",{relatedTarget:i});t?o.$element.find(".modal-dialog").one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(a.TRANSITION_DURATION):o.$element.trigger("focus").trigger(e)}))},a.prototype.hide=function(t){t&&t.preventDefault(),t=n.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),n(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),n.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",n.proxy(this.hideModal,this)).emulateTransitionEnd(a.TRANSITION_DURATION):this.hideModal())},a.prototype.enforceFocus=function(){n(document).off("focusin.bs.modal").on("focusin.bs.modal",n.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},a.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",n.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},a.prototype.resize=function(){this.isShown?n(window).on("resize.bs.modal",n.proxy(this.handleUpdate,this)):n(window).off("resize.bs.modal")},a.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},a.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},a.prototype.backdrop=function(t){var e=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=n.support.transition&&i;if(this.$backdrop=n('<div class="modal-backdrop '+i+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",n.proxy(function(t){t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;o?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var s=function(){e.removeBackdrop(),t&&t()};n.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",s).emulateTransitionEnd(a.BACKDROP_TRANSITION_DURATION):s()}else t&&t()},a.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},a.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},a.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},a.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},a.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},a.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},a.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},a.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var t=n.fn.modal;n.fn.modal=r,n.fn.modal.Constructor=a,n.fn.modal.noConflict=function(){return n.fn.modal=t,this},n(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var e=n(this),i=e.attr("href"),o=n(e.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,"")),s=o.data("bs.modal")?"toggle":n.extend({remote:!/#/.test(i)&&i},o.data(),e.data());e.is("a")&&t.preventDefault(),o.one("show.bs.modal",function(t){t.isDefaultPrevented()||o.one("hidden.bs.modal",function(){e.is(":visible")&&e.trigger("focus")})}),r.call(o,s,this)})}(jQuery),function(v){"use strict";var m=function(t,e){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null,this.init("tooltip",t,e)};m.VERSION="3.3.1",m.TRANSITION_DURATION=150,m.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},m.prototype.init=function(t,e,i){this.enabled=!0,this.type=t,this.$element=v(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&v(this.options.viewport.selector||this.options.viewport);for(var o=this.options.trigger.split(" "),s=o.length;s--;){var n=o[s];if("click"==n)this.$element.on("click."+this.type,this.options.selector,v.proxy(this.toggle,this));else if("manual"!=n){var a="hover"==n?"mouseenter":"focusin",r="hover"==n?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,v.proxy(this.enter,this)),this.$element.on(r+"."+this.type,this.options.selector,v.proxy(this.leave,this))}}this.options.selector?this._options=v.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},m.prototype.getDefaults=function(){return m.DEFAULTS},m.prototype.getOptions=function(t){return(t=v.extend({},this.getDefaults(),this.$element.data(),t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t},m.prototype.getDelegateOptions=function(){var i={},o=this.getDefaults();return this._options&&v.each(this._options,function(t,e){o[t]!=e&&(i[t]=e)}),i},m.prototype.enter=function(t){var e=t instanceof this.constructor?t:v(t.currentTarget).data("bs."+this.type);if(e&&e.$tip&&e.$tip.is(":visible"))e.hoverState="in";else{if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),v(t.currentTarget).data("bs."+this.type,e)),clearTimeout(e.timeout),e.hoverState="in",!e.options.delay||!e.options.delay.show)return e.show();e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)}},m.prototype.leave=function(t){var e=t instanceof this.constructor?t:v(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),v(t.currentTarget).data("bs."+this.type,e)),clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide();e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)},m.prototype.show=function(){var t=v.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var e=v.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!e)return;var i=this,o=this.tip(),s=this.getUID(this.type);this.setContent(),o.attr("id",s),this.$element.attr("aria-describedby",s),this.options.animation&&o.addClass("fade");var n="function"==typeof this.options.placement?this.options.placement.call(this,o[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,r=a.test(n);r&&(n=n.replace(a,"")||"top"),o.detach().css({top:0,left:0,display:"block"}).addClass(n).data("bs."+this.type,this),this.options.container?o.appendTo(this.options.container):o.insertAfter(this.$element);var l=this.getPosition(),h=o[0].offsetWidth,p=o[0].offsetHeight;if(r){var d=n,c=this.options.container?v(this.options.container):this.$element.parent(),f=this.getPosition(c);n="bottom"==n&&l.bottom+p>f.bottom?"top":"top"==n&&l.top-p<f.top?"bottom":"right"==n&&l.right+h>f.width?"left":"left"==n&&l.left-h<f.left?"right":n,o.removeClass(d).addClass(n)}var u=this.getCalculatedOffset(n,l,h,p);this.applyPlacement(u,n);var g=function(){var t=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,"out"==t&&i.leave(i)};v.support.transition&&this.$tip.hasClass("fade")?o.one("bsTransitionEnd",g).emulateTransitionEnd(m.TRANSITION_DURATION):g()}},m.prototype.applyPlacement=function(t,e){var i=this.tip(),o=i[0].offsetWidth,s=i[0].offsetHeight,n=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(n)&&(n=0),isNaN(a)&&(a=0),t.top=t.top+n,t.left=t.left+a,v.offset.setOffset(i[0],v.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),i.addClass("in");var r=i[0].offsetWidth,l=i[0].offsetHeight;"top"==e&&l!=s&&(t.top=t.top+s-l);var h=this.getViewportAdjustedDelta(e,t,r,l);h.left?t.left+=h.left:t.top+=h.top;var p=/top|bottom/.test(e),d=p?2*h.left-o+r:2*h.top-s+l,c=p?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(d,i[0][c],p)},m.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},m.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();t.find(".tooltip-inner")[this.options.html?"html":"text"](e),t.removeClass("fade in top bottom left right")},m.prototype.hide=function(t){var e=this,i=this.tip(),o=v.Event("hide.bs."+this.type);function s(){"in"!=e.hoverState&&i.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),t&&t()}if(this.$element.trigger(o),!o.isDefaultPrevented())return i.removeClass("in"),v.support.transition&&this.$tip.hasClass("fade")?i.one("bsTransitionEnd",s).emulateTransitionEnd(m.TRANSITION_DURATION):s(),this.hoverState=null,this},m.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},m.prototype.hasContent=function(){return this.getTitle()},m.prototype.getPosition=function(t){var e=(t=t||this.$element)[0],i="BODY"==e.tagName,o=e.getBoundingClientRect();null==o.width&&(o=v.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var s=i?{top:0,left:0}:t.offset(),n={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},a=i?{width:v(window).width(),height:v(window).height()}:null;return v.extend({},o,n,a,s)},m.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},m.prototype.getViewportAdjustedDelta=function(t,e,i,o){var s={top:0,left:0};if(!this.$viewport)return s;var n=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-n-a.scroll,l=e.top+n-a.scroll+o;r<a.top?s.top=a.top-r:l>a.top+a.height&&(s.top=a.top+a.height-l)}else{var h=e.left-n,p=e.left+n+i;h<a.left?s.left=a.left-h:p>a.width&&(s.left=a.left+a.width-p)}return s},m.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},m.prototype.getUID=function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},m.prototype.tip=function(){return this.$tip=this.$tip||v(this.options.template)},m.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},m.prototype.enable=function(){this.enabled=!0},m.prototype.disable=function(){this.enabled=!1},m.prototype.toggleEnabled=function(){this.enabled=!this.enabled},m.prototype.toggle=function(t){var e=this;t&&((e=v(t.currentTarget).data("bs."+this.type))||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),v(t.currentTarget).data("bs."+this.type,e))),e.tip().hasClass("in")?e.leave(e):e.enter(e)},m.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type)})};var t=v.fn.tooltip;v.fn.tooltip=function(s){return this.each(function(){var t=v(this),e=t.data("bs.tooltip"),i="object"==typeof s&&s,o=i&&i.selector;(e||"destroy"!=s)&&(o?(e||t.data("bs.tooltip",e={}),e[o]||(e[o]=new m(this,i))):e||t.data("bs.tooltip",e=new m(this,i)),"string"==typeof s&&e[s]())})},v.fn.tooltip.Constructor=m,v.fn.tooltip.noConflict=function(){return v.fn.tooltip=t,this}}(jQuery),function(n){"use strict";var a=function(t,e){this.init("popover",t,e)};if(!n.fn.tooltip)throw new Error("Popover requires tooltip.js");a.VERSION="3.3.1",a.DEFAULTS=n.extend({},n.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),a.prototype=n.extend({},n.fn.tooltip.Constructor.prototype),(a.prototype.constructor=a).prototype.getDefaults=function(){return a.DEFAULTS},a.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();t.find(".popover-title")[this.options.html?"html":"text"](e),t.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof i?"html":"append":"text"](i),t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},a.prototype.hasContent=function(){return this.getTitle()||this.getContent()},a.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},a.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")},a.prototype.tip=function(){return this.$tip||(this.$tip=n(this.options.template)),this.$tip};var t=n.fn.popover;n.fn.popover=function(s){return this.each(function(){var t=n(this),e=t.data("bs.popover"),i="object"==typeof s&&s,o=i&&i.selector;(e||"destroy"!=s)&&(o?(e||t.data("bs.popover",e={}),e[o]||(e[o]=new a(this,i))):e||t.data("bs.popover",e=new a(this,i)),"string"==typeof s&&e[s]())})},n.fn.popover.Constructor=a,n.fn.popover.noConflict=function(){return n.fn.popover=t,this}}(jQuery),function(n){"use strict";function s(t,e){var i=n.proxy(this.process,this);this.$body=n("body"),this.$scrollElement=n(t).is("body")?n(window):n(t),this.options=n.extend({},s.DEFAULTS,e),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",i),this.refresh(),this.process()}function e(o){return this.each(function(){var t=n(this),e=t.data("bs.scrollspy"),i="object"==typeof o&&o;e||t.data("bs.scrollspy",e=new s(this,i)),"string"==typeof o&&e[o]()})}s.VERSION="3.3.1",s.DEFAULTS={offset:10},s.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},s.prototype.refresh=function(){var o="offset",s=0;n.isWindow(this.$scrollElement[0])||(o="position",s=this.$scrollElement.scrollTop()),this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight();var t=this;this.$body.find(this.selector).map(function(){var t=n(this),e=t.data("target")||t.attr("href"),i=/^#./.test(e)&&n(e);return i&&i.length&&i.is(":visible")&&[[i[o]().top+s,e]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},s.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),s=this.offsets,n=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),o<=e)return a!=(t=n[n.length-1])&&this.activate(t);if(a&&e<s[0])return this.activeTarget=null,this.clear();for(t=s.length;t--;)a!=n[t]&&e>=s[t]&&(!s[t+1]||e<=s[t+1])&&this.activate(n[t])},s.prototype.activate=function(t){this.activeTarget=t,this.clear();var e=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',i=n(e).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},s.prototype.clear=function(){n(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var t=n.fn.scrollspy;n.fn.scrollspy=e,n.fn.scrollspy.Constructor=s,n.fn.scrollspy.noConflict=function(){return n.fn.scrollspy=t,this},n(window).on("load.bs.scrollspy.data-api",function(){n('[data-spy="scroll"]').each(function(){var t=n(this);e.call(t,t.data())})})}(jQuery),function(r){"use strict";var a=function(t){this.element=r(t)};function e(i){return this.each(function(){var t=r(this),e=t.data("bs.tab");e||t.data("bs.tab",e=new a(this)),"string"==typeof i&&e[i]()})}a.VERSION="3.3.1",a.TRANSITION_DURATION=150,a.prototype.show=function(){var t=this.element,e=t.closest("ul:not(.dropdown-menu)"),i=t.data("target");if(i||(i=(i=t.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var o=e.find(".active:last a"),s=r.Event("hide.bs.tab",{relatedTarget:t[0]}),n=r.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(s),t.trigger(n),!n.isDefaultPrevented()&&!s.isDefaultPrevented()){var a=r(i);this.activate(t.closest("li"),e),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:t[0]}),t.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},a.prototype.activate=function(t,e,i){var o=e.find("> .active"),s=i&&r.support.transition&&(o.length&&o.hasClass("fade")||!!e.find("> .fade").length);function n(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),s?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu")&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}o.length&&s?o.one("bsTransitionEnd",n).emulateTransitionEnd(a.TRANSITION_DURATION):n(),o.removeClass("in")};var t=r.fn.tab;r.fn.tab=e,r.fn.tab.Constructor=a,r.fn.tab.noConflict=function(){return r.fn.tab=t,this};var i=function(t){t.preventDefault(),e.call(r(this),"show")};r(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery),function(l){"use strict";var h=function(t,e){this.options=l.extend({},h.DEFAULTS,e),this.$target=l(this.options.target).on("scroll.bs.affix.data-api",l.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",l.proxy(this.checkPositionWithEventLoop,this)),this.$element=l(t),this.affixed=this.unpin=this.pinnedOffset=null,this.checkPosition()};function i(o){return this.each(function(){var t=l(this),e=t.data("bs.affix"),i="object"==typeof o&&o;e||t.data("bs.affix",e=new h(this,i)),"string"==typeof o&&e[o]()})}h.VERSION="3.3.1",h.RESET="affix affix-top affix-bottom",h.DEFAULTS={offset:0,target:window},h.prototype.getState=function(t,e,i,o){var s=this.$target.scrollTop(),n=this.$element.offset(),a=this.$target.height();if(null!=i&&"top"==this.affixed)return s<i&&"top";if("bottom"==this.affixed)return null!=i?!(s+this.unpin<=n.top)&&"bottom":!(s+a<=t-o)&&"bottom";var r=null==this.affixed,l=r?s:n.top;return null!=i&&l<=i?"top":null!=o&&t-o<=l+(r?a:e)&&"bottom"},h.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(h.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},h.prototype.checkPositionWithEventLoop=function(){setTimeout(l.proxy(this.checkPosition,this),1)},h.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=this.$element.height(),e=this.options.offset,i=e.top,o=e.bottom,s=l("body").height();"object"!=typeof e&&(o=i=e),"function"==typeof i&&(i=e.top(this.$element)),"function"==typeof o&&(o=e.bottom(this.$element));var n=this.getState(s,t,i,o);if(this.affixed!=n){null!=this.unpin&&this.$element.css("top","");var a="affix"+(n?"-"+n:""),r=l.Event(a+".bs.affix");if(this.$element.trigger(r),r.isDefaultPrevented())return;this.affixed=n,this.unpin="bottom"==n?this.getPinnedOffset():null,this.$element.removeClass(h.RESET).addClass(a).trigger(a.replace("affix","affixed")+".bs.affix")}"bottom"==n&&this.$element.offset({top:s-t-o})}};var t=l.fn.affix;l.fn.affix=i,l.fn.affix.Constructor=h,l.fn.affix.noConflict=function(){return l.fn.affix=t,this},l(window).on("load",function(){l('[data-spy="affix"]').each(function(){var t=l(this),e=t.data();e.offset=e.offset||{},null!=e.offsetBottom&&(e.offset.bottom=e.offsetBottom),null!=e.offsetTop&&(e.offset.top=e.offsetTop),i.call(t,e)})})}(jQuery);