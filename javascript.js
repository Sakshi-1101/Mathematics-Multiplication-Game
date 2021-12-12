var playing = false ;
var score ;
var action ;
var timeremaining ;
var CorrectAns ;

//if we click on the start/reset
document.getElementById("startreset").onclick = function()
{
    //if we are playing
    if(playing == true)
    {
        //reload page
        location.reload();
    }

    //if we are not playing
    else
    {
        //set score to 0
        score = 0 ;
        //set score value in the html content , whenever we reset game we need to change value to score = 0
        document.getElementById("scorevalue").innerHTML = score ;

        //show the timing box
        show("timeremaining");

        //set initial value of time remaining
        timeremaining = 60 ;
        document.getElementById("time").innerHTML = timeremaining ;

        //hide the game over box which will be there once your game is over and you start the game again
        hide("gameOver");

        //change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game" ;

        //change mode to playing 
        playing = true ;

        //show countdouwn for time remaining
            //reduce time by 1 sec in loops
                //time left?
                    //yes -> continue
                    //no -> gameover
        startCountdown();
        
        //generate new Q&A
        generateQA();
    }
    
}


//if we click on answer boxes
for(i = 1 ; i <= 4 ; i ++)
{
    document.getElementById("box" + i).onclick = function()
    {
        //if we are playing
        if(playing == true)
        {
            //correct?
                //yes
                if(this.innerHTML == CorrectAns)
                {
                    //increase score by 1
                    score ++ ;
                    document.getElementById("scorevalue").innerHTML = score ;

                    //hide try again box
                    hide("wrong");

                    //show correct box
                    show("correct");

                    //show correct box for 1sec and then hide it
                    setTimeout(function()
                    {
                        hide("correct");

                    } , 1000);

                    //generate new Q&A
                    generateQA();
                }
                //no
                else
                {
                    //hide correct box
                    hide("correct");

                    //show try again box
                    show("wrong");

                    //show try again box for 1sec and then hide it
                    setTimeout(function()
                    {
                        hide("wrong");

                    } , 1000);

                }
        }

    }
}

        

//FUNCTIONS

//start counter
function startCountdown()
{
    action = setInterval(function()
    {
        //reduce time by 1 sec in loops
        timeremaining -= 1 ; 
        document.getElementById("time").innerHTML = timeremaining;

        //time left?
            //no -> stop countdown
            //   -> display game over
            if(timeremaining == 0)
            {
                stopCountdown();
                show("gameOver");
                document.getElementById("gameOver").innerHTML = "<p>game over!!</p> <p>your score is " + score + "</p>";

                //we want to hide the following boxes when game over is displayed
                    // time remaining box
                    // try again box
                    //correct box
                hide("timeremaining");
                hide("correct");
                hide("wrong");

                //changing mode to not playing mode since game is over
                playing = false ;

                //change button to start game when game is over
                document.getElementById("startreset").innerHTML = "Start Game" ;
            }

            //yes -> continue

    } , 1000);
}

//stup counter
function stopCountdown()
{
    clearInterval(action);
}

//hide element
function hide(Id)
{
    document.getElementById(Id).style.display = "none";
}

//show element
function show(Id)
{
    document.getElementById(Id).style.display = "block";
}

//generate new ques and multiple options with an ans
function generateQA()
{
    //to get numbers between 1 and 10 excluding 0
    var x = 1 + Math.round(Math.random() * 9);
    var y = 1 + Math.round(Math.random() * 9);
    CorrectAns = x * y ;

    document.getElementById("question").innerHTML = x + "x" + y ;

    //choosing random position among boxes 1 to 4.
    var correctBox = 1 + Math.round(Math.random() * 3);
    //filling randomly one box with correct answer.
    document.getElementById("box" + correctBox).innerHTML = CorrectAns ;

    //filling other boxes with wrong ans
    for(i = 1 ; i <= 4 ; i ++)
    {
        if(i != correctBox)
        {
            var WrongAns;

            //we have to generate a unique wrong ans val that is different from correct ans as well as other wrong ans.
            var answer = [CorrectAns];

            //we used do..while() bcoz we need to execute code atleast once..
            do
            {
                //generating product of two random numbers between 1 and 10
                WrongAns = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9)) ; 

            }while(answer.indexOf(WrongAns)>-1) // if wrong ans present in answer array it will generate new value

            //placing wrong ans in the box corresponding to the position i
            document.getElementById("box" + i).innerHTML = WrongAns ;

            /*storing the generated value of wrong ans in the answer array so that for unique values it 
              will compare with this value in next turn.*/
            answer.push(WrongAns);
        }
    }


}