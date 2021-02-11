import React from 'react';

import API from 'data/fetch';
import { useQuery, useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import AddTransactionForm from './AddTransactionForm';

import { useQueryClient } from 'react-query';

const AddTransactionView = () => {
  const queryClient = useQueryClient();

  let history = useHistory();

  const { data: budget } = useQuery(
    ['budget', { id: 1 }],
    API.budget.fetchBudget
  );

  const { data: allCategories } = useQuery(
    'allCategories',
    API.common.fetchAllCategories
  );

  const mutation = useMutation(API.budget.addTransaction, {
    onSuccess: () => queryClient.invalidateQueries(['budget', { id: 1 }]),
  });

  const handleSubmitAddTransaction = async (values) => {
    try {
      const addTransaction = await mutation.mutateAsync({
        budgetId: budget.id,
        data: values,
      });
    } catch (error) {
      console.error(error);
    } finally {
      history.goBack();
    }
  };

  return (
    <AddTransactionForm
      categories={allCategories}
      groupCategoriesBy={'parentCategory.name'}
      onSubmit={handleSubmitAddTransaction}
    />
  );
};

export default AddTransactionView;
