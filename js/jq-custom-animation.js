
var selectPage = "";
	
	
if(splash == 0){
	setTimeout(function(){
	//$("#splashScreen").animate({top:'-3000px'},500);
	$("#splashScreen").fadeToggle(500);
	modalToggle();
	},5000);//5000

	$(".splashImages").fadeToggle(500);
	//splash = 1;
}	
			
			
			
function changePage(){
	//assign value for selectPage on button Click in each button
	
	var page = selectPage;
	setTimeout(function(){
		upAndChangePage();
	},100),
	setTimeout(function(){
		$(".windowContainer").hide();
		$(page).show();
	},500),
	setTimeout(function(){
		
	});//orig 2000
}
/*

function changePage(){
	if(selectPage == "btn-choice-2"){
		selectPage == "main-menu-page.html";
	}else if(selectPage == "btn-play"){
		selectPage = "main-game-page.html";
	}else if (selectPage == "btn-play2"){
		selectPage = "board-game-over.html"
	}else if(selectPage == "btn-play5"){
		selectPage = "board-login.html";
	}else if(selectPage == "btn-play4"){
		selectPage = "board-register.html";
	}else if(selectPage == "btn-play3"){
		selectPage = "board-high-scores.html";
	}else{
		alert();
	}
	var page = selectPage;
	
	setTimeout(function(){
		upAndChangePage();
	},100),
	setTimeout(function(){
		$("#page-wrapper").load(page);
	},500),
	setTimeout(function(){
		
	},2000);
}

*/
			
			
function hideMainMenu(){
	$("#main-menu").animate({top:'10px'},100);
	setTimeout(function(){
		$("#main-menu").animate({top:'-2000px'},1000);
	}),
	
	setTimeout(function(){showMainGame();
	});
	
	
}
/*

function hideMainGame(){
	
		$("#main-game").animate({top:'-400px'});
		setTimeout(function(){
		$("#main-game").animate({top:'-2000px'},200);
		},100);
	
}
*/
/*

function showMainMenu(){
	
		$("#main-menu").animate({top:'60px'});
		setTimeout(function(){
		$("#main-menu").animate({top:'10px'},200);
		},100);
		
}
*/
			
function showMainGame(){
	
		$("#main-game").animate({top:'-620px'});
		setTimeout(function(){
		$("#main-game").animate({top:'-580px'},200);
		});
		
}


function modalToggle(){
	$(".modalDarkBg").fadeToggle(500);
}


function showBoard(){
	$("#board").animate({top:'-1100px'},600);
}
function hideBoard(){
	$("#board").animate({top:'+=1100px'},200);
}


function upAndChangePage(){
	$("#page-wrapper").animate({top:'+=200px'},200);
	
	setTimeout(function(){
		$("#page-wrapper").animate({top:'-1200px'},200);
		$("#page-wrapper").animate({top:'-1024px'},20);
		//$("#page-wrapper").animate({top:'+=1024px'},200);
		
		$("#page-wrapper").animate({top:'+=1054px'},200);
		$("#page-wrapper").animate({top:'-=50px'},200);
		},100);

}
			
			/* pageWrapper2  START*/
		
function pageWrapper2Up(){
	$("#page-wrapper2-bg").hide();
	//$("#page-wrapper2").animate({top:'+=150px'},10);
	$("#page-wrapper2").animate({top:'+=150px'},125);
	
	//setTimeout(function(){
		//$("#page-wrapper2").animate({top:'-1200px'},350);
		$("#page-wrapper2").animate({top:'-1024px'},125);
		//$("#page-wrapper").animate({top:'+=1024px'},200);
		//$("page-wrapper2").hide();
		//$("#page-wrapper2").animate({top:'+=1054px'},200);
		//$("#page-wrapper2").animate({top:'-=50px'},200);
	//	},100);

}
			
function pageWrapper2Down(){
	$("#page-wrapper2-bg").show(1);
	$("#page-wrapper2").show(1);
	//$("#page-wrapper2").animate({top:'+=200px'},400);
	
	//setTimeout(function(){
		//$("#page-wrapper2").animate({top:'-1200px'},350);
		//$("#page-wrapper2").animate({top:'-1024px'},500);
		//$("#page-wrapper2").animate({top:'+=1024px'},200);
		//$("page-wrapper2").hide();
	
		//$("#page-wrapper2").animate({top:'+=1074px'},10);
		$("#page-wrapper2").animate({top:'+=1024px'},1);
		//$("#page-wrapper2").animate({top:'-=50px'},5);
	//	},1);

}
/* pageWrapper2  END*/

/* pageWrapper3  START*/

function pageWrapper3Up(){
	$("#page-wrapper3-bg").hide();
	$("#page-wrapper3").animate({top:'+=150px'},125);
	setTimeout(function(){
	
		//$("#page-wrapper2").animate({top:'-1200px'},350);
		$("#page-wrapper3").animate({top:'-1024px'},250);
		//$("#page-wrapper").animate({top:'+=1024px'},200);
		//$("page-wrapper2").hide();
		//$("#page-wrapper2").animate({top:'+=1054px'},200);
		//$("#page-wrapper2").animate({top:'-=50px'},200);
	});
	
		
		

}
function pageWrapper3Down(){
	$("#page-wrapper3-bg").show(1);
	$("#page-wrapper3").show(1);
	//$("#page-wrapper2").animate({top:'+=200px'},400);
	
	
		//$("#page-wrapper2").animate({top:'-1200px'},350);
		//$("#page-wrapper2").animate({top:'-1024px'},500);
		//$("#page-wrapper2").animate({top:'+=1024px'},200);
		//$("page-wrapper2").hide();
		
		$("#page-wrapper3").animate({top:'+=1074px'},125);
		//$("#page-wrapper3").animate({top:'+=1024px'},1);
	
		setTimeout(function(){
		$("#page-wrapper3").animate({top:'-=50px'},125);
		});

}
/* pageWrapper3  END*/
/* pageWrapper4  START*/
function pageWrapper4Up(){
	$("#page-wrapper4-bg").hide();
	$("#page-wrapper4").animate({top:'+=150px'},125);
	
	setTimeout(function(){
		//$("#page-wrapper2").animate({top:'-1200px'},350);
		//$("#page-wrapper4").animate({top:'-1024px'},600);
		$("#page-wrapper4").animate({top:'-1024px'},250);
		//$("#page-wrapper").animate({top:'+=1024px'},200);
		//$("page-wrapper2").hide();
		//$("#page-wrapper2").animate({top:'+=1054px'},200);
		//$("#page-wrapper2").animate({top:'-=50px'},200);
		});

}

function pageWrapper4Down(){
	$("#page-wrapper4-bg").show(1);
	$("#page-wrapper4").show(1);
	//$("#page-wrapper2").animate({top:'+=200px'},125);
	$("#page-wrapper4").animate({top:'+=1074px'},125);
		
	setTimeout(function(){
		//$("#page-wrapper2").animate({top:'-1200px'},350);
		//$("#page-wrapper2").animate({top:'-1024px'},500);
		//$("#page-wrapper2").animate({top:'+=1024px'},200);
		//$("page-wrapper2").hide();
		
		//$("#page-wrapper4").animate({top:'+=1024px'},250);
		$("#page-wrapper4").animate({top:'-=50px'},125);
		});

}
/* pageWrapper4  END*/
	
		
		
		
		
		
		


$("#btn-down-wrapper2").click(function(){pageWrapper2Down()});

$("#upWrapper2").click(function(){pageWrapper2Up()});

$("#downWrapper3").click(function(){pageWrapper3Down();});

$("#btn-up-wrapper3").click(function(){pageWrapper3Up()});

$("#downWrapper4").click(function(){pageWrapper4Down();});

$("#btn-up-wrapper4").click(function(){pageWrapper4Up()});
			

	

$(".btn-back-to-main-menu").click(function(){
		selectPage = "#main-menu";
		changePage();
	});

$("#btn-leaderboard").click(function(){
	selectPage = "#board-modal-leaderboard";
	getLeaderboard();
	changePage();
	});
	
$("#btn-register").click(function(){
		//selectPage = "#board-modal-register";
		//changePage();
		pageWrapper4Down();
	});
	

$("#btn-option").click(function(){
		//selectPage = "#board-modal-login";
		//changePage();
		pageWrapper3Down();
	});
$(".my-btn-login").click(function(){
		//selectPage = "#board-modal-login";
		//changePage();
		pageWrapper3Down();
	});
$("#btn-btn-choice-3").click(function(){
		//gameOver();
		//to do -- paglabas ng game over dapat nakapatong
	});
	

	
//$("#btn-score-post-online").click(function(){
		//to do -- lalagyan pa ng functions
		
		//check if login
			//if login 
			//post online message "Score posted Online!"
		//if not login
		//postScoreOnline();
		//pageWrapper3Down();
//	});
	
		
		
$("#show").click(function(){
	showMainMenu();
});

$("#showMainGame").click(function(){
	showMainGame();
	
});

$("#hideMainGame").click(function(){
	hideMainGame();
	setTimeout(function(){
		showMainMenu();
		
	},500);
	
});

$("#btn-choice-1").click(function(){
	
	
});

$("#btn-main-menu").click(function(){
		
	hideBoard();
	setTimeout(function(){
		hideMainGame();
	},500);
	
	
});
$("#btn-back-to-main-menu-from-game-over").click(function(){
		
	//hideBoard();
	//setTimeout(function(){
	//	hideMainGame();
	//},500);
	pageWrapper2Up();
	selectPage = "#main-menu";
	changePage();
	
});

$("#btn-back-to-leaderboard-from-game-over").click(function(){
		
	//hideBoard();
	//setTimeout(function(){
	//	hideMainGame();
	//},500);
	alert;
	pageWrapper2Up();
	selectPage = "#board-modal-leaderboard";
	changePage();
	
});
		
		