import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { useFormik, Formik, Form } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogContentText from '@mui/material/DialogContentText';

export default function Patients() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [dopen, setdOpen] = React.useState(false);
    const [did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);
    const [filterdata, setFilterData] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm()
        setUpdate(false)
    };

    const handleDClickOpen = () => {
        setdOpen(true);
    };

    const handleDClose = () => {
        setdOpen(false);
    };


    // schema (Yup)

    let schema = yup.object().shape({
        name: yup.string().required("Please Enter Name..."),
        age: yup.number().required("Please Enter Age...").positive().integer(),
        weight: yup.number().required("Please Enter Weight").positive().integer(),
        number: yup.number().required("Please Enter number").min(10),
    });

    // formik (Formik)

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            weight: '',
            number: '',
        },
        validationSchema: schema,
        onSubmit: (values, action) => {
            if (update) {
                updatedata(values);
            } else {
                handleInsert(values);
            }
            handleClose();
            localdata();
        },
    });

    // handleInsert

    const handleInsert = (values) => {

        let localData = JSON.parse(localStorage.getItem("patients"));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }

        if (localData === null) {
            localStorage.setItem("patients", JSON.stringify([data]));
        } else {
            localData.push(data);
            localStorage.setItem("patients", JSON.stringify(localData));
        }

        LoadData();
        handleClose();
        formik.resetForm();
    }

    // Table Columns

    const columns = [
        { field: 'name', headerName: 'NAME', width: 200 },
        { field: 'age', headerName: 'AGE', width: 200 },
        { field: 'weight', headerName: 'WEIGHT', width: 200 },
        { field: 'number', headerName: 'NUMBER', width: 200 },
        {
            field: 'action',
            headerName: 'ACTION',
            width: 200,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => { handleDClickOpen(); setDid(params.id) }}>
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        },
    ];

    // Table Rows

    const LoadData = () => {

        let localData = JSON.parse(localStorage.getItem("patients"));

        if (localData !== null) {
            setData(localData);
        }

    }

    useEffect(() => {
        LoadData();
    }, []);

    // handleDelete

    const handleDelete = () => {
        let localData = JSON.parse(localStorage.getItem("patients"));

        let fData = localData.filter((l) => l.id !== did);

        localStorage.setItem("patients", JSON.stringify(fData));

        handleDClose();
        LoadData();
    }

    // handleEdit
    const handleEdit = (params) => {
        handleClickOpen();
        setUpdate(true);
        formik.setValues(params.row);
    }

    // localdata

    const localdata = () => {
        const datap = JSON.parse(localStorage.getItem("patients"));
        if (datap !== null) {
            setData(datap);
        }
    }

    // updatedata

    const updatedata = (values) => {
        const upddata = JSON.parse(localStorage.getItem("patients"))

        const newdata = upddata.map((m) => {
            if (m.id === values.id) {
                return values;
            } else {
                return m;
            }
        });

        localStorage.setItem("patients", JSON.stringify(newdata));

        handleClose();
        localdata();
        setUpdate(false);
    }

    // handleSearch

    const handleSearch = (val) => {

        let localData = JSON.parse(localStorage.getItem("patients"));

        let fdata = localData.filter((d) => (
            d.name.toLowerCase(val).includes(val.toLowerCase()) ||
            d.age.toString().includes(val) ||
            d.weight.toString().includes(val) ||
            d.number.toString().includes(val)
        ))

        setFilterData(fdata);
        
    }

    const finalData = filterdata.length > 0 ? filterdata : data ;

    const { handleBlur, handleChange, handleSubmit, touched, errors, values } = formik;

    return (
        <div>
            <h1 className='Mt-100'>Patients Data</h1>

            <Button variant="outlined" onClick={handleClickOpen}>
                Add Patients Data
            </Button>

            <TextField
                margin="dense"
                name="search"
                label="Search"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => handleSearch(e.target.value)}
            />

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={finalData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    className='Mt-100'
                />
            </div>

            <Dialog
                open={dopen}
                onClose={handleDClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are You Sure To Delete ?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDClose}>No</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth open={open} onClose={handleClose}>
                <DialogTitle>
                    {
                        (update) ?
                            <p> Update Data </p>
                            :
                            <p>Add Patients Data </p>
                    }

                </DialogTitle>
                <Formik values={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField
                                value={values.name}
                                margin="dense"
                                name="name"
                                label="Enter Patient Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.name && touched.name ? <p className='Err'> {errors.name} </p> : ''}
                            <TextField
                                value={values.age}
                                margin="dense"
                                name="age"
                                label="Enter Patient Age"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.age && touched.age ? <p className='Err'> {errors.age} </p> : ''}
                            <TextField
                                value={values.weight}
                                margin="dense"
                                name="weight"
                                label="Enter Patient Weight"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.weight && touched.weight ? <p className='Err'> {errors.weight} </p> : ''}
                            <TextField
                                value={values.number}
                                margin="dense"
                                name="number"
                                label="Enter Patient Number"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.number && touched.number ? <p className='Err'> {errors.number} </p> : ''}
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
    );
}
