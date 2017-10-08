# LRC Long-term Incentive Program

The Loopring Foundation offers two interest-earning incentive programs in order to encourage long-term and mid-term investment in Loopring and its community.

Each plan requires investors to deposit their LRC tokens into an Ethereum smart contract for a specified time period, during which time the tokens may not be withdrawn for any reason. At the end of the holding period, investors may withdraw the value of their deposited tokens + any interest earned. There is no limit to the number of LRC tokens you can invest in either plan.

> **[OPEN FOR PARTICIPATION]** The [Long-term Incentive Program](http://incentives.loopring.org/longterm-incentive-program-en.html) has a minimum holding period of 18 months. Tokens may be withdrawn at any time between 18 months - 36 months from time of original deposit.


> **[TEMPORARILY SUSPENDED]** The [Mid-term Incentive Program](http://incentives.loopring.org/midterm-incentive-program-en.html) has a minimum holding period of 6 months. Tokens may be withdrawn at any time between 6 months - 9 months from time of original deposit.

### About the Loopring Protocol

The Loopring Protocol is a decentralized automated execution system that trades across the crypto-token exchanges, shielding users from counterparty risk and reducing the cost of trading. By essentially raising the liquidity of cryptocurrencies, we are building the financial system of the future. Please visit our website for more info.

## Disclaimer

Participation in these incentive programs is completely voluntary and the estimated interest rate of return is not guaranteed. By investing in the program, investors acknowledge and accept all risks associated with participating in a smart contract.

## Smart Contract
The program will be executed through a smart contract on Ethereum network. The smart contract address is: `0x239dE3a0D6ca5f21601f83327eA2174225eB7156 `

ENS address: `longterm.lrctoken.eth`

The smart contract code has been [etherscan verified](https://etherscan.io/address/longterm.lrctoken.eth#code). We welcome volunteers from the community to further review the contract code.

##Program Rules

 1. The long-term incentive program started on **August 30, 2017 - 18:00pm (Beijing time)**.
 2. The program's participation will be open for 60 days, ending on **October 29, 2017 - 18:00pm (Beijing time)**. Any tokens deposited after this time will be donated to the Loopring Foundation.
 3. The Foundation has already deposited 5 million LRC tokens into the smart contract. The Foundation may choose to add additional LRC tokens at any time.
 4. **Do not transfer LRC tokens from your wallet to the smart contract directly.** You must authorize and confirm the transfer first (instructions below). Please follow each step carefully as the Foundation will not be able to recover your tokens if any mistakes are made.
 5. Participants may not withdraw their LRC tokens for 18 months from the date of their original token deposit(s). The token withdraw period will open from the 18th month to 36th month. Participants may withdraw their tokens in partial or in full during this time. Any tokens still remaining in the program after the 36th month will be donated to the Foundation.
 6. You are solely responsible for tracking the timing of your withdrawal eligibility period as you will not receive any reminders from the Foundation.
 7. There are no fees associated with participating in this program.
 8. The total number of LRC tokens deposited by investors will not be capped. Everyone is able to participate with the exception of Foundation members.
 
> The Loopring Foundation reserves the right of final decision on the interpretation of the program rules. Please be sure to review this page and its instructions carefully before participating in the program.

## Rate of Return and Bonus Distribution Explanation

We estimate that 100 million tokens will be deposited into the long-term incentive program. Based on this estimation and a total of 5 million tokens deposited by the Foundation, there will be an estimated 5% rate of return.

![LTIP_Return_Example](https://i.imgur.com/7QVgLCT.jpg)

In order to provide an additional long-term holding incentive, the rate of return may increase if tokens are held longer than the minimum 18 month holding period. The longer the holding period (up to a maximum of 36 months), the higher the estimated rate of return.

![LTIP_Return_Example_2](https://i.imgur.com/dwGgVeY.jpg)

>Note: Individual rates of return will depend on the amount of tokens deposited and timing of withdrawal.


## Instructions To Deposit Your LRC Tokens

### Step A) Authorize the LRC token transfer

The instructions below are for using MyEtherWallet, but you may also use the Ethereum official wallet to authorize the LRC token transfer.

>**CAUTION!** Follow the instructions carefully and DO NOT send your LRC tokens straight to the smart contract without first authorizing and confirming the transfer.

1. Open your [MyEtherWallet](https://www.myetherwallet.com/ "MyEtherWallet") and select the **Contract** tab.

    ![MEW_A](https://i.imgur.com/XdozxNW.jpg)


2. Type `lrctoken.eth` in the **Contract Address** field.

    ![MEW_B](https://i.imgur.com/w2yZc7H.jpg)

3. Open a new web browser window and go to the [LRC-Smart Contract ABI webpage](http://api.etherscan.io/api?module=contract&action=getabi&address=0xef68e7c694f40c8202821edf525de3782458639f&format=raw "LRC-Smart Contract ABI"). Copy and paste the code from this page into the **ABI / JSON Interface** field and then click **Access**.

    ![MEW_C](https://i.imgur.com/H4FCS0C.jpg)

4. Under **Read / Write Contract**, click the **Select a function** drop-down and select **Approve**.

    ![MEW_D](https://i.imgur.com/Kge4mED.jpg)

5. Copy the contract address `0x239dE3a0D6ca5f21601f83327eA2174225eB7156` in the **\_spender** address field.

    ![MEW_E](https://i.imgur.com/CHQLlm0.jpg)

6. Enter the number of LRC tokens that you wish to deposit in the **\_value** field.

    > **IMPORTANT!** You must add 18 zeros to the end of the number of tokens that you wish to deposit.

    **Example**
    
    If you wish to deposit a total of 70,000 tokens, you should input 70000000000000000000000 (700000 + 18 zeros).
    
    ![MEW_F](https://i.imgur.com/VbxDRhH.jpg)

7. Access your wallet and then click **Write**.

    ![MEW_G](https://i.imgur.com/xX9KHNi.jpg)

8. Set the **Amount to Send** at "0" and the **Gas Limit** at the default value, then click **Generate Transaction**.

    ![MEW_H](https://i.imgur.com/Qb1dJ40.jpg)

9. Click **Yes, I am sure! Make Transaction** to authorize the LRC token transfer.

    ![MEW_I](https://i.imgur.com/c1Uyo6W.jpg)

10. You can verify the status of the transaction by clicking on the **View your Transaction** link in the confirmation box. Once your transaction status has changed from *"(pending)"* to a confirmed block #, you can move onto the next step.

    ![Verify_Transaction_A](https://i.imgur.com/1wK1Msd.jpg)

### Step B) Confirm the transfer authorization

1. Visit the [LRC Smart Contract page](https://etherscan.io/token/0xEF68e7C694F40c8202821eDF525dE3782458639f#readContract "LRC Smart Contract").

    ![SC_A](https://i.imgur.com/CCMIBti.jpg)

2. Input your Ethereum wallet address in the **21. > allowance** row under the **\_owner (address)** field. Next, copy the contract address `0x239dE3a0D6ca5f21601f83327eA2174225eB7156` into the **\_spender** (address) field and click **query**.

    Verify that the number of LRC tokens you authorized for transfer (from Step A) matches the returned value.

    ![SC_B](https://i.imgur.com/gALATUt.jpg)

### Step C) Execute the LRC token transfer

1. Open your [MyEtherWallet](https://www.myetherwallet.com/ "MyEtherWallet") and select the **Send Ether & Tokens** tab. Unlock your wallet.

    ![MEW_J](https://i.imgur.com/UfQVDDp.jpg)

2. Copy the contract address `0x239dE3a0D6ca5f21601f83327eA2174225eB7156` into the **To Address** field. Next set the **Amount to Send** to "0" and be sure to select "LRC" token from the drop down box.

    > Note: We recommend that you use a Gas Limit of at least "90000" to ensure your transaction will be processed successfully. You must have some Ether in your wallet to pay for the Gas fee or your transfer will not be processed.

    Click **Generate Transaction** to initiate the transfer.

    ![MEW_K](https://i.imgur.com/rXGCHlD.jpg)

3. Click **Yes, I am sure! Make Transaction** to finalize the token transfer.

    ![MEW_L](https://i.imgur.com/kOdtaFM.jpg)

4. **CONGRATULATIONS!** Your LRC tokens are now invested in the long-term incentive program.
    
    You can verify the status of the transaction by clicking on **Check TX Status** in the confirmation box. Once your transaction status has changed from "(pending)" to a confirmed block #, your tokens have been successfully invested in the program.


    ![Verify_Transaction_B](https://i.imgur.com/cLwNyFg.jpg)

## Instructions To Withdraw Your LRC Tokens (after a minimum of 18 months)

### Full Token Withdrawal

To withdraw the full amount LRC tokens deposited, simply send "0" Ether to the smart contract address `0x239dE3a0D6ca5f21601f83327eA2174225eB7156`.

>Note: We recommend that you use a Gas Limit of at least "90000" to ensure your transaction will be processed successfully. You must have some Ether in your wallet to pay for the Gas fee or your transfer will not be processed.

Upon completing the transaction, the program will send your wallet address the original deposited tokens + any additional tokens earned through interest.

![MEW_N](https://i.imgur.com/1AJGwLS.jpg)

### Partial Token Withdrawal

To withdraw a partial amount of tokens, you will need to send a calculated amount of Ether to the smart contract address. The smart contract will return your tokens based on the following formula where X represents the calculated amount of Ether.

`X * 10,000,000 LRC tokens + any additional tokens earned through interest`

To calculate the amount of Ether required for a partial withdrawal, use the formula below:

![LRIP_Withdrawal_Example](https://i.imgur.com/aLw2QnH.jpg)

### Example
If you originally deposited 1,000,000 tokens into the long-term program, but only wanted to withdraw 100,000 of them after 18 months, you would calculate [100,000/10,000,000 = .01] and send .01 ETH to the smart contract.

>Note: We recommend that you use a Gas Limit of at least "90000" to ensure your transaction will be processed successfully. You must have some Ether in your wallet to pay for the Gas fee or your transfer will not be processed.

The program will send your wallet address .01 ETH + 100,000 tokens + any additional tokens earned through interest.
