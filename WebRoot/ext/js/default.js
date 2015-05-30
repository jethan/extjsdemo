
Ext.onReady(panelLayout);

//视口
function panelLayout()
{
	//新建tabpanel  
	var tab = Ext.create('Ext.TabPanel',
	{
		region : 'center',
		deferredRender : false,
		activeTab : 0,
		resizeTabs : true, // turn on tab resizing  
		minTabWidth : 115,
		tabWidth : 135,
		enableTabScroll : true
	});

    new Ext.Viewport({
        title: "Viewport",
        layout: "border",
        defaults: {
            bodyStyle: "background-color: #FFFFFF;",
            frame: true
        },
        items: [
                {  
		            title : 'West Region is collapsible',  
		            region : 'west',  
		            xtype : 'panel',  
		            width : 150,  
		            collapsible : true, // 设置可折叠  
		            id : 'west-region-container', 
		            layout : 'accordion',  //手风琴，上下可折叠。
		            title : '菜单',  
		            split : true,  //设置可拆分
		            layoutConfig : {  
		                animate : true  
		            },       
		            items : [{  
                        title : '系统管理',  
                        xtype : 'treepanel',  
                        expanded : true,  
                        animate : true,  
                        enableDD : false,  
                        border : false,  
                        containerScroll : true,  
                        root : {  
                            text : '..',  
                            id:'root',  
                            children : [{  
                                text : '部门管理',  
                                id : 'ext/departmentManage.jsp',  
                                leaf : true  
                            }, {  
                                text : '员工管理',  
                                leaf : true,  
                                id : 'ext/staffManage.jsp'  
                            }, {  
                                text : '用户管理',  
                                leaf : true,  
                                id : 'ext/userManage.jsp'  
                            }]  
                        },  
			            listeners:{  
			            itemclick: function(view, record, item, index, event, eOpts){  //添加节点点击事件
			                    var n = tab.getComponent(record.raw.id);  
			                     if(record.raw.id=='root'){  
			                        return;  
			                     }  
                                if (!n) { // 判断是否已经打开该面板  
                                    n = tab.add({  
                                        'id' : record.raw.id,  
                                        'title' : record.raw.text,  
                                         closable : true, // 通过html载入目标页  
                                         html : '<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+record.raw.id+'"></iframe>'  
                                    });  
                                }  
                                tab.setActiveTab(n);  
			               }   
			            }  
		                    },{  
		                        title : '系统设置',  
		                        border : false,  
		                        html : '<div id="tree3" style="overflow:auto;width:100%;height:100%"></div>'  
		                    }]        
                    },tab, 
                    { 
                    	region: "north", 
                    	xtype: "topPanel"
                    },
                    { 
                    	region: "south",
                    	xtype: "footPanel"
                    },
               ]
    });
}

//页面布局topPanel。
Ext.define('topPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.topPanel',
	layout:'fit',
	collapsible: true ,
	height: 100,
    tbar: [{ text: "控制面板", menu: '',style:"margin:0px 9px 0px 4px"}]
});

////左边树菜单data。
//var leftStore = Ext.create('Ext.data.TreeStore', {
//    root: {
//        expanded: true,
//        children: [
//            { 
//            	text: "系统管理", 
//            	expanded: true, 
//            	children: [
//                {
//                	text: "部门管理", 
//                	leaf: true, 
//                },
//                { 
//                	text: "员工管理",
//                	leaf: true,
//                }
//            ] },
//           {  
//	            text : '系统设置',  
//	            border : false,  
//	            html : '<div id="tree3" style="overflow:auto;width:100%;height:100%"></div>'  
//           }
//           ]
//    }
//});
//
////页面布局左。
//Ext.define('letfPanel',{
//	extend:'Ext.tree.Panel',
//	alias:'widget.letfPanel',
//	layout:'fit',
//	title: '导航菜单',
//	width:180,
//	collapsible: true ,
//	rootVisable:false, //不显示根节点
//	store: leftStore,
//	rootVisible: false,
//	listeners: {
//                 itemclick: function(view,record,item,index,eOpts) { 
//                    Ext.Msg.alert('msg',record.get(id));
//                 }
//            }          
//});
//
//var tab = Ext.define('mainPanel',{
//	extend:'Ext.TabPanel',
//	alias:'widget.tabPanel',
//	layout:'fit',
//	id:"center",
//	border: true, 
//	deferredRender : false,  
//    activeTab : 0,  
//    resizeTabs : true, // turn on tab resizing  
//    minTabWidth : 115,  
//    tabWidth : 135,  
//    enableTabScroll : true ,
//	title:'主页' ,
//	html: 'The first tab\'s content. Others may be added dynamically',
//});

//页面布局footPanel。
Ext.define('footPanel',{
	extend:'Ext.panel.Panel',
	alias:'widget.footPanel',
	layout:'fit',
	split: true, 
	border: true,
	height: 30,
	title:'<center>- &copy; CopyRight 2015 - <a href="http://' +
                            	'user.qzone.qq.com/365889459?ADUIN=365889459&ADSESSION=1386079372&ADTAG' +
                            	'=CLIENT.QQ.5275_MyTip.0&ADPUBNO=26274&ptlang=2052" target="_blank">发仔客' +
                            	'&ldquo;站&rdquo;</a> -></center>'
});