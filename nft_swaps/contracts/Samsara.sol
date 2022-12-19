//SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
//onlyOwner

contract Samsara is ERC721, ERC721URIStorage, Ownable{

    using Counters for Counters.Counter;

    uint256[] public tokenIdsOwnedByThis;

    mapping(address=> uint64) public numberOfSwaps;

    uint256 public tokensOwnedbyThis=0;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Samsara", "SMR") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        //basically internal tracking
    }
    function dropOwnership(uint256 tokenId)public payable{
        //to transfer the token to 0x00 address
        _transfer(
            msg.sender, 
            address(this),
            tokenId
        );
        //to ensure the tokenId in transferBackTo is not the same as this one
        tokenIdsOwnedByThis.push(tokenId);
        //transferBackTo(msg.sender);
        tokensOwnedbyThis++;
        numberOfSwaps[msg.sender] += 1;
    }
    function transferBackTo(address reciever, uint64 tokenId) public onlyOwner{
        //using js randomness
        _transfer(address(this),
            reciever,
            tokenId
        );
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}