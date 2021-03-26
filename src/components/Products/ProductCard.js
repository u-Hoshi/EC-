import React from 'react';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import NoImage from '../../assets/img/src/no_image.png';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRole } from '../../reducks/users/selectors';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { deleteProduct } from '../../reducks/products/operations';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50%-16px)',
    },
    [theme.breakpoints.up('sm')]: {
      margin: 16,
      width: 'calc(33.33333%-32px)',
    },
  },
  content: {
    display: 'flex',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  media: {
    height: 0,
    paddingTop: '100%',
  },
  price: {
    color: theme.palette.secondary.main,
    fontSize: 16,
  },
}));

const ProductCard = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const images = props.images.length > 0 ? props.images : [{ path: NoImage }];
  const price = props.price.toLocaleString();
  return (
    <Card className={classes.root}>
      <CardMedia
        image={props.images[0].path}
        className={classes.media}
        onClick={() => dispatch(push('product/' + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push('product/' + props.id))}>
          <Typography
            color="textSecondary"
            component="p"
            className={classes.content}
          >
            {props.name}
          </Typography>
          <Typography component="p" className={classes.price}>
            ￥{price}
          </Typography>
        </div>
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              dispatch(push('/product/edit/' + props.id));
              handleClose();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(props.id));
              handleClose();
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
