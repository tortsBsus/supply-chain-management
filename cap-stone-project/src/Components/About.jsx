import React from 'react'
import {
  Center,
  ChakraProvider,
  Heading,
  Text,
  Card
} from '@chakra-ui/react';
function About() {
  return (
    <ChakraProvider>
    <Center>
    <Card style={{padding:"2%", width:"70%"}}>
        <Heading>About</Heading>
       <Text style={{marginTop:"4vh"}}> A Decentralised End to End Logistics Application that stores the whereabouts of product at every freight hub to the Blockchain. At consumer end, customers can easily scan product's QR CODE and get complete information about the provenance of that product hence empowering	consumers to only purchase authentic and quality products.</Text>
      </Card>
    </Center>
  </ChakraProvider>
  )
}

export default About