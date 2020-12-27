let nave = [];
let food = [];
let poison = [];

var debugTag = false;
let button1,button2,button3;

// check do debug
function myCheckedEvent() {
  if (this.checked()) {
    debugTag = true;
  } else {
    debugTag = false;
  }
}

// funcao para o botao de adicionar mais naves
function addNaves(){
	var x = random(width);
  	var y = random(height);

  	nave.push(new Vehicle(x,y));
}

// FUncao para o botao de adicionar mais comida
function addFood(){
  	var x = random(width);
  	var y = random(height);

  	food.push(createVector(x, y));
}

// Funcao para o botao de adicionar mais venenos
function addPoison(){
  	var x = random(width);
  	var y = random(height);

  	poison.push(createVector(x, y));
}

// Funcao de configuracao inicial
function setup() {
  createCanvas(640, 360);

  // Qtt de nave, comida e veneno
  var foodQtt = 10;
  var posionQtt = 10;
  var navesQtt = 10;

  // criar naves
  for(let i = 0; i < navesQtt; i++){
  	// posicoes aleatorias
  	var x = random(width);
  	var y = random(height);

  	nave[i] = new Vehicle(x,y);
  }

  // criar veneno
  for(let i = 0; i < posionQtt; i++){
  	// posicoes aleatorias
  	var x = random(width);
  	var y = random(height);

  	poison.push(createVector(x, y));
  }

  // criar comida
  for(let i = 0; i < foodQtt; i++){
  	// posicoes aleatorias
  	var x = random(width);
  	var y = random(height);

  	food.push(createVector(x, y));
  }


  // Debug
  checkbox = createCheckbox('Modo Debug', false);
  checkbox.changed(myCheckedEvent);

  // adicionar mais naves
  button1 = createButton('Adicionar naves');
  button1.position(125, 375);
  button1.mousePressed(addNaves);

  // adicionar mais comida
  button2 = createButton('Adicionar comida');
  button2.position(250, 375);
  button2.mousePressed(addFood);

  // adicionar mais veneno
  button3 = createButton('Adicionar veneno');
  button3.position(375, 375);
  button3.mousePressed(addPoison);
}

// Funcao loop
function draw() {
  background(51);

  // nascendo comida aleatoriamente
  if(random(1) < 0.075){
   	var x = random(width);
  	var y = random(height);

  	food.push(createVector(x, y)); 	
  }

  // nascendo veneno aleatoriamente
  if(random(1) < 0.01){
   	var x = random(width);
  	var y = random(height);

  	poison.push(createVector(x, y)); 	
  }

  // Desenhando as comidas
  for(let i = 0; i < food.length; i++){
  	noStroke();
  	fill(0,255,0);
  	ellipse(food[i].x, food[i].y, 8, 8);
  }

  // Desenhando veneno
  for(let i = 0; i < poison.length; i++){
  	noStroke();
  	fill(255,0,0);
  	ellipse(poison[i].x, poison[i].y, 8, 8);
  }


  // Chamadas das naves e display
  for(let i = 0; i < nave.length; i++){
	  nave[i].behavior(food,poison);
	  nave[i].update();
	  nave[i].boundaries();
	  nave[i].display();

	  // se multiplicando
	  var kid = nave[i].clone();
	  if(kid != null){
	  	nave.push(kid);
	  }

	  // nave morreu
	  if(nave[i].dead()){
	  	var x = nave[i].position.x;
	  	var y = nave[i].position.y;
	  	food.push(createVector(x, y));	  	
	  	nave.splice(i, 1);
	  }

  }

}