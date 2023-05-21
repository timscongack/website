//Final Game Project - Tim Scongack - IP1
/* 
Description: 
Code extensions include: 
	-Constructor function for enemies
	-Constructor function for platforms
	-Sound added to the game, included background music, berry collection, sound for falling, sound for enemy death, and jumping
		-if preload fails (file too big) music load attempts on next button press
	-functions that translate the character left and right dynamically using a -1 or 1 input, reducing the total character functions needed, including re-usable bear head for icons
	-Home tree function instead of flagpole that dynamically adds the items collected to the hometree for each item collected
	-Added more varables to trees in order to use as hometree function, also made objects/functions for drawing collectables to allow modification
	-Added variables for character control and isJumping
What was difficult:
	-Making items more dynamic - the bear/character was one of the first major items I added and my knowledge was fairly limited
	-Having a mental model on how the loops worked and components interacted was difficult
	-Gravity, jumping, plummeting and cliff boundaries
	-Deciding on what to make 'dynamic' or what to put into functions/objects; make some things dynamic that didn't need to be (mountains) and in other cases had to rewrite items that really needed to be properly structure (tree, berries/collectables). In the future to shorten my code I'd remake everything with constructors and use more arrays vs. dictionaries.
	-Constructor functions - understanding in depth how they worked took some time and troubleshooting
Skills:
	-Javascript
	-Proper programming techniques, functions, objects, and most importantly factory patterns/constructors
	-Debugging, specifically towards the end I could identify and isolate errors in my program much faster
	-"Non Destructive Editing" - one lecture outlined to comment out code and copy it. At the beginning I was doing a lot of 'ctrl-z' - this lesson really helped me and allowed me to have to mental space to properly debug without worrying about losing track where I was
	-Creativity - this course really inspires me to be more artistic. I drew tons of sketches of ideas and artwork I want to create after this course is completed
References:
	-Used this tutorial to draw a fractal tree - using it as the main enemy in the game	https://www.youtube.com/watch?v=0jjeOYMjmDU
	-Sound assets: https://soundeffects.fandom.com/wiki/GoldenEye_007 and https://freesound.org/browse/tags/game-sound/ Music by: Kevin MacLeod (no copyright) Investigations https://www.youtube.com/watch?v=-niWCxOoH2E
 */
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var clouds;
var mountains;
var trees_x;
var isPlummeting;
var isFalling;
var isJumping;
var x_pos;
var y_pos;
var size;
var jumpVelocity;
var gravity;
var isDefault;
var gravity = 5
var jumpVelocity = 20
var game_score;
var homeTree;
var bearFamily;
var lives;
var platforms;
var enemies; 
var level;
var foliage;
var foliageColour;
var foliageSize;
var foliageColourHomeTree;
var foliageSizeHomeTree;
var canyonFallPos;

//Adding in Sounds
var jumpSound;
var gameMusic;
var musicStart;
var bearsweepSound;
var eatSound;
var fallSound;

//jump factor determines the pixel distance of the jump and character speed
var jump_factor_y = 100;
var charSpeed = 6;

//body part positioning allows dynamic modification of the side-bear positioning
var bearTailPos = 12;
var bearHeadPos = bearTailPos -22;
var eyePos = 6;
var nosePos = 8;

//preload files - sound in this case
function preload()
{
    soundFormats('mp3','wav');
    //load your sounds here
    jumpSound = loadSound('assets/jump.wav');
    jumpSound.setVolume(0.08);
	bearsweepSound = loadSound('assets/punch_air.wav');
    bearsweepSound.setVolume(0.08);
	eatSound = loadSound('assets/eat.mp3');
    eatSound.setVolume(0.08);
	fallSound = loadSound('assets/fall.wav');
    fallSound.setVolume(0.08);
	gameMusic = loadSound('assets/Investigations.mp3');
	gameMusic.setVolume(0.1);
	//music start
	musicStart = false;
}

function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	lives = 3
	startGame()
	
}

function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isPlummeting = false;
	isFalling = false;
	isJumping = false;
	isJumpPress = false;
	isDefault =true;


	// Initialise arrays of scenery objects.
	trees_x = [100,300,1650,1000,1850]
	trees_y = height/2;
	
	foliage = [{x:20,y:0},{x:-10,y:10},{x:70,y:10},{x:45,y:40},{x:15,y:40}]
	foliageSize = {w:85,h:75}
	foliageColour = color(1143,188,143)
	
	foliageSizeHomeTree = {w:100,h:90}
	foliageColourHomeTree = color(200,120,143)
	
	canyon = [
		{x_pos:-100 ,y_pos: floorPos_y-32},
		{x_pos:0 ,y_pos: floorPos_y-32},
		{x_pos:750 ,y_pos: floorPos_y-32},
		{x_pos:600 ,y_pos: floorPos_y-32},
		{x_pos:600 ,y_pos: floorPos_y-32},
		{x_pos:600 ,y_pos: floorPos_y-32},
		{x_pos:1500 ,y_pos: floorPos_y-32},
		{x_pos:1700 ,y_pos: floorPos_y-32}
	];

	platforms = [];

	for(var i = 0; i < 5; i++)
	{

	platforms.push(
				createPlatforms(700,floorPos_y-60,50),
				createPlatforms(700,floorPos_y-150,75),
				createPlatforms(1000,floorPos_y-50,20),
				createPlatforms(1050,floorPos_y-100,20),
				createPlatforms(1560,floorPos_y-50,20),
				createPlatforms(1600,floorPos_y-100,100),
				createPlatforms(1700,floorPos_y-150,100),);
	}

	cloud_x = [250,375,600,900]
	cloud_y = 50

	mountain_x = [90,900,2000]
	mountain_y = 432

	collectable = [
		{x_pos:0 ,y_pos: floorPos_y,size:50,isFound:false},
		{x_pos:100 ,y_pos: floorPos_y,size:50,isFound:false},
		{x_pos:750 ,y_pos: floorPos_y-160,size:50,isFound:false},
		{x_pos:720 ,y_pos: floorPos_y-67,size:45,isFound:false},
		{x_pos:1080 ,y_pos: floorPos_y-170,size:45,isFound:false},
		{x_pos:1000 ,y_pos: floorPos_y,size:45,isFound:false},
		{x_pos:1000 ,y_pos: floorPos_y,size:45,isFound:false},
		{x_pos:1100 ,y_pos: floorPos_y,size:52,isFound:false},
		{x_pos:1680 ,y_pos: floorPos_y,size:52,isFound:false},
		{x_pos:1680 ,y_pos: floorPos_y-160,size:30,isFound:false},
		{x_pos:600 ,y_pos: floorPos_y,size:30,isFound:false}
	];
	game_score = 0
	homeTree = {isReached: false, x_pos: 2300}
	//To shorten tree iterator this variable is used
	homeTreeXPosIterator = [homeTree.x_pos]
	canyonFallPos = 0

	enemies = []

	//Add in enemies this uses a factory pattern and calls the function and its interaction for each enemy added and pushes to array
	for(var i = 0; i < 3; i++)
	{
	enemies.push(new enemy(175,floorPos_y,100),
				 new enemy(1200,floorPos_y,50))
//	             ,new enemy(1850,floorPos_y,10)) removed to make easier for marker
				 break

	}
}
function draw()
{
	background(95, 80, 132); //fill the sky color

	noStroke();
	fill(150,250,200);
	rect(0, floorPos_y, width, height/4); // draw some ground

	push();
	translate(scrollPos,0);

	//Draw Clouds
	drawClouds();
	
	//Draw Mountains
	drawMountains();
	
	//Draw Trees
	drawTrees(trees_x,trees_y,foliage,foliageSize,foliageColour);

	// Draw canyons.
	for (var i = 0; i < canyon.length; i++)
	{
		checkCanyon(canyon[i]);
		drawCanyon(canyon[i]);
	}

	// Draw collectable items and check
	for (var i = 0; i < collectable.length; i++)
	{
		if(collectable[i].isFound == false)
		{
			checkCollectable(collectable[i]);
			drawCollectable(collectable[i]);
		}
	}
	//Draw Platforms
	for(var i = 0; i < platforms.length; i++)
	{
		platforms[i].draw()
	}
	//Draw Home Tree
	renderHomeTree();
	//Draw Enemies
	for(var i = 0; i < enemies.length; i++)
	{
		enemies[i].draw();
		var isContact = enemies[i].checkContact(gameChar_world_x,gameChar_y)
		if(isContact == true)
		{
			bearsweepSound.play()
			if(lives > 0)
			{				
				lives -= 1
				startGame();
				break;
			}
		}
	}
	pop();

	// Draw game character.
	drawGameChar();
	fill(255);
	noStroke();
	textSize(12)
	text("Noms: " + game_score, 40,20);

function livesIcon()
	{
	//Draw lives icon
	for (var i = 0;i < lives; i++)
		{
		head_yPos = 60
		headOffset = 25 * i
		head_xPos = 90 + headOffset
		bearHead(head_xPos,head_yPos,0)
		}
	}
	textSize(12)
	text("Lives: ",40,40);
	livesIcon()	
	
	// Logic to make the game character rise and fall
	if(gameChar_y < floorPos_y)
	{
		var isContact = false;
		for(var i = 0; i < platforms.length; i++)
		{
			if(platforms[i].checkContact(gameChar_world_x, gameChar_y) == true)
			{
				isContact = true;
				isFalling = false;
				break;
			};
		}
		if(isContact == false)
		{
 		isFalling = true;
		}
	}
	else
	{
		isFalling = false;
	}

	// Logic to make the game character move or the background scroll and rise and fall logic
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed()
{
	// if statements to control the animation of the character when
	// keys are pressed.
	if(homeTree.isReached == true && (keyCode == 32 || keyCode == 87))
	{
		startGame()
		lives = 3
	}	
	if(musicStart == false && game_score == 0)
	{
		try {
		gameMusic.loop();
		musicStart = true;
		}
		catch(err)
		{
			console.log('Music did not load in time, will load at next key press')
		}
	}

	if((key == 'A' || keyCode == 37) && homeTree.isReached == false && lives >0)
	{
		isLeft = true;
	}
	if((key == 'D' || keyCode == 39) && homeTree.isReached == false && lives >0)
	{
		isRight = true;
	}
	if((keyCode == 32 || keyCode == 87) && lives > 0 && isPlummeting == false && isFalling == false)
	{
		jumpSound.play();
		isJumping  = true
	}
	else if((keyCode == 32 || keyCode == 87) && lives == 0)
	{
		startGame()
		lives = 3
	}
}
function keyReleased()
{
	// if statements to control the animation of the character when
	// keys are released.

	if(keyCode == 37 || keyCode == 65)
	if(key == 'A' || keyCode == 37)
	{
		isLeft = false;
	}

	if(key == 'D' || keyCode == 39)
	{
		isRight = false;
	}
	
	else if(keyCode == 32 || keyCode == 87)
	{
		isJumping = false
		isJumpPress = false
	 }
}
// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

//draw bear head
function bearHead(x,y,color)
{
			strokeWeight(1);
			//ears
			fill(100); stroke(100); ellipse(x-7,y-30,5,5); ellipse(x+7,y-30,5,5);	
			//head 
			fill(240); stroke(230);	ellipse(x,y-25,15,15)
			//nose
			stroke(255); fill(100); ellipse(x,y-25,6,6);
			//eyes + heavier outline
			stroke(color); strokeWeight(2); point(x+3,y-28);point(x-3,y-28);	
}
//draw bear front
function bearfront(gameChar_x,gameChar_y,color)                                                                                                             
{
	//bear forward
	fill(240); stroke(230);
	//legs
	rect(gameChar_x+4,gameChar_y+1,8,-16); rect(gameChar_x-12,gameChar_y+1,8,-16)
	//shoulder
	arc(gameChar_x, gameChar_y-13, 24, 20, PI, 0, CHORD); 
	fill(200); 	rect(gameChar_x-5,gameChar_y+1,10,-16); 
	fill(240); 	triangle(gameChar_x-5, gameChar_y-13,gameChar_x+5, gameChar_y-13,gameChar_x, gameChar_y);6
	fill(100); 	
	//call bear head
	bearHead(gameChar_x,gameChar_y,color)	
}

function drawGameChar()
{

			if(isJumping == true && ((isLeft && isFalling ==true) || (isRight && isFalling == true) || isDefault == true)) 
			{
				isFalling = true;
				isJumping = false;
				gameChar_y += gravity;
				gameChar_y = max(gameChar_y - jump_factor_y);
			}		
			if(gameChar_y < floorPos_y && ((isLeft && isFalling == true) || (isRight && isFalling == true) || isFalling == true))
			{
			 	gameChar_y += gravity;
			}
	
	pop();
		//Check Home Tree Function
		function checkHomeTree()
		{
			var distance = abs(gameChar_world_x - homeTree.x_pos);
			if(distance < 25)
			{
				homeTree.isReached = true
			}
		}
		function checkPlayerDie()
		{
			if(gameChar_y > 550 && lives > 0)
			{
				lives -= 1
				fallSound.play()
				startGame()
			}
		}

	function bearside(gameChar_x,gameChar_y,bearHeadPos,bearTailPos,jump_factor_y,eyePos,nosePos)
	{
		//bear side
		//ear
		fill(100);	 stroke(100);   ellipse(gameChar_x-0+bearHeadPos,gameChar_y-29-jump_factor_y,5,5);
		//legs
		fill(240);   stroke(230);   rect(gameChar_x+4,gameChar_y+1-jump_factor_y,8,-16);   rect(gameChar_x-12,gameChar_y+1-jump_factor_y,8,-16)
		//body
		arc(gameChar_x, gameChar_y-13-jump_factor_y, 24, 20, 0, 0, CHORD);
		//side head
		ellipse(gameChar_x+bearHeadPos,gameChar_y-25-jump_factor_y,15,15)
		//ear
		fill(100);   stroke(100);   ellipse(gameChar_x-0+bearHeadPos,gameChar_y-30-jump_factor_y,5,5);
		//nose
		fill(100);	 stroke(240);   strokeWeight(1);   stroke(255);   ellipse(gameChar_x+bearHeadPos-nosePos,gameChar_y-24-jump_factor_y,6,6);
		//tail
		stroke(255);  ellipse(gameChar_x+bearTailPos,gameChar_y-19-jump_factor_y,6,6);
		//eyes + heavier outline
		stroke(0);	strokeWeight(2);   point(gameChar_x+bearHeadPos-eyePos,gameChar_y-28-jump_factor_y);
	}

	if(isLeft && isFalling)
	{
		// add your jumping-left code
		//calls bear side with inverted position for right facing (inverts by modifying the positions with a negative 1 multiplier) + jump
		bearside(gameChar_x,gameChar_y+jump_factor_y,bearHeadPos,bearTailPos,jump_factor_y,eyePos,nosePos)

	}
	else if(isRight && isFalling)
	{
		//calls bear side default (right) position +jump
		bearside(gameChar_x,gameChar_y+jump_factor_y,bearHeadPos*-1,bearTailPos*-1,jump_factor_y,eyePos*-1,nosePos*-1)

	}
	else if(isLeft)
	{
		// add your walking left code
		//calls bear side with default (left params)
		bearside(gameChar_x,gameChar_y,bearHeadPos,bearTailPos,0,eyePos,nosePos)

	 }
	else if(isRight)
	{
		// add your walking right code
		//calls bear side with inverted position for right facing (inverts by modifying the positions with a negative 1 multiplier)
		bearside(gameChar_x,gameChar_y ,bearHeadPos*-1,bearTailPos*-1,0,eyePos*-1,nosePos*-1)

	}
	else if(isPlummeting)
	{
		gameChar_y += 10
		bearfront(gameChar_x,gameChar_y,0)
	}	
	else
	{
		//calls bearfront and assigns key variables
		bearfront(gameChar_x,gameChar_y,0)
	}
	if(homeTree.isReached == false)
		{
		checkHomeTree();
		}
		checkPlayerDie()

	if(lives == 0)
	{
		fill(255);
		noStroke();
		textSize(50)
		text("Game Over", (width/2)-50,height/2);
		textSize(20)
		text("Press Space to Continue", (width/2)-30,(height/2)+30);
		return;
	}
	else if(homeTree.isReached == true)
	{
		fill(255);   noStroke();
		textSize(30)
		text("Home Tree Reached with "+game_score+" Berries to Eat", (width/2)-175,height/2);
		textSize(20)
		text("Press Space to Continue", (width/2)-30,(height/2)+30);
		return;
	}	
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds()
{
	// Draw clouds.
			for (var i = 0; i < cloud_x.length; i++)
			{	     
			fill(255,255,255)
			ellipse(cloud_x[i],cloud_y,50)
			ellipse(cloud_x[i]+35,cloud_y,65)
			ellipse(cloud_x[i]+70,cloud_y,50)
			}
}
// Function to draw mountains objects.
function drawMountains()
{
	// Draw mountains.
			for (var i = 0; i < mountain_x.length; i++)
			{	
			fill(220)
			noStroke();
			triangle(mountain_x[i], mountain_y, 
					mountain_x[i]+400,mountain_y, 
					mountain_x[i]+200,mountain_y - 300);
			fill(200)
			noStroke();
			triangle(mountain_x[i]+100, mountain_y, 
					mountain_x[i]+486,mountain_y, 
					mountain_x[i]+350,mountain_y - 350);
			}
}
// Function to draw trees objects.
function drawTrees(x,y,foliage,size,colour)
{
	// Draw trees.
			for (var i = 0; i < x.length; i++)
			{	
			fill(94,40,36);
			rect(x[i]+10, y+32, 40, 112); // stem			
				for (var j = 0; j < foliage.length; j++)
				{
					fill(colour);
					noStroke;
					ellipse(x[i]+foliage[j].x,y+foliage[j].y,size.w,size.h);
				}
			}
}
// ---------------------------------
// Canyon render and check functions
// ---------------------------------
function drawCanyon(t_canyon)
{	
	canyon_width = 75
	canyon_height = 200
	canyon_edge = 5
	canyon_start = t_canyon.x_pos + canyon_edge
	canyon_end = t_canyon.x_pos + (canyon_width - canyon_edge)
	
	//canyon start
	fill(200); // grey
	rect(t_canyon.x_pos+10, t_canyon.y_pos+32, canyon_edge, canyon_height); // edge1

	fill(95, 80, 132); // sky
	rect(t_canyon.x_pos+15, t_canyon.y_pos+32, canyon_width, canyon_height); // hole

	fill(200); // grey
	rect(t_canyon.x_pos+90, t_canyon.y_pos+32, canyon_edge, canyon_height); // edge2
}

// Function to check character is over a canyon.
function checkCanyon(t_canyon)
{
		//Falls down canyon
		if(gameChar_world_x > t_canyon.x_pos+20 && gameChar_world_x < t_canyon.x_pos+75 && gameChar_y == floorPos_y )
		{
			isPlummeting = true
			isLeft = false
			isRight = false
		}
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

function drawCollectable(t_collectable)
{
	fill(199,21,133)
	stroke(255, 204, 0);
	strokeWeight(1+(t_collectable.size/100));
	berryClusterX = [-2.5,7.5,2.5,0,5,2.5]
	berryClusterY = [-4,-4,-4,0,0,4]
	for (var i = 0; i < berryClusterX.length; i++)
	{
		ellipse(t_collectable.x_pos-berryClusterX[i],t_collectable.y_pos+berryClusterY[i],t_collectable.size-40)
	}
}
// Function to check character has collected an item.
function checkCollectable(t_collectable)
{
	//Collects berry is within 20 pixels
	if(dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20)
	{
		t_collectable.isFound = true
		eatSound.play()
		game_score += 1
	}
}
// ----------------------------------
// Hometree render and check functions
// ----------------------------------
function renderHomeTree()
{
	push();
		noStroke();
		drawTrees(homeTreeXPosIterator,trees_y,foliage,foliageSizeHomeTree,foliageColourHomeTree);
		if(homeTree.isReached)
		//checks if the hometree is reached and iterated through the number of berries collected and places them in the tree.
		{					
				for (var i = 0; i < game_score; i++)
				{					
				home_berries = [{x_pos: (i*15) + homeTree.x_pos-40,y_pos: 300,size:45,isFound: false}]
				drawCollectable(home_berries[0])
				}
		}				
	pop();
}
// ----------------------------------
// Platform factory patterns
// ----------------------------------
function createPlatforms(x,y,length)
{
	var p = {
		x: x,
		y: y,
		length: length,
		draw: function(){	
			stroke(240,240,240,150);
			fill(173, 216, 230,150);
			rect(this.x,this.y,this.length, 10);
		},
		checkContact: function(gc_x,gc_y)
		{
			if(gc_x > this.x && gc_x < this.x + this.length)
			{
				var d = this.y - gc_y;
				if(d >= 0 && d < 5) 
				{
				return true;
				}
			}
			return false;
		}
	}
	return p;
}
// ----------------------------------
// Enemies constructor function - other bears
// ----------------------------------
function enemy(x,y,range)
{
	this.x = x;
	this.y = y;
	this.range = range;
	this.currentX = x;
	this.inc = 1;
	this.update = function()
		{
			this.currentX  += this.inc;

			if(this.currentX >= this.x + this.range)
			{
				this.inc = -1;
			}
			else if(this.currentX < this.x)
			{
				this.inc = 1;
			}
		}
	this.draw = function()
	{
		this.update();
			bearfront(this.currentX,this.y,[123,104,238])
	}
	this.checkContact = function(gc_x,gc_y)
	{
		var d = dist(gc_x, gc_y, this.currentX,this.y)
		if(d < 35)
			{
				return true;
			}
			return false;
	}
}