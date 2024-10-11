// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Certification is Ownable {

    struct Crop {
        string name;
        address farmer;
        bool certified;
    }

    mapping(uint256 => Crop) public crops;

    constructor() {

    }

    function getCertification(uint _cropId, string memory _name) public {
        crops[_cropId] = Crop(_name, msg.sender, false);
    }

    function certifyCrop(uint256 _cropId) public onlyOwner {
        crops[_cropId].certified = true;
    }

    // Optional: Function to retrieve crop details (public by default for mappings)
    function getCrop(uint256 _cropId) public view returns (string memory, address, bool) {
        Crop memory crop = crops[_cropId];
        return (crop.name, crop.farmer, crop.certified);
    }
}