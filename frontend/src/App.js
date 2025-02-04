import React, { useState, useEffect } from "react";
import Web3 from "web3";

const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const abi = [
  { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" },
  { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "name", "type": "string" }, { "indexed": false, "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "CandidateAdded", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "voter", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "candidateIndex", "type": "uint256" }], "name": "Voted", "type": "event" },
  { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "voterAddress", "type": "address" }], "name": "VoterRegistered", "type": "event" },
  { "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }], "name": "addCandidate", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "candidates", "outputs": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [], "name": "getCandidates", "outputs": [{ "components": [{ "internalType": "string", "name": "name", "type": "string" }, { "internalType": "uint256", "name": "voteCount", "type": "uint256" }], "internalType": "struct SecureVoting.Candidate[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_candidateIndex", "type": "uint256" }], "name": "getVoteCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "_voter", "type": "address" }], "name": "registerVoter", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
  { "inputs": [{ "internalType": "address", "name": "voterAddress", "type": "address" }], "name": "registeredVoters", "outputs": [{ "internalType": "bool", "name": "registeredFlag", "type": "bool" }], "stateMutability": "view", "type": "function" },
  { "inputs": [{ "internalType": "uint256", "name": "_candidateIndex", "type": "uint256" }], "name": "vote", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

function App() {

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [voterAddress, setVoterAddress] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [candidateIndex, setCandidateIndex] = useState('');
  // const [voteIndex, setVoteIndex] = useState('');
  const [getVoteIndex, setGetVoteIndex] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [voteCount, setVoteCount] = useState('');

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);
        setWeb3(web3Instance);
        setContract(contractInstance);
      } else {
        alert('Please install MetaMask!');
      }
    };
    initWeb3();
  }, []);

  const registerVoter = async () => {
    if (!web3.utils.isAddress(voterAddress)) {
      alert('Invalid Ethereum address!');
      return;
    }
    const accounts = await web3.eth.getAccounts();
    await contract.methods.registerVoter(voterAddress).send({ from: accounts[0] });
    alert('Voter registered successfully!');
  };

  const addCandidate = async () => {
    if (!candidateName) {
      alert('Candidate name cannot be empty!');
      return;
    }
    const accounts = await web3.eth.getAccounts();
    await contract.methods.addCandidate(candidateName).send({ from: accounts[0] });
    alert('Candidate added successfully!');
  };

  const vote = async () => {
    if (!candidateIndex || isNaN(candidateIndex) || candidateIndex < 0) {
      alert('Please enter a valid candidate index!');
      return;
    }
    if (candidateIndex >= candidates.length) {
      alert('Invalid candidate index! No such candidate exists.');
      return;
    }
    const accounts = await web3.eth.getAccounts();
    await contract.methods.vote(candidateIndex).send({ from: accounts[0] });
    alert('Vote submitted successfully!');
  };

  const getVoteCount = async () => {
    if (!getVoteIndex || isNaN(getVoteIndex) || getVoteIndex < 0) {
      alert('Please enter a valid candidate index!');
      return;
    }
    const count = await contract.methods.getVoteCount(getVoteIndex).call();
    setVoteCount(`Vote Count: ${count}`);
  };

  const displayCandidates = async () => {
    const fetchedCandidates = await contract.methods.getCandidates().call();
    if (fetchedCandidates.length === 0) {
      alert('No candidates have been added yet!');
      return;
    }
    setCandidates(fetchedCandidates);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Secure Voting DApp</h1>

      <div className="mb-4">
        <h2>Register as a Voter</h2>
        <input type="text" className="form-control" placeholder="Enter voter address" value={voterAddress} onChange={(e) => setVoterAddress(e.target.value)} />
        <button className="btn btn-primary mt-2" onClick={registerVoter}>Register Voter</button>
      </div>

      <div className="mb-4">
        <h2>Add Candidate</h2>
        <input type="text" className="form-control" placeholder="Enter candidate name" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} />
        <button className="btn btn-success mt-2" onClick={addCandidate}>Add Candidate</button>
      </div>

      <div className="mb-4">
        <h2>Vote for a Candidate</h2>
        <input type="number" className="form-control" placeholder="Enter candidate index" value={candidateIndex} onChange={(e) => setCandidateIndex(e.target.value)} />
        <button className="btn btn-warning mt-2" onClick={vote}>Vote</button>
      </div>

      <div className="mb-4">
        <h2>Get Vote Count</h2>
        <input type="number" className="form-control" placeholder="Enter candidate index" value={getVoteIndex} onChange={(e) => setGetVoteIndex(e.target.value)} />
        <button className="btn btn-info mt-2" onClick={getVoteCount}>Get Vote Count</button>
        {voteCount !== null && <p className="mt-2">Vote Count: {voteCount}</p>}
      </div>

      <div className="mb-4">
        <h2>Candidates List</h2>
        <button className="btn btn-dark mt-2" onClick={displayCandidates}>Display Candidates</button>
        <ul className="list-group mt-2">
          {candidates.length > 0 ? candidates.map((candidate, index) => (
            <li key={index} className="list-group-item">{index}: {candidate.name} - Votes: {candidate.voteCount}</li>
          )) : <li className="list-group-item">No candidates found.</li>}
        </ul>
      </div>
    </div>
  );
}

export default App;
