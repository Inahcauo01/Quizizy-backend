//-------------------Fetting data from table-------------
let questions;
let correctArray;

let xhr = new XMLHttpRequest();
xhr.open("GET", "question.json", false);
xhr.onreadystatechange = ()=>{
  if(xhr.readyState == 4 && xhr.status == 200){
    questions = JSON.parse(xhr.responseText);
  }
  // else  console.log("erreur lors du recuperation des donnees")
}
xhr.send(null)

//-------------declaration des variables--------------
let start     = document.querySelector(".start")
let next      = document.querySelector(".next");
let previous  = document.querySelector(".previous");
let one       = document.querySelector(".one");
let two       = document.querySelector(".two");
let three     = document.querySelector(".three");
let four      = document.querySelector(".four");
let steps     = document.querySelectorAll(".step");
let iconStep1 = document.querySelector(".icon-step1")
let iconStep2 = document.querySelector(".icon-step2")
let iconStep3 = document.querySelector(".icon-step3")
let iconStep4 = document.querySelector(".icon-step4")

let question  = document.querySelector(".quetion")
let reponses  = document.querySelector(".reponses")

start.classList.add("hide")
iconStep1.classList.add("color")

progressBar   = document.querySelector(".progressBar");
progress      = document.querySelector(".progress");
countdownText = document.querySelector(".countdown")

let scoreText   = document.querySelector(".score")
let correctionC = document.querySelector(".correction-container")
let indexQst    = 0;
let score       = 0;
let triche      = false;
let darkM       = false;
let timeOut;
let timer;

let username = document.querySelector("#input-username");
let hsNom    = document.querySelector(".highScore-nom");
let hsScore  = document.querySelector(".highScore-score");

let repToCompare = []
let second = 5
//--------------------stepper next---------------------
next.addEventListener("click",()=>{
    previous.classList.remove("hide");

    if(!one.classList.contains("hide")){
        steps.forEach(step => { step.classList.add("hide"); });
        two.classList.remove("hide");
        iconStep2.classList.add("color")
        next.classList.add("hide")
        start.classList.remove("hide")
    }
    else if(!two.classList.contains("hide")){
        steps.forEach(step => { step.classList.add("hide"); });
        three.classList.remove("hide");
        iconStep3.classList.add("color")
        previous.classList.add("hide")
        next.classList.add("hide")
    }
    else if(!three.classList.contains("hide")){
        steps.forEach(step => { step.classList.add("hide"); });
        four.classList.remove("hide");
        iconStep4.classList.add("color")

        next.classList.add("hide");
        start.classList.remove("hide");
    }
})

//-------------------stepper previous------------------
previous.addEventListener("click",()=>{

    if(!two.classList.contains("hide")){
        // console.log("1")
        steps.forEach(step => { step.classList.add("hide"); });
        one.classList.remove("hide");
        next.classList.remove("color3")
        next.innerHTML = "next"
        next.classList.remove("hide")
        previous.classList.add("hide");
        iconStep2.classList.remove("color")
        start.classList.add("hide")
    }
    else if(!three.classList.contains("hide")){
        // console.log("2")
        steps.forEach(step => { step.classList.add("hide"); });
        two.classList.remove("hide");
        iconStep3.classList.remove("color")
    }
    else if(!four.classList.contains("hide")){
        // console.log("3")
        steps.forEach(step => { step.classList.add("hide"); });
        three.classList.remove("hide");
        iconStep4.classList.remove("color")
        next.classList.remove("hide")
    }
})

//------------------start button (step2)---------------
start.addEventListener("click", ()=>{
      steps.forEach(step => { step.classList.add("hide"); });
        three.classList.remove("hide");
        iconStep3.classList.add("color")
        previous.classList.add("hide")
        next.classList.add("hide")
        start.classList.add("hide")
      
        desactiverText();
        display(0)
        tricher();
        // userData()
      
})

//-----triage du tableau d'une maniére aléatoire-------
let shuffledArr = questions.sort(()=> Math.random() - 0.5)

//-------------verification des questions--------------
function checkQuestion(elm){  
  //index = elm.id
    // enragistrer les reponses des users
    repToCompare.push({id: elm.id,rep: elm.textContent});
    // console.log(repToCompare)

  // if(elm.textContent == shuffledArr[elm.id].correct){
  //   console.log((elm.id)+" correct");
  //   score++
  // }else{
  //   res.push((elm.id))
  //   console.log((elm.id)+" faux");}
  createQuestion()
  
}

//---------creation des questions aleatoires-----------
function createQuestion(){

  clearTimeout(timeOut)
  clearTimeout(timer)
  
  //determiner le width selon la methode de trois 
  let w = (((indexQst+1) * 100)/(shuffledArr.length))
  
  if(indexQst < shuffledArr.length){
    progressBar.style.width= w+"%"
    display(indexQst);
  }
  else{
    // showing step4 (result)
    progressBar.style.display= "none"
    showResult();
  }
}

//---------------affichage des questions---------------
function display(index){
  progress.innerHTML = (indexQst+1)+"/"+shuffledArr.length;  
  indexQst ++;

  question.innerHTML = shuffledArr[index].question;
  
  document.querySelector(".reponse1").innerHTML =  shuffledArr[index].choiceA;      document.querySelector(".reponse1").setAttribute("id",shuffledArr[index].id);
  document.querySelector(".reponse2").innerHTML =  shuffledArr[index].choiceB;      document.querySelector(".reponse2").setAttribute("id",shuffledArr[index].id);
  document.querySelector(".reponse3").innerHTML =  shuffledArr[index].choiceC;      document.querySelector(".reponse3").setAttribute("id",shuffledArr[index].id);
  document.querySelector(".reponse4").innerHTML =  shuffledArr[index].choiceD;      document.querySelector(".reponse4").setAttribute("id",shuffledArr[index].id);

  countDown(second);
  timeOut = setTimeout(() => {
    //le cas de ne pas repondre
    repToCompare.push({id: index,rep: "undefined"});
    createQuestion()}, second+"000")
}

//---------------affichage de resultat-----------------
function showResult(){
    steps.forEach(step => { step.classList.add("hide"); });
    four.classList.remove("hide");
    iconStep4.classList.add("color")
    progress.classList.add("hide")
    countDown(-1)

    // recupere table de correction
    let correctArray= getCorrect();

    if(triche){
      //le cas de tricher (changer la page) lors du test
      correctionC.innerHTML += `
      <img src="assets/images/fail.png" style="width:200px">
      <div style="color:tomato">Vous n'êtes pas respecté les régles de ce quiz !</div>`;
      bgColor(1);
      scoreText.innerHTML = "0";
      document.querySelector(".four").style.backgroundColor = "none"
      document.querySelector(".four").style.boxShadow       = "none"
    }else{
      //le cas normal (n ya pas de triche)
      document.querySelector(".stepper").classList.add("res-four")
      
      shuffledArr.forEach((elm,index) =>{
          
          //  console.log(elm.id)
           correctArray.forEach(crt => {
              if(crt.id_crt == elm.id){
                correctionC.innerHTML +=`
                  <div class="qst-corr">${index+1}) ${elm.question}</div>
                  <div class="correction" id="correction-${index}">${crt.explication}</div>
                  `;
              }
                if((repToCompare[index].id == crt.id_crt) && (repToCompare[index].rep == crt.correcte)){
                  // console.log("correcte")
                  document.querySelector("#correction-"+(index)).classList.add("correct");
                  // console.log(index)
                  score++;
                }else{
                  // console.log("faux")
                  // console.log(index)
                }

           });
      })

      // le high score
      if(score > localStorage.getItem("score"))   highScore();
        scoreText.innerHTML = score;
        hsNom.innerHTML     = localStorage.getItem("nom")
        hsScore.innerHTML   = localStorage.getItem("score")
        
      let scorePerCent = ((score*100)/(shuffledArr.length));
      if(scorePerCent <= 30) {
        bgColor(1)
        scoreText.style.color = "red"
      }
      else if(scorePerCent < 50 && scorePerCent>3) {
        bgColor(2)
        scoreText.style.color = "tomato"
      }
      else if(scorePerCent > 50) {
        bgColor(9)
        scoreText.style.color = "green"
      }
      
      userData()
    }
}

//---------------recuperer la correction---------------
function getCorrect(){
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "correction.json", false);
  xhr.onreadystatechange = ()=>{
    if(xhr.readyState == 4 && xhr.status == 200){
      correctArray = JSON.parse(xhr.responseText);
        // console.log(correctArray)
    }
  }
  xhr.send(null)
  return correctArray;
}

//------------------compte a rebours-------------------
function countDown(sec){
  if(sec == -1){
    countdownText.innerHTML = "";
    bgColor(0)
    return 0  
  }else
  countdownText.innerHTML = "<img src=\"assets/images/timer.png\" style=\"width:16px\"> "+sec+" seconds";
  sec--;

  bgColor(0)

  if(sec<1)       bgColor(1)
  else if(sec<2)  bgColor(2)
  else if(sec<3)  bgColor(3)

    timer = setTimeout(()=>{
      if(sec >= 0){
      countDown(sec)
    }else{
      clearTimeout(timer);
    }
    },1000)
    
}

//------------background avec couleur (timer)----------
function bgColor(color){
  if(darkM){
    if(color == 0)
      document.querySelector("body").style.background= "radial-gradient(circle, #363636 0%, rgb(40, 40, 55) 100%)"
    else if(color == 1)
      document.querySelector("body").style.background= "radial-gradient(circle, #363636 0%, rgb(40, 10, 28) 100%)"
    else if(color == 2)
      document.querySelector("body").style.background= "radial-gradient(circle, #363636 0%, rgb(35, 15, 22) 100%)"
    else if(color == 3)
      document.querySelector("body").style.background= "radial-gradient(circle, #363636 0%, rgb(30, 17, 30) 100%)"
    else{
      document.querySelector("body").style.background= "radial-gradient(circle, #363636 0%, #363636 100%)"
    }
  }else{
    if(color == 0)
      document.querySelector("body").style.background= "radial-gradient(circle, rgb(220, 225, 255) 0%, rgba(255,255,255,1) 100%)"
    else if(color == 1)
      document.querySelector("body").style.background= "radial-gradient(circle, rgb(255, 200, 200) 0%, rgba(255,255,255,1) 100%)"
    else if(color == 2)
      document.querySelector("body").style.background= "radial-gradient(circle, rgb(243, 208, 218) 0%, rgba(255,255,255,1) 100%)"
    else if(color == 3)
      document.querySelector("body").style.background= "radial-gradient(circle, rgb(232, 217, 237) 0%, rgba(255,255,255,1) 100%)"
    else{
      document.querySelector("body").style.background= "radial-gradient(circle, rgb(205, 255, 220) 0%, rgba(255,255,255,1) 100%)"
    }
  }
}

//--------Le cas de tricher (changer la page)----------
function tricher(){
  window.addEventListener('blur', ()=>{
    triche=true
  });
}

//--------Empecher la selection du text du quiz--------
function desactiverText(){
  document.querySelector(".stepper").setAttribute("onselectstart","return false;");
  document.querySelector(".stepper").setAttribute("onmousedown","return false;");
}

//---------------Detecter le high score----------------
function highScore(){
  localStorage.setItem("nom",username.value);
  localStorage.setItem("score",score);
}

//-------------------Dark/light mode-------------------
function darklight(elm){
  let bgLight   = "#ededed";
  let bgDark    = "#363636";
  let boxSlight = "20px 20px 60px #c9c9c9,-20px -20px 60px #ffffff";
  let boxSdark  = "20px 20px 60px #2e2e2e,-20px -20px 60px #3e3e3e";

  elm.classList.add("hide")
  if(elm.id == "moon"){
    document.querySelector("#sun").classList.remove("hide");
    document.querySelector(".stepper").style.background    = bgDark;
    document.querySelector(".stepper").style.boxShadow     = boxSdark;
    document.querySelector("body").style.background        = bgDark;
    document.querySelector(".dark-light").style.background = bgDark;
    document.querySelector(".dark-light").style.boxShadow  = boxSdark;
    document.querySelectorAll(".btnBtm").forEach(btn => { 
                                      btn.style.background = bgDark;
                                      btn.style.boxShadow  = boxSdark; });

    document.querySelectorAll(".rep").forEach(rep => { 
                                      rep.style.background = bgDark;
                                      rep.style.boxShadow  = boxSdark; })                          
    username.style.background = bgDark;
    username.style.boxShadow  = boxSdark;
    username.style.color      = bgLight;
    four.style.background     = bgDark;
    four.style.boxShadow      = boxSdark;
    darkM = true;
    
  }else{
    document.querySelector("#moon").classList.remove("hide");
    document.querySelector(".stepper").style.background    = bgLight;
    document.querySelector(".stepper").style.boxShadow     = boxSlight
    document.querySelector("body").style.background        = "radial-gradient(circle, rgb(220, 225, 255) 0%, rgba(255,255,255,1) 100%)";
    document.querySelector(".dark-light").style.background = bgLight;
    document.querySelector(".dark-light").style.boxShadow  = boxSlight;
    document.querySelectorAll(".btnBtm").forEach(btn => { 
                                      btn.style.background = bgLight;
                                      btn.style.boxShadow  = boxSlight;  });
      document.querySelectorAll(".rep").forEach(rep => { 
                                      rep.style.background = bgLight;
                                      rep.style.boxShadow  = boxSlight; })
    
    username.style.background = bgLight;
    username.style.boxShadow  = boxSlight;
    username.style.color      = bgDark;
    four.style.background     = bgLight;
    four.style.boxShadow      = boxSlight;

    darkM = false;
  }
}

//----------------------Bonus -------------------------
function userData(){
  const name = document.querySelector("#input-username").value;
  console.log(score);
  console.log(name);
  $.ajax({
      url: "../app/controller/script.php",
      type: "POST",
      data: {name: name,
             score: score},
      success: function(response) {
        // Update the table with the data from the server
        console.log("succes :"+response)
      }
    });

}