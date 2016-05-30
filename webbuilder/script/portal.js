var Pt = {
	load : function(panel, reload) {
		if (panel && panel.saveUrl && (reload || !panel.moduleLoaded)) {
			var id = panel.iframeId, o = Wb.dom(id);
			if (panel.isMasked) {
				Wb.unmask(panel);
				panel.isMasked = false;
			}
			Wb.mask(panel, Str.loading);
			panel.isMasked = true;
			if (!panel.monMaskEvent) {
				panel.monMaskEvent = true;
				o.onload = o.onreadystatechange = function() {
					if (this.readyState && this.readyState != 'complete')
						return;
					else if (panel.isMasked)
						setTimeout(function() {
							Wb.unmask(panel);
							panel.isMasked = false;
						}, 50);
				}
			}
			Wb.submit(panel.saveUrl, panel.params, id, panel.openType);
			panel.moduleLoaded = true;
		}
	},
	moduleTabChange : function(sender, newCard) {
		Pt.load(newCard);
	},
	run : function(r) {
		if (!r.get('IS_FOLDER')) {
			Pt.savePath();
			var u = 'main?xwl=' + r.get('MODULE_ID');
			if (r.get('NEW_WIN'))
				window.open(u);
			else
				WBXwlOpen(u, r.get('text'), r.get('iconCls'));
		}
	},
	savePath : function() {
		if (Pt.pathSaving || Pt.indexPath === '-')
			return;
		var n = Wb.getSelNode(moduleTree), p;
		if (n) {
			p = n.getPath('MODULE_ID', '\n');
			if (p === Pt.savedPath)
				return;
			Pt.savedPath = p;
			Pt.pathSaving = 1;
			Ext.Ajax.request( {
				url : 'main?xwl=13NOEQY1P3LO',
				params : {
					path : p
				},
				callback : function() {
					delete Pt.pathSaving;
				}
			});
		}
	},
	open : function(tab, url, title, iconCls, params, type, x, y, w, h) {
		if (params == null && x === undefined) {
			var b = false;
			tab.items.each(function(p) {
				if (p.saveUrl === url) {
					tab.setActiveTab(p);
					b = true;
					return false;
				}
			});
			if (b)
				return false;
		}
		var ti = 'xi_' + Wb.getId(), obj, t;
		obj = {
			iconCls : iconCls,
			saveUrl : url,
			iframeId : ti,
			layout : 'fit',
			params : params,
			hideMode : 'offsets',
			openType : type,
			title : Wb.ellipsis(title),
			orgTitle : title,
			listeners : {
				render : function(t) {
					if (t.title !== t.orgTitle)
						t.ellipsisTip = new Ext.tip.ToolTip( {
							target : t.tab.btnWrap,
							html : title
						});
				},
				beforeclose : function(t) {
					try {
						var f, r, w = Wb.dom(t.iframeId).contentWindow;
						if (!w.wb_forceCls) {
							f = w.wb_beforeunload;
							r = f ? f() : null;
							if (r !== null && r !== undefined) {
								Wb.confirm(r + '<br>' + Str.closeConfirm,
										function() {
											w.wb_forceCls = true;
											t.close();
										});
								return false;
							}
						}
					} catch (e) {
					}
				},
				beforedestroy : function(t) {
					try {
						var id = t.iframeId, f = Wb.dom(id), o = f.contentWindow.document
								|| f.contentDocument
								|| window.frames[id].document;
						f.src = '';
						o.write('');
						o.close();
						Ext.fly(f).destroy();
						Wb.closeNav(backBtn, forwardBtn, t);
					} catch (e) {
					}
				}
			},
			closable : true,
			html : '<iframe id="'
					+ ti
					+ '" name="'
					+ ti
					+ '" scrolling="auto" frameborder="0" width="100%" height="100%"></iframe>'
		};
		return tab.add(obj);
	},
	logout : function() {
		var f, b = false;
		moduleTab.items.each(function(c) {
			f = Wb.dom(c.iframeId).contentWindow.wb_beforeunload;
			if (f) {
				f = f();
				if (!b && f !== null && f !== undefined) {
					moduleTab.setActiveTab(c);
					b = true;
				}
			}
		});
		function doLogout() {
			Wb.request( {
				url : 'main?xwl=logout',
				success : function() {
					Pt.canLogout = true;
					window.location = 'main';
				}
			});
		}
		if (b)
			Wb.confirm(Str.closeConfirm, doLogout);
		else
			doLogout();

	},
	close : function(f) {
		var o, t = moduleTab;
		o = t.getActiveTab();
		t.items.each(function(p) {
			if (f || o != p)
				p.close();
		});
	},
	monDbClick : function() {
		var t = moduleTab.getActiveTab();
		if (t.saveUrl && !t.params)
			window.open(t.saveUrl);
	},
	getDesktop : function() {
		var i, j = moduleTab.items.length, t, r;
		r = [ {
			width : moduleTree.getWidth(),
			index : moduleTab.items.indexOf(moduleTab.getActiveTab())
		} ];
		j = moduleTab.items.length;
		for (i = 0; i < j; i++) {
			t = moduleTab.items.items[i];
			if (t.saveUrl) {
				r.push( {
					url : t.saveUrl,
					title : t.title,
					icon : t.iconCls
				});
			}
		}
		return Ext.encode(r);
	},
	initialize : function() {
		Wd.WBXwlOpen = function(url, title, iconCls, params, type) {
			moduleTab.setActiveTab(Pt.open(moduleTab, url, title, iconCls,
					params, type));
		}
	},
	finalize : function() {
		if (desktopData != null) {
			var d = desktopData, i, j, o;
			moduleTree.setWidth(d[0].width);
			j = d.length;
			for (i = 1; i < j; i++) {
				o = d[i];
				Pt.open(moduleTab, o.url, o.title, o.icon);
			}
			moduleTab.setActiveTab(d[0].index);
		}
	},
	refresh : function() {
		Pt.load(moduleTab.getActiveTab(), true);
	}
};