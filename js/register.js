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

function registerUser(){
  var id = $("#user_id_register")[0].value;
  if(id == ""){
    alert("아이디를 입력해주세요!");
    return;
  }
  alert("'" + id + "' 사용자로 회원가입합니다. 잠시 기다려주세요!");
  unlockUser();
  var t = ci.registerUser.sendTransaction(id, {from:web3.eth.accounts[0], gas:2000000, gasPrice:10});
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
          alert("'" + id + "' 사용자로 회원가입 되었습니다!");
          location.reload();
          return;
      }
      setTimeout(check, 5000);
  }
  setTimeout(check, 5000);
}

function registerMarket(){
  var id = $("#market_id_register")[0].value;
  if(id == ""){
    alert("아이디를 입력해주세요!");
    return;
  }
  alert("'" + id + "' 매장으로 회원가입합니다. 잠시 기다려주세요!");
  unlockUser();
  var t = ci.registerMarket.sendTransaction(id, {from:web3.eth.accounts[0], gas:2000000, gasPrice:10});
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
          alert("'" + id + "' 매장으로 회원가입 되었습니다!");
          location.reload();
          return;
      }
      setTimeout(check, 5000);
  }
  setTimeout(check, 5000);
}

function onEnterCb(f){
  return function(e){
      if(e.keyCode === 13) {
          f();
      }
  }
}

$(document).ready(function() {
  $("#user_id_register").keyup(onEnterCb(registerUser));
  $("#user_register_button").click(registerUser);

  $("#market_id_register").keyup(onEnterCb(registerMarket));
  $("#market_register_button").click(registerMarket);
});
//t1 = ci.giveMarketCoupon.sendTransaction("pizza", "user", 4, "30%", {from:web3.eth.accounts[0], gas:2000000, gasPrice:100})
