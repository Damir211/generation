"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function (a) {
  "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? require("jquery") : jQuery);
}(function (a) {
  var b,
      c = navigator.userAgent,
      d = /iphone/i.test(c),
      e = /chrome/i.test(c),
      f = /android/i.test(c);
  a.mask = {
    definitions: {
      9: "[0-9]",
      a: "[A-Za-z]",
      "*": "[A-Za-z0-9]"
    },
    autoclear: !0,
    dataName: "rawMaskFn",
    placeholder: "_"
  }, a.fn.extend({
    caret: function caret(a, b) {
      var c;
      if (0 !== this.length && !this.is(":hidden")) return "number" == typeof a ? (b = "number" == typeof b ? b : a, this.each(function () {
        this.setSelectionRange ? this.setSelectionRange(a, b) : this.createTextRange && (c = this.createTextRange(), c.collapse(!0), c.moveEnd("character", b), c.moveStart("character", a), c.select());
      })) : (this[0].setSelectionRange ? (a = this[0].selectionStart, b = this[0].selectionEnd) : document.selection && document.selection.createRange && (c = document.selection.createRange(), a = 0 - c.duplicate().moveStart("character", -1e5), b = a + c.text.length), {
        begin: a,
        end: b
      });
    },
    unmask: function unmask() {
      return this.trigger("unmask");
    },
    mask: function mask(c, g) {
      var h, i, j, k, l, m, n, o;

      if (!c && this.length > 0) {
        h = a(this[0]);
        var p = h.data(a.mask.dataName);
        return p ? p() : void 0;
      }

      return g = a.extend({
        autoclear: a.mask.autoclear,
        placeholder: a.mask.placeholder,
        completed: null
      }, g), i = a.mask.definitions, j = [], k = n = c.length, l = null, a.each(c.split(""), function (a, b) {
        "?" == b ? (n--, k = a) : i[b] ? (j.push(new RegExp(i[b])), null === l && (l = j.length - 1), k > a && (m = j.length - 1)) : j.push(null);
      }), this.trigger("unmask").each(function () {
        function h() {
          if (g.completed) {
            for (var a = l; m >= a; a++) {
              if (j[a] && C[a] === p(a)) return;
            }

            g.completed.call(B);
          }
        }

        function p(a) {
          return g.placeholder.charAt(a < g.placeholder.length ? a : 0);
        }

        function q(a) {
          for (; ++a < n && !j[a];) {
            ;
          }

          return a;
        }

        function r(a) {
          for (; --a >= 0 && !j[a];) {
            ;
          }

          return a;
        }

        function s(a, b) {
          var c, d;

          if (!(0 > a)) {
            for (c = a, d = q(b); n > c; c++) {
              if (j[c]) {
                if (!(n > d && j[c].test(C[d]))) break;
                C[c] = C[d], C[d] = p(d), d = q(d);
              }
            }

            z(), B.caret(Math.max(l, a));
          }
        }

        function t(a) {
          var b, c, d, e;

          for (b = a, c = p(a); n > b; b++) {
            if (j[b]) {
              if (d = q(b), e = C[b], C[b] = c, !(n > d && j[d].test(e))) break;
              c = e;
            }
          }
        }

        function u() {
          var a = B.val(),
              b = B.caret();

          if (o && o.length && o.length > a.length) {
            for (A(!0); b.begin > 0 && !j[b.begin - 1];) {
              b.begin--;
            }

            if (0 === b.begin) for (; b.begin < l && !j[b.begin];) {
              b.begin++;
            }
            B.caret(b.begin, b.begin);
          } else {
            for (A(!0); b.begin < n && !j[b.begin];) {
              b.begin++;
            }

            B.caret(b.begin, b.begin);
          }

          h();
        }

        function v() {
          A(), B.val() != E && B.change();
        }

        function w(a) {
          if (!B.prop("readonly")) {
            var b,
                c,
                e,
                f = a.which || a.keyCode;
            o = B.val(), 8 === f || 46 === f || d && 127 === f ? (b = B.caret(), c = b.begin, e = b.end, e - c === 0 && (c = 46 !== f ? r(c) : e = q(c - 1), e = 46 === f ? q(e) : e), y(c, e), s(c, e - 1), a.preventDefault()) : 13 === f ? v.call(this, a) : 27 === f && (B.val(E), B.caret(0, A()), a.preventDefault());
          }
        }

        function x(b) {
          if (!B.prop("readonly")) {
            var c,
                d,
                e,
                g = b.which || b.keyCode,
                i = B.caret();

            if (!(b.ctrlKey || b.altKey || b.metaKey || 32 > g) && g && 13 !== g) {
              if (i.end - i.begin !== 0 && (y(i.begin, i.end), s(i.begin, i.end - 1)), c = q(i.begin - 1), n > c && (d = String.fromCharCode(g), j[c].test(d))) {
                if (t(c), C[c] = d, z(), e = q(c), f) {
                  var k = function k() {
                    a.proxy(a.fn.caret, B, e)();
                  };

                  setTimeout(k, 0);
                } else B.caret(e);

                i.begin <= m && h();
              }

              b.preventDefault();
            }
          }
        }

        function y(a, b) {
          var c;

          for (c = a; b > c && n > c; c++) {
            j[c] && (C[c] = p(c));
          }
        }

        function z() {
          B.val(C.join(""));
        }

        function A(a) {
          var b,
              c,
              d,
              e = B.val(),
              f = -1;

          for (b = 0, d = 0; n > b; b++) {
            if (j[b]) {
              for (C[b] = p(b); d++ < e.length;) {
                if (c = e.charAt(d - 1), j[b].test(c)) {
                  C[b] = c, f = b;
                  break;
                }
              }

              if (d > e.length) {
                y(b + 1, n);
                break;
              }
            } else C[b] === e.charAt(d) && d++, k > b && (f = b);
          }

          return a ? z() : k > f + 1 ? g.autoclear || C.join("") === D ? (B.val() && B.val(""), y(0, n)) : z() : (z(), B.val(B.val().substring(0, f + 1))), k ? b : l;
        }

        var B = a(this),
            C = a.map(c.split(""), function (a, b) {
          return "?" != a ? i[a] ? p(b) : a : void 0;
        }),
            D = C.join(""),
            E = B.val();
        B.data(a.mask.dataName, function () {
          return a.map(C, function (a, b) {
            return j[b] && a != p(b) ? a : null;
          }).join("");
        }), B.one("unmask", function () {
          B.off(".mask").removeData(a.mask.dataName);
        }).on("focus.mask", function () {
          if (!B.prop("readonly")) {
            clearTimeout(b);
            var a;
            E = B.val(), a = A(), b = setTimeout(function () {
              B.get(0) === document.activeElement && (z(), a == c.replace("?", "").length ? B.caret(0, a) : B.caret(a));
            }, 10);
          }
        }).on("blur.mask", v).on("keydown.mask", w).on("keypress.mask", x).on("input.mask paste.mask", function () {
          B.prop("readonly") || setTimeout(function () {
            var a = A(!0);
            B.caret(a), h();
          }, 0);
        }), e && f && B.off("input.mask").on("input.mask", u), A();
      });
    }
  });
});
"use strict";

//global functions
var setBackgroundImage = function setBackgroundImage() {
  $('.set-bg-img').each(function () {
    if ($(this).find('.get-bg-img').is('.get-bg-img')) {
      var src = $(this).find('.get-bg-img').attr('src');
      $(this).css('background-image', 'url(' + src + ')');
    }

    ;
  });
};

$(function () {
  $('body .nav__link-link > a').on('click', function (e) {
    if (window.innerWidth <= 1000) {
      if (!$(this).is('.open')) {
        e.preventDefault();
        $(this).siblings('.nav__link-inner').slideDown();
        $(this).addClass('open');
      }
    }
  });

  if (window.innerWidth >= 1001) {
    $('.nav__link').each(function () {
      var left = $(this).offset().left;
      var right = window.innerWidth - ($(this).offset().left + $(this).innerWidth());

      if (left > right) {
        $(this).find('.nav__link-inner').addClass('left');
      }
    });
  }

  $('body').on('click', '[data-scroll-to]', function (e) {
    e.preventDefault();
    var elementClick = $(this).data("scroll-to");
    var destination = $(elementClick).offset().top;
    $('body, html').animate({
      scrollTop: destination
    }, 800);
  });
  $('body').on('mousedown', '.popup__close', function () {
    $('.popups__overlay').removeClass('active');
    $('.popup').removeClass('active');
    $('body').removeClass('hidden');
    $('body').removeAttr('style');
    $('.popups').removeAttr('style');
    $('.popups').removeClass('active');
  });
  $('body').on('click', '[data-popup-open]', function (e) {
    e.preventDefault();
    var popupName = $(this).data('popup-open');

    if (popupName === "popup__teacher") {
      var img = $(this).data('teacher-img');
      var name = $(this).data('teacher-name');
      var text = $(this).data('teacher-text');
      $('.popup__teacher-name').html(name);
      $('.popup__teacher .popup__img').css('background-image', 'url("' + img + '")');
      $('.popup__teacher .popup__img img').attr('src', img);
      $('.popup__teacher-text').html(text);
    }

    var widthBody = $('body').width();
    $('body').css('maxWidth', widthBody + 'px');
    $('.popup').removeClass('active');
    $('.' + popupName).addClass('active');
    $('.popups__overlay').addClass('active');
    $('body').addClass('hidden');
    $('.popups').css('overflow-y', 'scroll');
    $('.popups').addClass('active');
  });
  $('body').on('click', '.menu_button', function (e) {
    e.preventDefault();
    var widthBody = $('body').width();
    $('body').css('maxWidth', widthBody + 'px');
    $('body').addClass('hidden');
    $('nav').addClass('active');
  });
  $('body').on('click', '.nav__close', function () {
    $('body').removeClass('hidden');
    $('body').removeAttr('style');
    $('nav').removeClass('active');
  });
  setBackgroundImage();

  if ($('.resume__file').is('.resume__file')) {
    var oldText = $('.resume__file').find('.resume__file-text').text();
    $('.resume__file input').on('change', function () {
      var file_name = this.value.replace(/\\/g, '/').replace(/.*\//, '');

      if (file_name === "") {
        $(this).siblings('.resume__file-text').text(oldText);
      } else {
        $(this).siblings('.resume__file-text').text(file_name);
      }
    });
  }

  $('.tel-mask').mask('+7 (999) 999-99-99');
  $('body').on('click', '.tel-mask', function () {
    if ($(this).val() === '+7 (___) ___-__-__') {
      $(this).get(0).setSelectionRange(4, 4);
    }
  });
  $('.special__slider').each(function () {
    var left = $(this).siblings('.special__head').find('.special__left');
    var right = $(this).siblings('.special__head').find('.special__right');
    var mySwiper = new Swiper($(this), {
      slidesPerView: 2,
      spaceBetween: 50,
      navigation: {
        nextEl: right,
        prevEl: left
      },
      breakpoints: {
        // when window width is >= 320px
        1001: {
          slidesPerView: 2
        },
        320: {
          slidesPerView: 1
        }
      }
    });
  });
  $('.imgslider__container').each(function () {
    var left = $(this).siblings('.imgslider__head').find('.imgslider__left');
    var right = $(this).siblings('.imgslider__head').find('.imgslider__right');
    var mySwiper = new Swiper($(this), {
      spaceBetween: 10,
      navigation: {
        nextEl: right,
        prevEl: left
      },
      breakpoints: {
        // when window width is >= 320px
        1001: {
          slidesPerView: 5
        },
        320: {
          slidesPerView: 2
        }
      }
    });
  });
  $('.reviews__container').each(function () {
    var left = $(this).siblings('.reviews__head').find('.reviews__left');
    var right = $(this).siblings('.reviews__head').find('.reviews__right');
    var mySwiper = new Swiper($(this), {
      slidesPerView: 2,
      slidesPerColumn: 2,
      slidesPerColumnFill: 'row',
      navigation: {
        nextEl: right,
        prevEl: left
      },
      breakpoints: {
        // when window width is >= 320px
        1001: {
          slidesPerView: 2,
          spaceBetween: 40
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 20
        }
      }
    });
  });
  $('.proffesionals__container').each(function () {
    var left = $(this).siblings('.proffesionals__head').find('.proffesionals__left');
    var right = $(this).siblings('.proffesionals__head').find('.proffesionals__right');
    var mySwiper = new Swiper($(this), {
      slidesPerView: 1,
      spaceBetween: 40,
      navigation: {
        nextEl: right,
        prevEl: left
      }
    });
  });
  $('body').on('click', '.nav__link-header', function () {
    $('.nav__link-header').css('pointer-events', 'none');
    var element = $(this);

    if ($(this).is('.active')) {
      $(this).siblings('.nav__link-container').slideUp(500, function () {
        element.removeClass('active');
        $('.nav__link-header').css('pointer-events', 'auto');
      });
    } else {
      var mainelement = $(this);
      var isOneOpen = false;
      $('.nav__link-header').each(function () {
        if ($(this).is('.active')) {
          var element = $(this);
          isOneOpen = true;
          $(this).siblings('.nav__link-container').slideUp(500, function () {
            element.removeClass('active');
            mainelement.addClass('active');
            mainelement.siblings('.nav__link-container').slideDown(500);
            $('.nav__link-header').css('pointer-events', 'auto');
          });
        }
      });

      if (!isOneOpen) {
        mainelement.addClass('active');
        mainelement.siblings('.nav__link-container').slideDown(500);
        $('.nav__link-header').css('pointer-events', 'auto');
      }
    }
  });

  if ($('#map').is('#map')) {
    var icon_url = $('#map').data('icon');
    var init_lat = +$('#map').data('init-lat');
    var init_lng = +$('#map').data('init-lng');
    var init_zoom = +$('#map').data('init-zoom');
    var map, myIcon, icons_coor;
    DG.then(function () {
      map = DG.map('map', {
        center: [init_lat, init_lng],
        zoom: init_zoom,
        zoomControl: false,
        fullscreenControl: false,
        scrollWheelZoom: false
      });
      myIcon = DG.icon({
        iconUrl: icon_url,
        iconSize: [47, 61],
        iconAnchor: [24, 61]
      });

      if ($('.map__link').is('.map__link')) {
        $('.map__link').each(function (index) {
          var element = $(this);
          var marker = DG.marker([+$(this).data('lat'), +$(this).data('lng')], {
            icon: myIcon
          }).addTo(map);
          marker.on('click', function () {
            element.click();
          });
          $(this).on('click', function () {
            map.setView([+$(this).data('lat'), +$(this).data('lng')], 17);
            $(this).addClass('active');
            $(this).siblings('.map__link').removeClass('active');

            if (window.innerWidth < 471) {
              var destination = $('#map').offset().top;
              $('body, html').animate({
                scrollTop: destination
              }, 400);
            }
          });
        });
      }
    });
    $('body').on('click', '.zoom__add', function () {
      map.zoomIn();
    });
    $('body').on('click', '.zoom__deny', function () {
      map.zoomOut();
    });
  }
});