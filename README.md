# Ballot Dapp

## Description
Ballot Dapp is a decentralized application (Dapp) built on the Ethereum blockchain, allowing users to conduct voting on various proposals using smart contracts. This Dapp utilizes the Ballot smart contract for managing the voting process.

Live preview [Demo](https://my-ballot-dapp.vercel.app/)

## Features
- Create and manage proposals.
- Grant voting rights to addresses.
- Cast votes for proposals.
- Delegate voting power to other addresses.
- View details of all proposals and voters.
- Determine the winning proposal.

## Getting Started
To get started with the Ballot Dapp, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/signor1/ballot-dapp.git
   ```

2. Install dependencies:
   ```
   cd ballot-dapp
   npm install
   ```

3. Configure your Ethereum network:
   - Ensure that you have an Ethereum node (e.g., Ganache, Infura) running or configured.
   - Update the `.env` file with your Ethereum network RPC URL.

4. Start the Dapp:
   ```
   npm start
   ```

5. Access the Dapp:
   - Open your web browser and navigate to `http://localhost:3000` to access the Ballot Dapp.

## Usage
1. **Create Proposal**: As the chairperson (owner) of the contract, create proposals by providing their names.
2. **Grant Voting Rights**: Grant voting rights to addresses eligible for voting.
3. **Cast Vote**: Cast votes for the desired proposal.
4. **Delegate Voting Power**: Delegate voting power to other addresses.
5. **View Proposal Details**: View details of all proposals, including their names and vote counts.
6. **View Voter Details**: View details of voters, including their voting weights and choices.
7. **Determine Winner**: Determine the winning proposal based on the votes cast.

## Contributing
Contributions are welcome! If you would like to contribute to the Ballot Dapp, please follow these guidelines:
- Fork the repository.
- Create your feature branch (`git checkout -b feature-name`).
- Commit your changes (`git commit -am 'Add some feature'`).
- Push to the branch (`git push origin feature-name`).
- Create a new Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).
