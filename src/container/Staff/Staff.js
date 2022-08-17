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
import { useDispatch, useSelector } from 'react-redux';
import { addStaffData, staffData, staffDelete, staffUpdate } from '../../Redux/Actions/Staff_Action';

export default function Staff() {
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
        name: yup.string().required("Please Enter Your Name..."),
        doctor: yup.string().required("Please enter doctor name..."),
        problem: yup.string().required("Please enter any kind of problem..."),
        feddback: yup.string().required("Please enter feddback..."),
    });

    // formik (Formik)

    const formik = useFormik({
        initialValues: {
            name: '',
            doctor: '',
            problem: '',
            feddback: '',
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

    const dispatch = useDispatch();

    // handleInsert

    const handleInsert = (values) => {

        let localData = JSON.parse(localStorage.getItem("staff"));

        let id = Math.floor(Math.random() * 1000);

        let data = {
            id: id,
            ...values
        }

        dispatch(addStaffData(data));

        // if (localData === null) {
        //     localStorage.setItem("staff", JSON.stringify([data]));
        // } else {
        //     localData.push(data);
        //     localStorage.setItem("staff", JSON.stringify(localData));
        // }

        LoadData();
        handleClose();
        formik.resetForm();
    }

    // Table Columns

    const columns = [
        { field: 'name', headerName: 'NAME', width: 200 },
        { field: 'doctor', headerName: 'DOCTOR', width: 200 },
        { field: 'problem', headerName: 'PROBLEM', width: 200 },
        { field: 'feddback', headerName: 'FEDDBACK', width: 200 },
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

        let localData = JSON.parse(localStorage.getItem("staff"));

        if (localData !== null) {
            setData(localData);
        }

    }

    const staffs = useSelector(state => state.staff)

    useEffect(() => {
        // LoadData();
        dispatch(staffData());
    }, []);

    // handleDelete

    const handleDelete = () => {
        // let localData = JSON.parse(localStorage.getItem("staff"));

        // let fData = localData.filter((l) => l.id !== did);

        // localStorage.setItem("staff", JSON.stringify(fData));

        dispatch(staffDelete(did));

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
        const datap = JSON.parse(localStorage.getItem("staff"));
        if (datap !== null) {
            setData(datap);
        }
    }

    // updatedata

    const updatedata = (values) => {
        // const upddata = JSON.parse(localStorage.getItem("staff"))

        // const newdata = upddata.map((m) => {
        //     if (m.id === values.id) {
        //         return values;
        //     } else {
        //         return m;
        //     }
        // });

        // localStorage.setItem("staff", JSON.stringify(newdata));

        dispatch(staffUpdate(values));

        handleClose();
        localdata();
        setUpdate(false);
    }

    // handleSearch

    const handleSearch = (val) => {
        let localData = JSON.parse(localStorage.getItem("staff"));

        let fdata = localData.filter((d) => (
            d.name.toLowerCase().includes(val.toLowerCase()) ||
            d.doctor.toLowerCase().includes(val.toLowerCase()) ||
            d.problem.toLowerCase().includes(val.toLowerCase()) ||
            d.feddback.toLowerCase().includes(val.toLowerCase())
        ))

        setFilterData(fdata);
    }

    const finalData = filterdata.length > 0 ? filterdata : data;


    const { handleBlur, handleChange, handleSubmit, touched, errors, values } = formik;

    return (
        <>
            {
                staffs.isLoading ?
                    <p>Loading...</p>
                    :
                    staffs.error ?
                        <p>{staffs.error}</p>
                        :
                        <div>
                            <h1 className='Mt-100'>Staff Infomation</h1>

                            <Button variant="outlined" onClick={handleClickOpen}>
                                Enter staff Infomation
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
                                    rows={staffs.staff}
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
                                            <p>Enter staff Infomation</p>
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
                                                value={values.doctor}
                                                margin="dense"
                                                name="doctor"
                                                label="What is the name of the doctor you are treating?"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.doctor && touched.doctor ? <p className='Err'> {errors.doctor} </p> : ''}
                                            <TextField
                                                value={values.problem}
                                                margin="dense"
                                                name="problem"
                                                label="What is your problem ?"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.problem && touched.problem ? <p className='Err'> {errors.problem} </p> : ''}
                                            <TextField
                                                value={values.feddback}
                                                margin="dense"
                                                name="feddback"
                                                label="Give your feedback to the doctor you are treating."
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.feddback && touched.feddback ? <p className='Err'> {errors.feddback} </p> : ''}
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
