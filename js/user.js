var Web3 = require('web3');
//var web3 = new Web3();

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://35.231.117.21:8545"));
}

var abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      }
    ],
    "name": "findMarket",
    "outputs": [
      {
        "name": "",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "showUser",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "mart_name",
        "type": "string"
      }
    ],
    "name": "showMarketCoupon",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "showMarket",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      }
    ],
    "name": "findUser",
    "outputs": [
      {
        "name": "",
        "type": "int256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "user_name",
        "type": "string"
      }
    ],
    "name": "showUserCoupon",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "market_name",
        "type": "string"
      }
    ],
    "name": "registerMarket",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "user_name",
        "type": "string"
      },
      {
        "name": "market_name",
        "type": "string"
      },
      {
        "name": "coupon_name",
        "type": "string"
      }
    ],
    "name": "useCoupon",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "name",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "market_name",
        "type": "string"
      },
      {
        "name": "user_name",
        "type": "string"
      },
      {
        "name": "coupon_count",
        "type": "uint256"
      },
      {
        "name": "coupon_name",
        "type": "string"
      }
    ],
    "name": "giveMarketCoupon",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "give_user_name",
        "type": "string"
      },
      {
        "name": "receive_user_name",
        "type": "string"
      },
      {
        "name": "coupon_count",
        "type": "uint256"
      },
      {
        "name": "coupon_name",
        "type": "string"
      },
      {
        "name": "mart_name",
        "type": "string"
      }
    ],
    "name": "giveUserCoupon",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "market_name",
        "type": "string"
      },
      {
        "name": "coupon_name",
        "type": "string"
      }
    ],
    "name": "makeCoupon",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
var contractAddress = '0x066396bb2a9d89dc7c1783334735a294cca099c9';

var contract = web3.eth.contract(abi);
var ci = contract.at(contractAddress);

function unlockUser() {
    var result = web3.personal.unlockAccount(web3.eth.accounts[0], "1234qwerasdfzxcv");
    
    return result;
}
var eth = web3.eth;
var getBalance = ()=>{return eth.getBalance(eth.accounts[0])};
//web3.personal.unlockAccount(web3.eth.accounts[0], "1234qwerasdfzxcv");
  //contractInterface.registerUser.sendTransaction("hololo", {from: web3.eth.accounts[1]})
  //contractInterface.registerMarket("GasPriceTest", {from:web3.eth.accounts[0], gasPrice:500})
//user: user
//market: burger, pizza
//burger: 1000won, pizza: 30%

//var user = simpleStorage.find_User('ii');
/*
function useCoupon(userName, marketName, couponName){
    return contractInterface.userCoupon(userName, marketName, couponName);
}
function showCoupon(userName){
    return contractInterface.showCoupon(userName);
}
function registerUser(userName){
    return contractInterface.registerUser(userName);
}*/
function useCouponCb(user, market, coupon){
    return function(){
        alert("쿠폰을 사용합니다. 잠시 기다려주세요");
        unlockUser();

        var t = ci.useCoupon.sendTransaction(user, market, coupon, {from:web3.eth.accounts[0], gas:2000000, gasPrice:1});
        console.log("transaction id : " + t);
        var result = null;
        function check(){
            //console.log("check");
            result = web3.eth.getTransaction(t);
            console.log(result);
            if(result == null){
                alert("Error!!");
                return;
            }
            if(result['blockHash'] != "0x0000000000000000000000000000000000000000000000000000000000000000"){
                console.log(result['blockHash']);
                alert("'" + market + "' 가게의 '" + coupon + "' 쿠폰을 사용했습니다!");
                updateCoupons();
                return;
            }
            setTimeout(check, 5000);
        }
        setTimeout(check, 5000);
    }
}
function giveCouponCb(user, market, coupon){
    return function(){
        var other = prompt("쿠폰을 선물할 친구의 ID를 입력해주세요");
        if(other == "" || other == null){
          alert("쿠폰 종류를 입력해주세요!");
          return;
        }
        alert("쿠폰을 선물합니다. 잠시 기다려주세요");
        unlockUser();
        var t = ci.giveUserCoupon.sendTransaction(user, other, 1, coupon, market, {from:web3.eth.accounts[0], gas:2000000, gasPrice:1});
        console.log("transaction id : " + t);
        var result = null;
        function check(){
            result = web3.eth.getTransaction(t);
            console.log(result);
            if(result == null){
                alert("Error!!");
                return;
            }
            if(result['blockHash'] != "0x0000000000000000000000000000000000000000000000000000000000000000"){
                console.log(result['blockHash']);
                alert("'" + market + "' 가게의 '" + coupon + "' 쿠폰을 " + other + "에게 선물했습니다!");
                updateCoupons();
                return;
            }
            setTimeout(check, 5000);
        }
        setTimeout(check, 5000);
    }
}
function updateCoupons(){
    unlockUser();
    var couponListStr = ci.showUserCoupon.call(user, {from:web3.eth.accounts[0], gas:2000000, gasPrice:1});
    //alert("test" + couponListStr);
    //var lst = [["burger", "10%"], ["pizza", "1000won"]];//get coupons
    var couponList = couponListStr.split("\n").map(x=>x.split(','));
    couponList.pop();

    var result = "";
    for(var i in couponList){
        if(couponList[i][2] == 0){
            continue;
        }
        result += "<tr>";
        result += "<td>" + couponList[i][0] + "</td>"
        result += "<td>" + couponList[i][1] + "</td>"
        result += "<td>" + couponList[i][2] + "</td>"
        result += "<td><input class='btn btn-success' type='button' onclick=\"useCouponCb(" + "'" + user + "'," + "'" + couponList[i][0] + "'," + "'" + couponList[i][1] + "'" + ")()\" value='사용하기'></td>"
        result += "<td><input class='btn btn-success' type='button' onclick=\"giveCouponCb(" + "'" + user + "'," + "'" + couponList[i][0] + "'," + "'" + couponList[i][1] + "'" + ")()\" value='선물하기'></td>"
        result += "</tr>";
    }
    $("#couponList").html(result);
}
$(document).ready(function() {
  user = new URL(location.href).searchParams.get("user_id");
  if(ci.showUser().split("\n").indexOf(user) < 0){
    alert("No user named " + user + "!!");
    location.href="index.html";
  }else{
    updateCoupons();
  }
});
//t1 = ci.giveMarketCoupon.sendTransaction("pizza", "user", 4, "30%", {from:web3.eth.accounts[0], gas:2000000, gasPrice:100})
