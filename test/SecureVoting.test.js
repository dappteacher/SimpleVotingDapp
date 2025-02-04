const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SecureVoting", function () {
    let Voting, voting, owner, voter1, voter2, voter3;

    beforeEach(async function () {
        [owner, voter1, voter2, voter3] = await ethers.getSigners();
        Voting = await ethers.getContractFactory("SecureVoting");
        voting = await Voting.deploy(); // No need for .deployed()
    });

    it("Should register voters", async function () {
        await voting.registerVoter(voter1.address);
        expect(await voting.registeredVoters(voter1.address)).to.be.true;
    });

    it("Should add candidates", async function () {
        await voting.addCandidate("Alice");
        const candidates = await voting.getCandidates();
        expect(candidates.length).to.equal(1);
        expect(candidates[0].name).to.equal("Alice");
    });

    it("Should allow a registered voter to vote multiple times", async function () {
        await voting.registerVoter(voter1.address);
        await voting.addCandidate("Alice");

        await voting.connect(voter1).vote(0);
        await voting.connect(voter1).vote(0); // Voting again

        const voteCount = await voting.getVoteCount(0);
        expect(voteCount).to.equal(2); // Should be 2 since voter1 voted twice
    });

    it("Should not allow unregistered voters to vote", async function () {
        await voting.addCandidate("Alice");

        await expect(voting.connect(voter2).vote(0)).to.be.revertedWith("You are not a registered voter");
    });

    it("Should fetch the correct vote count for candidates", async function () {
        await voting.registerVoter(voter1.address);
        await voting.registerVoter(voter2.address);
        await voting.addCandidate("Alice");

        await voting.connect(voter1).vote(0);
        await voting.connect(voter2).vote(0);

        expect(await voting.getVoteCount(0)).to.equal(2);
    });

    it("Should fetch the list of candidates", async function () {
        await voting.addCandidate("Alice");
        await voting.addCandidate("Bob");

        const candidates = await voting.getCandidates();
        expect(candidates.length).to.equal(2);
        expect(candidates[0].name).to.equal("Alice");
        expect(candidates[1].name).to.equal("Bob");
    });

    it("Should revert if an invalid candidate index is voted for", async function () {
        await voting.registerVoter(voter1.address);
        await expect(voting.connect(voter1).vote(5)).to.be.revertedWith("Invalid candidate index");
    });
});
