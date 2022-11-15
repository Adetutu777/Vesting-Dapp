# Vesting Dapp with [Bunzz SDK](https://docs.bunzz.dev/product-docs/sdk/guides)
## Deployed network : Goerli

This dapp allows a user, for example a company owner to reward employees with an amount of token if the employee stays longer at the company and to penalize an employee who terminates a contract.

The datails for creating a vesting schedule are collected in a form. The input fields are:
1. Beneficiary Wallet Address: The wallet address of the user to be given the reward
2. Start Date: the start date for the vesting period
3. End date: the end date for the vesting schedule. By this date, the token can be withdrawn by the beneficiary
4. Amount: The amount of token to be given to the beneficiary (amount * 10^18)
5. Cliff: It's a set period after which the beneficairy can withdraw vested tokens
6. Revocable: this gives the owner the ability to revoke a vesting schedule. It can be true or false
7. Splice second: its represent's the amount of token to be vested by the second.

Features Completed
1. Creating of Dapp in bunzz (Vesting + ERC20)
2. Connecting ERC20 token to the Vesting Dapp
3. Transfer ERC20 token to Vesting Dapp
4. Connect frontend app to bunzz sdk
4. Dapp owner can create a vesting schedule

Features in Progres
1. Beneficiary can see vesting schedule
2. Beneficiary can withdraw vested token


You can find the app at: https://vesting-token.netlify.app/