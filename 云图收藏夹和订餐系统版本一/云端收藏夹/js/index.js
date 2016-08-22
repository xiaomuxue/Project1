
function showalltags(){        //显示所有分类
	var options={
		"method":"POST",
		"send":null,
		"jsonResponseListener":function(json){
			var obj=json.obj;
			var alltags=yc.$("alltags");
			alltags.innerHTML="";

			var sp=document.createElement('span');
			
			var allli=document.createElement("li");
			allli.innerHTML="全部分类";
			yc.addEvent(allli,"click",function(){    //全部分类，点击变颜色
				var findall=document.getElementById('findall');
				findall.style.height="520px";
				var all=yc.$('alltags').getElementsByTagName('li');
				for (var i = 0; i < all.length; i++) {
					all[i].style.backgroundColor="#fff";
				};
				this.style.backgroundColor="#7bbfea";
				showfindall();
			});
			allli.appendChild(sp)
			alltags.appendChild(allli);

			var unli=document.createElement("li");   //未知分类
			unli.innerHTML="未分类";
			yc.addEvent(unli,"click",function(){
				var findall=document.getElementById('findall');
				findall.style.height="520px";
				var all=yc.$('alltags').getElementsByTagName('li');
				for (var i = 0; i < all.length; i++) {
					all[i].style.backgroundColor="#fff";
				};
				this.style.backgroundColor="#7bbfea";  
				showfindall("未分类");
			});
			yc.ajaxRequest("http://218.196.14.220:8080/webtag/favorite_findAll.action",{
				"method":"POST",
				"send":"tname=未分类",
				"jsonResponseListener":function(json){;
					var findall=json.obj;
					uncount=findall.length;
					var unsp=document.createElement("span");
					unsp.innerHTML=uncount;
					unli.appendChild(unsp);
				}
			});
		
			
			alltags.appendChild(unli);

			var count=0;
			for(var property in obj){					//显示每个分类
				if(obj.hasOwnProperty(property)){
					var span=document.createElement('span');
					span.innerHTML=obj[property].tcount;
					b=parseInt(span.innerHTML[0]);
					count+=obj[property].tcount;
					var tagli=document.createElement("li");
					tagli.innerHTML=property;
					(function(tname){					//点击每个分类时显示对应的标签
						allli.style.backgroundColor="#7bbfea";
						yc.addEvent(tagli,"click",function(){
							var findall=document.getElementById('findall');
							findall.style.height="520px";
							var all=yc.$('alltags').getElementsByTagName('li');
							
							for (var i = 0; i < all.length; i++) {
								all[i].style.backgroundColor="#fff";
							};
							this.style.backgroundColor="#7bbfea";    //点击变颜色
							showfindall(tname);
						});
					})(property);
					tagli.appendChild(span);
					alltags.appendChild(tagli);
				}
			}
			//a=count;
			if (count>100) {
				count="99+";
			};
			sp.innerHTML=count;
			back();
		}
	}
	yc.ajaxRequest("http://218.196.14.220:8080/webtag/tag_findAll.action",options);
}
yc.addLoadEvent(showalltags);



yc.addEvent("showadd","click",show);     //点击显示出添加的div

yc.addEvent("black_shadow","click",unshow);		//点击隐藏添加的div

yc.addEvent("span","click",unshow);

function show() {
	yc.$('formbox').style.display="block";
	yc.$('black_shadow').style.display="block";

}
function unshow() {
	yc.$('formbox').style.display="none";
	yc.$('black_shadow').style.display="none";
}


yc.addEvent("add","click",addData);
function addData(){       //添加标签
	if (yc.$('tr').style.borderBottomColor=='green' && yc.$('tr2').style.borderBottomColor=='green' && yc.$('tr3').style.borderBottomColor=='green') {
		var options={
			"method":"POST",
			"send":yc.serialize(document.myform),
			"jsonResponseListener":function(json){
				console.log(json);
				if(json.code==1){
					var eles=document.myform.elements;
					for(var i=0;i<eles.length;i++){
						if(eles[i].type=="text"||eles[i].type=="textarea"){
							eles[i].value="";
						}
					}
					unshow();
					showalltags();
					back();
				}else{
					alert("添加失败");
				}
			}
		};
		yc.ajaxRequest("http://218.196.14.220:8080/webtag/favorite_add.action",options);
	};
	

}

function back(){			//下拉显示
	if (yc.$('alltags').getElementsByTagName('li').length>12) {
		yc.$('xiala').style.display="block";
		yc.addEvent('xiala','click',function(){
			if (yc.$('xiala').style.backgroundImage.indexOf("arrow.png")>0) {
				yc.$('all').style.overflow=='visible';
				yc.$('all').style.height='auto';
				yc.$('xiala').style.backgroundImage='url("images/arrow2.png")';
			}
			else{
				yc.$('all').style.overflow=='hidden';
				yc.$('all').style.height='290px';
				yc.$('xiala').style.backgroundImage='url("images/arrow.png")';
			}
		})
		
	}else{
		yc.$('xiala').style.display="none";
	}
}

//正则验证添加
yc.addEvent('flabel','blur',function(){
	if(!(/^[0-9a-z_\u4E00-\u9FA5]+/i).test(yc.$('flabel').value)){
		yc.$('tr').style.borderBottomColor='red';
	}else{
		yc.$('tr').style.borderBottomColor='green';
	}
})

yc.addEvent('furl','blur',function(){
	if(!(/^([https|http]?:\/\/)?(www)\.([a-z]\.){2,6}([\/\w \.-]*)*\/?$/i).test(yc.$('furl').value)){
		yc.$('tr2').style.borderBottomColor='red';
	}else{
		yc.$('tr2').style.borderBottomColor='green';
	}	
});

yc.addEvent('ftags','blur',function(){     
	if(!(/([0-9a-z_\u4E00-\u9FA5]+,)*[0-9a-z_\u4E00-\u9FA5]+/i).test(yc.$('ftags').value)){
		yc.$('tr3').style.borderBottomColor='red';
	}else{
		yc.$('tr3').style.borderBottomColor='green';
	}
})

var colors=[["#FFCCCC","#00868B"],["#f69c9f","#f173ac"],["#f15b6c","#f8aba6"],["#f7acbc","#4F94CD"],["#7bbfea","#afdfe4"],["#fcaf17","#cde6c7"],["#65c294","#fedcbd"],["#99CCFF","#99CC99"]];

function showfindall(tname){		//显示所有分类下的标签
	var tname=tname||"全部";
	var options={
		"method":"POST",
		"send":"tname="+tname,
		"jsonResponseListener":function(json){;
			var findall=json.obj;
			var container=yc.$("container");
			container.innerHTML="";
			for(var i=0;i<findall.length;i++){
				var labobj=findall[i];
				// if (!(/^([https|http]?:\/\/)?(www)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i).test(labobj.furl)) {
				// 	continue;
				// }
				var li=document.createElement("li");
				li.id="fid"+labobj.fid;
				var b=document.createElement('b');
				b.innerHTML='X';
				yc.addClassName(b,'del');
				li.appendChild(b);
				(function(id){
					yc.addEvent(b,'click',function(){
						var options={
							"method":"POST",
							"send":'fid='+id,
							"jsonResponseListener":function(json){
								if(json.code==1){
									yc.$("container").removeChild(yc.$("fid"+id));
								}else{
									alert("删除失败");
								}
							}
						}
						yc.ajaxRequest("http://218.196.14.220:8080/webtag/favorite_del.action",options);
					})
				})(labobj.fid);
				var p=document.createElement("p");
				p.innerHTML=labobj.flabel;
				li.appendChild(p);
				p.style.color=colors[Math.floor(Math.random()*8)][1];
				yc.addClassName(p,"ptitle");

				var div=document.createElement("div");
				li.appendChild(div);
				yc.addClassName(div,"address");

				var tname=document.createElement("p");
				tname.innerHTML=labobj.flabel;
				div.appendChild(tname);

				var desc=document.createElement("span");
				desc.innerHTML=labobj.fdesc;
				div.appendChild(desc);
				

				var btn=document.createElement("a");
				btn.href=labobj.furl;
				btn.innerHTML="GoTo";
				div.appendChild(btn);
				li.style.backgroundColor=colors[Math.floor(Math.random()*8)][0];

				container.appendChild(li);

			}
		}
	};
	yc.ajaxRequest("http://218.196.14.220:8080/webtag/favorite_findAll.action",options);
}
yc.addLoadEvent(showfindall);


window.onscroll=function(){					//to_up小按钮
	var t = document.documentElement.scrollTop || document.body.scrollTop; 
	var toup=document.getElementById('toup');
	if (t>0) {
		toup.style.bottom='20px';
	}else{
		toup.style.bottom='-70px';
	}
	isScrollBottom() ;
}
function isScrollBottom() { 		
//判断滚动条是否在底部
	var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
	if(document.documentElement.scrollHeight == document.documentElement.clientHeight + scrollTop ) {
	    //alert("到底部啦");
	    var allheight=yc.$("container").offsetHeight;
		console.log("ul"+allheight);
		console.log("div"+document.getElementById('findall').offsetHeight);
		if(document.getElementById('findall').offsetHeight<allheight){
	    	document.getElementById('jiazai').style.display="block"; 
	    	setTimeout(showMoreAddr,1000);  
		}
	}
}

function showMoreAddr(){
	document.getElementById('jiazai').style.display='none';
	var findall=document.getElementById('findall');
	findall.style.height=findall.clientHeight+520+"px";
	//加载刷新
}

yc.addEvent('cloud','click',function(){    //云图
	var li=yc.$('alltags').getElementsByTagName('li');
	var ulll=yc.$('ulll');
	ulll.innerHTML="";
	for (var i = 0; i < li.length; i++) {
		var spaned=li[i].getElementsByTagName('span')[0].innerHTML;
		if (spaned=="99+") {
			spaned=50;
		}else if (0<parseInt(spaned) && parseInt(spaned)<5) {
			spaned=16;
		}else if (5<parseInt(spaned) && parseInt(spaned)<10) {
			spaned=24;
		}else if (10<parseInt(spaned) && parseInt(spaned)<15) {
			spaned=32;
		}else if (15<parseInt(spaned) && parseInt(spaned)<50) {
			spaned=36;
		}else if (50<parseInt(spaned) && parseInt(spaned)<100) {
			spaned=42;
		}
		var lii=document.createElement('li');
		lii.innerHTML=li[i].innerHTML;
		lii.style.fontSize=spaned+"px";
		lii.style.color=colors[Math.floor(Math.random()*8)][1];
		ulll.appendChild(lii);
		(function(lia){
			yc.addEvent(lia,"click",function(){
				//alert(lia.innerHTML);
				black();
				var value=/^([^<>]+)</i.exec(lia.innerHTML)[1];

				for (var i = 0; i < li.length; i++) {
					li[i].style.backgroundColor="#fff";
				};
				for (var i = 0; i < li.length; i++) {
					//console.log(li);
					
					var valueli=/^([^<>]+)</i.exec(li[i].innerHTML)[1];
					li[i].style.backgroundColor="#fff";
					//console.log(valueli);
					if(valueli==value){
						li[i].style.backgroundColor="#7bbfea";
						if (i>=12) {
							yc.$('all').style.height='auto';
						};
						if (valueli="全部分类") {
							showfindall(); 
						};
						break;
					}else{
						li[i].style.backgroundColor="#fff";
						yc.$('all').style.height='290px';
					}

				};
				showfindall(value); 
			})
		})(lii)
		
	}
	yc.$('content').style.display="none";
	yc.$('star').style.display="block";
	yc.addEvent('backcloud','click',black)
})
function black(){
	yc.$('star').style.display="none";
	yc.$('content').style.display="block";
}