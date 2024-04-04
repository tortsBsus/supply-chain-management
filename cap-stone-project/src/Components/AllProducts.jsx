import { useEffect, useState } from 'react';
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

function AllProducts() {
  const [productData, setProductData] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = async event => {
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
          setProductData(allProductsOfCompany);
        } else alert('Only Companies can register Hubs');
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => handleSubmit, []);
  useEffect(() => handleSubmit, [buttonClicked]);

  return (
    <ChakraProvider>
   <Center>
      <Card p={8} width="80vw">
        <Heading>All Company Products</Heading>
        <Text fontSize="sm">
          View all the products that are registered under your company
        </Text>
        { !buttonClicked? <Button bg="teal.200" color="black" mt={2} onClick={()=>setButtonClicked(true)}> View all</Button> : (
          productData && (
            <Box mt={8} p={4} borderWidth={1} borderRadius="md">
              <Box width="100%" margin="1%" padding="1%">
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Text fontWeight="bold">Product ID</Text>
                  <Text fontWeight="bold">Product Name</Text>
                </Box>
                {productData.map((item, index) => {
                  const [address, productName] = item.split(" - ");
                  return (
                    <Box key={index} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mt={2} bg="teal.200" color="black" p="1%" borderRadius="md">
                      <Text>{address}</Text>
                      <Text>{productName}</Text>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )          
        )}
        
      </Card>
    </Center>
    </ChakraProvider>
  );
}

export default AllProducts;
