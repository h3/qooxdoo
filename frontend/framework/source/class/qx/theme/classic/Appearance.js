/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
   * Sebastian Werner (wpbasti)
   * Andreas Ecker (ecker)
   * Til Schneider (til132)

************************************************************************* */

/* ************************************************************************

#asset(qx/icon/Oxygen/16/places/folder-open.png)
#asset(qx/icon/Oxygen/16/places/folder.png)
#asset(qx/icon/Oxygen/16/mimetypes/text-plain.png)
#asset(qx/decoration/Classic/*)

************************************************************************* */

/**
 * The classic qooxdoo appearance theme.
 */
qx.Theme.define("qx.theme.classic.Appearance",
{
  title : "Classic",

  appearances :
  {
    /*
    ---------------------------------------------------------------------------
      CORE
    ---------------------------------------------------------------------------
    */

    "widget" : {},
    
    "label" :
    {
      style : function(states)
      {
        return {
          textColor : states.disabled ? "text-disabled" : "undefined"
        };
      }
    },    
    
    "image" :
    {
      style : function(states)
      {
        return {
          opacity : !states.replacement && states.disabled ? 0.3 : 1
        }
      }
    },    
    
    "icon" : {
      include : "image"
    },

    "atom" : {},
    
    "atom/label" : {
      include : "label"
    },
    
    "atom/icon" : {},

    "root" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background",
          textColor : "text",
          font : "default"
        };
      }
    },

    "popup" : {
    },
    
    "tooltip" :
    {
      include : "popup",

      style : function(states)
      {
        return {
          backgroundColor : "tooltip",
          textColor : "tooltip-text",
          decorator : "tooltip",
          padding : [ 1, 3, 2, 3 ]
        };
      }
    },    

    "iframe" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "white",
          decorator : "inset"
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      BUTTON
    ---------------------------------------------------------------------------
    */

    "button" :
    {
      style : function(states)
      {
        if (states.pressed || states.abandoned || states.checked) {
          var decorator = states.focused ? "focused-inset" : "inset";
        } else {
          var decorator = states.focused ? "focused-outset" : "outset";
        }

        if (states.pressed || states.abandoned || states.checked) {
          var padding = [ 4, 3, 2, 5 ];
        } else {
          var padding = [ 3, 4 ];
        }

        return {
          backgroundColor : states.abandoned ? "button-abandoned" : states.hovered ? "button-hovered" : "button",
          decorator : decorator,
          padding : padding
        };
      }
    },
    
    "button/label" : {
      include : "label"
    },
    
    "button/icon" : {
      include : "image"
    },





    /*
    ---------------------------------------------------------------------------
      LIST
    ---------------------------------------------------------------------------
    */

    "list" :
    {
      style : function(states)
      {
        return {
          decorator       : states.focused ? "focused-inset" : "inset",
          backgroundColor : states.focused ? "#F0F4FA" : "white"
        };
      }
    },
    
    "list/pane" : {},
    "list/scrollbar-x" : {},
    "list/scrollbar-y" : {},    
    "list/corner" : {},
    
    
    
    
    /*
    ---------------------------------------------------------------------------
      LIST ITEM
    ---------------------------------------------------------------------------
    */    

    "listitem" :
    {
      style : function(states)
      {
        return {
          gap             : 4,
          padding         : states.lead ? [ 2, 4 ] : [ 3, 5 ],
          backgroundColor : states.selected ? "selected" : "undefined",
          textColor       : states.selected ? "text-selected" : "undefined",
          decorator       : states.lead ? "lead-item" : "undefined"
        };
      }
    },
    
    "listitem/label" : {
      include : "label"
    },
    
    "listitem/icon" : {
      include : "image"
    },
        




    /*
    ---------------------------------------------------------------------------
      FORM FIELDS
    ---------------------------------------------------------------------------
    */

    "textfield" :
    {
      style : function(states)
      {
        return {
          decorator       : states.focused ? "focused-inset" : "inset",
          padding         : [ 2, 3 ],
          textColor       : states.disabled ? "text-disabled" : "undefined",
          backgroundColor : states.disabled ? "#F4F4F4" : states.focused ? "#F0F4FA" : "field"
        };
      }
    },

    "textarea" : {
      include : "textfield"
    },

    "checkbox":
    {
      style : function(states)
      {
        var icon;
        if (states.checked && states.focused) {
          icon = "checkbox-checked-focused";
        } else if (states.checked && states.disabled) {
          icon = "checkbox-checked-disabled";
        } else if (states.checked && states.pressed) {
          icon = "checkbox-checked-pressed";
        } else if (states.checked && states.hovered) {
          icon = "checkbox-checked-hovered";
        } else if (states.checked) {
          icon = "checkbox-checked";
        } else if (states.disabled) {
          icon = "checkbox-disabled";
        } else if (states.focused) {
          icon = "checkbox-focused";
        } else if (states.pressed) {
          icon = "checkbox-pressed";
        } else if (states.hovered) {
          icon = "checkbox-hovered";
        } else {
          icon = "checkbox";
        }

        return {
          icon: "decoration/form/" + icon + ".png",
          gap: 6
        }
      }
    },
    
    "checkbox/label" : {
      include : "label"
    },

    "radiobutton":
    {
      include : "checkbox",

      style : function(states)
      {
        var icon;
        if (states.checked && states.focused) {
          icon = "radiobutton-checked-focused";
        } else if (states.checked && states.disabled) {
          icon = "radiobutton-checked-disabled";
        } else if (states.checked && states.pressed) {
          icon = "radiobutton-checked-pressed";
        } else if (states.checked && states.hovered) {
          icon = "radiobutton-checked-hovered";
        } else if (states.checked) {
          icon = "radiobutton-checked";
        } else if (states.disabled) {
          icon = "radiobutton-disabled";
        } else if (states.focused) {
          icon = "radiobutton-focused";
        } else if (states.pressed) {
          icon = "radiobutton-pressed";
        } else if (states.hovered) {
          icon = "radiobutton-hovered";
        } else {
          icon = "radiobutton";
        }

        return {
          icon: "decoration/form/" + icon + ".png"
        }
      }
    },
    
    "radiobutton/label" : {
      include : "label"
    },
    



    /*
    ---------------------------------------------------------------------------
      SPINNER
    ---------------------------------------------------------------------------
    */

    "spinner" :
    {
      style : function(states)
      {
        return {
          decorator       : states.focused ? "focused-inset" : "inset",
          textColor       : states.disabled ? "text-disabled" : "undefined",
          backgroundColor : "field"
        };
      }
    },

    "spinner/textfield" :
    {
      style : function(states)
      {
        return {
          padding: [1, 3]
        };
      }
    },

    "spinner/upbutton" :
    {
      include : "button",

      style : function(states)
      {
        return {
          icon : "decoration/arrows/up-small.gif",
          padding : states.pressed ? [2, 2, 0, 4] : [1, 3, 1, 3]
        }
      }
    },

    "spinner/downbutton" :
    {
      include : "button",

      style : function(states)
      {
        return {
          icon : "decoration/arrows/down-small.gif",
          padding : states.pressed ? [2, 2, 0, 4] : [1, 3, 1, 3]
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      GROUP BOX
    ---------------------------------------------------------------------------
    */

    "groupbox" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background"
        };
      }
    },

    "groupbox-legend" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background",
          paddingRight    : 4,
          paddingLeft     : 4,
          marginRight     : 10,
          marginLeft      : 10
        };
      }
    },

    "groupbox-frame" :
    {
      style : function(states)
      {
        return {
          padding : [ 12, 9 ],
          decorator  : "groove"
        };
      }
    },

    "checkbox-groupbox-legend" :
    {
      include : "checkbox",

      style : function(states)
      {
        return {
          backgroundColor : "background",
          paddingRight    : 3,
          paddingLeft     : 3,
          marginRight     : 10,
          marginLeft      : 10
        };
      }
    },

    "radiobutton-groupbox-legend" :
    {
      include : "radiobutton",

      style : function(states)
      {
        return {
          backgroundColor : "background",
          paddingRight    : 3,
          paddingLeft     : 3,
          marginRight     : 10,
          marginLeft      : 10
        };
      }
    },





    /*
    ---------------------------------------------------------------------------
      TOOLBAR
    ---------------------------------------------------------------------------
    */

    "toolbar" :
    {
      style : function(states)
      {
        return {
          decorator       : "outset-thin",
          backgroundColor : "background"
        };
      }
    },

    "toolbar-part" : {
    },

    "toolbar-part-handle" :
    {
      style : function(states)
      {
        return {
          decorator : "toolbar-part-handle",
          width     : 4,
          margin    : [ 3, 2 ]
        };
      }
    },

    "toolbar-separator" :
    {
      style : function(states)
      {
        return {
          width     : 1,
          margin    : [ 3, 2 ],
          decorator : "divider-horizontal"
        };
      }
    },

    "toolbar-button" :
    {
      style : function(states)
      {
        if (states.pressed || states.checked || states.abandoned)
        {
          var border = "inset-thin";
          var padding = [ 3, 2, 1, 4 ];
        }
        else if (states.hovered)
        {
          var border = "outset-thin";
          var padding = [ 2, 3 ];
        }
        else
        {
          var border = "undefined";
          var padding = [ 3, 4 ];
        }

        return {
          cursor  : "default",
          decorator : border,
          padding : padding,
          backgroundColor : states.abandoned ? "button-abandoned" : states.checked ? "background-light" : "button"
        };
      }
    },




    /*
    ---------------------------------------------------------------------------
      TABVIEW
    ---------------------------------------------------------------------------
    */

    "tabview" :
    {
      style : function(states)
      {
        return {
          // spacing : -1
        };
      }
    },

    "tabview-bar" : {
      style : function(states)
      {
        return {
          zIndex          : 10,
          paddingLeft     : 10,
          paddingRight    : 10
        }
      }
    },

    "tabview-bar-button-left" :
    {
      include : "button",

      style : function(states)
      {
        return {
          icon : "decoration/arrows/left.gif",
          margin: [1, 0, 1, 1],
          width: 16
        }
      }
    },

    "tabview-bar-button-right" :
    {
      include : "button",

      style : function(states)
      {
        return {
          icon : "decoration/arrows/right.gif",
          margin: [1, 0, 1, 1],
          width: 16
        }
      }
    },

    "tabview-pane" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "tabview-pane",
          decorator       : new qx.ui.decoration.Single(1, "solid", "tabview-border"),
          padding         : 10,
          marginTop       : -1
        };
      }
    },

    "tabview-page" : {
    },

    "tabview-button" :
    {
      style : function(states)
      {
        var paddingTop, paddingBottom, paddingLeft, paddingRight;
        var marginTop, marginBottom, marginRight, marginLeft;
        var backgroundColor, decorator;

        marginTop = 0;
        marginBottom = 0;
        decorator = new qx.ui.decoration.Single(1, "solid", "tabview-border");

        if (states.checked)
        {
          paddingTop = 2;
          paddingBottom = 4;
          paddingLeft = 7;
          paddingRight = 8;
          marginRight = -1;
          marginLeft = -2;
          backgroundColor = "tabview-button-checked";

          if (states.barTop)
          {
            decorator.setWidthBottom(0);
            decorator.setTop(3, "solid", "effect");
          }
          else
          {
            decorator.setWidthTop(0);
            decorator.setBottom(3, "solid", "effect");
          }

          if (states.alignLeft)
          {
            if (states.firstChild)
            {
              paddingLeft = 6;
              paddingRight = 7;
              marginLeft = 0;
            }
          }
          else
          {
            if (states.lastChild)
            {
              paddingLeft = 8;
              paddingRight = 5;
              marginRight = 0;
            }
          }
        }
        else
        {
          paddingTop = 2;
          paddingBottom = 2;
          paddingLeft = 5;
          paddingRight = 6;
          marginRight = 1;
          marginLeft = 0;
          backgroundColor = states.over ? "tabview-button-hover" : "tabview-button";

          if (states.barTop)
          {
            decorator.setWidthBottom(0);
            marginTop = 3;
            marginBottom = 1;
          }
          else
          {
            decorator.setWidthTop(0);
            marginTop = 1;
            marginBottom = 3;
          }

          if (states.alignLeft)
          {
            if (states.firstChild)
            {
              paddingLeft = 6;
              paddingRight = 5;
            }
          }
          else
          {
            if (states.lastChild)
            {
              paddingLeft = 6;
              paddingRight = 5;
              marginRight = 0;
            }
          }
        }

        return {
          padding : [ paddingTop, paddingRight, paddingBottom, paddingLeft ],
          margin : [ marginTop, marginRight, marginBottom, marginLeft ],
          decorator : decorator,
          backgroundColor : backgroundColor
        }
      }
    },





    /*
    ---------------------------------------------------------------------------
      SCROLLBAR
    ---------------------------------------------------------------------------
    */

    "scrollbar" :
    {
      style : function(states)
      {
        return {

        };
      }
    },

    "scrollarea-corner" :
    {
      style : function()
      {
        return {
          backgroundColor : "background",
          width : 0,
          height : 0
        }
      }
    },

    "scrollbar-slider" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background-light"
        }
      }
    },

    "scrollbar-button" :
    {
      include : "button",

      style : function(states)
      {
        var padding;
        if (states.up || states.down)
        {
          if (states.pressed || states.abandoned || states.checked) {
            padding = [ 5, 2, 3, 4 ];
          } else {
            padding = [ 4, 3 ];
          }
        }
        else
        {
          if (states.pressed || states.abandoned || states.checked) {
            padding = [ 4, 3, 2, 5 ];
          } else {
            padding = [ 3, 4 ];
          }
        }

        var icon = "decoration/arrows/";
        if (states.left) {
          icon += "left.gif";
        } else if (states.right) {
          icon += "right.gif";
        } else if (states.up) {
          icon += "up.gif";
        } else {
          icon += "down.gif";
        }

        return {
          padding : padding,
          icon : icon
        }
      }
    },




    /*
    ---------------------------------------------------------------------------
      SLIDER
    ---------------------------------------------------------------------------
    */

    "slider" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background-light",
          decorator : states.focused ? "focused-inset" : "inset"
        }
      }
    },

    "slider-knob" :
    {
      include : "button",

      style : function(states)
      {
        return {
          width: 14,
          height: 14,
          decorator : "outset"
        }
      }
    },




    /*
    ---------------------------------------------------------------------------
      TREE
    ---------------------------------------------------------------------------
    */

    "folder-open-button" :
    {
      style : function(states)
      {
        return {
          source : states.opened
            ? "decoration/tree/minus.gif"
            : "decoration/tree/plus.gif"
        }
      }
    },


    "tree-folder" :
    {
      style : function(states)
      {
        return {
          padding : [2, 3, 2, 0],
          icon : "icon/16/places/folder-open.png",
          iconOpened : "icon/16/places/folder.png"
        }
      }
    },


    "tree-folder-icon" : {
      style : function(states)
      {
        return {
          padding : [0, 4, 0, 0]
        }
      }
    },


    "tree-folder-label" :
    {
      style : function(states)
      {
        return {
          padding : [ 1, 2 ],
          backgroundColor : states.selected ? "selected" : "undefined",
          textColor : states.selected ? "text-selected" : "undefined"
        }
      }
    },


    "tree-file" :
    {
      include : "tree-folder",

      style : function(states)
      {
        return {
          icon : "icon/16/mimetypes/text-plain.png"
        }
      }
    },


    "tree-file-icon" : {
      include : "tree-folder-icon"
    },


    "tree-file-label" : {
      include : "tree-folder-label"
    },


    "tree" :
    {
      include : "list",

      style : function(states)
      {
        return {
          contentPadding : [4, 4, 4, 4]
        }
      }
    },




    /*
    ---------------------------------------------------------------------------
      WINDOW
    ---------------------------------------------------------------------------
    */

    "window" :
    {
      style : function(states)
      {
        return {
          backgroundColor : "background",
          padding : 1,
          decorator : states.maximized ? "undefined" : "outset"
        };
      }
    },
    
    "window/pane" : {},

    "window/captionbar" :
    {
      style : function(states)
      {
        return {
          padding : [ 1, 2, 2 ],
          backgroundColor : states.active ? "window-active-caption" : "window-inactive-caption",
          textColor : states.active ? "window-active-caption-text" : "window-inactive-caption-text"
        };
      }
    },

    "window/resize-frame" :
    {
      style : function(states)
      {
        return {
          decorator : "dark-shadow"
        };
      }
    },

    "window/icon" :
    {
      style : function(states)
      {
        return {
          marginRight : 2
        };
      }
    },

    "window/title" :
    {
      style : function(states)
      {
        return {
          cursor : "default",
          font : "bold",
          marginRight : 2,
          alignY: "bottom"
        };
      }
    },

    "window/minimize-button" :
    {
      include : "button",

      style : function(states)
      {
        return {
          icon : "decoration/window/minimize.gif",
          padding : states.pressed || states.abandoned ? [ 2, 1, 0, 3] : [ 1, 2 ]
        };
      }
    },

    "window/restore-button" :
    {
      include : "button",

      style : function(states)
      {
        return {
          icon : "decoration/window/restore.gif",
          padding : states.pressed || states.abandoned ? [ 2, 1, 0, 3] : [ 1, 2 ]
        };
      }
    },

    "window/maximize-button" :
    {
      include : "button",

      style : function(states)
      {
        return {
          icon : "decoration/window/maximize.gif",
          padding : states.pressed || states.abandoned ? [ 2, 1, 0, 3] : [ 1, 2 ]
        };
      }
    },

    "window/close-button" :
    {
      include : "button",

      style : function(states)
      {
        return {
          marginLeft : 2,
          icon : "decoration/window/close.gif",
          padding : states.pressed || states.abandoned ? [ 2, 1, 0, 3] : [ 1, 2 ]
        };
      }
    },

    "window/statusbar" :
    {
      style : function(states)
      {
        return {
          decorator : "inset-thin"
        };
      }
    },

    "window/statusbar-text" :
    {
      style : function(states)
      {
        return {
          padding : [ 1, 4 ]
        };
      }
    },
    
    
    

    /*
    ---------------------------------------------------------------------------
      RESIZER
    ---------------------------------------------------------------------------
    */

    "resizer" :
    {
      style : function(states)
      {
        return {
          decorator : "outset"
        };
      }
    },

    "resizer-frame" :
    {
      style : function(states)
      {
        return {
          decorator : "dark-shadow"
        };
      }
    },




    /*
    ---------------------------------------------------------------------------
      SPLITPANE
    ---------------------------------------------------------------------------
    */

    "splitpane" :
    {
      style : function(states)
      {
        return {};
      }
    },

    "splitpane/splitter" :
    {
      style : function(states)
      {
        return {
          width : states.horizontal ? 5 : "undefined",
          height : states.vertical ? 5 : "undefined",
          backgroundColor : states.active ? "border-dark-shadow" : "border-dark"
        };
      }
    },

    "splitpane/slider" :
    {
      style : function(states)
      {
        return {
          width : states.horizontal ? 5 : "undefined",
          height : states.vertical ? 5 : "undefined",
          backgroundColor : "border-dark-shadow"
        };
      }
    },
  


    
    /*
    ---------------------------------------------------------------------------
      SELECTBOX
    ---------------------------------------------------------------------------
    */

    "selectbox" : {
      include : "button"
    },

    
    "selectbox/arrow" :
    {
      style : function(states)
      {
        return {
          paddingRight : 4,
          paddingLeft : 5
        };
      }
    },
    
    "selectbox/atom" :  {
      include : "atom"
    },

    "selectbox/atom/label" :  {
      include : "label"
    },
    
    "selectbox/atom/icon" :  {
      include : "icon"
    },
    
    "selectbox/arrow" : {
      include : "image"  
    },    
        
    "selectbox/popup" :  {
      include : "popup"
    },

    "selectbox/list" :  {
      include : "list"
    },
    
    "selectbox/list/pane" : {
      include : "list/pane"  
    },
    

    
    

    /*
    ---------------------------------------------------------------------------
      COMBOBOX
    ---------------------------------------------------------------------------
    */

    "combobox" : {
      include : "spinner"
    },

    "combobox/textfield" : 
    {
      style : function(states)
      {
        return {
          padding: [2, 3]
        };
      }
    },

    "combobox/button" : {
      include : "button"
    },
    
    "combobox/button" : {
      include : "button"  
    },    
        
    "combobox/button/icon" : {
      include : "image"  
    },    

    "combobox/popup" :  {
      include : "popup"
    },

    "combobox/list" :  {
      include : "list"
    },
    
    "combobox/list/pane" : {
      include : "list/pane"  
    }  
  }
});
