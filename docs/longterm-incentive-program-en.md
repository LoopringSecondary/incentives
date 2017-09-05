# LRC Long-term Incentive Program

Loopring Foundation will launch“**Two Incentive Programs**”in order to motivate mid-term and long-term investors in the community.

## About Loopring Protocol
Loopring Protocol is a a decentralized automated execution system that trades across the crypto-token exchanges, shielding users from counterparty risk and reduce the cost of trading. By essentially rising the liquidity of cryptocurrencies, we are building the financial system of the future. Please visit our website for more info[https://loopring.org](https://loopring.org).



## Incentive Program

### Contract
The program will be executed through smart-contract on Ethereum network. Smart contract address：

    0x239dE3a0D6ca5f21601f83327eA2174225eB7156

ENS Address：[longterm.lrctoken.eth](https://etherscan.io/address/longterm.lrctoken.eth)。
    
The smart contract has been [etherscan.io](https://etherscan.io/address/longterm.lrctoken.eth#code)[Source Code Verified](https://etherscan.io/address/longterm.lrctoken.eth#code)，We are looking for community volunteers to help to further review。**The participartion is voluntarily for the program in accordance with smart contract code. There are risks associated with the smart contract.**。


### Rule


- Long-term program started at 2017.Aug.30 18:00pm (Beijing time)
- Loopring Foundation have deposited 5,000,000 LRC bonus into the smart contract. Foundation may add more LRC tokens into program. 
- Do not transfer LRC from your own wallet to the program address directly. You must authorize it first. Please follow the step A carefully. Foundation will not be able to get your token back if the reason is your misconduction. 
- Long-term program lasts 60 days. Any LRC deposit after 60 days will donate to the Foundation.
- Participator cannot withdraw LRC within 18 months. Withdraw period will open from the 18th month to 36th month. Participator can fully or partially withdraw the LRC token within this period of time. After the withdraw period ends. All the LRC tokens in the program address will be considered as a donation to the foudnation. 
- Program activates after you transfer the LRC to smart contract address.
- The interst rate is depending on your deposit time. The longer time you deposit, the higher interest rate you receive.
- Participation is free of charge. 
- Program is not capped, everyone can participate expect Foundation members.

Foundation reserve the right of final interpretation. This instruction is imperfect. Please review the smart contract code before your participation.

## Bouns Distribution

We estimate 100 million LRC tokens will participate the long-term program. Hypothetically total amount is 100 million LRC tokens, Thus the average interest rate will be：**5,000,000/100,000,000 = 5%**。In order to motivate long-term investors，the interest rate varies with the legth of the time. The longer time, the higher rate. (Diagram Below)

![](images/roi.jpg)

Note：Interest rate will depend on the amount of your withdraw accordingly.

## Participation

### Deposit LRC

Two Steps to participate. 

1. Use LRC smart contract to authorize ERC20 - Do not send LRC indrectly from your crypto wallet or crypto-exchange.Refer to **Step A**。
2. Sned 0 Ether to incentive program's smart contract address. Refer to **Step C**。

### LRC Withdraw

For full amount withdraw after 18 months. You can just simply send 0 Ether to the incentive program's smart contract address. LRC will be send back you soon after. Refer to Step C.
For partial withdraw after 18 months，Please refer to**Step C**Set ETH in "Amount to Send" as X，then program will send you back -> X * 10,000,000 units LRC + the bonus LRC. For example if you transfer 1,000,000 LRC into our longterm program and you want to withdraw 100,000 LRC after 18 months. Therefore, you just send (100,000/10,000,000) 0.1 ETH to program smart contract address. Then we will send you 0.1ETH + 100,000LRC + Bonus LRC back all together.

## Instruction

### Step A - LRC Authorization 

1. Open MyEtherWallet（[https://www.myetherwallet.com](https://www.myetherwallet.com)）Click "Contract”.
![](images/1.jpg)


2. Type`lrctoken.eth in “Contract Address”`;
3. Open a new window for [LRC-SmartContract ABI page](http://api.etherscan.io/api?module=contract&action=getabi&address=0xef68e7c694f40c8202821edf525de3782458639f&format=raw)，
4. Go to "MyEtherWallet" page，Copy and paste the code from"LRC-SmartContract ABI page" TO “ABI / JSON Interface”，then Click“Access”.
5. Below the “Read / Write Contract”，Click “Select a function" and Choose "approve".
6. Input contract address`0x239dE3a0D6ca5f21601f83327eA2174225eB7156`at“_spender” ,
7. Put the number of the LRC tokens you want to participate at “_value”，then add on eighteen `0`. For Example: if you want to participate 50000 LRC tokens. Input`50000000000000000000000`（Total number of Zero input:4+18=22）。
8. Access your wallet，Input the keys -> unlock，Click “Write”，send transaction. 

Alternatively, you can also use Ethereum official wallet to authorize ERC20. 

### Step B - Confrim LRC Authorization
1. Visit[LRC SmartContract page](https://etherscan.io/token/0xEF68e7C694F40c8202821eDF525dE3782458639f#readContract).

 ![](images/2.jpg)

2. At 21st line “_owner”box -> Input your ETH address，“_spender”box ->`0x239dE3a0D6ca5f21601f83327eA2174225eB7156 `，Click“Query”.
3. The output number equals to number of LRC you participate * 1000000000000000000.


### Step C - LRC transfer Execution 
1. Open MyEtherWallet（[https://www.myetherwallet.com](https://www.myetherwallet.com)）Click “Send Ether/Tokens”.
2. Access your wallet with the key，unlock。

 ![](images/3.jpg)
 
3. At the “To Address”line，Input`0x239dE3a0D6ca5f21601f83327eA2174225eB7156 `；Amount to send must be`0`，leave the rest as defaulted setting. Click“Generate Transaction”.

 ![](images/4.jpg)

4. If you follow above instruction correctly，Your authorized LRC will be transferred to the incentive program.
5. If you want to withdraw the LRC tokens. The earliest time will be 18 months from participating date.



