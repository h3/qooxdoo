(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.aspects":false,"qx.debug":false,"qx.globalErrorHandling":false,"qx.optimization.statics":true,"qx.optimization.variants":true,"qx.theme":null};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"."},"qx":{"resourceUri":".","sourceUri":"."}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null};
qx.$$locales = {"C":null};
qx.$$packageData = {};

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:qx-bom.7016c03266e5.js"]}},
  urisBefore : [],
  cssBefore : [],
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : true,
  
  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;      
  }
};  

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") {
      elem.onreadystatechange = elem.onload = null;
      callback();
    }
  };
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

function loadCss(uri) {
  var elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type= "text/css";
  elem.href= uri;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }
  var item = list.shift();
  loadScript(item,  function() {
    if (isWebkit) {
      // force async, else Safari fails with a "maximum recursion depth exceeded"
      window.setTimeout(function() {
        loadScriptList(list, callback);
      }, 0);
    } else {
      loadScriptList(list, callback);
    }
  });
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap, callback) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else 
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else 
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
  if (callback){
    callback(dataMap);
  }
}

qx.$$loader.signalStartup = function () 
{
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true; 
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

// Load all stuff
qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.cssBefore.length>0) {
    for (var i=0, m=l.cssBefore.length; i<m; i++) {
      loadCss(l.cssBefore[i]);
    }
  }
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

// Load qooxdoo boot stuff
qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.parts[l.boot][0];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['0']={"locales":{},"resources":{},"translations":{}};
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return "[Class "+this.classname+"]";
},createNamespace:function(name,object){var splits=name.split(".");
var parent=window;
var part=splits[0];

for(var i=0,len=splits.length-1;i<len;i++,part=splits[i]){if(!parent[part]){parent=parent[part]={};
}else{parent=parent[part];
}}parent[part]=object;
return part;
},setDisplayName:function(fcn,classname,name){fcn.displayName=classname+"."+name+"()";
},setDisplayNames:function(functionMap,classname){for(var name in functionMap){var value=functionMap[name];

if(value instanceof Function){value.displayName=classname+"."+name+"()";
}}},define:function(name,config){if(!config){var config={statics:{}};
}var clazz;
var proto=null;
qx.Bootstrap.setDisplayNames(config.statics,name);

if(config.members||config.extend){qx.Bootstrap.setDisplayNames(config.members,name+".prototype");
clazz=config.construct||new Function;

if(config.extend){this.extendClass(clazz,clazz,config.extend,name,basename);
}var statics=config.statics||{};
for(var i=0,keys=qx.Bootstrap.getKeys(statics),l=keys.length;i<l;i++){var key=keys[i];
clazz[key]=statics[key];
}proto=clazz.prototype;
var members=config.members||{};
for(var i=0,keys=qx.Bootstrap.getKeys(members),l=keys.length;i<l;i++){var key=keys[i];
proto[key]=members[key];
}}else{clazz=config.statics||{};
}var basename=this.createNamespace(name,clazz);
clazz.name=clazz.classname=name;
clazz.basename=basename;
clazz.$$type="Class";
if(!clazz.hasOwnProperty("toString")){clazz.toString=this.genericToString;
}if(config.defer){config.defer(clazz,proto);
}qx.Bootstrap.$$registry[name]=config.statics;
return clazz;
}};
qx.Bootstrap.define("qx.Bootstrap",{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var debug=true;

if(qx.$$environment&&qx.$$environment["qx.debug"]===false){debug=false;
}return debug;
})(),getEnvironmentSetting:function(key){if(qx.$$environment){return qx.$$environment[key];
}},setEnvironmentSetting:function(key,value){if(!qx.$$environment){qx.$$environment={};
}
if(qx.$$environment[key]===undefined){qx.$$environment[key]=value;
}},createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(clazz,construct,superClass,name,basename){var superproto=superClass.prototype;
var helper=new Function;
helper.prototype=superproto;
var proto=new helper;
clazz.prototype=proto;
proto.name=proto.classname=name;
proto.basename=basename;
construct.base=clazz.superclass=superClass;
construct.self=clazz.constructor=proto.constructor=clazz;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},__shadowedKeys:["isPrototypeOf","hasOwnProperty","toLocaleString","toString","valueOf","constructor"],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(map){var arr=[];
var hasOwnProperty=Object.prototype.hasOwnProperty;

for(var key in map){if(hasOwnProperty.call(map,key)){arr.push(key);
}}var shadowedKeys=qx.Bootstrap.__shadowedKeys;

for(var i=0,a=shadowedKeys,l=a.length;i<l;i++){if(hasOwnProperty.call(map,a[i])){arr.push(a[i]);
}}return arr;
},"default":function(map){var arr=[];
var hasOwnProperty=Object.prototype.hasOwnProperty;

for(var key in map){if(hasOwnProperty.call(map,key)){arr.push(key);
}}return arr;
}})[typeof (Object.keys)=="function"?"ES5":(function(){for(var key in {toString:1}){return key;
}})()!=="toString"?"BROKEN_IE":"default"],getKeysAsString:function(map){var keys=qx.Bootstrap.getKeys(map);

if(keys.length==0){return "";
}return '"'+keys.join('\", "')+'"';
},__classToTypeMap:{"[object String]":"String","[object Array]":"Array","[object Object]":"Object","[object RegExp]":"RegExp","[object Number]":"Number","[object Boolean]":"Boolean","[object Date]":"Date","[object Function]":"Function","[object Error]":"Error"},bind:function(func,self,varargs){var fixedArgs=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var args=Array.prototype.slice.call(arguments,0,arguments.length);
return func.apply(self,fixedArgs.concat(args));
};
},firstUp:function(str){return str.charAt(0).toUpperCase()+str.substr(1);
},firstLow:function(str){return str.charAt(0).toLowerCase()+str.substr(1);
},getClass:function(value){var classString=Object.prototype.toString.call(value);
return (qx.Bootstrap.__classToTypeMap[classString]||classString.slice(8,-1));
},isString:function(value){return (value!==null&&(typeof value==="string"||qx.Bootstrap.getClass(value)=="String"||value instanceof String||(!!value&&!!value.$$isString)));
},isArray:function(value){return (value!==null&&(value instanceof Array||(value&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(value.constructor,qx.data.IListData))||qx.Bootstrap.getClass(value)=="Array"||(!!value&&!!value.$$isArray)));
},isObject:function(value){return (value!==undefined&&value!==null&&qx.Bootstrap.getClass(value)=="Object");
},isFunction:function(value){return qx.Bootstrap.getClass(value)=="Function";
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(clazz,name){while(clazz){if(clazz.$$properties&&clazz.$$properties[name]){return clazz.$$properties[name];
}clazz=clazz.superclass;
}return null;
},hasProperty:function(clazz,name){return !!qx.Bootstrap.getPropertyDefinition(clazz,name);
},getEventType:function(clazz,name){var clazz=clazz.constructor;

while(clazz.superclass){if(clazz.$$events&&clazz.$$events[name]!==undefined){return clazz.$$events[name];
}clazz=clazz.superclass;
}return null;
},supportsEvent:function(clazz,name){return !!qx.Bootstrap.getEventType(clazz,name);
},getByInterface:function(clazz,iface){var list,i,l;

while(clazz){if(clazz.$$implements){list=clazz.$$flatImplements;

for(i=0,l=list.length;i<l;i++){if(list[i]===iface){return clazz;
}}}clazz=clazz.superclass;
}return null;
},hasInterface:function(clazz,iface){return !!qx.Bootstrap.getByInterface(clazz,iface);
},$$logs:[],debug:function(object,message){qx.Bootstrap.$$logs.push(["debug",arguments]);
},info:function(object,message){qx.Bootstrap.$$logs.push(["info",arguments]);
},warn:function(object,message){qx.Bootstrap.$$logs.push(["warn",arguments]);
},error:function(object,message){qx.Bootstrap.$$logs.push(["error",arguments]);
},trace:function(object){}}});
qx.Bootstrap.define("qx.core.Environment",{statics:{_checks:{},__cache:{},_checksMap:{"engine.version":"qx.bom.client.Engine.getVersion","engine.name":"qx.bom.client.Engine.getName","browser.name":"qx.bom.client.Browser.getName","browser.version":"qx.bom.client.Browser.getVersion","browser.documentmode":"qx.bom.client.Browser.getDocumentMode","browser.quirksmode":"qx.bom.client.Browser.getQuirksMode","runtime.name":"qx.bom.client.Runtime.getName","device.name":"qx.bom.client.Device.getName","locale":"qx.bom.client.Locale.getLocale","locale.variant":"qx.bom.client.Locale.getVariant","os.name":"qx.bom.client.OperatingSystem.getName","os.version":"qx.bom.client.OperatingSystem.getVersion","os.scrollBarOverlayed":"qx.bom.client.Scroll.scrollBarOverlayed","plugin.gears":"qx.bom.client.Plugin.getGears","plugin.activex":"qx.bom.client.Plugin.getActiveX","plugin.quicktime":"qx.bom.client.Plugin.getQuicktime","plugin.quicktime.version":"qx.bom.client.Plugin.getQuicktimeVersion","plugin.windowsmedia":"qx.bom.client.Plugin.getWindowsMedia","plugin.windowsmedia.version":"qx.bom.client.Plugin.getWindowsMediaVersion","plugin.divx":"qx.bom.client.Plugin.getDivX","plugin.divx.version":"qx.bom.client.Plugin.getDivXVersion","plugin.silverlight":"qx.bom.client.Plugin.getSilverlight","plugin.silverlight.version":"qx.bom.client.Plugin.getSilverlightVersion","plugin.flash":"qx.bom.client.Flash.isAvailable","plugin.flash.version":"qx.bom.client.Flash.getVersion","plugin.flash.express":"qx.bom.client.Flash.getExpressInstall","plugin.flash.strictsecurity":"qx.bom.client.Flash.getStrictSecurityModel","plugin.pdf":"qx.bom.client.Plugin.getPdf","plugin.pdf.version":"qx.bom.client.Plugin.getPdfVersion","io.maxrequests":"qx.bom.client.Transport.getMaxConcurrentRequestCount","io.ssl":"qx.bom.client.Transport.getSsl","io.xhr":"qx.bom.client.Transport.getXmlHttpRequest","event.touch":"qx.bom.client.Event.getTouch","event.pointer":"qx.bom.client.Event.getPointer","event.help":"qx.bom.client.Event.getHelp","ecmascript.objectcount":"qx.bom.client.EcmaScript.getObjectCount","html.webworker":"qx.bom.client.Html.getWebWorker","html.filereader":"qx.bom.client.Html.getFileReader","html.geolocation":"qx.bom.client.Html.getGeoLocation","html.audio":"qx.bom.client.Html.getAudio","html.audio.ogg":"qx.bom.client.Html.getAudioOgg","html.audio.mp3":"qx.bom.client.Html.getAudioMp3","html.audio.wav":"qx.bom.client.Html.getAudioWav","html.audio.au":"qx.bom.client.Html.getAudioAu","html.audio.aif":"qx.bom.client.Html.getAudioAif","html.video":"qx.bom.client.Html.getVideo","html.video.ogg":"qx.bom.client.Html.getVideoOgg","html.video.h264":"qx.bom.client.Html.getVideoH264","html.video.webm":"qx.bom.client.Html.getVideoWebm","html.storage.local":"qx.bom.client.Html.getLocalStorage","html.storage.session":"qx.bom.client.Html.getSessionStorage","html.classlist":"qx.bom.client.Html.getClassList","html.xpath":"qx.bom.client.Html.getXPath","html.xul":"qx.bom.client.Html.getXul","html.canvas":"qx.bom.client.Html.getCanvas","html.svg":"qx.bom.client.Html.getSvg","html.vml":"qx.bom.client.Html.getVml","html.dataset":"qx.bom.client.Html.getDataset","html.dataurl":"qx.bom.client.Html.getDataUrl","html.console":"qx.bom.client.Html.getConsole","html.stylesheet.createstylesheet":"qx.bom.client.Stylesheet.getCreateStyleSheet","html.stylesheet.insertrule":"qx.bom.client.Stylesheet.getInsertRule","html.stylesheet.deleterule":"qx.bom.client.Stylesheet.getDeleteRule","html.stylesheet.addimport":"qx.bom.client.Stylesheet.getAddImport","html.stylesheet.removeimport":"qx.bom.client.Stylesheet.getRemoveImport","html.element.contains":"qx.bom.client.Html.getContains","html.element.compareDocumentPosition":"qx.bom.client.Html.getCompareDocumentPosition","html.element.textcontent":"qx.bom.client.Html.getTextContent","json":"qx.bom.client.Json.getJson","css.textoverflow":"qx.bom.client.Css.getTextOverflow","css.placeholder":"qx.bom.client.Css.getPlaceholder","css.borderradius":"qx.bom.client.Css.getBorderRadius","css.borderimage":"qx.bom.client.Css.getBorderImage","css.boxshadow":"qx.bom.client.Css.getBoxShadow","css.gradients":"qx.bom.client.Css.getGradients","css.boxmodel":"qx.bom.client.Css.getBoxModel","css.rgba":"qx.bom.client.Css.getRgba","css.userselect":"qx.bom.client.Css.getUserSelect","css.usermodify":"qx.bom.client.Css.getUserModify","css.appearance":"qx.bom.client.Css.getAppearance","css.float":"qx.bom.client.Css.getFloat","css.boxsizing":"qx.bom.client.Css.getBoxSizing","css.translate3d":"qx.bom.client.CssTransform.get3D","css.animation":"qx.bom.client.CssAnimation.getSupport","css.transform":"qx.bom.client.CssTransform.getSupport","css.transform.3d":"qx.bom.client.CssTransform.get3D","phonegap":"qx.bom.client.PhoneGap.getPhoneGap","phonegap.notification":"qx.bom.client.PhoneGap.getNotification","xml.implementation":"qx.bom.client.Xml.getImplementation","xml.domparser":"qx.bom.client.Xml.getDomParser","xml.selectsinglenode":"qx.bom.client.Xml.getSelectSingleNode","xml.selectnodes":"qx.bom.client.Xml.getSelectNodes","xml.getelementsbytagnamens":"qx.bom.client.Xml.getElementsByTagNameNS","xml.domproperties":"qx.bom.client.Xml.getDomProperties","xml.attributens":"qx.bom.client.Xml.getAttributeNS","xml.createnode":"qx.bom.client.Xml.getCreateNode","xml.getqualifieditem":"qx.bom.client.Xml.getQualifiedItem","xml.createelementns":"qx.bom.client.Xml.getCreateElementNS"},get:function(key){if(qx.DEBUG&&key=="css.translate3d"){qx.Bootstrap.warn("The key 'css.translate3d' is deprecated. "+"Please use 'css.transform.3d' instead.");
}if(this.__cache[key]!=undefined){return this.__cache[key];
}var check=this._checks[key];

if(check){var value=check();
this.__cache[key]=value;
return value;
}var classAndMethod=this._getClassNameFromEnvKey(key);

if(classAndMethod[0]!=undefined){var clazz=classAndMethod[0];
var method=classAndMethod[1];
var value=clazz[method]();
this.__cache[key]=value;
return value;
}if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(key+" is not a valid key. Please see the API-doc of "+"qx.core.Environment for a list of predefined keys.");
qx.Bootstrap.trace(this);
}},_getClassNameFromEnvKey:function(key){var envmappings=this._checksMap;

if(envmappings[key]!=undefined){var implementation=envmappings[key];
var lastdot=implementation.lastIndexOf(".");

if(lastdot>-1){var classname=implementation.slice(0,lastdot);
var methodname=implementation.slice(lastdot+1);
var clazz=qx.Bootstrap.getByName(classname);

if(clazz!=undefined){return [clazz,methodname];
}}}return [undefined,undefined];
},select:function(key,values){return this.__pickFromValues(this.get(key),values);
},__pickFromValues:function(key,values){var value=values[key];

if(values.hasOwnProperty(key)){return value;
}for(var id in values){if(id.indexOf("|")!=-1){var ids=id.split("|");

for(var i=0;i<ids.length;i++){if(ids[i]==key){return values[id];
}}}}
if(values["default"]!==undefined){return values["default"];
}
if(qx.Bootstrap.DEBUG){throw new Error('No match for variant "'+key+'" ('+(typeof key)+' type)'+' in variants ['+qx.Bootstrap.getKeysAsString(values)+'] found, and no default ("default") given');
}},filter:function(map){var returnArray=[];

for(var check in map){if(this.get(check)){returnArray.push(map[check]);
}}return returnArray;
},add:function(key,check){if(this._checks[key]==undefined){if(check instanceof Function){this._checks[key]=check;
}else{this._checks[key]=this.__createCheck(check);
}}},_initDefaultQxValues:function(){this.add("qx.allowUrlSettings",function(){return false;
});
this.add("qx.allowUrlVariants",function(){return false;
});
this.add("qx.propertyDebugLevel",function(){return 0;
});
this.add("qx.debug",function(){return true;
});
this.add("qx.aspects",function(){return false;
});
this.add("qx.dynlocale",function(){return true;
});
this.add("qx.mobile.emulatetouch",function(){return false;
});
this.add("qx.mobile.nativescroll",function(){return false;
});
this.add("qx.dynamicmousewheel",function(){return true;
});
this.add("qx.debug.databinding",function(){return false;
});
this.add("qx.debug.dispose",function(){return false;
});
this.add("qx.optimization.basecalls",function(){return false;
});
this.add("qx.optimization.comments",function(){return false;
});
this.add("qx.optimization.privates",function(){return false;
});
this.add("qx.optimization.strings",function(){return false;
});
this.add("qx.optimization.variables",function(){return false;
});
this.add("qx.optimization.variants",function(){return false;
});
this.add("module.databinding",function(){return true;
});
this.add("module.logger",function(){return true;
});
this.add("module.property",function(){return true;
});
this.add("module.events",function(){return true;
});
},__importFromGenerator:function(){if(qx&&qx.$$environment){for(var key in qx.$$environment){var value=qx.$$environment[key];
this._checks[key]=this.__createCheck(value);
}}},__importFromUrl:function(){if(window.document&&window.document.location){var urlChecks=window.document.location.search.slice(1).split("&");

for(var i=0;i<urlChecks.length;i++){var check=urlChecks[i].split(":");

if(check.length!=3||check[0]!="qxenv"){continue;
}var key=check[1];
var value=decodeURIComponent(check[2]);
if(value=="true"){value=true;
}else if(value=="false"){value=false;
}else if(/^(\d|\.)+$/.test(value)){value=parseFloat(value);
}this._checks[key]=this.__createCheck(value);
}}},__createCheck:function(value){return qx.Bootstrap.bind(function(value){return value;
},null,value);
}},defer:function(statics){statics._initDefaultQxValues();
statics.__importFromGenerator();
if(statics.get("qx.allowUrlSettings")===true){statics.__importFromUrl();
}}});
qx.Bootstrap.define("qx.bom.client.CssAnimation",{statics:{getSupport:function(){var name=qx.bom.client.CssAnimation.getName();

if(name!=null){return {"name":name,"play-state":qx.bom.client.CssAnimation.getPlayState(),"end-event":qx.bom.client.CssAnimation.getAnimationEnd(),"keyframes":qx.bom.client.CssAnimation.getKeyFrames()};
}return null;
},getPlayState:function(){return qx.bom.Style.getPropertyName("AnimationPlayState");
},getName:function(){return qx.bom.Style.getPropertyName("animation");
},getAnimationEnd:function(){var mapping={"MsAnimation":"MSAnimationEnd","WebkitAnimation":"webkitAnimationEnd","MozAnimation":"animationend","OAnimation":"oAnimationEnd"};
return mapping[this.getName()];
},getKeyFrames:function(){var prefixes=qx.bom.Style.VENDOR_PREFIXES;
var keyFrames=[];

for(var i=0;i<prefixes.length;i++){keyFrames.push("@"+qx.lang.String.hyphenate(prefixes[i])+"-keyframes");
}keyFrames.unshift("@keyframes");
var sheet=qx.bom.Stylesheet.createElement();

for(var i=0;i<keyFrames.length;i++){try{qx.bom.Stylesheet.addRule(sheet,keyFrames[i]+" name","");
return keyFrames[i];
}catch(e){}}return null;
}},defer:function(statics){qx.core.Environment.add("css.animation",statics.getSupport);
}});
qx.Bootstrap.define("qx.bom.Style",{statics:{VENDOR_PREFIXES:["Webkit","Moz","O","ms","Khtml"],getPropertyName:function(propertyName){var style=document.documentElement.style;

if(style[propertyName]!==undefined){return propertyName;
}
for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++){var prefixedProp=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(propertyName);

if(style[prefixedProp]!==undefined){return prefixedProp;
}}return null;
}}});
qx.Bootstrap.define("qx.lang.String",{statics:{__stringsMap:{},hyphenate:function(str){var result=this.__stringsMap[str];

if(!result){result=str.replace(/[A-Z]/g,function(match){return ('-'+match.charAt(0).toLowerCase());
});
}return result;
},trim:function(str){return str.replace(/^\s+|\s+$/g,"");
},firstUp:qx.Bootstrap.firstUp}});
qx.Bootstrap.define("qx.bom.Stylesheet",{statics:{createElement:function(text){if(qx.core.Environment.get("html.stylesheet.createstylesheet")){var sheet=document.createStyleSheet();

if(text){sheet.cssText=text;
}return sheet;
}else{var elem=document.createElement("style");
elem.type="text/css";

if(text){elem.appendChild(document.createTextNode(text));
}document.getElementsByTagName("head")[0].appendChild(elem);
return elem.sheet;
}},addRule:function(sheet,selector,entry){if(qx.core.Environment.get("html.stylesheet.insertrule")){sheet.insertRule(selector+"{"+entry+"}",sheet.cssRules.length);
}else{sheet.addRule(selector,entry);
}}}});
qx.Bootstrap.define("qx.bom.client.Stylesheet",{statics:{__getStylesheet:function(){if(!qx.bom.client.Stylesheet.__stylesheet){qx.bom.client.Stylesheet.__stylesheet=qx.bom.Stylesheet.createElement();
}return qx.bom.client.Stylesheet.__stylesheet;
},getCreateStyleSheet:function(){return typeof document.createStyleSheet==="object";
},getInsertRule:function(){return typeof qx.bom.client.Stylesheet.__getStylesheet().insertRule==="function";
},getDeleteRule:function(){return typeof qx.bom.client.Stylesheet.__getStylesheet().deleteRule==="function";
},getAddImport:function(){return (typeof qx.bom.client.Stylesheet.__getStylesheet().addImport==="object");
},getRemoveImport:function(){return (typeof qx.bom.client.Stylesheet.__getStylesheet().removeImport==="object");
}},defer:function(statics){qx.core.Environment.add("html.stylesheet.createstylesheet",statics.getCreateStyleSheet),qx.core.Environment.add("html.stylesheet.insertrule",statics.getInsertRule),qx.core.Environment.add("html.stylesheet.deleterule",statics.getDeleteRule),qx.core.Environment.add("html.stylesheet.addimport",statics.getAddImport);
qx.core.Environment.add("html.stylesheet.removeimport",statics.getRemoveImport);
}});
qx.Bootstrap.define("qx.bom.element.Animation",{statics:{__sheet:null,__rulePrefix:"Anni",__id:0,__rules:{},__transitionKeys:{"scale":true,"rotate":true,"skew":true,"translate":true},__cssAnimationKeys:qx.core.Environment.get("css.animation"),animate:function(el,desc){this.__normalizeDesc(desc);

if(!this.__sheet){this.__sheet=qx.bom.Stylesheet.createElement();
}var keyFrames=desc.keyFrames;
if(this.__cssAnimationKeys!=null){var name=this.__addKeyFrames(keyFrames,desc.reverse);
var style=name+" "+desc.duration+"ms "+desc.repeat+" "+desc.timing+" "+(desc.alternate?"alternate":"");
var eventName=this.__cssAnimationKeys["end-event"];
qx.bom.Event.addNativeListener(el,eventName,this.__onAnimationEnd);
el.style[this.__cssAnimationKeys["name"]]=style;
}var animation=new qx.bom.element.AnimationHandle();
animation.desc=desc;
animation.el=el;
el.$$animation=animation;
if(desc.origin!=null){qx.bom.element.Transform.setOrigin(el,desc.origin);
}if(this.__cssAnimationKeys==null){window.setTimeout(function(){qx.bom.element.Animation.__onAnimationEnd({target:el});
},0);
}return animation;
},__onAnimationEnd:function(e){var el=e.target;
var animation=el.$$animation;
if(!animation){return;
}var desc=animation.desc;

if(qx.bom.element.Animation.__cssAnimationKeys!=null){el.style[qx.bom.element.Animation.__cssAnimationKeys["name"]]="";
qx.bom.Event.removeNativeListener(el,qx.bom.element.Animation.__cssAnimationKeys["name"],qx.bom.element.Animation.__onAnimationEnd);
}
if(desc.origin!=null){qx.bom.element.Transform.setOrigin(el,"");
}
if(desc.keep!=null){qx.bom.element.Animation.__keepFrame(el,desc.keyFrames[desc.keep]);
}delete el.$$animation;
animation.el=null;
animation.ended=true;
var onEnd=animation.getOnEnd();

for(var i=0;i<onEnd.length;i++){onEnd[i].callback.call(onEnd[i].ctx,el);
}},__keepFrame:function(el,endFrame){var transforms;

for(var style in endFrame){if(style in qx.bom.element.Animation.__transitionKeys){if(!transforms){transforms={};
}transforms[style]=endFrame[style];
}else{el.style[style]=endFrame[style];
}}if(transforms){qx.bom.element.Transform.transform(el,transforms);
}},__normalizeDesc:function(desc){if(!desc.hasOwnProperty("alterante")){desc.alternate=false;
}
if(!desc.hasOwnProperty("keep")){desc.keep=null;
}
if(!desc.hasOwnProperty("reverse")){desc.reverse=false;
}
if(!desc.hasOwnProperty("repeat")){desc.repeat=1;
}
if(!desc.hasOwnProperty("timing")){desc.timing="linear";
}
if(!desc.hasOwnProperty("origin")){desc.origin=null;
}},__validateDesc:null,__addKeyFrames:function(frames,reverse){var rule="";
for(var position in frames){rule+=(reverse?-(position-100):position)+"% {";
var frame=frames[position];
var transforms;
for(var style in frame){if(style in this.__transitionKeys){if(!transforms){transforms={};
}transforms[style]=frame[style];
}else{rule+=style+":"+frame[style]+";";
}}if(transforms){rule+=qx.bom.element.Transform.getCss(transforms);
}rule+="} ";
}if(this.__rules[rule]){return this.__rules[rule];
}var name=this.__rulePrefix+this.__id++;
var selector=this.__cssAnimationKeys["keyframes"]+" "+name;
qx.bom.Stylesheet.addRule(this.__sheet,selector,rule);
this.__rules[rule]=name;
return name;
}}});
qx.Bootstrap.define("qx.bom.Event",{statics:{addNativeListener:function(target,type,listener,useCapture){if(target.addEventListener){target.addEventListener(type,listener,!!useCapture);
}else if(target.attachEvent){target.attachEvent("on"+type,listener);
}else if(typeof target["on"+type]!="undefined"){target["on"+type]=listener;
}else{}},removeNativeListener:function(target,type,listener,useCapture){if(target.removeEventListener){target.removeEventListener(type,listener,!!useCapture);
}else if(target.detachEvent){try{target.detachEvent("on"+type,listener);
}catch(e){if(e.number!==-2146828218){throw e;
}}}else if(typeof target["on"+type]!="undefined"){target["on"+type]=null;
}else{}}}});
qx.Bootstrap.define("qx.bom.element.AnimationHandle",{extend:Object,construct:function(){var css=qx.core.Environment.get("css.animation");
this.__playState=css&&css["playstate"];
this.__onEnd=[];
},members:{__playState:null,__playing:false,__ended:false,__onEnd:null,onEnd:function(onEnd,ctx){this.__onEnd.push({ctx:ctx||this,callback:onEnd});
},getOnEnd:function(){return this.__onEnd;
},isPlaying:function(){return this.__playing;
},isEnded:function(){return this.__ended;
},pause:function(){if(this.el){this.el.style[this.__playState]="paused";
this.el.$$animation.__playing=false;
}},play:function(){if(this.el){this.el.style[this.__playState]="running";
this.el.$$animation.__playing=true;
}},stop:function(){if(this.el){this.el.style[this.__playState]="";
this.el.style[qx.core.Environment.get("css.animation").name]="";
this.el.$$animation.__playing=false;
this.el.$$animation.__ended=true;
}}}});
qx.Bootstrap.define("qx.bom.element.Transform",{statics:{__dimensions:["X","Y","Z"],__cssKeys:qx.core.Environment.get("css.transform"),transform:function(el,transforms){var transformCss=this.__mapToCss(transforms);
var style=this.__cssKeys["name"];
el.style[style]=transformCss;
},getCss:function(transforms){var transformCss=this.__mapToCss(transforms);
var style=this.__cssKeys["name"];
return qx.lang.String.hyphenate(style)+":"+transformCss+";";
},setOrigin:function(el,value){el.style[this.__cssKeys["origin"]]=value;
},__mapToCss:function(transforms){var value="";

for(var func in transforms){var params=transforms[func];
if(qx.Bootstrap.isArray(params)){for(var i=0;i<params.length;i++){if(params[i]==undefined){continue;
}value+=func+this.__dimensions[i]+"(";
value+=params[i];
value+=") ";
}}else{value+=func+"("+transforms[func]+") ";
}}return value;
}}});


qx.$$loader.init();

