// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SecureVoting is ReentrancyGuard {
    constructor() {
        admin = msg.sender;
    }
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    address public admin;

    mapping(address voterAddress=> bool registeredFlag) public registeredVoters;

    Candidate[] public candidates;

    event VoterRegistered(address voterAddress);
    event CandidateAdded(string name, uint256 index);
    event Voted(address voter, uint256 candidateIndex);

    function registerVoter(address _voter) external onlyAdmin {
        require(registeredVoters[_voter] == false, "Voter is already registered");
        registeredVoters[_voter] = true;
        emit VoterRegistered(_voter);
    }

    function addCandidate(string memory _name) external onlyAdmin {
        candidates.push(Candidate({name: _name, voteCount: 0}));
        emit CandidateAdded(_name, candidates.length - 1);
    }

    function vote(uint256 _candidateIndex) external onlyRegisteredVoter nonReentrant {
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        candidates[_candidateIndex].voteCount += 1;
        emit Voted(msg.sender, _candidateIndex);
    }

    function getCandidates() external view returns (Candidate[] memory) {
        return candidates;
    }

    function getVoteCount(uint256 _candidateIndex) external view returns (uint256) {
        require(_candidateIndex < candidates.length, "Invalid candidate index");
        return candidates[_candidateIndex].voteCount;
    }
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(registeredVoters[msg.sender], "You are not a registered voter");
        _;
    }
}


// Deployed contract address in Sepolia:
// 0x592c9e09497cc2cccbefc975466008be4d6d9bbd

// Transaction address:
// https://sepolia.etherscan.io/tx/0x50d7cb202e3f6802ecdbcf4a75fe089c06cec26ac2291b034e698e5d3fb61496
