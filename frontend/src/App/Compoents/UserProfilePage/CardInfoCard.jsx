import React, { useState } from 'react';
import { Box, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const validationSchema = Yup.object({
    cardholderName: Yup.string().required('Cardholder Name is required'),
    cardNumber: Yup.string().required('Card Number is required').matches(/^[0-9]+$/, 'Card Number must be digits').min(16, 'Card Number must be 16 digits').max(16, 'Card Number must be 16 digits'),
    expirationDate: Yup.string().required('Expiration Date is required').matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration Date must be in MM/YY format'),
    billingAddress: Yup.string().required('Billing Address is required'),
});

const CardInfoCard = ({ card, onEdit, onDelete }) => {
    const [editOpen, setEditOpen] = useState(false);

    const handleEditOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleSave = (values) => {
        onEdit({ ...card, ...values });
        handleEditClose();
    };

    const renderError = (message) => (
        <div style={{ color: 'red', minHeight: '1.5em', userSelect: 'none' }}>
            {message || ' '}
        </div>
    );

    return (
        <Box border={1} borderRadius={4} p={2} mb={2}>
            <Typography variant="subtitle1">
                {card.cardholderName ?
                    `${card.cardholderName}'s card ending ${card.cardNumber.slice(-4)}`
                    :
                    'New Card'
                }
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={1}>
                <IconButton color="primary" onClick={handleEditOpen}>
                    <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => onDelete(card.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>

            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit Card Info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your card information and billing address.
                    </DialogContentText>
                    <Formik
                        initialValues={{
                            cardholderName: card.cardholderName,
                            cardNumber: card.cardNumber,
                            expirationDate: card.expirationDate,
                            billingAddress: card.billingAddress,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSave}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    as={TextField}
                                    name="cardholderName"
                                    label="Cardholder Name"
                                    fullWidth
                                    margin="normal"
                                    helperText={<ErrorMessage name="cardholderName" render={renderError} />}
                                    error={Boolean(ErrorMessage.name === "cardholderName")}
                                />
                                <Field
                                    as={TextField}
                                    name="cardNumber"
                                    label="Card Number"
                                    fullWidth
                                    margin="normal"
                                    type="text"
                                    helperText={<ErrorMessage name="cardNumber" render={renderError} />}
                                    error={Boolean(ErrorMessage.name === "cardNumber")}
                                />
                                <Field
                                    as={TextField}
                                    name="expirationDate"
                                    label="Expiration Date"
                                    fullWidth
                                    margin="normal"
                                    placeholder="MM/YY"
                                    helperText={<ErrorMessage name="expirationDate" render={renderError} />}
                                    error={Boolean(ErrorMessage.name === "expirationDate")}
                                />
                                <Field
                                    as={TextField}
                                    name="billingAddress"
                                    label="Billing Address"
                                    fullWidth
                                    margin="normal"
                                    helperText={<ErrorMessage name="billingAddress" render={renderError} />}
                                    error={Boolean(ErrorMessage.name === "billingAddress")}
                                />
                                <DialogActions>
                                    <Button onClick={handleEditClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" disabled={isSubmitting}>
                                        Save
                                    </Button>
                                </DialogActions>
                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default CardInfoCard;
