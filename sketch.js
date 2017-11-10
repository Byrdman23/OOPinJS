var bubbles = [];
var enemy = [];
var totalPts = 0;
var clockcounter = 10;
var gameState = "title"
var bubblePopSound = new Audio("Pop.mp3");
var wining = new Audio("Wining.mp3");
var losing = new Audio("Losing.mp3");

function setup() {
	
	createCanvas(600, 400);
	setInterval(clockTick, 1000);
	for (var i = 0; i < 40; i++){
		var x = random(width);
		var y = random(height);
		var r = random(10, 50);
		var b = new Bubble(x, y, r);
		bubbles.push(b);	
	}
}

function draw() { 
	background(0);
	
	if(gameState =="title"){
	titleScreen();
	}
	
	if(gameState=="InGame"){
		Game();
	}
	
	if(gameState=="Lose"){
		Lose();
	}
	if(gameState=="Win"){
		Win();
	}
}




























function Lose(){
	losing.play();
	textSize(30)
	textAlign(CENTER);
	
	fill("red");
	stroke("white");
	strokeWeight(4);
	text("GAME OVER", width/2, height/2);
	
	
}
function Win(){
	wining.play();
	textSize(30)
	textAlign(CENTER);
	fill("red");
	stroke("white");
	strokeWeight(4);
	text("YOU WIN", width/2, height/2);
	
}


function clockTick(){
	if(gameState=="InGame" && clockcounter > 0){
		clockcounter=clockcounter-1;
	}
}
function mousePressed(){
	if(gameState=="title"){
		gameState = "InGame";
	}
	if(gameState=="Lose"){
		gameState="title";
	}
	if(gameState=="Win"){
		gameState="title";
	}
}

function titleScreen(){
	textSize(30)
	textAlign(CENTER);
	fill("red");
	stroke("white");
	strokeWeight(4);
	text("Click anywhere to start", width/2, height/2);
}
function Game(){
	drawCounter();
	triangle(600, 300, 540, 100, 310, 80);
	
			for (var i = 0; i < bubbles.length; i++){
			if(bubbles[i].contains(mouseX, mouseY)){
				bubbles[i].changeColor(255);
				}
			else{
				bubbles[i].changeColor(0);
			}
		bubbles[i].move();
		bubbles[i].show();
		}
		
		
		if(clockcounter<=0){
			restart();
		}
		
}
function restart(){
	
	if(totalPts >= 30){
		gameState="Win";
	}
	else{
		gameState="Lose";
	}
	bubbles = [];
	totalPts = 0;
	clockcounter = 10;
	setup();
	
	
}		

function mouseClicked(){
		for (var i = bubbles.length-1; i >= 0; i--){
			if(bubbles[i].contains(mouseX, mouseY)){
				bubbles.splice(i,1);
				bubblePopSound.play();
				totalPts++;
		}
	}
}

function drawCounter(){
	stroke("white");
	strokeWeight(0);
	textAlign(LEFT);
	textSize(32);
	text("Score: "+totalPts, 10, 30);
	fill(0, 102, 153);
	textSize(32);
	text("Timer: "+clockcounter, 10, 70);
	fill(0, 102, 153);
	
	
}


class Bubble {
	constructor(x, y, r){
		this.x = x;
		this.y = y;
		this.r = r;
		this.brightness = 0;
	}
	
	changeColor(bright){
		this.brightness = bright;
	}
	
	contains (px, py){
		var d = dist(px, py, this.x, this.y);
		if (d < this.r){
			return true;
		}
		else{
			return false;
		}
			
		
	}
		
	move() {
		this.x = this.x + random(-2, 2);
        this.y = this.y + random(-2, 2);		
	}
	
	show() {
		stroke(255);
		strokeWeight(4);
		fill(this.brightness, 125);
		ellipse(this.x, this.y, this.r * 2, this.r);
	}
}