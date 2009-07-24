/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
qx.Class.define("demobrowser.demo.ui.FormRenderer", 
{
  extend : qx.application.Standalone,

  members :
  {
    main : function() 
    {
      this.base(arguments);
      
      var form = new qx.ui.form.Form();
      form.add(new qx.ui.form.TextField(), "Name");
      form.add(new qx.ui.form.PasswordField(), "Password");
      
      this.getRoot().add(form.createView());
      
    }
  }
});
