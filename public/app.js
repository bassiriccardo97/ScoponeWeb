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

    // ----------ELEMENTS---------- //

    // Home elements
    const home = document.getElementById("home");
    const nickname = document.getElementById("nickname");
    const room = document.getElementById("room");
    const password = document.getElementById("password");
    const btnCreate = document.getElementById("btnCreate");
    const btnJoin = document.getElementById("btnJoin");


    // ----------CLASSES---------- //

    const SUITS = ["c", "d", "h", "s"];
    const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    class Card {
        constructor(suit, value) {
            this.suit = suit;
            this.value = value;
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
        addPlCountListener();
        addNamesListener();
        addStartListener();
        addTurnListener();

        thisPlNum = 0;

        home.innerHTML = gameLayout;
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
                } else {
                    // Add game full msg
                }
            } else {
                console.log("No data available");
            }
        }).catch(function (error) {
            console.log(error)
        });
        addNamesListener();
        addStartListener();
        addTurnListener();

    });


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
            }
        });
    }

    function addTurnListener() {
        gameRef.child("turn").on("value", (snapshot) => {
            turn = snapshot.val();
            if (turn === -1){
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
            var i;
            for (i = 0; i < thisPlayerHand.length; i++){
                document.getElementById("handCard" + i).style.backgroundImage = "url(images/" + thisPlayerHand[i].suit + thisPlayerHand[i].value + ".jpg)";
                document.getElementById("handCard" + i).style.backgroundRepeat = "no-repeat";
                document.getElementById("handCard" + i).style.backgroundPosition = "center";
                document.getElementById("handCard" + i).style.backgroundSize = "contain";
            }
        });

        handRef.on("child_changed", (data) => {
            thisPlayerHand[data.key] = data.val();
        });
    }
    
    function addBoardListener() {
        
    }
    
    function addEndedListener(){
        gameRef.child("ended").on("value", (snapshot) => {
            if (snapshot.val() === true){
                gameEndHandler();
            }
        });
    }


    // ----------GAME FUNCTIONS----------//

    function startGame() {
        var deck = shuffle(freshDeck());
        const pl0Hand = sortHand(deck.slice(0, 10));
        const pl1Hand = sortHand(deck.slice(10, 20));
        const pl2Hand = sortHand(deck.slice(20, 30));
        const pl3Hand = sortHand(deck.slice(30, 40));
        
        gameRef.child("pl0").child("hand").set(pl0Hand);
        gameRef.child("pl1").child("hand").set(pl1Hand);
        gameRef.child("pl2").child("hand").set(pl2Hand);
        gameRef.child("pl3").child("hand").set(pl3Hand);

        gameRef.child("turn").set(getRandomInt(0, 4));
        
        gameRef.child("start").set(true);
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

    function gameEndHandler() {

    }

}());