/* ************************************************************************

   qooxdoo - TreeVirtual Drag & Drop Support Mixin

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Boulanger

************************************************************************ */

/* ************************************************************************

#module(ui.treevirtual)

************************************************************************ */

/**
 * Adds Drag & Drop support to the TreeVirtual.
 *
 * Because the mixin needs to overwrite the default supportsDrop method, this
 * mixin must be applied with "patch" instead of "include":
 *
 * qx.Class.patch(qx.ui.treevirtual.TreeVirtual,qx.ui.treevirtual.MDragAndDropSupport);
 *
 * You also need the MNode Mixin:
 *
 * qx.Class.include(qx.ui.treevirtual.TreeVirtual, qx.ui.treevirtual.MNode);
 *
 * If you want to define your own supportsDrop method, you need to define a supportsDropCallback
 * function in your TreeVirtual instance.
 *
 * The mixin makes it very easy to create a complex drag & drop behaviour. See the tutorial here:
 *
 * http://qooxdoo.org/documentation/0.7/snippets/treevirtual_draganddrop_mixin
 */
qx.Mixin.define("qx.ui.treevirtual.MDragAndDropSupport",
{

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /**
     * enable/disable drag and drop
     */
    enableDragDrop :
    {
      check : "Boolean",
      apply : "_applyEnableDragDrop",
      init : false
    },

    /**
     * set the mimetype of the nodes, defaults to "treevirtualnode"
     * You do not usually have to change this
     */
    dragDataMimeType :
    {
      check :  "String",
      init : "treevirtualnode"
    },

    /**
     * a list of node types allowed to be dragged (separated by comma)
     */
    allowDragTypes :
    {
      check :  "Array",
      nullable: true,
      init : null
    },

    /**
     * drag action
     */
    dragAction :
    {
      check :  ['move','copy','alias'],
      init : 'move'
    },

    /**
     * the name of the data event that is fired with a reference the hovered node
     * after the drag cursor has been hovering over it for the "dragHoverTimeout"
     * number of milliseconds
     **/
    dragHoverEventName :
    {
      check :  "String",
      nullable: true,
      init : "draghover"
    },

    /**
     * the number of milliseconds that the drag cursor has to hover over a node
     * before a the event specified by the "dragHoverEventName" property is fired
     **/
    dragHoverTimeout :
    {
      check :  "Number",
      nullable: true,
      init : 1000
    },

    /**
     * whether it is possible to drop between nodes (i.e., for reordering them).
     * the focus indicator changed to a line to mark where the insertion should take place
     **/
    allowDropBetweenNodes :
    {
      check : "Boolean",
      init: false
    },

    /**
     * the color of the cell focus indicator when hovering on a node
     * this should probably be handled with themes or appearance
     **/
    cellFocusIndicatorColor :
    {
      check : "String",
      init: qx.util.ExtendedColor.toRgbString("lightblue")
    },

    /**
     * the color of the cell focus indicator when hovering on a node
     * this should probably be handled with themes or appearance
     **/
    cellFocusIndicatorColorBetweenNodes :
    {
      check : "String",
      init: "black"
    },

    /**
     * array of two-element arrays containing a combination of drag source and
     * drop target types. Type information is in the nodeTypeProperty of the
     * userData hash map. If null, allow any combination. "*" can be used to as a
     * wildcard, i.e. [ ['Foo','*'] ...] will allow the 'Foo' type node to be dropped on any
     * other type, and [ ['*','Bar'] ...] will allow any type to be dropped on a 'Bar' type node.
     * The array ['*'] will allow any combination, null will deny any drop.
     **/
    allowDropTypes :
    {
      check :  "Array",
      nullable: true,
      init : null
    },

    /**
     * records the target node on which the drag objects has been dropped
     **/
    dropTarget :
    {
      check :  "Object",
      nullable: true,
      init : null
    },

    /**
     * provide a hint on where the node has been dropped
     * (-1 = above the node, 0 = on the node, 1 = below the node)
     **/
    dropTargetRelativePosition :
    {
      check :  [-1,0,1],
      init : 0
    },

    /**
     * Map according to which sorting is done, for example:
     * { "type" : "asc", "dragType" : ['Folder','Message'], "label" : "desc" }
     * will sort the nodes by type, data.MDragAndDropSupport.type and label
     **/
    sortChildNodesBy :
    {
      check :  "Object",
      nullable: true,
      init : null
    },

    /**
     * whether a nodes children should be automatically be sorted after a drop
     **/
    sortAfterDrop :
    {
      check :  "Boolean",
      init : false
    }

  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    //---------------------------------------------------------------------------
    // Property manipulation
    //---------------------------------------------------------------------------

    /**
     * enables or disables drag and drop, adds event listeners and does some other initialization stuff
     * if you want to keep this function from adding default event handling functions, add event
     * listeners before you setEnableDragDrop(true).
     */
    _applyEnableDragDrop : function (value, old)
    {
      if ( old && ! value )
      {
        // remove default listeners
        this.removeEventListener("dragstart",this._handleDragStart);
        this.removeEventListener("dragover",this._handleDragOver);
        this.removeEventListener("dragout",this._handleDragOut);
        this.removeEventListener("dragout",this._handleDragDrop);
        this.removeEventListener("dragend",this._handleDragEnd);
      }

      if ( value && ! old )
      {
        // set default mimetype for accepting drag data from other widgets (or from itself)
        var defaultMimeType = this.getDragDataMimeType();
        var dropDataTypes = qx.lang.Array.copy(this.getDropDataTypes()||[]);
        if ( dropDataTypes.indexOf(defaultMimeType) < 0 )
        {
          dropDataTypes.push(defaultMimeType);
          this.setDropDataTypes( dropDataTypes );
        }

        // set default listeners if not set already
        if ( ! this.hasEventListeners ("dragstart") )
        {
          this.addEventListener("dragstart",this._handleDragStart,this);
        }

        if ( ! this.hasEventListeners ("dragover") )
        {
          this.addEventListener("dragover",this._handleDragOver,this);
        }

        if ( ! this.hasEventListeners ("dragout") )
        {
          this.addEventListener("dragout",this._handleDragOut,this);
        }

        if ( ! this.hasEventListeners ("dragdrop") )
        {
          this.addEventListener("dragdrop",this._handleDragDrop,this);
        }

        if ( ! this.hasEventListeners ("dragend") )
        {
          this.addEventListener("dragend",this._handleDragEnd,this);
        }
      }
    },


    //---------------------------------------------------------------------------
    // Shorthand methods
    //---------------------------------------------------------------------------

    /**
     * shorthand method for setting a row focus indicator
     */
    setShowRowFocusIndicator : function (value)
    {
      this.getDataRowRenderer().setHighlightFocusRow(value);
    },

    /**
     * get tree column pane scroller widget
     */
    getTreePaneScroller : function()
    {
        return this._getPaneScrollerArr()[this.getDataModel().getTreeColumn()];
    },

    /**
     * get focus indicator widget
     */
    getCellFocusIndicator : function()
    {
        return this.getTreePaneScroller()._focusIndicator;
    },

    //---------------------------------------------------------------------------
    // event handling functions
    //---------------------------------------------------------------------------

    /**
     * Handles event fired whe a drag session starts.
     * To replace this handler, define and add your custom event listener before you setEnableDragDrop(true).
     * @param event {Object} the drag event fired
     */
    _handleDragStart : function(event)
    {
      var selection = this.getDataModel().getSelectedNodes();
      var types = this.getAllowDragTypes();

      if (types === null) return false;

      if (types[0] != "*" )
      {
        // check for allowed types for all of he selection, i.e. if one
        // doesn't match, drag is not allowed.
        for (var i=0; i<selection.length; i++)
        {
          var type = null;
          try
          {
            type = selection[i].data.MDragAndDropSupport.type;
          }
          catch(e){}

          // type is not among the allowed types, do not allow drag
          if ( types.indexOf(type) < 0 ) return false;
        }
      }

     // prepare drag data
      var dragData = {
        'nodeData' : selection,
        'sourceWidget' : this
      };

      event.addData(this.getDragDataMimeType(), dragData);
      event.addAction(this.getDragAction());
      event.startDrag();
     },

    /**
     * Handles event fired when a drag occurs over the widget
     * To replace this handler, define and add your custom event listener before you setEnableDragDrop(true).
     */
    _handleDragOver : function (event)
    {
      // currently not used
    },

    /**
     * handles event fired when the mouse hovers over a node for a the number of milliseconds
     * specified in the dragHoverTimeout property
     */
    _handleDragHover : function (event)
    {
      // currently not used
    },

    /**
     * Handles the event fired when the cursor leaves the widget during a drag session.
     * To replace this handler, define and add your custom event listener before you setEnableDragDrop(true).
     */
    _handleDragOut : function ()
    {
      this.getCellFocusIndicator().setBackgroundColor(this.getCellFocusIndicatorColor());
    },

    /**
     * Handles the event fired when the mouse button is released over a legitmate drop target
     * To replace this handler, define and add your custom event listener before you setEnableDragDrop(true).
     */
    _handleDragDrop : function ()
    {
      // currently not used
    },

    /**
     * Handles the event fired when a drag session ends (with or without drop).
     * To replace this handler, define and add your custom event listener before you setEnableDragDrop(true).
     */
    _handleDragEnd : function ()
    {
      this.getCellFocusIndicator().setBackgroundColor(this.getCellFocusIndicatorColor());
    },

    //---------------------------------------------------------------------------
    // Methods handling dropping and hovering
    //---------------------------------------------------------------------------

    /**
     * gets information on the drag session after the drop has occurred
     * @param event {Object} the drag event fired
     * @return {Object} map with the following information:
     * {
     *  'nodeData' : an array of selected nodes in the source widget, i.e. those nodes which were dragged,
     *  'sourceWidget' : the source widget,
     *  'targetNode' : the node on which the data was dropped,
     *  'position' : the relative position of the drop action: -1 = above, 0=on, 1= below the node
     * }
     */
    getDropData : function(event)
    {
      var dragData = event.getData(this.getDragDataMimeType());
      return {
        'nodeData' : dragData.nodeData,
        'sourceWidget' : dragData.sourceWidget,
        'targetNode' : this.getDropTarget(),
        'position' : this.getDropTargetRelativePosition()
      }
    },

    /**
     * overrides supportsDrop method. you can hook in your custom supportsDrop method by
     * defining a supportsDropCallback function in your TreeVirtual instance. Both must
     * return true for a drop to be allowed.
     * @param dragCache {Object}
     *    a temporary and incomplete copy of the drag event
     * @return {Boolean} whether drop is allowed
     */
    supportsDrop : function(dragCache)
    {
      var result = this.checkDrop(dragCache);
      if ( typeof this.supportsDropCallback == "function" ){
        result = result && this.supportsDropCallback(dragCache);
      }
      return result;
    },

    /**
     * the main method of this mixin, providing a check on whether drop is allowed, displaying a
     * insertion cursor for drop-between-nodes
     * @param dragCache {Object}
     *    a temporary and incomplete copy of the drag event
     * @return {Boolean} whether drop is allowed
     */
    checkDrop : function(dragCache)
    {
        // pane scroller widget takes care of mouse events
        var scroller = this.getTreePaneScroller();

        // calculate row and mouse Y position within row
        var paneClipperElem = scroller._paneClipper.getElement();
        var paneClipperTopY = qx.legacy.html.Location.getClientBoxTop(paneClipperElem);
        var rowHeight = scroller.getTable().getRowHeight();
        var scrollY = scroller._verScrollBar.getValue();
        if (scroller.getTable().getKeepFirstVisibleRowComplete()) {
          scrollY = Math.floor(scrollY / rowHeight) * rowHeight;
        }
        var tableY = scrollY + dragCache.pageY - paneClipperTopY;
        var row = Math.floor(tableY / rowHeight);
        var deltaY = tableY % rowHeight;

        // update cell focus indicator
        scroller._focusCellAtPagePos(dragCache.pageX, dragCache.pageY);

        // if dropping "between" nodes is allowed, change focus indicator's height and color
        var dropTargetRelativePosition = 0;
        if ( this.getAllowDropBetweenNodes() )
        {
          var firstRow = scroller._tablePane.getFirstVisibleRow();
          var focusIndicator = this.getCellFocusIndicator();

          if ( deltaY < 4 || deltaY > (rowHeight-4) )
          {
            // todo: unhardcode color here, this should be themed!
            focusIndicator.setBackgroundColor(this.getCellFocusIndicatorColorBetweenNodes()); // better visibility
            focusIndicator.setHeight(2);

            if ( deltaY < 4 )
            {
              focusIndicator.setTop((row - firstRow) * rowHeight - 2);
              dropTargetRelativePosition = -1;
            }
            else
            {
              focusIndicator.setTop((row - firstRow + 1 ) * rowHeight - 2);
              dropTargetRelativePosition = 1;
            }
          }
          else
          {
            // todo: unhardcode color here, this should be themed!
            focusIndicator.setBackgroundColor(this.getCellFocusIndicatorColor());
            scroller._updateFocusIndicator();
          }
       }

        // drag source
        var sourceData   = qx.legacy.event.handler.DragAndDropHandler
                              .getInstance().getData(this.getDragDataMimeType());
        var sourceNode   = sourceData.nodeData[0]; // use only the first node to determine node type
        var sourceWidget = sourceData.sourceWidget;

        // get and save drag target
        var targetWidget = this;
        var targetRowData = this.getDataModel().getRowData(row);
        if ( ! targetRowData ) return false;
        var targetNode = targetRowData[0];
        var targetParentNode = this.nodeGet(targetNode.parentNodeId);
        this.setDropTarget(targetNode);
        this.setDropTargetRelativePosition(dropTargetRelativePosition);

        // if we are dragging within the same widget
        if ( sourceWidget == targetWidget )
        {
          // prevent drop of nodes on themself
          if ( sourceNode.nodeId == targetNode.nodeId )
          {
            return false;
          }

          // prevent drop of parents on children
          var traverseNode = targetNode;
          while ( traverseNode.parentNodeId )
          {
            if ( traverseNode.parentNodeId == sourceNode.nodeId )
            {
              return false;
            }
            traverseNode = this.nodeGet(traverseNode.parentNodeId);
          }
        }

        // programmatically select node to load children after a timeout
        var dragHoverTimeout = this.getDragHoverTimeout();
        var dragHoverEventName = this.getDragHoverEventName();
        if ( dragHoverTimeout && dragHoverEventName )
        {
          if ( this.__dragHoverTimeoutFunc )
          {
            // cancel timeout if row has changed or if we are dropping between nodes
            if ( row != this.__dragHoverRow || dropTargetRelativePosition )
            {
              window.clearTimeout( this.__dragHoverTimeoutFunc );
              this.__dragHoverTimeoutFunc = null;
            }
          }

          if ( ! this.__dragHoverTimeoutFunc && ! dropTargetRelativePosition)
          {
            // initialize timeout for current row
            this.__dragHoverRow = row;
            _this = this;
            this.__dragHoverTimeoutFunc = window.setTimeout(function(){
              // dispatch event with targetNode with row hint
              targetNode.row = row;
              _this.createDispatchDataEvent(dragHoverEventName,targetNode);
           }, dragHoverTimeout );
          }
        }

        // check legitimate source and target type combinations
        var sourceType = this.getNodeType(sourceNode);
        var targetType = dropTargetRelativePosition ?
                            this.getNodeType(targetParentNode) :
                            this.getNodeType(targetNode);
        var allowDropTypes = this.getAllowDropTypes();

        // allow all drops if null or undefined
        if ( allowDropTypes[0] == "*" )
        {
          return true;
        }

        // check more closely
        for ( var i=0; i< allowDropTypes.length; i++ )
        {
            if ( ( allowDropTypes[i][0] == sourceType || allowDropTypes[i][0] == "*" )
                 &&
                 ( allowDropTypes[i][1] == targetType || allowDropTypes[i][1] == "*" ) )
            {
              return true;
            }
        }
        // do not allow any drop
        return false;
     },

    //---------------------------------------------------------------------------
    // Node manipulation
    //---------------------------------------------------------------------------

    /**
     * gets the (drag) type of a node
     * @param nodeReference {Object|Integer}
     * @return the user-supplied type of the node or null if not set
     */
    getNodeType : function (nodeReference,type)
    {
      try
      {
        return this.nodeGet(nodeReference).data.MDragAndDropSupport.type;
      }
      catch(e)
      {
        return null;
      }
    },

    /**
     * sets the (drag) type of a node
     * @param nodeReference {Object|Integer}
     * @param type {String}
     */
    setNodeType : function (nodeReference,type)
    {
      if (typeof type != "string" )
      {
        this.error("Drag Type must be a string, got " + (typeof type) );
      }
      var node = this.nodeGet(nodeReference);
      if ( ! node.data ) node.data = {};
      if ( ! node.data.MDragAndDropSupport ) node.data.MDragAndDropSupport = {};
      node.data.MDragAndDropSupport.type = type;
    },


    /**
     * moves or copies a node to a different place. if you supply only one argument, it is treated as
     * the result of the getDropData() method. Otherwise use the parameter list below.
     * @param first {Object} "this" if moving within the same tree
     * @param sourceNode {Object}
     * @param targetNode {Object}
     * @param position {Integer}
     *    position source node will be inserted above target if -1,
     *    below target if 1, and as a child if 0 or undefined
     */
    moveNode : function ( first, sourceNode, targetNode, position )
    {
      // one-parameter signature
      if ( arguments.length == 1)
      {
        var sourceWidget = first.sourceWidget,
            sourceNode = first.nodeData[0],
            targetNode = first.targetNode,
            position = first.position;
      }
      else
      {
        var sourceWidget = first;
      }

      // source
      var sourceNodeId = sourceNode.nodeId;
      var sourceParentNode = sourceWidget.nodeGet(sourceNode.parentNodeId);
      var sourceNodeIndex = sourceParentNode.children.indexOf(sourceNodeId);

      // target
      var targetNodeId = targetNode.nodeId;
      var targetParentNodeId = targetNode.parentNodeId || 0;
      var targetParentNode = this.nodeGet(targetParentNodeId);
      if ( ! targetParentNode )
      {
        throw new Error("Request to move a child to a non-existent parent");
      }
      var targetNodeIndex = targetParentNode.children.indexOf(targetNodeId);
      if (targetParentNode.type == qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF)
      {
        throw new Error("Sorry, a LEAF may not have children.");
      }

      // action
      var action = this.getDragAction();

      // if we move a copy or from a different tree, we need to create a new node
      if ( action == "copy" || sourceWidget != this )
      {
        // get a new node id for the copy
        var sourceNodeId = this.getDataModel()._nodeArr.length;

        // Set the data for this node
        var sourceNode = qx.lang.Object.copy(sourceNode);
        sourceNode.nodeId = sourceNodeId;

        // Add this node to the array
        this.getDataModel()._nodeArr.push(sourceNode);

        // handle children
        if ( sourceNode.children.length )
        {
          this.warn("Copying of node children not implemented yet!")
          sourceNode.children=[];
        }
      }

      if ( action == "move" )
      {
        qx.lang.Array.removeAt( sourceParentNode.children, sourceNodeIndex );
        if ( sourceWidget != this )
        {
          sourceWidget.getDataModel().setData();
        }
      }

      // set source node information
      sourceNode.bSelected = false;

      // insert node
      if ( position > 0 )
      {
        // insert source above target
        sourceNode.level = targetNode.level;
        sourceNode.parentNodeId = targetParentNodeId;
        qx.lang.Array.insertAt( targetParentNode.children, sourceNodeId, targetNodeIndex + 1 );
        if ( this.getSortAfterDrop() ) this.sortChildNodes(targetParentNode);
      }
      else if ( position < 0 )
      {
        // insert source below target
        sourceNode.level = targetNode.level;
        sourceNode.parentNodeId = targetParentNodeId;
        qx.lang.Array.insertAt( targetParentNode.children, sourceNodeId, targetNodeIndex );
        if ( this.getSortAfterDrop() ) this.sortChildNodes(targetParentNode);
      }
      else if ( targetNode.type != qx.ui.treevirtual.SimpleTreeDataModel.Type.LEAF )
      {
        // insert source as a child of target
        sourceNode.level = targetNode.level+1;
        sourceNode.parentNodeId = targetNodeId;
        targetNode.children.push( sourceNodeId );
        if ( this.getSortAfterDrop() ) this.sortChildNodes(targetNode);
      }
      this.getDataModel().setData();

      // Return the node we just moved
      return sourceNode;
    },

    /**
     * sorts child nodes according to sortChildNodesBy property
     * @param nodeReference {Object} node whose children should be sorted
     * @param recurse {Boolean} sort recursively
     */
    sortChildNodes : function ( nodeReference, recurse  )
    {
      var sortMap = this.getSortChildNodesBy();
      if ( ! sortMap || this.getAllowDropBetweenNodes() ) return;
      var node = this.nodeGet(nodeReference);
      var _this = this;
      node.children.sort(function(a,b){
        for(var key in sortMap )
        {
           var prop;
           var sortHint = sortMap[key];
           _this.info([prop,typeof sortHint] );

            // property aliases
           switch  ( key )
           {
             case "dragType":
                prop = "data.MDragAndDropSupport.type";
                break;

             default:
                prop = key;
           }

           // get values to compare
           var nodeA = _this.nodeGet(a);
           var nodeB = _this.nodeGet(b);

           try
           {
             var valueA = eval("nodeA."+prop);
             var valueB = eval("nodeB."+prop);
           }
           catch(e)
           {
             continue;
           }

           // do comparison

           // if sort hint is a string, assume that it is either "asc" or "desc"
           if ( typeof sortHint == "string" )
           {
             if ( valueA > valueB ) return sortHint == "asc" ?  1 : -1;
             if ( valueA < valueB ) return sortHint == "asc" ? -1 :  1;
           }
           // if it is an array, elements that appear earlier in the array take
           // precedence over those further back in the array
           if ( typeof sortHint == "object" &&
           sortHint.length )
           {
             _this.info([sortHint,valueA,valueB]);
             if ( sortHint.indexOf(valueA) > sortHint.indexOf(valueB) ) return 1;
             if ( sortHint.indexOf(valueA) < sortHint.indexOf(valueB) ) return -1;
           }
        }
        return 0;
      });

      // recurse into children
      if (recurse)
      {
        node.children.forEach(function(nodeId){
          this.sortChildNodes(this.nodeGet(nodeId),true);
        },this);
      }

      this.getDataModel().setData();
    }
  }
});
