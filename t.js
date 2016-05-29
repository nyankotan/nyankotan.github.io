var tasksAdd={};
function genLimit(){
	var date1=new Date();
	for (var c in tasksRaw){
		theme_name=c;
		if (allThemes[theme_name]) {
			setFilters(allThemes[theme_name]);
			autogenLimit();
		}
	}
	var date2=new Date();
	$('#topsearch_note').html('Done! Time used: '+((date2-date1)/1000).toFixed(2)+' secs');
}
function addBoost(boost1,boost2){
	tasksAdd[theme_name]=[boost1,boost2];
}
//below from nikki.js
var calcGlobalClothes=1;
function autogenLimit(){
	//onChangeCriteria, calc normal weight
	criteria = {};
	for (var i in FEATURES) {
		var f = FEATURES[i];
		var weight = parseFloat($('#' + f + "Weight").val());
		if (!weight) {
			weight = 1;
		}
		var checked = $('input[name=' + f + ']:radio:checked');
		if (checked.length) {
			criteria[f] = parseInt(checked.val()) * weight;
		}
	}
	tagToBonus(criteria, 'tag1');
	tagToBonus(criteria, 'tag2');
	if (global.additionalBonus && global.additionalBonus.length > 0) {
		criteria.bonus = global.additionalBonus;
	}
	criteria.levelName = $("#theme").val();
	var clothesOrigScore=[];
	for(var i in clothes){
		clothes[i].calc(criteria);
		var sum_score=(clothes[i].type.mainType=='饰品') ? Math.round(accSumScore(clothes[i],(uiFilter["acc9"]?9:accCateNum))) : clothes[i].sumScore;
		clothesOrigScore[i]=sum_score;
	}
	
	//start loop
	var scoreTotal=0;
	var boosts=[];
	for (var a in FEATURES){
		for (var b in FEATURES){
			if (FEATURES[b]==FEATURES[a]) continue;
			//onChangeCriteria, calc highscore
			criteria = {};
			for (var i in FEATURES) {
				var f = FEATURES[i];
				var weight = parseFloat($('#' + f + "Weight").val());
				if (!weight) {
					weight = 1;
				}
				if (f==FEATURES[b]) {weight=accMul(weight,1.27);criteria.highscore1=f;}
				if (f==FEATURES[a]) {weight=accMul(weight,1.778);criteria.highscore2=f;}
				var checked = $('input[name=' + f + ']:radio:checked');
				if (checked.length) {
					criteria[f] = parseInt(checked.val()) * weight;
				}
			}
			tagToBonus(criteria, 'tag1');
			tagToBonus(criteria, 'tag2');
			if (global.additionalBonus && global.additionalBonus.length > 0) {
				criteria.bonus = global.additionalBonus;
			}
			criteria.levelName = $("#theme").val();
			//calc sumScores
			shoppingCart.clear();
			var currScoreByCate=[];
			var ownCnt=loadFromStorage().size>0 ? 1 : 0;
			for (var i in clothes){
				if ((!calcGlobalClothes)&&(!clothes[i].own)&&ownCnt) continue;
				var c=clothes[i].type.type;
				if ($.inArray(c, skipCategory)>=0) continue;
				if (!currScoreByCate[c]) currScoreByCate[c]=0;
				if (clothesOrigScore[i]*1.778 < currScoreByCate[c]) continue; //short cut, no hope to become the new winner; from ip
				clothes[i].calc(criteria);
				var sum_score= (clothes[i].type.mainType=='饰品') ? Math.round(accSumScore(clothes[i],(uiFilter["acc9"]?9:accCateNum))) : clothes[i].sumScore;
				if (sum_score>currScoreByCate[c]) {
					shoppingCart.put(clothes[i]);
					currScoreByCate[c]=sum_score;
				}
			}
			shoppingCart.validate(criteria);
			shoppingCart.calc(criteria);
			var tmpScore=shoppingCart.totalScore.sumScore;
			if (tmpScore>scoreTotal){
				scoreTotal=tmpScore;
				boosts=[FEATURES[b],FEATURES[a]];
			}
		}
	}
	addBoost(boosts[0],boosts[1]);
}

function supp_byid(id,comp){ //true: comp suppresses/replaces id
	if(id==comp) return false;
	if(clothes[id].simple[0]) { if ( !clothes[comp].simple[0] || Math.abs(clothes[comp].simple[2])<Math.abs(clothes[id].simple[2]) ) return false;}
	if(clothes[id].simple[1]) { if ( !clothes[comp].simple[1] || Math.abs(clothes[comp].simple[2])<Math.abs(clothes[id].simple[2]) ) return false;}
	if(clothes[id].active[0]) { if ( !clothes[comp].active[0] || Math.abs(clothes[comp].active[2])<Math.abs(clothes[id].active[2]) ) return false;}
	if(clothes[id].active[1]) { if ( !clothes[comp].active[1] || Math.abs(clothes[comp].active[2])<Math.abs(clothes[id].active[2]) ) return false;}
	if(clothes[id].cute[0]) { if ( !clothes[comp].cute[0] || Math.abs(clothes[comp].cute[2])<Math.abs(clothes[id].cute[2]) ) return false;}
	if(clothes[id].cute[1]) { if ( !clothes[comp].cute[1] || Math.abs(clothes[comp].cute[2])<Math.abs(clothes[id].cute[2]) ) return false;}
	if(clothes[id].pure[0]) { if ( !clothes[comp].pure[0] || Math.abs(clothes[comp].pure[2])<Math.abs(clothes[id].pure[2]) ) return false;}
	if(clothes[id].pure[1]) { if ( !clothes[comp].pure[1] || Math.abs(clothes[comp].pure[2])<Math.abs(clothes[id].pure[2]) ) return false;}
	if(clothes[id].cool[0]) { if ( !clothes[comp].cool[0] || Math.abs(clothes[comp].cool[2])<Math.abs(clothes[id].cool[2]) ) return false;}
	if(clothes[id].cool[1]) { if ( !clothes[comp].cool[1] || Math.abs(clothes[comp].cool[2])<Math.abs(clothes[id].cool[2]) ) return false;}
	return true;
}
