/* ---------------------- needed vars  na variable START --------------------------------------------------------------------*/
var splash = 0;
var x = 0; //eto ung index na laging tatanggaling sa questionsArray[] , 0 kase laging unang index lang tatanggalen nten;
var localStorageUsername = window.localStorage.getItem("username"); //for checking if already login
var localQuizArrayName = "quizTrolls"; // iba dapat kada game para sa function na storeQuizArrayToLocalStorage

/* ---------------------- needed vars  na variable END --------------------------------------------------------------------*/

/* onload FUNCTIONS START */

var myRsgTimer = "";

var myTimer = "";

var m = 10;

var rsg = 3;
var gameOverScore;

/* onload FUNCTIONS END */

/*---------------------------------- navigation btn and functions START -------------------------------------------*/


$("#stopTime").click(function() {
    start();
});

$("#btn-gameover-test").click(function() {

});

$(".btn-main-menu").click(function() {
    location.href = "index.html";
});

/*
$("#btn-register").click(function(){
	 setTimeout(function(){
			 $modal.load('registration_page.html', '', function(){
			  $modal.modal();
			});
		  },10); 
});
*/
$("#btn-score-post-online").click(function() {
    postScoreOnline();
});

$("#btn-play").click(function() {
    selectPage = "#main-game"; //id of the windowContainer
    changePage();
    $(".customModal").fadeToggle();
    setTimeout(function() {
        startRsg();
    }, 800);
    savePreviousScore();
});


$("#btn-play-again").click(function() {
    savePreviousScore();
    pageWrapper2Up();
    setTimeout(function() {
        startRsg();
    });
});



$(".btn-choice").click(function() {
    //check answer START
    var answer = $(this).val();
    var correctAnswer = $("#correct-answer").val();
    if (answer == correctAnswer) {
        addScore();
        getQuestion();
    } else {
        gameOver();
        //gameStart();
    }
    //check answer END
}); //onclick btn-choice END

$("#my-logout").click(function() {
    logout();
});
/*---------------------------------- navigation btn and functions END -------------------------------------------*/




/* -------------------------------------- functions START --------------------------------------------------------------------*/
//for index.html onload
/*
function splashScreenIntro(){
	var a = sessionStorage.getItem("splash_start");
	if(a == null || a == "" || a == "null" || a == "undefined"){
		setTimeout(function(){
			$(".splashImg").fadeToggle();
				setTimeout(function(){
					$("#splashScreen").fadeToggle();
					//location.href = "index.html";
					sessionStorage.setItem("splash_start",1);
				});
			
		},5000);//1000 for 1 sec
	}else{
		$("#splashScreen").css({"height":"0"});
		$(".splashImg").css({"height":"0"});
		$(".splashImgLogo").css({"height":"0"});
					
	
	}
	
}
*/

//for index.html onload
function checkIfLogin() {
    if (localStorageUsername == "" || localStorageUsername == null) {
        $("#btn-login").val("LOG IN");
        $("#btn-register").show();
        $("#loginform_container").show();
        $("#my-logout").hide();
        $("#txt-username").text("");

        //$("#txt-username").text("");
    } else {
        $("#loginform_container").hide();
        $("#my-logout").show();
        $("#txt-username").html("<h3>WELCOME <h3/><h1>" + localStorageUsername + "</h1>");
        //$("#btn-login").val("Log Out");
        $("#btn-register").hide();
    }

}

function logout() {
    //checkIfLogin();
    if (localStorageUsername == "" || localStorageUsername == null || localStorageUsername == "null") {
        //alert("1");
    } else {
        //alert("2");
        //if already login ,clear localstorage and change btn-login value
        //logout functions means clearing localstorage 
        window.localStorage.setItem("user_id", "");
        window.localStorage.setItem("username", "");
        //$("#txt-username").text("");
        $("#txt-username").text("");
        //$("#btn-login").val("LOG IN");
        $("#btn-register").show();
        $("#loginform_container").show();
        $("#my-logout").hide();
        //pageWrapper3Up();
        //alert("You are log out");
    }
}

//for leaderboard_page.html onload
function getLeaderboard() {

    var rank = 0;
    $.ajax({
        url: "http://pmawtrolls.esy.es/pmaw_trolls_quiz_online_files/display_leaderboard.php",
        type: "GET",
        dataType: "json",

        success: function(data) {
            $(".leaderboardRow").remove();
            for (var i = 0; i < data.length; i++) {
                rank++

                $('#leaderboardTable').append(
                    '<tr class="leaderboardRow"><td>' + rank + '</td><td>' + data[i].user_username + '</td><td>' + data[i].score_score + '</td> </tr>'

                );
            }
        },
        error: function() {
            //do something if error
        }

    });
}

//activate when #btn-post-score-online .click 
function postScoreOnline() {
    //check if user is login
    //check in local storage if user_username and user_id is stored

    var a = window.localStorage.getItem("user_id");
    var b = window.localStorage.getItem("username");
    var c = window.localStorage.getItem("local-storage-game-over-score");

    if (a == null || a == "") {
        //$("#game_over_page_msg").html("You need to <button class='my-btn-login btn' value='login'></button>");
        //alert("You should login to post online");
        //location.href = "login_page.html";
        pageWrapper3Down();
    } else if (a == "no internet connection") {
        //alert("No internet connection");
        $("#game_over_page_msg").html("No internet connection");
    } else {
        //check if have internet
        $.ajax({
            url: "http://pmawtrolls.esy.es/pmaw_trolls_quiz_online_files/post_score_online.php",
            type: "POST",
            data: {
                "user_id": a,
                "user_username": b,
                "score": c
            },
            success: function(data) {
                if (data == "not") {
                    //alert("Failed");
                    $("#game_over_page_msg").html("Failed");
                } else if (data == "success") {

                    //alert("up");
                    //alert("Ok na!. na POST NA BOOOOOOOOOOOOOOOM!");
                    $("#game_over_page_msg").html("your score was posted online");
                    $(".btn-special-post").hide();


                } else {
                    $(".btn-special-post").hide();

                    $("#game_over_page_msg").html("your score was posted online!");

                    //alert(data);
                }
            }

        });
    }
}

//for index.html onload
function storeQuizArrayToLocalStorage() {
    var db = window.localStorage.getItem(localQuizArrayName);
    if (db == null || db == "") {
        window.localStorage.setItem(localQuizArrayName, JSON.stringify(quizArray)); // quizArray naka include sa taas sa <script></script>
        //alert(localQuizArrayName + " \n store to db");
    } else {
        //alert("db  " + localQuizArrayName + "  already exist!");
    }
}


//for main_game_page.html under the function gameStart()
function start() {
    m = 10;

    $("#gameTimer").val(m);
    $("#gameTimer").html(m);
    clearTimeout(myTimer);
    clearInterval(myTimer);

    setTimeout(function() {
        myTimer = setInterval(function() {
            myTimer1()
        }, 1000);
    });
}

function myTimer1() {
    //var time = document.getElementById("gameTimer").value=m;
    setTimeout(function() {
        $("#gameTimer").val(m);
        $("#gameTimer").html(m);
    });
    m--;



    if (m == 0) {
        //alert("Game Over!!! Try Again"+'\n'+"You have to quit the game...");
        //clearTimeout(myTimer);
        clearTimeout(myTimer);
        clearTimeout(myTimer);
        //clearInterval(myTimer);
        gameOver();
    }
}

//timer END

function startRsg() {
    $("#question").html("");
    $("#score").val("0");
    $("#score").html("0");
    $("#gameTimer").val("0");
    $("#gameTimer").html("0");

    $("#btn-choice-1").val("TRUE");
    $("#btn-choice-2").val("FALSE");
    setTimeout(function() {
        rsg = 3;

    });

    //$("#rsgTimer").val(rsg);
    //$("#rsgTimer").html(rsg);

    $("#rsgTimer").html("READY!");
    $(".customModal").show();

    clearTimeout(myRsgTimer);
    clearInterval(myRsgTimer);

    setTimeout(function() {
        myRsgTimer = setInterval(function() {
            myRsgTimer1()
        }, 700);
    });
}

function myRsgTimer1() {
    //var time = document.getElementById("gameTimer").value=m;
    setTimeout(function() {
        //$("#rsgTimer").val(rsg);
        //$("#rsgTimer").html(rsg);

    });
    rsg--;
    if (rsg == 3) {
        $("#rsgTimer").html("READY!");

    }
    if (rsg == 2) {
        $("#rsgTimer").html("SET!");
    }
    if (rsg == 1) {
        $("#rsgTimer").html("GO!!!");
    }



    if (rsg == 0) {
        //alert("Game Over!!! Try Again"+'\n'+"You have to quit the game...");
        //clearTimeout(myTimer);
        clearTimeout(myRsgTimer);
        clearTimeout(myRsgTimer);
        //clearInterval(myTimer);
        //gameOver();
        $("#rsgTimer").html("");
        $("#rsgTimerModal").hide();
        gameStart();
    }
}

//timer END


function getQuestionsIndexes() {
    setTimeout(function() {
        var questionsIndexes = [];
        var quizArray = JSON.parse(window.localStorage.getItem(localQuizArrayName));
        //get quizArray on localStorage

        for (i = 0; i < quizArray.length; i++) {
            questionsIndexes.push(i);
        }

        var randomizeIndexes = []; //eto ung array na paglalagyan ng mararandom na mga questionsIndexes
        var i = questionsIndexes.length;
        var j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            randomizeIndexes.push(questionsIndexes[j]);
            questionsIndexes.splice(j, 1);
        }

        questionsArray = randomizeIndexes; // naka random na ung indexes ng mga questions naten
        $("#testArray").val(questionsArray);
        getQuestion();

    });
};

//for main_game_page.html activate on page onload and on next question
function getQuestion() {

    if (questionsArray == "") {
        gameOver();
    } else {
        var quizArray = JSON.parse(window.localStorage.getItem(localQuizArrayName));
        start();
        //	$.ajax({
        //		url: "quiz.js",
        //		type: "GET",
        //		dataType: "json",
        //		success: function(data){
        var get = questionsArray[0];
        var question = quizArray[get].question;
        var choice1 = quizArray[get].choice1;
        var choice2 = quizArray[get].choice2;
        var choice3 = quizArray[get].choice3;
        var choice4 = quizArray[get].choice4;
        var correct = quizArray[get].correct;

        //$("#question").val(question);
        $("#question").html(question);
        //$("#choice1").val(choice1);
        $("#btn-choice-1").val(choice1);
        //$("#choice2").val(choice2);
        $("#btn-choice-2").val(choice2);
        $("#correct-answer").val(correct);


        var removed = questionsArray.splice(x, 1);
        $("#testArray").val(questionsArray);
        //	},
        //	error: function(){
        //do something if $.ajax not success
        //	}
        //});	
    }
};

//for main_game_page.html onload
function gameStart() {
    reset();
    getQuestionsIndexes();

};

//for main_game_page.html onload , activate if answer is correct
function addScore() {
    //alert("MAY TAMA KA!");
    var a = parseInt($("#score").val()) + 1;
    $("#score").val(a);
    $("#score").html(a);
}

//for main_game_page.html onload, activate on gameStart()
function reset() {
    var score = 0; //player's SCORE

    $("#score").val(score);
    $("#score").html(score);

    //alert("New Game na!");
};

//for main_game_page.html activate on Wrong Answer
function gameOver() {

    gameOverScore = $("#score").val();
    gameOverScore = $("#score").html();
    //alert(gameOverScore.toString());

    $('.twitter-share-button').attr('data-text', gameOverScore);


    var previousScore = window.localStorage.getItem("local-storage-previous-score");
    $(".btn-special-post").show();
    $("#game_over_page_msg").html("");

    //alert("Wrong Answer! \n GAME OVER!\n Your Score: "+ gameOverScore + "\n Previous Score: " + previousScore );

    saveGameOverScoreOnLocalStorage(); //save game over score to local storage

    /* stop timer*/
    clearTimeout(myTimer);
    clearInterval(myTimer);

    clearTimeout(myRsgTimer);
    clearInterval(myRsgTimer);


    /* stop timer*/
    //location.href = "game_over_page.html";
    /* modal START*/
    /*	var $modal = $('#main_game_modal_container');
    	  setTimeout(function(){
    		 $modal.load('game_over_page.html', '', function(){
    		  $modal.modal();
    		});
    	  },1); 
    	
    	/* modal END*/

    pageWrapper2Down();
    var ggScore = window.localStorage.getItem("local-storage-game-over-score");

    //	$("#txt-game-over-score").html(ggScore);
    //	$("#txt-previous-score").html(previousScore);
    displayGameOverScoreAndPreviousScore();
    //onload palang my var na ng previous-score
    //magkaiba ung function ng set previous tska getItem
    //	var current-score = ;
    //var previous-score = window.localStorage.getItem("local-storage-previous-score");
    // store array to localstorage
    //window.localStorage.setItem("local-storage-previous-score", previous-score );
};

//function for game_over_page.html onload
function displayGameOverScoreAndPreviousScore() {
    var localGameOverScore = window.localStorage.getItem("local-storage-game-over-score");
    var localPreviousScore = window.localStorage.getItem("local-storage-previous-score");

    if (localPreviousScore == "null" || localPreviousScore == "" || localPreviousScore == "undefined" || localPreviousScore == null) {
        localPreviousScore = 0;
    }
    $("#txt-game-over-score").html(localGameOverScore);
    $("#txt-previous-score").html(localPreviousScore);
}

//function for game_over_page.html onload
function timerStart() {


}


function getPreviousScore() {
    var previouScore = window.localStorage.getItem("local-storage-previous-score");

}
//function for main_game_page.html onload
function saveGameOverScoreOnLocalStorage() {
    var gameOverScore = $("#score").val();
    var gameOverScore = $("#score").html();
    window.localStorage.setItem("local-storage-game-over-score", gameOverScore);
}

//function for main_game_page.html onload
function savePreviousScore() {

    var gamePreviousScore = window.localStorage.getItem("local-storage-game-over-score");
    window.localStorage.setItem("local-storage-previous-score", gamePreviousScore);


}

function clearForms() {
    /*login form start*/
    $("#login_username").val("");
    $("#login_password").val("");

    /*login form END*/

    /* reg form START */

    $("#username").val("");
    $("#uemail").val("");
    $("#upassword").val("");
    $("#ucpassword").val("");
    $("#login_popuptext").html("");
    $("#regErrorMsg").html("");
    $("#popuptext").html("");

    /* reg form END */
}



/* -------------------------------------- functions END --------------------------------------------------------------------*/

//LOGIN Scripts
var lform = $("#loginform");
  function verifyLoginfirst(){
  	$("#login_popuptext").html("");
  	if($( "#login_username" ).val() == "" || $( "#login_password" ).val() == "")
  	{
  		$("#login_popuptext").html("<h3>Please Enter Username/Password</h3>");
  	return;
  	}
  		$.getJSON("http://pmawtrolls.esy.es/pmaw_trolls_quiz_online_files/login.php?callback=?",lform.serialize(), function(data)
  		{
  		
  			if (data.allow == "yes")
  			{
  				localStorage.setItem("username", data.username);
  				localStorage.setItem("user_id",data.user_id);
  				var localStorageUsername = window.localStorage.getItem("username");//for checking if already login
  		
  				$("#login_username").val("");
  				$("#login_password").val("");
  				//location.href="index.html";	
  				
  				pageWrapper3Up();
  				setTimeout(function(){
  					$("#txt-username").html("<h3>WELCOME <h3/><h1>"+localStorageUsername+"</h1>");
  		
  					$("#loginform_container").hide();
  					$("#my-logout").show();
  					$("#btn-register").hide();
  					
  					$("#login_popuptext").text("");
  					
  		
  				},500);
  				//$("#regErrorMsg").html("<h2>You are now login</h2>");
  			}
  			else if(data.allow == "no")
  			{
  				$("#login_popuptext").html("<h3>The account you've entered is not registered.</h3>");
  
  			}
  			else if(data.allow == "maybe")
  			{
  				$("#login_popuptext").html("<h3>Incorrect password.</h3><h3>Please Try Again</h3>");
  
  			}else{
  				$("#login_popuptext").html("<h3>Problem with your login, Please check internet connection or try again later.</h3>");
  			}
  		}).fail(function(data){
  			
  			$("#login_popuptext").html("<h3>Problem with your login, Please check internet connection or try again later.</h3>");
  			
  			
  		});
  	}


//REG script
var rform = $("#regForm");
  function verifyRegfirst(){
  	$("#reg_popuptext ").html("");
  	if($( "#username" ).val() == "" || $( "#upassword" ).val() == "" || $( "#uemail" ).val() == "" || $( "#ucpassword" ).val() == "")
  	{
  		$("#reg_popuptext ").html("<h3>Please Complete the Form</h3>");
  		
  	}else if($("#upassword").val() != $("#ucpassword").val()){
  	
  		$("#reg_popuptext ").html("<h3>Password did not match</h3>");
  		
  	
  	}else{
  		$.getJSON("http://pmawtrolls.esy.es/pmaw_trolls_quiz_online_files/register_check.php?callback=?",rform.serialize(), function(data)
  		{
  		
  			if (data.eexists == "exists")
  			{
  				$("#reg_popuptext ").html("<h3>The email address is already use.</h3>");
  			}
  			else if(data.uexists == "exists")
  			{
  				
  				$("#reg_popuptext ").html("<h3>The username is already use</h3>");
  
  			}
  			else
  			{
  				$.getJSON("http://pmawtrolls.esy.es/pmaw_trolls_quiz_online_files/register_user.php?callback=?",rform.serialize(), function(data)
  				{
  					$("#username").val("");
  					$("#uemail").val("");
  					$("#upassword").val("");
  					$("#ucpassword").val("");
  					//modal regcomplete
  					$("#reg_popuptext ").html("<h3>Registration Success!</h3>");
  						setTimeout(function(){
  						pageWrapper4Up();
  					
  					},500);
  					//check if login
  					var a = window.localStorage.getItem("username");
  					if(a == "null" || a == "" || a == "undefined"){
  						//location.href = "login_page.html";
  						//alert("1");
  						//$("#regErrorMsg").html("<h3>Registration Success</h3>");
  					}else{
  						//location.href = "index.html";
  						$("#reg_popuptext ").html("<h3>Registration Success</h3>");
  					}
  					
  				}).fail(function(){
  				
  					$("#reg_popuptext ").html("<h6>Registration Failed!</h6>");
  				});
  
  			}
  		}).fail(function(data){
  			
  			$("#reg_popuptext ").html("<h6>Problem with your login, Please check internet connection or try again later.</h6>");
  			
  			
  		});
  	}
  }