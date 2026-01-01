$(function() {
	init_ready(); // 공통
});
// 공통
function init_ready() {

	// 일자 선택
	if ($.fn.datepicker) {
		// input type=date 지원여부 채크
		var i = document.createElement("input");
		i.setAttribute("type", "date");
		// 미지원시
		if (i.type == "text") {
			$(".has_date_picker, .js_date_picker").each(function() {
				var options = {
					//"changeMonth": true,
					//"changeYear": true,
					"yearSuffix": "",
					"dateFormat": "yy-mm-dd"
				};
				$(this).datepicker($.extend(options, $(this).data()));
			})
		// 지원시 type=date 제외
		} else {
			$(".has_date_picker, .js_date_picker").not("[type='date']").each(function () {
				var options = {
					"changeMonth": true,
					"changeYear": true,
					"yearSuffix": "",
					"dateFormat": "yy-mm-dd"
				};
				$(this).datepicker($.extend(options, $(this).data()));
			});
		}
	}
	// 일자+시간 선택
	if ($.fn.datetimepicker) {
		$(".has_datetime_picker").each(function () {
			$(this).datetimepicker($.extend({
				"controlType": "select",
				"timeFormat": "HH:mm",
				"stepMinute": 5,
				"dateFormat": "yy-mm-dd"
			}, $(this).data()));
		});
	}
	// 시간 선택
	if ($.fn.timepicker) {
		$(".has_time_picker").timepicker($.extend({
			"controlType": "select",
			"timeFormat": "HH:mm",
			"stepMinute": 5,
			"dateFormat": "yy-mm-dd"
		}, $(this).data()));
	}
	// 달 선택
	if ($.fn.MonthPicker) {
		$(".has_month_picker").MonthPicker({
			"ShowIcon": false,
			"i18n": {
				"year": "",
				"prevYear": "전년도",
				"nextYear": "후년도",
				"next5Years": '5년후',
				"prev5Years": '5년전',
				"nextLabel": "다음",
				"prevLabel": "이전",
				"buttonText": "월 선택창 열기",
				"jumpYears": "년도 이동",
				"months": ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
			}
		});
	}
	// 색상 선택
	if ($.fn.colpick) {
		$(".has_color_picker").colpick({
			"layout": "hex",
			"submit": 0,
			"colorScheme": "light",
			"onChange": function(hsb, hex, rgb, el, bySetColor) {
				$(el).css("border-right-color", "#" + hex);
				if (!bySetColor) $(el).val("#" + hex);
			}
		}).keyup(function(){
			$(this).colpickSetColor(this.value);
		});
	}
	// 숫자입력
	if ($.fn.autoNumeric) {
		$(".auto_numeric, .js_auto_numeric").each(function() {
			$(this).autoNumeric($.extend({mDec: 0, lZero: "keep"}, $(this).data()));
		});
		$(document).on("click focus", ".auto_numeric, .js_auto_numeric", function() {$(this).select();});
	}
	if ($.fn.autogrow) {
		$("textarea.auto_grow").autogrow({vertical: true, horizontal: false});
	}
	$(".popup_wrap").on("click", function(e) {
		if ($(e.target).is($(this))) {
			$(this).hide();
		}
	});
	$(".mask").on("click", function(e) {
		if ($(e.target).is($(this))) {
			$(this).hide();
		}
	});
	if (typeof objectFit != "undefined") {
		objectFit.polyfill({
			selector: "img.cover",
			fittype: "cover",
			disableCrossDomain: "true"
		});
	}
	if ($.fn.fancybox) {
		$(".fancybox").fancybox({
			"autoScale": true
		});
	}
	if (window.Parsley) {
		parsley_init();
	}
}
function popup_layer(a_tag) {
	var $iframe = $("<iframe><\/iframe>");
	$iframe.attr("id", "popup_iframe");
	$iframe.attr("src", typeof a_tag == "string" ? a_tag : a_tag.href);
	$iframe.attr("allowtransparency", "true");
	$iframe.attr("scrolling", "yes");
	$("body").append($iframe);
	$("#popup_iframe").css({
		"width": "100%",
		"height": "100%"
	}).wrap("<div id='popup_iframe_wrap' style='background-color:transparent; overflow:scroll; -webkit-overflow-scrolling:touch; position:fixed; left:0; top:0; right:0; bottom:0; z-index:150'><\/div>");

	$("body").css({overflow:'hidden','height':'100%'});

	$("#popup_iframe_wrap").on("DOMNodeRemoved", function() {
		$("body", parent.document).css({'overflow': 'auto', 'height': 'auto'});
	});

	return false;
}
function popup_layer_close() {
	if (parent) {
		$("#popup_iframe_wrap", parent.document).remove();
	} else {
		$("#popup_iframe_wrap").remove();
	}

	return false;
}
// a 태그 활용 팝업
function popup_this(a_tag, option_arg) {
	var w = window.open(a_tag.href, a_tag.target, option_arg);

	if (w) w.focus();

	return false;
}
// 팝업
function popup_here(href, target, option_arg) {
	var w = window.open(href, target, option_arg);

	if (w) w.focus();

	return false;
}
// target="_opener" 대신
function target_opener(mylink, close_me, close_only) {
	if (!(window.opener)) return true;
	window.opener.focus();
	if (!close_only) window.opener.location.href = mylink.href;
	if (close_me) window.close();
	return false;
}
function toggle_check(tag, input_name) {
	var all_checked = tag.checked;
	$("input[name='" + input_name + "']").each(function() {
		this.checked =  all_checked;
	});
}
function print_page() {
	window.print();
	return false;
}
function get_distance(x1, y1, x2, y2) {
	var r = 6371;
	var dy = deg2rad(y2 - y1);
	var dx = deg2rad(x2 - x1);
	var a =
		Math.sin(dy / 2) * Math.sin(dy / 2) +
		Math.cos(deg2rad(y1)) * Math.cos(deg2rad(y2)) *
		Math.sin(dx / 2) * Math.sin(dx / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = r * c;
	return d;
}
function deg2rad(deg) {
	return deg * (Math.PI/180)
}
function refresh_distance($tag) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(pos) {
			var x1 = pos.coords.longitude;
			var y1 = pos.coords.latitude;
			$tag.each(function() {
				var x2 = parseFloat(1 * $(this).attr("data-x"));
				var y2 = parseFloat(1 * $(this).attr("data-y"));
				if (x2 && y2) {
					var d = get_distance(x1, y1, x2, y2);
					$(this).text(Math.round(d * 100) / 100);
				}
			})
		});
	}
}
function update_location() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(pos) {
			$.ajax({
				"url": "/member/ajax_member_xy.php",
				"data": {
					"member_x": pos.coords.longitude,
					"member_y": pos.coords.latitude,
					"timer": $.now()
				}
			});
		});
	}
}
function replace_url_param(url, param_name, param_value){
	var r = new RegExp("(" + param_name + "=).*?(&|$)");
	var has_hash = url.indexOf("#") != -1;
	var hash = has_hash ? url.split("#")[1] : "";
	var new_url = has_hash ? url.split("#")[0] : url;

	if (url.search(r) >= 0) {
		new_url = url.replace(r, "$1" + param_value + "$2");
	} else {
		new_url = new_url + (new_url.indexOf("?") > 0 ? "&" : "?") + param_name + "=" + param_value + hash;
	}
	return new_url;
}
var tag_selector = function(a_tag_all, a_tag_selector) {
	var tag_all = a_tag_all;
	var tag_selector = a_tag_selector;

	var init_tag = function(tag_csv) {
		var tag_values = tag_csv == "" ? [] : tag_csv.split(",");
		refresh_tag(tag_values);
	};
	var select_tag = function(element) {
		var $selects = $(tag_selector);
		var tag_values = [];
		$selects.each(function() {
			if (this.selectedIndex > -1) {
				var v = this.options[this.selectedIndex].value;
				if (v != "") {
					tag_values.push(v);
				}
			}
		});
		refresh_tag(tag_values);
	};
	var refresh_tag = function(tag_values) {
		var $selects = $(tag_selector);
		var i = 0;
		var tag_clone = tag_all.slice(0);

		for (i = 0; i < tag_values.length; i++) {
			var tag_value = tag_values[i];
			$select = $($selects.get(i));

			var option_html = "<option value=''><" + "/option>";
			var tag_index = -1;
			for (var j = 0; j < tag_clone.length; j++) {
				var tag = tag_clone[j];
				option_html += "<option value='" + tag.v + "'>" + tag.t + "<" + "/option>";
				if (tag.v == tag_value) {
					tag_index = j;
				}
			}
			$select.find("option").remove();
			$select.append(option_html);
			if (tag_index > -1) {
				$select.get(0).selectedIndex = tag_index + 1;
				tag_clone.splice(tag_index, 1);
			}
			$select.show();
		}
		if (i < tag_all.length) {
			$select = $($selects.get(i));
			var option_html = "<option value=''><" + "/option>";
			for (var j = 0; j < tag_clone.length; j++) {
				var tag = tag_clone[j];
				option_html += "<option value='" + tag.v + "'>" + tag.t + "<" + "/option>";
			}
			$select.find("option").remove();
			$select.append(option_html);
			$select.val("");
			$select.show();
			i++;
		}
		for (; i < tag_all.length; i++) {
			$select = $($selects.get(i));
			$select.find("option").remove();
			$select.val("");
			$select.hide();
		}
	};
	return {
		init_tag: init_tag,
		select_tag: select_tag
	};
}
function zip_open(zip_callback, embed_dialog, embed_here) {
	if (typeof daum != "undefined") {
		var options = {};
		options.oncomplete = function(data) {
			if (typeof embed_dialog != "undefined") {
				zip_callback(data);
				$(embed_dialog).hide();
			} else {
				zip_callback(data);
			}
		};
		if (typeof embed_dialog != "undefined") {
			options.width = "100%";
			options.height = "100%";
		}
		var daum_zip = new daum.Postcode(options);
		if (typeof embed_dialog != "undefined") {
			daum_zip.embed($(embed_here).get(0));
			$(embed_dialog).show();
		} else {
			daum_zip.open();
		}
	}
	return false;
}
function zip_callback(data) {
	var fullAddr = "";
	var extraAddr = "";

	if (data.userSelectedType === "R") {
		fullAddr = data.roadAddress;
	} else {
		fullAddr = data.jibunAddress;
	}
	if (data.userSelectedType === "R") {
		if (data.bname !== "") {
			extraAddr += data.bname;
		}
		if (data.buildingName !== "") {
			extraAddr += (extraAddr !== "" ? ", " + data.buildingName : data.buildingName);
        }
		fullAddr += (extraAddr !== "" ? " (" + extraAddr + ")" : "");
	}
	var frm = document.forms["frm"];
	frm.elements["member_zip"].value = data.zonecode;
	frm.elements["member_address"].value = fullAddr;
	frm.elements["member_address_etc"].focus();
}
function parsley_init() {
	// 일자확인 YYYY-MM-DD
	var util_validate_date = function (yyyymmdd) {
		var a = yyyymmdd.split(/[^\d]/);
		var d = new Date(+a[0], a[1] - 1, +a[2]);
		return !isNaN(d) && (d.getDate() == +a[2] && d.getMonth() + 1 == +a[1] && d.getFullYear() == +a[0]);
	};

	// 사업자번호 확인 9999999999
	var util_validate_business_no = function (bizID) {
		var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
		var tmpBizID, i, chkSum = 0, c2, remander;
		bizID = bizID.replace(/-/gi, '');

		for (i = 0; i <= 7; i++) chkSum += checkID[i] * bizID.charAt(i);
		c2 = "0" + (checkID[8] * bizID.charAt(8));
		c2 = c2.substring(c2.length - 2, c2.length);
		chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
		remander = (10 - (chkSum % 10)) % 10;

		if (Math.floor(bizID.charAt(9)) == remander) return true; // OK!
		return false;
	};
	// 한글길이 (한글:2, 영문1)
	var util_dbcs_length = function (val) {
		return val.replace(/[\0-\x7f]|([\0-\u07ff]|(.))/g, "$&$1").length;
	};

	// 최소글자
	window.Parsley.addValidator("dbcsMinlength", {
		"validateString": function (val, req) {
			return util_dbcs_length(val) >= req;
		},
		"messages": {
			"ko": "%s 바이트 미만."
		}
	});
	// 최대글자
	window.Parsley.addValidator("dbcsMaxlength", {
		"validateString": function (val, req) {
			return util_dbcs_length(val) <= req;
		},
		"messages": {
			"ko": "%s 바이트 초과."
		}
	});
	// 사업자번호(단일)
	window.Parsley.addValidator("businessNo", {
		"validateString": function (val) {
			return util_validate_business_no(val.replace(/-/g, ""));
		},
		"messages": {
			"ko": "사업자번호 오류."
		}
	});
	// 사업자번호(복수input)
	window.Parsley.addValidator("businessNoInputs", {
		"validateString": function (val, req) {
			var inputs = [];
			$("[name^='" + req + "']").each(function () {
				inputs.push($(this).val());
			});

			return util_validate_business_no(inputs.join(""));
		},
		"messages": {
			"ko": "사업자번호 오류."
		},
		"priority": 255
	});
	// 일자(단일)
	window.Parsley.addValidator("date", {
		"validateString": function (val) {
			return util_validate_date(val);
		},
		"messages": {
			"ko": "일자 오류."
		}
	});
	// 일자(복수)
	window.Parsley.addValidator("dateInputs", {
		"validateString": function (val, req) {
			var inputs = [];
			if (
				$("[name^='" + req + "yyyy']").length &&
				$("[name^='" + req + "mm']").length &&
				$("[name^='" + req + "dd']").length
			) {
				inputs.push($("[name^='" + req + "yyyy']").val());
				inputs.push($("[name^='" + req + "mm']").val());
				inputs.push($("[name^='" + req + "dd']").val());
			} else {
				$("[name^='" + req + "']").each(function () {
					inputs.push($(this).val());
				});
			}

			return util_validate_date(inputs.join("-"));
		},
		"messages": {
			"ko": "일자 오류."
		}
	});
	// 일자(복수)
	window.Parsley.addValidator("dateAges", {
		"validateString": function (val, req_csv) {
			var reqs = req_csv.split(",");
			var req = reqs[0];
			var age_req = +reqs[1];
			var inputs = [];
			if (
				$("[name^='" + req + "yyyy']").length &&
				$("[name^='" + req + "mm']").length &&
				$("[name^='" + req + "dd']").length
			) {
				inputs.push($("[name^='" + req + "yyyy']").val());
				inputs.push($("[name^='" + req + "mm']").val());
				inputs.push($("[name^='" + req + "dd']").val());
			} else {
				$("[name^='" + req + "']").each(function () {
					inputs.push($(this).val());
				});
			}
			
			function isLeapYear(year) {
				var d = new Date(year, 1, 28);
				d.setDate(d.getDate() + 1);
				return d.getMonth() == 1;
			}

			function getAge(date) {
				var d = new Date(date);
				var now = new Date();
				var years = now.getFullYear() - d.getFullYear();
				
				d.setFullYear(d.getFullYear() + years);
				if (d > now) {
					years--;
					d.setFullYear(d.getFullYear() - 1);
				}
				var days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
				return years + days / (isLeapYear(now.getFullYear()) ? 366 : 365);
			}
			
			var dddd = inputs.join("-");
			var age = Math.floor(getAge(dddd));

			return age >= age_req;
		},
		"messages": {
			"ko": "일자 오류."
		}
	});
	// 조건부 필수
	window.Parsley.addValidator("requiredIf", {
		validateString : function(value, requirement) {
			if ($(requirement).val()) {
				return !!value;
			}

			return true;
		}
	});
	// 조건부 필수
	window.Parsley.addValidator("requiredIfEmpty", {
		validateString : function(value, requirement) {
			if ($(requirement).val() == "") {
				return !!value;
			}

			return true;
		}
	});
}