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

function AllHubs() {
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
          const AllHubsOfCompany = await contract.getAllHubs();
          console.log(AllHubsOfCompany);
          setProductData(AllHubsOfCompany);
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
          <Heading>All Company Hubs</Heading>
          <Text fontSize="sm">
            View all the hubs that are registered under your company
          </Text>
          { !buttonClicked? <Button bg="teal.200" color="black" mt={2} onClick={()=>setButtonClicked(true)}> View all</Button> : (
              productData && (
                <Box mt={4} p={4} borderRadius="md">
                  {productData.map((item, index) => (
                    <Box
                      key={index}
                      p={2}
                      borderWidth={1}
                      borderRadius="md"
                      bg="teal.200"
                      color="#000"
                      mt={2}
                    >
                      <Text>{item.hubName}</Text>
                    </Box>
                  ))}
                </Box>
              )  
          )}
          
        </Card>
      </Center>
    </ChakraProvider>
  );
}

export default AllHubs;
