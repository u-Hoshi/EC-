import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../reducks/products/selectors';
import { getProductsInFavorite } from '../reducks/users/selectors';
import { FavoriteListItem } from '../components/Products/';
import { PrimaryButton, GreyButton } from '../components/UIkit';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%',
  },
}));

const FavoriteProducts = () => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const productsInFavorite = getProductsInFavorite(selector);

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'));
  }, []);

  const backToHome = useCallback(() => {
    dispatch(push('/'));
  }, []);

  console.log(productsInFavorite.length);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">お気に入り</h2>
      <List className={classes.root}>
        {productsInFavorite.length > 0 &&
          productsInFavorite.map((product) => (
            <FavoriteListItem product={product} key={product.favId} />
          ))}
      </List>
      <div className="module-spacer--medium" />
      <div className="p-grid__column">
        <PrimaryButton label={'レジへ'} onClick={goToOrder} />
        <div className="module-spacer--extra-extra-small" />
        <GreyButton label={'ショッピングを続ける'} onClick={backToHome} />
      </div>
    </section>
  );
};

export default FavoriteProducts;
