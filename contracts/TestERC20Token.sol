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

import 'tokens/contracts/StandardToken.sol';
import 'zeppelin/math/SafeMath.sol';


/// @title A ERC20 Token for Testing.
/// For more information about this token sale, please visit https://loopring.org
/// @author Daniel Wang - <daniel@loopring.org>.
contract TestERC20Token is StandardToken {
    using SafeMath for uint;
    
    string public constant name     = "TestERC20Token";
    string public constant symbol   = "TST";
    uint   public constant decimals = 18;

    function TestERC20Token() {}

    /// @dev Issue token.
    function setBalance(address recipient, uint balance) public {
        require(balance >= 0);

        uint prevBalance = balances[recipient];
        balances[recipient] = balance;
        totalSupply += (balance - prevBalance);
    }
}

