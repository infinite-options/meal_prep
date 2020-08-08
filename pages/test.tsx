import React from 'react';
import Grid from '@material-ui/core/Grid';
import SubscriptionCard from '../components/subscriptioncard';

export default function RecipeReviewCard() {

  return (
    
      <Grid container spacing={3} justify="center" direction="row" alignItems="center">
        <SubscriptionCard numbermeals={5} price={8.75} totalprice={53.75}/>
        <SubscriptionCard numbermeals={10} price={9.75} totalprice={97.50}/>
        <SubscriptionCard numbermeals={15} price={9.50} totalprice={142.50}/>
        <SubscriptionCard numbermeals={20} price={9.00} totalprice={179.99}/>
      </Grid>
    
  );
}