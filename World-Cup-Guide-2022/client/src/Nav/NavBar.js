import React from 'react';
import { Anchor, Box, Header, Menu, Nav, ResponsiveContext, Button } from 'grommet';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserProfileContext } from '../providers/UserProfileProvider';

export const CollapsableNav = () => {
  const { isLoggedIn, logout } = useContext(UserProfileContext);

  return(
  <Header className='navHeader'  background="grey" pad="small">
    <Box className='NavBarBox' direction="row" align="center" gap="small" >
      <h3><b>Welcome!</b></h3>
    </Box>
    <ResponsiveContext.Consumer>
      {(responsive) =>
        responsive === 'small' ? (
          <Menu
           label="Click me"
            items={[
              { label: 'This is', onClick: () => {} },
              { label: 'The Menu', onClick: () => {} }
            ]}
          />
        ) : (
         <Nav direction="row" pad="small" className="navBar">
            <Anchor href="posts"  label="Click Here to see unecessary opinions" />
            <Anchor href="users" label="User Management" />
            <Anchor href="comments" label="World Cup Message Board" />
            <Button onClick={logout}>Logout</Button>                     
         </Nav>
        )
      }
    </ResponsiveContext.Consumer>
  </Header>
)};
