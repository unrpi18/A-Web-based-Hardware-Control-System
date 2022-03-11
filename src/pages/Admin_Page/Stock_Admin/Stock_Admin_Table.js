import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import TableHead from "@mui/material/TableHead";
import {Dialog, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DescriptionIcon from '@mui/icons-material/Description';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DialogContentText from "@mui/material/DialogContentText";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import {url} from "../Navi_base"
import {useNavigate} from "react-router";
import FilterListIcon from "@mui/icons-material/FilterList";
import tablePaginationActions from "../Component/Table_Control";

const loading = [
    createData(0,'loading','loading','loading')]
const no_data = [
    createData(0,'','','')]



function createData(id, item, amount, description) {
    return {id, item, amount, description };
}


export default function STOCK_ADMIN_TABLE() {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [fullWidth] = React.useState(true);
    const [maxWidth] = React.useState('sm');

    const [edit_open, setEdit_open] = useState(false);
    const [add_open, setAdd_open] = useState(false)
    const [remove_open, setRemove_open] = useState(false);
    const [filter_open, setFilter_open] = useState(false);
    const [description_open, setDescription_open] = useState(false);
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [fetched_data, setFetched_data] = useState(loading)
    const [display_data, setDisplay_data] = useState(loading);
    const [filter_keyword, setFilter_keyword] = useState('');

    const navigate = useNavigate();
    let rows = display_data;

    //global method
    useEffect(() => {
        refreshPage()
    }, []);
    function refreshPage() {
        setDisplay_data(loading);
        setFetched_data(loading);
        fetch(url + '/stocks/adminGetAllItems', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
        }).then(response => response.json()).then(responseJson => {
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            if(resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token)
                let standardisedData = [];
                for(let i = 0; i < data.length; i++){
                    standardisedData[i] = createData(i, data[i].itemName, data[i].amount, data[i].description);
                }
                setDisplay_data(standardisedData);
                setFetched_data(standardisedData);
            } else if(resultCode === 500){
                window.sessionStorage.setItem('token', responseJson.token)
                alert(errorMessage);
            } else{
                window.sessionStorage.clear();
                alert(errorMessage);
                navigate('/');
            }
        }).catch(error =>{throw(error)})
    }

    //onChange Method
    const itemOnchange = (e) => {
        setItem(e.target.value);
    }
    const amountOnchange = (e) => {
        setAmount(e.target.value);
    }
    const descriptionOnchange = (e) => {
        setDescription(e.target.value);
    }

    // edit item relevant methods
    function handleEditOpen(item, amount) {
        setItem(item);
        setAmount(amount);
        setEdit_open(true);
    }
    function handleEditClose() {
        setEdit_open(false);
        setItem('');
        setAmount('');
        setDescription('');
    }
    const handleEditConfirm = ()=>{
        const itemName = item;
        if(amount === ''){
            alert('Invalid entry, please try again!')
        }else{
            const post = {itemName, amount};
            fetch (url + '/stocks/changeItemAmount',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': window.sessionStorage.getItem('token')
                },
                body: JSON.stringify(post)
            }).then(response => response.json()).then(responseJson => {
                if(responseJson.resultCode === 500 || responseJson.resultCode === 200){
                    window.sessionStorage.setItem('token', responseJson.token);
                    alert(responseJson.message);
                }
                else{
                    window.sessionStorage.clear();
                    alert(responseJson.message);
                    navigate('/');
                }
                refreshPage();
            }).catch(error =>{throw(error)})
        }
        handleEditClose();
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
                        min = "0"
                        fullWidth
                        variant="standard"
                        value={amount}
                        onChange={amountOnchange}
                        defaultValue={amount}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Close</Button>
                    <Button onClick={handleEditConfirm}>Yes</Button>
                </DialogActions>
            </Dialog>
        )
    }

    //decription dialog
    function handleDescriptionOpen(des){
        setDescription(des)
        setDescription_open(true);
    }
    function handleDescriptionClose(){
        setDescription_open(false);
        setDescription('')
    }
    function description_dialog(){
        return(
            <Dialog open={description_open} onClose={handleDescriptionClose}
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}>
                <DialogTitle>Description</DialogTitle>
                <DialogContent>
                    {description}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDescriptionClose}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }

    //Remove item relevant methods
    function handleRemoveOpen(item, amount, description) {
        setItem(item);
        setAmount(amount);
        setDescription(description);
        setRemove_open(true);
    }
    function handleRemoveClose() {
        setRemove_open(false);
        setItem('');
        setAmount('');
        setDescription('');
    }
    const handleRemoveConfirm = () => {
        const itemName = item;
        const post = {itemName};
        fetch (url + '/stocks/deleteItem',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            if(responseJson.resultCode === 500 || responseJson.resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(responseJson.message);
            }
            else{
                window.sessionStorage.clear();
                alert(responseJson.message);
                navigate('/');
            }
            refreshPage();
        }).catch(error =>{throw(error)})
        handleRemoveClose();
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
                    <Button onClick={handleRemoveConfirm}>Yes</Button>
                </DialogActions>
            </Dialog>
        )
    }

    //Add item relevant methods
    function handleAddOpen() {
        setAdd_open(true);
    }
    function handleAddClose() {
        setAdd_open(false);
        setItem('');
        setAmount('');
        setDescription('');
    }
    const handleAddConfirm = () => {

        const itemName = item;
        const post = {itemName, amount, description};
        fetch (url + '/stocks/addItem',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': window.sessionStorage.getItem('token')
            },
            body: JSON.stringify(post)
        }).then(response => response.json()).then(responseJson => {
            if(responseJson.resultCode === 500 || responseJson.resultCode === 200){
                window.sessionStorage.setItem('token', responseJson.token);
                alert(responseJson.message);
            }
            else{
                window.sessionStorage.clear();
                alert(responseJson.message);
                navigate('/');
            }
            refreshPage();
        }).catch(error =>{throw(error)})
        handleAddClose();
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
                        id="description"
                        label="description"
                        fullWidth
                        variant="standard"
                        value={description}
                        onChange={descriptionOnchange}
                        placeholder={"description of the item"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddClose}>Close</Button>
                    <Button onClick={handleAddConfirm}>Yes</Button>
                </DialogActions>
            </Dialog>
        )
    }

    //filter relevant methods
    function handleFilter_open(){
        setFilter_open(true);
    }
    const handleFilter_close =()=>{
        setFilter_open(false);
    }
    const applyFilter=() => {
        filterData(filter_keyword);
        handleFilter_close();
    }
    const resetFilter=()=>{
        filterData('');
        handleFilter_close();
    }
    function filterDialog(){
        return(
            <Dialog open={filter_open} onClose={handleFilter_close}>
                <DialogTitle>Filtering</DialogTitle>
                <DialogContent>
                    <TextField
                        InputLabelProps={{
                            shrink: true,
                        }}

                        margin="dense"
                        id="rpt"
                        label="Keywords"
                        fullWidth
                        variant="standard"
                        value ={filter_keyword}
                        onChange={filter_keywordOnchange}
                        placeholder={"eg : first name/last name/email/date"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFilter_close}>Close</Button>
                    <Button onClick={resetFilter}>Reset Filter</Button>
                    <Button onClick={applyFilter}>Apply Filter</Button>
                </DialogActions>
            </Dialog>
        )
    }
    function filterData (keyword){
        setPage(0);
        if(keyword === ''){
            setFilter_keyword('');
            refreshPage();
        }
        else {
            let filteredData =[];
            let count = 0;
            for(let i = 0; i <fetched_data.length; i++){
                if(fetched_data[i].item.toString().includes(keyword)
                    || fetched_data[i].amount.toString().includes(keyword)
                    || fetched_data[i].description.toString().includes(keyword))
                {
                    filteredData[count] = fetched_data[i];
                    filteredData[count].id = count;
                    count ++;
                }
            }
            if(filteredData.length === 0){
                setDisplay_data(no_data);
            }
            else{
                setDisplay_data(filteredData);
            }
        }

    }
    const filter_keywordOnchange =(e)=>{
        setFilter_keyword(e.target.value);
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

    //table
    const table_title = 'All Items in Stock'
    const stock_table = ()=>{
        if(display_data === null){
            rows = loading;
        }
        return (
            <TableContainer component={Paper} sx ={{minWidth: '50vw', maxWidth: '50vw', minHeight: '60vh', maxHeight: '60vh'}} >
                <Table sx={{minWidth: '50vw', maxWidth: '50vw', minHeight: '60vh', maxHeight: '60vh'}}
                       aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Description</TableCell>
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
                                    <IconButton aria-label="view"
                                                onClick={() => handleDescriptionOpen(rows[row.id].description)}>
                                        <DescriptionIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell style={{width: 40 ,height : 53 }} align="center">
                                    <Stack direction="row" justifyContent="space-evenly">
                                        {display_data === no_data ? row.amount :
                                        <IconButton aria-label="view"
                                                    onClick={() => handleEditOpen(rows[row.id].item, rows[row.id].amount)}>
                                            <EditIcon/>
                                        </IconButton>}
                                        {display_data === no_data ? row.amount :
                                            <IconButton aria-label="view"
                                                    onClick={() => handleRemoveOpen(rows[row.id].item, rows[row.id].amount)}>
                                            <DeleteIcon/>
                                        </IconButton>}
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
                            <IconButton
                                onClick={()=>handleFilter_open()}>
                                <FilterListIcon />
                            </IconButton>
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
            {filterDialog()}
            {description_dialog()}
        </div>

    );
}