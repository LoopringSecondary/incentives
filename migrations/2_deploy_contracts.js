// var LoopringToken = artifacts.require("./LoopringToken.sol")
var TestERC20Token 	= artifacts.require("./TestERC20Token.sol")
var MidTerm 		= artifacts.require("./LRCMidTermHoldingContract.sol")
var LongTerm 		= artifacts.require("./LRCLongTermHoldingContract.sol")

module.exports = function(deployer, network, accounts) {
	console.log("network: " + network);
	
    if (network == "live") {
    	var lrcAddress 		= "0xEF68e7C694F40c8202821eDF525dE3782458639f";

    	var midTermOwner 	= "0x9167E8B2EeD2418Fa520C8C036d73ceE6b88aFE9";
        // deployer.deploy(MidTerm, lrcAddress, midTermOwner);

    	var longTermOwner = "0x21B257a25Ef2FB05714DEAf5026c00Ba2841c7ed";
        deployer.deploy(LongTerm, lrcAddress, longTermOwner);

    } else {
    	deployer.deploy(TestERC20Token)
    	.then(function() {
		  	return deployer.deploy(
		  		MidTerm, 
		  		TestERC20Token.address,
		  		accounts[0]);
		})
		.then(function(){
			return deployer.deploy(
				LongTerm, 
				TestERC20Token.address,
				accounts[0]);
		});
    }
};