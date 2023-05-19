var fgImg = null;
var bgImg = null;
var bgImgTemp = null;
var can1 = null;
var can2 = null;

function loadFgImg() {
  var fginput = document.getElementById("fgimage");
  can1 = document.getElementById("can1");
  fgImg = new SimpleImage(fginput);
  fgImg.drawTo(can1);
}

function loadBgImg() {
  var bginput = document.getElementById("bgimage");
  can2 = document.getElementById("can2");
  bgImg = new SimpleImage(bginput);
  bgImgTemp = new SimpleImage(bginput);
  bgImg.drawTo(can2);
}

function createCombo() {
  if(fgImg == null || !fgImg.complete()){
    alert('Not loaded fg image');
  } else if(bgImg == null || !bgImg.complete()){
    alert('Not loaded bg image');
  } else {
    bgImgTemp.setSize(fgImg.getWidth(), fgImg.getHeight());
    var blank = new SimpleImage(fgImg.getWidth(), fgImg.getHeight());
    for(var px of fgImg.values()){
      var thresold = px.getRed()+px.getBlue();
      var x = px.getX();
      var y = px.getY();
      if(px.getGreen() > thresold){
        blank.setPixel(x, y, bgImgTemp.getPixel(x, y));
      } else {
        blank.setPixel(x, y, fgImg.getPixel(x, y));
      }
    }
    blank.drawTo(can1);
  }
}

function clearCanvas() {
  var ctx = can1.getContext("2d");
  var ctx2 = can2.getContext("2d");
  ctx.clearRect(0, 0, fgImg.getWidth(), fgImg.getHeight());
  ctx2.clearRect(0, 0, bgImg.getWidth(), bgImg.getHeight());
}