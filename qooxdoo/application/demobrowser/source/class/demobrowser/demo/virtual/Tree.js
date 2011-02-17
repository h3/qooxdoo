/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Christian Hagendorn (chris_schmidt)

************************************************************************ */

qx.Class.define("demobrowser.demo.virtual.Tree",
{
  extend : qx.application.Standalone,

  members :
  {
    main: function()
    {
      this.base(arguments);

      // creates the tree
      var tree = new qx.ui.tree.VirtualTree(null, "name", "children").set({
        width : 200,
        height : 400
      });
      this.getRoot().add(tree, {top: 20, left: 20});
      
      // loads the tree model
      var url = "json/tree.json";
      var store = new qx.data.store.Json(url);

      // connect the store and the tree
      store.bind("model", tree, "model");
      
      // opens the 'Desktop' node
      store.addListener("loaded", function() {
        tree.openNode(tree.getModel().getChildren().getItem(0));
      }, this);
      
      
      /* ***********************************************
       * Controlls:
       * ********************************************* */
      
      var button = new qx.ui.form.Button("Update Model");
      button.addListener("execute", function(e) {
        var desktop = tree.getModel().getChildren().getItem(0);
        var trash = desktop.getChildren().getItem(2);
        
        var rawData = [];
        for (var i = 0; i < 10; i++) {
          rawData.push({"name": "File #" + (trash.getChildren().getLength() + i)});
        }
        var newItems = qx.data.marshal.Json.createModel(rawData, true);
        trash.getChildren().append(newItems);
      }, this);
      this.getRoot().add(button, {top: 20, left: 240});
    }
  }
});