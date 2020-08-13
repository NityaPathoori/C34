var ball;
var database;

function setup(){
    createCanvas(500,500);

    database = firebase.database();
    var databaseRef = database.ref("ball/position");
    databaseRef.on("value",readData,errorData);

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    var databaseRef = database.ref("ball/position");
    databaseRef.set({
    x: ball.x + x,
    y: ball.y + y
    })
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readData(data) {
    var Position = data.val();
    ball.x = Position.x;
    ball.y = Position.y;
}

function errorData() {
    console.log("error in reading data")
}
