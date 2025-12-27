// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MembershipNFT is ERC721, Ownable {
    uint256 public constant PRICE = 0.05 ether;
    uint256 private _tokenIdCounter;

    // 👇 Pass msg.sender as the initial owner
    constructor()
        ERC721("Membership NFT", "MNFT")
        Ownable(msg.sender)
    {}

    function mintMembership() external payable {
        require(msg.value == PRICE, "Incorrect ETH amount");

        _tokenIdCounter++;
        _safeMint(msg.sender, _tokenIdCounter);
    }
}
