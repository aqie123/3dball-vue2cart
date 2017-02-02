new Vue({
  el:'.container',
  data:{
    addressList:[],
    limitNumber:3,
    currentIndex:0,
    shippingmethod:1,
  },
  mounted:function(){
    this.$nextTick(function(){
      this.getAddressList();
    })
  },
  computed:{
    filterAddress:function(){
      return this.addressList.slice(0,this.limitNumber);
    }
  },
  methods:{
    getAddressList:function(){
      this.$http.get("https://aqie123.github.io/3dball-vue2cart/data/addressData.json",{
        "id":2,
      }).then(response =>{
        var res = response.data;
        if(res.status=="0"){      // 数据请求成功
          this.addressList = res.result;
        }
      });
    },
    showAll: function(){
      this.limitNumber=this.addressList.length;
    },
    setDefault:function(addressId){
      this.addressList.forEach(function(address,index){     // 遍历id与接收到id相同
        if(address.addressId==addressId){
          address.isDefault=true;
        }else{
          address.isDefault=false;
        }
      })
    }

  }
})
