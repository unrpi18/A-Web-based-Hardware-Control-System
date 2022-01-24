
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import {Dialog, TextField} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import {UserContext} from "../../../contexts/RegisterContext";
import Typography from "@mui/material/Typography";

import Stack from "@mui/material/Stack";
import DialogContentText from "@mui/material/DialogContentText";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const fake_data = [
    createData(0,'Haotian1','Wu1','test1@example.com'),
    createData(1,'Haotian2','Wu2','test2@example.com'),
    createData(2,'Haotian3','Wu3','test3@example.com'),
    createData(3,'Haotian4','Wu4','test4@example.com'),
    createData(4,'Haotian5','Wu5','test5@example.com'),
    createData(5,'Haotian6','Wu6','test6@example.com'),
    createData(6,'Haotian7','Wu7','test7@example.com'),
    createData(7,'Haotian8','Wu8','test8@example.com'),
]
function refreshPage(post, url) {
    console.log(post);
    fetch('192.168.1.1', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
    }).then(response => response.json()).then(responseJson => {
        console.log(responseJson);
        let resultCode = responseJson.resultCode;
        let errorMessage = responseJson.message;

        // TODO

        return [ /* TODO*/];


    })

    return fake_data;
}

function tablePaginationActions(props){
    const theme = useTheme;
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function createData(id, item, amount, link) {
    return {id, item, amount, link };
}


export default function STOCK_ADMIN_TABLE() {
    const {loginUser, setLoginUser} = useContext(UserContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [edit_open, setEdit_open] = useState(false);
    const [add_open, setAdd_open] = useState(false)
    const [remove_open, setRemove_open] = useState(false);

    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [link, setLink] = useState('');
    const [data, setData] = useState(null);

    const rows = fake_data;

    function handleEditOpen(item, amount) {
        setItem(item);
        setAmount(amount);
        setEdit_open(true);
    }

    function handleEditClose() {
        setEdit_open(false);
        setItem('');
        setAmount('');
        setLink('');
    }

    function handleRemoveOpen(item, amount, link) {
        setItem(item);
        setAmount(amount);
        setLink(link);
        setRemove_open(true);
    }

    function handleRemoveClose() {
        setRemove_open(false);
        setItem('');
        setAmount('');
        setLink('');
    }

    function handleAddOpen() {
        setAdd_open(true);
    }

    function handleAddClose() {
        setAdd_open(false);
        setItem('');
        setAmount('');
        setLink('');
    }

    const itemOnchange = (e) => {
        setItem(e.target.value);
    }
    const amountOnchange = (e) => {
        setAmount(e.target.value);
    }
    const linkOnchange = (e) => {
        setLink(e.target.value);
    }

    useEffect(()=>{
        refreshPage({}, "test")
    })


    const handleEditConfirm = ()=>{
        const post = {item, amount, link};
        console.log(post);
        fetch ('192.168.1.1',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
        })
        // TODO refresh page
        handleEditClose();
    }
    const handleRemoveConfirm = () => {
        const post = {item, link};
        console.log(post);
        fetch ('192.168.1.1',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
        })
        // TODO refresh page
        handleRemoveClose();
    }
    const handleAddConfirm = () => {
        const post = {item, amount, link};
        console.log(post);
        fetch ('192.168.1.1',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
        })
        // TODO refresh page
        handleAddClose();
    }


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length +1) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const table_title = 'All Items in Stock'
    const stock_table = ()=>{
        return (
            <TableContainer component={Paper} sx ={{minWidth: '50vw', maxWidth: '50vw', minHeight: '60vh', maxHeight: '60vh'}} >
                <Table sx={{minWidth: '50vw', maxWidth: '50vw', minHeight: '50vh', maxHeight: '50vh'}}
                       aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Links</TableCell>
                            <TableCell align="center">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={row.id} style={{height : 53}}>
                                <TableCell style={{width: 160, height : 53}} align="center" component="th" scope="row">
                                    {row.item}
                                </TableCell>
                                <TableCell style={{width: 40 ,height : 53}} align="center">
                                    {row.amount}
                                </TableCell>
                                <TableCell style={{width: 300, height : 53}} align="center">
                                    {row.link}
                                </TableCell>
                                <TableCell style={{width: 40 ,height : 53 }} align="center">
                                    <Stack direction="row" justifyContent="space-evenly">

                                        <IconButton aria-label="view"
                                                    onClick={() => handleEditOpen(rows[row.id].item, rows[row.id].amount)}>
                                            <EditIcon/>
                                        </IconButton>
                                        <IconButton aria-label="view"
                                                    onClick={() => handleRemoveOpen(rows[row.id].item, rows[row.id].amount)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={4}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow >
                            <Button variant="contained" component = "span" onClick = {handleAddOpen} startIcon={<AddIcon />} size="large">
                                New Item
                            </Button>
                            <TablePagination
                                rowsPerPageOptions={5}
                                colSpan={4}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={tablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        )
    }

    const edit_dialog = ()=>{
        return(
            <Dialog open={edit_open} onClose={handleEditClose} fullWidth>
                <DialogTitle>Edit Item Amount</DialogTitle>
                <DialogContent>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="item"
                        label="Item"
                        fullWidth
                        disabled
                        variant="standard"
                        defaultValue={item}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="number"
                        label="Amount"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={amount}
                        onChange={amountOnchange}
                        defaultValue={amount}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Close</Button>
                    <Button onClick={handleEditConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
    }
    const remove_dialog = ()=>{
        return(
            <Dialog open={remove_open} onClose={handleRemoveClose} fullWidth>
                <DialogTitle>Remove Items</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure that you want to delete following item from stock?
                    </DialogContentText>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="item"
                        label="Item"
                        fullWidth
                        disabled
                        variant="standard"
                        defaultValue={item}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="number"
                        label="Amount"
                        fullWidth
                        variant="standard"
                        value={amount}
                        disabled
                        defaultValue={amount}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRemoveClose}>Close</Button>
                    <Button onClick={handleRemoveConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
    }
    const add_dialog = ()=>{
        return(
            <Dialog open={add_open} onClose={handleAddClose} fullWidth>
                <DialogTitle>Add New Items</DialogTitle>
                <DialogContent>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="item"
                        label="Item"
                        fullWidth
                        variant="standard"
                        onChange={itemOnchange}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="number"
                        label="Amount"
                        fullWidth
                        variant="standard"
                        value={amount}
                        onChange={amountOnchange}
                    />
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        margin="dense"
                        id="link"
                        label="link"
                        fullWidth
                        variant="standard"
                        value={link}
                        onChange={linkOnchange}
                        placeholder={"www.conrad.de/example_item.html"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Close</Button>
                    <Button onClick={handleAddConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        )
    }

    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h4" display="block" gutterBottom>
                    {table_title}
                </Typography>
                {stock_table()}
            </Stack>
            {add_dialog()}
            {remove_dialog()}
            {edit_dialog()}
        </div>

    );
}