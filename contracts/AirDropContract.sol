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

contract AirDropContract {
    using SafeMath for uint;
    
    address public constant lrcTokenAddress  = 0xEF68e7C694F40c8202821eDF525dE3782458639f;
    uint public constant decimalfactor   = 1000000000000000000;
    uint public constant maxDropAmount = 100;

    /* 
     * EVENTS
     */

    /// Emitted when program starts.
    event AirDropped(address addr, uint amount);

    /*
     * PUBLIC FUNCTIONS
     */

    function drop(
      address[] recipients,
      uint[]    amounts) public {

      require(recipients.length == amounts.length);

      var lrc = Token(lrcTokenAddress);

      uint balance = lrc.balanceOf(msg.sender);
      uint allowance = lrc.allowance(msg.sender, address(this));
      uint available = balance > allowance ? allowance : balance;

      for (uint i = 0; i < recipients.length; i++) {
        address recipient = recipients[i];
        require(recipient != 0x0);

        uint amount = amounts[i];
        require(amount <= maxDropAmount && amount > 0);

        if (lrc.balanceOf(recipient) == 0) {
          uint realAmount = amount * decimalfactor;
          require(available >= realAmount);

          available -= realAmount;
          require(lrc.transferFrom(msg.sender, address(this), realAmount));

          AirDropped(recipient, amount);
        }
      }
    }


    function () payable {
        revert();
    }
}