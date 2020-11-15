import React from 'react';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import Link from '@material-ui/core/Link';
import InstagramIcon from '@material-ui/icons/Instagram';

const Footer = () => (
  <Typography color="secondary" align="center">
    Made with{' '}
    <FavoriteBorderRoundedIcon fontSize="small"></FavoriteBorderRoundedIcon> by
    Kostas Fegoulis
    <Link href="https://github.com/KostasFeg">
      <IconButton>
        <GitHubIcon></GitHubIcon>
      </IconButton>
    </Link>
    <Link href="https://www.instagram.com/kostasfeg21/">
      <IconButton>
        <InstagramIcon></InstagramIcon>
      </IconButton>
    </Link>
  </Typography>
);

export default Footer;
