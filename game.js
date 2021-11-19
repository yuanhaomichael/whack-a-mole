var score = 0
var frozen = false
$(document).ready(function(){
    countdown();
    // "reset" will set "score-data" to 0 and set "timer-data" to 30;
    //  Set all moles to holes
    $("#reset").click(function(){

        $("#score-data").html(0)
        $("#timer-data").html(30)
        score = 0;
        frozen=false
        $("img").attr('src',"hole.png");
        $("img").css({"opacity":"1"});


    })

    var timer_data = $("#timer-data").html();

// moles appear randomly at random interval [append mole element to replace hole]
// mole disappear after certain time [replace mole with hole]
// every 5 seconds, 1-3 holes will have moles
    gamePlay();

    
// when a mole is clicked, it will be replaced with hole. "score-data" increase by 100
    score = 0;
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


function appearDisappear(hole){
    var id = `#hole` + hole;
    var id2 = `hole` + hole;
    var mole_id = `#mole` + hole
    var mole_id2 = `mole` + hole
    $(id).attr('src',"mole.png");
    $(id).prop('id', mole_id2);
    console.log("hole"+hole)

    // mole id may not be correct, check mole_id variable scope
    $(mole_id).click(function(){
        console.log("onclick mole id:" + mole_id)
        if($(mole_id).attr('src') == "mole.png"){
            console.log("+100")
            score = score + 100
        } 
        $("#score-data").html(score)
        $(mole_id).attr('src',"hole.png");
        $(mole_id).prop('id', id2);
        // console.log("click added :" + hole)
    })
    

    // disappear 
    delay = (getRandomInt(2)+1)*1000
    var x = setTimeout(function() {
        $(mole_id).attr('src',"hole.png");
        $(mole_id).prop('id', id2);
        console.log("disappear:" + hole)
        }, delay);

}


function countdown(){
    setInterval(function(){
        var a = $("#timer-data").html();
        if(a>=1){
            $("#timer-data").html(a-1);
        }
        if(a==0 && frozen==false){
            freeze(a)
            frozen=true
        }
    },1000);
}

// game freezes when timer-data=0, only “Reset Game” button functional
function freeze(timer_data){
    if(timer_data == 0){
        console.log("freeze")
        $("img").css({"opacity":"0.4"});
        $("img").attr('src',"hole.png");
        frozen=true
    }
}




function gamePlay(){
        // for(let i=1; i<10; i++){}
        setInterval(() => {
            timer_data = $("#timer-data").html();
            // hole = getRandomInt(9)+1
            // hole_difficult = getRandomInt(9)+1
            
            hole0 = getRandomInt(3)+1
            hole1 = getRandomInt(7)+4
            hole2 = getRandomInt(9)+7
            hole3 = getRandomInt(9)+1
            if(timer_data>=2){
                appearDisappear(hole0)
                delay1 = (getRandomInt(0.5)+0.2)*1000
                setTimeout(function() {
                appearDisappear(hole1)}, delay);
                delay2 = (getRandomInt(0.4)+0.1)*1000
                setTimeout(function() {
                appearDisappear(hole2)}, delay2);
                
                if(hole3!=hole0 && hole3!=hole1 && hole3!= hole2){
                    delay3 = (getRandomInt(0.2)+0.1)*1000
                    setTimeout(function() {
                    appearDisappear(hole3)}, delay3);
                }
            }
        }, (getRandomInt(5)+3)*1000 );  

}


