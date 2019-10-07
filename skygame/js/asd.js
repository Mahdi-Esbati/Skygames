function showContentBox(a, b) {
	var c = $(a), d = c.parent(), e = $(b);
	c.hasClass("active") || (d.find(".active").each(function () {
		$(this).removeClass("active")
	}), c.addClass("active"), $(".active-tab").slideUp("fast", function () {
		$(this).removeClass("active-tab"), e.addClass("active-tab"), e.slideDown()
	}))
}
function profileShowVoteList(a) {
	(new Ajax).url("/ajax_fetch-vote-list").data({resType: 6, resPid: a, voteType: 1}).done(function (a) {
		"" != a.html && showDialog($(".dialogVoteList"), {voteList: a.html})
	}).run()
}
function profile_setVote(a, b) {
	if (!voteInProgress) {
		var c = $(a), d = $("#voteCountProfile");
		voteInProgress = !0, (new Ajax).url("/ajax_set-vote").data({
			resType: 6,
			resPid: b,
			voteType: 1,
			target_user_id: b
		}).done(function (a) {
			if (1 == a.status)if (a.voted) {
				toggleClass(c);
				var b = parseInt(d.text()) + 1;
				d.text(b)
			} else {
				toggleClass(c);
				var b = parseInt(d.text()) - 1;
				d.text(b)
			} else showDialog($(".dialogWarning"), {message: a.msg, icon: "ico-heart7"});
			voteInProgress = !1
		}).run()
	}
}
function removeMessage(a, b) {
	var c = $(a), d = c.parent();
	(new Ajax).url("/ajax_remove-message").data({message_id: b}).done(function (a) {
		1 == a.status && d.slideUp()
	}).run()
}
function removeAllSameMessage(a, b, c) {
	(new Ajax).url("/ajax_remove-message").data({message_id: b, ownerResPid: c}).done(function (a) {
		1 == a.status && $("[data-ownerResPid='" + c + "']").each(function () {
			$(this).slideUp()
		})
	}).run()
}
function removeAllMessage() {
	(new Ajax).url("/ajax_remove-all-message").done(function (a) {
		1 == a.status && $("#userServiceMessagesList").children("div").each(function () {
			$(this).slideUp()
		})
	}).run()
}
function toggleCommentBox(a, b) {
	var c = $("#commentForm-" + a + "-" + b);
	c.slideToggle("fast")
}
function showCommentTools(a) {
	var b = $("#commentTools-" + a), c = $("#commentVoteBox-" + a);
	"none" == b.css("display") ? (b.css("display", "inline-block"), c.css("visibility", "visible")) : (b.css("display", "none"), c.css("visibility", "hidden"))
}
function addComment(a, b, c) {
	var d = $(a), e = $("#commentForm-" + b + "-" + c), f = e.find(".body"), g = f.val();
	return g.length <= 10 ? void showDialog($(".dialogWarning"), {
		message: "برای ارسال نظر ، حداقل  10 کارکتر باید وارد کنید .",
		icon: "ico-cancel"
	}) : (d.fadeOut(), void(new Ajax).url("/ajax_add-comment").data({resType: b, resPid: c, body: g}).done(function (a) {
		if (1 == a.status) {
			d.fadeIn(), f.val(""), e.slideUp("fast");
			var g = $("#comments-" + b + "-" + c), h = $(a.html);
			g.append(h), $(h).hide().fadeIn("slow")
		}
	}).run())
}
function spamComment(a) {
	var b = $("#comment-" + a).find(".body");
	(new Ajax).url("/ajax_set-spam-comment").data({comment_id: a}).done(function (a) {
		1 == a.status && b.addClass("color-spam")
	}).run()
}
function favorite(a, b) {
	var c = $(a), d = $("#favorite-1-" + b);
	(new Ajax).url("/ajax_set-favorite").data({resType: 1, resPid: b}).done(function (a) {
		if (1 == a.status)if (toggleClass(c), a.favourited) {
			var b = parseInt(d.text()) + 1;
			d.text(b)
		} else {
			var b = parseInt(d.text()) - 1;
			d.text(b)
		}
	}).run()
}
function subscription(a, b) {
	var c = $(a);
	(new Ajax).url("/ajax_set-subscription").data({resType: 1, resPid: b}).done(function (a) {
		toggleClass(c)
	}).run()
}
function question_setVote(a, b, c, d) {
	if (!voteInProgress) {
		var e = $(a), f = $("#voteUpCount-" + c + "-" + d), g = $("#voteDownCount-" + c + "-" + d);
		voteInProgress = !0, (new Ajax).url("/ajax_set-vote").data({resType: c, resPid: d, voteType: b}).done(function (a) {
			if (1 == a.status) {
				a.voted ? (1 == a.voteType ? (toggleClass(e.parent().find(".voteDownButton"), !1), toggleClass(f, !0), toggleClass(g, !1)) : a.voteType == -1 && (toggleClass(e.parent().find(".voteUpButton"), !1), toggleClass(g, !0), toggleClass(f, !1)), toggleClass(e, !0)) : (1 == a.voteType ? toggleClass(f, !1) : a.voteType == -1 && toggleClass(g, !1), toggleClass(e, !1));
				var b = 0 == a.voteUpCount ? "" : "+", c = 0 == a.voteDownCount ? "" : "-";
				f.text(b + a.voteUpCount), g.text(c + a.voteDownCount)
			} else showDialog($(".dialogWarning"), {message: a.msg, icon: "ico-thumbs-up"});
			voteInProgress = !1
		}).run()
	}
}
function questionShowVoteList(a, b, c) {
	(new Ajax).url("/ajax_fetch-vote-list").data({resType: b, resPid: c, voteType: a}).done(function (b) {
		if (1 == b.status) {
			var c = 1 == a ? "لیست رای های مثبت" : "لیست رای های منفی";
			"" != b.html && showDialog($(".dialogVoteList"), {voteList: b.html, title: c})
		} else showDialog($(".dialogWarning"), {message: b.msg, icon: "ico-notification"})
	}).run()
}
function questionShowFavoriteList(a) {
	(new Ajax).url("/ajax_fetch-favorite-list").data({resPid: a}).done(function (a) {
		"" != a.html && showDialog($(".dialogVoteList"), {voteList: a.html, title: "علاقمندان"})
	}).run()
}
function editContent(a, b) {
	var c;
	switch (a) {
		case 1:
			c = "#question";
			break;
		case 2:
			c = "#answer"
	}
	var d = $(c + "-" + b), e = $("#editor-" + a + "-" + b);
	initiateTinymce("#tinymceEditor-" + a + "-" + b, 480), d.slideUp("normal", function () {
		e.slideDown("normal")
	})
}
function saveContent(a, b) {
	var c;
	switch (a) {
		case 1:
			c = "#question";
			break;
		case 2:
			c = "#answer"
	}
	var d = $(c + "-" + b), e = $("#editor-" + a + "-" + b), f = d.find(".body"), g = tinyMCE.get("tinymceEditor-" + a + "-" + b), h = g.getContent(), i = g.getContent({format: "text"}).length;
	return i <= 20 ? void showDialog($(".dialogWarning"), {
		message: "حداقل  20 کارکتر باید وارد کنید .",
		icon: "ico-cancel"
	}) : void(new Ajax).url("/ajax_edit-content").data({resType: a, resPid: b, body: h}).done(function (a) {
		1 == a.status && (f.html(h), e.slideUp("normal", function () {
			d.slideDown("normal")
		}), prettyPrint())
	}).run()
}
function updatePublishState(a, b, c, d, e) {
	e = "undefined" == typeof e ? 0 : e;
	var f, g = $(a);
	switch (b) {
		case 1:
			f = $("#question-container-" + c);
			break;
		case 2:
			f = $("#answer-container-" + c);
			break;
		case 3:
			f = $("#comment-" + c)
	}
	(new Ajax).url("/ajax_update-publish-state").data({resType: b, resPid: c, publishedType: e}).done(function (a) {
		if (1 == a.status)if (1 == e) {
			if (1 == b)return void(window.location.href = "http://" + d + "/question/" + c);
			g.removeClass("ico-eye"), g.addClass("ico-eye-blocked"), g.attr("onclick", "updatePublishState(this, " + b + ", " + c + ", 0)"), f.find(".unpublishedMessage").slideUp()
		} else f.slideUp("fast", function () {
			1 == b && (window.location.href = "http://" + d + "/questions")
		})
	}).run()
}
function addAnswer(a, b) {
	var c = $(a), d = tinyMCE.get("tinymceEditorAnswer").getContent(), e = tinyMCE.get("tinymceEditorAnswer").getContent({format: "text"}), f = $("#answerBoxIndicator");
	return e.length <= 20 && null == $(d).find("img")[0] ? void showDialog($(".dialogWarning"), {
		message: "حداقل  20 کارکتر باید وارد کنید .",
		icon: "ico-notification"
	}) : (c.fadeOut(), f.toggle(), void(new Ajax).url("/ajax_add-answer").data({body: d, resPid: b}).done(function (a) {
		if (1 == a.status) {
			tinyMCE.get("tinymceEditorAnswer").setContent(""), f.toggle(), c.fadeIn();
			var d = $("#answers-" + b), e = $(a.html);
			d.append(e), e.hide().fadeIn(), prettyPrint()
		} else f.toggle(), c.fadeIn()
	}).run())
}
function setQuestionPriority(a) {
	var b = $(a), c = b.prev("input").val(), d = b.data("questionid");
	b.addClass("ico-spinner2"), (new Ajax).url("/ajax_set-question-priority").data({
		question_id: d,
		priority: c
	}).done(function (a) {
		b.removeClass("ico-spinner2")
	}).run()
}
function setCorrectAnswer(a, b) {
	var c = $(a), d = $(".answerList"), e = c.data("questionid"), f = c.data("answerid");
	(new Ajax).url("/ajax_set-question-correct-answer").data({
		question_id: e,
		answer_id: f,
		isCorrect: b
	}).done(function (a) {
		1 == a.status && (d.find(".correctAnswer").each(function () {
			var a = $(this);
			a.removeClass("correctAnswer"), a.attr("onclick", "setCorrectAnswer(this, 1)")
		}), b = 1 == b ? 0 : 1, c.attr("onclick", "setCorrectAnswer(this, " + b + ")"), c.removeClass("color-white"), c.addClass("correctAnswer"))
	}).run()
}
function findCorrectAnswer() {
	var a = $(".answerList"), b = a.find(".correctAnswer").closest(".answer-content");
	highlightElement(b.attr("id"))
}
function editableElement(a) {
	var b = $(a);
	b.hasClass("titleInput") || (b = b.next(".titleInput"));
	var c = b.next();
	"true" != b.attr("contentEditable") && (b.attr("contentEditable", !0), b.selectText(), c.fadeIn("fast"))
}
function editQuestionTitle(a, b) {
	var c = $(a), d = c.prev(".titleInput"), e = d.text();
	return e.length < 10 || e.length > 100 ? void showDialog($(".dialogWarning"), {
		message: "برای عنوان سوال حداقل  10 کارکتر و حداکثر 100 کارکتر باید وارد شود .",
		icon: "ico-cancel"
	}) : void(new Ajax).url("/ajax_update-question-title").data({question_id: b, title: e}).done(function (a) {
		1 == a.status && (d.attr("contentEditable", !1), c.fadeOut("fast"))
	}).run()
}
function closeQuestion(a, b, c) {
	var d = $(a);
	(new Ajax).url("/ajax_set-question-is-closed").data({question_id: b, isClosed: c}).done(function (a) {
		1 == a.status && (c = 0 == c ? 1 : 0, d.attr("onclick", "closeQuestion(this, " + b + "," + c + ")"), toggleClass(d))
	}).run()
}
function showDialog(a, b) {
	var c = a.clone(!0, !0).appendTo("body"), d = c.find(".wrapper"), e = c.find(".title"), f = d.html(), g = {};
	$.each(b, function (a, b) {
		"title" != a ? g["[" + a + "]"] = b : g[a] = b
	}), f = f.allReplace(g), e.find(".text").text(g.title), d.html(f), c.find(".close").on("click", function () {
		c.remove()
	}), c.show()
}
function toggleClass(a, b) {
	var c = a, d = c.data("class");
	if (void 0 !== d && null !== d) {
		var e = d.split(":"), f = e[0], g = e[1];
		void 0 !== b && null !== b ? b ? (c.addClass(f), c.removeClass(g)) : (c.addClass(g), c.removeClass(f)) : c.hasClass(g) ? (c.addClass(f), c.removeClass(g)) : (c.addClass(g), c.removeClass(f))
	}
}
function highlightElement(a) {
	$element = $("#" + a), $element.addClass("highlightElement"), $("html, body").animate({scrollTop: $element.offset().top - 200}, 2e3, function () {
		$element = $("#" + a), setTimeout(function () {
			$element.removeClass("highlightElement")
		}, 1e3)
	})
}
function initiateTinymce(a, b) {
	var c = tinyMCE.get(a);
	c || tinymce.init({
		selector: a,
		content_css: "http://bin.uncox.com/lib/tinymce/skins/uskin/ucss.css",
		height: b,
		skin: "uskin",
		menubar: !1,
		directionality: "rtl",
		plugins: "link hr directionality table uploadx code paste",
		toolbar: "undo redo | bold | aligncenter alignjustify | ltr rtl | bullist numlist | code hr table | link uploadx",
		paste_data_images: !1,
		paste_remove_spans: !0,
		paste_remove_styles: !0,
		paste_remove_styles_if_webkit: !0,
		paste_word_valid_elements: "b,strong,i,em,table,tr,td,p",
		paste_create_paragraphs: !0,
		paste_create_linebreaks: !0,
		paste_text_linebreaktype: !0,
		paste_auto_cleanup_on_paste: !0,
		paste_webkit_styles: "none",
		paste_retain_style_properties: "none",
		paste_preprocess: function (a, b) {
			b.content.match("^<pre") && (b.content = '<pre class="prettyprint">' + b.content.replace(/(?!<br>)(<([^>]+)>)/gi, "") + "</pre>")
		}
	})
}
$(function () {
	null == $(".active-tab")[0] && ($(".profile-tabMenu").children(":first-child").addClass("active"), $(".profileListContainer").children(":first-child").addClass("active-tab").slideDown())
});
var voteInProgress = !1;
$(function () {
	prettyPrint()
});
var voteInProgress = !1;
!function (a) {
	jQuery.fn.makeTag = function (b, c) {
		function d(c) {
			var d = b, f = [], g = b, h = 0, i = '      <div class="df flex-ic w100 m20t qaContainer" style="padding: 0;">          <ul class="flex-fill p5" style="list-style-type: none;">            <li class="dib">              <input autocomplete="off" class="force-rtl color-white" style="background: transparent; border: none; box-shadow: none">              <ul class="p2" style="display: none; position: absolute; min-width: 201px; height: 100%; max-height: 210px; background-color: #111; overflow-y: auto"></ul>            </li>          </ul>          <div class="flex-wrap">            <span class="ico-floppy-disk color-warning dib m10l p2 orangeColor tac pointer saveTag"></span>          </div>      </div>', j = a(i), k = j.find(".saveTag"), l = j.find("input"), m = l.next("ul"), n = l.parent(), o = j.find("ul:first");
			o.on("click", function (b) {
				$element = a(b.target), isTagItem = $element.hasClass("tagItem"), isTagItem || (l.focus(), p())
			}), a("body").on("click", function (b) {
				$element = a(b.target), isTagItem = $element.hasClass("tagItem"), !j.find($element).length > 0 && (isTagItem || m.slideUp("fast"))
			}), l.on("keyup", function (b) {
				var c = b.which || b.keyCode, d = a(this).val();
				if (40 == c && m.is(":hidden"))p(); else {
					var e = new RegExp("^[a-zA-Z0-9]+$"), f = String.fromCharCode(b.charCode ? b.charCode : b.which);
					(e.test(f) || 8 == c) && p(d)
				}
			}), l.on("keypress", function (b) {
				var c = b.which || b.keyCode;
				switch (c) {
					case 9:
					case 13:
						var d = m.find(".tagHighlight"), e = d.data("id"), i = v(e);
						return i && (q(i), p()), !1;
					case 8:
						if ("" != a(this).val())return !0;
						var j = f.length - 1;
						if (j != -1) {
							var i = f[j];
							r(i.taxonomy_id)
						}
						return !1;
					case 38:
						if (0 != h) {
							h--;
							var d = w(g[h].taxonomy_id);
							m.scrollTop(m.scrollTop() + d.position().top - m.height() / 2 + d.height() / 2), u(d)
						}
						return !1;
					case 40:
						if (h < g.length - 1) {
							h++;
							var d = w(g[h].taxonomy_id);
							m.scrollTop(m.scrollTop() + d.position().top - m.height() / 2 + d.height() / 2), u(d)
						}
						return !1;
					case 27:
						m.slideUp("fast")
				}
			}), m.on("mouseover", "li", function () {
				var b = a(this);
				h = b.index(), u(b)
			}), k.on("click", function () {
				e.onSaveTag && e.onSaveTag(y(), this)
			}), c.replaceWith(j);
			var p = function (b) {
				b = "undefined" == typeof b ? "" : b;
				var c = s(b);
				return h = 0, m.empty(), 0 == c.length ? void m.hide() : (a.each(c, function (b, c) {
					var d = a(resolveTemplate("<li data-id='[taxonomy_id]' class='tagItem m2t pointer'>[keyword]</li>", c));
					d.on("click", function (b) {
						var c = a(this), d = c.data("id"), e = v(d);
						$this = a(this), q(e), l.focus(), p()
					}), $highlightedElement = m.find(".tagHighlight"), 0 == b && 0 == $highlightedElement.length && (u(d), m.scrollTop(m.scrollTop() + d.position().top - m.height() / 2 + d.height() / 2)), m.append(d)
				}), void m.slideDown("fast"))
			}, q = function (b) {
				l.val(""), f.push(b);
				var c = a(resolveTemplate("<li  data-id='[taxonomy_id]' class='dib pad5 m2 '><span class='ico-cancel fss removeTag pointer'>&nbsp;</span><span>[keyword]</span></li>", b));
				c.find(".removeTag").on("click", function () {
					return r(b.taxonomy_id), !1
				}), t(c, b.category), a(c).insertBefore(n), e.onTagAdded && e.onTagAdded(b, y())
			}, r = function (a) {
				var b = w(a);
				f = jQuery.grep(f, function (b) {
					return b.taxonomy_id != a
				}), b.fadeOut("fast", function () {
					b.remove()
				})
			}, s = function (b) {
				g = [];
				var c = new RegExp(b + ".*", "gi");
				return a.each(d, function (a, b) {
					b.keyword.match(c) && (x(b) || g.push(b))
				}), g
			}, t = function (b, c) {
				if (null == e.typeColor)return void b.css("background-color", "#555");
				var d = !1;
				a.each(e.typeColor, function (a, e) {
					c == a && (b.css("background-color", e), d = !0)
				}), d || b.css("background-color", "#555")
			}, u = function (b) {
				m.find(".tagHighlight").each(function () {
					var b = a(this);
					b.removeClass("tagHighlight")
				}), b.addClass("tagHighlight")
			}, v = function (a) {
				var b = jQuery.grep(g, function (b) {
					return b.taxonomy_id == a
				})[0];
				return b
			}, w = function (a) {
				var b = o.find("li[data-id='" + a + "']");
				return b
			}, x = function (a) {
				var b = jQuery.grep(f, function (b) {
					return b.taxonomy_id == a.taxonomy_id
				})[0];
				return null != b
			}, y = function () {
				return f
			};
			null != e.usedTag && 0 != e.usedTag.length && a.each(e.usedTag, function (a, b) {
				q(b)
			})
		}

		var e = {};
		return a.extend(e, c), this.each(function () {
			return d(a(this))
		})
	}
}(jQuery);
var IN_GLOBAL_SCOPE = !0;
window.PR_SHOULD_USE_CONTINUATION = !0;
var prettyPrintOne, prettyPrint;
!function () {
	function a(a) {
		function b(a) {
			var b = a.charCodeAt(0);
			if (92 !== b)return b;
			var c = a.charAt(1);
			return b = l[c], b ? b : "0" <= c && c <= "7" ? parseInt(a.substring(1), 8) : "u" === c || "x" === c ? parseInt(a.substring(2), 16) : a.charCodeAt(1)
		}

		function c(a) {
			if (a < 32)return (a < 16 ? "\\x0" : "\\x") + a.toString(16);
			var b = String.fromCharCode(a);
			return "\\" === b || "-" === b || "]" === b || "^" === b ? "\\" + b : b
		}

		function d(a) {
			var d = a.substring(1, a.length - 1).match(new RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]", "g")), e = [], f = "^" === d[0], g = ["["];
			f && g.push("^");
			for (var h = f ? 1 : 0, i = d.length; h < i; ++h) {
				var j = d[h];
				if (/\\[bdsw]/i.test(j))g.push(j); else {
					var k, l = b(j);
					h + 2 < i && "-" === d[h + 1] ? (k = b(d[h + 2]), h += 2) : k = l, e.push([l, k]), k < 65 || l > 122 || (k < 65 || l > 90 || e.push([32 | Math.max(65, l), 32 | Math.min(k, 90)]), k < 97 || l > 122 || e.push([Math.max(97, l) & -33, Math.min(k, 122) & -33]))
				}
			}
			e.sort(function (a, b) {
				return a[0] - b[0] || b[1] - a[1]
			});
			for (var m = [], n = [], h = 0; h < e.length; ++h) {
				var o = e[h];
				o[0] <= n[1] + 1 ? n[1] = Math.max(n[1], o[1]) : m.push(n = o)
			}
			for (var h = 0; h < m.length; ++h) {
				var o = m[h];
				g.push(c(o[0])), o[1] > o[0] && (o[1] + 1 > o[0] && g.push("-"), g.push(c(o[1])))
			}
			return g.push("]"), g.join("")
		}

		function e(a) {
			for (var b = a.source.match(new RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)", "g")), e = b.length, h = [], i = 0, j = 0; i < e; ++i) {
				var k = b[i];
				if ("(" === k)++j; else if ("\\" === k.charAt(0)) {
					var l = +k.substring(1);
					l && (l <= j ? h[l] = -1 : b[i] = c(l))
				}
			}
			for (var i = 1; i < h.length; ++i)-1 === h[i] && (h[i] = ++f);
			for (var i = 0, j = 0; i < e; ++i) {
				var k = b[i];
				if ("(" === k)++j, h[j] || (b[i] = "(?:"); else if ("\\" === k.charAt(0)) {
					var l = +k.substring(1);
					l && l <= j && (b[i] = "\\" + h[l])
				}
			}
			for (var i = 0; i < e; ++i)"^" === b[i] && "^" !== b[i + 1] && (b[i] = "");
			if (a.ignoreCase && g)for (var i = 0; i < e; ++i) {
				var k = b[i], m = k.charAt(0);
				k.length >= 2 && "[" === m ? b[i] = d(k) : "\\" !== m && (b[i] = k.replace(/[a-zA-Z]/g, function (a) {
					var b = a.charCodeAt(0);
					return "[" + String.fromCharCode(b & -33, 32 | b) + "]"
				}))
			}
			return b.join("")
		}

		for (var f = 0, g = !1, h = !1, i = 0, j = a.length; i < j; ++i) {
			var k = a[i];
			if (k.ignoreCase)h = !0; else if (/[a-z]/i.test(k.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi, ""))) {
				g = !0, h = !1;
				break
			}
		}
		for (var l = {b: 8, t: 9, n: 10, v: 11, f: 12, r: 13}, m = [], i = 0, j = a.length; i < j; ++i) {
			var k = a[i];
			if (k.global || k.multiline)throw new Error("" + k);
			m.push("(?:" + e(k) + ")")
		}
		return new RegExp(m.join("|"), h ? "gi" : "g")
	}

	function b(a, b) {
		function c(a) {
			var i = a.nodeType;
			if (1 == i) {
				if (d.test(a.className))return;
				for (var j = a.firstChild; j; j = j.nextSibling)c(j);
				var k = a.nodeName.toLowerCase();
				"br" !== k && "li" !== k || (e[h] = "\n", g[h << 1] = f++, g[h++ << 1 | 1] = a)
			} else if (3 == i || 4 == i) {
				var l = a.nodeValue;
				l.length && (l = b ? l.replace(/\r\n?/g, "\n") : l.replace(/[ \t\r\n]+/g, " "), e[h] = l, g[h << 1] = f, f += l.length, g[h++ << 1 | 1] = a)
			}
		}

		var d = /(?:^|\s)nocode(?:\s|$)/, e = [], f = 0, g = [], h = 0;
		return c(a), {sourceCode: e.join("").replace(/\n$/, ""), spans: g}
	}

	function c(a, b, c, d) {
		if (b) {
			var e = {sourceCode: b, basePos: a};
			c(e), d.push.apply(d, e.decorations)
		}
	}

	function d(a) {
		for (var b = void 0, c = a.firstChild; c; c = c.nextSibling) {
			var d = c.nodeType;
			b = 1 === d ? b ? a : c : 3 === d && R.test(c.nodeValue) ? a : b
		}
		return b === a ? void 0 : b
	}

	function e(b, d) {
		var e, f = {};
		!function () {
			for (var c = b.concat(d), g = [], h = {}, i = 0, j = c.length; i < j; ++i) {
				var k = c[i], l = k[3];
				if (l)for (var m = l.length; --m >= 0;)f[l.charAt(m)] = k;
				var n = k[1], o = "" + n;
				h.hasOwnProperty(o) || (g.push(n), h[o] = null)
			}
			g.push(/[\0-\uffff]/), e = a(g)
		}();
		var g = d.length, h = function (a) {
			for (var b = a.sourceCode, i = a.basePos, k = [i, J], l = 0, m = b.match(e) || [], n = {}, o = 0, p = m.length; o < p; ++o) {
				var q, r = m[o], s = n[r], t = void 0;
				if ("string" == typeof s)q = !1; else {
					var u = f[r.charAt(0)];
					if (u)t = r.match(u[1]), s = u[0]; else {
						for (var v = 0; v < g; ++v)if (u = d[v], t = r.match(u[1])) {
							s = u[0];
							break
						}
						t || (s = J)
					}
					q = s.length >= 5 && "lang-" === s.substring(0, 5), !q || t && "string" == typeof t[1] || (q = !1, s = M), q || (n[r] = s)
				}
				var w = l;
				if (l += r.length, q) {
					var x = t[1], y = r.indexOf(x), z = y + x.length;
					t[2] && (z = r.length - t[2].length, y = z - x.length);
					var A = s.substring(5);
					c(i + w, r.substring(0, y), h, k), c(i + w + y, x, j(A, x), k), c(i + w + z, r.substring(z), h, k)
				} else k.push(i + w, s)
			}
			a.decorations = k
		};
		return h
	}

	function f(a) {
		var b = [], c = [];
		a.tripleQuotedStrings ? b.push([D, /^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/, null, "'\""]) : a.multiLineStrings ? b.push([D, /^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/, null, "'\"`"]) : b.push([D, /^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/, null, "\"'"]), a.verbatimStrings && c.push([D, /^@\"(?:[^\"]|\"\")*(?:\"|$)/, null]);
		var d = a.hashComments;
		d && (a.cStyleComments ? (d > 1 ? b.push([F, /^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/, null, "#"]) : b.push([F, /^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\r\n]*)/, null, "#"]), c.push([D, /^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/, null])) : b.push([F, /^#[^\r\n]*/, null, "#"])), a.cStyleComments && (c.push([F, /^\/\/[^\r\n]*/, null]), c.push([F, /^\/\*[\s\S]*?(?:\*\/|$)/, null]));
		var f = a.regexLiterals;
		if (f) {
			var g = f > 1 ? "" : "\n\r", h = g ? "." : "[\\S\\s]", i = "/(?=[^/*" + g + "])(?:[^/\\x5B\\x5C" + g + "]|\\x5C" + h + "|\\x5B(?:[^\\x5C\\x5D" + g + "]|\\x5C" + h + ")*(?:\\x5D|$))+/";
			c.push(["lang-regex", RegExp("^" + Q + "(" + i + ")")])
		}
		var j = a.types;
		j && c.push([G, j]);
		var k = ("" + a.keywords).replace(/^ | $/g, "");
		k.length && c.push([E, new RegExp("^(?:" + k.replace(/[\s,]+/g, "|") + ")\\b"), null]), b.push([J, /^\s+/, null, " \r\n\t "]);
		var l = "^.[^\\s\\w.$@'\"`/\\\\]*";
		return a.regexLiterals && (l += "(?!s*/)"), c.push([H, /^@[a-z_$][a-z_$@0-9]*/i, null], [G, /^(?:[@_]?[A-Z]+[a-z][A-Za-z_$@0-9]*|\w+_t\b)/, null], [J, /^[a-z_$][a-z_$@0-9]*/i, null], [H, new RegExp("^(?:0x[a-f0-9]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+\\-]?\\d+)?)[a-z]*", "i"), null, "0123456789"], [J, /^\\[\s\S]?/, null], [I, new RegExp(l), null]), e(b, c)
	}

	function g(a, b, c) {
		function d(a) {
			var b = a.nodeType;
			if (1 != b || f.test(a.className)) {
				if ((3 == b || 4 == b) && c) {
					var i = a.nodeValue, j = i.match(g);
					if (j) {
						var k = i.substring(0, j.index);
						a.nodeValue = k;
						var l = i.substring(j.index + j[0].length);
						if (l) {
							var m = a.parentNode;
							m.insertBefore(h.createTextNode(l), a.nextSibling)
						}
						e(a), k || a.parentNode.removeChild(a)
					}
				}
			} else if ("br" === a.nodeName)e(a), a.parentNode && a.parentNode.removeChild(a); else for (var n = a.firstChild; n; n = n.nextSibling)d(n)
		}

		function e(a) {
			function b(a, c) {
				var d = c ? a.cloneNode(!1) : a, e = a.parentNode;
				if (e) {
					var f = b(e, 1), g = a.nextSibling;
					f.appendChild(d);
					for (var h = g; h; h = g)g = h.nextSibling, f.appendChild(h)
				}
				return d
			}

			for (; !a.nextSibling;)if (a = a.parentNode, !a)return;
			for (var c, d = b(a.nextSibling, 0); (c = d.parentNode) && 1 === c.nodeType;)d = c;
			j.push(d)
		}

		for (var f = /(?:^|\s)nocode(?:\s|$)/, g = /\r\n?|\n/, h = a.ownerDocument, i = h.createElement("li"); a.firstChild;)i.appendChild(a.firstChild);
		for (var j = [i], k = 0; k < j.length; ++k)d(j[k]);
		b === (0 | b) && j[0].setAttribute("value", b);
		var l = h.createElement("ol");
		l.className = "linenums";
		for (var m = Math.max(0, b - 1 | 0) || 0, k = 0, n = j.length; k < n; ++k)i = j[k], i.className = "L" + (k + m) % 10, i.firstChild || i.appendChild(h.createTextNode(" ")), l.appendChild(i);
		a.appendChild(l)
	}

	function h(a) {
		var b = /\bMSIE\s(\d+)/.exec(navigator.userAgent);
		b = b && +b[1] <= 8;
		var c = /\n/g, d = a.sourceCode, e = d.length, f = 0, g = a.spans, h = g.length, i = 0, j = a.decorations, k = j.length, l = 0;
		j[k] = e;
		var m, n;
		for (n = m = 0; n < k;)j[n] !== j[n + 2] ? (j[m++] = j[n++], j[m++] = j[n++]) : n += 2;
		for (k = m, n = m = 0; n < k;) {
			for (var o = j[n], p = j[n + 1], q = n + 2; q + 2 <= k && j[q + 1] === p;)q += 2;
			j[m++] = o, j[m++] = p, n = q
		}
		k = j.length = m;
		var r, s = a.sourceNode;
		s && (r = s.style.display, s.style.display = "none");
		try {
			for (; i < h;) {
				var t, u = (g[i], g[i + 2] || e), v = j[l + 2] || e, q = Math.min(u, v), w = g[i + 1];
				if (1 !== w.nodeType && (t = d.substring(f, q))) {
					b && (t = t.replace(c, "\r")), w.nodeValue = t;
					var x = w.ownerDocument, y = x.createElement("span");
					y.className = j[l + 1];
					var z = w.parentNode;
					z.replaceChild(y, w), y.appendChild(w), f < u && (g[i + 1] = w = x.createTextNode(d.substring(q, u)), z.insertBefore(w, y.nextSibling))
				}
				f = q, f >= u && (i += 2), f >= v && (l += 2)
			}
		} finally {
			s && (s.style.display = r)
		}
	}

	function i(a, b) {
		for (var c = b.length; --c >= 0;) {
			var d = b[c];
			T.hasOwnProperty(d) ? n.console && console.warn("cannot override language handler %s", d) : T[d] = a
		}
	}

	function j(a, b) {
		return a && T.hasOwnProperty(a) || (a = /^\s*</.test(b) ? "default-markup" : "default-code"), T[a]
	}

	function k(a) {
		var c = a.langExtension;
		try {
			var d = b(a.sourceNode, a.pre), e = d.sourceCode;
			a.sourceCode = e, a.spans = d.spans, a.basePos = 0, j(c, e)(a), h(a)
		} catch (a) {
			n.console && console.log(a && a.stack || a)
		}
	}

	function l(a, b, c) {
		var d = document.createElement("div");
		d.innerHTML = "<pre>" + a + "</pre>", d = d.firstChild, c && g(d, c, !0);
		var e = {langExtension: b, numberLines: c, sourceNode: d, pre: 1};
		return k(e), d.innerHTML
	}

	function m(a, b) {
		function c(a) {
			return f.getElementsByTagName(a)
		}

		function e() {
			for (var b = n.PR_SHOULD_USE_CONTINUATION ? p.now() + 250 : 1 / 0; r < j.length && p.now() < b; r++) {
				for (var c = j[r], f = y, i = c; i = i.previousSibling;) {
					var l = i.nodeType, m = (7 === l || 8 === l) && i.nodeValue;
					if (m ? !/^\??prettify\b/.test(m) : 3 !== l || /\S/.test(i.nodeValue))break;
					if (m) {
						f = {}, m.replace(/\b(\w+)=([\w:.%+-]+)/g, function (a, b, c) {
							f[b] = c
						});
						break
					}
				}
				var o = c.className;
				if ((f !== y || t.test(o)) && !u.test(o)) {
					for (var z = !1, A = c.parentNode; A; A = A.parentNode) {
						var B = A.tagName;
						if (x.test(B) && A.className && t.test(A.className)) {
							z = !0;
							break
						}
					}
					if (!z) {
						c.className += " prettyprinted";
						var C = f.lang;
						if (!C) {
							C = o.match(s);
							var D;
							!C && (D = d(c)) && w.test(D.tagName) && (C = D.className.match(s)), C && (C = C[1])
						}
						var E;
						if (v.test(c.tagName))E = 1; else {
							var F = c.currentStyle, G = h.defaultView, H = F ? F.whiteSpace : G && G.getComputedStyle ? G.getComputedStyle(c, null).getPropertyValue("white-space") : 0;
							E = H && "pre" === H.substring(0, 3)
						}
						var I = f.linenums;
						(I = "true" === I || +I) || (I = o.match(/\blinenums\b(?::(\d+))?/), I = !!I && (!I[1] || !I[1].length || +I[1])), I && g(c, I, E), q = {
							langExtension: C,
							sourceNode: c,
							numberLines: I,
							pre: E
						}, k(q)
					}
				}
			}
			r < j.length ? setTimeout(e, 250) : "function" == typeof a && a()
		}

		for (var f = b || document.body, h = f.ownerDocument || document, i = [c("pre"), c("code"), c("xmp")], j = [], l = 0; l < i.length; ++l)for (var m = 0, o = i[l].length; m < o; ++m)j.push(i[l][m]);
		i = null;
		var p = Date;
		p.now || (p = {
			now: function () {
				return +new Date
			}
		});
		var q, r = 0, s = /\blang(?:uage)?-([\w.]+)(?!\S)/, t = /\bprettyprint\b/, u = /\bprettyprinted\b/, v = /pre|xmp/i, w = /^code$/i, x = /^(?:pre|code|xmp)$/i, y = {};
		e()
	}

	var n = window, o = ["break,continue,do,else,for,if,return,while"], p = [o, "auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"], q = [p, "catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"], r = [q, "alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"], s = [q, "abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"], t = [s, "as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"], u = "all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes", v = [q, "debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"], w = "caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END", x = [o, "and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"], y = [o, "alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"], z = [o, "as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"], A = [o, "case,done,elif,esac,eval,fi,function,in,local,set,then,until"], B = [r, t, v, w, x, y, A], C = /^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/, D = "str", E = "kwd", F = "com", G = "typ", H = "lit", I = "pun", J = "pln", K = "tag", L = "dec", M = "src", N = "atn", O = "atv", P = "nocode", Q = "(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*", R = /\S/, S = f({
		keywords: B,
		hashComments: !0,
		cStyleComments: !0,
		multiLineStrings: !0,
		regexLiterals: !0
	}), T = {};
	i(S, ["default-code"]), i(e([], [[J, /^[^<?]+/], [L, /^<!\w[^>]*(?:>|$)/], [F, /^<\!--[\s\S]*?(?:-\->|$)/], ["lang-", /^<\?([\s\S]+?)(?:\?>|$)/], ["lang-", /^<%([\s\S]+?)(?:%>|$)/], [I, /^(?:<[%?]|[%?]>)/], ["lang-", /^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i], ["lang-js", /^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i], ["lang-css", /^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i], ["lang-in.tag", /^(<\/?[a-z][^<>]*>)/i]]), ["default-markup", "htm", "html", "mxml", "xhtml", "xml", "xsl"]), i(e([[J, /^[\s]+/, null, " \t\r\n"], [O, /^(?:\"[^\"]*\"?|\'[^\']*\'?)/, null, "\"'"]], [[K, /^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i], [N, /^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i], ["lang-uq.val", /^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/], [I, /^[=<>\/]+/], ["lang-js", /^on\w+\s*=\s*\"([^\"]+)\"/i], ["lang-js", /^on\w+\s*=\s*\'([^\']+)\'/i], ["lang-js", /^on\w+\s*=\s*([^\"\'>\s]+)/i], ["lang-css", /^style\s*=\s*\"([^\"]+)\"/i], ["lang-css", /^style\s*=\s*\'([^\']+)\'/i], ["lang-css", /^style\s*=\s*([^\"\'>\s]+)/i]]), ["in.tag"]), i(e([], [[O, /^[\s\S]+/]]), ["uq.val"]), i(f({
		keywords: r,
		hashComments: !0,
		cStyleComments: !0,
		types: C
	}), ["c", "cc", "cpp", "cxx", "cyc", "m"]), i(f({keywords: "null,true,false"}), ["json"]), i(f({
		keywords: t,
		hashComments: !0,
		cStyleComments: !0,
		verbatimStrings: !0,
		types: C
	}), ["cs"]), i(f({keywords: s, cStyleComments: !0}), ["java"]), i(f({
		keywords: A,
		hashComments: !0,
		multiLineStrings: !0
	}), ["bash", "bsh", "csh", "sh"]), i(f({
		keywords: x,
		hashComments: !0,
		multiLineStrings: !0,
		tripleQuotedStrings: !0
	}), ["cv", "py", "python"]), i(f({
		keywords: w,
		hashComments: !0,
		multiLineStrings: !0,
		regexLiterals: 2
	}), ["perl", "pl", "pm"]), i(f({
		keywords: y,
		hashComments: !0,
		multiLineStrings: !0,
		regexLiterals: !0
	}), ["rb", "ruby"]), i(f({
		keywords: v,
		cStyleComments: !0,
		regexLiterals: !0
	}), ["javascript", "js"]), i(f({
		keywords: u,
		hashComments: 3,
		cStyleComments: !0,
		multilineStrings: !0,
		tripleQuotedStrings: !0,
		regexLiterals: !0
	}), ["coffee"]), i(f({
		keywords: z,
		cStyleComments: !0,
		multilineStrings: !0
	}), ["rc", "rs", "rust"]), i(e([], [[D, /^[\s\S]+/]]), ["regex"]);
	var U = n.PR = {
		createSimpleLexer: e,
		registerLangHandler: i,
		sourceDecorator: f,
		PR_ATTRIB_NAME: N,
		PR_ATTRIB_VALUE: O,
		PR_COMMENT: F,
		PR_DECLARATION: L,
		PR_KEYWORD: E,
		PR_LITERAL: H,
		PR_NOCODE: P,
		PR_PLAIN: J,
		PR_PUNCTUATION: I,
		PR_SOURCE: M,
		PR_STRING: D,
		PR_TAG: K,
		PR_TYPE: G,
		prettyPrintOne: IN_GLOBAL_SCOPE ? n.prettyPrintOne = l : prettyPrintOne = l,
		prettyPrint: prettyPrint = IN_GLOBAL_SCOPE ? n.prettyPrint = m : prettyPrint = m
	};
	"function" == typeof define && define.amd && define("google-code-prettify", [], function () {
		return U
	})
}();