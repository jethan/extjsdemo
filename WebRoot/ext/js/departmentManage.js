Ext.onReady(function() {
	        var pageSize = 10;
			var cm = Ext.grid.ColumnModel([new Ext.grid.RowNumberer(),
					{
						header:'部门名称',
						dataIndex : 'dName'
					},
					{
						header:'部门简介',
						dataIndex : 'description'
					}]);
			 var ds = new Ext.data.Store({
				        pageSize: pageSize,
						proxy : new Ext.data.HttpProxy({
									url : '../DepartmentServlet',
									reader : new Ext.data.JsonReader(
									    {
					                        root: 'rows',  //数据list
					                        totalProperty: 'total', //数据总条数
										})
								}),
					    fields: [
								    {
										name : 'dName'
									},
									{
										name : 'description'
									}
							     ]
					});
			var grid = new Ext.grid.GridPanel({
						store : ds,
						columns : cm,
						selModel: Ext.create('Ext.selection.CheckboxModel', { mode: 'SIMPLE' }),
                        selType: "checkboxmodel",
						autoEncode : true, // 提交时是否自动编码 
						autoSizeColumns : true,
//						autoHeight:true,
						loadMask : true,
						trackMouseOver : true,
						viewConfig : {
					       forceFit : true //让grid的列自动填满grid的整个宽度，不用一列一列的设定宽度。
					      },
						bbar: { xtype: "pagingtoolbar", store: ds, displayInfo: true}//分页工具栏
					});
			ds.load({params:{start:0, limit: pageSize}}); 
	        var row;
	        var toolbar = new Ext.toolbar.Toolbar({    
			        renderTo:"toolbar",    
			        autoWidth:true  
		    	});  
			toolbar.add(
				   {
						text :'增加',
						handler : function(){
							insert(ds);
						}
					}, "-", {
						text :'删除',
						handler : function(){
							Del_jbs(ds,grid);
						}
					}, "-", {
						text :'修改',
						handler : function(){
							var record = grid.getSelectionModel().getSelected();
							if (!record) {
								Ext.Msg.alert("提示", "请选择一条记录");
							} else {
								var idValue = record.get("id");
								update(ds,idValue,row);
							}
						}
					},"-",{
						text :'刷新',
						handler : function(){
							ds.load({params:{start:0, limit: pageSize}}); 
						}
					});
			var panel = new Ext.Panel({
						renderTo : 'mainPanel',
						layout : 'fit',//grid panel自动填满center
//						autoHeight:true,
						items : [grid]
					});
});

//插入操作。
insert = function(ds) {
	Ext.QuickTips.init();// 用来提示信息
	Ext.form.Field.prototype.msgTarget = 'side';// 统一指定错误提示方式
	var departmentTxt = new Ext.form.TextField({
				fieldLabel : '部门名称',
				name : 'dName',
				anchor : '98%'
			})
	var descriptionTxt = new Ext.form.TextArea({
				fieldLabel : '部门简介',
				name : 'description',
				anchor : '98%'
			})

	var myForm = new Ext.form.FormPanel({
				labelAlign : 'right',
				labelWidth : 60,
				frame : true,
				items : [{
							xtype : 'fieldset',
							title : '添加部门',
							autoHeight : true,
							autoWidth : true,
							items : [{// 第1行
								layout : 'column',
								items : [{
											columnWidth : 100,
											layout : 'form',
											items : departmentTxt
										}]
							}, {	// 第2行
										layout : 'column',
										items : [{
													columnWidth : 100,
													layout : 'form',
													items : descriptionTxt
												}]
									}]
						}],
				buttons : [{
					text : '提交',
					handler : function() {
						if (myForm.getForm().isValid()) {
							Ext.MessageBox.show({
										msg : '正在提交，请稍等...',
										progressText : 'Saving...',
										width : 300,
										wait : true,
										waitConfig : {
											interval : 200
										},
										icon : 'download',
									animEl : 'saving'
									});
							myForm.form.submit({
										url : "../DepartmentServlet?operation=add",
										method : "POST",
										failure : function(form, action) {
									        if(action.result.result)
									        {
									        	  insert_Win.close();
									        	  Ext.Msg.alert("恭喜",action.result.msg,function(){ 
				                                  ds.reload();
												  });
									        }
									        else
									        {
									        	Ext.MessageBox.alert("错误!", action.result.msg);
									        }
										}
									});
						}
					}
				}, {
					text : '重置',
					handler : function(){
						myForm.form.reset();
					}
				}]
			});
	
	var insert_Win = new Ext.Window({
				plain : true,
				layout : 'form',
				resizable : true, // 改变大小
				draggable : true, // 不允许拖动
				closeAction : 'close',// 可被关闭 close or hide
				modal : true, // 模态窗口
				width : 300,
				autoHeight : true,
				title : '增加记录',
				items : [myForm],// 嵌入数据
				buttonAlign : 'center',
				loadMask : true
			});

	insert_Win.show();

}

////删除操作。
//var Del_jbs = function(ds,grid) {
//        var record = grid.getSelectionModel().getSelected();
//        if (!record) {
//            Ext.Msg.alert("提示", "请选择一条记录");
//        } else {
//        	 	Ext.Msg.confirm("提示","确认删除吗？",function(id){
//        	 if (id=="yes"){
//        	 Ext.Ajax.request({
//        	 	url : "DepartmentServlet?operation=delete&id="+ record.get("id"),
//            	method:"POST",
//            	success: function(form,action) {
//            		//var flag = Ext.util.JSON.decode(result.responseText).success;
//            			ds.reload();
//                    	Ext.Msg.alert("提示","删除成功");
//                },
//                 failure: function(result) {
//                	Ext.Msg.alert("提示","删除失败");
//                }
//                });
//        	 }
//        	 });
//        }
//	};	
	
////修改操作。
//	update = function(ds,idValue,rowindex) {
//	Ext.QuickTips.init();// 用来提示信息
//	var obj = ds.getAt(rowindex);
//	Ext.form.Field.prototype.msgTarget = 'side';// 统一指定错误提示方式
//	var userTxt = new Ext.form.TextField({
//				fieldLabel : '部门名称',
//				name : 'dName',
//				anchor : '98%'
//			})
//	userTxt.setValue(obj.get('dName'));
//	var descriptionTxt = new Ext.form.TextField({
//				fieldLabel : '部门简介',
//				name : 'description',
//				anchor : '98%'
//			})
//	descriptionTxt.setValue(obj.get('description'));
//	
//	var myForm = new Ext.form.FormPanel({
//				labelAlign : 'right',
//				labelWidth : 60,
//				frame : true,
//				reader : new Ext.data.JsonReader({
//							root : "root"
//						}, [{
//									name : "dName",
//									mapping : 'dName'
//								}, {
//									name : "description",
//									mapping : 'description'
//								}]),
//				items : [{
//							xtype : 'fieldset',
//							title : '修改用户',
//							autoHeight : true,
//							items : [{// 第1行
//								layout : 'column',
//								items : [{
//											columnWidth : 1,
//											layout : 'form',
//											items : userTxt
//										}]
//							}, {	// 第2行
//										layout : 'column',
//										items : [{
//													columnWidth : 1,
//													layout : 'form',
//													items : descriptionTxt
//												}]
//									}]
//						}],
//				buttons : [{
//					text : '提交',
//					handler : function() {
//						if (myForm.getForm().isValid()) {
//							Ext.MessageBox.show({
//										msg : '正在提交，请稍等...',
//										progressText : 'Saving...',
//										width : 300,
//										wait : true,
//										waitConfig : {
//											interval : 200
//										},
//										icon : 'download',
//										animEl : 'saving'
//									});
//							myForm.form.submit({
//										url : "DepartmentServlet?operation=modify&id="+idValue,
//										method : "POST",
//										//params : {
//										//	admin.id : idValue
//										//},
//										success : function(form, action) {
//											//var flag = action.result.success;
//											//if (flag == "true") {
//												Ext.MessageBox.alert("恭喜","提交成功!");
//												insert_Win.close();
//												ds.reload();
//											//}
//										},
//										failure : function(form, action) {
//											Ext.MessageBox.alert("提示!", "提交失败!");
//										}
//									});
//						}
//					}
//				}, {
//					text : '重置',
//					handler : function() {
//						myForm.form.reset();
//					}
//				}]
//			});
//
//	var insert_Win = new Ext.Window({
//				plain : true,
//				layout : 'form',
//				resizable : true, // 改变大小
//				draggable : true, // 不允许拖动
//				closeAction : 'close',// 可被关闭 close or hide
//				modal : true, // 模态窗口
//				width : 200,
//				autoHeight : true,
//				title : '修改记录',
//				items : [myForm],// 嵌入数据
//				buttonAlign : 'center',
//				loadMask : true
//			});
//
//	insert_Win.show();
//}