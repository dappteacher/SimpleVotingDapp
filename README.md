# Simple Voting DApp

## Overview
SimpleVotingDApp is a decentralized application (DApp) that allows users to vote securely on a blockchain network. This project is built using Solidity for smart contracts and integrates with a web-based frontend for user interaction.

## Features
- Smart contract-based voting system
- Secure and tamper-proof votes
- Web3 integration for interacting with the blockchain
- Simple and user-friendly interface

## Tech Stack
- **Smart Contracts:** Solidity
- **Frontend:** JavaScript, HTML, CSS , Bootstrap and React
- **Blockchain Interaction:** Web3.js
- **Development Environment:** Hardhat/Truffle

## Installation

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MetaMask](https://metamask.io/) (for interacting with the blockchain)
- [Hardhat](https://hardhat.org/) or [Truffle](https://trufflesuite.com/)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/dappteacher/SimpleVotingDapp.git
   cd SimpleVotingDapp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Compile the smart contracts:
   ```sh
   npx hardhat compile
   ```
4. Deploy the contracts:
   ```sh
   npx hardhat run scripts/deploy.js --network localhost
   ```
5. Start the development server:
   ```sh
   npm start
   ```
### **Configuration**
Before running the application, update the contract address and Infura endpoint in the appropriate files:

1. **Smart Contract Address:**  
   Replace your deployed contract address in the frontend config (e.g., `config.js` or `.env` file):
   ```js
   const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
   ```

2. **Infura Endpoint:**  
   Update the Infura API URL in your environment file (`.env`):
   ```
   INFURA_API_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
   ```

**Note:** Replace `"YOUR_CONTRACT_ADDRESS"` and `"YOUR_INFURA_PROJECT_ID"` with your own values.

## Usage
1. Connect your MetaMask wallet.
2. Select or add a voting option.
3. Submit your vote securely on the blockchain.
4. View the live vote count.

## Contributing
Contributions are welcome! Please fork the repository, make changes, and submit a pull request.

## License
This project is licensed under the MIT License.

## Contact
For questions or suggestions, feel free to reach out via GitHub issues or connect on [LinkedIn](https://www.linkedin.com/in/dappteacher/).

