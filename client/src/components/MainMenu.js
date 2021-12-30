import React, { useState, useEffect } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import { WelcomeUser } from "../features/users/WelcomeUser"
import Link from "@mui/material/Link"
import { useHistory } from "react-router"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import MailRoundedIcon from "@mui/icons-material/MailRounded"

const pagesWithoutCurrentUser = [
  { name: "Home", href: "/" },
  { name: "Login", href: "/login" },
  { name: "Signup", href: "/signup" },
  { name: "Add Listing", href: "/listings/new" },
  { name: "FAQ", href: "/faq" },
]
const pagesWithCurrentUser = [
  { name: <HomeRoundedIcon />, href: "/" },
  { name: "Add Listing", href: "/listings/new" },
  { name: "FAQ", href: "/faq" },
]
const settings = [
  { name: "Edit Profile", href: "/edit-profile" },
  { name: "My Listings", href: "/my-listings" },
  { name: "My Reservations", href: "/my-reservations" },
  { name: "Logout", href: "/logout" },
]

export const MainMenu = ({
  currentUser,
  fetchCurrentUser,
  userSubmittedImage,
}) => {
  const history = useHistory()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => fetchCurrentUser(), [userSubmittedImage])
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const handleOpenNavMenu = (event) => {
    // On mobile screen, it opens the navbar as a list of buttons
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    // User click in their pp to see the user menu
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    // On mobile screen, deactivate navbar if user clicks outside of it
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    // User click outside user menu to deactivate it
    setAnchorElUser(null)
  }

  const handleOnNavElClick = (navEl) => {
    // Goes to any navbar location onClick
    history.push(navEl.href)
  }

  const renderMenuDropDownItem = (navEl) => (
    <MenuItem key={navEl.name} onClick={() => handleOnNavElClick(navEl)}>
      <Typography textAlign="center">{navEl.name}</Typography>
    </MenuItem>
  )

  const renderMenuNavBarItem = (navEl) => (
    <Button key={navEl.name}>
      <Link
        sx={{ height: "24px" }}
        className="main-menu-item"
        href={navEl.href}
      >
        {navEl.name}
      </Link>
    </Button>
  )

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              id="nav-menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {!currentUser &&
                pagesWithoutCurrentUser.map((page) => (
                  renderMenuDropDownItem(page)
                ))}
              {currentUser &&
                pagesWithCurrentUser.map((page) => (
                  renderMenuDropDownItem(page)
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {!currentUser &&
              pagesWithoutCurrentUser.map((page) => (
                renderMenuNavBarItem(page)
              ))}
            {currentUser &&
              pagesWithCurrentUser.map((page) => (
                renderMenuNavBarItem(page)
              ))}
          </Box>
          {currentUser && (
            <>
              <Box sx={{ flexGrow: 0.02 }}>
                <WelcomeUser currentUser={currentUser} />
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Button>
                  <Link
                    sx={{ height: "24px" }}
                    className="main-menu-item"
                    href="/inbox"
                  >
                    <MailRoundedIcon />
                  </Link>
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={currentUser.current_user.username.toUpperCase()}
                      src={`${currentUser.profile_picture_url}`}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="user-menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={!!anchorElUser}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    renderMenuDropDownItem(setting)
                  ))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
