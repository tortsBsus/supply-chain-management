export const contractAbi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_date",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "origin",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "destination",
          "type": "address"
        }
      ],
      "name": "addProduct",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "currentProdID",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllHubs",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "hubName",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "company",
              "type": "address"
            }
          ],
          "internalType": "struct SupplyChain.Hub[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getCompanyProducts",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "productID",
          "type": "string"
        }
      ],
      "name": "getCurrentStatus",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "timestamp",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "hub",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "hubName",
              "type": "string"
            }
          ],
          "internalType": "struct SupplyChain.Status[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getProdID",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "theCompany",
          "type": "address"
        }
      ],
      "name": "isCompany",
      "outputs": [
        {
          "internalType": "bool",
          "name": "answer",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "theHub",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "theCompany",
          "type": "address"
        }
      ],
      "name": "isHub",
      "outputs": [
        {
          "internalType": "bool",
          "name": "answer",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "login",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "role",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "registerCompany",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "address",
          "name": "theHub",
          "type": "address"
        }
      ],
      "name": "registerHub",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_productID",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_time",
          "type": "string"
        }
      ],
      "name": "updateProductStatus",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

export const contractAddress ='0x545BE71AD2909FadDC97F4A66ce0c5497EdE69E7'; 