import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SetError } from '../../redux/todo/appReducer/appReducer';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbar = () => {
    const error = useAppSelector<string | null>(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(SetError(null))
    };
    console.log(error)
    return (
        <Snackbar open={!!(error && error.length > 1 && !null)}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "bottom", horizontal: 'center' }}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.50)' }}>
                {error}
            </Alert>
        </Snackbar>
    );
}
