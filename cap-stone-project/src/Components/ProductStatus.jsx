import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Card,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../ContractInfo';

function ProductStatus() {
  const [productCode, setProductCode] = useState('');
  const [productData, setProductData] = useState('');
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const [check, setCheck] = useState(true);

  const handleProductCodeChange = event => {
    setProductCode(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setSubmitButtonClicked(true);
    // Handle form submission
    console.log('Product Code:', productCode);

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        console.log('contract connected');

        const loginCheck = await contract.login();
        console.table(loginCheck);
        if (loginCheck.toString() == '2') {
          const allProductsOfCompany = await contract.getCompanyProducts();
          console.log(allProductsOfCompany);
          console.log(productCode);
          const currentProductStatus = await contract.getCurrentStatus(
            productCode
          );
          console.log(currentProductStatus);
          if (currentProductStatus.length == 0)
            alert('Product has not been dispatched yet');
          setProductData(currentProductStatus);
          setCheck(false);
        } else alert('Only Companies can register Hubs');
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChakraProvider>
      <Center>
        <Card p={8} width="80vw">
          {check ? (
            <>
              <Heading>Product Status</Heading>
              <Text fontSize="sm">check the status of your product</Text>
              <form onSubmit={handleSubmit}>
                <Stack spacing={4} mt={8}>
                  <FormControl id="productCode">
                    <FormLabel>Enter Product Code</FormLabel>
                    <Input
                      type="text"
                      value={productCode}
                      onChange={handleProductCodeChange}
                      required
                    />
                  </FormControl>
                  <Button colorScheme="teal" type="submit">
                    
                    Search
                  </Button>
                </Stack>
              </form>
            </>
          ) : (
            <>
              <Heading>Current Status</Heading>
              {productData.length != 0 &&
                productData.map((item, index) => (
                  <Box
                    key={index}
                    p={2}
                    borderWidth={1}
                    borderRadius="md"
                    bg="teal.200"
                    color="#000"
                    mt={2}
                  >
                    <Text>
                      {item.timestamp} :
                      {item.hubName} [ {item.hub} ]
                    </Text>
                  </Box>
                ))}
              <Button
                bg="teal.500"
                color="black"
                mt={6}
                type="submit"
                onClick={() => setCheck(true)}
              >
                
                Check another
              </Button>
            </>
          )}
        </Card>
      </Center>
    </ChakraProvider>
  );
}

export default ProductStatus;
