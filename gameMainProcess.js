let a, b, ans = -1, charOprt, chargAns, coin = 0; level = 1;
let bank = new Map;
let rand = [0, 0, 0, 0];
let allwskip = false;
const ansLbl = document.getElementsByName('ans');
const radBtn = document.getElementsByName('choice');
const musicPlayer = document.getElementById("musicPlayer");

musicPlayer.loop = true;
musicPlayer.play();

function questionmaker(level){
    mn = 1 * Math.pow(10, level-1);
    mx = 1 * Math.pow(10, level);

    a  = Math.floor(Math.random() * ( mx - mn ) + mn);
    b  = Math.floor(Math.random() * ( mx - mn ) + mn);
    stringOprt = "+-*/";
    charOprt = stringOprt[Math.floor(Math.random() * ( 4 - 0) + 0)]; // true option

    bank = new Map([
        ["+", a + b], 
        ["-", a - b], 
        ["*", a * b], 
        ["/", (a/b).toPrecision(3)]
    ])
    document.getElementById("question").innerHTML = `${a} ${charOprt} ${b} = ? `;  //display question

    ans = bank.get(charOprt); // true answer value  // hint
    
}
function AnsMaker(ans){
    

    for(let i = 0; i <= 3; i++){
        rand[i] = Math.floor(Math.random() * ((ans + 20) - (ans - 20)) + (ans - 20));
    }
    rand[Math.floor(Math.random() * ( 4 - 0) + 0)] = ans;


    document.getElementById("ansA").innerHTML = rand[0];
    document.getElementById("ansB").innerHTML = rand[1];
    document.getElementById("ansC").innerHTML = rand[2];
    document.getElementById("ansD").innerHTML = rand[3];

}
function Update(coin, level, cond = false){
    
    

    if(coin <= 0 ) if(!cond) window.alert("YOU LOSE");

    document.getElementById("coin").innerHTML = `COIN: ${coin}`;
    document.getElementById("level").innerHTML = `LEVEL: ${level}`;
}
document.getElementById("send").onclick = function(){

    var isChoose = false;
    for(let i = 0; i < radBtn.length; i++){
        if(radBtn[i].checked){
            if(String(ansLbl[i].innerHTML) == String(ans)){
                coin++
                document.getElementById("condition").innerHTML = "🤩";
            }
            else{
                document.getElementById("condition").innerHTML = "🤮";
                if(coin > 0) coin--;
                
            }
            Update(coin, level);
            isChoose = true;
        }
        radBtn[i].checked = false;
    }

    if(coin % 10 == 0 && coin != 0){
        level++;
        Update(coin, level);

        window.alert("EXCELLENT! LEVEL UP");
    }

    if(isChoose || allwskip == true) newGame(coin, level);
    else{
        
        window.alert("YOU DINT SELECT ANSWER");
        // coin++;
        // Update(coin, level);
        // newGame(coin, level);
    }
}
document.getElementById("exit").onclick = function(){
    window.alert("DO YOU WANT TO EXTI? ");
    window.open('index.html', '_self');
}

document.getElementById("helpbtn").onclick =function(){
    if(coin >= 2){
        allwskip = true;
        document.getElementById("help").innerHTML = `Answer is: ${ans}`;
        coin-=2;
        Update(coin, level, true);
        for(let i = 0; i < radBtn.length; i++) radBtn[i].disabled = true; 
        // allwskip = false;
        newGame(coin, level);
        
    }
    else{
        document.getElementById("help").innerHTML = `NOT ENOUGH COIN`;
    }
}

function newGame(coin, level){
    for(let i = 0; i < radBtn.length; i++) radBtn[i].disabled = false; 
    document.getElementById("help").innerHTML = "";
    // document.getElementById("condition").innerHTML = "😶";
    Update(coin, level, true);
    questionmaker(level);
    AnsMaker(ans);
    allwskip = false;
    
}



newGame(coin, level);