/**
 * Plugin for adding a close context menu to tabs. Note that the menu respects
 * the closable configuration on the tab. As such, commands like remove others
 * and remove all will not remove items that are not closable.
 */
Ext.define('Ext.ux.TabCloseMenu', {
    alias: 'plugin.tabclosemenu',

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {String} closeTabText
     * The text for closing the current tab.
     */
    closeTabText: '关闭当前页签',

    /**
     * @cfg {Boolean} showCloseOthers
     * Indicates whether to show the 'Close Others' option.
     */
    showCloseOthers: true,

    /**
     * @cfg {String} closeOthersTabsText
     * The text for closing all tabs except the current one.
     */
    closeOthersTabsText: '关闭其他页签',

    /**
     * @cfg {Boolean} showCloseAll
     * Indicates whether to show the 'Close All' option.
     */
    showCloseAll: true,

    /**
     * @cfg {String} closeAllTabsText
     * <p>The text for closing all tabs.
     */
    closeAllTabsText: '关闭所有页签',

    /**
     * @cfg {Array} extraItemsHead
     * An array of additional context menu items to add to the front of the context menu.
     */
    extraItemsHead: null,

    /**
     * @cfg {Array} extraItemsTail
     * An array of additional context menu items to add to the end of the context menu.
     */
    extraItemsTail: null,

    //public
    constructor: function (config) {
        this.addEvents(
            'aftermenu',
            'beforemenu');

        this.mixins.observable.constructor.call(this, config);
    },

    init : function(tabpanel){
        this.tabPanel = tabpanel;
        this.tabBar = tabpanel.down("tabbar");

        this.mon(this.tabPanel, {
            scope: this,
            afterlayout: this.onAfterLayout,
            single: true
        });
    },

    onAfterLayout: function() {
        this.mon(this.tabBar.el, {
            scope: this,
            contextmenu: this.onContextMenu,
            delegate: '.x-tab'
        });
    },

    onBeforeDestroy : function(){
        Ext.destroy(this.menu);
        this.callParent(arguments);
    },

    // private
    onContextMenu : function(event, target){
        var me = this,
            menu = me.createMenu(),
            disableAll = true,
            disableOthers = true,
            tab = me.tabBar.getChildByElement(target),
            index = me.tabBar.items.indexOf(tab);

        this.item = me.tabPanel.getComponent(index);
        me.selectedTab = me.tabPanel.getComponent(index);
        menu.child('*[text="' + me.closeTabText + '"]').setDisabled(!me.item.closable);

        if (me.showCloseAll || me.showCloseOthers) {
            me.tabPanel.items.each(function(item) {
                if (item.closable) {
                    disableAll = false;
                    if (item != me.item) {
                        disableOthers = false;
                        return false;
                    }
                }
                return true;
            });

            if (me.showCloseAll) {
                menu.child('*[text="' + me.closeAllTabsText + '"]').setDisabled(disableAll);
            }

            if (me.showCloseOthers) {
                menu.child('*[text="' + me.closeOthersTabsText + '"]').setDisabled(disableOthers);
            }
        }

        event.preventDefault();
        me.fireEvent('beforemenu', menu, me.item, me);

        menu.showAt(event.getXY());
    },

    createMenu : function() {
        var me = this;

        if (!me.menu) {
            var items = [{
                text: me.closeTabText,
                scope: me,
                handler: me.onClose
            }];

            if (me.showCloseAll || me.showCloseOthers) {
                items.push('-');
            }

            if (me.showCloseOthers) {
                items.push({
                    text: me.closeOthersTabsText,
                    scope: me,
                    handler: me.onCloseOthers
                });
            }

            if (me.showCloseAll) {
                items.push({
                    text: me.closeAllTabsText,
                    scope: me,
                    handler: me.onCloseAll
                });
            }
            
            items.push('-');
            items.push({
                text: "收藏",
                scope: me,
                handler: me.onCollectFunctions
            });
            
            items.push({
                text: "刷新",
                scope: me,
                handler: me.onTabRefresh
            });
            
            items.push('-');
            items.push({
                text: "功能帮助",
                scope: me,
                handler: me.onShowFuncHelp
            });

            if (me.extraItemsHead) {
                items = me.extraItemsHead.concat(items);
            }

            if (me.extraItemsTail) {
                items = items.concat(me.extraItemsTail);
            }

            me.menu = Ext.create('Ext.menu.Menu', {
                items: items,
                listeners: {
                    hide: me.onHideMenu,
                    scope: me
                }
            });
        }

        return me.menu;
    },

    onHideMenu: function () {
        var me = this;

        me.item = null;
        me.fireEvent('aftermenu', me.menu, me);
    },

    onClose : function(){
        this.tabPanel.remove(this.selectedTab);
    },

    onCloseOthers : function(){
        this.doClose(true);
    },

    onCloseAll : function(){
        this.doClose(false);
    },

	doClose : function(excludeActive){
         var items = [];

         this.tabPanel.items.each(function(item){
             if(item.closable){
                 if(!excludeActive || item != this.selectedTab){
                     items.push(item);
                 }
             }
         }, this);

         Ext.each(items, function(item){
             this.tabPanel.remove(item);
         }, this);
     },
     
	onCollectFunctions : function(){
		try{
    		var funTreeId = this.selectedTab.id;
    		
    		if(funTreeId=='indexPanel'){
    			//Ext.Msg.alert('提示','首页不能收藏!');
    			return;
    		}
    		
         	funTreeId = funTreeId.substring(4,funTreeId.length);
    		 
         	var isExistFlag = false;
         	
         	Ext.Ajax.request({
         		url : 'main?xwl=23W1F6YXRH5P',
                method: 'POST',
                params:{funTreeId:funTreeId},
                async:false,
                success: function(response,options){
                	var temp = response.responseText;
                	var response = Ext.JSON.decode(temp);
                  
                	if(response.total==0){
                		//收藏成功，刷新首页收藏栏
                		var tmpVal = document.getElementById('idx_page').contentWindow.panel2.body.dom.lastChild;
                		var cutStore = tmpVal.contentWindow.queryStore;
                		if(!Ext.isEmpty(tmpVal)){
                			cutStore.load();
                			}
                		
                	}else{
                		isExistFlag = true;
                		Ext.Msg.alert("提示","功能已经被收藏,无需重复收藏!");
                	}
                },
                failure: function(response,options){
                	isExistFlag = true;
                	Ext.Msg.alert("提示","服务器端没有响应");
                }
         	});
         	
         	if(isExistFlag){return;}
         	
         	Ext.Ajax.request({
         		url : 'main?xwl=23W1F6YXRH5N',
                method: 'POST',
                params:{funTreeId:funTreeId, uuid:Math.uuid().toLowerCase()},
                async:false,
                success: function(response,options){
                	var temp = response.responseText;
                	 //收藏成功，刷新首页收藏栏
                	var tmpVal = document.getElementById('idx_page').contentWindow.panel2.body.dom.lastChild;
                	var cutStore = tmpVal.contentWindow.queryStore;
                	if(!Ext.isEmpty(tmpVal)){
                			cutStore.load();
                			}
                  
                	Ext.Msg.alert('提示','收藏成功!');
                },
                failure: function(response,options){
                	isExistFlag = true;
                	Ext.Msg.alert("提示","服务器端没有响应");
                }
         	});
         	
    	 }catch(e){
    		 //alert("收藏时发生错误:"+e);
    	 }
	},
	
	onTabRefresh:function(){
		var funTreeId = this.selectedTab.id;
		
		if(funTreeId=='indexPanel'){
			return;
		}
 		
      	funTreeId = funTreeId.substring(4,funTreeId.length);
		
		document.getElementById('iframe'+funTreeId).src = this.selectedTab.tabUrl;
	},
     
	onShowFuncHelp:function(){
		var funTreeId = this.selectedTab.id;
		
		if(funTreeId=='indexPanel'){
			return;
		}
 		
      	funTreeId = funTreeId.substring(4,funTreeId.length);
      	
      	showFunHelpWin(funTreeId, 'r', this.selectedTab.title);
	}
});
