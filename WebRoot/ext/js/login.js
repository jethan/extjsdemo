Ext.onReady(function() {
			var loginPanel = Ext.create('Ext.form.Panel',{
				url: "AdminServlet?operation=toLogin",
				frame: true,
				title: "管理员登陆",
				buttonAlign: "center",
			    bodyPadding: 5,
				width: 300,
				defaultType: "textfield",
				items: [{
					fieldLabel: "用户名",
					name: "userName",
					allowBlank: false,
					blankText: "用户名不能为空"
				}, {
					xtype: "textfield",
					inputType: "password",
					fieldLabel: "密 &nbsp;&nbsp;码",
					name: "password",
					allowBlank: false,
					blankText: "密码不能为空"
				}],
				buttons: [{
					text: "登录",
					formBind: true, //only enabled once the form is valid
					disabled: true,
					handler: function() {
						var form = this.up("form").getForm();
						if (form.isValid()) {
							form.submit({
								waitMsg: '登陆中,请稍后...',
								success: function(form, action) {
								Ext.Msg.alert('成功', action.result.msg,function(){ 
                                     window.location.href = "ext/default.jsp";
									});
								},
								failure: function(form, action) {
									Ext.Msg.alert("失败", action.result.msg);
								}
							});
						}
					}
				}],
				renderTo: "login"
			});
		});