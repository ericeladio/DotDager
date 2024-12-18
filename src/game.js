 "use strict"

//! TELEGRAM INTERACTION VARIABLES(still not implemented)
let userId; 
let chatId;
let messageId;
// end of telegram interaction variables

//! COLORS
const WHITE = "rgb(255, 255, 255)";
const BLACK = "rgb(0, 0, 0)";
const RED = "rgb(255, 0, 0)";
const GREEN = "rgb(0, 255, 0)";
const BROWN = "rgb(139, 69, 19)";
const BRICK_RED = "rgba(128, 29, 12, 0.8)";
const BRICK_RED_TRANSPARENT = "rgba(128, 29, 12, 0.5)";

//! MEDIA VARIABLES
// Sounds
let chopSound = new Audio("/DotDager/sounds/Chop_Log_Sound.mp3");
chopSound.volume = 0.7;
let pauseSound = new Audio("/DotDager/sounds/Pause_Sound.mp3");
pauseSound.volume = 0.3;
// Sprites
let manSprite = new Image();
manSprite.src = "/DotDager/sprites/man.png";
let flippedManSprite = new Image();
flippedManSprite.src = "/DotDager/sprites/flipped_man.png";
let background = new Image();
background.src = "/DotDager/images/background.png";
let sBranch = new Image();
sBranch.src = "/DotDager/sprites/branch.png";
let sFlippedBranch = new Image();
sFlippedBranch.src = "/DotDager/sprites/branch_flipped.png";
let iTrunk = new Image();
iTrunk.src = "/DotDager/images/trunk.png";
// Fonts
let pixelFont = new FontFace('PixelFont', 'url(/DotDager/fonts/PixelEmulator-xq08.ttf)');
document.fonts.add(pixelFont);


//! GAME CONSTANTS
// Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
// Canvas dimensions
canvas.width = 608;
canvas.height = 1080;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
// Player dimensions
const PLAYER_HEIGHT = HEIGHT / 4;
const PLAYER_WIDTH = PLAYER_HEIGHT * (383 / 521); //TODO hardcoded ratio, to be changed if using another image
// Tree dimensions
const TREE_WIDTH = WIDTH / 5;
// Branch dimensions
const BRANCH_HEIGHT = PLAYER_HEIGHT / 2;
const BRANCH_WIDTH = WIDTH / 2.5;
// Timer
const HARD_MAX_TIMER = 5;
// Number of branches
const NUM_BRANCHES = Math.floor((HEIGHT - PLAYER_HEIGHT) / BRANCH_HEIGHT);
// Player positions
const P_LEFT = WIDTH / 2 - TREE_WIDTH / 2 - PLAYER_WIDTH / 2
const P_RIGHT = WIDTH / 2 + TREE_WIDTH / 2 + PLAYER_WIDTH / 2
// Physics
const TREE_SLIDING_SPEED = 700; // pixels per second
const GRAVITY = 400; // pixels per second squared
const FADING_BRANCH_SPEED = 1; // alpha per second
const AXE_IMPULSE = 200; // pixels per second
const BRANCH_ANGULAR_VELOCITY = 0.5; // radians per second
// Pause button variables
const PAUSE_BUTTON_X = WIDTH - 100;
const PAUSE_BUTTON_Y = 10;
const PAUSE_BUTTON_WIDTH = 90;
const PAUSE_BUTTON_HEIGHT = 38;

//! GAME VARIABLES
// Time
let start = Date.now();
let current = start;
let delta = 0;
// Game variables
let score = 0;
let max_score = 0;
let max_timer = HARD_MAX_TIMER;
let timer = max_timer / 2;
let game_started = false;
let game_over = false;
let game_paused = false;
let tree_y = 0;
let is_tree_sliding = false;
let prev_target_height = 0;
// Player position
let player_x = P_RIGHT;
let player_y = HEIGHT - PLAYER_HEIGHT;

//! DATA STRUCTURES
let branches = [];
let falling_branches = [];


//////////////////////////////////////////////////
//! Input handling functions (Event listeners defined at the end of the file)
//////////////////////////////////////////////////
//#region Input handling functions
function handleKeyDown(event) {
    if (!game_started && !game_over && !game_paused) {
        if (event.code === 'Space') {
            startGame();
        }
    } else if (game_started && !game_over && !game_paused) {
        if (event.code === 'Space') {
            pauseGame();
        }
        if (event.code === 'ArrowLeft') {
            movePlayer('left');
        } else if (event.code === 'ArrowRight') {
            movePlayer('right');
        }
    } else if (game_paused) {
        if (event.code === 'Space') {
            resumeGame();
        }
    } else if (game_over) {
        if (event.code === 'Space') {
            restartGame();
        }
    }
}

function handleMouseDown(event) {
    if (!game_started && !game_over && !game_paused) {
        startGame();
    } else if (game_over){
        restartGame();
    } else if (game_paused) {
        resumeGame();
    }
    else {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        //! DEBUG
        //console.log ("Pressed in " + x + " " + y + " position");
        //console.log ("Pause Button is in " + PAUSE_BUTTON_X + " " + PAUSE_BUTTON_Y + " position");
        //console.log ("Pause Button in check should be in " + PAUSE_BUTTON_X / 2  + " " + PAUSE_BUTTON_Y + " position");

        // TODO Works in mobile, but not in Desktop
        if (x >= PAUSE_BUTTON_X && x <= PAUSE_BUTTON_X + PAUSE_BUTTON_WIDTH && y >= PAUSE_BUTTON_Y && y <= PAUSE_BUTTON_Y + PAUSE_BUTTON_HEIGHT) {
            pauseGame();
        }
        else {
            movePlayer(x < WIDTH / 2 ? 'left' : 'right');
        }
    }
}

// TODO Needs to be adjusted and studied
function handleMouseOver(event) {
    if(game_started) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if(x >= PAUSE_BUTTON_X / 2 && x <= PAUSE_BUTTON_X / 2 + PAUSE_BUTTON_WIDTH && y >= PAUSE_BUTTON_Y && y <= PAUSE_BUTTON_Y + PAUSE_BUTTON_HEIGHT) {
            canvas.style.cursor = "pointer";
        }
    }
    else {
        canvas.style.cursor = "default";
    }
}

//#endregion
//////////////////////////////////////////////////
//! Game states functions
//////////////////////////////////////////////////
//#region Game states functions
function pauseGame() {
    game_paused = true;
    game_started = false;

    pauseSound.play();
}

function resumeGame() {
    game_paused = false;
    game_started = true;

    pauseSound.play();
}

function startGame() {
    game_started = true;
    score = 0;
}

function restartGame() {
    game_started = true;
    game_over = false;
    max_timer = HARD_MAX_TIMER;
    timer = max_timer / 2;
    tree_y = 0;
    score = 0;
    tree_y = 0;
    is_tree_sliding = false;
    prev_target_height = 0;
    player_x = P_RIGHT;
    branches = [];
    falling_branches = [];
    generate_first_branches();
}

//#endregion
//////////////////////////////////////////////////
//! Controls Functions
//////////////////////////////////////////////////
//#region Controls Functions
function movePlayer(direction) {
    player_x = (direction === 'left' ? P_LEFT : direction === 'right' ? P_RIGHT : player_x);

	if ((branches[branches.length - 1].side === "left" && direction === "left") ||
		(branches[branches.length - 1].side === "right" && direction === "right")) {
		game_over = true;
	}
	moveBranchesDown();
    score++;
	applyImpulseToLastFallingBranch();
    chopSound.cloneNode().play();

	// Update record
    if (max_score < score) {
		max_score = score;
	}

    // Game time management
    let inverseProportionalToTimer = max_timer / timer * 0.4; // valore compreso tra 1 e max_timer(per timer maggiore o uguale a 1), poi diviso per 2
    let percentageInverseProportionalToTimer = inverseProportionalToTimer / max_timer; // percentuale compresa tra 0 e 1(per timer maggiore o uguale a 1)
    addTime(percentageInverseProportionalToTimer);
}
//#endregion
//////////////////////////////////////////////////
//! Game Logic functions
//////////////////////////////////////////////////
//#region Game Logic functions
function generate_branch(type = null) {
    const sides = ["left", "right", "none"];
    const side = type ? type : sides[Math.floor(Math.random() * sides.length)];
	let x_val;
	if (side === "left") {
		x_val = WIDTH / 2 - TREE_WIDTH / 2 - BRANCH_WIDTH;
	}
	else if (side === "right") {
		x_val = WIDTH / 2 + TREE_WIDTH / 2;
	}
    return { side: side,
		y: -prev_target_height , x: x_val,
		angle: 0, angular_velocity: (Math.random() * BRANCH_ANGULAR_VELOCITY - BRANCH_ANGULAR_VELOCITY / 2),
		velocity: 0, hvelocity: 0,
		alpha: 1, };
}

function generate_first_branches() {
    for (let i = -1; i < NUM_BRANCHES - 1; i++) {
        branches.push(generate_branch());
        branches[branches.length - 1].y = (i + 1) * BRANCH_HEIGHT;
    }
}

function addTime(percentage) {
    if (timer + percentage * max_timer >= max_timer) {
        timer = max_timer;
    }
    else {
        timer += percentage * max_timer;
    }
}

// TODO fix this thing when prev_target_height is < 0. It is there the problem
function moveBranchesDown() {
    if (is_tree_sliding && prev_target_height != 0) {
        // let modulo = branches[0].y % BRANCH_HEIGHT;
        branches.forEach(branch => branch.y += prev_target_height);
        tree_y += prev_target_height;
        if (tree_y > HEIGHT / 2) {
            tree_y -= HEIGHT / 2;
        }
    }
    if (!is_tree_sliding && prev_target_height <= 0) {
        is_tree_sliding = true;
    }
    prev_target_height = BRANCH_HEIGHT;
    pop_push_new_branch();
}

function pop_push_new_branch() {
    let falling_branch = branches.pop();
    falling_branch["velocity"] = 0;
    falling_branch["alpha"] = 1;
    falling_branches.push(falling_branch);
    branches.unshift(generate_branch());
}

function computePhysicsFallingBranches() {
    falling_branches.forEach(function(branch) {
        branch.y += delta / 1000 * branch.velocity;
		branch.x += delta / 1000 * branch.hvelocity;
        branch.alpha -= delta / 1000 * FADING_BRANCH_SPEED;
		branch.alpha = branch.alpha < 0 ? 0 : branch.alpha;
        branch.velocity += delta / 1000 * GRAVITY;
		branch.angle += delta / 1000 * branch.angular_velocity;
        if (branch.y >= HEIGHT) {
            falling_branches.splice(falling_branches.indexOf(branch), 1);
        }
    });
}

function applyImpulseToLastFallingBranch() {
	let last = falling_branches.length - 1;
	let branch = falling_branches[last];
	let abs_velocity = AXE_IMPULSE + (Math.random() * 200 - 100);//parentheses for readability

	if (branch.side === "left") {
		branch.hvelocity = -abs_velocity;
	} else if (branch.side === "right") {
		branch.hvelocity = abs_velocity;
	}
}

//#endregion
//////////////////////////////////////////////////
//! FPS calculation functions
//////////////////////////////////////////////////
//#region FPS calculation functions
function update() {
    if (game_started && !game_over) {
        // Updates the timer
        timer -=  delta / 1000;
        if (timer <= 0) {
            game_over = true;
        }

        computePhysicsFallingBranches();

        // Updates max timer value
        max_timer = Math.max(HARD_MAX_TIMER - score * 0.02, 0.5);
        
        //TODO check if this if condition then is needed
        if (prev_target_height <= 0) {
            // tree_y += prev_target_height;
            // // if (tree_y <= HEIGHT / 2) {
            // //     tree_y += HEIGHT / 2;
            // // }
            // branches.forEach(branch => branch.y += prev_target_height);
            // prev_target_height = 0;
            is_tree_sliding = false;
        }
        if (is_tree_sliding) {
            tree_y += delta / 1000 * TREE_SLIDING_SPEED;
            if (tree_y > HEIGHT / 2) {
                tree_y -= HEIGHT / 2;
            }
            branches.forEach(branch => branch.y += delta / 1000 * TREE_SLIDING_SPEED);
            prev_target_height -= delta / 1000 * TREE_SLIDING_SPEED;
        }
    }
}
//#endregion
//////////////////////////////////////////////////
//! Drawing functions (drawing game scene and interface)
//////////////////////////////////////////////////
//#region Drawing functions
// thanks to https://stackoverflow.com/questions/3793397/html5-canvas-drawimage-with-at-an-angle second answer
// rotate 45º image "imgSprite", based on its rotation axis located at x=20,y=30 and draw it on context "ctx" of the canvas on coordinates x=200,y=100
function rotateAndPaintImage ( context, image, angleInRad , positionX, positionY, width, height ) {
	context.translate( positionX, positionY );
	context.rotate( angleInRad );
	context.drawImage( image, 0, 0, width, height);
	context.rotate( -angleInRad );
	context.translate( -positionX, -positionY );
}

function draw() {
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;
    ctx.fillStyle = WHITE;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.font = screen.width < 1024 ? "20px PixelFont" : "36px PixelFont";

    if (!game_started && !game_paused) {
        ctx.fillStyle = BLACK;
        ctx.textAlign = "center";
        ctx.fillText("Press to start", WIDTH / 2, HEIGHT / 2);
    } else if (game_over) {
        /*
        ctx.fillStyle = BLACK;
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", WIDTH / 2, HEIGHT / 2);
        ctx.fillText(`Punteggio: ${score}`, WIDTH / 2, HEIGHT / 2 + 40);
        ctx.fillText(`Record: ${max_score}`, WIDTH / 2, HEIGHT / 2 + 80);
        ctx.fillText("Premi per ricominciare", WIDTH / 2, HEIGHT / 2 + 120);
        */
        draw_scene();
        ctx.fillStyle = BRICK_RED_TRANSPARENT;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = WHITE;
        ctx.textAlign = "center";
        ctx.fillText("Game Over!", WIDTH / 2, HEIGHT / 2);
        ctx.fillText(`Scored: ${score}`, WIDTH / 2, HEIGHT / 2 + 40);
        ctx.fillText(`Record: ${max_score}`, WIDTH / 2, HEIGHT / 2 + 80);
        ctx.fillText("Press to start again", WIDTH / 2, HEIGHT / 2 + 120);
    } else if (game_paused) {
        draw_scene();
        ctx.fillStyle = BRICK_RED_TRANSPARENT;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = WHITE;
        ctx.textAlign = "center";
        ctx.fillText("Pause", WIDTH / 2, HEIGHT / 2);
    } else {
        draw_scene();

        // Disegna il punteggio
        ctx.fillStyle = BRICK_RED;
        ctx.textAlign = "left";
        let textWidth = ctx.measureText(`Punteggio: ${score}`).width + 20;
        let textHeight = 36;
        ctx.fillRect(10, 10, textWidth, textHeight*2 + 5);
        ctx.fillStyle = WHITE; // Cambia il colore del testo
        ctx.fillText(`Score: ${score}`, 20, 35);
        ctx.fillText(`Record: ${max_score}`, 20, 75);

        // Disegna il timer
        ctx.strokeStyle = BLACK;
        ctx.lineWidth = 2;
        ctx.strokeRect(10, HEIGHT - 30, WIDTH / 5, 20);
        ctx.fillStyle = GREEN;
        ctx.fillRect(12, HEIGHT - 28, (WIDTH / 5 - 2) * (timer / max_timer), 16);

        // Disegna il pulsante di pausa (Versione beta, sostituire testo con immagine) 
        ctx.fillStyle = BRICK_RED;
        ctx.font = "20px PixelFont";
        ctx.textAlign = "center";
        ctx.fillRect(PAUSE_BUTTON_X, PAUSE_BUTTON_Y, PAUSE_BUTTON_WIDTH, PAUSE_BUTTON_HEIGHT);
        ctx.fillStyle = WHITE;
        ctx.fillText("Pause", WIDTH - 54, 35);
    }
}

function draw_scene() {
    // Draws background
    ctx.drawImage(background, 0, 0, WIDTH, HEIGHT);
    const TREE_FRACTION = TREE_WIDTH / 3;
    
    // Draws tree
    // TODO CHANGE THE FOLLOWING CODE TO DRAW A TRUNK THAT IS UNREADABLE
    //upper tile(slightly larger than TREE_WIDTH cause image has a little bit of transparency)
    ctx.drawImage(iTrunk, WIDTH / 2 - TREE_WIDTH / 2 - TREE_FRACTION, tree_y, TREE_WIDTH + TREE_FRACTION * 2, HEIGHT / 2);
    //lower tile(slightly larger than TREE_WIDTH cause image has a little bit of transparency)
    ctx.drawImage(iTrunk, WIDTH / 2 - TREE_WIDTH / 2 - TREE_FRACTION, tree_y + HEIGHT / 2, TREE_WIDTH + TREE_FRACTION * 2, HEIGHT / 2);
    // extra trunk to cover the gap between the two tiles
    ctx.drawImage(iTrunk, WIDTH / 2 - TREE_WIDTH / 2 - TREE_FRACTION, tree_y - HEIGHT / 2, TREE_WIDTH + TREE_FRACTION * 2, HEIGHT / 2);

    // Draws branches
    ctx.fillStyle = GREEN;
    branches.forEach(branch => {
        if (branch.side === "left") {
            ctx.drawImage(sFlippedBranch, branch.x, branch.y, BRANCH_WIDTH, BRANCH_HEIGHT);
        } else if (branch.side === "right") {
            ctx.drawImage(sBranch, branch.x, branch.y, BRANCH_WIDTH, BRANCH_HEIGHT);
        }
    });
    // Draws falling branches
    falling_branches.forEach(branch => {
        ctx.globalAlpha = branch.alpha;
		// ctx.translate(WIDTH / 2, HEIGHT / 2);
		// ctx.rotate(1.5);
        if (branch.side === "left") {
			rotateAndPaintImage( ctx, sFlippedBranch, branch.angle , branch.x, branch.y, BRANCH_WIDTH, BRANCH_HEIGHT);
            // ctx.drawImage(sFlippedBranch, branch.x, branch.y, BRANCH_WIDTH, BRANCH_HEIGHT);
        } else if (branch.side === "right") {
			rotateAndPaintImage( ctx, sBranch, branch.angle , branch.x, branch.y, BRANCH_WIDTH, BRANCH_HEIGHT)
        }
        ctx.globalAlpha = 1;
		// ctx.rotate(-1.5);
		// ctx.translate(-WIDTH / 2, -HEIGHT / 2);
    });
    // Draws player
    if (player_x === P_LEFT) {
        ctx.drawImage(manSprite, player_x - PLAYER_WIDTH / 2, player_y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
    else if (player_x === P_RIGHT) {
        ctx.drawImage(flippedManSprite, player_x - PLAYER_WIDTH / 2, player_y, PLAYER_WIDTH, PLAYER_HEIGHT);
    }
    // ctx.fillStyle = RED;
    // ctx.fillRect(player_x - PLAYER_WIDTH / 2, player_y, PLAYER_WIDTH, PLAYER_HEIGHT);

}
//#endregion
//////////////////////////////////////////////////
//! Main game flow 
//////////////////////////////////////////////////
//#region Main game flow
generate_first_branches();

// Input handling
document.addEventListener('keydown', handleKeyDown);
canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mouseover', handleMouseOver);

function gameLoop() {
    current = Date.now();
    delta = current - start;
    start = current;
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
//#endregion