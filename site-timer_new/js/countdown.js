function CountdownTimer(elm,tl,mes){
 this.initialize.apply(this,arguments);
}
CountdownTimer.prototype={
 initialize:function(elm,tl,mes) {
  this.elem = document.getElementById(elm);
  this.tl = tl;
  this.mes = mes;
 },countDown:function(){
  var timer='';
  var today=new Date();
  var day=Math.floor((this.tl-today)/(24*60*60*1000));
  var hour=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*60*1000));
  var min=Math.floor(((this.tl-today)%(24*60*60*1000))/(60*1000))%60;
  var sec=Math.floor(((this.tl-today)%(24*60*60*1000))/1000)%60%60;
  var me=this;

  if( ( this.tl - today ) > 0 ){
   timer += '<div class="box hhours"><span class="number day"><div class="caption">DAYS</div>'+day+'</span></div>';
   timer += '<div class="box"><span class="number hour"><div class="caption">HOURS</div>'+hour+'</span></div>';
   timer += '<div class="box"><span class="number min"><div class="caption">MINS</div>'+this.addZero(min)+'</span></div><div class="box"><span class="number sec"><div class="caption">SEC</div>'+this.addZero(sec)+'</span></div>';
   this.elem.innerHTML = timer;
   tid = setTimeout( function(){me.countDown();},10 );
  }else{
   this.elem.innerHTML = this.mes;
   return;
  }
 },addZero:function(num){ return ('0'+num).slice(-2); }
}
function CDT(){

 // Set countdown limit
 var tl = new Date('2020/01/27 20:19:43');

 // You can add time's up message here
 var timer = new CountdownTimer('CDT',tl,'<span class="number-wrapper"><div class="line"></div><span class="number end">Ураааа !</span></span>');
 timer.countDown();
}

window.onload=function(){
 CDT();

}

