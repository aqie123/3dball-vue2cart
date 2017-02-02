var url = ""
var vm =new Vue({
  el:'#container',
  data:{
    title:"",
    totalMoney:0,
    productList:[],
    checkAll:false,
    totalPrice:0,
    delflag:false,
    ourproduct:'',

  },
  filters:{
    formatMoney:function(value) {
      return "￥"+value.toFixed(2);
    }
  },
  mounted:function(){
    this.$nextTick(function(){
      vm.cartView();
    }) 
  },
  
  methods:{
    cartView:function(){ 
        // var _this = this;       // 函数内部作用域变化     
        this.title = "hello aqie";
        vm.$http.get("../data/cartData.json",{
          "id":1,
        }).then(res => {
          this.productList = res.body.result.list;
          console.log(this.productList);
          this.totalMoney = res.body.result.totalMoney;
        })
         
    },
    changeMoney:function(product,way){
      if(way){
        product.productQuentity++;
      }else{       
        product.productQuentity--;
        product.productQuentity = (product.productQuentity<1) ? 0 : product.productQuentity;
      }
      this.calcTotalPrice();       //选中后实时计算
    },
    selectProduct:function(item){
      if(typeof item.checked == 'undefined'){

        Vue.set(item,"checked",true);     // vue全局注册，向item中添加checked属性
        // this.$set(item,"checked",true);       //局部注册
        // alert(item.checked);
      }else{
        item.checked = !item.checked;
        // alert(item.checked);
      }
      this.calcTotalPrice();       //选中后计算
    },
    selectall:function(flag){
      this.checkAll=!this.checkAll;
      var _this=this;
      
      this.productList.forEach(function(item,index){
      if(typeof item.checked == 'undefined'){
        _this.$set(item,"checked",_this.checkAll);       //局部注册
      }else{
        item.checked = _this.checkAll;
      }
      });  
      this.calcTotalPrice();       //选中后计算    
    },
    calcTotalPrice:function(){
      var _this = this;
      _this.totalPrice=0;
      this.productList.forEach(function(item,index){
        if(item.checked){
          _this.totalPrice += item.productPrice*item.productQuentity;
        }
      })
    },
    delconfirm:function(item){
      this.delflag=true;
      this.ourproduct=item;
    },
    delproduct:function(){
      var index = this.productList.indexOf(this.ourproduct);
      this.productList.splice(index,1);
      this.delflag=false;
    }
  },
 
});
Vue.filter("money",function(value,type){      // 全局过滤器
  return "￥"+value.toFixed(2)+type;
})