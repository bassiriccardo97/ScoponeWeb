(function () {

    // ----------DB---------- //

    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyChVcDrt99Ewmx6uk8kxzog03EZPeXHpXY",
        authDomain: "scopone3.firebaseapp.com",
        databaseURL: "https://scopone3-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "scopone3",
        storageBucket: "scopone3.appspot.com",
        messagingSenderId: "535588674315",
        appId: "1:535588674315:web:29e6bff273414355b1e00e",
        measurementId: "G-TQCHJ2RJXT"
    };
    firebase.initializeApp(firebaseConfig);

    // Get DB reference
    const dbRef = firebase.database().ref();

    // ----------PAGE LAYOUTS---------- //

    // Home page layout
    document.getElementById("home").innerHTML = '<h1 style="font-size: 40px">Welcome to Scopone!</h1>\n' +
        '    <h2>Please, choose a nickname.</h2>\n' +
        '    <h3>Then create a new game or join an existing one.</h3>\n' +
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
        '        <button id="btnCreate" class="form">Create</button>\n' +
        '        <button id="btnJoin" class="form">Join</button>\n' +
        '    </div>';

    // Game page layout
    const gameLayout = '<div class="container-fluid" style="width: 100%; height: 100%;">\n' +
        '\n' +
        '        <!-- YOUR TURN, NORTH PLAYER -->\n' +
        '        <div class="row" style="width: 100%; height: 20%; margin: 0">\n' +
        '\n' +
        '            <!-- YOUR TURN -->\n' +
        '            <div class="row" style="width: 100%; height: 20%; margin: 0">\n' +
        '                <div class="d-flex justify-content-center" style="width: 100%; height: 100%">\n' +
        '                    <h1 id="yourTurn" style="font-size: 30px">Waiting for players...</h1>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- empty space -->\n' +
        '            <div class="row" style="width: 100%; height: 10%; margin: 0">\n' +
        '\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- NORTH PLAYER CARD -->\n' +
        '            <div class="row" style="width: 100%; height: 75%; margin: 0">\n' +
        '                <div class="d-flex justify-content-center" style="width: 100%; height: 100%">\n' +
        '                    <img id="topPlayerCard" src="images/backTop.jpg" class="img-fluid">\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- NORTH PLAYER NAME -->\n' +
        '            <div class="row" style="width: 100%; height: 20%; margin: 0">\n' +
        '                <div class="d-flex justify-content-center" style="width: 100%; height: 100%">\n' +
        '                    <p class="text-justify" id="northName" style="color: white"></p>\n' +
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
        '                        <p class="text-justify" id="westName" style="color: white"></p>\n' +
        '                        <img id="leftPlayerCard" src="images/backSide.jpg" class="img-fluid">\n' +
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
        '                            <button id="boardCard0" class="board"></button>\n' +
        '                            <button id="boardCard1" class="board"></button>\n' +
        '                            <button id="boardCard2" class="board"></button>\n' +
        '                            <button id="boardCard3" class="board"></button>\n' +
        '                            <button id="boardCard4" class="board"></button>\n' +
        '                        </div>\n' +
        '\n' +
        '                        <!-- empty space -->\n' +
        '                        <div class="row" style="width: 100%; height: 2%; margin: 0">\n' +
        '\n' +
        '                        </div>\n' +
        '\n' +
        '                        <!-- SECOND 5 BOARD CARDS -->\n' +
        '                        <div class="d-flex justify-items-center" style="width: 100%; height: 49%">\n' +
        '                            <button id="boardCard5" class="board"></button>\n' +
        '                            <button id="boardCard6" class="board"></button>\n' +
        '                            <button id="boardCard7" class="board"></button>\n' +
        '                            <button id="boardCard8" class="board"></button>\n' +
        '                            <button id="boardCard9" class="board"></button>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '\n' +
        '            <!-- EAST PLAYER -->\n' +
        '            <div class="col" style="width: 10%; height: 100%">\n' +
        '                <div class="d-flex align-items-center" style="width: 100%; height: 100%">\n' +
        '                    <div class="d-flex flex-column">\n' +
        '                        <p class="text-justify" id="eastName" style="color: white"></p>\n' +
        '                        <img id="rightPlayerCard" src="images/backSide.jpg" class="img-fluid">\n' +
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

        getSuit(){
            return this.suit;
        }

        getValue(){
            return this.value;
        }
    }

    class Player {
        constructor(nickname) {
            this.nickname = nickname;
        }

        setHand(deck){
            this.hand = deck;
        }

        getHand(){
            return this.hand;
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
        }
    }


    // ----------VARIABLES---------- //

    var gameRef;
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
    var totalDeck = [];
    var otherTeamPoints = 0, myPoints = 0;

    // ----------ELEMENTS---------- //

    // Home elements
    const home = document.getElementById("home");
    const nickname = document.getElementById("nickname");
    const room = document.getElementById("room");
    const password = document.getElementById("password");
    const btnCreate = document.getElementById("btnCreate");
    const btnJoin = document.getElementById("btnJoin");


    // ----------BUTTON LISTENERS---------- //

    // Create a game
    btnCreate.addEventListener("click", e => {

        const nick = nickname.value;
        const roomName = room.value;
        const psw = password.value;

        if (nick.length < 1 || roomName.length < 1 || psw.length < 1){
            return; // Add wrong text msg
        }

        // Add new game
        dbRef.child(roomName + "-" + psw).set(new Game(new Player(nick)));
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
                    // Add game full msg
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
        if (turn === thisPlNum && !(thisPlayerHand[0].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[0]);
            playedCard = 0;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function hand1EventListener(event) {
        if (turn === thisPlNum && !(thisPlayerHand[1].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[1]);
            playedCard = 1;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function hand2EventListener(event) {
        if (turn === thisPlNum && !(thisPlayerHand[2].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[2]);
            playedCard = 2;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function hand3EventListener(event) {
        if (turn === thisPlNum && !(thisPlayerHand[3].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[3]);
            playedCard = 3;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function hand4EventListener(event) {
        if (turn === thisPlNum && !(thisPlayerHand[4].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[4]);
            playedCard = 4;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function hand5EventListener(event) {
        if (turn === thisPlNum && !(thisPlayerHand[5].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[5]);
            playedCard = 5;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function hand6EventListener(event) {
        if (turn === thisPlNum && !(thisPlayerHand[6].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[6]);
            playedCard = 6;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function hand7EventListener(event) {
        if (turn === thisPlNum && !(thisPlayerHand[7].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[7]);
            playedCard = 7;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function hand8EventListener(event) {
        if (turn === thisPlNum && !(thisPlayerHand[8].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[8]);
            playedCard = 8;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function hand9EventListener(event) {
        if (turn === thisPlNum && !(thisPlayerHand[9].value === 1 && firstTurn === true)) {
            if (firstTurn){
                gameRef.child("firstTurn").set(false);
            }
            gameRef.child("lastCardPlayed").set(thisPlayerHand[9]);
            playedCard = 9;
            /*gameRef.child("board").child(board.length).set(thisPlayerHand[0]);
            gameRef.child("pl" + thisPlNum).child("hand").child(0).set("empty");*/
            if (evaluateOptions() === 1) {
                nextTurn();
            }
        }
    }

    function board0EventListener(event) {
        if (turn === thisPlNum){
            choices.push(0)
            document.getElementById("boardCard0").style.border = "none";
            document.getElementById("boardCard0").disabled = true;
            checkChoice();
        }
    }

    function board1EventListener(event) {
        if (turn === thisPlNum){
            choices.push(1)
            document.getElementById("boardCard1").style.border = "none";
            document.getElementById("boardCard1").disabled = true;
            checkChoice();
        }
    }

    function board2EventListener(event) {
        if (turn === thisPlNum){
            choices.push(2)
            document.getElementById("boardCard2").style.border = "none";
            document.getElementById("boardCard2").disabled = true;
            checkChoice();
        }
    }

    function board3EventListener(event) {
        if (turn === thisPlNum){
            choices.push(3)
            document.getElementById("boardCard3").style.border = "none";
            document.getElementById("boardCard3").disabled = true;
            checkChoice();
        }
    }

    function board4EventListener(event) {
        if (turn === thisPlNum){
            choices.push(4)
            document.getElementById("boardCard4").style.border = "none";
            document.getElementById("boardCard4").disabled = true;
            checkChoice();
        }
    }

    function board5EventListener(event) {
        if (turn === thisPlNum){
            choices.push(5)
            document.getElementById("boardCard5").style.border = "none";
            document.getElementById("boardCard5").disabled = true;
            checkChoice();
        }
    }

    function board6EventListener(event) {
        if (turn === thisPlNum){
            choices.push(6)
            document.getElementById("boardCard6").style.border = "none";
            document.getElementById("boardCard6").disabled = true;
            checkChoice();
        }
    }

    function board7EventListener(event) {
        if (turn === thisPlNum){
            console.log("pressed board 0");
            choices.push(7)
            document.getElementById("boardCard7").style.border = "none";
            document.getElementById("boardCard7").disabled = true;
            checkChoice();
        }
    }

    function board8EventListener(event) {
        if (turn === thisPlNum){
            choices.push(8)
            document.getElementById("boardCard8").style.border = "none";
            document.getElementById("boardCard8").disabled = true;
            checkChoice();
        }
    }

    function board9EventListener(event) {
        if (turn === thisPlNum){
            choices.push(9)
            document.getElementById("boardCard9").style.border = "none";
            document.getElementById("boardCard8").disabled = true;
            checkChoice();
        }
    }


    // ----------DB LISTENERS---------- //

    function addPlCountListener(){
        gameRef.child("plCount").on("value", (snapshot) => {
            plCount = snapshot.val();
            if (plCount === 4){
                startGame();
            }
        });
    }

    function addNamesListener(){
        gameRef.child("pl0").child("nickname").on("value", (snapshot) => {
            pl0Name = snapshot.val();
            if (thisPlNum === 1){
                document.getElementById("westName").innerHTML = snapshot.val();
            } else if (thisPlNum === 2){
                document.getElementById("northName").innerHTML = snapshot.val();
            } else if (thisPlNum === 3){
                document.getElementById("eastName").innerHTML = snapshot.val();
            }
        });

        gameRef.child("pl1").child("nickname").on("value", (snapshot) => {
            pl1Name = snapshot.val();
            if (thisPlNum === 0){
                document.getElementById("eastName").innerHTML = snapshot.val();
            } else if (thisPlNum === 2){
                document.getElementById("westName").innerHTML = snapshot.val();
            } else if (thisPlNum === 3){
                document.getElementById("northName").innerHTML = snapshot.val();
            }
        });

        gameRef.child("pl2").child("nickname").on("value", (snapshot) => {
            pl2Name = snapshot.val();
            if (thisPlNum === 0){
                document.getElementById("northName").innerHTML = snapshot.val();
            } else if (thisPlNum === 1){
                document.getElementById("eastName").innerHTML = snapshot.val();
            } else if (thisPlNum === 3){
                document.getElementById("westName").innerHTML = snapshot.val();
            }
        });

        gameRef.child("pl3").child("nickname").on("value", (snapshot) => {
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
        gameRef.child("start").on("value", (snapshot) => {
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
            }
        });
    }

    function addTurnListener() {
        gameRef.child("turn").on("value", (snapshot) => {
            turn = snapshot.val();
            if (turn === -1){
                return;
            }
            if (turn === thisPlNum && countCardPlayed === 40){
                takeRemainingCards();
                gameRef.child("ended").set(true);
                return;
            }
            var txt, col;
            if (turn === thisPlNum){
                txt = "YOUR TURN!"
                col = "yellow";
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
        });
    }

    function addThisPlayerHandListener() {
        var handRef = gameRef.child("pl" + thisPlNum).child("hand");

        handRef.on("child_added", (data) => {
            thisPlayerHand.push(data.val());
            updateHandButtons();
        });

        handRef.on("child_changed", (data) => {
            thisPlayerHand[data.key] = data.val();
            updateHandButtons();
        });
    }

    function updateHandButtons() {
        var i;
        for (i = 0; i < thisPlayerHand.length; i++){
            if (thisPlayerHand[i] === "empty") {
                document.getElementById("handCard" + i).style.background = "none";
                document.getElementById("handCard" + i).disabled = true;
            } else {
                document.getElementById("handCard" + i).style.backgroundImage = "url(images/" + thisPlayerHand[i].suit + thisPlayerHand[i].value + ".jpg)";
                document.getElementById("handCard" + i).style.backgroundRepeat = "no-repeat";
                document.getElementById("handCard" + i).style.backgroundPosition = "center";
                document.getElementById("handCard" + i).style.backgroundSize = "contain";
            }
        }
    }
    
    function addBoardListener() {
        var boardRef = gameRef.child("board");

        boardRef.on("child_added", (data) => {
            board.push(data.val());
            updateBoardButtons();
        });

        boardRef.on("child_changed", (data) => {
            board[data.key] = data.val();
            updateBoardButtons();
        });

        boardRef.on("child_removed", (data) => {
            board.splice(data.key, 1);
            updateBoardButtons();
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
            document.getElementById("boardCard" + i).disabled = true;
        }
    }

    function addTakenListener() {
        gameRef.child("taken" + thisPlNum % 2).on("child_added", (data) => {
            taken.push(data.val());
        });
    }

    function addEndedListener(){
        gameRef.child("ended").on("value", (snapshot) => {
            if (snapshot.val() === true){
                gameEndHandler();
            }
        });
    }

    function addFirstTurnListener() {
        gameRef.child("firstTurn").on("value", (snapshot) => {
            firstTurn = snapshot.val();
        });
    }

    function addLastCardPlayedListener(){
        gameRef.child("lastCardPlayed").on("value", (snapshot) => {
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
        gameRef.child("lastPlayerToTake").on("value", (snapshot) => {
            lastPlayerToTake = snapshot.val();
        });
    }

    function addCountCardPlayedListener() {
        gameRef.child("countCardPlayed").on("value", (snapshot) => {
            countCardPlayed = snapshot.val();
        });
    }


    // ----------GAME FUNCTIONS----------//

    function startGame() {
        var deck = shuffle(freshDeck());
        const pl0Hand = sortHand(deck.slice(0, 10));
        const pl1Hand = sortHand(deck.slice(10, 20));
        const pl2Hand = sortHand(deck.slice(20, 30));
        const pl3Hand = sortHand(deck.slice(30, 40));

        var updates = {};
        updates["/pl0/hand"] = pl0Hand;
        updates["/pl1/hand"] = pl1Hand;
        updates["/pl2/hand"] = pl2Hand;
        updates["/pl3/hand"] = pl3Hand;
        updates["/turn"] = getRandomInt(0, 4);
        updates["/start"] = true;

        gameRef.update(updates);

        /*gameRef.child("pl0").child("hand").set(pl0Hand);
        gameRef.child("pl1").child("hand").set(pl1Hand);
        gameRef.child("pl2").child("hand").set(pl2Hand);
        gameRef.child("pl3").child("hand").set(pl3Hand);

        gameRef.child("turn").set(getRandomInt(0, 4));
        
        gameRef.child("start").set(true);*/
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
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
        totalDeck = deck;
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

    function evaluateOptions(){

        if (thisPlayerHand[playedCard].value === 1){
            assoPigliaTutto(playedCard);
            return 1;
        }
        /*if (board.length === 0){
            gameRef.child("board").child(0).set(thisPlayerHand[playedCard]);
            return;
        }*/

        var tuple = [];
        for (var i = 0; i < board.length; i++){
            if (board[i] !== "empty" && board[i].value === thisPlayerHand[playedCard].value){
                tuple.push(i);
                options.push(tuple);
                tuple = [];
                break;
            }
            for (var j = i + 1; j < board.length; j++){
                if (board[i] !== "empty" && board[j] !== "empty" && board[i].value + board[j].value === thisPlayerHand[playedCard].value){
                    tuple.push(i);
                    tuple.push(j);
                    options.push(tuple);
                    tuple = [];
                }
                for (var k = j + 1; k < board.length; k++){
                    if (board[i] !== "empty" && board[j] !== "empty" && board[k] !== "empty" && board[i].value + board[j].value + board[k].value === thisPlayerHand[playedCard].value){
                        tuple.push(i);
                        tuple.push(j);
                        tuple.push(k);
                        options.push(tuple);
                        tuple = [];
                    }
                }
            }
        }

        var updates = {};
        if (options.length === 0){
            updates["/board/" + getFirstEmptyInBoard()] = thisPlayerHand[playedCard];
            updates["/pl" + thisPlNum + "/hand/" + playedCard] = "empty";
            updates["/lastPlayerToTake"] = thisPlNum;
            updates["/countCardPlayed"] = countCardPlayed + 1;
            gameRef.update(updates);
            //gameRef.child("board").child(getFirstEmptyInBoard()).set(thisPlayerHand[playedCard]);
            //gameRef.child("pl" + thisPlNum).child("hand").child(playedCard).set("empty");
            return 1;
        }

        if (options.length === 1) {
            if (options[0].length === countNotEmptyOnBoard()) {
                thisPlayerHand[playedCard].scopa = true;
            }
            var lastTaken = taken.length;
            for (var o = 0; o < options[0].length; o++) {
                updates["/taken" + thisPlNum % 2 + "/" + lastTaken] = board[options[0][o]];
                updates["/board/" + options[0][o]] = "empty"
                //gameRef.child("taken" + thisPlNum % 2).child(taken.length).set(board[o]);
                //gameRef.child("board").child(o).set("empty");
                lastTaken++;
            }
            updates["/taken" + thisPlNum % 2 + "/" + lastTaken] = thisPlayerHand[playedCard];
            updates["/pl" + thisPlNum + "/hand/" + playedCard] = "empty";
            updates["/lastPlayerToTake"] = thisPlNum;
            updates["/countCardPlayed"] = countCardPlayed + 1;
            //gameRef.child("taken" + thisPlNum % 2).child(taken.length).set(thisPlayerHand[playedCard]);
            //gameRef.child("pl" + thisPlNum).child("hand").child(playedCard).set("empty");
            gameRef.update(updates);
            return 1;
        }

        //updates["/board/" + getFirstEmptyInBoard()] = thisPlayerHand[playedCard];
        updates["/taken" + thisPlNum % 2 + "/" + taken.length] = thisPlayerHand[playedCard];
        updates["/pl" + thisPlNum + "/hand/" + playedCard] = "empty";
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


    function enableBoardButtons(){
        for (var t = 0; t < thisPlayerHand.length; t++){
            document.getElementById("handCard" + t).disabled = true;
        }
        for (var i = 0; i < options.length; i++){
            for (var j = 0; j < options[i].length; j++){
                for (var k = 0; k < options.length; k++){
                    if (options[k].includes(options[i][j]) === false){
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
            }
        }
        //updates["/taken" + thisPlNum % 2 + "/" + lastTaken] = thisPlayerHand[playedCard];
        //updates["/pl" + thisPlNum + "/hand/" + playedCard] = "empty";
        gameRef.update(updates);
        for (var t = 0; t < thisPlayerHand.length; t++){
            document.getElementById("handCard" + t).disabled = false;
        }
        for (t = 0; t < thisPlayerHand.length; t++){
            document.getElementById("boardCard" + t).disabled = true;
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
        } else if (player === "left"){
            document.getElementById("leftPlayerCard").src = "images/" + lastCardPlayed.suit + lastCardPlayed.value + ".jpg";
        } else {
            document.getElementById("rightPlayerCard").src = "images/" + lastCardPlayed.suit + lastCardPlayed.value + ".jpg";
        }

        setTimeout(function (){
            reset(player)
        }, 3000)
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
        } else {
            document.getElementById(player + "PlayerCard").src = "images/backSide.jpg";
        }
    }

    function takeRemainingCards() {
        var updates = {}, i = 0, lastTakenIndex;

        var countBoard = 0;
        for (i = 0; i < board.length; i++){
            if (board[i] !== "empty"){
                countBoard++;
            }
        }
        if (countBoard === 0){
            return;
        }

        if (lastPlayerToTake % 2 === thisPlNum % 2){
            lastTakenIndex = taken.length;
            for (i = 0; i < board.length; i++){
                if (board[i] !== "empty"){
                    updates["/taken" + thisPlNum % 2 + "/" + lastTakenIndex] = board[i];
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
            for (i = 0; i < board.length; i++){
                if (board[i] !== "empty"){
                    updates["/taken" + takenDeck + "/" + lastTakenIndex] = board[i];
                    lastTakenIndex++;
                }
            }
        }
    }

    function gameEndHandler() {
        countPoints();
        showWinners();
    }

    function countPoints(){
        var myCards = 0, myDiamonds = 0;
        var myNapola = [], theirNapola = [];
        var otherTeamDeck = [];

        //get other team takenDeck
        for (var c = 0; c < totalDeck.length; c++){
            if (!taken.includes(totalDeck[c])){
                otherTeamDeck.push(totalDeck[c]);
            }
        }

        //count cards, diamonds and setup napola and find 7 bello for me
        for (c = 0; c < taken.length; c++){
            if (taken[c].suit === "d") {
                myNapola.push(taken[c]);
                myDiamonds++;
                if (taken[c].value === 7) {
                    myPoints++;
                }
            }
            if (taken[c].scopa){
                myPoints++;
            }
            myCards++;
        }

        //setup napola and find 7 bello for other team
        for (c = 0; c < otherTeamDeck.length; c++){
            if (otherTeamDeck[c].suit === "d") {
                theirNapola.push(otherTeamDeck[c]);
                myDiamonds++;
                if (otherTeamDeck[c].value === 7) {
                    otherTeamPoints++;
                }
            }
            if (otherTeamDeck[c].scopa){
                otherTeamPoints++;
            }
        }

        if (myCards > 20){
            myPoints++;
        } else if (myCards < 20){
            otherTeamPoints++;
        }
        if (myDiamonds > 5){
            myPoints++;
        } else if (myDiamonds < 5){
            otherTeamPoints++;
        }

        //napola for me
        myNapola = sortHand(myNapola);
        for (var i = 1; i < 11; i++){
            if (myNapola[i - 1].value === i){
                if (i === 3){
                    myPoints += 3;
                }
                if (i > 3){
                    myPoints++;
                }
            }else {
                break;
            }
        }

        //napola other team
        theirNapola = sortHand(theirNapola);
        for (i = 1; i < 11; i++){
            if (theirNapola[i - 1] === i){
                if (i === 3){
                    otherTeamPoints += 3;
                }
                if (i > 3){
                    otherTeamPoints++;
                }
            }else {
                break;
            }
        }

        //primiera for all
        primiera(otherTeamDeck);
    }

    function primiera(otherTeamDeck){

        var myScore = 0, theirScore = 0;
        var best = [7, 6, 1, 5, 4, 3, 2, 8, 9, 10];
        var myPrimiera = [0, 0, 0, 0], theirPrimiera = [0, 0, 0, 0];


        for (var i = 0; i < best.length; i++) {
            for (var c = 0; c < taken.length; c++) {
                if (taken[c].value === i){
                    if (taken[c].suit === "c" && myPrimiera[0] === 0){
                        myPrimiera[0] = taken[c].value;
                    } else if (taken[c].suit === "d" && myPrimiera[1] === 0){
                        myPrimiera[1] = taken[c].value;
                    } else if (taken[c].suit === "h" && myPrimiera[2] === 0){
                        myPrimiera[2] = taken[c].value;
                    } else if (taken[c].suit === "s" && myPrimiera[3] === 0){
                        myPrimiera[3] = taken[c].value;
                    }
                }
            }
            for (var c1 = 0; c1 < otherTeamDeck.length; c1++) {
                if (otherTeamDeck[c1].value === i){
                    if (otherTeamDeck[c1].suit === "c" && theirPrimiera[0] === 0){
                        theirPrimiera[0] = otherTeamDeck[c1].value;
                    } else if (otherTeamDeck[c1].suit === "d" && theirPrimiera[1] === 0){
                        theirPrimiera[1] = otherTeamDeck[c1].value;
                    } else if (otherTeamDeck[c1].suit === "h" && theirPrimiera[2] === 0){
                        theirPrimiera[2] = otherTeamDeck[c1].value;
                    } else if (otherTeamDeck[c].suit === "s" && theirPrimiera[3] === 0){
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
        } else if (myScore < theirScore){
            otherTeamPoints++;
        }
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
        if (myPoints > otherTeamPoints){
            if (thisPlNum === 0 || thisPlNum === 2){
             winners.push(pl0Name);
             winners.push(pl2Name);
             losers.push(pl1Name);
             losers.push(pl3Name);
            } else {
             winners.push(pl1Name);
             winners.push(pl3Name);
             losers.push(pl0Name);
             losers.push(pl2Name);
            }
            winners.push(myPoints);
            losers.push(otherTeamPoints);
            document.getElementById("yourTurn").innerHTML = "<p>The Winners are: " + winners[0] + " and " + winners[1] + " with " + winners[3] + " points.</p>" +
                "<p>The Losers are: " + losers[0] + " and " + losers[1] + " with " + losers[3] + " points.</p>";
        }else if (myPoints < otherTeamPoints){
            if (thisPlNum === 0 || thisPlNum === 2){
                winners.push(pl1Name);
                winners.push(pl3Name);
                losers.push(pl0Name);
                losers.push(pl2Name);
            } else {
                winners.push(pl0Name);
                winners.push(pl2Name);
                losers.push(pl1Name);
                losers.push(pl3Name);
            }
            winners.push(otherTeamPoints);
            losers.push(myPoints);
            document.getElementById("yourTurn").innerHTML = "<p>The Winners are: " + winners[0] + " and " + winners[1] + " with " + winners[3] + " points.</p>" +
                "<p>The Losers are: " + losers[0] + " and " + losers[1] + " with " + losers[3] + " points.</p>";
        } else {
            document.getElementById("yourTurn").innerHTML = "<p>It's a tie! Both teams scored: " + myPoints + " points.</p>";
        }
    }

}());