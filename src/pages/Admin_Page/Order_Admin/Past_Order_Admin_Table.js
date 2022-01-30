import * as React from 'react';
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

import TableHead from "@mui/material/TableHead";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../contexts/RegisterContext";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
const url = 'http://a604-2a02-8071-22d4-5c00-8ce3-a41a-5eb4-628d.ngrok.io';
const loading= [createData(0,'loading','loading', 'loading', 'loading','loading', 'loading'),];

const fakedData = [createData(0,'556','sd', '5', '64','645', '645'),]
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

function createData(id,order_id, item, amount, link, name, email) {
    return {id, order_id, item, amount, link, name, email};
}


export default function PAST_ORDER_ADMIN_TABLE() {
    const {loginUser, setLoginUser} = useContext(UserContext)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [display_data, setDisplay_data] = useState(fakedData);


    const table_title = 'All Past Orders'
    let rows = display_data;

    useEffect(() => {
        refreshPage();
    }, [])

    function refreshPage() {
        fetch(url + '/orders/getAllPastOrders', {
            mode: 'cors',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + "001122"
            }
        }).then(response => response.json()).then(responseJson => {
            console.log(responseJson);
            let resultCode = responseJson.resultCode;
            let errorMessage = responseJson.message;
            let data = responseJson.data;
            if (resultCode === 200) {
                let standardisedData = [];
                for (let i = 0; i < data.length; i++) {
                    standardisedData[i] = createData(i, data[i].orderId,data[i].itemName, data[i].amount, data[i].itemLink, data[i].userName, data[i].userEmail);
                }
                setDisplay_data(standardisedData);
            } else {
                alert(errorMessage);
            }

        })
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    function emptyRows() {
        if (rows.length < rowsPerPage) {
            return rowsPerPage - rows.length;
        } else if ((1 + page) * rowsPerPage - rows.length > 0) {
            return (1 + page) * rowsPerPage - rows.length > 0
        } else {
            return 0;
        }
    }
    function table() {
        if (display_data === null) {
            rows = loading;
        }
        return (
            <TableContainer component={Paper} style={{height: "60vh", width: "70vw"}}>
                <Table style={{height: "60vh", width: "70vw"}} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Order ID</TableCell>
                            <TableCell align="center">Item</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Link</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Contact</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                        ).map((row) => (
                            <TableRow key={row.id}>
                                <TableCell style={{width: "5vw", height: 53}} align="center" component="th" scope="row">
                                    {row.order_id}
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    {row.item}
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    {row.amount}
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{width: "5vw", height: 53}} align="center">
                                    {row.link}
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={5}
                                colSpan={6}
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



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Typography variant="h4" display="block" gutterBottom>
                    {table_title}
                </Typography>
                {table()}
            </Stack>
        </div>

    )
}
