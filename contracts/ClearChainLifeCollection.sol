// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../client/node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../client/node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ClearChainLifeCollection is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //"https://gateway.pinata.cloud/ipfs/QmYQsD54CU4PvY4Zw9LzGtb4tVaZZ4ippDR6EPxHkZZQcM"

    constructor() ERC721("Clear Chain Life Collection", "CCLC") {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
