import {
  Heading,
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  Highlight,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  Card,
  CardHeader,
  CardBody,
  Divider,
  shouldForwardProp
} from '@chakra-ui/react';
import React, { useState } from 'react';

function Home(props) {
  

  return (
    <VStack spacing={8} m="10vw">
      <Heading as="h1" size={{ base: '2xl', md: '3xl', lg: '4xl' }}>
        Supply Chain Dapp
      </Heading>
      <Text fontSize="2xl" as="em">
        <Highlight
          query={['decentralised']}
          styles={{ px: '3', py: '1', rounded: 'full', bg: 'teal.100' }}
        >
          A decentralised Platform to manage your product shipping requirements!
        </Highlight>
      </Text>
      {/* <Box>
        {!isWalletConnected ? (
          <Button mx="1vw" onClick={handleConnectWallet}>
            Connect Wallet
          </Button>
        ) : (
          <Text>Wallet connected</Text>
          {
            props.handleButtonClick(true)
          }
          // Add your logic here for the connected wallet state
        )}
      </Box> */}
    </VStack>
  );
}

export default Home;
