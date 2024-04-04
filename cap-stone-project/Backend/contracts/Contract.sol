// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract SupplyChain {
    struct Hub {
        string hubName;
        address company;
    }

    struct Company {
        string companyName;
        mapping(address => Hub) hubsOwned;
        address[] listOfHubs;
        mapping(string => Product) prodId; // Mapping to store company products
        string[] listOfProducts;
        // uint256 totalProducts; // Number of products registered by the company
    }

    struct Status {
        string timestamp;
        address hub;
        string hubName;
    }

    struct Product {
        string prodID;
        address company;
        string prodName;
        string dateManufactured;
        address originHub;
        address destinationHub;
        mapping(uint256 => Status) hubsHopped;
        uint256 hopCount;
    }

    mapping(address => Company) private companies; // Mapping to store company details
    mapping(address => Hub) private hubs; // Mapping to store hub details
    string public currentProdID;

    // ----------------------------------Login & Sign up----------------------------------

    // Check what role the address is assigned
    function login() public view returns (uint256 role) {
        if (bytes(companies[msg.sender].companyName).length != 0) return 2;
        if (bytes(hubs[msg.sender].hubName).length != 0) return 1;
        else return 0;
    }

    // Company Registration
    function registerCompany(string memory _name) public {
        require(
            bytes(companies[msg.sender].companyName).length == 0,
            "Company already registered"
        );
        require(bytes(_name).length > 0, "Company name cannot be empty");

        Company storage C = companies[msg.sender];

        C.companyName = _name;
    }

    // Hub Registration
    function registerHub(string memory _name, address theHub) public {
        require(
            bytes(companies[msg.sender].companyName).length != 0,
            "Only registered companies can register a Hub"
        );
        require(
            bytes(companies[msg.sender].hubsOwned[theHub].hubName).length == 0,
            "Hub already registered under this company"
        );
        Hub memory newHub = Hub({hubName: _name, company: msg.sender});
        hubs[theHub] = newHub;

        companies[msg.sender].hubsOwned[theHub] = newHub;
        companies[msg.sender].listOfHubs.push(theHub);
    }

    //Check if a company exists for that address
    function isCompany(address theCompany) public view returns (bool answer) {
        return bytes(companies[theCompany].companyName).length != 0;
    }

    //Check if a hub exists under a company
    function isHub(address theHub, address theCompany)
        public
        view
        returns (bool answer)
    {
        return
            bytes(companies[theCompany].hubsOwned[theHub].hubName).length != 0;
    }

      // Function to get all hubs and their addresses
    function getAllHubs() public view returns (Hub[] memory) {
        uint256 numHubs = companies[msg.sender].listOfHubs.length;
        Hub[] memory allHubs = new Hub[](numHubs);

        for (uint256 i = 0; i < numHubs; i++) {
            address hubAddress = companies[msg.sender].listOfHubs[i];
            allHubs[i] = hubs[hubAddress];
        }

        return allHubs;
    }

    // ----------------------------------Product Related----------------------------------

    //add a new produt
    function addProduct(
        string memory _name,
        string memory _date,
        address origin,
        address destination
    ) public {
        require(
            bytes(companies[msg.sender].companyName).length != 0,
            "Only registered companies can add a new product"
        );
        require(
            bytes(hubs[origin].hubName).length != 0,
            "Origin is not a valid hub"
        );
        require(
            bytes(hubs[destination].hubName).length != 0,
            "Destination is not a valid hub"
        );

        string memory companyPrefix = addressToString(msg.sender); // Get the first 3 characters of the company address
        uint256 totalProducts = companies[msg.sender].listOfProducts.length; // Get the total number of products registered by the company

        string memory productID = string(
            abi.encodePacked(companyPrefix, uintToString(totalProducts + 1))
        );

        // Create the new product struct
        Product storage newProduct = companies[msg.sender].prodId[productID];
        newProduct.prodID = productID;
        newProduct.company = msg.sender;
        newProduct.prodName = _name;
        newProduct.dateManufactured = _date;
        newProduct.originHub = origin;
        newProduct.destinationHub = destination;
        newProduct.hopCount = 0;

        // Add the new product to the company's product list
        companies[msg.sender].listOfProducts.push(productID);
        currentProdID =  productID;
    }

    // return the most recent prodID
    function getProdID () public view returns (string memory){
        return currentProdID;
    }

    //return a list of all the products registered under the company
    function getCompanyProducts() public view returns (string[] memory) {
        require(
            bytes(companies[msg.sender].companyName).length != 0,
            "Only registered companies can access their products"
        );

        Company storage company = companies[msg.sender];
        uint256 numOfProducts = company.listOfProducts.length;
        string[] memory products = new string[](numOfProducts);

        if (numOfProducts > 0) {
            for (uint256 i = 0; i < numOfProducts; i++) {
                string memory productID = company.listOfProducts[i];
                products[i] = string(
                    abi.encodePacked(
                        company.prodId[productID].prodID,
                        " - ",
                        company.prodId[productID].prodName
                    )
                );
            }
        }

        return products;
    }

    // Scan the product and update the status of the product
    function updateProductStatus(string memory _productID, string memory _time)
        public
    {
        require(
            bytes(hubs[msg.sender].hubName).length != 0,
            "Invalid hub address"
        );
        Product storage product = companies[hubs[msg.sender].company].prodId[
            _productID
        ];
        require(
            hubs[msg.sender].company == product.company,
            "Hub and product should belong to the same company"
        );

        if (msg.sender == product.destinationHub) {
            product.hopCount++; // Increment the hop count as the product has reached the destination
        }

        Status memory newStatus = Status({timestamp: _time, hub: msg.sender, hubName: hubs[msg.sender].hubName});
        product.hubsHopped[product.hopCount] = newStatus; // Assign the new status to the corresponding hop count
        product.hopCount++;
    }

    // Get the current status of a product
    function getCurrentStatus(string memory productID)
        public
        view
        returns (Status[] memory)
    {
        require(
            bytes(companies[msg.sender].companyName).length != 0,
            "Only registered companies can access product status"
        );

        Product storage product = companies[msg.sender].prodId[productID];
        Status[] memory statuses = new Status[](product.hopCount);

        for (uint256 i = 0; i < product.hopCount; i++) {
            statuses[i] = product.hubsHopped[i];
        }

        return statuses;
    }

    // ----------------------------------String Manipulation----------------------------------

    // Utility function to convert an address to a string
    function addressToString(address _address)
        private
        pure
        returns (string memory)
    {
        bytes32 value = bytes32(uint256(uint160(_address)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory result = new bytes(42);
        result[0] = "0";
        result[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            result[2 + i * 2] = alphabet[uint8(value[i + 12] >> 4)];
            result[3 + i * 2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }

        return string(result);
    }

    // Utility function to convert a uint256 to a string
    function uintToString(uint256 _value) private pure returns (string memory) {
        if (_value == 0) {
            return "0";
        }

        uint256 temp = _value;
        uint256 digits;

        while (temp != 0) {
            digits++;
            temp /= 10;
        }

        bytes memory buffer = new bytes(digits);
        while (_value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + (_value % 10)));
            _value /= 10;
        }

        return string(buffer);
    }

    // Utility function to get a substring of a string
    function substring(
        string memory _str,
        uint256 _startIndex,
        uint256 _length
    ) private pure returns (string memory) {
        bytes memory strBytes = bytes(_str);
        require(
            _startIndex + _length <= strBytes.length,
            "Invalid substring range"
        );

        bytes memory result = new bytes(_length);
        for (uint256 i = 0; i < _length; i++) {
            result[i] = strBytes[_startIndex + i];
        }

        return string(result);
    }
}
