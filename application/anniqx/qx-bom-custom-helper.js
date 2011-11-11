(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();
  
if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"qx.aspects":false,"qx.debug":false,"qx.globalErrorHandling":false,"qx.optimization.basecalls":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.variants":true,"qx.theme":null};
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
  packages : {"0":{"uris":["__out__:qx-bom.63436a921b7b.js"]}},
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
(function(){var m="toString",k=".",j="default",h="Object",g='"',f="Array",e="()",d="String",c="Function",b=".prototype",L="function",K="Boolean",J="Error",I="constructor",H="warn",G="hasOwnProperty",F="string",E="toLocaleString",D="RegExp",C='\", "',t="info",u="BROKEN_IE",r="isPrototypeOf",s="Date",p="",q="qx.Bootstrap",n="]",o="Class",v="error",w="[Class ",y="valueOf",x="Number",A="count",z="debug",B="ES5";
if(!window.qx){window.qx={};
}qx.Bootstrap={genericToString:function(){return w+this.classname+n;
},createNamespace:function(name,M){var O=name.split(k);
var parent=window;
var N=O[0];

for(var i=0,P=O.length-1;i<P;i++,N=O[i]){if(!parent[N]){parent=parent[N]={};
}else{parent=parent[N];
}}parent[N]=M;
return N;
},setDisplayName:function(Q,R,name){Q.displayName=R+k+name+e;
},setDisplayNames:function(S,T){for(var name in S){var U=S[name];

if(U instanceof Function){U.displayName=T+k+name+e;
}}},define:function(name,V){if(!V){var V={statics:{}};
}var bb;
var Y=null;
qx.Bootstrap.setDisplayNames(V.statics,name);

if(V.members||V.extend){qx.Bootstrap.setDisplayNames(V.members,name+b);
bb=V.construct||new Function;

if(V.extend){this.extendClass(bb,bb,V.extend,name,ba);
}var W=V.statics||{};
for(var i=0,bc=qx.Bootstrap.getKeys(W),l=bc.length;i<l;i++){var bd=bc[i];
bb[bd]=W[bd];
}Y=bb.prototype;
var X=V.members||{};
for(var i=0,bc=qx.Bootstrap.getKeys(X),l=bc.length;i<l;i++){var bd=bc[i];
Y[bd]=X[bd];
}}else{bb=V.statics||{};
}var ba=this.createNamespace(name,bb);
bb.name=bb.classname=name;
bb.basename=ba;
bb.$$type=o;
if(!bb.hasOwnProperty(m)){bb.toString=this.genericToString;
}if(V.defer){V.defer(bb,Y);
}qx.Bootstrap.$$registry[name]=V.statics;
return bb;
}};
qx.Bootstrap.define(q,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var be=true;

if(qx.$$environment&&qx.$$environment["qx.debug"]===false){be=false;
}return be;
})(),getEnvironmentSetting:function(bf){if(qx.$$environment){return qx.$$environment[bf];
}},setEnvironmentSetting:function(bg,bh){if(!qx.$$environment){qx.$$environment={};
}
if(qx.$$environment[bg]===undefined){qx.$$environment[bg]=bh;
}},createNamespace:qx.Bootstrap.createNamespace,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(bi,bj,bk,name,bl){var bo=bk.prototype;
var bn=new Function;
bn.prototype=bo;
var bm=new bn;
bi.prototype=bm;
bm.name=bm.classname=name;
bm.basename=bl;
bj.base=bi.superclass=bk;
bj.self=bi.constructor=bm.constructor=bi;
},getByName:function(name){return qx.Bootstrap.$$registry[name];
},$$registry:{},objectGetLength:({"count":function(bp){return bp.__count__;
},"default":function(bq){var length=0;

for(var br in bq){length++;
}return length;
}})[(({}).__count__==0)?A:j],objectMergeWith:function(bs,bt,bu){if(bu===undefined){bu=true;
}
for(var bv in bt){if(bu||bs[bv]===undefined){bs[bv]=bt[bv];
}}return bs;
},__a:[r,G,E,m,y,I],getKeys:({"ES5":Object.keys,"BROKEN_IE":function(bw){var bx=[];
var bz=Object.prototype.hasOwnProperty;

for(var bA in bw){if(bz.call(bw,bA)){bx.push(bA);
}}var by=qx.Bootstrap.__a;

for(var i=0,a=by,l=a.length;i<l;i++){if(bz.call(bw,a[i])){bx.push(a[i]);
}}return bx;
},"default":function(bB){var bC=[];
var bD=Object.prototype.hasOwnProperty;

for(var bE in bB){if(bD.call(bB,bE)){bC.push(bE);
}}return bC;
}})[typeof (Object.keys)==L?B:(function(){for(var bF in {toString:1}){return bF;
}})()!==m?u:j],getKeysAsString:function(bG){var bH=qx.Bootstrap.getKeys(bG);

if(bH.length==0){return p;
}return g+bH.join(C)+g;
},__b:{"[object String]":d,"[object Array]":f,"[object Object]":h,"[object RegExp]":D,"[object Number]":x,"[object Boolean]":K,"[object Date]":s,"[object Function]":c,"[object Error]":J},bind:function(bI,self,bJ){var bK=Array.prototype.slice.call(arguments,2,arguments.length);
return function(){var bL=Array.prototype.slice.call(arguments,0,arguments.length);
return bI.apply(self,bK.concat(bL));
};
},firstUp:function(bM){return bM.charAt(0).toUpperCase()+bM.substr(1);
},firstLow:function(bN){return bN.charAt(0).toLowerCase()+bN.substr(1);
},getClass:function(bO){var bP=Object.prototype.toString.call(bO);
return (qx.Bootstrap.__b[bP]||bP.slice(8,-1));
},isString:function(bQ){return (bQ!==null&&(typeof bQ===F||qx.Bootstrap.getClass(bQ)==d||bQ instanceof String||(!!bQ&&!!bQ.$$isString)));
},isArray:function(bR){return (bR!==null&&(bR instanceof Array||(bR&&qx.data&&qx.data.IListData&&qx.Bootstrap.hasInterface(bR.constructor,qx.data.IListData))||qx.Bootstrap.getClass(bR)==f||(!!bR&&!!bR.$$isArray)));
},isObject:function(bS){return (bS!==undefined&&bS!==null&&qx.Bootstrap.getClass(bS)==h);
},isFunction:function(bT){return qx.Bootstrap.getClass(bT)==c;
},classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;
},getPropertyDefinition:function(bU,name){while(bU){if(bU.$$properties&&bU.$$properties[name]){return bU.$$properties[name];
}bU=bU.superclass;
}return null;
},hasProperty:function(bV,name){return !!qx.Bootstrap.getPropertyDefinition(bV,name);
},getEventType:function(bW,name){var bW=bW.constructor;

while(bW.superclass){if(bW.$$events&&bW.$$events[name]!==undefined){return bW.$$events[name];
}bW=bW.superclass;
}return null;
},supportsEvent:function(bX,name){return !!qx.Bootstrap.getEventType(bX,name);
},getByInterface:function(bY,ca){var cb,i,l;

while(bY){if(bY.$$implements){cb=bY.$$flatImplements;

for(i=0,l=cb.length;i<l;i++){if(cb[i]===ca){return bY;
}}}bY=bY.superclass;
}return null;
},hasInterface:function(cc,cd){return !!qx.Bootstrap.getByInterface(cc,cd);
},getMixins:function(ce){var cf=[];

while(ce){if(ce.$$includes){cf.push.apply(cf,ce.$$flatIncludes);
}ce=ce.superclass;
}return cf;
},$$logs:[],debug:function(cg,ch){qx.Bootstrap.$$logs.push([z,arguments]);
},info:function(ci,cj){qx.Bootstrap.$$logs.push([t,arguments]);
},warn:function(ck,cl){qx.Bootstrap.$$logs.push([H,arguments]);
},error:function(cm,cn){qx.Bootstrap.$$logs.push([v,arguments]);
},trace:function(co){}}});
})();
(function(){var m="",l="on",k="animationend",j=" ",h="already done.",g="animation",f="animation-play-state",d="@keyframes",c="transform",b=":",bi=") ",bh="(",bg="transform-origin",bf=";",be="undefined",bd="linear",bc="function",bb='WebkitPerspective',ba="origin",Y="@-moz-keyframes",t="-moz-",u="timing",r="repeat",s="Z",p="Anni",q="X",n="qx.bom.Animation",o="}",y='head',z="head",H='style',F="alternate",O="keep",J="Gecko",U="{",S="AppleWebKit/",B='@media (-webkit-transform-3d){#test3d{height:3px}}',X="@-webkit-keyframes",W="alterante",V="} ",A="-webkit-",D='div',E="-moz-transform",G="text/css",I="paused",K="webkitAnimationEnd",P='[object Array]',T="Y",v='test3d',w="running",C="reverse",N="ms ",M="% {",L='perspectiveProperty',R="style",Q="object";
qx.Bootstrap.define(n,{statics:{animate:null,supports3d:null}});
(function(bj){var bl={isArray:function(a){return {}.toString.call(a)==P;
},createSheet:function(){if(typeof document.createStyleSheet===Q){return document.createStyleSheet();
}var bm=document.createElement(R);
bm.type=G;
document.getElementsByTagName(z)[0].appendChild(bm);
return bm.sheet;
},addRule:function(bn,bo,bp){if(typeof bn.insertRule===bc){bn.insertRule(bo+U+bp+o,bn.cssRules.length);
}else{bn.addRule(bo,bp);
}},addListener:function(bq,br,bs,bt){if(bq.addEventListener){bq.addEventListener(br,bs,!!bt);
}else if(bq.attachEvent){bq.attachEvent(l+br,bs);
}else if(typeof bq[l+br]!=be){bq[l+br]=bs;
}},removeListener:function(bu,bv,bw,bx){if(bu.removeEventListener){bu.removeEventListener(bv,bw,!!bx);
}else if(bu.detachEvent){try{bu.detachEvent(l+bv,bw);
}catch(e){if(e.number!==-2146828218){throw e;
}}}else if(typeof bu[l+bv]!=be){bu[l+bv]=null;
}else{}},isWebkit:function(){return window.navigator.userAgent.indexOf(S)!=-1;
},isGecko:function(){return window.controllers&&window.navigator.product===J;
},supports3d:function(){var by=document.createElement(D),bA=false,bz=[L,bb];

for(var i=bz.length-1;i>=0;i--){bA=bA?bA:by.style[bz[i]]!=undefined;
}if(bA){var bB=document.createElement(H);
bB.textContent=B;
document.getElementsByTagName(y)[0].appendChild(bB);
by.id=v;
document.body.appendChild(by);
bA=by.offsetHeight===3;
bB.parentNode.removeChild(bB);
by.parentNode.removeChild(by);
}return bA;
}};
bj.Anni={__fz:null,__fA:{},__fB:p,__cn:0,__fC:{"scale":true,"rotate":true,"skew":true,"translate":true},__fD:[q,T,s],__fE:function(name){if(bl.isGecko()){if(name==c){return E;
}
if(name==d){return Y;
}
if(name==k){return k;
}return (t+name).replace(/-(.)/g,function(x){return x.charAt(1).toUpperCase();
});
}else if(bl.isWebkit()){if(name==d){return X;
}
if(name==k){return K;
}return A+name;
}return name;
},animate:function(bC,bD){this.__fG(bD);

if(!this.__fz){this.__fz=bl.createSheet();
}var bG=bD.keyFrames;
var name=this.__fH(bG,bD.reverse);
var bE=name+j+bD.duration+N+bD.repeat+j+bD.timing+j+(bD.alternate?F:m);
var bF=new bk();
bF.desc=bD;
bF.el=bC;
bC.$$animation=bF;
bl.addListener(bC,this.__fE(k),this.__fF);
bC.style[this.__fE(g)]=bE;
if(bD.origin!=null){bC.style[this.__fE(bg)]=bD.origin;
}return bF;
},__fF:function(e){var bH=e.target;
var bL=bH.$$animation;
var bN=bL.desc;
bH.style[bj.Anni.__fE(g)]=m;

if(bN.origin!=null){bH.style[bj.Anni.__fE(bg)]=m;
}
if(bN.keep!=null){var bK=bN.keyFrames[bN.keep];
var bM={};

for(var bI in bK){if(bI in bj.Anni.__fC){bM[bI]=bK[bI];
}else{bH.style[bI]=bK[bI];
}}var bJ=bj.Anni.__fI(bM);

if(bJ!=m){var bI=bj.Anni.__fE(c);
bH.style[bI]=bJ;
}}bl.removeListener(bH,bj.Anni.__fE(k),bj.Anni.__fF);

if(bL.onEnd){bL.onEnd();
}delete bH.$$animation;
bL.el=null;
bL.ended=true;
},__fG:function(bO){if(!bO.hasOwnProperty(W)){bO.alternate=false;
}
if(!bO.hasOwnProperty(O)){bO.keep=null;
}
if(!bO.hasOwnProperty(C)){bO.reverse=false;
}
if(!bO.hasOwnProperty(r)){bO.repeat=1;
}
if(!bO.hasOwnProperty(u)){bO.timing=bd;
}
if(!bO.hasOwnProperty(ba)){bO.origin=null;
}},__fH:function(frames,bP){var bR=m;
for(var bW in frames){bR+=(bP?-(bW-100):bW)+M;
var bS=frames[bW];
var bV={};
for(var bQ in bS){if(bQ in this.__fC){bV[bQ]=bS[bQ];
}else{bR+=bQ+b+bS[bQ]+bf;
}}var bT=this.__fI(bV);

if(bT!=m){var bQ=this.__fE(c);
bR+=bQ+b+bT+bf;
}bR+=V;
}if(this.__fA[bR]){return this.__fA[bR];
}var name=this.__fB+this.__cn++;
var bU=this.__fE(d)+j+name;
bl.addRule(this.__fz,bU,bR);
this.__fA[bR]=name;
return name;
},__fI:function(bX){var cb=m;

for(var ca in bX){var bY=bX[ca];
if(bl.isArray(bY)){for(var i=0;i<bY.length;i++){if(bY[i]==undefined){continue;
}cb+=ca+this.__fD[i]+bh;
cb+=bY[i];
cb+=bi;
}}else{cb+=ca+bh+bX[ca]+bi;
}}return cb;
},supports3d:bl.supports3d};
function bk(){this.playing=true;
this.ended=false;
}bk.prototype.pause=function(){if(this.el){this.el.style[bj.Anni.__fE(f)]=I;
this.el.$$animation.playing=false;
}else{console.log(h);
}};
bk.prototype.play=function(){if(this.el){this.el.style[bj.Anni.__fE(f)]=w;
this.el.$$animation.playing=true;
}else{console.log(h);
}};
bk.prototype.stop=function(){if(this.el){this.el.style[bj.Anni.__fE(f)]=m;
this.el.style[bj.Anni.__fE(g)]=m;
this.el.$$animation.playing=false;
this.el.$$animation.ended=true;
}else{console.log(h);
}};
qx.bom.Animation.animate=function(cc,cd){bj.Anni.animate.call(bj.Anni,cc,cd);
};
qx.bom.Animation.supports3d=bj.Anni.supports3d;
})({});
})();


qx.$$loader.init();

