class r_carousel{
  constructor(containerID){
    this.slideContainer = document.getElementById(containerID).getElementsByClassName("slideDisplay")[0];
    this.slideInd = 0
    this.slideL = this.slideContainer.parentNode.getElementsByClassName("nav-left")[0]
    this.slideR = this.slideContainer.parentNode.getElementsByClassName("nav-right")[0]
    this.UpdatedOverflowSlideID = []
    this.actualSlideInd = this.slideContainer.children.length
    this.dotSlide = this.getDot();
    this.slideCurrent = this.getSlide();
    this.slideR.addEventListener("click", (e) => {
      this.buttonRhandle()
    });
    this.slideL.addEventListener("click", (e) => {
      this.buttonLhandle()
    });
  }
  getSlide() {
    let res = [];
    for (let i of this.slideContainer.getElementsByClassName("slide-item-container")) {
      res.push(i.getElementsByClassName("slide-item")[0].id);
    }
    return res;
  }
  getDot() {
    let res = [];
    for (let i of this.slideContainer.parentNode.getElementsByClassName("dotDisplay")[0].children) {
      res.push(i.getElementsByClassName("inner-dot")[0].id);
    }
    return res;
  }
  init(){
    for (let d = 0; d < this.dotSlide.length; d++) {
      let currentDot = document.getElementById(this.dotSlide[d]);
      if (d == this.slideInd) {
        console.log(currentDot.parentNode.parentNode)
        if(currentDot.parentNode.parentNode.getAttribute("blackDot") == "true"){
          currentDot.parentNode.style.backgroundColor = "black";
        }else{
          currentDot.parentNode.style.backgroundColor = "white";
        }
      } else {
        currentDot.parentNode.style.background = "none";
      }
    }
  }
  resize(){
    let currentSlide = document.getElementById(this.slideCurrent[this.slideInd]);
    this.slideContainer.style.transform = `translateX(-${
      this.slideInd * currentSlide.clientWidth
    }px)`;
  }
  buttonRhandle(){
    let slideInd = this.slideInd
    let slideCurrent = this.slideCurrent
    let slideContainer = this.slideContainer
    let dotSlide = this.dotSlide

    if (slideInd < slideCurrent.length - 1) {
      slideInd++;
  
      let currentSlide = document.getElementById(slideCurrent[slideInd]);
      slideContainer.style.transform = `translateX(-${
        slideInd * currentSlide.clientWidth
      }px)`;
      console.log(slideInd);
    } else {
      slideInd =0;
      let currentSlide = document.getElementById(slideCurrent[slideInd]);
      slideContainer.style.transform = `translateX(-${
        slideInd * currentSlide.clientWidth
      }px)`;
    }
    for (let d = 0; d < dotSlide.length; d++) {
      let currentDot = document.getElementById(dotSlide[d]);
      if (d == slideInd) {
        currentDot.parentNode.style.backgroundColor = "white";
      } else {
        currentDot.parentNode.style.background = "none";
      }
    }
    this.slideInd = slideInd
    this.slideCurrent = slideCurrent 
    this.slideContainer = slideContainer
    this.dotSlide = dotSlide
  
  }
  buttonLhandle(){
    let slideInd = this.slideInd
    let slideCurrent = this.slideCurrent
    let slideContainer = this.slideContainer
    let dotSlide = this.dotSlide
    if (slideInd > 0) {
      slideInd--;
      let currentSlide = document.getElementById(slideCurrent[slideInd]);
      slideContainer.style.transform = `translateX(-${
        slideInd * currentSlide.clientWidth
      }px)`;
      console.log(slideInd);
    } else {
      slideInd = 2;
      let currentSlide = document.getElementById(slideCurrent[slideInd]);
      slideContainer.style.transform = `translateX(-${
        slideInd * currentSlide.clientWidth
      }px)`;
      console.log(slideInd);
    }
    for (let d = 0; d < dotSlide.length; d++) {
      let currentDot = document.getElementById(dotSlide[d]);
      if (d == slideInd) {
        currentDot.parentNode.style.backgroundColor = "white";
      } else {
        currentDot.parentNode.style.background = "none";
      }
    }
    this.slideInd = slideInd
    this.slideCurrent = slideCurrent 
    this.slideContainer = slideContainer
    this.dotSlide = dotSlide
  }
  async resetSlideshow() {
    this.UpdatedOverflowSlideID = []
    let slideItemHtml = [];
    for (let i of this.slideContainer.children) {
      slideItemHtml.push(
        `<div class="slide-item-container">${i.innerHTML}</div>`
      );
    }
    console.log(slideItemHtml);
    for(let slide of slideItemHtml){
      this.UpdatedOverflowSlideID.push(elementAdd(slide, this.slideContainer))
    }
    this.slideCurrent = getSlide()
  }  
}
let eleId = 0
function elementAdd(html, parent) {
  const placeholder = document.createElement("div");
  placeholder.insertAdjacentHTML("afterbegin", html);
  const node = placeholder.firstElementChild;
  let ide = "FFXHG12#RELID" + eleId;
  node.id = ide;
  parent.appendChild(node);
  eleId++;
  return ide;
}
let bannerDisplay = new r_carousel("bannerDisplay")  
let ActivistDisplay = new r_carousel("Official_non-profit_activist_slide")
window.onload = () => {
  bannerDisplay.init()
  ActivistDisplay.init()
};
window.onresize = ()=>{
  bannerDisplay.resize()
  ActivistDisplay.resize()
}


