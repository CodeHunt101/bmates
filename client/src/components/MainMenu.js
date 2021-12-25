import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { WelcomeUser } from '../features/users/WelcomeUser';

const pagesWithoutCurrentUser = [{name:'Home', href: '/'}, {name: 'Login', href: 'login'}, {name:'Signup', href: '/signup'}, {name: 'Add Listing', href:'/listings/new'}, {name: 'FAQ', href: '/faq'}];
const pagesWithCurrentUser = [{name:'Home', href: '/'}, {name: 'Add Listing', href:'/listings/new'} ,{name: 'Dashboard', href:'/dashboard'}, {name: 'Logout', href: '/logout'}, {name: 'FAQ', href: '/faq'}];
const settings = ['Edit Profile', 'My Listings', 'My Reservations', 'Logout'];

export const MainMenu = ({currentUser}) => {
  
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
  <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          LOGO
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {!currentUser && pagesWithoutCurrentUser.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
            {!currentUser && pagesWithCurrentUser.map((page) => (
              <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {!currentUser && pagesWithoutCurrentUser.map((page) => (
            <Button
              key={page.name}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link className="main-menu-item" to={page.href}>
                {page.name}
              </Link>
            </Button>
          ))}
          {currentUser && pagesWithCurrentUser.map((page) => (
            <Button
              key={page.name}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              href={page.href}
            >
              
              <Link className="main-menu-item" to={page.href}>
                {page.name}
              </Link>
              
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0.05 }}>
          <WelcomeUser currentUser={currentUser}/>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
};

// const pagesWithoutCurrentUser = [{name:'Home', href: '/'}, {name: 'Login', href: 'login'}, {name:'Signup', href: '/signup'},{name: 'FAQ', href: '/faq'}];
// const pagesWithCurrentUser = [{name:'Home', href: '/'}, {name: 'Dashboard', href:'/dashboard'}, {name: 'Logout', href: '/logout'}, {name: 'FAQ', href: '/faq'}];

// return (
//   <AppBar position="static">
//     <Container maxWidth="xl">
//       <Toolbar disableGutters>
//         <Typography
//           variant="h6"
//           noWrap
//           component="div"
//           sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
//         >
//           LOGO
//         </Typography>

//         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//           <IconButton
//             size="large"
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleOpenNavMenu}
//             color="inherit"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorElNav}
//             anchorOrigin={{
//               vertical: 'bottom',
//               horizontal: 'left',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'left',
//             }}
//             open={Boolean(anchorElNav)}
//             onClose={handleCloseNavMenu}
//             sx={{
//               display: { xs: 'block', md: 'none' },
//             }}
//           >
//             {!currentUser && pagesWithoutCurrentUser.map((page) => (
//               <MenuItem key={page.name} onClick={handleCloseNavMenu}>
//                 <Typography textAlign="center">{page.name}</Typography>
//               </MenuItem>
//             ))}
//             {!currentUser && pagesWithCurrentUser.map((page) => (
//               <MenuItem key={page.name} onClick={handleCloseNavMenu}>
//                 <Typography textAlign="center">{page.name}</Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//         </Box>
//         <Typography
//           variant="h6"
//           noWrap
//           component="div"
//           sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
//         >
//           LOGO
//         </Typography>
//         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//           {!currentUser && pagesWithoutCurrentUser.map((page) => (
//             <Button
//               key={page.name}
//               onClick={handleCloseNavMenu}
//               sx={{ my: 2, color: 'white', display: 'block' }}
//             >
//               <Link to={page.href}>
//                 {page.name}
//               </Link>
//             </Button>
//           ))}
//           {currentUser && pagesWithCurrentUser.map((page) => (
//             <Button
//               key={page.name}
//               onClick={handleCloseNavMenu}
//               sx={{ my: 2, color: 'white', display: 'block' }}
//             >
//               <Link to={page.href}>
//                 {page.name}
//               </Link>
//             </Button>
//           ))}
//         </Box>

//         <Box sx={{ flexGrow: 0 }}>
//           <Tooltip title="Open settings">
//             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//               <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//             </IconButton>
//           </Tooltip>
//           <Menu
//             sx={{ mt: '45px' }}
//             id="menu-appbar"
//             anchorEl={anchorElUser}
//             anchorOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             open={Boolean(anchorElUser)}
//             onClose={handleCloseUserMenu}
//           >
//             {settings.map((setting) => (
//               <MenuItem key={setting} onClick={handleCloseNavMenu}>
//                 <Typography textAlign="center">{setting}</Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//         </Box>
//       </Toolbar>
//     </Container>
//   </AppBar>
// );



// return (
//   <AppBar position="static">
//     <Container maxWidth="xl">
//       <Toolbar disableGutters>
//         <Typography
//           variant="h6"
//           noWrap
//           component="div"
//           sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
//         >
//           LOGO
//         </Typography>

//         <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//           <IconButton
//             size="large"
//             aria-label="account of current user"
//             aria-controls="menu-appbar"
//             aria-haspopup="true"
//             onClick={handleOpenNavMenu}
//             color="inherit"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Menu
//             id="menu-appbar"
//             anchorEl={anchorElNav}
//             anchorOrigin={{
//               vertical: 'bottom',
//               horizontal: 'left',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'left',
//             }}
//             open={Boolean(anchorElNav)}
//             onClose={handleCloseNavMenu}
//             sx={{
//               display: { xs: 'block', md: 'none' },
//             }}
//           >
//             {!currentUser && pagesWithoutCurrentUser.map((page) => (
//               <MenuItem key={page.name} onClick={handleCloseNavMenu}>
//                 <Typography textAlign="center">{page.name}</Typography>
//               </MenuItem>
//             ))}
//             {!currentUser && pagesWithCurrentUser.map((page) => (
//               <MenuItem key={page.name} onClick={handleCloseNavMenu}>
//                 <Typography textAlign="center">{page.name}</Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//         </Box>
//         <Typography
//           variant="h6"
//           noWrap
//           component="div"
//           sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
//         >
//           LOGO
//         </Typography>
//         <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//           {!currentUser && pagesWithoutCurrentUser.map((page) => (
//             <Button
//               key={page.name}
//               onClick={handleCloseNavMenu}
//               sx={{ my: 2, color: 'white', display: 'block' }}
//             >
//               {page.name}
//             </Button>
//           ))}
//           {currentUser && pagesWithCurrentUser.map((page) => (
//             <Button
//               key={page}
//               onClick={handleCloseNavMenu}
//               sx={{ my: 2, color: 'white', display: 'block' }}
//             >
//               {page}
//             </Button>
//           ))}
//         </Box>

//         <Box sx={{ flexGrow: 0 }}>
//           <Tooltip title="Open settings">
//             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//               <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
//             </IconButton>
//           </Tooltip>
//           <Menu
//             sx={{ mt: '45px' }}
//             id="menu-appbar"
//             anchorEl={anchorElUser}
//             anchorOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             keepMounted
//             transformOrigin={{
//               vertical: 'top',
//               horizontal: 'right',
//             }}
//             open={Boolean(anchorElUser)}
//             onClose={handleCloseUserMenu}
//           >
//             {settings.map((setting) => (
//               <MenuItem key={setting} onClick={handleCloseNavMenu}>
//                 <Typography textAlign="center">{setting}</Typography>
//               </MenuItem>
//             ))}
//           </Menu>
//         </Box>
//       </Toolbar>
//     </Container>
//   </AppBar>
// );