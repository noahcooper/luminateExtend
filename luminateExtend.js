/* luminateExtend.js | Version: 1.6 (26-NOV-2013) */
(function(e){var t=function(e,t){var n=t||window;if(e){var r=e.split(".");for(var i=0;i<r.length;i++){if(i<r.length-1&&!n[r[i]]){return{}}n=n[r[i]]}}return n},n=function(t){if(t&&e.inArray(t,["es_US","en_CA","fr_CA","en_GB","en_AU"])<0){t="en_US"}return t},r=function(e){if(e){e=n(e);luminateExtend.sessionVars.set("locale",e)}return e},i=function(e,t){return(e?luminateExtend.global.path.secure+"S":luminateExtend.global.path.nonsecure)+"PageServer"+(luminateExtend.global.sessionCookie?";"+luminateExtend.global.sessionCookie:"")+"?pagename=luminateExtend_server&pgwrap=n"+(t?"&"+t:"")},s=function(n,r){if(n.responseFilter&&n.responseFilter.array&&n.responseFilter.filter){if(t(n.responseFilter.array,r)){var i=n.responseFilter.filter.split("==")[0].split("!=")[0].replace(/^\s+|\s+$/g,""),s,o;if(n.responseFilter.filter.indexOf("!=")!=-1){s="nequal";o=n.responseFilter.filter.split("!=")[1]}else if(n.responseFilter.filter.indexOf("==")!=-1){s="equal";o=n.responseFilter.filter.split("==")[1]}if(s&&o){o=o.replace(/^\s+|\s+$/g,"");var u=[],a=false;e.each(luminateExtend.utils.ensureArray(t(n.responseFilter.array,r)),function(e){if(s=="nequal"&&this[i]==o||s=="equal"&&this[i]!=o){a=true}else{u.push(this)}});if(a){var f=n.responseFilter.array.split(".");e.each(r,function(t,n){if(t==f[0]){e.each(n,function(n,i){if(n==f[1]){if(f.length==2){r[t][n]=u}else{e.each(i,function(i,s){if(i==f[2]){if(f.length==3){r[t][n][i]=u}else{e.each(s,function(e,s){if(e==f[3]&&f.length==4){r[t][n][i][e]=u}})}}})}}})}})}}}}var l=e.noop;if(n.callback){if(typeof n.callback==="function"){l=n.callback}else if(n.callback.error&&r.errorResponse){l=n.callback.error}else if(n.callback.success&&!r.errorResponse){l=n.callback.success}}if(!(n.data.indexOf("&method=login")!=-1&&n.data.indexOf("&method=loginTest")==-1||n.data.indexOf("&method=logout")!=-1)){l(r)}else{var c=function(){l(r)};luminateExtend.api.getAuth({callback:c,useCache:false,useHTTPS:n.useHTTPS})}};window.luminateExtend=function(e){luminateExtend.init(e||{})};luminateExtend.library={version:"1.6"};luminateExtend.global={update:function(t,n){if(t){if(t.length){if(n){if(t=="locale"){n=r(n)}luminateExtend.global[t]=n}}else{if(t.locale){t.locale=r(t.locale)}luminateExtend.global=e.extend(luminateExtend.global,t)}}}};luminateExtend.init=function(t){var n=e.extend({apiCommon:{},auth:{type:"auth"},path:{}},t||{});if(n.locale){n.locale=r(n.locale)}n.supportsCORS=false;if(window.XMLHttpRequest&&e.fn.jquery){var i=new XMLHttpRequest;if("withCredentials"in i){n.supportsCORS=true}}luminateExtend.global=e.extend(luminateExtend.global,n);return luminateExtend};luminateExtend.api=function(e){luminateExtend.api.request(e||{})};luminateExtend.api.bind=function(n){n=n||"form.luminateApi";if(e(n).length>0){e(n).each(function(){if(this.nodeName.toLowerCase()=="form"){e(this).bind("submit",function(n){n.cancelBubble=true;n.returnValue=false;if(n.stopPropagation){n.stopPropagation();n.preventDefault()}if(!e(this).attr("id")){e(this).attr("id","luminateApi-"+(new Date).getTime())}var r=e(this).attr("action"),i=r.split("?"),s=e(this).data("luminateapi"),o=i[0].indexOf("/site/")!=-1?i[0].split("/site/")[1]:i[0],u,a=e(this).attr("enctype"),f=i.length>1?i[1]:"",l="#"+e(this).attr("id"),c=false,h=e(this).attr("method"),p=false;if(s){if(s.callback){u=t(s.callback)}if(s.requiresAuth&&s.requiresAuth=="true"){c=true}if(r.indexOf("https:")==0||window.location.protocol=="https:"&&r.indexOf("http")==-1){p=true}}luminateExtend.api.request({api:o,callback:u,contentType:a,data:f,form:l,requestType:h,requiresAuth:c,useHTTPS:p})})}})}return luminateExtend};luminateExtend.api.getAuth=function(t){var n=e.extend({useCache:true,useHTTPS:false},t||{});if(luminateExtend.api.getAuthLoad){luminateExtend.api.getAuthLoad=false;if(n.useCache&&luminateExtend.global.auth.type&&luminateExtend.global.auth.token){luminateExtend.api.getAuthLoad=true;if(n.callback){n.callback()}}else{var r=function(e){luminateExtend.global.update(e);luminateExtend.api.getAuthLoad=true;if(n.callback){n.callback()}};if(luminateExtend.global.supportsCORS){e.ajax({data:"luminateExtend="+luminateExtend.library.version+"&api_key="+luminateExtend.global.apiKey+"&method=getLoginUrl&response_format=json&v=1.0",dataType:"json",success:function(e){r({auth:{type:"auth",token:e.getLoginUrlResponse.token},sessionCookie:e.getLoginUrlResponse.url.split(";")[1]})},url:(n.useHTTPS?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"CRConsAPI",xhrFields:{withCredentials:true}})}else{e.ajax({dataType:"jsonp",success:r,url:i(n.useHTTPS,"action=getAuth&callback=?")})}}}else{var s=function(){luminateExtend.api.getAuth(n)},o=setTimeout(s,1e3)}};luminateExtend.api.getAuthLoad=true;luminateExtend.api.request=function(t){var n=e.extend({contentType:"application/x-www-form-urlencoded",data:"",requestType:"GET",requiresAuth:false,useHashTransport:false,useHTTPS:null},t||{});var r=["addressbook","advocacy","connect","cons","content","datasync","donation","email","group","orgevent","recurring","survey","teamraiser"];if(e.inArray(n.api.toLowerCase(),r)>=0){n.api="CR"+n.api.charAt(0).toUpperCase()+n.api.slice(1).toLowerCase()+"API";n.api=n.api.replace("Addressbook","AddressBook").replace("Datasync","DataSync").replace("Orgevent","OrgEvent")}if(luminateExtend.global.path.nonsecure&&luminateExtend.global.path.secure&&luminateExtend.global.apiKey&&n.api){if(n.contentType!="multipart/form-data"){n.contentType="application/x-www-form-urlencoded"}n.data="luminateExtend="+luminateExtend.library.version+(n.data==""?"":"&"+n.data);if(n.form&&e(n.form).length>0){n.data+="&"+e(n.form).eq(0).serialize()}if(n.data.indexOf("&api_key=")==-1){n.data+="&api_key="+luminateExtend.global.apiKey}if(luminateExtend.global.apiCommon.centerId&&n.data.indexOf("&center_id=")==-1){n.data+="&center_id="+luminateExtend.global.apiCommon.centerId}if(luminateExtend.global.apiCommon.categoryId&&n.data.indexOf("&list_category_id=")==-1){n.data+="&list_category_id="+luminateExtend.global.apiCommon.categoryId}if(n.data.indexOf("&response_format=xml")!=-1){n.data=n.data.replace(/&response_format=xml/g,"&response_format=json")}else if(n.data.indexOf("&response_format=")==-1){n.data+="&response_format=json"}if(luminateExtend.global.apiCommon.source&&n.data.indexOf("&source=")==-1){n.data+="&source="+luminateExtend.global.apiCommon.source}if(luminateExtend.global.apiCommon.subSource&&n.data.indexOf("&sub_source=")==-1){n.data+="&sub_source="+luminateExtend.global.apiCommon.subSource}if(n.data.indexOf("&suppress_response_codes=")==-1){n.data+="&suppress_response_codes=true"}if(luminateExtend.global.locale&&n.data.indexOf("&s_locale=")==-1){n.data+="&s_locale="+luminateExtend.global.locale}if(n.data.indexOf("&v=")==-1){n.data+="&v=1.0"}n.requestType=n.requestType.toLowerCase()=="post"?"POST":"GET";var o="http://",u=luminateExtend.global.path.nonsecure.split("http://")[1];if(n.api=="CRDonationAPI"||n.api=="CRTeamraiserAPI"||n.api!="CRConnectAPI"&&(window.location.protocol=="https:"&&n.useHTTPS==null||n.useHTTPS==true)){n.useHTTPS=true}else{n.useHTTPS=false}if(n.useHTTPS){o="https://",u=luminateExtend.global.path.secure.split("https://")[1]}o+=u+n.api;var a=false,f=false,l=false;if(window.location.protocol==o.split("//")[0]&&document.domain==u.split("/")[0]&&!n.useHashTransport){a=true,f=true}else{if(luminateExtend.global.supportsCORS&&!n.useHashTransport){f=true}else if("postMessage"in window&&!n.useHashTransport){l=true}}var c;if(f){c=function(){if(n.requiresAuth&&n.data.indexOf("&"+luminateExtend.global.auth.type+"=")==-1){n.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token}if(luminateExtend.global.sessionCookie){o+=";"+luminateExtend.global.sessionCookie}n.data+="&ts="+(new Date).getTime();e.ajax({contentType:n.contentType,data:n.data,dataType:"json",success:function(e){s(n,e)},type:n.requestType,url:o,xhrFields:{withCredentials:true}})}}else if(l){c=function(){var t=(new Date).getTime(),r="luminateApiPostMessage"+t,u=i(n.useHTTPS,"action=postMessage");if(n.requiresAuth&&n.data.indexOf("&"+luminateExtend.global.auth.type+"=")==-1){n.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token}n.data+="&ts="+t;if(!luminateExtend.api.request.postMessageEventHandler){luminateExtend.api.request.postMessageEventHandler={};luminateExtend.api.request.postMessageEventHandler.handler=function(t){var n=e.parseJSON(t.data),r=n.postMessageFrameId,i=e.parseJSON(decodeURIComponent(n.response));if(luminateExtend.api.request.postMessageEventHandler[r]){luminateExtend.api.request.postMessageEventHandler[r](r,i)}};if(typeof window.addEventListener!="undefined"){window.addEventListener("message",luminateExtend.api.request.postMessageEventHandler.handler,false)}else if(typeof window.attachEvent!="undefined"){window.attachEvent("onmessage",luminateExtend.api.request.postMessageEventHandler.handler)}}luminateExtend.api.request.postMessageEventHandler[r]=function(t,r){s(n,r);e("#"+t).remove();delete luminateExtend.api.request.postMessageEventHandler[t]};e("body").append('<iframe style="position: absolute; top: 0; left: -999em;" '+'name="'+r+'" id="'+r+'">'+"</iframe>");e("#"+r).bind("load",function(){var t="{"+'"postMessageFrameId": "'+e(this).attr("id")+'", '+'"requestUrl": "'+o+'", '+'"requestContentType": "'+n.contentType+'", '+'"requestData": "'+n.data+'", '+'"requestType": "'+n.requestType+'"'+"}",r=o.split("/site/")[0].split("/admin/")[0];document.getElementById(e(this).attr("id")).contentWindow.postMessage(t,r)});e("#"+r).attr("src",u)}}else{c=function(){var t=(new Date).getTime(),r="luminateApiHashTransport"+t,u=i(n.useHTTPS,"action=hashTransport"),a=window.location.protocol+"//"+document.domain+"/luminateExtend_client.html";if(n.requiresAuth&&n.data.indexOf("&"+luminateExtend.global.auth.type+"=")==-1){n.data+="&"+luminateExtend.global.auth.type+"="+luminateExtend.global.auth.token}n.data+="&ts="+t;u+="#&hashTransportClientUrl="+encodeURIComponent(a)+"&hashTransportFrameId="+r+"&requestUrl="+encodeURIComponent(o)+"&requestContentType="+encodeURIComponent(n.contentType)+"&requestData="+encodeURIComponent(n.data)+"&requestType="+n.requestType;if(!luminateExtend.api.request.hashTransportEventHandler){luminateExtend.api.request.hashTransportEventHandler={};luminateExtend.api.request.hashTransportEventHandler.handler=function(e,t){if(luminateExtend.api.request.hashTransportEventHandler[e]){luminateExtend.api.request.hashTransportEventHandler[e](e,t)}}}luminateExtend.api.request.hashTransportEventHandler[r]=function(t,r){s(n,r);e("#"+t).remove();delete luminateExtend.api.request.hashTransportEventHandler[t]};e("body").append('<iframe style="position: absolute; top: 0; left: -999em;" '+'name="'+r+'" id="'+r+'" '+'src="'+u+'"></iframe>')}}if(n.requiresAuth||!f&&!a&&!luminateExtend.global.sessionCookie){luminateExtend.api.getAuth({callback:c,useHTTPS:n.useHTTPS})}else{c()}}};luminateExtend.sessionVars={set:function(e,t,n){var r={};if(n){r.callback=n}if(e){r.data="s_"+e+"="+(t||"");luminateExtend.utils.ping(r)}}};luminateExtend.tags=function(e,t){luminateExtend.tags.parse(e,t)};luminateExtend.tags.parse=function(n,r){if(!n||n=="all"){n=["cons"]}else{n=luminateExtend.utils.ensureArray(n)}r=r||"body";e.each(n,function(){if(n=="cons"){var i=e(r).find(document.getElementsByTagName("luminate:cons"));if(i.length>0){var s=function(n){i.each(function(){if(n.getConsResponse){e(this).replaceWith(t(e(this).attr("field"),n.getConsResponse))}else{e(this).remove()}})};luminateExtend.api.request({api:"cons",callback:s,data:"method=getUser",requestType:"POST",requiresAuth:true})}}})};luminateExtend.utils={ensureArray:function(t){if(e.isArray(t)){return t}else{return[t]}},ping:function(t){var n=e.extend({data:null},t||{});var r="luminatePing"+(new Date).getTime();e("body").append('<img style="position: absolute; left: -999em; top: 0;" '+'id="'+r+'" />');e("#"+r).bind("load",function(){e(this).remove();if(n.callback){n.callback()}});e("#"+r).attr("src",(window.location.protocol=="https:"?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"EstablishSession?"+(n.data==null?"":n.data+"&")+"NEXTURL="+encodeURIComponent((window.location.protocol=="https:"?luminateExtend.global.path.secure:luminateExtend.global.path.nonsecure)+"PixelServer"))},simpleDateFormat:function(t,r,i){i=i||luminateExtend.global.locale;i=n(i);r=r||(e.inArray(i,["en_CA","fr_CA","en_GB","en_AU"])>=0?"d/M/yy":"M/d/yy");t=t||new Date;if(!(t instanceof Date)){var s=t.split("T")[0].split("-"),o=t.split("T").length>1?t.split("T")[1].split(".")[0].split("Z")[0].split("-")[0].split(":"):["00","00","00"];t=new Date(s[0],s[1]-1,s[2],o[0],o[1],o[2])}var u=function(e){e=""+e;return e.indexOf("0")==0&&e!="0"?e.substring(1):e},a=function(e){e=Number(e);return isNaN(e)?"00":(e<10?"0":"")+e},f={month:a(t.getMonth()+1),date:a(t.getDate()),year:a(t.getFullYear()),day:t.getDay(),hour24:t.getHours(),hour12:t.getHours(),minutes:a(t.getMinutes()),ampm:"AM"};if(f.hour24>11){f.ampm="PM"}f.hour24=a(f.hour24);if(f.hour12==0){f.hour12=12}if(f.hour12>12){f.hour12=f.hour12-12}f.hour12=a(f.hour12);var l,c=function(e){var t=e.replace(/yy+(?=y)/g,"yy").replace(/MMM+(?=M)/g,"MMM").replace(/d+(?=d)/g,"d").replace(/EEE+(?=E)/g,"EEE").replace(/a+(?=a)/g,"").replace(/k+(?=k)/g,"k").replace(/h+(?=h)/g,"h").replace(/m+(?=m)/g,"m"),n=t.replace(/yyy/g,f.year).replace(/yy/g,f.year.substring(2)).replace(/y/g,f.year).replace(/dd/g,f.date).replace(/d/g,u(f.date)),r=function(e,t,n){for(var r=1;r<e.length;r++){if(!isNaN(e[r].substring(0,1))){var i=e[r].substring(0,2);e[r]=e[r].substring(2);if(isNaN(i.substring(1))){e[r]=i.substring(1)+e[r];i=i.substring(0,1)}i=Number(i);if(i>23){i=23}var s=n=="+"?i:0-i;if(t=="kk"||t=="k"){s=Number(f.hour24)+s;if(s>24){s=s-24}else if(s<0){s=s+24}}else{s=Number(f.hour12)+s;if(s>24){s=s-24}else if(s<0){s=s+24}if(s>12){s=s-12}}s=""+s;if(t=="kk"||t=="hh"){s=a(s)}if(t=="h"&&s==0||t=="hh"&&s=="00"){s="12"}e[r]=s+e[r]}}return e.join("")};if(n.indexOf("k+")!=-1){n=r(n.split("kk+"),"kk","+");n=r(n.split("k+"),"k","+")}if(n.indexOf("k-")!=-1){n=r(n.split("kk-"),"kk","-");n=r(n.split("k-"),"k","-")}n=n.replace(/kk/g,f.hour24).replace(/k/g,u(f.hour24));if(n.indexOf("h+")!=-1){n=r(n.split("hh+"),"hh","+");n=r(n.split("h+"),"h","+")}if(n.indexOf("h-")!=-1){n=r(n.split("hh-"),"hh","-");n=r(n.split("h-"),"h","-")}n=n.replace(/hh/g,f.hour12<12&&f.hour12.indexOf&&f.hour12.indexOf("0")!=0?"0"+f.hour12:f.hour12).replace(/h/g,u(f.hour12));n=n.replace(/mm/g,f.minutes).replace(/m/g,u(f.minutes));n=n.replace(/a/g,"A");var s=["January","February","march","april","may","June","July","august","September","October","November","December"];if(i=="es_US"){s=["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]}if(i=="fr_CA"){s=["janvier","f&"+"#233;vrier","mars","avril","mai","juin","juillet","ao&"+"#251;t","septembre","octobre","novembre","d&"+"#233;cembre"]}n=n.replace(/MMMM/g,s[Number(f.month)-1]).replace(/MMM/g,s[Number(f.month)-1].substring(0,3)).replace(/MM/g,f.month).replace(/M/g,u(f.month)).replace(/march/g,"March").replace(/may/g,"May").replace(/Mayo/g,"mayo");var o=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];if(i=="es_US"){o=["domingo","lunes","martes","mi&"+"eacute;rcoles","jueves","viernes","s&"+"aacute;bado"]}if(i=="fr_CA"){o=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"]}n=n.replace(/EEEE/g,o[f.day]).replace(/EEE/g,o[f.day].substring(0,3)).replace(/EE/g,o[f.day].substring(0,3)).replace(/E/g,o[f.day].substring(0,3));n=n.replace(/A/g,f.ampm).replace(/april/g,"April").replace(/august/g,"August");return n};if(r.indexOf("'")==-1){l=c(r)}else{var h=r.replace(/\'+(?=\')/g,"''").split("''");if(h.length==1){h=r.split("'");for(var p=0;p<h.length;p++){if(p%2==0){h[p]=c(h[p])}}return h.join("")}else{for(var p=0;p<h.length;p++){var d=h[p].split("'");for(var v=0;v<d.length;v++){if(v%2==0){d[v]=c(d[v])}}h[p]=d.join("")}return h.join("'")}}return l}}})(typeof jQuery==="undefined"&&typeof Zepto==="function"?Zepto:jQuery)