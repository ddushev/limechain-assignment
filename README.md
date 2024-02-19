# FE Web3

# Punk Beer Web App

_Objective: Use the punk beer api and blockchain to create a unique project that uses templating to show data on the page._

## Description

The [punk api](https://punkapi.com/) doesn’t require a key to use and provides a lot of information in its responses.

## Tasks:

### Web2 part:

- Create a web app listing of some/all beers.
- Possibly add search if the API allows it.
- You should then be able to show a separate list of the items you favorited. This will of course not be saved to any database.
- Add the sound of the opening beer when you click on the image of the beer (find a random sound from the internet).
- Create a "Get Random Beer". When someone clicks it shows them one random beer.
- If you think of your favorite list as a shopping cart, make sure you have a unique set of beers in it (no repetitions). Hint: bonus points for using hashed data to achieve this.
- Imagine that Punk API could eventually change a beer. Make sure that upon viewing the Favourites list, you show which beers have not changed and which have been updated since your last viewing of the Favourites list (no need to show the changes, just whether there is something different or not).

![https://cdn-images-1.medium.com/max/1200/1*z0dWsT-ud37k2lUbTM_8Hw.png](https://cdn-images-1.medium.com/max/1200/1*z0dWsT-ud37k2lUbTM_8Hw.png)

_Note: We would appreciate it if it works on the most major browsers (or atleast Chrome, Safari, Firefox and Brave)._

### Web3 part:

- Have a look at the [WAGMI](https://wagmi.sh/). Try to make a wallet and connect it to [Metamask (Chrome Widget)](https://metamask.io).
- “Unlock” the FE functionality only if a wallet is connected.
- Implement "Disconnect Wallet" functionality.
- Read these articles:
  [https://ethereum.org/en/developers/docs/web2-vs-web3/#:~:text=Web3%2C in the context of,without monetising their personal data](https://ethereum.org/en/developers/docs/web2-vs-web3/#:~:text=Web3%2C%20in%20the%20context%20of,without%20monetising%20their%20personal%20data).
  [https://ethereum.org/en/developers/docs/intro-to-ethereum/](https://ethereum.org/en/developers/docs/intro-to-ethereum/)
  [https://ethereum.org/en/developers/docs/intro-to-ether/](https://ethereum.org/en/developers/docs/intro-to-ether/)
  [https://ethereum.org/en/developers/docs/dapps/](https://ethereum.org/en/developers/docs/dapps/)
  [https://ethereum.org/en/developers/docs/accounts/](https://ethereum.org/en/developers/docs/accounts/)
  [https://ethereum.org/en/developers/docs/transactions/](https://ethereum.org/en/developers/docs/transactions/)
  [https://ethereum.org/en/developers/docs/blocks/](https://ethereum.org/en/developers/docs/blocks/)
  Optionally:
  [https://ethereum.org/en/developers/docs/smart-contracts/](https://ethereum.org/en/developers/docs/smart-contracts/)
- Let’s try to communicate with the Blockchain:
  - Install Metamask
  - Create Wallet
  - Use WAGMI for connection to your wallet (metamask) and solve the tasks bellow:
- We’ve deployed a Smart Contract for you on Sepolia Network that can be accessed at the following address: [https://sepolia.etherscan.io/address/0x7b16818954853f3583cdc59D654d027C2A4CC62d](https://sepolia.etherscan.io/address/0x7b16818954853f3583cdc59D654d027C2A4CC62d)
- Your task is to try to read data from this smart contract instead of the **API above** and visualize data based on the returned data from the Smart Contract. You can read data from a smart :
  - `getBeer(uint _id)` is returning info for beer (similar to the API above)
  - `getBeerCount()` returns the current count of the beers that are written in the smart contract

### Bonus Tasks

- Try to send data to the contract using a “Transaction”.
  - `addBeer(string memory _name, 
string memory _imageUrl,
string memory _brewery, 
uint8 _alcoholPercentage, 
string memory _beerType, 
uint8 _price)` is a way to add beers to the Smart Contract
  - `rateBeer(uint _id, uint8 _rating)` is a way to rate beers.

The full contract code:

```jsx
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract BeerAPI {
    struct Beer {
        string name;
        string imageUrl;
        string brewery;
        uint8 alcoholPercentage;
        string beerType;
        uint8 price;
        uint8 totalRatings;
        uint8 numberOfRatings;
    }

    Beer[] public beers;

    event BeerAdded(uint id, string name, string brewery);
    event BeerRated(uint id, uint rating);

    function addBeer(
        string memory _name,
        string memory _imageUrl,
        string memory _brewery,
        uint8 _alcoholPercentage,
        string memory _beerType,
        uint8 _price
    ) public {
        beers.push(Beer(_name, _imageUrl, _brewery, _alcoholPercentage, _beerType, _price, 0, 0));
        emit BeerAdded(beers.length - 1, _name, _brewery);
    }

    function rateBeer(uint _id, uint8 _rating) public {
        require(_rating >= 1 && _rating <= 5, "Rating should be between 1 and 5");
        Beer storage beer = beers[_id];
        beer.totalRatings += _rating;
        beer.numberOfRatings++;
        emit BeerRated(_id, _rating);
    }

    function getBeer(uint _id) public view returns (
        string memory name,
        string memory imageUrl,
        string memory brewery,
        uint8 alcoholPercentage,
        string memory beerType,
        uint price,
        uint _averageRating
    ) {
        Beer memory beer = beers[_id];
        uint averageRating = 0;
        if (beer.numberOfRatings > 0) {
            averageRating = beer.totalRatings / beer.numberOfRatings;
        }
        return (
            beer.name,
            beer.imageUrl,
            beer.brewery,
            beer.alcoholPercentage,
            beer.beerType,
            beer.price,
            averageRating
        );
    }

    function getBeerCount() public view returns (uint) {
        return beers.length;
    }
}
```

The ABI of the compiled contract is:

```
[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "brewery",
				"type": "string"
			}
		],
		"name": "BeerAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rating",
				"type": "uint256"
			}
		],
		"name": "BeerRated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_brewery",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_alcoholPercentage",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_beerType",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_price",
				"type": "uint8"
			}
		],
		"name": "addBeer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "beers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "brewery",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "alcoholPercentage",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "beerType",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "price",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "totalRatings",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "numberOfRatings",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getBeer",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "imageUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "brewery",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "alcoholPercentage",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "beerType",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_averageRating",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBeerCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_rating",
				"type": "uint8"
			}
		],
		"name": "rateBeer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
```
