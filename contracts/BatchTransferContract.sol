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
import 'zeppelin/math/Math.sol';

/// @title Loopring Refund Program
/// @author Kongliang Zhong - <kongliang@loopring.org>.
/// For more information, please visit https://loopring.org.
contract BatchTransferContract {
    using SafeMath for uint;
    using Math for uint;

    address public owner;

    function BatchTransferContract(address _owner) public {
        owner = _owner;
    }

    function () payable {
        // do nothing.
    }

    function batchRefund(address[] investors, uint[] ethAmounts) public payable {
        require(msg.sender == owner);
        require(investors.length > 0);
        require(investors.length == ethAmounts.length);

        uint total = 0;
        for (uint i = 0; i < investors.length; i++) {
            total += ethAmounts[i];
        }

        require(total <= this.balance);

        for (i = 0; i < investors.length; i++) {
            if (ethAmounts[i] > 0) {
                investors[i].transfer(ethAmounts[i]);
            }
        }
    }

    function drain(uint ethAmount) public payable {
        require(msg.sender == owner);

        uint amount = ethAmount.min256(this.balance);
        if (amount > 0) {
          owner.transfer(amount);
        }
    }

}
