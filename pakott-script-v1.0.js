/*-- ! PakOTT Scripts - v1.0 ! --*/
$("#main-menu").mainMenu().find(".widget").addClass("show-menu");
$("#main-search-wrap").each(function () {
  var $this = $(this);
  $(".show-search").click(function () {
    $("body").addClass("search-active"),
      $this.fadeIn(170).find("input").focus();
  });
  $(".search-close").click(function () {
    $("body").removeClass("search-active"),
      $this.fadeOut(170).find("input").blur().val("");
  });
});
$("html").each(function () {
  var $this = $(this);
  if (window.localStorage.themeColor === "dark") {
    $this.addClass("dark-mode");
  }
  $(".darkmode-toggle").on("click", function () {
    if (window.localStorage.themeColor != "dark") {
      $this.addClass("dark-mode");
      window.localStorage.themeColor = "dark";
    } else {
      $this.removeClass("dark-mode");
      window.localStorage.themeColor = "light";
    }
  });
});
$(function () {
  $(".entry-thumbnail .thumbnail,.entry-avatar .author-avatar").lazyLoader();
  $(".mobile-logo").each(function () {
    var $this = $(this),
      $logo = $(".main-logo a").clone();
    $logo.find("h1").remove(), $logo.appendTo($this);
  });
  $("#mobile-menu").each(function () {
    var $this = $(this),
      $nav = $(".main-nav").clone();
    $nav.attr("class", "mobile-nav").attr("id", "mobile-nav");
    $nav
      .find(".has-sub > a")
      .after('<button class="submenu-toggle" aria-label="expand"/>');
    $nav.appendTo($this);
    $(".mobile-menu-toggle, .hide-mobile-menu, .overlay").click(function () {
      $("body").toggleClass("nav-active");
    });
    $(".mobile-menu .submenu-toggle").click(function () {
      var $this = $(this);
      $this.parent().hasClass("expanded")
        ? $this
            .parent()
            .removeClass("expanded")
            .children(".sub-menu")
            .slideToggle(170)
        : $this
            .parent()
            .addClass("expanded")
            .children(".sub-menu")
            .slideToggle(170);
    });
  });
  $(".header-inner").each(function () {
    var $this = $(this);
    if ($this.length > 0) {
      var t = $(document).scrollTop(),
        w = $this.offset().top,
        s = $this.height(),
        h = w + s + s;
      $(window).scroll(function () {
        var n = $(document).scrollTop();
        if (n > h) {
          $this.addClass("is-fixed");
        } else if (n < w || n <= 1) {
          $this.removeClass("is-fixed");
        }
        if (n < t) {
          setTimeout(function () {
            $this.addClass("show");
          }, 170);
        } else {
          $this.removeClass("show");
        }
        t = $(document).scrollTop();
      });
    }
  });
  $(".Label a, a.b-label").attr("href", function ($this, href) {
    return href.replace(
      href,
      href + "?&max-results=" + themeSettings.postPerPage
    );
  });
  $(".avatar-image-container img").attr("src", function ($this, i) {
    i = i.replace("/s35-c/", "/s39-c/");
    i = i.replace(
      "//resources.blogblog.com/img/blank.gif",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEixGOZw4g22J9YAaJAY7pE6TPHa2z2hWMpNDg1iBn1DHhPt4LaN2CXj9e70a8DKi5vsh-KkE_Z0ymVkn0EY6VpxUXmPX5wlX6QnLpF8zeqAjMLoT8LLhmpR-k1B39XkNG0aevn9_Np3kKw/s39/avatar.jpg"
    );
    return i;
  });
  $("time.published").timeago();
  $(".post-body .hcl").remove();
  $(".hide-thumbnail .post-body").each(function () {
    if (themeSettings.postFirstImage === "hide") {
      $(this).find("img:first").remove(), $(this).find("img").show();
    } else {
      $(this).find("img").show();
    }
  });
  $(".post-body b").each(function () {
    var $this = $(this),
      $type = $this.text().trim();
    if ($type.match("{contactform}")) {
      $this.replaceWith('<div class="contact-form"/>');
      $(".contact-form").append($("#ContactForm1"));
    }
    if ($type.match("{leftsidebar}")) {
      $("body").addClass("is-left");
      $this.remove();
    }
    if ($type.match("{fullwidth}")) {
      $("body").addClass("no-sidebar");
      $this.remove();
    }
    if (
      $type.match("{quality}") ||
      $type.match("{type}") ||
      $type.match("{file}") ||
      $type.match("{year}") ||
      $type.match("{runtime}") ||
      $type.match("{episode}") ||
      $type.match("{rating}") ||
      $type.match("{cc}") ||
      $type.match("{completed}") ||
      $type.match("{urdub}") ||
      $type.match("{ongoing}") ||
      $type.match("{engdub}") ||
      $type.match("{upcoming}")
    ) {
      $this.remove();
    }
  });
  $("#new-before-ad").each(function () {
    var $t = $(this);
    if ($t.length) {
      $("#before-ad").appendTo($t);
    }
  });
  $("#new-after-ad").each(function () {
    var $t = $(this);
    if ($t.length) {
      $("#after-ad").appendTo($t);
    }
  });
  $("#main-before-ad .widget").each(function () {
    var $t = $(this);
    if ($t.length) {
      $t.appendTo($("#before-ad"));
    }
  });
  $("#main-after-ad .widget").each(function () {
    var $t = $(this);
    if ($t.length) {
      $t.appendTo($("#after-ad"));
    }
  });
  $(".grids .post,.FeaturedPost .post,.PopularPosts .post").each(function () {
    var e = $(this),
      i = e.data("id");
    $.ajax({
      url: "/feeds/posts/default/" + i + "?alt=json",
      type: "get",
      dataType: "jsonp",
      success: function (i) {
        var n = i.entry.content.$t,
          a = $("<div>").html(n),
          t = a.find('b:contains("{quality}=")'),
          s = a.find('b:contains("{type}=")'),
          l = a.find('b:contains("{file}=")'),
          d = a.find('b:contains("{year}=")'),
          p = a.find('b:contains("{runtime}=")'),
          o = a.find('b:contains("{episode}=")'),
          r = a.find('b:contains("{rating}=")'),
          b = a.find('b:contains("{cc}")'),
          f = a.find('b:contains("{completed}")'),
          k = a.find('b:contains("{engdub}")'),
          c = a.find('b:contains("{urdub}")'),
          g = a.find('b:contains("{ongoing}")'),
          h = a.find('b:contains("{upcoming}")');
        if (t.length > 0) {
          var u = t.text().split("=")[1];
          e.find(".badge-top").replaceWith(
            '<span class="quality">' + u + "</span>"
          );
        } else if (s.length > 0) {
          var v = s.text().split("=")[1];
          e.find(".badge-top").replaceWith(
            '<span class="type">' + v + "</span>"
          );
        } else e.find(".badge-top").remove();
        if (l.length > 0) {
          var m = l.text().split("=")[1];
          "dub" === m
            ? e
                .find(".badge-left")
                .replaceWith('<span class="file dub">Dub</span>')
            : "sub" === m
            ? e
                .find(".badge-left")
                .replaceWith('<span class="file sub">Sub</span>')
            : "raw" === m
            ? e
                .find(".badge-left")
                .replaceWith('<span class="file raw">Raw</span>')
            : e.find(".badge-left").remove();
        } else if (d.length > 0) {
          var x = d.text().split("=")[1];
          e.find(".badge-left").replaceWith(
            '<span class="release">' + parseInt(x) + "</span>"
          );
        } else e.find(".badge-left").remove();
        if (p.length > 0) {
          var W = p.text().split("=")[1];
          e.find(".badge-right").replaceWith(
            '<span class="runtime">' + W + "</span>"
          );
        } else if (o.length > 0) {
          var y = o.text().split("=")[1];
          e.find(".badge-right").replaceWith(
            '<span class="episode">' + y + "</span>"
          );
        } else if (r.length > 0) {
          var C = r.text().split("=")[1];
          e.find(".badge-right").replaceWith(
            '<span class="rating">' + parseFloat(C) + "<sub> / 10</sub></span>"
          );
        } else e.find(".badge-right").remove();
        b.length > 0
          ? e
              .find(".ribbon")
              .replaceWith('<span class="closed-caption"></span>')
          : f.length > 0
          ? e.find(".ribbon").text("COMPLETED").addClass("completed is-visible")
          : c.length > 0
          ? e.find(".ribbon").text("URDU").addClass("urdub is-visible")
          : k.length > 0
          ? e.find(".ribbon").text("ENGLISH").addClass("engdub is-visible")
          : g.length > 0
          ? e.find(".ribbon").text("ONGOING").addClass("ongoing is-visible")
          : h.length > 0
          ? e.find(".ribbon").text("UPCOMING").addClass("upcoming is-visible")
          : e.find(".ribbon").remove();
      },
    });
  });
  $(
    "#player-one,#player-two,#playlist-one,#playlist-two,#playlist-three,#playlist-four,#playlist-five,#playlist-six"
  ).each(function () {
    let s = $(this),
      i = 0,
      l = "";
    const e = (s) =>
      !0 === themeSettings.videoPlayer.okDotRuBlogspot
        ? "https://vdoview.tumblr.com/?id="
        : "//ok.ru/videoembed/";
    qs("#player-one")
      ? ((l +=
          '<div class="player-container"><div class="video-container">' +
          isVideoLoading()),
        (l +=
          '<div class="player-poster"><img src="' +
          playerVariables.posterCover +
          '"/></div>'),
        !0 === themeSettings.videoAdvertise.showAds
          ? ((l += '<span class="countdown-timer"></span>'),
            (l +=
              '<video class="video-ads" width="100%" height="100%" autoplay playsinline webkit-playsinline>'),
            (l += '<source src="" type="video/mp4">'),
            (l += "</video>"),
            (l +=
              '<iframe id="iframe-video" src="" width="100%" height="100%" allowfullscreen="true" loading="lazy"></iframe></div>'))
          : (l +=
              '<iframe id="iframe-video" src="" width="100%" height="100%" allowfullscreen="true" loading="lazy"></iframe></div>'),
        (l +=
          '<div class="player-control"><span class="player-title">Title: ' +
          playerVariables.playlistTitle +
          '</span><button class="control-video" aria-label="Control Video"><span class="control-text is-play">Play</span></button></div></div>'),
        s.html(l))
      : qs("#player-two")
      ? ((l += '<div class="player-container"><div class="video-container">'),
        (l += '<div class="play-video"></div>'),
        (l +=
          '<div class="movie-cover"><img src="' +
          playerVariables.posterCover +
          '"/></div>'),
        !0 === themeSettings.videoAdvertise.showAds
          ? ((l += '<span class="countdown-timer"></span>'),
            (l +=
              '<video class="video-ads" width="100%" height="100%" autoplay playsinline webkit-playsinline>'))
          : (l +=
              '<video class="player-video" width="100%" height="100%" autoplay playsinline webkit-playsinline>'),
        (l += '<source src="" type="video/mp4">'),
        (l += "</video></div>"),
        s.html(l))
      : ((l += '<div class="playlist-container"><div class="video-container">'),
        qs("#playlist-one") ||
        qs("#playlist-two") ||
        qs("#playlist-three") ||
        qs("#playlist-four") ||
        qs("#playlist-six")
          ? ((l += isVideoLoading()),
            (l += '<iframe id="iframe-video" src="'),
            qs("#playlist-six")
              ? !0 === themeSettings.videoPlayer.convertLink
                ? (l += e() + atobString(playlists[i].src))
                : (l += e() + playlists[i].src)
              : !0 === themeSettings.videoPlayer.convertLink
              ? (l += atobString(playlists[i].src))
              : (l += playlists[i].src),
            (l +=
              '" width="100%" height="100%" allowfullscreen="true" loading="lazy"></iframe></div>'))
          : ((l +=
              '<video id="playlist-video" width="100%" height="100%" controls autoplay playsinline webkit-playsinline>'),
            (l += '<source src="'),
            !0 === themeSettings.videoPlayer.convertLink
              ? (l += atobString(playlists[i].src))
              : (l += playlists[i].src),
            (l += '" type="video/mp4">'),
            (l += "</video></div>")),
        qs("#playlist-one") ||
        qs("#playlist-two") ||
        qs("#playlist-three") ||
        qs("#playlist-five") ||
        qs("#playlist-six")
          ? (l += '<div class="playlist-wrap">')
          : (l += ""),
        qs("#playlist-one")
          ? ((l += '<div class="playlist-one">'),
            playlists.forEach((s, i) => {
              l +=
                '<div class="playlist item-' +
                (i + 1) +
                '" data-episode="' +
                (i + 1) +
                '"><span class="episode-num"></span></div>';
            }))
          : qs("#playlist-two")
          ? ((l += '<div class="playlist-two">'),
            playlists.forEach((s, i) => {
              (l +=
                '<div class="playlist item-' +
                (i + 1) +
                '" data-episode="' +
                (i + 1) +
                '">'),
                (l += '<div class="playlist-inner">'),
                (l +=
                  '<div class="playlist-poster"><img src="' +
                  playerVariables.posterCover +
                  '"/></div>'),
                (l += '<div class="playlist-info">'),
                (l +=
                  '<h2 class="playlist-title">' +
                  playerVariables.playlistTitle +
                  "</h2>"),
                (l += '<h3 class="count-episode">'),
                i === playlists.length - 1 && "end" === playlists[i].status
                  ? (l += playlists.length + " - End")
                  : (l += playlists.length),
                (l += "</h3></div></div></div>");
            }))
          : qs("#playlist-three")
          ? ((l += '<div class="playlist-three">'),
            playlists.forEach((s, i) => {
              (l +=
                '<div class="playlist item-' +
                (i + 1) +
                '" data-episode="' +
                (i + 1) +
                '">'),
                (l += '<div class="playlist-inner">'),
                (l += '<div class="playlist-poster">'),
                (l += '<img src="' + playerVariables.posterCover + '"/>'),
                (l += '<span class="entry-icon"></span>'),
                (l += "</div>"),
                (l += '<div class="playlist-info">'),
                !0 === themeSettings.videoPlayer.playlistIcon
                  ? ((l += '<i class="playlist-icon '),
                    playlists[i].src.includes("www.youtube.com") ||
                    playlists[i].src.includes(isVideoUrl("youtube"))
                      ? (l += 'fa-brands fa-youtube" style="color:#ff0000')
                      : playlists[i].src.includes("www.facebook.com") ||
                        playlists[i].src.includes(isVideoUrl("facebook"))
                      ? (l += 'fa-brands fa-facebook" style="color:#1877f2')
                      : playlists[i].src.includes("drive.google.com") ||
                        playlists[i].src.includes(isVideoUrl("gdrive"))
                      ? (l += 'fa-brands fa-google-drive" style="color:#34a853')
                      : playlists[i].src.includes("www.dailymotion.com") ||
                        playlists[i].src.includes(isVideoUrl("dailymotion"))
                      ? (l += 'fa-brands fa-dailymotion" style="color:#00aaff')
                      : playlists[i].src.includes("player.vimeo.com") ||
                        playlists[i].src.includes(isVideoUrl("vimeo"))
                      ? (l += 'fa-brands fa-vimeo" style="color:#1ab7ea')
                      : playlists[i].src.includes("vk.com") ||
                        playlists[i].src.includes(isVideoUrl("vk"))
                      ? (l += 'fa-brands fa-vk" style="color:#304ffe')
                      : playlists[i].src.includes("ok.ru") ||
                        playlists[i].src.includes("vdoview.tumblr.com") ||
                        playlists[i].src.includes(isVideoUrl("ok")) ||
                        playlists[i].src.includes(isVideoUrl("vdoview"))
                      ? (l +=
                          'fa-brands fa-odnoklassniki" style="color:#ed812b')
                      : (l += 'fa-solid fa-film"'),
                    (l += '"></i>'))
                  : (l += ""),
                (l +=
                  '<h2 class="playlist-title">' +
                  playerVariables.playlistTitle +
                  "</h2>"),
                i === playlists.length - 1 && "end" === playlists[i].status
                  ? (l += '<span class="end-badge">End</span>')
                  : (l += ""),
                (l += "</div></div></div>");
            }))
          : qs("#playlist-four")
          ? ((l +=
              '<div class="current-episode"><span class="current-text">Episode: 1 / ' +
              playlists.length +
              " - " +
              playerVariables.playlistTitle +
              "</span></div>"),
            (l += '<div class="episode-container">'),
            (l += '<div class="playlist-four">'),
            playlists.forEach((s, i) => {
              (l +=
                '<div class="playlist item-' +
                (i + 1) +
                '" data-episode="' +
                (i + 1) +
                '">'),
                (l +=
                  '<h2 class="playlist-title">Episode: ' +
                  (i + 1) +
                  " / " +
                  playlists.length +
                  " - " +
                  playerVariables.playlistTitle +
                  "</h2>"),
                (l += "</div>");
            }),
            (l += "</div>"))
          : qs("#playlist-five")
          ? ((l += '<div class="playlist-five">'),
            playlists.forEach((s, i) => {
              l +=
                '<div class="playlist item-' +
                (i + 1) +
                '" data-episode="' +
                (i + 1) +
                '"><span class="episode-num"></span></div>';
            }))
          : qs("#playlist-six") &&
            ((l += '<div class="playlist-six">'),
            playlists.forEach((s, i) => {
              (l += '<div class="playlist item-' + (i + 1) + '" data-id="'),
                !0 === themeSettings.videoPlayer.convertLink
                  ? (l += atobString(playlists[i].src))
                  : (l += playlists[i].src),
                (l += '"><span class="episode-num"></span></div>');
            })),
        qs("#playlist-four")
          ? (l += "</div>")
          : ((l += '</div></div><div class="playlist-control">'),
            (l +=
              '<button id="scroll-up" aria-label="Go Top"><i class="fa-solid fa-angles-up"></i><span class="up-text">Scroll Up</span></button>'),
            (l +=
              '<button id="previous-episode" aria-label="Previous Episode"><i class="fa-solid fa-backward-step"></i><span class="prev-text">Prev</span></button>'),
            (l +=
              '<button id="episode-counter" aria-label="Total Episode">' +
              (i + 1) +
              " / " +
              playlists.length +
              "</button>"),
            (l +=
              '<button id="next-episode" aria-label="Next Episode"><span class="next-text">Next</span><i class="fa-solid fa-forward-step"></i></button>'),
            (l +=
              '<button id="scroll-down" aria-label="Go Bottom"><span class="down-text">Scroll Down</span><i class="fa-solid fa-angles-down"></i></button>'),
            (l += "</div></div>"))),
      s.html(l),
      $(".playlist").first().addClass("is-active"),
      $(".playlist").each(function (s) {
        $(this).on("click", function () {
          i = s;
          let l = $(this),
            t = l.text(),
            a = l.index(".playlist"),
            r =
              !0 === themeSettings.videoPlayer.convertLink
                ? atobString(playlists[a].src)
                : playlists[a].src;
          qs("#playlist-four")
            ? ($(".current-episode").removeClass("open"),
              $(".current-text").text(t),
              $(".episode-container").slideUp(400),
              loadAutoScroll("#playlist-four", 90))
            : qs("#playlist-five") &&
              ($("#playlist-video").attr("src", r),
              $("#playlist-video").trigger("play")),
            qs("#playlist-six")
              ? $("iframe#iframe-video").attr(
                  "src",
                  e() +
                    l.data("id") +
                    ((s) =>
                      !0 !== themeSettings.videoPlayer.okDotRuBlogspot
                        ? "?autoplay=1"
                        : "")()
                )
              : $("iframe#iframe-video").attr("src", r),
            $("#episode-counter").text(i + 1 + " / " + playlists.length),
            $(".playlist")
              .eq(i)
              .addClass("is-active")
              .siblings()
              .removeClass("is-active"),
            o().show(),
            $(".playlist-wrap").autoScrollTo(".playlist.is-active");
        });
      }),
      $("#scroll-up").on("click", function () {
        $(".playlist-wrap").autoScrollTo(".playlist:first", 400);
      }),
      $("#previous-episode").on("click", function () {
        0 === i ? (i = playlists.length - 1) : i--,
          $(".playlist").eq(i).trigger("click");
      }),
      $("#next-episode").on("click", function () {
        i === playlists.length - 1 ? (i = 0) : i++,
          $(".playlist").eq(i).trigger("click");
      }),
      $("#scroll-down").on("click", function () {
        $(".playlist-wrap").autoScrollTo(".playlist:last", 400);
      }),
      $(".control-video").on("click", function () {
        let s = $(this),
          i =
            !0 === themeSettings.videoPlayer.convertLink
              ? atobString(movie.src)
              : movie.src;
        s.toggleClass("is-playing"),
          s.hasClass("is-playing")
            ? (!0 === themeSettings.videoAdvertise.showAds
                ? t()
                : $("iframe#iframe-video").attr("src", i),
              $(".control-text")
                .text("Stop")
                .addClass("is-stop")
                .removeClass("is-play"),
              $(".player-poster").addClass("is-hidden"))
            : ($(".video-ads,iframe#iframe-video").attr("src", ""),
              $(".control-text")
                .text("Play")
                .addClass("is-play")
                .removeClass("is-stop"),
              $(".player-poster").removeClass("is-hidden"),
              $(".countdown-timer").removeClass("show")),
          o().show();
      }),
      $(".play-video").on("click", function () {
        let s = $(this),
          i =
            !0 === themeSettings.videoPlayer.convertLink
              ? atobString(movie.src)
              : movie.src;
        !0 === themeSettings.videoAdvertise.showAds
          ? t()
          : ($(".player-video").attr("src", i),
            $(".player-video").attr("controls", !0)),
          s.remove(),
          $(".movie-cover").remove();
      }),
      $(".current-episode").on("click", function () {
        $(this).toggleClass("open"), $(".episode-container").slideToggle(400);
      }),
      $(".video-ads")
        .on("play", function () {
          $(".countdown-timer").addClass("show"), a(), o().hide();
        })
        .on("ended", function () {
          let s =
            !0 === themeSettings.videoPlayer.convertLink
              ? atobString(movie.src)
              : movie.src;
          qs("#player-one")
            ? ($(this).attr("src", ""),
              $("iframe#iframe-video").attr("src", s),
              $(".countdown-timer").removeClass("show"),
              o().show())
            : ($(this).addClass("player-video").removeClass("video-ads"),
              $(".player-video").attr("src", s),
              $(".player-video").attr("controls", !0),
              $(".player-video").parent().find(".countdown-timer").remove());
        })
        .on("timeupdate", function () {
          a();
        }),
      $("#playlist-video").on("ended", function () {
        let s = $(this),
          l =
            !0 === themeSettings.videoPlayer.convertLink
              ? atobString(playlists[i].src)
              : playlists[i].src;
        i === playlists.length - 1 ? (i = 0) : (i += 1),
          s.attr("src", l),
          s.trigger("play"),
          $(".playlist").eq(i).trigger("click");
      }),
      $("iframe#iframe-video").on("load", function () {
        o().hide();
      }),
      !0 === themeSettings.videoPlayer.onLoadAutoScroll &&
        loadAutoScroll(
          "#player-one,#player-two,#playlist-one,#playlist-two,#playlist-three,#playlist-four,#playlist-five,#playlist-six",
          120
        );
    const t = () => {
        let s =
            themeSettings.videoAdvertise.adsLink[
              Math.floor(
                Math.random() * themeSettings.videoAdvertise.adsLink.length
              )
            ],
          i = !0 === themeSettings.videoPlayer.convertLink ? atobString(s) : s;
        $(".video-ads").attr("src", i);
      },
      a = () => {
        let s = $(".video-ads")[0],
          i = Math.round(s.runtime - s.currentTime),
          l = 1 === i ? " Second" : " Seconds";
        i <= 0
          ? $(".countdown-timer").removeClass("show")
          : $(".countdown-timer").text("Skip in " + i + l);
      },
      o = (s) =>
        $(
          ".loading-one,.loading-two,.loading-three,.loading-four,.loading-five,.loading-six,.loading-seven"
        );
  });
  $(".share-links .window-open").on("click", function () {
    var $this = $(this),
      url = $this.data("url"),
      wid = $this.data("width"),
      hei = $this.data("height"),
      wsw = window.screen.width,
      wsh = window.screen.height,
      mrl = Math.round(wsw / 2 - wid / 2),
      mrt = Math.round(wsh / 2 - hei / 2),
      win = window.open(
        url,
        "_blank",
        "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" +
          wid +
          ",height=" +
          hei +
          ",left=" +
          mrl +
          ",top=" +
          mrt
      );
    win.focus();
  });
  $(".share-links").each(function () {
    var $t = $(this),
      $b = $t.find(".show-hid a");
    $b.on("click", function () {
      $t.toggleClass("show-hidden");
    });
  });
  $("#main-wrapper, #sidebar-wrapper").each(function () {
    $(this).StickySidebar({
      containerSelector: "#content-wrapper > .container",
      additionalMarginTop: 25,
      additionalMarginBottom: 25,
    });
  });
  $(".back-top").each(function () {
    var $this = $(this);
    $(window).on("scroll", function () {
      $(this).scrollTop() >= 100 ? $this.fadeIn(250) : $this.fadeOut(250);
    }),
      $this.click(function () {
        $("html, body").animate({ scrollTop: 0 }, 500);
      });
  });
  $("#ticker .HTML .widget-content").each(function (isLabel) {
    var $this = $(this),
      isData = $this.text().trim(),
      isTrim = isData.toLowerCase();
    isLabel = getAttr(isData, "label");
    ajaxTicker($this, "ticker", 5, isLabel, isTrim);
  });
  $(".featured .HTML .widget-content").each(function (isNum, isLabel) {
    var $this = $(this),
      isWindow = $(window),
      isData = $this.text().trim(),
      isTrim = isData.toLowerCase();
    isNum = getAttr(isData, "results");
    isLabel = getAttr(isData, "label");
    isWindow
      .on("load resize scroll", function isData() {
        isWindow.scrollTop() + isWindow.height() >= $this.offset().top &&
          (isWindow.off("load resize scroll", isData),
          ajaxFeatured($this, "featured", isNum, isLabel, isTrim));
      })
      .trigger("scroll");
  });
  $(".common-widget .HTML .widget-content").each(function (isLabel) {
    var $this = $(this),
      isWindow = $(window),
      isData = $this.text().trim(),
      isTrim = isData.toLowerCase();
    isLabel = getAttr(isData, "label");
    isWindow
      .on("load resize scroll", function isData() {
        isWindow.scrollTop() + isWindow.height() >= $this.offset().top &&
          (isWindow.off("load resize scroll", isData),
          ajaxWidget($this, "gallery", 9, isLabel, isTrim));
      })
      .trigger("scroll");
  });
  $(".related-content").each(function () {
    var $this = $(this),
      isWindow = $(window);
    isLabel = $this.find(".related-tag").data("label");
    isWindow
      .on("load resize scroll", function isData() {
        isWindow.scrollTop() + isWindow.height() >= $this.offset().top &&
          (isWindow.off("load resize scroll", isData),
          getPostData($this, "related", 4, isLabel));
      })
      .trigger("scroll");
  });
  function qs(elem) {
    return document.querySelector(elem);
  }
  function atobString(str) {
    return window.atob(str);
  }
  function getAttr($this, $text, $type) {
    for (
      var n = $this.split("$"), $regx = /[^{\}]+(?=})/g, a = 0;
      a < n.length;
      a++
    ) {
      var e = n[a].split("=");
      if (e[0].trim() == $text) {
        return (
          null != ($type = e[1]).match($regx) &&
          String($type.match($regx)).trim()
        );
      }
    }
    return false;
  }
  function getPostLink(feed, i) {
    for (var x = 0; x < feed[i].link.length; x++)
      if (feed[i].link[x].rel == "alternate") {
        var link = feed[i].link[x].href;
        break;
      }
    return link;
  }
  function getPostTitle(feed, i, link) {
    return feed[i].title.$t ? feed[i].title.$t : themeVariables.noTitle;
  }
  function getPostID(feed, i, n) {
    return (n = feed[i].id.$t) ? n.split("-").pop() : "";
  }
  function getFirstImage($c) {
    var $imgSrc = $("<div>").html($c).find("img").first().attr("src"),
      $len = $imgSrc.split("/"),
      $type = "/" + $len.slice(-2)[0];
    if ($len.length == 9) {
      if ($type.match(/\/s[0-9]+/g) || $type.match(/\/w[0-9]+/g)) {
        $imgSrc = $imgSrc.replace($type, "/w720");
      }
    }
    return $imgSrc;
  }
  function getPostImage(feed, i, img) {
    var $c = feed[i].content.$t;
    if (feed[i].media$thumbnail) {
      var src = feed[i].media$thumbnail.url;
    } else {
      src = "https://resources.blogblog.com/img/blank.gif";
    }
    if (
      $c.indexOf($c.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)) > -1
    ) {
      if ($c.indexOf("<img") > -1) {
        if (
          $c.indexOf(
            $c.match(/<iframe(?:.+)?src=(?:.+)?(?:www.youtube.com)/g)
          ) < $c.indexOf("<img")
        ) {
          img = src
            .replace("img.youtube.com", "i.ytimg.com")
            .replace("/default.", "/maxresdefault.");
        } else {
          img = getFirstImage($c);
        }
      } else {
        img = src
          .replace("img.youtube.com", "i.ytimg.com")
          .replace("/default.", "/maxresdefault.");
      }
    } else if ($c.indexOf("<img") > -1) {
      img = getFirstImage($c);
    } else {
      img = "https://resources.blogblog.com/img/blank.gif";
    }
    var code = '<img class="thumbnail" src="' + img + '"/>';
    return code;
  }
  function getCustomLabel(feed, i) {
    var $content = feed[i].content.$t,
      $el = $("<div>").html($content),
      $quality = $el.find('b:contains("{quality}=")'),
      $type = $el.find('b:contains("{type}=")'),
      $file = $el.find('b:contains("{file}=")'),
      $year = $el.find('b:contains("{year}=")'),
      $runtime = $el.find('b:contains("{runtime}=")'),
      $episode = $el.find('b:contains("{episode}=")'),
      $rating = $el.find('b:contains("{rating}=")'),
      $cc = $el.find('b:contains("{cc}")'),
      $completed = $el.find('b:contains("{completed}")'),
      $engdub = $el.find('b:contains("{engdub}")'),
      $urdub = $el.find('b:contains("{urdub}")'),
      $ongoing = $el.find('b:contains("{ongoing}")'),
      $upcoming = $el.find('b:contains("{upcoming}")');
    if ($quality.length > 0) {
      var $text = $quality.text(),
        $sp = $text.split("="),
        $strQuality = $sp[1];
    }
    if ($type.length > 0) {
      var $text = $type.text(),
        $sp = $text.split("="),
        $strType = $sp[1];
    }
    if ($file.length > 0) {
      var $text = $file.text(),
        $sp = $text.split("="),
        $strFile = $sp[1];
    }
    if ($year.length > 0) {
      var $text = $year.text(),
        $sp = $text.split("="),
        $strYear = $sp[1];
    }
    if ($runtime.length > 0) {
      var $text = $runtime.text(),
        $sp = $text.split("="),
        $strruntime = $sp[1];
    }
    if ($episode.length > 0) {
      var $text = $episode.text(),
        $sp = $text.split("="),
        $strEpisode = $sp[1];
    }
    if ($rating.length > 0) {
      var $text = $rating.text(),
        $sp = $text.split("="),
        $strRating = $sp[1];
    }
    if ($cc.length > 0) {
      var $ccIcon = $cc.html();
    }
    if ($completed.length > 0) {
      var $strCompleted = $completed.text();
    }
    if ($engdub.length > 0) {
      var $strEngdub = $engdub.html();
    }
    if ($urdub.length > 0) {
      var $strurdub = $urdub.html();
    }
    if ($ongoing.length > 0) {
      var $strongoing = $ongoing.text();
    }
    if ($upcoming.length > 0) {
      var $strUpcoming = $upcoming.text();
    }
    if ($strQuality != undefined) {
      var $getBadgeTop = '<span class="quality">' + $strQuality + "</span>";
    } else if ($strType != undefined) {
      var $getBadgeTop = '<span class="type">' + $strType + "</span>";
    } else {
      $getBadgeTop = "";
    }
    if ($strFile != undefined && $strFile === "dub") {
      var $getBadgeLeft = '<span class="file dub">dub</span>';
    } else if ($strFile != undefined && $strFile === "sub") {
      var $getBadgeLeft = '<span class="file sub">sub</span>';
    } else if ($strFile != undefined && $strFile === "raw") {
      var $getBadgeLeft = '<span class="file raw">raw</span>';
    } else if ($strYear != undefined) {
      var $getBadgeLeft =
        '<span class="release">' + parseInt($strYear) + "</span>";
    } else {
      $getBadgeLeft = "";
    }
    if ($strruntime != undefined) {
      var $getBadgeRight = '<span class="runtime">' + $strruntime + "</span>";
    } else if ($strEpisode != undefined) {
      var $getBadgeRight = '<span class="episode">' + $strEpisode + "</span>";
    } else if ($strRating != undefined) {
      var $getBadgeRight =
        '<span class="rating">' +
        parseFloat($strRating) +
        "<sub> / 10</sub></span>";
    } else {
      $getBadgeRight = "";
    }
    if ($ccIcon != undefined) {
      var $getRibbon = '<span class="closed-caption"></span>';
    } else if ($strCompleted != undefined) {
      var $getRibbon =
        '<span class="ribbon completed is-visible">COMPLETED</span>';
    } else if ($strurdub != undefined) {
      var $getRibbon = '<span class="ribbon urdub is-visible">URDU</span>';
    } else if ($strEngdub != undefined) {
      var $getRibbon = '<span class="ribbon engdub is-visible">ENGLISH</span>';
    } else if ($strongoing != undefined) {
      var $getRibbon = '<span class="ribbon ongoing is-visible">ONGOING</span>';
    } else if ($strUpcoming != undefined) {
      var $getRibbon =
        '<span class="ribbon upcoming is-visible">UPCOMING</span>';
    } else {
      $getRibbon = "";
    }
    var customLabel = [$getBadgeTop, $getBadgeLeft, $getBadgeRight, $getRibbon];
    return customLabel;
  }
  function ajaxTicker($this, type, num, label, $type) {
    if ($type.match("getticker")) {
      if (type == "ticker") {
        return getPostData($this, type, num, label);
      } else {
        $this.html(errorMessage());
      }
    }
  }
  function ajaxFeatured($this, type, num, label, $type) {
    if ($type.match("getfeatured")) {
      if (type == "featured") {
        if (label == "recent") {
          var hreflink = "/search";
        } else {
          hreflink = "/search/label/" + label + "";
        }
        $this
          .parent()
          .find(".widget-title")
          .addClass("heading-title")
          .append(
            '<a class="show-more" href="' +
              hreflink +
              "?&max-results=" +
              themeSettings.postPerPage +
              '">' +
              themeVariables.showMore +
              "</a>"
          );
        return getPostData($this, type, num, label);
      } else {
        $this.html(errorMessage());
      }
    }
  }
  function ajaxWidget($this, type, num, label, $type) {
    if ($type.match("getgallery")) {
      if (type == "gallery") {
        return getPostData($this, type, num, label);
      } else {
        $this.html(errorMessage());
      }
    }
  }
  function getFeedUrl($this, num, label, url) {
    switch (label) {
      case "recent":
        url = "/feeds/posts/default?alt=json&max-results=" + num;
        break;
      default:
        url =
          "/feeds/posts/default/-/" + label + "?alt=json&max-results=" + num;
    }
    return url;
  }
  function loadDisqus(url) {
    var srcTag = document.createElement("script");
    (srcTag.type = "text/javascript"),
      (srcTag["async"] = true),
      (srcTag.src = "//" + url + ".disqus.com/blogger_item.js"),
      document.getElementsByTagName("head")[0].appendChild(srcTag);
  }
  function loadAutoScroll(isElem, isOffset) {
    $("html,body").animate(
      { scrollTop: parseInt($(isElem).offset().top - isOffset) },
      2e3
    );
  }
  function isVideoUrl($convert) {
    let strUrl = "";
    switch ($convert) {
      case "youtube":
        strUrl = "aHR0cHM6Ly93d3cueW91dHViZS5jb20";
        break;
      case "facebook":
        strUrl = "aHR0cHM6Ly93d3cuZmFjZWJvb2suY29t";
        break;
      case "gdrive":
        strUrl = "aHR0cHM6Ly9kcml2ZS5nb29nbGUuY29t";
        break;
      case "dailymotion":
        strUrl = "aHR0cHM6Ly93d3cuZGFpbHltb3Rpb24uY29t";
        break;
      case "vimeo":
        strUrl = "aHR0cHM6Ly9wbGF5ZXIudmltZW8uY29t";
        break;
      case "vk":
        strUrl = "aHR0cHM6Ly92ay5jb20";
        break;
      case "ok":
        strUrl = "Ly9vay5ydS92aWRlb2VtYmVk";
        break;
      case "vdoview":
        strUrl = "aHR0cHM6Ly92ZG92aWV3LnR1bWJsci5jb20";
        break;
      default:
        strUrl = "ZW1wdHk=";
    }
    return strUrl;
  }
  function isVideoLoading() {
    let loadingHtml = "",
      loadStyle = themeSettings.videoPlayer.loadingStyle;
    switch (loadStyle) {
      case "1":
        loadingHtml =
          '<div class="loading-one"><div class="circle circle-1"></div><div class="circle circle-2"></div></div>';
        break;
      case "2":
        loadingHtml =
          '<div class="loading-two"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>';
        break;
      case "3":
        loadingHtml =
          '<div class="loading-three"><div class="dot-1"></div><div class="dot-2"></div></div>';
        break;
      case "4":
        loadingHtml =
          '<div class="loading-four"><span></span><span></span><span></span><span></span><span></span></div>';
        break;
      case "5":
        loadingHtml =
          '<div class="loading-five"><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div></div>';
        break;
      case "6":
        loadingHtml =
          '<div class="loading-six"><div class="pulse"></div><div class="pulse"></div><div class="pulse"></div></div>';
        break;
      case "7":
        loadingHtml =
          '<div class="loading-seven"><div class="round"></div><div class="dot"></div></div>';
        break;
      default:
        alert("Can not find loading style.");
    }
    return loadingHtml;
  }
  function beforeLoader() {
    return '<div class="loader"></div>';
  }
  function errorMessage() {
    return (
      '<span class="error-msg"><b>Error:</b>&nbsp;' +
      themeVariables.noResults +
      '&nbsp;<i class="fa-regular fa-face-frown"></i></span>'
    );
  }
  function getPostData($this, type, num, label) {
    switch (type) {
      case "ticker":
      case "featured":
      case "gallery":
      case "related":
        $.ajax({
          url: getFeedUrl(type, num, label),
          type: "GET",
          dataType: "json",
          cache: true,
          beforeSend: function (data) {
            switch (type) {
              case "ticker":
              case "featured":
                $this.html(beforeLoader()).parent().addClass("is-visible");
                break;
              case "gallery":
              case "related":
                $this.html(beforeLoader());
                break;
            }
          },
          success: function (data) {
            var html = "";
            switch (type) {
              case "ticker":
                html = '<div class="ticker-posts">';
                break;
              case "featured":
                html = '<div class="featured-posts grids">';
                break;
              case "gallery":
                html = '<div class="gallery-posts">';
                break;
              case "related":
                html = '<div class="related-posts grids">';
                break;
            }
            var entry = data.feed.entry;
            if (entry != undefined) {
              for (var i = 0, feed = entry; i < feed.length; i++) {
                var link = getPostLink(feed, i),
                  title = getPostTitle(feed, i, link),
                  image = getPostImage(feed, i, link),
                  id = getPostID(feed, i),
                  clabel = getCustomLabel(feed, i);
                var content = "";
                switch (type) {
                  case "ticker":
                    content +=
                      '<article class="post item-' +
                      i +
                      '" data-id="' +
                      id +
                      '"><h2 class="entry-title"><a href="' +
                      link +
                      '" title="' +
                      title +
                      '">' +
                      title +
                      "</a></h2></article>";
                    break;
                  case "featured":
                    content +=
                      '<article class="post item-' +
                      i +
                      '" data-id="' +
                      id +
                      '"><a class="entry-thumbnail" href="' +
                      link +
                      '" title="' +
                      title +
                      '">' +
                      image +
                      '<span class="entry-icon"></span>' +
                      clabel[0] +
                      clabel[1] +
                      clabel[2] +
                      clabel[3] +
                      '</a><div class="entry-header"><h2 class="entry-title"><a href="' +
                      link +
                      '" title="' +
                      title +
                      '">' +
                      title +
                      "</a></h2></div></article>";
                    break;
                  case "gallery":
                    content +=
                      '<article class="post item-' +
                      i +
                      '" data-id="' +
                      id +
                      '"><a class="entry-thumbnail" href="' +
                      link +
                      '" title="' +
                      title +
                      '">' +
                      image +
                      '<span class="entry-icon"></span><span class="entry-index">' +
                      (i + 1) +
                      "</span></a></article>";
                    break;
                  case "related":
                    content +=
                      '<article class="post item-' +
                      i +
                      '" data-id="' +
                      id +
                      '"><a class="entry-thumbnail" href="' +
                      link +
                      '" title="' +
                      title +
                      '">' +
                      image +
                      '<span class="entry-icon"></span>' +
                      clabel[0] +
                      clabel[1] +
                      clabel[2] +
                      clabel[3] +
                      '</a><div class="entry-header"><h2 class="entry-title"><a href="' +
                      link +
                      '" title="' +
                      title +
                      '">' +
                      title +
                      "</a></h2></div></article>";
                    break;
                }
                html += content;
              }
              html += "</div>";
            } else {
              html = errorMessage();
            }
            switch (type) {
              case "ticker":
                $this.html(html).parent().addClass("is-visible");
                $this.html(html).newsTicker();
                break;
              case "featured":
                $this.html(html).parent().addClass("is-visible");
                break;
              default:
                $this.html(html);
                break;
            }
            $this.find(".thumbnail").lazyLoader();
          },
          error: function () {
            $this.html(errorMessage());
          },
        });
    }
  }
  $(".blog-post-comments").each(function () {
    var $this = $(this),
      $system = themeSettings.commentsSystem,
      $comment = "comments-system-" + $system;
    switch ($system) {
      case "disqus":
        var i = themeSettings.disqusShortname;
        0 != i && (disqus_shortname = i),
          loadDisqus(disqus_shortname),
          $this.addClass($comment + " is-visible");
        break;
      case "facebook":
        $this
          .addClass($comment)
          .find("#comments")
          .html(
            '<div class="fb-comments" data-width="100%" data-href="' +
              disqus_blogger_current_url +
              '" data-order-by="time" data-numposts="5" data-lazy="true"></div>'
          ),
          $this.addClass("is-visible");
        break;
      case "hide":
        $this.addClass("is-hidden");
        break;
      default:
        $this.addClass("comments-system-blogger is-visible");
    }
    var $reply = $this.find(".comments .comment-reply"),
      $continue = $this.find(".comments #top-continue"),
      $thread = $this.find("#top-ce.comment-replybox-thread");
    $reply.click(function (e) {
      e.preventDefault(), $continue.show(), $thread.hide();
    });
    $continue.click(function (e) {
      e.preventDefault(), $continue.hide(), $thread.show();
    });
  });
});
