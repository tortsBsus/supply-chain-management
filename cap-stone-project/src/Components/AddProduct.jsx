import React, { useState } from 'react';
import {
  Heading,
  FormControl,
  Input,
  Button,
  Stack,
  Card,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { contractAbi, contractAddress } from '../ContractInfo';
import { ethers } from 'ethers';
import QRious from 'qrious';

function AddProducts() {
  const [qrCodeValue, setQrCodeValue] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const handleSubmit = async event => {
    event.preventDefault();
    console.log('submitted');
    const prodname = event.target.prodname.value;
    const originHubAddress = event.target.originHubAddress.value;
    const destinationHubAddress = event.target.destinationHubAddress.value;

    // CurrentDateTime
    const today = new Date().toISOString();

    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        const connectedAddress = accounts[0];
        console.log(connectedAddress);
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        console.log('contract connected');

        const loginCheck = await contract.login();

        if (loginCheck.toString() == '2') {
          //Convert string to address type
          var originAddress = ethers.utils.getAddress(originHubAddress);
          var destinationAddress = ethers.utils.getAddress(
            destinationHubAddress
          );
          //Check if the addresses entered are hubs of that company
          const isOriginHubCheck = await contract.isHub(
            originAddress,
            connectedAddress
          );
          const isDestinationHubCheck = await contract.isHub(
            destinationAddress,
            connectedAddress
          );
          //display results
          console.table(isOriginHubCheck + ' ' + isDestinationHubCheck);
          //if both are hubs, and both inputs are not the same, add the product
          if (
            isOriginHubCheck &&
            isDestinationHubCheck &&
            originAddress != destinationAddress
          ) {
            const addingProduct = await contract.addProduct(prodname, today, originAddress, destinationAddress);
              const proID = await contract.getProdID();
              console.log(proID);
              setQrCodeValue(proID);
                const qr = new QRious({
                                value: proID,
                                size: 200, // Set the desired size of the QR code
                              });
        setQrCodeValue(qr.toDataURL()); // Save the data URL of the generated QR code
        onOpen()
              

            
          }
        } else alert('Only Companies can add new Products');
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }

    // Reset form fields
    event.target.reset();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeValue;
    link.download = 'qrcode.png';
    link.click();
    onClose();
  };

  return (
    <>
      <Card p={8} borderRadius="md">
        <Heading mb={4}>Please fill product details</Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="prodname">
              <Input type="text" placeholder="Product Name" required />
            </FormControl>
            <FormControl id="originHubAddress">
              <Input
                type="text"
                placeholder="Wallet Address of the source Hub"
                required
              />
            </FormControl>
            <FormControl id="destinationHubAddress">
              <Input
                type="text"
                placeholder="Wallet Address of the destination Hub"
                required
              />
            </FormControl>
            <Input type="hidden" id="user" required />
            <Button colorScheme="teal" type="submit">
              Register Item
            </Button>
          </Stack>
        </form>
      </Card>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Your QRCode
            </AlertDialogHeader>

            <AlertDialogBody>
              {qrCodeValue && (
                <img
                  src={qrCodeValue}
                  alt="QR Code"
                  style={{ textAlign: 'center' }}
                />
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDownload} ml={3}>
                Download
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default AddProducts;