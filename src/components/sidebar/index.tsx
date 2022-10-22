
import React, {
  useState
} from "react";
import {
  Box,
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemButton
} from '@mui/material';
import { Link } from "react-router-dom";

import LogoImg from "../../assets/img/tanklogo.png";
import { useBlockchainContext } from "../../providers";

const drawerWidth = 250;
const MenuList = [
  {
    title: "Play Game",
    href: "/play",
  },
  {
    title: "Create",
    href: "/create",
  },
  {
    title: "My Tanks",
    href: "/my-tanks",
  },
  {
    title: "Lending",
    href: "/lending",
  },
  {
    title: "Pools",
    href: "/pools",
  },
  {
    title: "Reward",
    href: "/rewards",
  },
]

const drawer = (
  <div>
    <Toolbar >
      <Link to="/">
        <Box
          component="img"
          sx={{
            textAlign: "center",
            padding: "20px",
            maxWidth: 160,
            mt: 3
          }}
          alt="DeFiTankLand"
          src={LogoImg}
        />
      </Link>
    </Toolbar>
    <List>
      {
        MenuList.map((menuItem, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              color="primary"
              component={Link}
              to={menuItem.href}
              sx={{ paddingTop: "20px", paddingLeft: "50px", paddingBottom: "20px", fontSize: "20px", fontWeight: "600" }}>
              {menuItem.title}
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  </div>
)

const Sidebar = () => {
  const [state, { dispatch }] = useBlockchainContext();

  const handleDrawerToggle = () => {
    dispatch({
      type: "mobileOpen",
      payload: !(state.mobileOpen)
    });
  };

  return (
    <Box
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={state.mobileOpen}
        onClose={handleDrawerToggle}
        onClick={handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth
          }
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth
          }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  )
}

export default Sidebar;