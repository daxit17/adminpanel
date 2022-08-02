import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Formik, useFormik, Form } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { addMedicines, dataMedicine, deleteMedicines, updateMedicine } from '../../Redux/Actions/Medicine_Action';

function Medicine(props) {

    const [open, setOpen] = React.useState(false);
    const [dopen, setDopen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
        setUpdate(false)
    };

    const handleDclickOpen = () => {
        setDopen(true);
    };

    const handleDclose = () => {
        setDopen(false);
    };

    // schema

    let schema = yup.object().shape({
        name: yup.string().required("Please enter name."),
        price: yup.number().required("Please enter price.").positive().integer(),
        quantity: yup.string().required("Please enter quantity"),
        expiry: yup.string().required("Please enter expiry.")
    });

    // handleData

    const handleData = (values) => {

        let localData = JSON.parse(localStorage.getItem("medicine"));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }

        dispatch(addMedicines(data))

        // if (localData === null) {
        //     localStorage.setItem("medicine", JSON.stringify([data]))
        // } else {
        //     localData.push(data);
        //     localStorage.setItem("medicine", JSON.stringify(localData))
        // }

        LoadData();
        handleClose();
        formik.resetForm();

    }

    // localdata

    const localdata = () => {
        const datap = JSON.parse(localStorage.getItem("medicine"));
        if (datap !== null) {
            setData(datap);
        }
    }

    // updatedata

    const updatedata = (values) => {
        // const upddata = JSON.parse(localStorage.getItem("medicine"))

        // const newdata = upddata.map((m) => {
        //     if (m.id === values.id) {
        //         return values;
        //     } else {
        //         return m;
        //     }
        // })
        // localStorage.setItem("medicine", JSON.stringify(newdata))

        dispatch(updateMedicine(values))

        handleClose()
        localdata()
        setUpdate(false)
    }

    // formik

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            quantity: '',
            expiry: ''
        },
        validationSchema: schema,
        onSubmit: (values, action) => {
            if (update) {
                updatedata(values)
            } else {
                handleData(values);
            }
            handleClose()
            localdata()
        },
    });

    // handleDelete

    const handleDelete = () => {

        // let localData = JSON.parse(localStorage.getItem("medicine"));

        // let fData = localData.filter((l) => l.id !== did);

        // localStorage.setItem("medicine", JSON.stringify(fData));

        dispatch(deleteMedicines(did));

        handleDclose();

        LoadData();
    }

    // handleEdit

    const handleEdit = (params) => {
        handleClickOpen();

        setUpdate(true);

        formik.setValues(params.row)
    }

    // columns

    const columns = [
        { field: 'name', headerName: 'NAME', width: 200 },
        { field: 'price', headerName: 'PRICE', width: 200 },
        { field: 'quantity', headerName: 'QUANTITY', width: 200 },
        { field: 'expiry', headerName: 'EXPIRY', width: 200 },
        {
            field: 'action'
            , headerName: 'ACTION'
            , width: 200,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleDclickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    // LoadData

    const LoadData = () => {
        let localData = JSON.parse(localStorage.getItem("medicine"));

        if (localData !== null) {
            setData(localData);
        }

    }

    const dispatch = useDispatch();

    const medicines = useSelector(state => state.medicine)

    // useEffect

    useEffect(() => {
        // LoadData();
        dispatch(dataMedicine())
    }, []);

    // hanldeSearch

    const hanldeSearch = (val) => {

        let localData = JSON.parse(localStorage.getItem("medicine"));

        let fdata = localData.filter((d) => (
            d.name.toLowerCase().includes(val.toLowerCase()) ||
            d.price.toString().includes(val) ||
            d.quantity.toString().includes(val) ||
            d.expiry.toString().includes(val)
        ))

        setFilterData(fdata);

    }

    const finalData = filterData.length > 0 ? filterData : data;

    const { handleBlur, handleChange, handleSubmit, touched, errors, values } = formik;

    // const c = useSelector(state => state.counter)

    return (
        <>
            {
                medicines.isLoading ?
                    <p>Loading.....</p>
                    :
                    medicines.error !== '' ?
                        <p>{medicines.error}</p>
                        :
                        <div>
                            <h1 className='Mt-100'>Medicine</h1>
                            <Button variant="outlined" onClick={handleClickOpen}>
                                Add Medicine Data
                            </Button>

                            <TextField
                                margin="dense"
                                name="search"
                                label="Search"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={(e) => hanldeSearch(e.target.value)}
                            />

                            <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={medicines.medicine}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    className='Mt-100'
                                />
                            </div>

                            <Dialog
                                fullWidth
                                open={dopen}
                                onClose={handleDclose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Are you sure to delete ?"}
                                </DialogTitle>
                                <DialogActions>
                                    <Button onClick={handleDclose}>NO</Button>
                                    <Button onClick={handleDelete} > YES </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog fullWidth open={open} onClose={handleClose}>
                                <DialogTitle>
                                    {
                                        (update) ?
                                            <p> Update Data </p>
                                            :
                                            <p> Add Medicine Data</p>
                                    }
                                </DialogTitle>
                                <Formik values={formik}>
                                    <Form onSubmit={handleSubmit}>
                                        <DialogContent>
                                            <TextField
                                                value={values.name}
                                                margin="dense"
                                                name="name"
                                                label="Medicine Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.name && touched.name ? <p className='Err'>{errors.name}</p> : ''}
                                            <TextField
                                                value={values.price}
                                                margin="dense"
                                                name="price"
                                                label="Price"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.price && touched.price ? <p className='Err'>{errors.price}</p> : ''}
                                            <TextField
                                                value={values.quantity}
                                                margin="dense"
                                                name="quantity"
                                                label="Quantity"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.quantity && touched.quantity ? <p className='Err'>{errors.quantity}</p> : ''}
                                            <TextField
                                                value={values.expiry}
                                                margin="dense"
                                                name="expiry"
                                                label="Expiry"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.expiry && touched.expiry ? <p className='Err'>{errors.expiry}</p> : ''}
                                            <DialogActions>
                                                <Button onClick={handleClose}>Cancel</Button>
                                                {
                                                    (update) ?
                                                        <Button type='submit'>Update</Button>
                                                        :
                                                        <Button type='submit'>Submit</Button>

                                                }
                                            </DialogActions>
                                        </DialogContent>
                                    </Form>
                                </Formik>
                            </Dialog>
                        </div>
            }
        </>
    );
}

export default Medicine;