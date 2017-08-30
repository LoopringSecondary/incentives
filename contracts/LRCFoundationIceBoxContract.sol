/*

  Copyright 2017 Loopring Project Ltd (Loopring Foundation).

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/
pragma solidity ^0.4.11;

import 'zeppelin/math/SafeMath.sol';
import 'tokens/contracts/Token.sol';

/// @title LRC Foundation Icebox Program
/// @author Daniel Wang - <daniel@loopring.org>.
/// For more information, please visit https://loopring.org.

/// Loopring Foundation's LRC (20% of total supply) will be locked during the first two years，
/// two years later, 1/24 of all locked LRC fund can be unlocked every month.

contract LRCFoundationIceboxContract {
    using SafeMath for uint;
    
    uint public constant FREEZE_PERIOD = 720 days; // = 2 years

    address public lrcTokenAddress  = 0x0;
    address public owner            = 0x0;

    uint public lrcInitialBalance   = 0;
    uint public lrcWithdrawn         = 0;
    uint public lrcUnlockPerMonth   = 0;
    uint public startTime           = 0;

    /* 
     * EVENTS
     */

    /// Emitted when program starts.
    event Started(uint _time);

    /// Emitted for each sucuessful deposit.
    uint public withdrawId = 0;
    event Withdrawal(uint _withdrawId, uint _lrcAmount);

    /// @dev Initialize the contract
    /// @param _lrcTokenAddress LRC ERC20 token address
    /// @param _owner Owner's address
    function LRCFoundationIceboxContract(address _lrcTokenAddress, address _owner) {
        require(_lrcTokenAddress != address(0));
        require(_owner != address(0));

        lrcTokenAddress = _lrcTokenAddress;
        owner = _owner;
    }

    /*
     * PUBLIC FUNCTIONS
     */

    /// @dev start the program.
    function start() public {
        require(msg.sender == owner);
        require(startTime == 0);

        lrcInitialBalance = Token(lrcTokenAddress).balanceOf(address(this));
        require(lrcInitialBalance > 0);

        lrcUnlockPerMonth = lrcInitialBalance.div(24); // 24 month
        startTime = now;

        Started(startTime);
    }


    function () payable {
        require(msg.sender == owner);
        require(msg.value == 0);
        require(startTime > 0);
        require(now > startTime + FREEZE_PERIOD);

        var token = Token(lrcTokenAddress);
        uint balance = token.balanceOf(address(this));
        require(balance > 0);

        uint lrcAmount = calculateLRCUnlockAmount(now, balance);
        if (lrcAmount > 0) {
            lrcWithdrawn += lrcAmount;

            Withdrawal(withdrawId++, lrcAmount);
            require(token.transfer(owner, lrcAmount));
        }
    }


    /*
     * INTERNAL FUNCTIONS
     */

    function calculateLRCUnlockAmount(uint _now, uint _balance) internal returns (uint lrcAmount) {
        uint unlockable = (_now - startTime - FREEZE_PERIOD)
            .div(30 days)
            .mul(lrcUnlockPerMonth) - lrcWithdrawn;

        require(unlockable > 0);

        if (unlockable > _balance) return _balance;
        else return unlockable;
    }

}