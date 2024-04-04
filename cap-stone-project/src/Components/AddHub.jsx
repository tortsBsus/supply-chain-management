import React from 'react';
import {
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  Center,
  Stack,
  Card,
} from '@chakra-ui/react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../ContractInfo';

function AddHub() {
  const handleSubmit = async event => {
    event.preventDefault();
    const hubName = event.target.hubName.value;
    const hubAddress = event.target.hubAddress.value;

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
          var address = ethers.utils.getAddress(hubAddress);
          const registrationHub = await contract.registerHub(
            hubName,
            address
          );
          console.table(registrationHub);
        } else alert('Only Companies can register Hubs');
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }

    // Reset form fields
    event.target.reset();
  };

  return (
    <Box bg="violetgradient">
      <Center py={8}>
        <Card p={8} borderRadius="md">
          <Heading mb={4}>Please fill Hub details</Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="hubName">
                <Input type="text" placeholder="Hub Name" required />
              </FormControl>
              <FormControl id="hubAddress">
                <Input type="text" placeholder="Hub Wallet Address" required />
              </FormControl>
              <Input type="hidden" id="user" required />
              <Button colorScheme="teal" type="submit">
                Register Hub
              </Button>
            </Stack>
          </form>
        </Card>
      </Center>
    </Box>
  );
}

export default AddHub;
