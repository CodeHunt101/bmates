import React, { useState, useEffect } from "react"
import { WelcomeUser } from "../features/users/WelcomeUser"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { styled, alpha } from "@mui/material/styles"
import {
  AppBar,
  InputBase,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material"
import {
  HomeRounded as HomeRoundedIcon,
  MailRounded as MailRoundedIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
} from "@mui/icons-material"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "150px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontSize: "15px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "19ch",
    },
  },
}))

export const MainMenu = ({ currentUser, handleCurrentUser }) => {
  const history = useHistory()

  const pagesWithoutCurrentUser = [
    { name: <HomeRoundedIcon />, href: "/" },
    { name: "Login", href: "/login" },
    { name: "Join", href: "/signup" },
  ]
  const pagesWithCurrentUser = [
    { name: <HomeRoundedIcon />, href: "/" },
    { name: "Add Listing", href: "/listings/new" },
  ]
  const settings = [
    { name: "My Profile", href: `/users/${currentUser?.current_user.id}` },
    { name: "Edit Profile", href: "/edit-profile" },
    { name: "My Listings", href: "/my-listings" },
    { name: "My Reservations", href: "/my-reservations" },
    { name: "Logout" },
  ]

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => fetchCurrentUser(), [userSubmittedImage])
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
    if (navEl.name === "Logout") {
      fetch("/api/v1/logout")
        .then((resp) => resp.json())
        .then((resp) => {
          handleCurrentUser(null)
        })
    } else {
      history.push(navEl.href)
    }
    setAnchorElUser(null)
    setAnchorElNav(null)
  }

  const renderMenuDropDownItem = (navEl) => (
    <MenuItem key={navEl.name} onClick={() => handleOnNavElClick(navEl)}>
      <Typography textAlign="center">{navEl.name}</Typography>
    </MenuItem>
  )

  const renderMenuNavBarItem = (navEl) => (
    <Button key={navEl.name}>
      <Link
        style={{ height: "24px" }}
        to={navEl.href}
        className="main-menu-item"
      >
        {navEl.name}
      </Link>
    </Button>
  )

  const [searchTerm, setSearchTerm] = useState("")
  const [listings, setListings] = useState([])

  useEffect(() => {
    fetch("/api/v1/listings")
      .then((resp) => resp.json())
      .then((resp) => {
        setListings(resp)
      })
  }, [])

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleListingSearchOnKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchTerm.length > 2) {
        const filteredListings = listings.listings.filter(
          (listing) =>
            listing.listing.title
              .replace(/[^a-zA-Z ]/g, "")
              .toLowerCase()
              .split(" ")
              .includes(searchTerm.toLowerCase()) ||
            listing.listing.description
              .replace(/[^a-zA-Z ]/g, "")
              .toLowerCase()
              .split(" ")
              .includes(searchTerm.toLowerCase()) ||
            listing.topics
              .map((topic) => topic.name.toLowerCase())
              .includes(searchTerm.toLowerCase()) ||
            listing.user_info.username
              .toLowerCase()
              .split(" ")
              .includes(searchTerm.toLowerCase())
        )
        if (filteredListings.length > 0) {
          history.replace({
            pathname: "/listings",
            state: { filteredListings: filteredListings, searchTerm },
          })
        }

        if (filteredListings.length === 0) {
          history.replace({
            pathname: "/listings",
            state: { filteredListings: "Not found", searchTerm },
          })
        }
      }
      if (searchTerm.length === 0) {
        history.replace({
          pathname: "/listings",
        })
      }
      setSearchTerm("")
    }
  }

  return (
    <AppBar position="sticky" sx={{ width: "100%" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            id="logo-bmates"
            src="/logo.png"
            alt="logo-bmates"
            width="90px"
          />

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
                pagesWithoutCurrentUser.map((page) =>
                  renderMenuDropDownItem(page)
                )}
              {currentUser &&
                pagesWithCurrentUser.map((page) =>
                  renderMenuDropDownItem(page)
                )}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {!currentUser &&
              pagesWithoutCurrentUser.map((page) => renderMenuNavBarItem(page))}
            {currentUser &&
              pagesWithCurrentUser.map((page) => renderMenuNavBarItem(page))}
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Looking for..."
              inputProps={{ "aria-label": "search" }}
              name="searchTerm"
              onChange={handleSearchTermChange}
              onKeyPress={handleListingSearchOnKeyPress}
              value={searchTerm}
            />
          </Search>
          {currentUser && (
            <>
              <Box id="welcome-user" sx={{ flexGrow: 0.02 }}>
                <WelcomeUser currentUser={currentUser} />
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Button>
                  <Link
                    style={{ height: "24px" }}
                    to={"/inbox"}
                    className="main-menu-item"
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
                  {settings.map((setting) => renderMenuDropDownItem(setting))}
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
