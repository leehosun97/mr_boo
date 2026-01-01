function show_editor(id) {
	nhn.husky.EZCreator.createInIFrame({
		oAppRef: oEditors,
		elPlaceHolder: id,
		sSkinURI: "/se/SmartEditor2Skin.html",
		htParams : {
			fOnBeforeUnload : function(){}
		},
		fOnAppLoad : function(){
			flag_show_editor = true;
			id_show_editor = id;
		}
	});
}
	
function delQuotes(str){
	return str.replace(/\"/gi, "").trim();
}

function removeLastComma(str) {
	return str.replace(/,(\s+)?$/, '');   
}

function isEmpty(value) {
    if (value=="" || value==null || value==undefined || (value!=null && typeof value=="object" && !Object.keys(value).length)) {
        return true;
    } else {
    	return false;
    }
}

var form2json = function (form) {
	var serialized = [];
	for(let i = 0; i < form.elements.length; i++) {
		var field = form.elements[i];
		if(!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
		if(field.type === 'select-multiple') {
			for(let n = 0; n < field.options.length; n++) {
				if(!field.options[n].selected) continue;
				serialized.push("\""+encodeURIComponent(field.name) + "\":\"" + encodeURIComponent(field.options[n].value)+"\"");
			}
		}else if((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
			serialized.push("\"" + encodeURIComponent(field.name) + "\":\"" + encodeURIComponent(field.value.trim())+"\"");
		}
	}
	return "{" + serialized.join(',') + "}";
};

var serialize = function (form) {
	var serialized = [];
	
	for (let i = 0; i < form.elements.length; i++) {
		var field = form.elements[i];
		
		// Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
		if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
		if (field.type === 'select-multiple') {		// If a multi-select, get all selections
			for (let n = 0; n < field.options.length; n++) {
				if (!field.options[n].selected) continue;
				serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
			}
		} else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {	//Convert field data to a query string
			serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
		}
	}
	return serialized.join('&');
};

function inputTelNumber(str) {
    str = str.replace(/[^0-9]/g, '');
    let tmp = '';

    if(str.substring(0, 2).indexOf('02') == 0) {
    	if (str.length > 10) {
			tmp += str.substr(0, 2) + "-" + str.substr(2, 4) + "-" + str.substr(6, 4);
			return tmp;
		} else {
			if (str.length < 3) {
				return str;
			} else if (str.length < 6) {
				tmp += str.substr(0, 2) + "-" + str.substr(2);
				return tmp;
			} else if (str.length < 10) {
				tmp += str.substr(0, 2) + "-" + str.substr(2, 3) + "-" + str.substr(5);
				return tmp;
			} else {
				tmp += str.substr(0, 2) + "-" + str.substr(2, 4) + "-" + str.substr(6);
				return tmp;
			}
		}
    } else {
        if (str.length < 4) {
            return str;
        } else if (str.length < 7) {
            tmp += str.substr(0, 3) + "-" + str.substr(3);
			return tmp;
        } else if (str.length < 11) {
            tmp += str.substr(0, 3) + "-" + str.substr(3, 3) + "-" + str.substr(6);
			return tmp;
        } else {
            tmp += str.substr(0, 3) + "-" + str.substr(3, 4) + "-" + str.substr(7);
			return tmp;
        }
    }
	return str;
}

function resCheck(v, msg) {
	if ( !(isEmpty(v)) && (v === true || v === "success" || Number(v) > 0) ) swal("Success!", msg, "success");
	else swal("Cancelled", msg, "error");
}

function setHtml(item_id, item_html) {
	obj = document.getElementById(item_id);
	if (obj == null) {
		alert(item_id + ' 찾기 오류');
		return;
	}
	obj.innerHTML = item_html;
}