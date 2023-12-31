(function ($) {
    //얼랫같은 센터 팝업
    $.fn.layerPopOpen = function () {
        return this.each(function () {
            var $this = $(this);
            $this.on("click", function () {
                var $el = $this.attr("href");
                var target = $($el);
                target.append('<div class="dim"></div>');
                target.show();
                var close = target.find(".js_pop_close");
                close.on("click", function () {
                    target.hide();
                    target.find(".dim").remove();
                });
            });
        });
    };

    $.fn.passChange = function () {
        return this.each(function () {
            var $this = $(this);
            var count = 0;
            var disc = $this.parent().find(".password-disc-wrap");

            $this.keydown(function (e) {
                if (e.key === "Backspace" || e.key == "Delete") {
                    count--;
                    disc.find("span").last().remove();
                } else {
                    count++;
                    disc.append("<span class='pass-disc'></span>");
                }
                if (count <= 0) $this.css("opacity", 1);
                else $this.css("opacity", 0);
            });
        });
    };

    $.fn.searchDel = function () {
        return this.each(function () {
            let $this = $(this);
            let sBox = $this.find('input[type="text"]');
            let search = `<a href="#none" id="btn-del" role="button" class="btn-del"></a>`;
            let count = 0;

            sBox.keydown(function (e) {
                if (e.key === "Backspace" || e.key == "Delete") count--;
                else count++;

                if (count >= 1) {
                    $this.append(search);
                    var delL = $this.find(".btn-del");
                    console.log(delL.length);
                    if (delL.length > 1) {
                        delL.last().remove();
                    }
                } else $this.find(".btn-del").remove();
            });
        });
    };

    $.fn.resiType = function () {
        return this.each(function () {
            var $this = $(this);
            var radio = $this.find('input[type="radio"]');
            radio.each(function () {
                var target = $(this);
                target.on("click", function () {
                    var targetId = $(this).attr("id");
                    var dataResi = $("div[data-resi]");
                    dataResi.each(function () {
                        var dataTarget = $(this).attr("data-resi");
                        if (targetId == dataTarget) {
                            $("div[data-resi]").hide();
                            $('div[data-resi="' + dataTarget + '"]').show();
                        }
                    });
                });
            });
        });
    };

    $.fn.goTop = function () {
        return this.each(function () {
            var $this = $(this);
            $this.on("click", function () {
                $("html, body").animate(
                    {
                        scrollTop: 0,
                    },
                    500,
                    "swing"
                );
            });
        });
    };

    $.fn.profileEdit = function () {
        return this.each(function () {
            var $this = $(this);
            var $cancelProfile = $(".btn-profileChange");
            var $inp = $this.find(".userProfile-inp");
            $this.each(function () {
                var tt = $(this);
                var $btn = tt.find("._edit-profile");
                $btn.on("click", function () {
                    $this.addClass("-edit");
                    $inp.attr("disabled", false).focus();
                });
                $cancelProfile.on("click", function () {
                    $this.removeClass("-edit");
                    $inp.attr("disabled", true);
                });
            });
        });
    };
})(jQuery);

//전체 레이어 팝업
function layer_fullsheet(el, callback) {
    var $el = $(el);
    var isDim;
    $("html").addClass("scroll_lock"); //2021-10-28 html 스크롤 잠금 수정
    $el.append('<div class="dim"></div>');
    $el.removeClass("scroll_lock");
    isDim
        ? $(".layer_fullsheet").show().addClass("scroll_lock")
        : $el
              .show()
              .attr({ tabindex: "0", "aria-hidden": "false" })
              .focus()
              .removeClass("scroll_lock");
    setTimeout(function () {
        $el.find(".layer_inner").addClass("on");
        if (typeof callback == "function") {
            callback();
        }
    }, 50);
    var dimIdx = $(".dim").index();
    var thisDim = $el.find(".dim");
    var thisLyZindex = dimIdx + 4000;
    $(".dim").css("opacity", "0");
    thisDim.css("opacity", ".7");
    thisDim
        .closest(".layer_fullsheet, .layer_popup")
        .css("z-index", thisLyZindex);

    isDim = $el.siblings().hasClass("dim");

    $el.find(".js_pop_close").click(function () {
        $el.find(".layer_inner").removeClass("on");
        setTimeout(function () {
            isDim
                ? $(".layer_fullsheet").hide().removeClass("scroll_lock")
                : $el.hide();
            $(document).find(".layer_inner.on").length === 0 &&
                $("html").removeClass("scroll_lock");
            $el.attr({ tabindex: "-1", "aria-hidden": "true" })
                .find(".dim")
                .remove();
            if ($(".dim").length == "2") {
                $(".dim:eq(1)").css("opacity", ".7");
            } else if ($(".dim").length == "1") {
                $(".dim").css("opacity", ".7");
            }
        }, 200);
        $focusReturn != undefined && $focusReturn.focus(); //230920 예외추가
        return false;
    });
}

//하단 호출 레이어 팝업
function layer_bottomsheet(el) {
    var $el = $(el);
    $("html").addClass("scroll_lock"); //2021-10-28 html 스크롤 잠금 수정
    $el.append('<div class="dim"></div>');
    isDim
        ? $(".layer_bottomsheet").show()
        : $el.show().attr({ tabindex: "0", "aria-hidden": "false" }).focus();
    setTimeout(function () {
        $el.find(".layer_inner").addClass("on");
    }, 50);

    var isDim;
    var dimIdx = $(".dim").index();
    var thisDim = $el.find(".dim");
    var thisLyZindex = dimIdx + 4000;
    $(".dim").css("opacity", "0");
    thisDim.css("opacity", ".7");
    thisDim
        .closest(".layer_bottomsheet, .layer_popup")
        .css("z-index", thisLyZindex);
    // [E] multi layer 2021-08-02 추가

    $el.find(".js_pop_close").click(function () {
        $el.find(".layer_inner").removeClass("on");
        setTimeout(function () {
            isDim ? $(".layer_bottomsheet").hide() : $el.hide();
            $("html").removeClass("scroll_lock"); //2021-10-28 html 스크롤 잠금 수정
            $el.attr({ tabindex: "-1", "aria-hidden": "true" })
                .find(".dim")
                .remove();
            // [S] multi layer 2021-08-02 추가
            if ($(".dim").length == "2") {
                $(".dim:eq(1)").css("opacity", ".7");
            } else if ($(".dim").length == "1") {
                $(".dim").css("opacity", ".7");
            }
            // [E] multi layer 2021-08-02 추가
        }, 200);

        // [S] multi layer 2021-08-02 추가
        $focusReturn != undefined && $focusReturn.focus();
        
        

        return false;
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
    $(".btn-open-layerPop").layerPopOpen();
    $('input[type="password"]').passChange();
    $(".search-box").searchDel();
    $(".resi-type").resiType();
    $(".feed-quick-goTop").goTop();
    $(".userProfile-box").profileEdit();
});
