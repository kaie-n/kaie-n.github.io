
declare var admin_no;
declare var restartFromLeaderboard: boolean;
declare var global_game: SSMAT.Game;
window.onload = () => {

    global_game = new SSMAT.Game();
    admin_no = (<HTMLInputElement>document.getElementById("admin_no")).value;

    restartFromLeaderboard = false;

    
};


//function adjust() {
//    var divgame = document.getElementById("content");
//    divgame.style.width = window.innerWidth + "px";
//    divgame.style.height = window.innerHeight + "px";
//    if (global_game != undefined) {
//    }
//}

//window.addEventListener('resize', function () {
//    adjust();
//});