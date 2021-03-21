(function () {

    // ----------DB---------- //

    // Initialize Firebase
    /*const firebaseConfig = {
        apiKey: "AIzaSyChVcDrt99Ewmx6uk8kxzog03EZPeXHpXY",
        authDomain: "scopone3.firebaseapp.com",
        databaseURL: "https://scopone3-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "scopone3",
        storageBucket: "scopone3.appspot.com",
        messagingSenderId: "535588674315",
        appId: "1:535588674315:web:29e6bff273414355b1e00e",
        measurementId: "G-TQCHJ2RJXT"
    };*/

    var firebaseConfig = {
        apiKey: "AIzaSyC9L78Wscig0gyX2nhy6nSsVNbp9ROBXI0",
        authDomain: "scoponeweb.firebaseapp.com",
        databaseURL: "https://scoponeweb-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "scoponeweb",
        storageBucket: "scoponeweb.appspot.com",
        messagingSenderId: "758042674004",
        appId: "1:758042674004:web:920429be07587d71953ec1",
        measurementId: "G-FG2CSD15CV"
    };

    firebase.initializeApp(firebaseConfig);

    // Get DB reference
    const dbRef = firebase.database().ref();

    var gameList = [];

    const gameListRef = dbRef.child("gameList");
    gameListRef.on("child_added", (data) => {
        if (!gameList.includes(data.val())) {
            gameList.push(data.val());
            //console.log("added " + data.val());
        }
    });
    gameListRef.on("child_changed", (data) => {
        gameList[data.key] = data.val();
        //console.log("changed " + data.val());
    });
    gameListRef.on("child_removed", (data) => {
        gameList.splice(data.key, 1);
    });


    // ----------PAGE LAYOUTS---------- //

    // Home page layout
    document.getElementById("home").innerHTML = '<h1 style="font-size: 40px">Welcome to Scopone!</h1>\n' +
        '    <h2>Please, choose a nickname.</h2>\n' +
        '    <h3 id="createHint">Then create a new game or join an existing one.</h3>\n' +
        '    <div class="form">\n' +
        '        <label for="nickname">Nickname</label>\n' +
        '        <input type="text" id="nickname" name="nickname" placeholder="Nickname">\n' +
        '\n' +
        '        <br>\n' +
        '        <br>\n' +
        '        <label for="room">Room name</label>\n' +
        '        <input type="text" id="room" name="room" placeholder="Room name">\n' +
        '\n' +
        '        <br>\n' +
        '        <br>\n' +
        '        <label for="password">Room password</label>\n' +
        '        <input type="password" id="password" name="password" placeholder="Room password">\n' +
        '        <br>\n' +
        '        <br>\n' +
        '        <button id="btnCreate" class="form" disabled>Create</button>\n' +
        '        <button id="btnJoin" class="form" disabled>Join</button>\n' +
        '    </div>';

    // Game page layout
    const gameLayout = '<div class="container-fluid" style="width: 100%; height: 100%;">\n' +
        '\n' +
        '        <!-- YOUR TURN, NORTH PLAYER -->\n' +
        '        <div class="row" style="width: 100%; height: 20%; margin: 0">\n' +
        '\n' +
        '            <!-- YOUR TURN -->\n' +
        '            <div class="row" style="width: 100%; height: 10%; margin: 0">\n' +
        '                <div class="d-flex justify-content-left" style="width: 100%; height: 100%">\n' +
        '                    <h1 id="yourTurn" style="font-size: 30px" >Waiting for players...</h1>\n' +
        '                    <!--p id="results" style="font-size: 30px" align="center" hidden></p-->\n' +
        '                </div>\n' +
        '                <div class="d-flex justify-content-center" style="width: 100%; height: 100%">\n' +
        '                    <!--h1 id="yourTurn" style="font-size: 30px" align="left">Waiting for players...</h1-->\n' +
        '                    <h1 id="results" style="font-size: 30px; color: white" hidden></h1>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- empty space -->\n' +
        '            <div class="row" style="width: 100%; height: 5%; margin: 0">\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- NORTH PLAYER NAME -->\n' +
        '            <div class="row" style="width: 100%; height: 20%; margin: 0">\n' +
        '                <div class="d-flex justify-content-center" style="width: 100%; height: 100%">\n' +
        '                    <p class="text-justify" id="northName" style="color: white; font-size: 25px"></p>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '            <div class="row" style="width: 100%; height: 5%; margin: 0">\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- NORTH PLAYER CARD -->\n' +
        '            <div class="row" style="width: 100%; height: 75%; margin: 0">\n' +
        '                <div class="d-flex justify-content-center" style="width: 100%; height: 100%">\n' +
        '                    <img id="topPlayerCard" src="images/backTop.jpg" class="img-fluid" hidden>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '        <!-- empty space -->\n' +
        '        <div class="row" style="width: 100%; height: 5%; margin: 0">\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <!-- WEST PLAYER, BOARD, EAST PLAYER -->\n' +
        '        <div class="row" style="width: 100%; height: 45%; margin: 0">\n' +
        '\n' +
        '            <!-- WEST PLAYER -->\n' +
        '            <div class="col" style="width: 10%; height: 100%">\n' +
        '                <div class="d-flex align-items-center" style="width: 100%; height: 100%">\n' +
        '                    <div class="d-flex flex-column">\n' +
        '                        <p class="text-justify" id="westName" style="color: white; font-size: 25px"></p>\n' +
        '                        <img id="leftPlayerCard" src="images/backSide.jpg" class="img-fluid" hidden>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- BOARD -->\n' +
        '            <div class="col-6" style="width: 80%; height: 100%">\n' +
        '                <div class="d-flex align-items-center" style="width: 100%; height: 100%">\n' +
        '                    <div class="d-flex flex-column" style="width: 100%; height: 100%">\n' +
        '\n' +
        '                        <!-- FIRST 5 BOARD CARDS -->\n' +
        '                        <div class="d-flex justify-items-center" style="width: 100%; height: 49%">\n' +
        '                            <button id="boardCard0" class="board" disabled></button>\n' +
        '                            <button id="boardCard1" class="board" disabled></button>\n' +
        '                            <button id="boardCard2" class="board" disabled></button>\n' +
        '                            <button id="boardCard3" class="board" disabled></button>\n' +
        '                            <button id="boardCard4" class="board" disabled></button>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <!-- empty space -->\n' +
        '                        <div class="row" style="width: 100%; height: 2%; margin: 0">\n' +
        '\n' +
        '                        </div>\n' +
        '\n' +
        '                        <!-- SECOND 5 BOARD CARDS -->\n' +
        '                        <div class="d-flex justify-items-center" style="width: 100%; height: 49%">\n' +
        '                            <button id="boardCard5" class="board" disabled></button>\n' +
        '                            <button id="boardCard6" class="board" disabled></button>\n' +
        '                            <button id="boardCard7" class="board" disabled></button>\n' +
        '                            <button id="boardCard8" class="board" disabled></button>\n' +
        '                            <button id="boardCard9" class="board" disabled></button>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- EAST PLAYER -->\n' +
        '            <div class="col" style="width: 10%; height: 100%">\n' +
        '                <div class="d-flex align-items-center" style="width: 100%; height: 100%">\n' +
        '                    <div class="d-flex flex-column">\n' +
        '                        <p class="text-justify" id="eastName" style="color: white; font-size: 25px"></p>\n' +
        '                        <img id="rightPlayerCard" src="images/backSide.jpg" class="img-fluid" hidden>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '\n' +
        '        <!-- empty space -->\n' +
        '        <div class="row" style="width: 100%; height: 5%; margin: 0">\n' +
        '\n' +
        '        </div>\n' +
        '\n' +
        '        <!-- HAND -->\n' +
        '        <div class="row" style="width: 100%; height: 25%; margin: 0">\n' +
        '            <div class="d-flex justify-items-center" style="width: 100%; height: 100%">\n' +
        '                <button id="handCard0" class="hand"></button>\n' +
        '                <button id="handCard1" class="hand"></button>\n' +
        '                <button id="handCard2" class="hand"></button>\n' +
        '                <button id="handCard3" class="hand"></button>\n' +
        '                <button id="handCard4" class="hand"></button>\n' +
        '                <button id="handCard5" class="hand"></button>\n' +
        '                <button id="handCard6" class="hand"></button>\n' +
        '                <button id="handCard7" class="hand"></button>\n' +
        '                <button id="handCard8" class="hand"></button>\n' +
        '                <button id="handCard9" class="hand"></button>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';


    // ----------CLASSES---------- //

    const SUITS = ["c", "d", "h", "s"];
    const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    class Card {
        constructor(suit, value) {
            this.suit = suit;
            this.value = value;
            this.scopa = false;
        }
    }

    class Player {
        constructor(nickname) {
            this.nickname = nickname;
        }
    }

    class Game {
        constructor(player) {
            this.pl0 = player;
            this.pl1 = "empty";
            this.pl2 = "empty";
            this.pl3 = "empty";
            this.plCount = 1;
            this.turn = -1;
            this.start = false;
            this.ended = false;
            this.lastPlayerToTake = -1;
            this.lastCardPlayed = -1;
            this.firstTurn = true;
            this.countCardPlayed = 0;
            //this.pointsRead = 0;
        }
    }


    // ----------VARIABLES---------- //

    var gameRef;
    var gameName;
    var plCount = -1;
    var thisPlNum = -1;
    var turn = -1;
    var thisPlayerHand = [];
    var board = [];
    var pl0Name, pl1Name, pl2Name, pl3Name;
    var playedCard = -1;
    var options = [], choices = [];
    var taken = [];
    var lastPlayerToTake = -1;
    var lastCardPlayed = -1;
    var firstTurn = true;
    var countCardPlayed = 0;
    var otherTeamPoints = 0, myPoints = 0;
    var points = "";
    var myTeamPointsDescription = "", otherTeamPointsDescription = "", pointsDescription = "";
    var playedForAnimation = -1;
    var animationTime = 1500;
    var firstPlayer = -1;
    var pointsRead = 0;

    // ----------ELEMENTS---------- //

    // Home elements
    const home = document.getElementById("home");
    const nickname = document.getElementById("nickname");
    const room = document.getElementById("room");
    const password = document.getElementById("password");
    const btnCreate = document.getElementById("btnCreate");
    const btnJoin = document.getElementById("btnJoin");


    // ----------BUTTON LISTENERS---------- //

    $('#nickame, #room, #password').on("keyup", action);

    function action() {
        $('#btnCreate').prop("disabled", true);
        $('#btnJoin').prop("disabled", true);
        if($('#nickname').val().length > 0 && $('#room').val().length > 0 && $('#password').val().length > 0) {
            gameName = $('#room').val() + "-" + $('#password').val();
            var existing = false;
            for (var i = 0; i < gameList.length; i++){
                if (gameName === gameList[i]){
                    //console.log("game already existing");
                    existing = true;
                    $('#btnJoin').prop("disabled", false);
                }
            }
            if (!existing) {
                $('#btnCreate').prop("disabled", false);
            }
        }
    }

    // Create a game
    btnCreate.addEventListener("click", e => {
        //console.log("clicked");
        const nick = nickname.value;
        const roomName = room.value;
        const psw = password.value;

        if (nick.length < 1 || roomName.length < 1 || psw.length < 1){
            return;
        }

        if (gameList.includes(roomName + "-" + psw)){
            document.getElementById("createHint").innerText = "Sorry, the room has just been created. Choose another room or press the \"Join\" button";
            document.getElementById("btnJoin").disabled = false;
            document.getElementById("btnCreate").disabled = true;
            return;
        }

        // Add new game
        var updates = {};
        updates["/" + roomName + "-" + psw] = new Game(new Player(nick));
        updates["/gameList/" + gameList.length] = roomName + "-" + psw;
        //dbRef.child(roomName + "-" + psw).set(new Game(new Player(nick)));
        dbRef.update(updates);
        gameRef = dbRef.child(roomName + "-" + psw);

        thisPlNum = 0;

        home.innerHTML = gameLayout;

        addPlCountListener();
        addNamesListener();
        addStartListener();
    });

    // Join a game
    btnJoin.addEventListener("click", e => {

        const nick = nickname.value;
        const roomName = room.value;
        const psw = password.value;

        if (nick.length < 1 || roomName.length < 1 || psw.length < 1){
            return; // Add wrong text msg
        }

        // Retrieve game and add player
        gameRef = dbRef.child(roomName + "-" + psw);
        gameRef.child("plCount").get().then(function (snapshot) {
            if (snapshot.exists()) {
                plCount = snapshot.val();
                if (plCount < 4) {
                    thisPlNum = plCount;
                    gameRef.child("pl" + plCount).set(new Player(nick));
                    plCount++;
                    gameRef.child("plCount").set(plCount);
                    home.innerHTML = gameLayout;
                    addNamesListener();
                    addStartListener();

                } else {
                    document.getElementById("createHint").innerText = "Sorry, the room is full. Choose another room or create a new one."
                }
            } else {
                console.log("No data available");
            }
        }).catch(function (error) {
            console.log(error)
        });
    });

    function addHandButtonListeners() {
        document.getElementById("handCard0").addEventListener("click", hand0EventListener);
        document.getElementById("handCard1").addEventListener("click", hand1EventListener);
        document.getElementById("handCard2").addEventListener("click", hand2EventListener);
        document.getElementById("handCard3").addEventListener("click", hand3EventListener);
        document.getElementById("handCard4").addEventListener("click", hand4EventListener);
        document.getElementById("handCard5").addEventListener("click", hand5EventListener);
        document.getElementById("handCard6").addEventListener("click", hand6EventListener);
        document.getElementById("handCard7").addEventListener("click", hand7EventListener);
        document.getElementById("handCard8").addEventListener("click", hand8EventListener);
        document.getElementById("handCard9").addEventListener("click", hand9EventListener);
    }

    function addBoardButtonListeners() {
        document.getElementById("boardCard0").addEventListener("click", board0EventListener);
        document.getElementById("boardCard1").addEventListener("click", board1EventListener);
        document.getElementById("boardCard2").addEventListener("click", board2EventListener);
        document.getElementById("boardCard3").addEventListener("click", board3EventListener);
        document.getElementById("boardCard4").addEventListener("click", board4EventListener);
        document.getElementById("boardCard5").addEventListener("click", board5EventListener);
        document.getElementById("boardCard6").addEventListener("click", board6EventListener);
        document.getElementById("boardCard7").addEventListener("click", board7EventListener);
        document.getElementById("boardCard8").addEventListener("click", board8EventListener);
        document.getElementById("boardCard9").addEventListener("click", board9EventListener);
    }

    function hand0EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[0].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[0]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(0) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function hand1EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[1].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[1]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(1) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function hand2EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[2].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[2]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(2) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function hand3EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[3].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[3]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(3) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function hand4EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[4].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[4]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(4) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function hand5EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[5].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[5]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(5) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function hand6EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[6].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[6]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(6) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function hand7EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[7].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[7]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(7) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function hand8EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[8].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[8]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(8) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function hand9EventListener(event) {
        if (turn === thisPlNum && playedCard !== -2 && !(thisPlayerHand[9].value === 1 && firstTurn === true)) {
            playedCard = -2;
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[9]);
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions(9) === 1) {
                setTimeout(function (){
                    nextTurn();
                }, animationTime + 100);
            }
        }
    }

    function board0EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(0)
            document.getElementById("boardCard0").style.border = "none";
            console.log("board0event - disabling " + 0);
            document.getElementById("boardCard0").disabled = true;
            checkChoice();
        }
    }

    function board1EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(1)
            document.getElementById("boardCard1").style.border = "none";
            console.log("board0event - disabling " + 1);
            document.getElementById("boardCard1").disabled = true;
            checkChoice();
        }
    }

    function board2EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(2)
            document.getElementById("boardCard2").style.border = "none";
            console.log("board0event - disabling " + 2);
            document.getElementById("boardCard2").disabled = true;
            checkChoice();
        }
    }

    function board3EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(3)
            document.getElementById("boardCard3").style.border = "none";
            console.log("board0event - disabling " + 3);
            document.getElementById("boardCard3").disabled = true;
            checkChoice();
        }
    }

    function board4EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(4)
            document.getElementById("boardCard4").style.border = "none";
            console.log("board0event - disabling " + 4);
            document.getElementById("boardCard4").disabled = true;
            checkChoice();
        }
    }

    function board5EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(5)
            document.getElementById("boardCard5").style.border = "none";
            console.log("board0event - disabling " + 5);
            document.getElementById("boardCard5").disabled = true;
            checkChoice();
        }
    }

    function board6EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(6)
            document.getElementById("boardCard6").style.border = "none";
            console.log("board0event - disabling " + 6);
            document.getElementById("boardCard6").disabled = true;
            checkChoice();
        }
    }

    function board7EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(7)
            document.getElementById("boardCard7").style.border = "none";
            console.log("board0event - disabling " + 7);
            document.getElementById("boardCard7").disabled = true;
            checkChoice();
        }
    }

    function board8EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(8)
            document.getElementById("boardCard8").style.border = "none";
            console.log("board0event - disabling " + 8);
            document.getElementById("boardCard8").disabled = true;
            checkChoice();
        }
    }

    function board9EventListener(event) {
        if (turn === thisPlNum && playedCard !== -1){
            choices.push(9)
            document.getElementById("boardCard9").style.border = "none";
            console.log("board0event - disabling " + 9);
            document.getElementById("boardCard8").disabled = true;
            checkChoice();
        }
    }


    // ----------DB LISTENERS---------- //

    var plCountListener;
    var pl0NameListener, pl1NameListener, pl2NameListener, pl3NameListener;
    var startListener;
    var turnListener;
    var handChildAddedListener, handChildChangedListener;
    var boardChildAddedListener, boardChildChangedListener, boardChildRemovedListener;
    var takenListener;
    var endedListener;
    var firstTurnListener;
    var lastCardPlayedListener;
    var lastPlayerToTakeListener;
    var countCardPlayedListener;
    var pointsListener, pointsDescriptionListener;
    //var pointsReadListener;

    function addPlCountListener(){
        plCountListener = gameRef.child("plCount").on("value", (snapshot) => {
            plCount = snapshot.val();
            if (plCount === 4){
                startGame();
            }
        });
    }

    function addNamesListener(){
        pl0NameListener = gameRef.child("pl0").child("nickname").on("value", (snapshot) => {
            pl0Name = snapshot.val();
            if (thisPlNum === 1){
                document.getElementById("westName").innerHTML = snapshot.val();
            } else if (thisPlNum === 2){
                document.getElementById("northName").innerHTML = snapshot.val();
            } else if (thisPlNum === 3){
                document.getElementById("eastName").innerHTML = snapshot.val();
            }
        });

        pl1NameListener = gameRef.child("pl1").child("nickname").on("value", (snapshot) => {
            pl1Name = snapshot.val();
            if (thisPlNum === 0){
                document.getElementById("eastName").innerHTML = snapshot.val();
            } else if (thisPlNum === 2){
                document.getElementById("westName").innerHTML = snapshot.val();
            } else if (thisPlNum === 3){
                document.getElementById("northName").innerHTML = snapshot.val();
            }
        });

        pl2NameListener = gameRef.child("pl2").child("nickname").on("value", (snapshot) => {
            pl2Name = snapshot.val();
            if (thisPlNum === 0){
                document.getElementById("northName").innerHTML = snapshot.val();
            } else if (thisPlNum === 1){
                document.getElementById("eastName").innerHTML = snapshot.val();
            } else if (thisPlNum === 3){
                document.getElementById("westName").innerHTML = snapshot.val();
            }
        });

        pl3NameListener = gameRef.child("pl3").child("nickname").on("value", (snapshot) => {
            pl3Name = snapshot.val();
            if (thisPlNum === 0){
                document.getElementById("westName").innerHTML = snapshot.val();
            } else if (thisPlNum === 1){
                document.getElementById("northName").innerHTML = snapshot.val();
            } else if (thisPlNum === 2){
                document.getElementById("eastName").innerHTML = snapshot.val();
            }
        });
    }

    function addStartListener() {
        startListener = gameRef.child("start").on("value", (snapshot) => {
            if (snapshot.val() === true){
                addThisPlayerHandListener();
                addBoardListener();
                addEndedListener();
                addTurnListener();
                addHandButtonListeners();
                addBoardButtonListeners();
                addTakenListener();
                addFirstTurnListener();
                addLastCardPlayedListener();
                addLastPlayerToTake();
                addCountCardPlayedListener();
                addPointsListener();
                addPointsDescriptionListener();
                //addPointsReadListener();
            }
        });
    }

    function addTurnListener() {
        turnListener = gameRef.child("turn").on("value", (snapshot) => {
            turn = snapshot.val();
            if (turn === -1){
                return;
            }
            if (firstPlayer === -1){
                firstPlayer = turn;
            }
            if (countCardPlayed === 40){
                document.getElementById("yourTurn").innerHTML = "Counting points...";
                document.getElementById("yourTurn").style.fontSize = "30px";
                document.getElementById("yourTurn").style.color = "white";
                if (turn === thisPlNum){
                    takeRemainingCards();
                    gameRef.child("ended").set(true);
                }
                return;
            }
            var txt, col;
            if (turn === thisPlNum){
                txt = "YOUR TURN!"
                col = "yellow";
                document.getElementById("yourTurn").style.fontSize = "50px";
            } else {
                if (turn === 0){
                    txt = pl0Name;
                } else if (turn === 1){
                    txt = pl1Name;
                } else if (turn === 2){
                    txt = pl2Name;
                } else {
                    txt = pl3Name;
                }
                txt += "'s turn..."
                col = "white";
                document.getElementById("yourTurn").style.fontSize = "30px";
            }
            document.getElementById("yourTurn").innerHTML = txt;
            document.getElementById("yourTurn").style.color = col;

            if ((thisPlNum < 3 && turn === thisPlNum + 1) || (thisPlNum === 3 && turn === 0)){
                document.getElementById("eastName").style.color = "red";
                document.getElementById("northName").style.color = "white";
                document.getElementById("westName").style.color = "white";
            } else if ((thisPlNum < 2 && turn === thisPlNum + 2) || (thisPlNum === 2 && turn === 0) || (thisPlNum === 3 && turn === 1)){
                document.getElementById("eastName").style.color = "white";
                document.getElementById("northName").style.color = "red";
                document.getElementById("westName").style.color = "white";
            } else if ((thisPlNum === 0 && turn === 3) || (thisPlNum === 1 && turn === 0) || (thisPlNum === 2 && turn === 1) || (thisPlNum === 3 && turn === 2)){
                document.getElementById("eastName").style.color = "white";
                document.getElementById("northName").style.color = "white";
                document.getElementById("westName").style.color = "red";
            } else {
                document.getElementById("eastName").style.color = "white";
                document.getElementById("northName").style.color = "white";
                document.getElementById("westName").style.color = "white";
            }
            for (var i = 0; i < thisPlayerHand.length; i++){
                if (thisPlayerHand[i] !== "empty"){
                    document.getElementById("handCard" + i).disabled = false;
                }
            }
        });
    }

    function addThisPlayerHandListener() {
        var handRef = gameRef.child("pl" + thisPlNum).child("hand");

        handChildAddedListener = handRef.on("child_added", (data) => {
            thisPlayerHand.push(data.val());
            //console.log("pushed");
            updateHandButtons(thisPlayerHand.length - 1, true);
        });

        handChildChangedListener = handRef.on("child_changed", (data) => {
            thisPlayerHand[data.key] = data.val();
            playedForAnimation = data.key;
            setTimeout(function () {
                updateHandButtons(data.key, false);
            }, 200);
        });
    }

    function updateHandButtons(button, start) {
        //console.log(button, start);
        /*var i;
        for (i = 0; i < thisPlayerHand.length; i++){
            document.getElementById("handCard" + i).style.position = "relative";
            document.getElementById("handCard" + i).style.backgroundRepeat = "no-repeat";
            document.getElementById("handCard" + i).style.backgroundPosition = "center";
            document.getElementById("handCard" + i).style.backgroundSize = "contain";
            if (thisPlayerHand[i] === "empty") {
                if (i === button) {
                    setTimeout(function (i) {
                        $(document).ready(function (i) {
                            $("#handCard" + i).animate({bottom: "-=200"}, 1500);
                        });
                    }, 200);
                    setTimeout(function (i) {
                        $(document).ready(function (i) {
                            $("#handCard" + i).animate({bottom: "+=200"}, 10);
                        });
                        document.getElementById("handCard" + i).style.background = "none";
                        document.getElementById("handCard" + i).disabled = true;
                    }, 1700);
                }
            } else {
                console.log("sono nell'else");
                if (start && i === button){
                    console.log("setto " + i);
                    setTimeout(function (i) {
                        console.log("i = " + i);
                        document.getElementById("handCard" + i).style.backgroundImage = "url(images/" + thisPlayerHand[i].suit + thisPlayerHand[i].value + ".jpg)";
                    }, 500);
                }
            }
        }*/
        document.getElementById("handCard" + button).style.position = "relative";
        document.getElementById("handCard" + button).style.backgroundRepeat = "no-repeat";
        document.getElementById("handCard" + button).style.backgroundPosition = "center";
        document.getElementById("handCard" + button).style.backgroundSize = "contain";
        if (thisPlayerHand[button] === "empty") {
            document.getElementById("handCard" + button).style.transform = "scale(1.2) translateY(-30px)";
            setTimeout(function () {
                $(document).ready(function () {
                    var str = "#handCard" + playedForAnimation;
                    $(str).animate({bottom: "+=200"}, animationTime / 2);
                });
            }, 200);
            setTimeout(function () {
                /*$(document).ready(function (button) {
                    $("#handCard" + button).animate({bottom: "-=200"}, 10);
                });*/
                document.getElementById("handCard" + button).style.background = "none";
                document.getElementById("handCard" + button).disabled = true;
                playedForAnimation = -1;
            }, animationTime - 200, button);
        } else {
            //console.log("sono nell'else");
            if (start){
                document.getElementById("topPlayerCard").style.position = "relative";
                document.getElementById("topPlayerCard").style.top = "100px";
                document.getElementById("rightPlayerCard").style.position = "relative";
                document.getElementById("rightPlayerCard").style.right = "200px";
                document.getElementById("leftPlayerCard").style.position = "relative";
                document.getElementById("leftPlayerCard").style.left = "200px";
                //console.log("setto " + button);

                setTimeout(function (){
                    //console.log("right visible");
                    document.getElementById("rightPlayerCard").hidden = false;
                    $(document).ready(function () {
                        $("#rightPlayerCard").animate({right: "-=200"}, 375);
                    });
                    setTimeout(function (){
                        //console.log("right invisible");
                        document.getElementById("rightPlayerCard").hidden = true;
                        $(document).ready(function () {
                            $("#rightPlayerCard").animate({right: "+=200"}, 10);
                        });
                    }, 375);
                }, 375 + 1500 * button);
                setTimeout(function (){
                    document.getElementById("topPlayerCard").hidden = false;
                    $(document).ready(function () {
                        $("#topPlayerCard").animate({top: "-=100"}, 375);
                    });
                    setTimeout(function (){
                        document.getElementById("topPlayerCard").hidden = true;
                        $(document).ready(function () {
                            $("#topPlayerCard").animate({top: "+=100"}, 10);
                        });
                    }, 375);
                }, 375 * 2 + 1500 * button);
                setTimeout(function (){
                    document.getElementById("leftPlayerCard").hidden = false;
                    $(document).ready(function () {
                        $("#leftPlayerCard").animate({left: "-=200"}, 375);
                    });
                    setTimeout(function (){
                        document.getElementById("leftPlayerCard").hidden = true;
                        $(document).ready(function () {
                            $("#leftPlayerCard").animate({left: "+=200"}, 10);
                        });
                    }, 360);
                }, 360 * 3 + 1500 * button);
                setTimeout(function () {
                    //console.log("i = " + button);
                    document.getElementById("handCard" + button).style.backgroundImage = "url(images/" + thisPlayerHand[button].suit + thisPlayerHand[button].value + ".jpg)";
                    if (button === 9){
                        document.getElementById("leftPlayerCard").hidden = false;
                        document.getElementById("topPlayerCard").hidden = false;
                        document.getElementById("rightPlayerCard").hidden = false;
                        document.getElementById("topPlayerCard").style.position = "relative";
                        document.getElementById("topPlayerCard").style.top = "0px";
                        document.getElementById("rightPlayerCard").style.position = "relative";
                        document.getElementById("rightPlayerCard").style.right = "0px";
                        document.getElementById("leftPlayerCard").style.position = "relative";
                        document.getElementById("leftPlayerCard").style.left = "0px";
                    }
                }, 375 * 4 + 1500 * button, button);
            }
        }
    }
    
    function addBoardListener() {
        var boardRef = gameRef.child("board");

        boardChildAddedListener = boardRef.on("child_added", (data) => {
            board.push(data.val());
            setTimeout(function (){
                updateBoardButtons()
            }, animationTime);
        });

        boardChildChangedListener = boardRef.on("child_changed", (data) => {
            board[data.key] = data.val();
            setTimeout(function (){
                updateBoardButtons()
            }, animationTime);
        });

        boardChildRemovedListener = boardRef.on("child_removed", (data) => {
            board.splice(data.key, 1);
            setTimeout(function (){
                updateBoardButtons()
            }, animationTime);
        });
    }

    function updateBoardButtons() {
        var i;
        for (i = 0; i < board.length; i++){
            if (board[i] !== "empty") {
                document.getElementById("boardCard" + i).style.backgroundImage = "url(images/" + board[i].suit + board[i].value + ".jpg)";
                document.getElementById("boardCard" + i).style.backgroundRepeat = "no-repeat";
                document.getElementById("boardCard" + i).style.backgroundPosition = "center";
                document.getElementById("boardCard" + i).style.backgroundSize = "contain";
            } else {
                document.getElementById("boardCard" + i).style.background = "none";
            }
            //document.getElementById("boardCard" + i).disabled = true;
        }
        /*if (playedCard === -2){
            enableBoardButtons();
        }*/
        //TODO non funziona
        /*if (countCardPlayed >= 37){
            if (turn === thisPlNum){
                document.getElementById("leftPlayerCard").hidden = true;
            } else if ((thisPlNum < 3 && turn === thisPlNum + 1) || (thisPlNum === 3 && turn === 0)){
                return;
            } else if ((thisPlNum < 2 && turn === thisPlNum + 2) || (thisPlNum === 2 && turn === 0) || (thisPlNum === 3 && turn === 1)){
                document.getElementById("rightPlayerCard").hidden = true;
            } else if ((thisPlNum === 0 && turn === 3) || (thisPlNum === 1 && turn === 0) || (thisPlNum === 2 && turn === 1) || (thisPlNum === 3 && turn === 2)){
                document.getElementById("topPlayerCard").hidden = true;
            } else {
                document.getElementById("leftPlayerCard").hidden = true;
            }
        }*/
    }

    function addTakenListener() {
        takenListener = gameRef.child("taken" + thisPlNum % 2).on("child_added", (data) => {
            taken.push(data.val());
        });
    }

    function addEndedListener(){
        endedListener = gameRef.child("ended").on("value", (snapshot) => {
            if (snapshot.val() === true){
                if (turn === thisPlNum) {
                    gameEndHandler();
                }
            }
        });
    }

    function addFirstTurnListener() {
        firstTurnListener = gameRef.child("firstTurn").on("value", (snapshot) => {
            firstTurn = snapshot.val();
        });
    }

    function addLastCardPlayedListener(){
        lastCardPlayedListener = gameRef.child("lastCardPlayed").on("value", (snapshot) => {
            lastCardPlayed = snapshot.val();
            if (lastCardPlayed !== -1) {
                if ((thisPlNum < 3 && turn === thisPlNum + 1) || (thisPlNum === 3 && turn === 0)) {
                    lastCardAnimation("right");
                } else if ((thisPlNum < 2 && turn === thisPlNum + 2) || (thisPlNum === 2 && turn === 0) || (thisPlNum === 3 && turn === 1)) {
                    lastCardAnimation("top");
                } else if ((thisPlNum === 0 && turn === 3) || (thisPlNum === 1 && turn === 0) || (thisPlNum === 2 && turn === 1) || (thisPlNum === 3 && turn === 2)) {
                    lastCardAnimation("left");
                }
            }
        });
    }

    function addLastPlayerToTake() {
        lastPlayerToTakeListener = gameRef.child("lastPlayerToTake").on("value", (snapshot) => {
            lastPlayerToTake = snapshot.val();
        });
    }

    function addCountCardPlayedListener() {
        countCardPlayedListener = gameRef.child("countCardPlayed").on("value", (snapshot) => {
            countCardPlayed = snapshot.val();
        });
    }

    function addPointsListener() {
        pointsListener = gameRef.child("points").on("value", (snapshot) => {
            points = snapshot.val();
            /*setTimeout(function () {
                showWinners();
            }, animationTime);*/
        });
    }

    function addPointsDescriptionListener() {
        pointsDescriptionListener = gameRef.child("pointsDescription").on("value", (snapshot) => {
            pointsDescription = snapshot.val();
            setTimeout(function () {
                showWinners();
            }, animationTime);
        });
    }

    /*function addPointsReadListener() {
        pointsReadListener = gameRef.child("pointsRead").on("value", (snapshot) => {
            pointsRead = snapshot.val();
        });
    }*/


    // ----------GAME FUNCTIONS----------//

    function startGame() {
        var deck = freshDeck();
        deck = shuffle(shuffle(deck));
        var pl0Hand = sortHand(deck.slice(0, 10));
        var pl1Hand = sortHand(deck.slice(10, 20));
        var pl2Hand = sortHand(deck.slice(20, 30));
        var pl3Hand = sortHand(deck.slice(30, 40));

        while (!checkHandsOk(pl0Hand, pl1Hand, pl2Hand, pl3Hand)){
            deck = shuffle(deck);
            pl0Hand = sortHand(deck.slice(0, 10));
            pl1Hand = sortHand(deck.slice(10, 20));
            pl2Hand = sortHand(deck.slice(20, 30));
            pl3Hand = sortHand(deck.slice(30, 40));
        }

        var updates = {};
        updates["/pl0/hand"] = pl0Hand;
        updates["/pl1/hand"] = pl1Hand;
        updates["/pl2/hand"] = pl2Hand;
        updates["/pl3/hand"] = pl3Hand;
        updates["/turn"] = getRandomInt(0, 4);
        updates["/start"] = true;

        gameRef.update(updates);
    }

    function checkHandsOk(hand0, hand1, hand2, hand3) {
        for (var i = 0; i < hand0.length; i++){
            if (hand0[i].value >= 8){
                break;
            }
            if (hand0[i].value < 8 && i === hand0.length - 1){
                return  false;
            }
        }
        for (i = 0; i < hand1.length; i++){
            if (hand1[i].value >= 8){
                break;
            }
            if (hand1[i].value < 8 && i === hand1.length - 1){
                return false;
            }
        }
        for (i = 0; i < hand2.length; i++){
            if (hand2[i].value >= 8){
                break;
            }
            if (hand2[i].value < 8 && i === hand2.length - 1){
                return false;
            }
        }
        for (i = 0; i < hand3.length; i++){
            if (hand3[i].value >= 8){
                break;
            }
            if (hand3[i].value < 8 && i === hand3.length - 1){
                return false;
            }
        }
        return true;
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Create a new Deck
    function freshDeck() {
        var deck = [];

        var i, j;

        for (i = 0; i < SUITS.length; i++){
            for (j = 0; j < VALUES.length; j++){
                deck.push(new Card(SUITS[i], VALUES[j]));
            }
        }
        return deck;
    }
    
    function sortHand(a) {
        var sorted = false;
        var temp, i;
        while(sorted === false) {
            sorted = true;
            for (i = 0; i < a.length - 1; i++) {
                if (a[i].value > a[i + 1].value) {
                    temp = a[i];
                    a[i] = a[i + 1];
                    a[i + 1] = temp;
                    sorted = false;
                }
            }
        }
        return a;
    }

    // Shuffle a deck
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function nextTurn() {
        playedCard = -1;
        options = [];
        choices = [];
        if (turn < 3){
            turn += 1;
            gameRef.child("turn").set(turn);
        } else {
            gameRef.child("turn").set(0);
        }
    }

    function evaluateOptions(tmp){

        const tempPlayedCard = tmp;

        if (thisPlayerHand[tempPlayedCard].value === 1){
            assoPigliaTutto(tempPlayedCard);
            return 1;
        }
        /*if (board.length === 0){
            gameRef.child("board").child(0).set(thisPlayerHand[playedCard]);
            return;
        }*/

        var tuple = [];
        for (var i = 0; i < board.length; i++) {
            if (board[i] !== "empty" && board[i].value === thisPlayerHand[tempPlayedCard].value) {
                tuple.push(i);
                options.push(tuple);
                tuple = [];
                break;
            }
        }
        if (options.length === 0) {
            for (var i = 0; i < board.length; i++) {
                for (var j = i + 1; j < board.length; j++) {
                    if (board[i] !== "empty" && board[j] !== "empty" && board[i].value + board[j].value === thisPlayerHand[tempPlayedCard].value) {
                        tuple.push(i);
                        tuple.push(j);
                        options.push(tuple);
                        tuple = [];
                    }
                    for (var k = j + 1; k < board.length; k++) {
                        if (board[i] !== "empty" && board[j] !== "empty" && board[k] !== "empty" && board[i].value + board[j].value + board[k].value === thisPlayerHand[tempPlayedCard].value) {
                            tuple.push(i);
                            tuple.push(j);
                            tuple.push(k);
                            options.push(tuple);
                            tuple = [];
                        }
                    }
                }
            }
        }

        var updates = {};
        if (options.length === 0){
            updates["/board/" + getFirstEmptyInBoard()] = thisPlayerHand[tempPlayedCard];
            updates["/pl" + thisPlNum + "/hand/" + tempPlayedCard] = "empty";
            //updates["/lastPlayerToTake"] = thisPlNum;
            updates["/countCardPlayed"] = countCardPlayed + 1;
            gameRef.update(updates);
            //gameRef.child("board").child(getFirstEmptyInBoard()).set(thisPlayerHand[playedCard]);
            //gameRef.child("pl" + thisPlNum).child("hand").child(playedCard).set("empty");
            return 1;
        }

        if (options.length === 1) {
            if (options[0].length === countNotEmptyOnBoard() && countCardPlayed < 39) {
                thisPlayerHand[tempPlayedCard].scopa = true;
            }
            var lastTaken = taken.length;
            for (var o = 0; o < options[0].length; o++) {
                updates["/taken" + thisPlNum % 2 + "/" + lastTaken] = board[options[0][o]];
                updates["/board/" + options[0][o]] = "empty"
                //gameRef.child("taken" + thisPlNum % 2).child(taken.length).set(board[o]);
                //gameRef.child("board").child(o).set("empty");
                lastTaken++;
            }
            updates["/taken" + thisPlNum % 2 + "/" + lastTaken] = thisPlayerHand[tempPlayedCard];
            updates["/pl" + thisPlNum + "/hand/" + tempPlayedCard] = "empty";
            updates["/lastPlayerToTake"] = thisPlNum;
            updates["/countCardPlayed"] = countCardPlayed + 1;
            //gameRef.child("taken" + thisPlNum % 2).child(taken.length).set(thisPlayerHand[playedCard]);
            //gameRef.child("pl" + thisPlNum).child("hand").child(playedCard).set("empty");
            gameRef.update(updates);
            return 1;
        }

        //updates["/board/" + getFirstEmptyInBoard()] = thisPlayerHand[playedCard];
        updates["/taken" + thisPlNum % 2 + "/" + taken.length] = thisPlayerHand[tempPlayedCard];
        updates["/pl" + thisPlNum + "/hand/" + tempPlayedCard] = "empty";
        updates["/lastPlayerToTake"] = thisPlNum;
        updates["/countCardPlayed"] = countCardPlayed + 1;
        gameRef.update(updates);

        enableBoardButtons();
        return 0;
    }

    function assoPigliaTutto(assoIndex){

        var updates = {};
        var lastTaken = taken.length;

        for (var i = 0; i < board.length; i++){
            //gameRef.child("taken" + thisPlNum % 2).child(taken.length).set(thisPlayerHand[playedCard]);
            if (board[i] !== "empty") {
                updates["/taken" + thisPlNum % 2 + "/" + lastTaken] = board[i];
                updates["/board/" + i] = "empty";
                lastTaken++;
            }
        }
        updates["/taken" + thisPlNum % 2 + "/" + lastTaken] = thisPlayerHand[assoIndex];
        updates["/pl" + thisPlNum + "/hand/" + assoIndex] = "empty";
        updates["/lastPlayerToTake"] = thisPlNum;
        updates["/countCardPlayed"] = countCardPlayed + 1;

        gameRef.update(updates);
    }

    function getFirstEmptyInBoard(){
        for (var i = 0; i < board.length; i++){
            if (board[i] === "empty"){
                return i;
            }
        }
        return board.length;
    }

    function countNotEmptyOnBoard() {
        var count = 0;
        for (var i = 0; i < board.length; i++){
            if (board[i] !== "empty"){
                count++;
            }
        }
        return count;
    }

    // TODO bug non attiva alcuni bottoni ?!?!
    function enableBoardButtons(){
        for (var t = 0; t < thisPlayerHand.length; t++){
            document.getElementById("handCard" + t).disabled = true;
        }
        for (var i = 0; i < options.length; i++){
            for (var j = 0; j < options[i].length; j++){
                for (var k = 0; k < options.length; k++){
                    if (options[k].includes(options[i][j]) === false){
                        //console.log("enableboardbuttons - enabling " + options[i][j]);
                        document.getElementById("boardCard" + options[i][j]).style.border = "2px solid yellow";
                        document.getElementById("boardCard" + options[i][j]).disabled = false;
                    }
                }
            }
        }
        /*for (var i = 0; i < options.length; i++){
            console.log("lista carte opzione " + options[i]);
            for (var j = 0; j < options[i].length; j++){
                console.log("carta nell'opzione " + options[i][j])
                document.getElementById("boardCard" + options[i][j]).style.border = "2px solid yellow";
                document.getElementById("boardCard" + options[i][j]).disabled = false;
            }
        }*/
    }

    function checkChoice() {
        var updates = {};
        var lastTaken = taken.length;
        for (var i = 0; i < options.length; i++){
            if (options[i].includes(choices[0])){
                for (var j = 0; j < options[i].length; j++){
                    updates["/taken" + thisPlNum % 2 + "/" + lastTaken] = board[options[i][j]];
                    updates["/board/" + options[i][j]] = "empty";
                    lastTaken++;
                }
                break;
            }
        }
        //updates["/taken" + thisPlNum % 2 + "/" + lastTaken] = thisPlayerHand[playedCard];
        //updates["/pl" + thisPlNum + "/hand/" + playedCard] = "empty";
        gameRef.update(updates);
        for (var t = 0; t < thisPlayerHand.length; t++){
            document.getElementById("handCard" + t).disabled = false;
        }
        for (t = 0; t < board.length; t++){
            document.getElementById("boardCard" + t).disabled = true;
            console.log("checkchoice - disabling " + t);
            document.getElementById("boardCard" + t).style.border = "none";
        }
        options = [];
        choices = [];
        nextTurn();
    }

    function lastCardAnimation(player) {
        //var i = 0, j = 1.0;
        /*document.getElementById(player + "PlayerCard").style.position = "relative";
        if (player === "top"){
            document.getElementById("topPlayerCard").style.top = "0px";
        } else if (player === "left"){
            document.getElementById("leftPlayerCard").style.left = "0px";
        } else {
            document.getElementById("rightPlayerCard").style.right = "0px";
        }*/
        /*while (i < 30000){
            if (player === "top"){
                setTimeout(moveDown(i, j), 20);
            } else if (player === "left"){
                setTimeout(moveRight(i, j), 20);
            } else {
                setTimeout(moveLeft(i, j), 20);
            }
            i += 10;
            j += 0.1
        }*/
        if (player === "top"){
            document.getElementById("topPlayerCard").src = "images/" + lastCardPlayed.suit + lastCardPlayed.value + ".jpg";
            document.getElementById("topPlayerCard").style.top = "0px";
            document.getElementById("topPlayerCard").style.position = "relative";
            document.getElementById("topPlayerCard").style.transform = "scale(1.5)";
            $(document).ready(function () {
                $("#topPlayerCard").animate({top: "+=100"}, animationTime / 2);
            });
        } else if (player === "left"){
            document.getElementById("leftPlayerCard").src = "images/" + lastCardPlayed.suit + lastCardPlayed.value + ".jpg";
            document.getElementById("leftPlayerCard").style.left = "0px";
            document.getElementById("leftPlayerCard").style.position = "relative";
            //document.getElementById("leftPlayerCard").style.transform = "scale(1.5)";
            $(document).ready(function () {
                $("#leftPlayerCard").animate({left: "+=200"}, animationTime / 2);
            });
        } else {
            document.getElementById("rightPlayerCard").src = "images/" + lastCardPlayed.suit + lastCardPlayed.value + ".jpg";
            document.getElementById("rightPlayerCard").style.right = "0px";
            document.getElementById("rightPlayerCard").style.position = "relative";
            //document.getElementById("rightPlayerCard").style.transform = "scale(1.5)";
            $(document).ready(function () {
                $("#rightPlayerCard").animate({right: "+=200"}, animationTime / 2);
            });
        }

        setTimeout(function (){
            reset(player)
        }, animationTime)
    }

    /*function moveDown(i, j) {
        document.getElementById("topPlayerCard").style.backgroundImage = "url(images/" + lastCardPlayed.suit + lastCardPlayed.value + ".jpg)";
        document.getElementById("topPlayerCard").style.transform = "scale(" + j + ")";
        document.getElementById("topPlayerCard").style.top = document.getElementById("topPlayerCard").style.top + i / 100 + "px";
    }

    function moveRight(i, j) {
        document.getElementById("leftPlayerCard").style.backgroundImage = "url(images/" + lastCardPlayed.suit + lastCardPlayed.value + ".jpg)";
        document.getElementById("leftPlayerCard").style.transform = "scale(" + j + ")";
        document.getElementById("leftPlayerCard").style.top = document.getElementById("leftPlayerCard").style.top + i / 100 + "px";
    }

    function moveLeft(i, j) {
        document.getElementById("rightPlayerCard").style.backgroundImage = "url(images/" + lastCardPlayed.suit + lastCardPlayed.value + ".jpg)";
        document.getElementById("rightPlayerCard").style.transform = "scale(" + j + ")";
        document.getElementById("rightPlayerCard").style.top = document.getElementById("rightPlayerCard").style.top + i / 100 + "px";
    }*/

    function reset(player) {
        /*if (player === "top"){
            document.getElementById("topPlayerCard").style.top = "0px";
            document.getElementById("topPlayerCard").style.transform = "scale(1)";
        } else if (player === "left"){
            document.getElementById("leftPlayerCard").style.left = "0px";
            document.getElementById("leftPlayerCard").style.transform = "scale(1)";
        } else {
            document.getElementById("rightPlayerCard").style.right = "0px";
            document.getElementById("rightPlayerCard").style.transform = "scale(1)";
        }*/
        if (player === "top"){
            document.getElementById(player + "PlayerCard").src = "images/backTop.jpg";
            document.getElementById(player + "PlayerCard").style.transform = "scale(1)";
            $(document).ready(function () {
                $("#topPlayerCard").animate({top: "-=100"}, 1);
            });
        } else {
            document.getElementById(player + "PlayerCard").src = "images/backSide.jpg";
            if (player === "right") {
                $(document).ready(function () {
                    $("#rightPlayerCard").animate({right: "-=200"}, 1);
                });
            }else {
                $(document).ready(function () {
                    $("#leftPlayerCard").animate({left: "-=200"}, 1);
                });
            }
        }
    }

    function takeRemainingCards() {
        //console.log("take remaining executing by player " + thisPlNum);
        var updates = {}, i = 0, lastTakenIndex;

        var countBoard = 0;
        for (i = 0; i < board.length; i++){
            if (board[i] !== "empty"){
                countBoard++;
            }
        }
        if (countBoard === 0){
            //console.log("empty board");
            return;
        }

        if (lastPlayerToTake % 2 === thisPlNum % 2){
            lastTakenIndex = taken.length;
            //console.log("take for team " + thisPlNum % 2);
            for (i = 0; i < board.length; i++){
                if (board[i] !== "empty"){
                    //console.log("take " + board[i].value + " " + board[i].suit + " for team " + thisPlNum % 2);
                    updates["/taken" + thisPlNum % 2 + "/" + lastTakenIndex] = board[i];
                    updates["/board/" + i] = "empty";
                    lastTakenIndex++;
                }
            }
        } else {
            lastTakenIndex = 40 - taken.length - countBoard;
            var takenDeck;
            if (thisPlNum % 2 === 0){
                takenDeck = 1;
            } else {
                takenDeck = 0;
            }
            //console.log("take for team " + takenDeck);
            for (i = 0; i < board.length; i++){
                if (board[i] !== "empty"){
                    //console.log("take " + board[i].value + " " + board[i].suit + " for team " + takenDeck);
                    updates["/taken" + takenDeck + "/" + lastTakenIndex] = board[i];
                    updates["/board/" + i] = "empty";
                    lastTakenIndex++;
                }
            }
        }
        gameRef.update(updates);
    }

    function gameEndHandler() {
        countPoints();
    }

    function countPoints(){
        var myCards = 0, myDiamonds = 0, myScopas = 0, otherScopas = 0, myNapolaPoints = 0, otherNapolaPoints = 0;
        var myNapola = [], theirNapola = [];
        var otherTeamDeck = [];
        var otherDeck;

        if (thisPlNum % 2 === 0){
            otherDeck = 1;
        } else {
            otherDeck = 0;
        }

        gameRef.child("taken" + otherDeck).get().then(function (snapshot) {
            if (snapshot.exists()) {
                otherTeamDeck = snapshot.val();

                //count cards, diamonds and setup napola and find 7 bello for me
                for (var c = 0; c < taken.length; c++){
                    if (taken[c].suit === "d") {
                        myNapola.push(taken[c]);
                        myDiamonds++;
                        if (taken[c].value === 7) {
                            myTeamPointsDescription += "\n7 Bello +1\n";
                            myPoints++;
                        }
                    }
                    if (taken[c].scopa){
                        //myPoints++;
                        myScopas++;
                    }
                    myCards++;
                }
                if (myScopas > 0) {
                    myTeamPointsDescription += "\nScopas +" + myScopas + "\n";
                    myPoints += myScopas;
                }
                //setup napola and find 7 bello for other team
                for (c = 0; c < otherTeamDeck.length; c++){
                    if (otherTeamDeck[c].suit === "d") {
                        theirNapola.push(otherTeamDeck[c]);
                        if (otherTeamDeck[c].value === 7) {
                            otherTeamPoints++;
                            otherTeamPointsDescription += "\n7 Bello +1\n";
                        }
                    }
                    if (otherTeamDeck[c].scopa){
                        //otherTeamPoints++;
                        otherScopas++;
                    }
                }
                if (otherScopas > 0) {
                    otherTeamPointsDescription += "\nScopas +" + otherScopas + "\n";
                    otherTeamPoints += otherScopas;
                }

                if (myCards > 20){
                    myPoints++;
                    myTeamPointsDescription += "\nCards +1\n";
                } else if (myCards < 20){
                    otherTeamPoints++;
                    otherTeamPointsDescription += "\nCards +1\n";
                }
                if (myDiamonds > 5){
                    myPoints++;
                    myTeamPointsDescription += "\nDiamonds +1\n";
                } else if (myDiamonds < 5){
                    otherTeamPoints++;
                    otherTeamPointsDescription += "\nDiamonds +1\n";
                }

                if (myNapola.length > 0) {
                    myNapola = sortHand(myNapola);
                    for (var j = 0; j < myNapola.length; j++){
                        //console.log("my " + myNapola[j].value + " " + myNapola[j].suit)
                    }
                    //console.log("mynapola deck:\n");
                    for (var i = 1; i < 11; i++) {
                        //console.log(myNapola[i - 1].value + " " + myNapola[i - 1].suit);
                        if (myNapola[i - 1].value === i) {
                            if (i === 3) {
                                myNapolaPoints += 3;
                                //myPoints += 3;
                                //console.log("my napola points " + myNapolaPoints);
                            }
                            if (i > 3) {
                                //myPoints++;
                                myNapolaPoints++;
                                //console.log("my napola points " + myNapolaPoints);
                            }
                        } else {
                            break;
                        }
                    }
                    if (myNapolaPoints > 0) {
                        myPoints += myNapolaPoints;
                        myTeamPointsDescription += "\nNapola +" + myNapolaPoints + "\n";
                    }
                }

                if (theirNapola.length > 0 && myNapolaPoints === 0) {
                    theirNapola = sortHand(theirNapola);
                    for (var j = 0; j < theirNapola.length; j++){
                        //console.log("other " + theirNapola[j].value + " " + theirNapola[j].suit)
                    }
                    //console.log("otherNapola deck:\n");
                    for (i = 1; i < 11; i++) {
                        //console.log(theirNapola[i - 1].value + " " + theirNapola[i - 1].suit);
                        if (theirNapola[i - 1].value === i) {
                            if (i === 3) {
                                //otherTeamPoints += 3;
                                otherNapolaPoints += 3;
                                //console.log("other napola points " + otherNapolaPoints);
                            }
                            if (i > 3) {
                                //otherTeamPoints++;
                                otherNapolaPoints++;
                                //console.log("other napola points " + otherNapolaPoints);

                            }
                        } else {
                            break;
                        }
                    }
                    //console.log("otherpoints with napola: " + otherTeamPoints);
                    if (otherNapolaPoints > 0) {
                        otherTeamPoints += otherNapolaPoints;
                        otherTeamPointsDescription += "\nNapola +" + otherNapolaPoints + "\n";
                    }
                }

                //primiera for all
                primiera(otherTeamDeck);
                //showWinners();
                var updates = {};
                if (thisPlNum % 2 === 0) {
                    updates["/points"] = myPoints + "-" + otherTeamPoints;
                    updates["/pointsDescription"] = myTeamPointsDescription + "-" + otherTeamPointsDescription;
                } else {
                    updates["/points"] = otherTeamPoints + "-" + myPoints;
                    updates["/pointsDescription"] = otherTeamPointsDescription + "-" + myTeamPointsDescription;
                }
                gameRef.update(updates);
            } else {
                console.log("No data available");
            }
        }).catch(function (error) {
            console.log(error)
        });
    }

    function primiera(otherTeamDeck){

        var myScore = 0, theirScore = 0;
        var best = [7, 6, 1, 5, 4, 3, 2, 8, 9, 10];
        var myPrimiera = [0, 0, 0, 0], theirPrimiera = [0, 0, 0, 0];

        //console.log("primiera");
        for (var i = 0; i < best.length; i++) {
            for (var c = 0; c < taken.length; c++) {
                if (taken[c].value === best[i]){
                    if (taken[c].suit === "c" && myPrimiera[0] === 0){
                        //console.log("my best clubs for primiera: " + taken[c].value);
                        myPrimiera[0] = taken[c].value;
                    } else if (taken[c].suit === "d" && myPrimiera[1] === 0){
                        //console.log("my best diamonds for primiera: " + taken[c].value);
                        myPrimiera[1] = taken[c].value;
                    } else if (taken[c].suit === "h" && myPrimiera[2] === 0){
                        //console.log("my best hearts for primiera: " + taken[c].value);
                        myPrimiera[2] = taken[c].value;
                    } else if (taken[c].suit === "s" && myPrimiera[3] === 0){
                        //console.log("my best spades for primiera: " + taken[c].value);
                        myPrimiera[3] = taken[c].value;
                    }
                }
            }
            for (var c1 = 0; c1 < otherTeamDeck.length; c1++) {
                if (otherTeamDeck[c1].value === best[i]){
                    if (otherTeamDeck[c1].suit === "c" && theirPrimiera[0] === 0){
                        //console.log("other best clubs for primiera: " + otherTeamDeck[c1].value);
                        theirPrimiera[0] = otherTeamDeck[c1].value;
                    } else if (otherTeamDeck[c1].suit === "d" && theirPrimiera[1] === 0){
                        //console.log("other best diamonds for primiera: " + otherTeamDeck[c1].value);
                        theirPrimiera[1] = otherTeamDeck[c1].value;
                    } else if (otherTeamDeck[c1].suit === "h" && theirPrimiera[2] === 0){
                        //console.log("other best hearts for primiera: " + otherTeamDeck[c1].value);
                        theirPrimiera[2] = otherTeamDeck[c1].value;
                    } else if (otherTeamDeck[c1].suit === "s" && theirPrimiera[3] === 0){
                        //console.log("other best spades for primiera: " + otherTeamDeck[c1].value);
                        theirPrimiera[3] = otherTeamDeck[c1].value;
                    }
                }
            }
        }
        for (i = 0; i < myPrimiera.length; i++){
            myScore += pointsForPrimiera(myPrimiera[i]);
            theirScore += pointsForPrimiera(theirPrimiera[i]);
        }
        if (myScore > theirScore){
            myPoints++;
            myTeamPointsDescription += "\nPrimiera +1\n";
        } else if (myScore < theirScore){
            otherTeamPoints++;
            otherTeamPointsDescription += "\nPrimiera +1\n";
        }
        //console.log("myscore after primiera: " + myPoints + " otherscore after primiera: " + otherTeamPoints);
    }

    function pointsForPrimiera(cardValue){
        switch (cardValue){
            case 7:
                return 21;
            case 6:
                return 18;
            case 1:
                return 16;
            case 5:
                return 15;
            case 4:
                return 14;
            case 3:
                return 13;
            case 2:
                return 12;
            case 8:
            case 9:
            case 10:
                return 10;
            default:
                return 0;
        }
    }

    function showWinners() {
        var winners = [], losers = [];
        //console.log("mypoints total: " + myPoints + " otherpoints total: " + otherTeamPoints);
        if (points === null) {
            return;
        }
        var splitPoints = points.split("-");
        var splitDescriptions = pointsDescription.split("-");
        var team0Description = splitDescriptions[0], team1Description = splitDescriptions[1];
        var pointsTeam0 = splitPoints[0], pointsTeam1 = splitPoints[1];

        document.getElementById("topPlayerCard").style.display = "none";
        document.getElementById("leftPlayerCard").style.display = "none";
        document.getElementById("rightPlayerCard").style.display = "none";
        document.getElementById("northName").innerHTML = "";
        document.getElementById("westName").innerHTML = "";
        document.getElementById("eastName").innerHTML = "";
        document.getElementById("yourTurn").hidden = true;
        document.getElementById("results").style.position = "relative";
        document.getElementById("results").style.top = "50px";
        document.getElementById("results").style.textAlign = "center";
        document.getElementById("results").hidden = false;


        if (pointsTeam0 !== pointsTeam1){
            if (pointsTeam0 > pointsTeam1){
                winners.push(pl0Name);
                winners.push(pl2Name);
                winners.push(pointsTeam0);
                winners.push(team0Description);
                losers.push(pl1Name);
                losers.push(pl3Name);
                losers.push(pointsTeam1);
                losers.push(team1Description);
            } else if (pointsTeam0 < pointsTeam1) {
                winners.push(pl1Name);
                winners.push(pl3Name);
                winners.push(pointsTeam1);
                winners.push(team1Description);
                losers.push(pl0Name);
                losers.push(pl2Name);
                losers.push(pointsTeam0);
                losers.push(team0Description);
            }
            document.getElementById("results").innerHTML = "<pre>The Winners are: " + winners[0] + " and " + winners[1] + " with " + winners[2] + " points.\n" + winners[3] + "\nThe Losers are: " + losers[0] + " and " + losers[1] + " with " + losers[2] + " points.\n" + losers[3] + "</pre><pre style='font-size: 15px'>Reload the page if you want to start a new game.</pre>";
        } else {
            var team0 = [], team1 = [];
            team0.push(pl0Name);
            team0.push(pl2Name);
            team0.push(team0Description);
            team1.push(pl1Name);
            team1.push(pl3Name);
            team1.push(team1Description);
            document.getElementById("results").innerHTML = "<pre>It's a tie! Both teams scored " + pointsTeam0[0] + " points.\n" + team0[0] + " and " + team0[1] + " team:\n" + team0[2] + "\n" + team1[0] + " and " + team1[1] + " team:\n" + team1[2] + "</pre><pre style='font-size: 15px'>Reload the page if you want to start a new game.</pre>";
        }
        switchOffListeners();
        /*if (thisPlNum === turn) {
            gameRef.set(null);
            var updates = {};
            dbRef.child("gameList").get().then(function (snapshot) {
                if (snapshot.exists()) {
                    tmpGameList = snapshot.val();
                    for (var i = 0; i < tmpGameList.length; i++) {
                        if (tmpGameList[i] === gameName) {
                            break;
                        }
                    }
                    tmpGameList.splice(i, 1);
                    updates["/gameList"] = tmpGameList;
                    dbRef.update(updates);
                } else {
                    console.log("No data available");
                }
            }).catch(function (error) {
                console.log(error);
            });
        }*/
    }

    function switchOffListeners() {
        if (thisPlNum === 0) {
            gameRef.child("plCount").off("value", plCountListener);
        }
        gameRef.child("pl0").child("nickname").off("value", pl0NameListener);
        gameRef.child("pl1").child("nickname").off("value", pl1NameListener);
        gameRef.child("pl2").child("nickname").off("value", pl2NameListener);
        gameRef.child("pl3").child("nickname").off("value", pl3NameListener);
        gameRef.child("start").off("value", startListener);
        gameRef.child("turn").off("value", turnListener);
        gameRef.child("pl" + thisPlNum).child("hand").off("child_added", handChildAddedListener);
        gameRef.child("pl" + thisPlNum).child("hand").off("child_changed", handChildChangedListener);
        gameRef.child("board").off("child_added", boardChildAddedListener);
        gameRef.child("board").off("child_added", boardChildChangedListener);
        gameRef.child("board").off("child_added", boardChildRemovedListener);
        gameRef.child("taken" + thisPlNum % 2).off("child_added", takenListener);
        gameRef.child("ended").off("value", endedListener);
        gameRef.child("firstTurn").off("value", firstTurnListener);
        gameRef.child("lastCardPlayed").off("value", lastCardPlayedListener);
        gameRef.child("lastPlayerToTake").off("value", lastPlayerToTakeListener);
        gameRef.child("countCardPlayed").off("value", countCardPlayedListener);
        gameRef.child("points").off("value", pointsListener);
        gameRef.child("pointsDescription").off("value", pointsDescriptionListener);
        //console.log(pointsRead);
        /*if (pointsRead < 3) {
            setTimeout(function () {
                console.log("incremento pointsRead");
                pointsRead++;
                gameRef.child("pointsRead").set(pointsRead);
                gameRef.child("pointsRead").off("value", pointsReadListener);
            }, 200 * pointsRead);
        } else {*/
            //console.log("elimino game");
            //gameRef.child("pointsRead").off("value", pointsReadListener);
        if (thisPlNum === 0) {
            gameRef.set(null);
            gameList.splice(gameList.indexOf(gameName), 1);
            gameListRef.set(gameList);
        }
        //}
    }
    
}());