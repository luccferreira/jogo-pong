//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis da raquete
let xMinhaRaquete = 5;
let yMinhaRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90

//variáveis oponente
let xOponenteRaquete = 585;
let yOponenteRaquete = 150;
let velocidadeYOponente;
let velocidadeXOponente;
let chanceDeErrar = 0;

//variáveis placar
let meusPontos  = 0;
let oponentePontos = 0;

let colidiu = false;

//variáveis som
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}



function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaBordas();
  mostraRaquete(xMinhaRaquete, yMinhaRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xMinhaRaquete,yMinhaRaquete);
  colisaoRaqueteBiblioteca(xOponenteRaquete, yOponenteRaquete);
  mostraRaquete(xOponenteRaquete, yOponenteRaquete);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
  
}

function mostraRaquete(x,y){
  rect(x,y,raqueteComprimento,raqueteAltura);
}


function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaBordas (){
    if (xBolinha + raio > width || 
      xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height ||
      yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW) && yMinhaRaquete >= 0){
    yMinhaRaquete -= 10;
    
  }

    if (keyIsDown(DOWN_ARROW) && yMinhaRaquete <= height - raqueteAltura){
    yMinhaRaquete += 10;
  
}
}
  
  function verificaColisaoRaquete(x,y){
   if (xBolinha - raio < x + raqueteComprimento && yBolinha - raio < y + raqueteAltura && yBolinha + raio > y) {
     velocidadeXBolinha *= -1;
     raquetada.play();
   }
  }
  
function colisaoRaqueteBiblioteca(x,y){
 colidiu = 
  collideRectCircle(x,y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  
  if (colidiu){
    velocidadeXBolinha *= -1;
    calculaChanceDeErrar();
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yOponenteRaquete - raqueteComprimento / 2 - 30;
  yOponenteRaquete += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER)
  textSize(20);
  fill(color(255,69,0));
  rect(130,10,40,20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255,69,0));
  rect(430,10,40,20);
  fill(255);
  text(oponentePontos, 450, 26);
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  
  if (xBolinha <10){
    oponentePontos += 1;
    ponto.play();
  }
  
}

function calculaChanceDeErrar(){
  if (oponentePontos >= meusPontos){
    chanceDeErrar += 1
  if (chanceDeErrar >= 39){
    chanceDeErrar = 40
  }
  } else {
    
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
      chanceDeErrar = 35
      
    }
  }
}

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 25;
    }
  if (xBolinha + raio > width){
    xBolinha = 580;
  }
}