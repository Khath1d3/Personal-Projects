var R1 = document.querySelectorAll("[class^='one_'] input");
var R2 = document.querySelectorAll("[class^='two_'] input");
var R3 = document.querySelectorAll("[class^='three_'] input");
var h2 = document.querySelector("h1")
var playerturn='X';


function disable(R){
    R.forEach(function(x){
        x.disabled=true
        
    })
}
function enable(R){
    R.forEach(function(x){
        x.disabled=false
        
    })
}

disable(R2)
disable(R3)

var list=["1","2","3","4","5","6","7","8","9"]
var score_for_x=0
var score_for_o=0
round(R1);


function round(R) {
    R.forEach(function(div) {
        function click_handler() {
            if (!div.value) {
                div.value = playerturn;
                div.classList.add("clicked");
                let prevturn = playerturn;
                playerturn = playerturn === 'X' ? 'O' : 'X';
                h2.textContent = playerturn + '\'s TURN';
                list = updatelistboard(R);
        
                if ((!WinMethod(prevturn,R) && checkRoundOver(R))) {
                    h2.textContent = 'It\'s a draw';
                    list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
                    disable(R)
                     if(count<2)   activateNextRound(playerturn);
                }
            }
        };

        div.addEventListener("click", click_handler);
    });
}
function WinMethod(prevturn,R){
    if (checkwin(list,R)) {
        list = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        h2.textContent = prevturn + ' Wins';
        prevturn==='X' ? score_for_x++ : score_for_o++;
        disable(R)
        activateNextRound(prevturn);
        return true
    }
    return false
}



function checkRoundOver(R) {
    for (var i = 0; i < R.length; i++) {
        if (!R[i].value) {
            return false;
        }
    }
    return true;
}



function updatelistboard(R) {
     var uplist = list;
    for (var i = 0; i < R.length; i++) {
        if (R[i].classList.contains("clicked")) {
            list[i]=(R[i].value);
        }
    }
    return list;
}
function OverallWin(){
    if(score_for_o>score_for_x){
        h2.textContent = 'O Wins Overall Match';
       }
    else if (score_for_o<score_for_x){
           h2.textContent = 'X Wins Overall Match';
       }
       else{
        h2.textContent='Match is a draw'
       }
}

var count=0
function activateNextRound() {
    if (count===0) {
        enable(R2)
        round(R2);
    } else if(count===1) {
        enable(R3)
        round(R3);
    }
    count++;
    if (count === 3) {
        OverallWin();
    }
   
}



function checkwin(checklist, R) {
    const winningCombinations = [
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Rows
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Columns
        [0, 4, 8], [6, 4, 2]              // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (checklist[a] === checklist[b] && checklist[b] === checklist[c]) {
            R[a].style.color = 'blue';
            R[b].style.color = 'blue';
            R[c].style.color = 'blue';
            return true;
        }
    }

    return false;
}

