import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Text,
  Heading
} from '@chakra-ui/react';
import { FaQrcode } from 'react-icons/fa';
import jsQR from 'jsqr';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../ContractInfo';

function ScanShipment() {
  const [prodId, setProdId] = useState('');
  const [prodLocation, setProdLocation] = useState('');

  const handleProdIdChange = event => {
    setProdId(event.target.value);
  };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   }
  // }, []);

  function showPosition(position) {
    const autoLocation =
      position.coords.latitude + ', ' + position.coords.longitude;
    setProdLocation(autoLocation);
    document.getElementById('prodlocation').value = autoLocation;
  }

  const handleImageUpload =  (event) => {
    console.log("----------------------------------Image upload----------------------------------");
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageDataUrl = reader.result;
        const image = new Image();
        image.src = imageDataUrl;
        await image.decode();

        console.log("imageurl:"+imageDataUrl);

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
          setProdId(qrCode.data);
          console.log('Scanned QR code data:', qrCode.data);
        } else {
          console.log('No QR code found in the image.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log('submitted');

    const today = new Date();
    const thisdate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

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
          if (loginCheck.toString() == '1') {
                        const updateProductStatus = await contract.updateProductStatus(prodId, today.toISOString());
            console.table(updateProductStatus);
          } else alert('Only Hubs can update status');
        } else {
          console.log("Ethereum object doesn't exist!");
        }
      } catch (error) {
        console.log(error);
      }

  
  };

  return (
    <Card p={8} width="80vw">
      <Box className="greyarea">
        
        <Heading>Scan Shipment</Heading>
          <Text fontSize="sm" mb={6}>
          Scan the QR Code or Enter the productID to update the product's current status
        </Text>
          
        <form onSubmit={handleSubmit}>
          <Box>
            <FormControl>
              <FormLabel>Product ID</FormLabel>
              <Box
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <Input
                  type="text"
                  value={prodId}
                  onChange={handleProdIdChange}
                  placeholder='Scan QR Code or Enter manually'
                  required
                />
                <label htmlFor="image-upload">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none', borderRadius: '0' }}
                    onChange={handleImageUpload}
                  />
                  <IconButton
                    icon={<FaQrcode />}
                    aria-label="Upload QR Code"
                    as="span"
                    borderRadius="0"
                  />
                </label>
              </Box>
            </FormControl>
          </Box>
          <Button colorScheme="teal" type="submit" width="50vw" mt={4}> Update</Button>
        </form>
      </Box>
    </Card>
  );
}

export default ScanShipment;
