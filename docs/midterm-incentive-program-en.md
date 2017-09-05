# LRC Mid-term Incentive Program

Loopring Foundation will launch“Two Incentive Programs”in order to motivate mid-term and long-term investors in the community.

## About Loopring Protocol
Loopring Protocol is a a decentralized automated execution system that trades across the crypto-token exchanges, shielding users from counterparty risk and reduce the cost of trading. By essentially rising the liquidity of cryptocurrencies, we are building the financial system of the future. Please visit our website for more infohttps://loopring.org.


## Incentive Program

### Contract
The program will be executed through smart-contract on Ethereum network. Smart contract address：

    0x8b34FbC553db3462Ad4909f2e5577cc22f63c216

ENS Address：[midterm.lrctoken.eth](https://etherscan.io/address/midterm.lrctoken.eth)。
    
The smart contract has been[etherscan.io](https://etherscan.io/address/midterm.lrctoken.eth#code) [Verifed] (https://etherscan.io/address/midterm.lrctoken.eth#code)，We are looking for community volunteers to help for further review。The participation is voluntarily for the program in accordance with smart contract code. There are risks associated with the smart contract.

### Rule

- Mid-term program started at 2017.Aug.30 18:00pm (Beijing time)and last 60 days. Participator can exchange LRC to ETH with a fixed rate of 7500LRC:1ETH.
- Loopring Foundation have deposited 5000ETH（Foundation could deposit more ETH.）。
- Do not transfer LRC from your own wallet to the program address directly. You must authorize it first. Please follow the step A carefully. Foundation will not be able to get your token back if the reason is your misconduction.
- Participator cannot withdraw LRC within 6 months. Withdraw period will open from the 6th month to 9th month. For redeem, just send ETH from your ERC20 supproted wallet to the program smart contract address. LRC you will be return to you once ETH receive. After the withdraw period ends. All the LRC tokens in the program address will be considered as a donation to the foundation.
- Program activates after you transfer the LRC to smart contract address. The faster you start to participate, the earlier you can you withdraw.
- Each address can deposit MAX. 150,000LRC & will receive 20ETH，Participation is free of charge.
- Everyone can participate expect Foundation members.

Foundation reserves the right of final interpretation. This instruction is imperfect. Please review the smart contract code before your participation.

## Participation

### Deposit LRC and receive ETH

Two Steps to participate.

1. Use LRC smart contract to authorize ERC20 - Do not send LRC indrectly from your crypto wallet or crypto-exchange.Refer to Step A。
2. Sned 0 Ether to incentive program's smart contract address. Refer to Step C。

### Return ETH and receive LRC

You can return your ETH between 6th month to 9th month. Just send back ETH from your original ETH send address to the program smart contract address.


## Instruction

### Step A - LRC Authorization

1. Open MyEtherWallet（https://www.myetherwallet.com）Click "Contract”. 
![](images/1.jpg)


2. Type `lrctoken.eth` into “Contract Address”;
3. Open a new window for [LRC smart contract ABI](http://api.etherscan.io/api?module=contract&action=getabi&address=0xef68e7c694f40c8202821edf525de3782458639f&format=raw)，Copy the whole code.
4. Return to MyEtherWallet，Copy and paste the code from"LRC-SmartContract ABI page" to “ABI / JSON Interface”，then Click“Access”.
5. Below the “Read / Write Contract”，Click “Select a function" and Choose "approve".
6. Input contract address`0x8b34FbC553db3462Ad4909f2e5577cc22f63c216` in “_spender”,
7. Put the number of the LRC tokens you want to participate at “_value”，then add on eighteen 0. For Example: if you want to participate 50000 LRC tokens. Input50000000000000000000000（Total number of Zero input:4+18=22）
8. Access your wallet，Input the keys -> unlock，Click “Write”，send transaction.

Alternatively, you can also use Ethereum official wallet to authorize ERC20.

### Step B - Confrim LRC Authorization
1. Visit [LRC smart contract](https://etherscan.io/token/0xEF68e7C694F40c8202821eDF525dE3782458639f#readContract)。

 ![](images/2.jpg)

2. At 21st line “_owner”box -> Input your ETH address，“_spender”box ->`0x8b34FbC553db3462Ad4909f2e5577cc22f63c216 `，Click“Query”.
3. The output number equals to number of LRC you participate * 1000000000000000000.


### Step C - LRC transfer Execution
1. Open MyEtherWallet（https://www.myetherwallet.com）Click “Send Ether/Tokens”.
2. ccess your wallet with the key，unlock 

 ![](images/3.jpg)
 
3. At the “To Address”line，Input`0x8b34FbC553db3462Ad4909f2e5577cc22f63c216 `；Amount to send must be 0 ETH，leave the rest as defaulted setting. Click“Generate Transaction”.

 ![](images/5.jpg)

4. If you follow above instruction correctly，Your authorized LRC will be transferred to the incentive program.
5. If you want to withdraw the LRC tokens. The earliest time will be 6 months from participating date.

