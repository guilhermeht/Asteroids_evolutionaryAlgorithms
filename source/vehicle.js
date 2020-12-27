// Taxa de mutacao
var mutation_rate = 0.01;

// Classe da nave
class Vehicle {
  constructor(x, y, dna) {
    // aceleracao
    this.acceleration = createVector(0, 0);
    // velocidade
    this.velocity = createVector(0, -2);
    // posicao
    this.position = createVector(x, y);
    // tmanho da nave
    this.r = 4;
    // velocidade maxima da nave
    this.maxspeed = 5;
    // forca maxima da nave
    this.maxforce = 0.5;

    // DNA da nave
    this.dna = [];
    if(dna === undefined ){
      // Peso da comida
      this.dna[0] = random(-5, 5);
      // Peso do veneno
      this.dna[1] = random(-5, 5);
      // Percepcao da comida
      this.dna[2] = random(0,100);
      // Percepcao do veneno
      this.dna[3] = random(0,100);
    }else{
      this.dna[0] = dna[0];

      // Chance de mutacao
      if(random(1) < mutation_rate){
        this.dna[0] += random(-0.1, 0.1);
      }
      this.dna[1] = dna[1];
      if(random(1) < mutation_rate){
        this.dna[1] += random(-0.1, 0.1);
      }
      this.dna[2] = dna[2];
      if(random(1) < mutation_rate){
        this.dna[2] += random(-10, 10);
      }
      this.dna[3] = dna[3];
      if(random(1) < mutation_rate){
        this.dna[3] += random(-10, 10);
      }

    }
    // Vida da nave
    this.health = 1;
  }

  // Atualizar nave
  update() {
    // Perder saude naturalmente
    this.health -= 0.005;

    // atualizar velociade
    this.velocity.add(this.acceleration);
    // limite de velocidade
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    //reset a acelracao para zero em cada ciclo
    this.acceleration.mult(0);
  }

  // Forca da nave
  applyForce(force) {
    this.acceleration.add(force);
  }

  // Calcula a força em direcao ao alvo
  seek(target) {

    // Vetor da posicao da nave ate o alvo
    var desired = p5.Vector.sub(target, this.position); 

    // velocidade maxim
    desired.setMag(this.maxspeed);

    // Steering = desired - velocidade
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);

    return steer;
  }

  display() {
    let angulo = this.velocity.heading() + PI / 2;
    push();
    translate(this.position.x, this.position.y);
    rotate(angulo);

    strokeWeight(2);

    // debug
    if(debugTag){
      // verde
      stroke(0,255,0);
      line(0,0,0,-this.dna[0]*10);
      noFill();
      ellipse(0,0,this.dna[2] * 2); 
      // vermelho
      stroke(255,0,0);
      line(0,0,0,this.dna[1]*10); 
      ellipse(0,0,this.dna[3] * 2);       
    }


    // cor da nave
    var saudavel = color(0,255,0);
    var doente = color(255,0,0);
    var c = lerpColor(doente, saudavel, this.health);

    fill(c);
    stroke(c);
    strokeWeight(1);

    // Desenhando a nave
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);

    pop();
  }

  // // Nao deixa sair das bordas
  boundaries() {
    // distancia da borda da tela
    var d = 20;
    let desired = null;

    // Posicao X na tela
    if (this.position.x < d) {
      desired = createVector(this.maxspeed, this.velocity.y);
    } else if (this.position.x > width - d) {
      desired = createVector(-this.maxspeed, this.velocity.y);
    }

    // Posicao Y na tela
    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxspeed);
    } else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  // atratividade da comida X veneno
  behavior(good, bad){
    var gSteer = this.eat(good, 0.3, this.dna[2]);
    var bSteer = this.eat(bad, -0.75, this.dna[3]);

    // produto escalar nos vetores de vetor;
    gSteer.mult(this.dna[0]);
    bSteer.mult(this.dna[1]);

    this.applyForce(gSteer);
    this.applyForce(bSteer);
  }

// Quando ha reproducao
  clone(){
    // chance de 0,1% de se reproduzir
    if(random(1) < 0.001){
     return new Vehicle(this.position.x, this.position.y, this.dna);
    }
    return null;
  }

// funcao de comer a comida ou veneno
  eat(list, healthIncreaser, percep){
    var dst_record = Infinity;
    var closerIdx = null;
    for(let i = list.length-1; i >= 0; i--){
      var dst = this.position.dist(list[i]);

      if(dst < this.maxspeed){
        list.splice(i,1);
        this.health += healthIncreaser;
      }else{
        if(dst_record > dst && dst < percep){
          dst_record = dst;
          closerIdx = list[i];
        }        
      }
    }

    // Remove se a distancia da nave e da comida por muito pequena
    //  ou seja, ele comeu a comida e entao remove do array
    if(closerIdx != null){
      return this.seek(closerIdx);
    }

    // acabou comida e veneno
    return createVector(0,0);

  }

// Morreu = vida < 0
  dead(){
    return (this.health < 0);
  }
}