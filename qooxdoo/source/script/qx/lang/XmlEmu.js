/* ************************************************************************

   qooxdoo - the new era of web development

   Copyright:
     2004-2006 by 1&1 Internet AG, Germany
     http://www.1und1.de | http://www.1and1.com
     All rights reserved

   License:
     LGPL 2.1: http://creativecommons.org/licenses/LGPL/2.1/

   Internet:
     * http://qooxdoo.org

   Authors:
     * Sebastian Werner (wpbasti)
       <sebastian dot werner at 1und1 dot de>
     * Andreas Ecker (ecker)
       <andreas dot ecker at 1und1 dot de>

************************************************************************ */

/* ************************************************************************

#module(emu)

************************************************************************ */

qx.OO.defineClass("qx.lang.XmlEmu");

/*
  Based on:
  IE7, version 0.9 (alpha) (2005-08-19)
  Copyright: 2004-2005, Dean Edwards (http://dean.edwards.name)
  License: http://creativecommons.org/licenses/LGPL/2.1/
  Modelled after: http://www.mozilla.org/xmlextras
*/

if (qx.sys.Client.isMshtml())
{
  var DOMParser = function() {
    /* empty constructor */
  }

  DOMParser.prototype =
  {
    toString: function() {
      return "[object DOMParser]";
    },

    parseFromString: function(str, contentType)
    {
      var xmlDocument = new ActiveXObject("Microsoft.XMLDOM");
      xmlDocument.loadXML(str);
      return xmlDocument;
    },

    // not supported
    parseFromStream: new Function,
    baseURI: ""
  }

  var XMLSerializer = function() {
    /* empty constructor */
  }

  XMLSerializer.prototype =
  {
    toString: function() {
      return "[object XMLSerializer]";
    },

    serializeToString: function(root) {
      return root.xml || root.outerHTML;
    },

    // not supported
    serializeToStream: new Function
  }
}

// Create a XML dom node
qx.lang.XmlEmu.createXmlDom = function()
{
  // The Mozilla style
  if (document.implementation && document.implementation.createDocument) {
    return document.implementation.createDocument("", "", null);
  }

  // The Microsoft style
  if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLDOM");
  }

  throw new Error("This browser does not support xml dom creation.");
}

// Implementation of selectNodes() and selectSingleNode()
// for Gecko/Mozilla browsers

if (window.XPathEvaluator)
{
  qx.lang.XmlEmu._xpe = new XPathEvaluator();

  if (!Element.prototype.selectSingleNode)
  {
    Element.prototype.selectSingleNode = function (xpath) {
      return qx.lang.XmlEmu._xpe.evaluate(xpath, this, qx.lang.XmlEmu._xpe.createNSResolver(this), XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
  }

  if (!Element.prototype.selectNodes)
  {
    Element.prototype.selectNodes = function (xpath) {
      var result = qx.lang.XmlEmu._xpe.evaluate(xpath, this, qx.lang.XmlEmu._xpe.createNSResolver(this), XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var nodes = [];

      for (var i=0; i<result.snapshotLength; i++) {
        nodes[i] = result.snapshotItem(i);
      }

      return nodes;
    }
  }

  if (!Document.prototype.selectSingleNode)
  {
    Document.prototype.selectSingleNode = function (xpath) {
      return qx.lang.XmlEmu._xpe.evaluate(xpath, this, qx.lang.XmlEmu._xpe.createNSResolver(this), XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
  }

  if (!Document.prototype.selectNodes)
  {
    Document.prototype.selectNodes = function (xpath) {
      var result = qx.lang.XmlEmu._xpe.evaluate(xpath, this, qx.lang.XmlEmu._xpe.createNSResolver(this), XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      var nodes = [];

      for (var i=0; i<result.snapshotLength; i++) {
        nodes[i] = result.snapshotItem(i);
      }

      return nodes;
    }
  }

  Element.prototype.__defineGetter__('text',
    function() {
      var text = "";
      for (var i=0; i<this.childNodes.length; i++) {
        text += this.childNodes[i].text != null ? this.childNodes[i].text : "";
      }
      return text;
    }
  );

  Element.prototype.__lookupGetter__('text');

  Attr.prototype.__defineGetter__('text', function(){ return this.nodeValue; });
  Attr.prototype.__lookupGetter__('text');

  Text.prototype.__defineGetter__('text', function(){ return this.nodeValue; });
  Text.prototype.__lookupGetter__('text');
}
