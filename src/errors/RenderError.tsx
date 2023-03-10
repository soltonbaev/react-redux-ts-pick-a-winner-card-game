import {Snackbar} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {errorModalProps} from '../helpers/types';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useSelector} from 'react-redux';
import {RootState} from '../redux-store/store';
import {getInfoObj} from '../redux-store/RootReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
   props,
   ref
) {
   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RenderError = () => {
   const infoObj = useSelector((state: RootState) => getInfoObj(state));

   const [showToast, setShowToast] = useState(false);
   useEffect(() => {
      setShowToast(infoObj.switchModalOn);
   }, [infoObj]);

   const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
   ) => {
      if (reason === 'clickaway') {
         return;
      }

      setShowToast(false);
   };
   return (
      <Snackbar open={showToast} autoHideDuration={2000} onClose={handleClose}>
         <Alert
            variant="filled"
            onClose={handleClose}
            severity={infoObj.type}
            sx={{width: '100%'}}
         >
            {infoObj.message}
         </Alert>
      </Snackbar>
   );
};

export default RenderError;
