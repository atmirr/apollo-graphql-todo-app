import React from 'react';
import { useQuery } from '@apollo/client';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import GET_ERROR from 'src/graphql/queries/getError';
import { errorVar } from 'src/graphql/typePolicies';

function ErrorSnackbar() {
  const { data } = useQuery(GET_ERROR);
  const hasError = data?.error !== '';
  const handleClose = () => {
    errorVar('');
  };
  return (
    <Snackbar
      open={hasError}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert variant="filled" severity="error">
        {data?.error}
      </Alert>
    </Snackbar>
  );
}

export default ErrorSnackbar;
