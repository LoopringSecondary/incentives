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
pragma solidity 0.4.18;


/// @title LRC Foundation Airdrop Address Binding Contract
/// @author Kongliang Zhong - <kongliang@loopring.org>,
contract AirdropAddressBind {

    mapping(address => mapping(uint8 => string)) public addressBindingMap;

    event AddressBinded(uint8 projectId, string addr, address sender);

    function bind(uint8 projectId, string addr)
        external
    {
        var bindings = addressBindingMap[msg.sender];
        bytes memory existBinding = bytes(bindings[projectId]);
        require(existBinding.length == 0);

        addressBindingMap[msg.sender][projectId] = addr;

        AddressBinded(projectId, addr, msg.sender);
    }

    function unbind(uint8 projectId)
        external
    {
        delete addressBindingMap[msg.sender][projectId];
    }

    function getBindingAddress(address owner, uint8 projectId) returns (string) {
        return addressBindingMap[owner][projectId];
    }
}
