var Web3 = require('web3');
var web3 = new Web3();

var simpleStorage;

web3.setProvider(new Web3.providers.HttpProvider('http://35.231.117.21:8545'));

function connectContract() {
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
	var simpleStorageContract = web3.eth.contract(abi);
	
	simpleStorage = simpleStorageContract.at(contractAddress);
	return simpleStorage;
}

function unlockUser() {
	// var result = web3.personal.unlockAccount(web3.eth.accounts[0], "1234");
	var result = web3.personal.unlockAccount(web3.eth.accounts[0], "1234qwerasdfzxcv");
	
	return result;
}

function registerMarket(marketName) {
	unlockUser();
	
	var result = simpleStorage.registerMarket.sendTransaction(marketName, {from:web3.eth.accounts[0]});
	
	if(result == false)
		alert('실패');
	
	return result;
}

function makeCoupon(marketName, couponName) {
	unlockUser();

	var result = simpleStorage.makeCoupon.sendTransaction(marketName, couponName, {from:web3.eth.accounts[0]});

	if(result == false)
		alert('실패');

	return result;
}

function giveCoupon(marketName, userName, couponCount, couponName) {
	unlockUser();
	
	var result = simpleStorage.giveCoupon.sendTransaction(marketName, userName, couponCount, couponName, {from:web3.eth.accounts[0], gas: 1000000, gasPrice: 10});

	if(result == false)
		alert('실패');

	return result;
}

function listCoupon(){
	unlockUser();

	var result = simpleStorage
}

function giveCouponCb(coupon){
	return function(){
		var user = prompt("쿠폰을 발급할 고객의 ID를 입력해주세요");
		if(user == "" || user == null){
			alert("아이디를 입력해주세요!");
			return;
		}

		alert("쿠폰을 발급합니다. 잠시 기다려주세요");
		unlockUser();
		var t = simpleStorage.giveMarketCoupon.sendTransaction(market, user, 1, coupon, {from:web3.eth.accounts[0], gas:1000000, gasPrice:10});
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
						alert("'" + coupon + "' 쿠폰을 " + user+ "에게 발급했습니다!");
						updateCoupons();
						return;
				}
				setTimeout(check, 5000);
		}
		setTimeout(check, 5000);
	}
}
function makeCoupon(){
	var coupon = prompt("생성할 쿠폰의 종류를 입력해주세요");
	if(coupon == "" || coupon == null){
		alert("쿠폰 종류를 입력해주세요!");
		return;
	}

	alert("쿠폰을 생성합니다. 잠시 기다려주세요");
	unlockUser();
	var t = simpleStorage.makeCoupon.sendTransaction(market, coupon, {from:web3.eth.accounts[0], gas:1000000, gasPrice:10});
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
					alert("'" + coupon + "' 쿠폰을 생성했습니다!");
					updateCoupons();
					return;
			}
			setTimeout(check, 5000);
	}
	setTimeout(check, 5000);
}

function updateCoupons(){
	unlockUser();
	var couponListStr = simpleStorage.showMarketCoupon.call(market, {from:web3.eth.accounts[0], gas:1000000, gasPrice:10});
	//alert("test" + couponListStr);
	//var lst = [["burger", "10%"], ["pizza", "1000won"]];//get coupons
	var couponList = couponListStr.split("\n");
	couponList.pop();

	var result = "";
	for(var i in couponList){
			result += "<tr>";
			result += "<td>" + couponList[i] + "</td>"
			result += "<td><input class='btn btn-success' type='button' onclick=\"giveCouponCb(" + "'" + couponList[i] + "'" + ")()\" value='발급하기'></td>"
			result += "</tr>";
	}
	$("#couponList").html(result);
}

$(document).ready(function() {
	connectContract();
	market = new URL(location.href).searchParams.get("market_id");
	if(simpleStorage.showMarket().split("\n").indexOf(market) < 0){
		alert("No market named " + market + "!!");
		location.href="index.html";
	}else{
		updateCoupons();
	}
});