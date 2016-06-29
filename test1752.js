var http = require("http");
var url=require("url");


var id1;
var id2;
var auid1data;
var auid2data;
var id1data;
var id2data;
var vid2data;
var get5;
var youget;

var afids;
var afids_num;
var lu;
var lu_num;

var id3;
var id3_num;

var id1_RId_J;
var id1_FId_Id_J;
var id1_AuId_Id_J;
var id1_JId_Id_J;
var id1_CId_Id_J

var ans;
var ans_num;

var startTime;

function chushijian() {
	var d = new Date();
	var endTime = d.getTime();
	//console.log(endTime-startTime+" "+youget);
}

function jisuan_id_RId_J( resp) {
	if (id2data.entities[0].CC<=10000) {
		//get到的vid2有用
		////console.log("buyongshouji"); chushijian();
		for (ji in id1_RId_J) for (e in id1_RId_J[ji].entities)
			if (id1_RId_J[ji].entities[e]!=null && id1_RId_J[ji].entities[e].RId!=null && id1_RId_J[ji].entities[e].RId[0]!=null && vid2data.entities!=null)
				for (x in id1_RId_J[ji].entities[e].RId)
					for (e2 in vid2data.entities)
						if (id1_RId_J[ji].entities[e].RId[x]!=null && id1_RId_J[ji].entities[e].RId[x]==vid2data.entities[e2].Id) {
							ans[ans_num++] = [id1, id1_RId_J[ji].entities[e].Id, id1_RId_J[ji].entities[e].RId[x], id2];
							////console.log("get id id id id"); chushijian();
							break;
						}
	}
	

	//收集所有rid，这里用到的for需要优化
	else {
		////console.log("kaishishouji"); chushijian();
		for (ji in id1_RId_J) for (e in id1_RId_J[ji].entities)
			if (id1_RId_J[ji].entities[e]!=null &&  id1_RId_J[ji].entities[e].RId!=null && id1_RId_J[ji].entities[e].RId[0]!=null)
				for (x in id1_RId_J[ji].entities[e].RId) {
					var youmei = 0;
					for (k in id3)
						if (id1_RId_J[ji].entities[e].RId[x] == id3[k]) {youmei = 1; break;}

					if (youmei == 0)
						id3[id3_num++] = id1_RId_J[ji].entities[e].RId[x];
				}

		var len = 50;
		
		var orReq;
		var tempBool=1;
		var div_left=(id3.length)%len;
		var div_num=(id3.length-div_left)/len;
		if(div_left==0) tempBool=0;
		////console.log(div_left+" "+div_num);
		var dedao=[];
		var count = 0;
		youget += div_num+tempBool;
		for(ci=0;ci<div_num;++ci){
			orReq='Id=' + id3[ci*len];
			for (y=0;y<len;++y) {
				orReq = 'Or(Id=' + id3[ci*len+y] + ',' + orReq +')';
			}
			

			orReq = "AND(" + orReq+ ",RId=" +id2 +")";
			////console.log(ci+": "+orReq);

			http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+orReq+"&count=1000000&attributes=Id&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
				if(res.statusCode!=200) return ;
				var data = "";
				res.on('data',function(chunk) {
					data += chunk;
				});
				res.on('end', function() {
					dedao[count]=JSON.parse(data);
					++count;
					
					if(count==div_num+tempBool){
						for (ji in id1_RId_J) for (e in id1_RId_J[ji].entities)
							if (id1_RId_J[ji].entities[e]!=null &&  id1_RId_J[ji].entities[e].RId!=null && id1_RId_J[ji].entities[e].RId[0]!=null)
								for (x in id1_RId_J[ji].entities[e].RId)
									for (i in dedao)
										if (dedao[i].entities.length!=0)
											for (e2 in dedao[i].entities)
												if (id1_RId_J[ji].entities[e].RId[x] == dedao[i].entities[e2].Id) {
													ans[ans_num++] = [id1, id1_RId_J[ji].entities[e].Id, id1_RId_J[ji].entities[e].RId[x], id2];
													break;
												}

					}
					//console.log("cha wanle gaoji or"); chushijian();
					youget--;
					if (youget==0) {
						
						resp.end(JSON.stringify(ans));
					}

				}).on('error', function(e) {});
			});
		}
		
		if(div_left>0){
			orReq='Id=' + id3[div_num*len];
			for (x=0;x<div_left;++x) {
				orReq = 'Or(Id=' + id3[div_num*len+x] + ',' + orReq +')';
			}

			orReq = "AND(" + orReq+ ",RId=" +id2 +")";
			////console.log((div_num)+": "+orReq);

			http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+orReq+"&count=1000000&attributes=Id&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
				if(res.statusCode!=200) return ;
				var data = "";
				res.on('data',function(chunk) {

					data += chunk;
				});
				res.on('end', function() {
					dedao[count]=JSON.parse(data);
					++count;

					if(count==div_num+tempBool){
						for (ji in id1_RId_J) for (e in id1_RId_J[ji].entities)
							if (id1_RId_J[ji].entities[e]!=null &&  id1_RId_J[ji].entities[e].RId!=null && id1_RId_J[ji].entities[e].RId[0]!=null)
								for (x in id1_RId_J[ji].entities[e].RId)
									for (i in dedao)
										if (dedao[i].entities.length!=0)
											for (e2 in dedao[i].entities)
												if (id1_RId_J[ji].entities[e].RId[x] == dedao[i].entities[e2].Id) {
													ans[ans_num++] = [id1, id1_RId_J[ji].entities[e].Id, id1_RId_J[ji].entities[e].RId[x], id2];
													break;
												}

					}

					//console.log("cha wanle gaoji or"); chushijian();
					youget--;
					if (youget==0) {
						
						resp.end(JSON.stringify(ans));
					}


				}).on('error', function(e) {});
			});

		}


		/*原来的
		youget+=id3_num; chushijian();

		for (k in id3) {
			http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=AND(Id="+id3[k]+",RId="+ id2 +")&attributes=Id&count=1&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
				var data = "";
				if(res.statusCode!=200) return ;
				res.on('data',function(chunk) {
					data += chunk;
				});
				res.on('end', function() {
					var dedao = JSON.parse(data);
					//////console.log("dedao "+ data);
					if (dedao.entities.length!=0) {
						//////console.log("dedao " + dedao.entities[0].Id );
						for (e in id1_RId_J[ji].entities)
							if (id1_RId_J[ji].entities[e].RId[0]!=null)
								for (x in id1_RId_J[ji].entities[e].RId)
									if (id1_RId_J[ji].entities[e].RId[x] == dedao.entities[0].Id) {
										ans[ans_num++] = [id1, id1_RId_J[ji].entities[e].Id, dedao.entities[0].Id, id2];
										break;
									}
					}

					youget--; if (youget==0) {chushijian(); resp.end(JSON.stringify(ans));}
				}).on('error', function(e) {});
			});
		}*/
	}


	for (ji in id1_RId_J) for (e in id1_RId_J[ji].entities) {


		////id id id
		//////console.log("cha id id id ");  chushijian();
		for (x in id1_RId_J[ji].entities[e].RId) 
			if (id1_RId_J[ji].entities[e].RId[x] == id2) {
				ans[ans_num++] = [id1, id1_RId_J[ji].entities[e].Id, id2];
				//////console.log("get id id id "); chushijian();
				break;
			}
			
		

		////id id fid id
		//////console.log("cha id id fid id");  chushijian();
		if (id1_RId_J[ji].entities[e].F!=null && id2data.entities[0].F!=null)
			for (x in id1_RId_J[ji].entities[e].F)
				for (y in id2data.entities[0].F)
					if (id1_RId_J[ji].entities[e].F[x].FId != null && id1_RId_J[ji].entities[e].F[x].FId == id2data.entities[0].F[y].FId) {
						ans[ans_num++] = [id1, id1_RId_J[ji].entities[e].Id, id1_RId_J[ji].entities[e].F[x].FId, id2];
						//////console.log("get id id fid id "); chushijian();
						break;
					}
		
		
		////id id cid id
		//////console.log("cha id id cid id ");  chushijian();
		if (id1_RId_J[ji].entities[e].C!=null && id2data.entities[0].C!=null )
			for (x in id1_RId_J[ji].entities[e].C)
				for (y in id2data.entities[0].C)
					if (id1_RId_J[ji].entities[e].C[x].CId != null && id1_RId_J[ji].entities[e].C[x].CId == id2data.entities[0].C[y].CId) {
						ans[ans_num++] = [id1, id1_RId_J[ji].entities[e].Id, id1_RId_J[ji].entities[e].C[x].CId,id2];
						//////console.log("get id id cid id "); chushijian();
						break;
					}
		
		////id id jid id
		//////console.log("cha id id jid id ");  chushijian();
		if (id1_RId_J[ji].entities[e].J!=null && id2data.entities[0].J!=null )
			for (x in id1_RId_J[ji].entities[e].J)
				for (y in id2data.entities[0].J)
					if (id1_RId_J[ji].entities[e].J[x].JId != null &&  id1_RId_J[ji].entities[e].J[x].JId == id2data.entities[0].J[y].JId ){
						ans[ans_num++] = [id1, id1_RId_J[ji].entities[e].Id ,id1_RId_J[ji].entities[e].J[x].JId,id2];
						//////console.log("get id id jid id "); chushijian();
						break;
					}

		////id id auid id
		//////console.log("cha id id auid id ");  chushijian();
		if (id1_RId_J[ji].entities[e].AA!=null && id2data.entities[0].AA!=null)
			for (x in id1_RId_J[ji].entities[e].AA)
				for (y in id2data.entities[0].AA)
					if (id1_RId_J[ji].entities[e].AA[x].AuId != null && id1_RId_J[ji].entities[e].AA[x].AuId == id2data.entities[0].AA[y].AuId) {
						ans[ans_num++] = [id1, id1_RId_J[ji].entities[e].Id, id1_RId_J[ji].entities[e].AA[x].AuId,id2];
						//////console.log("get id id auid id "); chushijian();
						break;
					}

	}


	

}

function jisuan2_id_RId_J( resp) {

	for (ji in id1_RId_J) for (e1 in id1_RId_J[ji].entities) {
		////console.log("cha id id id auid ");  chushijian();
		if (id1_RId_J[ji].entities[e1]!=null && id1_RId_J[ji].entities[e1].RId!=null && id1_RId_J[ji].entities[e1].RId[0]!=null)
			for (x in id1_RId_J[ji].entities[e1].RId)
				for (e2 in auid2data.entities)
					if (id1_RId_J[ji].entities[e1].RId[x] !=null && id1_RId_J[ji].entities[e1].RId[x]==auid2data.entities[e2].Id) {
						ans[ans_num++] = [id1, id1_RId_J[ji].entities[e1].Id, id1_RId_J[ji].entities[e1].RId[x], id2]
						break;
					}

	}



}



function getwan( resp) {
	////console.log('getwanle'); chushijian();

	//id id
	if (id1data.entities.length>auid1data.entities.length && id2data.entities.length>auid2data.entities.length) {
		youget = 5;

		//id1的RId的所有属性 用到or
		if (id1data.entities[0].RId[0]!=null) {
			var rilen = 50;
			var ricount=0;
			var riorReq;
			var ritempBool=1;
			var ridiv_left=(id1data.entities[0].RId.length)%rilen;
			var ridiv_num=(id1data.entities[0].RId.length-ridiv_left)/rilen;
			if(ridiv_left==0) ritempBool=0;

			youget += ridiv_num+ritempBool;
			////console.log(ridiv_left+" "+ridiv_num);
			for(rix=0;rix<ridiv_num;++rix){
				riorReq='Id=' + id1data.entities[0].RId[rix*rilen];
				for (riy=0;riy<rilen;++riy) {
					riorReq = 'Or(Id=' + id1data.entities[0].RId[rix*rilen+riy] + ',' + riorReq +')';
				}
				//console.log(rix+": "+riorReq);

				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+riorReq+"&count=1000000&attributes=Id,RId,F.FId,J.JId,C.CId,AA.AuId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
			    	if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {

						data += chunk;
					});
					res.on('end', function() {
						id1_RId_J[ricount]=JSON.parse(data);
						++ricount;
						
						if (ricount==ridiv_num+ritempBool)
							jisuan_id_RId_J(resp);
						
						youget--;
						////console.log("suanwan id1_RId_J[ji]"); chushijian();
						if (youget==0)
							resp.end(JSON.stringify(ans));
				

					}).on('error', function(e) {});
				});
			}

			if(ridiv_left>0){
				riorReq='Id=' + id1data.entities[0].RId[ridiv_num*rilen];
				for (rix=0;rix<ridiv_left;++rix) {
					riorReq = 'Or(Id=' + id1data.entities[0].RId[ridiv_num*rilen+rix] + ',' + riorReq +')';
				}

				//console.log(ridiv_num+": "+riorReq);

				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+riorReq+"&count=1000000&attributes=Id,RId,F.FId,J.JId,C.CId,AA.AuId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
			    	if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {

						data += chunk;
					});
					res.on('end', function() {
						id1_RId_J[ricount]=JSON.parse(data);
						++ricount;
						
						if (ricount==ridiv_num+ritempBool)
							jisuan_id_RId_J(resp);
						youget--;
						////console.log("suanwan id1_RId_J[ji]"); chushijian();
						if (youget==0)
							resp.end(JSON.stringify(ans));
	
					

					}).on('error', function(e) {});
				});
			}

			/*原来的
			//获得
			var orReq='Id=' + id1data.entities[0].RId[0];

			for (x in id1data.entities[0].RId) {
				orReq = 'Or(Id=' + id1data.entities[0].RId[x] + ',' + orReq +')';
			}


			////console.log("youget id_rid_J "+orReq.length); chushijian();

			http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+orReq+"&count=1000000&attributes=Id,RId,F.FId,J.JId,C.CId,AA.AuId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
				if(res.statusCode!=200) return ;
				var data = "";
				res.on('data',function(chunk) {

					data += chunk;
				});
				res.on('end', function() {
					////console.log("yougetwan id_rid_J ");  chushijian();
					id1_RId_J=JSON.parse(data);
					//////console.log("id1_RId_J get: " + JSON.stringify(id1_RId_J));

					//计算
					jisuan_id_RId_J();
					//id id id id
					////console.log("cha id id id id ");  chushijian();
					////console.log(id2data.entities[0].CC);


				}).on('error', function(e) {});
			});*/

		}

		//id1的FId的下一级，or没分段
		////console.log("suan id fid .."); chushijian();
		if (id1data.entities[0].F!=null && id1data.entities[0].F[0]!=null) {

			var or1='Composite(F.FId=' + id1data.entities[0].F[0].FId +')';

			for (x in id1data.entities[0].F) {
				or1 = 'Or(Composite(F.FId=' + id1data.entities[0].F[x].FId + '),' + or1 +')';
			}
			var or2 = "RId="+id2;
			var andReq = "AND(" + or1 + "," + or2 +")";
			//console.log("youget id1_FId_Id_J"); chushijian();
			http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+andReq+"&count=1000000&attributes=Id,F.FId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
				if(res.statusCode!=200) return ;
				var data = "";
				res.on('data',function(chunk) {

					data += chunk;
				});
				res.on('end', function() {
					//console.log("yougetwan id1_FId_Id_J"); chushijian();
					id1_FId_Id_J =JSON.parse(data);
					//////console.log("id1_FId_Id_J get: " + JSON.stringify(id1_FId_Id_J));

					//计算

					for (e in id1_FId_Id_J.entities)
						for (x in id1data.entities[0].F)
							for (y in id1_FId_Id_J.entities[e].F)
								if (id1data.entities[0].F[x].FId != null && id1data.entities[0].F[x].FId == id1_FId_Id_J.entities[e].F[y].FId) {
									ans[ans_num++] = [id1, id1data.entities[0].F[x].FId, id1_FId_Id_J.entities[e].Id, id2];
									break;
								}

					youget--;
					//console.log("chawan id1_FId_Id_J"); chushijian();
					if (youget==0)
						resp.end(JSON.stringify(ans));
					

				}).on('error', function(e) {});
			});


		}
		else {
			youget--; 
			////console.log("buyongget id fid"); chushijian();
		}

		//id1的AuId的下一级，or没分段
		////console.log("suan id auid .."); chushijian();
		if (id1data.entities[0].AA!=null && id1data.entities[0].AA[0]!=null) {

			var or1='Composite(AA.AuId=' + id1data.entities[0].AA[0].AuId +')';

			for (x in id1data.entities[0].AA) {
				or1 = 'Or(Composite(AA.AuId=' + id1data.entities[0].AA[x].AuId + '),' + or1 +')';
			}
			var or2 = "RId="+id2;
			var andReq = "AND(" + or1 + "," + or2 +")";

			////console.log("youget id1_AuId_Id_J"); chushijian();
			http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+andReq+"&count=1000000&attributes=Id,AA.AuId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
				if(res.statusCode!=200) return ;
				var data = "";
				res.on('data',function(chunk) {

					data += chunk;
				});
				res.on('end', function() {
					////console.log("yougetwan id1_AuId_Id_J"); chushijian();
					id1_AuId_Id_J =JSON.parse(data);
					//////console.log("id1_FId_Id_J get: " + JSON.stringify(id1_FId_Id_J));

					//计算

					for (e in id1_AuId_Id_J.entities)
						for (x in id1data.entities[0].AA)
							for (y in id1_AuId_Id_J.entities[e].AA)
								if (id1data.entities[0].AA[x].AuId != null && id1data.entities[0].AA[x].AuId == id1_AuId_Id_J.entities[e].AA[y].AuId) {
									ans[ans_num++] = [id1, id1data.entities[0].AA[x].AuId, id1_AuId_Id_J.entities[e].Id, id2];
									break;
								}

							

					
					youget--;
					////console.log("chawan id1_AuId_Id_J"); chushijian();
					if (youget==0)
						resp.end(JSON.stringify(ans));
					

				}).on('error', function(e) {});
			});


		}
		else {
			youget--; 
			////console.log("buyongget id auid"); chushijian();
		}



		//id1的JId的下一级，or没分段
		////console.log("suan id jid .."); chushijian();
		if (id1data.entities[0].J!=null && id1data.entities[0].J.JId!=null) {

			////console.log("youget id1_JId_Id_J"); chushijian();
			http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=AND(Composite(J.JId="+id1data.entities[0].J.JId+"),RId="+id2+")&count=1000000&attributes=Id&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
				if(res.statusCode!=200) return ;
				var data = "";
				res.on('data',function(chunk) {

					data += chunk;
				});
				res.on('end', function() {
					////console.log("yougetwan id1_JId_Id_J"); chushijian();
					id1_JId_Id_J =JSON.parse(data);
					//////console.log("id1_JId_Id_J get: " + JSON.stringify(id1_JId_Id_J));

					//计算
					for (e in id1_JId_Id_J.entities)
						ans[ans_num++] = [id1,id1data.entities[0].J.JId, id1_JId_Id_J.entities[e].Id, id2];

							


					youget--;
					////console.log("chawan id1_JId_Id_J"); chushijian();
					if (youget==0)
						resp.end(JSON.stringify(ans));
					

				}).on('error', function(e) {});
			});


		}
		else {
			youget--; 
			////console.log("buyongget id jid"); chushijian();
		}


		//id1的CId的下一级，or没分段
		////console.log("suan id cid .."); chushijian();
		if (id1data.entities[0].C!=null && id1data.entities[0].C.CId!=null) {

			////console.log("youget id1_CId_Id_J"); chushijian();
			http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=AND(Composite(C.CId="+id1data.entities[0].C.CId+"),RId="+id2+")&count=1000000&attributes=Id&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
				if(res.statusCode!=200) return ;
				var data = "";
				res.on('data',function(chunk) {

					data += chunk;
				});
				res.on('end', function() {
					////console.log("yougetwan id1_CId_Id_J"); chushijian();
					id1_CId_Id_J =JSON.parse(data);
					//////console.log("id1_CId_Id_J get: " + JSON.stringify(id1_CId_Id_J));

					//计算
					for (e in id1_CId_Id_J.entities)
						ans[ans_num++] = [id1,id1data.entities[0].C.CId, id1_CId_Id_J.entities[e].Id, id2];

							


					youget--;
					////console.log("chawan id1_CId_Id_J"); chushijian();
					if (youget==0)
						resp.end(JSON.stringify(ans));
					

				}).on('error', function(e) {});
			});


		}
		else {
			youget--; 
			////console.log("buyongget id cid"); chushijian();
		}

		//id id
		for (x in id1data.entities[0].RId) {
			if (id1data.entities[0].RId[x]==id2){
				ans[ans_num++] = [id1,id2];
				////console.log("get id id "); chushijian();
				break;
			}
		}


		//id fid id
		if (id1data.entities[0].F!=null && id2data.entities[0].F!=null)
			for (x in id1data.entities[0].F)
				for (y in id2data.entities[0].F)
					if (id1data.entities[0].F[x].FId != null && id1data.entities[0].F[x].FId == id2data.entities[0].F[y].FId) {
						ans[ans_num++] = [id1,id1data.entities[0].F[x].FId,id2];
						////console.log("get id fid id "); chushijian();
						break;
					}


		//id cid id
		if (id1data.entities[0].C!=null && id2data.entities[0].C!=null){
			if (id1data.entities[0].C.CId !=null && id1data.entities[0].C.CId == id2data.entities[0].C.CId ) {
				ans[ans_num++] = [id1,id1data.entities[0].C.CId,id2];
			}
		
		}
		
		//id jid id
		if (id1data.entities[0].J!=null && id2data.entities[0].J!=null){
			if (id1data.entities[0].J.JId !=null && id1data.entities[0].J.JId == id2data.entities[0].J.JId ) {
				ans[ans_num++] = [id1,id1data.entities[0].J.JId,id2];
			}
				
		}

		//id auid id
		if (id1data.entities[0].AA!=null && id2data.entities[0].AA!=null)
			for (x in id1data.entities[0].AA)
				for (y in id2data.entities[0].AA)
					if (id1data.entities[0].AA[x].AuId !=null && id1data.entities[0].AA[x].AuId == id2data.entities[0].AA[y].AuId) {
						ans[ans_num++] = [id1,id1data.entities[0].AA[x].AuId,id2];
						////console.log("get id auid id "); chushijian();
						break;
					}




		


		////console.log("jiancha" + youget);
		youget--;
		if (youget==0)
			resp.end(JSON.stringify(ans));
	}
	
	//id auid 
	else if (id1data.entities.length>auid1data.entities.length && auid2data.entities.length>id2data.entities.length) {
		youget = 1;
		
		//id id id auid
		//id1的RId的所有属性 用到or
		if (id1data.entities[0].RId[0]!=null) {
			var rilen = 50;
			var ricount=0;
			var riorReq;
			var ritempBool=1;
			var ridiv_left=(id1data.entities[0].RId.length)%rilen;
			var ridiv_num=(id1data.entities[0].RId.length-ridiv_left)/rilen;
			if(ridiv_left==0) ritempBool=0;

			youget += ridiv_num+ritempBool;
			////console.log(ridiv_left+" "+ridiv_num);
			for(rix=0;rix<ridiv_num;++rix){
				riorReq='Id=' + id1data.entities[0].RId[rix*rilen];
				for (riy=0;riy<rilen;++riy) {
					riorReq = 'Or(Id=' + id1data.entities[0].RId[rix*rilen+riy] + ',' + riorReq +')';
				}
				//console.log(rix+": "+riorReq);

				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+riorReq+"&count=1000000&attributes=Id,RId,F.FId,J.JId,C.CId,AA.AuId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
			    	if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {

						data += chunk;
					});
					res.on('end', function() {
						id1_RId_J[ricount]=JSON.parse(data);
						++ricount;
						
						if (ricount==ridiv_num+ritempBool)
							jisuan2_id_RId_J(resp);

						youget--;
						if (youget==0) {
							
							resp.end(JSON.stringify(ans));
						}




					}).on('error', function(e) {});
				});
			}

			if(ridiv_left>0){
				riorReq='Id=' + id1data.entities[0].RId[ridiv_num*rilen];
				for (rix=0;rix<ridiv_left;++rix) {
					riorReq = 'Or(Id=' + id1data.entities[0].RId[ridiv_num*rilen+rix] + ',' + riorReq +')';
				}

				//console.log(ridiv_num+": "+riorReq);

				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+riorReq+"&count=1000000&attributes=Id,RId,F.FId,J.JId,C.CId,AA.AuId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
			    	if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {

						data += chunk;
					});
					res.on('end', function() {
						id1_RId_J[ricount]=JSON.parse(data);
						++ricount;
						
						if (ricount==ridiv_num+ritempBool)
							jisuan2_id_RId_J(resp);

						youget--;
						if (youget==0) {
							
							resp.end(JSON.stringify(ans));
						}



					}).on('error', function(e) {});
				});
			}


		}

		//id auid afid auid 这里用的for循环所有路径，需要优化？
		for (e in auid2data.entities)
			if (auid2data.entities[e].AA!=null && id1data.entities[0].AA!=null)
				for (x in auid2data.entities[e].AA) {
					//记录afid 并生成路径
					if (auid2data.entities[e].AA[x].AuId==id2 && auid2data.entities[e].AA[x].AfId!=null) {
						//判断有没有
						var youmei = 0;
						for (k in afids) 
							if (afids[k] == auid2data.entities[e].AA[x].AfId) { youmei=1; break;}

						//如果没有
						if (youmei == 0) {
							//记录它
							afids[afids_num++] =  auid2data.entities[e].AA[x].AfId;

							//增加路径
							for (y in id1data.entities[0].AA)
								if (id1data.entities[0].AA[y].AuId!=null) { 
									lu[lu_num++] = [auid2data.entities[e].AA[x].AfId,id1data.entities[0].AA[y].AuId];
								}

						}

					}

				}

		if (lu.length>0 && lu[0].length>0) {
			var lulen = 19;
			
			var luorReq;
			var lutempBool=1;
			var ludiv_left=(lu.length)%lulen;
			var ludiv_num=(lu.length-ludiv_left)/lulen;
			if(ludiv_left==0) lutempBool=0;
			////console.log(ludiv_left+" "+ludiv_num);
			var ludedao=[];
			var lucount = 0;
			youget += ludiv_num+lutempBool;
			for(luci=0;luci<ludiv_num;++luci){
				luorReq= "Composite(AND(AA.AfId=" + lu[luci*lulen][0] +",AA.AuId=" + lu[luci*lulen][1] + "))" ;
				for (luy=0;luy<lulen;++luy) {
					luorReq = "Or(Composite(AND(AA.AfId=" + lu[luci*lulen+luy][0] + ",AA.AuId=" + lu[luci*lulen+luy][1] + "))," +luorReq+ ")";
				}
				
				////console.log("luorReq" + luorReq); chushijian();
				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+luorReq+"&count=1000000&attributes=AA.AuId,AA.AfId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {
						data += chunk;
					});
					res.on('end', function() {
						ludedao[count]=JSON.parse(data);
						++lucount;
						
						if(lucount==ludiv_num+lutempBool){
							var bo;
							for (lux in lu) {
								bo = 0;
								for (lui in ludedao) {
									if (bo == 1) break;
									if (ludedao[lui].entities!=null)
										for (lue in ludedao[lui].entities) {
											if (bo == 1) break;
											if (ludedao[lui].entities[lue].AA!=null)
												for (luaa in ludedao[lui].entities[lue].AA)
													if (ludedao[lui].entities[lue].AA[luaa].AuId != null && ludedao[lui].entities[lue].AA[luaa].AfId !=null
														 && ludedao[lui].entities[lue].AA[luaa].AuId==lu[lux][1] && ludedao[lui].entities[lue].AA[luaa].AfId==lu[lux][0]) {
														ans[ans_num++] = [id1, lu[lux][1], lu[lux][0], id2];
														bo = 1;
														break;
													}
										}
								}
							}
						}

						youget--;
						if (youget==0) {
							////console.log("cha wanle gaoji or"); chushijian();
							resp.end(JSON.stringify(ans));
						}

					}).on('error', function(e) {});
				});
			}
			
			if(ludiv_left>0){
				luorReq= "Composite(AND(AA.AfId=" + lu[luci*lulen][0] +",AA.AuId=" + lu[luci*lulen][1] + "))" ;
				for (xx=0;xx<ludiv_left;++xx) {
					luorReq = "Or(Composite(AND(AA.AfId=" + lu[ludiv_num*lulen+xx][0] + ",AA.AuId=" + lu[ludiv_num*lulen+xx][1] + "))," +luorReq+ ")";

				}

				////console.log((ludiv_num)+": "+luorReq);

				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+luorReq+"&count=1000000&attributes=AA.AuId,AA.AfId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {

						data += chunk;
					});
					res.on('end', function() {
						ludedao[count]=JSON.parse(data);
						++lucount;

						if(lucount==ludiv_num+lutempBool){
							var bo;
							for (lux in lu) {
								bo = 0;
								for (lui in ludedao) {
									if (bo == 1) break;
									if (ludedao[lui].entities!=null)
										for (lue in ludedao[lui].entities) {
											if (bo == 1) break;
											if (ludedao[lui].entities[lue].AA!=null)
												for (luaa in ludedao[lui].entities[lue].AA)
													if (ludedao[lui].entities[lue].AA[luaa].AuId != null && ludedao[lui].entities[lue].AA[luaa].AfId !=null
														 && ludedao[lui].entities[lue].AA[luaa].AuId==lu[lux][1] && ludedao[lui].entities[lue].AA[luaa].AfId==lu[lux][0]) {
														ans[ans_num++] = [id1, lu[lux][1], lu[lux][0], id2];
														bo = 1;
														break;
													}
										}
								}
							}
						}

						youget--;
						if (youget==0) {
							////console.log("cha wanle gaoji or"); chushijian();
							resp.end(JSON.stringify(ans));
						}


					}).on('error', function(e) {});
				});
			}

			/*原来的lu
			for (x in lu) {
				var lu0 = lu[x][0];
				var lu1 = lu[x][1];
				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=Composite(AND(AA.AfId="+lu0+",AA.AuId="+lu1+ "))&count=1&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					var data = "";
					if(res.statusCode!=200) return ;
					res.on('data',function(chunk) {
						data += chunk;
					});
					res.on('end', function() {
						////console.log(lu0 + " " + lu1);
						////console.log(data)
						if (JSON.parse(data).entities.length!=0)
							ans[ans_num++] = [id1, lu0, lu1, id2];
						youget--; 
						if (youget==0) resp.end(JSON.stringify(ans));
					}).on('error', function(e) {});
				});
			}*/
		}

		/*原来的
		if (lu.length!=0)
			for (x in lu) {
				lu0=lu[x][0];
				lu1=lu[x][1];
				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=Composite(AND(AA.AfId="+lu0+",AA.AuId="+lu1+ "))&count=1&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					var data = "";
					if(res.statusCode!=200) return ;
					res.on('data',function(chunk) {
						data += chunk;
					});
					res.on('end', function() {
						////console.log(data)
						if (JSON.parse(data).entities.length!=0)
							ans[ans_num++] = [id1, lu1, lu0, id2];
						youget--; 
						if (youget==0) resp.end(JSON.stringify(ans));
					}).on('error', function(e) {});
				});
			}
			*/


		//id id auid
		if (id1data.entities[0].RId[0]!=null)
			for (x in id1data.entities[0].RId)
				for (y in auid2data.entities)
					if (id1data.entities[0].RId[x] != null && id1data.entities[0].RId[x] == auid2data.entities[y].Id) {
						ans[ans_num++] = [id1, id1data.entities[0].RId[x], id2];
						break;
					}

		//id auid
		if (id1data.entities[0].AA!=null)
			for (x in id1data.entities[0].AA)
				if (id1data.entities[0].AA[x].AuId != null && id1data.entities[0].AA[x].AuId == id2) {
					ans[ans_num++] = [id1,id2];
					break;
				}

		//id auid id auid
		if (id1data.entities[0].AA!=null)
			for (e in auid2data.entities) {
				if (auid2data.entities[e].Id != null && auid2data.entities[e].AA !=null) {
					for (x in id1data.entities[0].AA)
						for (y in  auid2data.entities[e].AA) {
							////console.log(id1data.entities[0].AA[x].AuId +" " + auid2data.entities[e].AA[y].AuId)
						
							if (id1data.entities[0].AA[x].AuId != null && id1data.entities[0].AA[x].AuId == auid2data.entities[e].AA[y].AuId) {
								ans[ans_num++] = [id1, id1data.entities[0].AA[x].AuId, auid2data.entities[e].Id, id2];
								break;
							}
						}
				}
			}

		//id fid id auid
		if (id1data.entities[0].F!=null)
			for (e in auid2data.entities)
				if (auid2data.entities[e].Id != null && auid2data.entities[e].F !=null)
					for (x in id1data.entities[0].F)
						for (y in  auid2data.entities[e].F)
							if (id1data.entities[0].F[x].FId != null && id1data.entities[0].F[x].FId == auid2data.entities[e].F[y].FId) {
								ans[ans_num++] = [id1, id1data.entities[0].F[x].FId, auid2data.entities[e].Id, id2];
								break;
							}

		//id cid id auid
		if (id1data.entities[0].C!=null)
			for (e in auid2data.entities)
				if (auid2data.entities[e].Id != null && auid2data.entities[e].C !=null)
						if (id1data.entities[0].C.CId != null && id1data.entities[0].C.CId == auid2data.entities[e].C.CId) {
							ans[ans_num++] = [id1, id1data.entities[0].C.CId, auid2data.entities[e].Id, id2];
						}


		//id jid id auid
		if (id1data.entities[0].J!=null)
			for (e in auid2data.entities)
				if (auid2data.entities[e].Id != null && auid2data.entities[e].J !=null)
						if (id1data.entities[0].J.JId != null && id1data.entities[0].J.JId == auid2data.entities[e].J.JId) {
							ans[ans_num++] = [id1, id1data.entities[0].J.JId, auid2data.entities[e].Id, id2];
						}

		youget--;
		if (youget==0) resp.end(JSON.stringify(ans));
	}

	//auid id 
	else if (auid1data.entities.length>id1data.entities.length && id2data.entities.length>auid2data.entities.length) {
		youget = 1;


		//auid afid auid id  这里用的for循环所有路径，需要优化？
		for (e in auid1data.entities)
			if (auid1data.entities[e].AA!=null && id2data.entities[0].AA!=null)
				for (x in auid1data.entities[e].AA) {
					//记录afid 并生成路径
					if (auid1data.entities[e].AA[x].AuId==id1 && auid1data.entities[e].AA[x].AfId!=null) {
						//判断有没有
						var youmei = 0;
						for (k in afids) 
							if (afids[k] == auid1data.entities[e].AA[x].AfId) { youmei=1; break;}

						//如果没有
						if (youmei == 0) {
							//记录它
							afids[afids_num++] =  auid1data.entities[e].AA[x].AfId;

							//增加路径
							for (y in id2data.entities[0].AA)
								if (id2data.entities[0].AA[y].AuId!=null) {
									lu[lu_num++] = [auid1data.entities[e].AA[x].AfId,id2data.entities[0].AA[y].AuId];

								}

						}

					}

				} 
		if (lu.length!=0 && lu[0].length>0) {
			var lulen = 19;
			
			var luorReq;
			var lutempBool=1;
			var ludiv_left=(lu.length)%lulen;
			var ludiv_num=(lu.length-ludiv_left)/lulen;
			if(ludiv_left==0) lutempBool=0;
			////console.log(ludiv_left+" "+ludiv_num);
			var ludedao=[];
			var lucount = 0;

			youget += ludiv_num+lutempBool;
			for(luci=0;luci<ludiv_num;++luci){
				luorReq= "Composite(AND(AA.AfId=" + lu[luci*lulen][0] +",AA.AuId=" + lu[luci*lulen][1] + "))" ;
				for (luy=0;luy<lulen;++luy) {
					luorReq = "Or(Composite(AND(AA.AfId=" + lu[luci*lulen+luy][0] + ",AA.AuId=" + lu[luci*lulen+luy][1] + "))," +luorReq+ ")";
				}
				
				////console.log("luorReq" + luorReq); chushijian();
				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+luorReq+"&count=1000000&attributes=AA.AuId,AA.AfId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {
						data += chunk;
					});
					res.on('end', function() {
						ludedao[count]=JSON.parse(data);
						++lucount;
						
						if(lucount==ludiv_num+lutempBool){
							var bo;
							for (lux in lu) {
								bo = 0;
								for (lui in ludedao) {
									if (bo == 1) break;
									if (ludedao[lui].entities!=null)
										for (lue in ludedao[lui].entities) {
											if (bo == 1) break;
											if (ludedao[lui].entities[lue].AA!=null)
												for (luaa in ludedao[lui].entities[lue].AA)
													if (ludedao[lui].entities[lue].AA[luaa].AuId != null && ludedao[lui].entities[lue].AA[luaa].AfId !=null
														 && ludedao[lui].entities[lue].AA[luaa].AuId==lu[lux][1] && ludedao[lui].entities[lue].AA[luaa].AfId==lu[lux][0]) {
														ans[ans_num++] = [id1, lu[lux][0], lu[lux][1], id2];
														bo = 1;
														break;
													}
										}
								}
							}
						}

						youget--;
						if (youget==0) {
							////console.log("cha wanle gaoji or"); chushijian();
							resp.end(JSON.stringify(ans));
						}

					}).on('error', function(e) {});
				});
			}
			
			if(ludiv_left>0){
				luorReq= "Composite(AND(AA.AfId=" + lu[luci*lulen][0] +",AA.AuId=" + lu[luci*lulen][1] + "))" ;
				for (xx=0;xx<ludiv_left;++xx) {
					luorReq = "Or(Composite(AND(AA.AfId=" + lu[ludiv_num*lulen+xx][0] + ",AA.AuId=" + lu[ludiv_num*lulen+xx][1] + "))," +luorReq+ ")";

				}

				////console.log((ludiv_num)+": "+luorReq);

				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+luorReq+"&count=1000000&attributes=AA.AuId,AA.AfId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {

						data += chunk;
					});
					res.on('end', function() {
						ludedao[count]=JSON.parse(data);
						++lucount;

						if(lucount==ludiv_num+lutempBool){
							var bo;
							for (lux in lu) {
								bo = 0;
								for (lui in ludedao) {
									if (bo == 1) break;
									if (ludedao[lui].entities!=null)
										for (lue in ludedao[lui].entities) {
											if (bo == 1) break;
											if (ludedao[lui].entities[lue].AA!=null)
												for (luaa in ludedao[lui].entities[lue].AA)
													if (ludedao[lui].entities[lue].AA[luaa].AuId != null && ludedao[lui].entities[lue].AA[luaa].AfId !=null
														 && ludedao[lui].entities[lue].AA[luaa].AuId==lu[lux][1] && ludedao[lui].entities[lue].AA[luaa].AfId==lu[lux][0]) {
														ans[ans_num++] = [id1, lu[lux][0], lu[lux][1], id2];
														bo = 1;
														break;
													}
										}
								}
							}
						}


						youget--;
						if (youget==0) {
							////console.log("cha wanle gaoji or"); chushijian();
							resp.end(JSON.stringify(ans));
						}


					}).on('error', function(e) {});
				});
			}

			/*原来的lu
			for (x in lu) {
				var lu0 = lu[x][0];
				var lu1 = lu[x][1];
				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=Composite(AND(AA.AfId="+lu0+",AA.AuId="+lu1+ "))&count=1&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					var data = "";
					if(res.statusCode!=200) return ;
					res.on('data',function(chunk) {
						data += chunk;
					});
					res.on('end', function() {
						////console.log(lu0 + " " + lu1);
						////console.log(data)
						if (JSON.parse(data).entities.length!=0)
							ans[ans_num++] = [id1, lu0, lu1, id2];
						youget--; 
						if (youget==0) resp.end(JSON.stringify(ans));
					}).on('error', function(e) {});
				});
			}*/
		}


		//auid id id id 
		if (id2data.entities[0].CC<10000) {
			for (e1 in auid1data.entities)
				for (e2 in vid2data.entities)
					if (auid1data.entities[e1].RId[0]!=null && vid2data.entities[e2]!=null)
						for (x in auid1data.entities[e1].RId)
							if (auid1data.entities[e1].RId[x]!=null && auid1data.entities[e1].RId[x] == vid2data.entities[e2].Id) {
								ans[ans_num++] = [id1, auid1data.entities[e1].Id, auid1data.entities[e1].RId[x], id2];
								break;
							}
		}
		else {
			//收集所有rid
			////console.log("kaishishouji"); chushijian();
			for (e in auid1data.entities)
				if (auid1data.entities[e]!=null &&  auid1data.entities[e].RId!=null && auid1data.entities[e].RId[0]!=null)
					for (x in auid1data.entities[e].RId) {
						var youmei = 0;
						for (k in id3)
							if (auid1data.entities[e].RId[x] == id3[k]) {youmei = 1; break;}

						if (youmei == 0)
							id3[id3_num++] = auid1data.entities[e].RId[x];
					}

			var len = 50;
			
			var orReq;
			var tempBool=1;
			var div_left=(id3.length)%len;
			var div_num=(id3.length-div_left)/len;
			if(div_left==0) tempBool=0;
			////console.log(div_left+" "+div_num);
			var dedao=[];
			var count = 0;
			youget += div_num+tempBool;
			for(ci=0;ci<div_num;++ci){
				orReq='Id=' + id3[ci*len];
				for (y=0;y<len;++y) {
					orReq = 'Or(Id=' + id3[ci*len+y] + ',' + orReq +')';
				}
				

				orReq = "AND(" + orReq+ ",RId=" +id2 +")";
				////console.log(ci+": "+orReq);

				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+orReq+"&count=1000000&attributes=Id&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {
						data += chunk;
					});
					res.on('end', function() {
						dedao[count]=JSON.parse(data);
						++count;
						
						if(count==div_num+tempBool){
							for (e in auid1data.entities)
								if (auid1data.entities[e]!=null &&  auid1data.entities[e].RId!=null && auid1data.entities[e].RId[0]!=null)
									for (x in auid1data.entities[e].RId)
										for (i in dedao)
											if (dedao[i].entities.length!=0)
												for (e2 in dedao[i].entities)
													if (auid1data.entities[e].RId[x] == dedao[i].entities[e2].Id) {
														ans[ans_num++] = [id1, auid1data.entities[e].Id, auid1data.entities[e].RId[x], id2];
														break;
													}

						}

						youget--;
						////console.log("chawan zheci gaoji or"); chushijian();
						if (youget==0) {
							////console.log("cha wanle gaoji or"); chushijian();
							resp.end(JSON.stringify(ans));
						}

					}).on('error', function(e) {});
				});
			}
			
			if(div_left>0){
				orReq='Id=' + id3[div_num*len];
				for (x=0;x<div_left;++x) {
					orReq = 'Or(Id=' + id3[div_num*len+x] + ',' + orReq +')';
				}

				orReq = "AND(" + orReq+ ",RId=" +id2 +")";
				////console.log((div_num)+": "+orReq);

				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr="+orReq+"&count=1000000&attributes=Id&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					if(res.statusCode!=200) return ;
					var data = "";
					res.on('data',function(chunk) {

						data += chunk;
					});
					res.on('end', function() {
						dedao[count]=JSON.parse(data);
						++count;

						if(count==div_num+tempBool){
							for (e in auid1data.entities)
								if (auid1data.entities[e]!=null &&  auid1data.entities[e].RId!=null && auid1data.entities[e].RId[0]!=null)
									for (x in auid1data.entities[e].RId)
										for (i in dedao)
											if (dedao[i].entities.length!=0)
												for (e2 in dedao[i].entities)
													if (auid1data.entities[e].RId[x] == dedao[i].entities[e2].Id) {
														ans[ans_num++] = [id1, auid1data.entities[e].Id, auid1data.entities[e].RId[x], id2];
														break;
													}

						}

						youget--;
						////console.log("chawan zheci gaoji or"); chushijian();
						if (youget==0) {
							////console.log("cha wanle gaoji or"); chushijian();
							resp.end(JSON.stringify(ans));
						}


					}).on('error', function(e) {});
				});

			}




			/*原来的
			for (e in auid1data.entities)
				if (auid1data.entities[e].RId[0]!=null)
					for (x in auid1data.entities[e].RId) {
						var youmei = 0;
						for (k in id3)
							if (auid1data.entities[e].RId[x] == id3[k]) {youmei = 1; break;}

						if (youmei==0)
							id3[id3_num++] = auid1data.entities[e].RId[x];
					}


			youget+=id3_num;
			for (k in id3) {
				var id3now = id3[k];
				http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=AND(Id="+id3[k]+",RId="+ id2 +")&count=1&attributes=Id&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
					var data = "";
					if(res.statusCode!=200) return ;
					res.on('data',function(chunk) {
						data += chunk;
					});
					res.on('end', function() {
						////console.log(id3now); chushijian();
						var dedao = JSON.parse(data);
						if (dedao.entities.length!=0) {
							for (e in auid1data.entities) {
								if (auid1data.entities[e].RId[0]!=null)
									for (x in auid1data.entities[e].RId)
										if (auid1data.entities[e].RId[x] == dedao.entities[0].Id) {
											ans[ans_num++] = [id1, auid1data.entities[e].Id, dedao.entities[0].Id, id2];
											break;
										}
							}
						}

						youget--; if (youget==0) {chushijian(); resp.end(JSON.stringify(ans));}
					}).on('error', function(e) {});
				});
			}*/

		}

		//auid id
		for (e in auid1data.entities)
			if (auid1data.entities[e].Id!=null && auid1data.entities[e].Id ==id2)
				ans[ans_num++] = [id1,id2];

		//auid id id
		for (e in auid1data.entities)
			if (auid1data.entities[e].RId!=null)
				for (x in auid1data.entities[e].RId)
					if (auid1data.entities[e].RId[x]==id2) {
						ans[ans_num++] = [id1, auid1data.entities[e].Id, id2];
						break;
					}


		//auid id auid id
		for (e in auid1data.entities)
			if (auid1data.entities[e].AA!=null && id2data.entities[0].AA!=null)
				for (x in auid1data.entities[e].AA)
					for (y in id2data.entities[0].AA) {
						if (auid1data.entities[e].AA[x].AuId!=null && auid1data.entities[e].AA[x].AuId==id2data.entities[0].AA[y].AuId) {
							ans[ans_num++] = [id1, auid1data.entities[e].Id, auid1data.entities[e].AA[x].AuId, id2];
							break;
						}
					}



		//auid id fid id
		for (e in auid1data.entities)
			if (auid1data.entities[e].F!=null && id2data.entities[0].F!=null)
				for (x in auid1data.entities[e].F)
					for (y in id2data.entities[0].F)
						if (auid1data.entities[e].F[x].FId!=null && auid1data.entities[e].F[x].FId==id2data.entities[0].F[y].FId) {
							ans[ans_num++] = [id1, auid1data.entities[e].Id, auid1data.entities[e].F[x].FId, id2];
							break;
						}

		//auid id cid id
		for (e in auid1data.entities)
			if (auid1data.entities[e].C!=null && id2data.entities[0].C!=null)
				if (auid1data.entities[e].C.CId!=null && auid1data.entities[e].C.CId==id2data.entities[0].C.CId) {
					ans[ans_num++] = [id1, auid1data.entities[e].Id, auid1data.entities[e].C.CId, id2];
					}

		//auid id jid id
		for (e in auid1data.entities)
			if (auid1data.entities[e].J!=null && id2data.entities[0].J!=null)
				if (auid1data.entities[e].J.JId!=null && auid1data.entities[e].J.JId==id2data.entities[0].J.JId) {
					ans[ans_num++] = [id1, auid1data.entities[e].Id, auid1data.entities[e].J.JId, id2];
					}


		youget--;
		if (youget==0) resp.end(JSON.stringify(ans));
	}
	
	
	//auid auid
	else if (auid1data.entities.length>id1data.entities.length && auid2data.entities.length>id2data.entities.length) {
		//auid afid auid
		for (e1 in auid1data.entities)
			for (e2 in auid2data.entities)
				if (auid1data.entities[e1].AA!=null && auid2data.entities[e2].AA!=null)
					for (x in auid1data.entities[e1].AA)
						for (y in auid2data.entities[e2].AA) 
							if (auid1data.entities[e1].AA[x].AuId!=null && auid2data.entities[e2].AA[y].AuId!=null && auid1data.entities[e1].AA[x].AuId==id1 &&   auid2data.entities[e2].AA[y].AuId==id2 )
								if (auid1data.entities[e1].AA[x].AfId!=null && auid1data.entities[e1].AA[x].AfId == auid2data.entities[e2].AA[y].AfId) {
									var bo=0;
									for (k in afids) 
										if (afids[k]==auid1data.entities[e1].AA[x].AfId) { bo = 1; break; }
									
									if(bo==0) {
										ans[ans_num++] = [id1, auid1data.entities[e1].AA[x].AfId, id2];
										afids[afids_num++] = auid1data.entities[e1].AA[x].AfId;
									}

									break;
								}


		//auid id auid
		for (e in auid1data.entities)
			if (auid1data.entities[e].AA!=null)
				for (x in auid1data.entities[e].AA)
					if (auid1data.entities[e].AA[x].AuId == id2) {
						ans[ans_num++] = [id1, auid1data.entities[e].Id, id2];
						break;
					}


		//auid id id auid
		for (e1 in auid1data.entities)
			for (e2 in auid2data.entities)
				if (auid1data.entities[e1].RId!=null)
					for (x in auid1data.entities[e1].RId)
						if (auid1data.entities[e1].RId[x]==auid2data.entities[e2].Id) {
							ans[ans_num++] = [id1, auid1data.entities[e1].Id, auid2data.entities[e2].Id, id2];
							break;
						}

		resp.end(JSON.stringify(ans));

	}


	else
		resp.end(JSON.stringify([[]]));


}


function onRequest(req, resp){
	var urlobj=url.parse(req.url,true);
	id1=parseInt(urlobj.query.id1);
	id2=parseInt(urlobj.query.id2);
	get5=0;
	ans = [[]];
	afids = [];
	lu = [[]];
	id1_RId_J=[];
	id3 = [];
	ans_num=0;
	afids_num = 0;
	lu_num = 0;
	id3_num = 0;
	var d = new Date();
	startTime = d.getTime();
	////console.log("kaishile"  + startTime)




	//id1当成AuId读取
	http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=Composite(AA.AuId="+urlobj.query.id1+")&count=1000000&attributes=Id,RId,AA.AuId,AA.AfId,F.FId,C.CId,J.JId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
		var data = "";
		if(res.statusCode!=200) return ;
		res.on('data',function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			auid1data=JSON.parse(data);// eval("auid1data="+data+";");
			////console.log("id1 getauid: "+data);  chushijian();
			++get5;  if(get5==5) getwan(resp);

		}).on('error', function(e) {});
	});
	
	//id2当成AuId读取
	http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=Composite(AA.AuId="+urlobj.query.id2+")&count=1000000&attributes=Id,AA.AuId,AA.AfId,F.FId,C.CId,J.JId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
		if(res.statusCode!=200) return ;
		var data = "";
		res.on('data',function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			auid2data=JSON.parse(data);//eval("auid2data="+data+";");
			////console.log("id2 getauid: "+data);  chushijian();
			if(res.statusCode!=200) return ;
			++get5; if(get5==5) getwan(resp);
		}).on('error', function(e) {});
	
	});

	//id1当成Id读取
	http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=Id="+urlobj.query.id1+"&count=1000000&attributes=Id,RId,AA.AuId,AA.AfId,F.FId,C.CId,J.JId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
		if(res.statusCode!=200) return ;
		var data = "";
		res.on('data',function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			id1data=JSON.parse(data);//eval("id1data="+data+";");
			////console.log("id1 getid: "+data);  chushijian();
			if(res.statusCode!=200) return ;
			++get5; if(get5==5) getwan(resp);
		}).on('error', function(e) {});
	});
	
	//id2当成Id读取
	http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=Id="+urlobj.query.id2+"&count=1000000&attributes=Id,CC,AA.AuId,F.FId,C.CId,J.JId&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
		if(res.statusCode!=200) return ;
		var data = "";
		res.on('data',function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			id2data=JSON.parse(data);//eval("id2data="+data+";");
			////console.log("id2 getid: "+data);  chushijian();
			if(res.statusCode!=200) return ;
			++get5; 
			if(get5==5) getwan(resp);
		}).on('error', function(e) {});
	
	});

	//id2当成RId读取，前一万个点
	http.get("http://oxfordhk.azure-api.net/academic/v1.0/evaluate?expr=RId="+urlobj.query.id2+"&count=10000&attributes=Id&subscription-key=f7cc29509a8443c5b3a5e56b0e38b5a6", function(res) {
		if(res.statusCode!=200) return ;
		var data = "";
		res.on('data',function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			vid2data=JSON.parse(data);//eval("id2data="+data+";");
			////console.log("vid2 get rid=id2");  chushijian();
			if(res.statusCode!=200) return ;
			++get5; if(get5==5) getwan(resp);
		}).on('error', function(e) {});
	
	});





}
http.createServer(onRequest).listen(80);
