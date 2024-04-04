import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <Box
      styles={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '60px',
        backgroundColor: 'white',
        color: '#fff',
        paddingY: '6vh',
      }}
    >
      {props.role == 'Company' ? (
        <>
          
          <Link to="/add-hub">
            <Button style={{ margin: '0 20px', fontSize: '18px' }} backgroundColor="teal.200" color="black">
              Add Hub
            </Button>
          </Link>
          <Link to="/all-hubs">
            <Button style={{ margin: '0 20px', fontSize: '18px' }} backgroundColor="teal.200" color="black">
              View Hubs
            </Button>
          </Link>
          <Link to="/add-products">
            <Button style={{ margin: '0 20px', fontSize: '18px' }} backgroundColor="teal.200" color="black">
              Add Products
            </Button>
          </Link>
          <Link to="/all-product-status">
            <Button style={{ margin: '0 20px', fontSize: '18px' }} backgroundColor="teal.200" color="black">
              All Products
            </Button>
          </Link>
          <Link to="/product-status">
            <Button style={{ margin: '0 20px', fontSize: '18px' }} backgroundColor="teal.200" color="black">
              Product Status
            </Button>
          </Link>
         
         
        </>
      ) : (
        <Link to="/scan-shipment">
          <Button style={{ margin: '0 20px', fontSize: '18px' }} backgroundColor="teal.200" color="black">
            Scan Shipment
          </Button>
        </Link>
      )}

      <Link to="/about">
        <Button style={{ margin: '0 20px', fontSize: '18px' }} backgroundColor="teal.200" color="black">About</Button>
      </Link>
      <ColorModeSwitcher justifySelf="flex-end" />
    </Box>
  );
};

export default Navbar;
