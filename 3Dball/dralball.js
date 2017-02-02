function drawBall(){
  this.radius = 250;
  this.angles = [];
  this.length = 25;
  this.all = [];  // 保存所有创建li
  // alert(Math.sin(Math.PI))  这里计算有问题
  this.text=["html5","css3","css","javascript","php","node","sass","mysql","vue","canvas","Angular","jquery",
  "bootstrap","ECMAscript","ajax","json","webpack","react","less","rem","flex","compass","gulp","aqie","aqie"]
}
drawBall.prototype = {
  angle :function(){
    var num =0;
    for(var i=0; i<this.length;i++){
      var obj={};
      if(i ==0){              // 1
        obj.theta=0;
        obj.phi =0;
      }
      if(i>0 && i<4){         //3
        obj.theta=Math.PI/6*1;
        obj.phi =Math.PI*2/3*num;
        num++;
      }
      if(i>3 && i<9){         //5
        obj.theta=Math.PI/6*2;
        obj.phi =Math.PI*2/5*num;
        num++;
      }
      if(i>8 && i<16){        //7
        obj.theta=Math.PI/6*3;
        obj.phi =Math.PI*2/7*num;
        num++;
      }
      if(i>15 && i<21){       ///5
        obj.theta=Math.PI/6*4;
        obj.phi =Math.PI*2/5*num;
        num++;
      }
      if(i>20 && i<24){       //3
        obj.theta=Math.PI/6*5;
        obj.phi =Math.PI*2/3*num;
        num++;
      }
      if(i>23){                //1
        obj.theta=Math.PI;
        obj.phi = 0;
      }
      this.angles.push(obj);
    }
  },
  draw:function(){
    this.angle();
    // alert(this.angles.length)
    for(var i=0;i<this.length;i++){
      // 球坐标系---对应屏幕
      var theta = this.angles[i].theta;
      var phi = this.angles[i].phi;
      var z = this.radius*Math.sin(theta)*Math.cos(phi);
      var x = this.radius*Math.sin(theta)*Math.sin(phi)+250-40;
      var y = this.radius*Math.cos(theta)+250-25;
      var li = document.createElement('li');
      li.innerHTML = this.text[i];
      li.style.cssText = "left:"+x+"px;top:"+y+"px;"
      if(i==24){
        setcss3(li,{
          transform:"translateZ("+10+"px) rotateY("+phi+"rad) rotateX("+(theta-Math.PI/2)+"rad) "
        });
        this.all.push(li);
      }
      setcss3(li,{
        transform:"translateZ("+z+"px) rotateY("+phi+"rad) rotateX("+(theta-Math.PI/2)+"rad) "
      });
      this.all.push(li);
      
    }
  }
}