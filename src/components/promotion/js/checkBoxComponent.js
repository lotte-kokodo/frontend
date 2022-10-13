import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { styled, withStyles } from '@mui/material/styles';
import { Checkbox, Radio, TableContainer, TableBody, TableRow, TableHead, Table, Paper, TablePagination, TextField, TableCell, tableCellClasses, tableRowClasses, FormControl, RadioGroup, FormControlLabel } from '@mui/material';

import Issue from './issue';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
        height: "30px",
        padding: "10px",
    },
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#F5A9BC',
        color: theme.palette.common.black,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    [`&.${tableRowClasses.root}`]: {
        height: "30px",
        padding: "10px",
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(product_id, category_id, display_name, price, stock, deadline, delivery_fee, create_date) {
    return { product_id, category_id, display_name, price, stock, deadline, delivery_fee, create_date };
}

const rows = [
    createData('1', '1', '잇메이트 프로틴 어묵 스테이크 혼합 100g', '21,900', '100', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
    createData('2', '1', '네이처엠 현미밥 150g', '18,900', '200', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
    createData('3', '1', '네이처엠 현미밥 200g', '20,900', '150', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
    createData('4', '1', '신선애 IQF 생 닭안심살 1kg', '7,500', '130', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
    createData('5', '1', '맛있닭 소스 통 닭가슴살 혼합 100g', '19,900', '120', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
    createData('6', '1', '잇메이트 더블 덮밥 현미베지볶음밥 + 쭈꾸미 & 새우 220g', '22,200', '110', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
];



const IssueList = (props) => {
    const [checkedItems, setCheckedItems] = useState(new Set());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const checkedItemHandler = (id, isChecked) => {
        if (isChecked) {
            checkedItems.add(id);
            setCheckedItems(checkedItems);
        } else if (!isChecked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
        }
    };
    
    return (
        //요걸 내가 보여줄 화면으로
                rows.slice(props.props.page * props.props.rowsPerPage, props.props.page * props.props.rowsPerPage + props.props.rowsPerPage).map((row) => (
                // rows.map((row) => (
                    <StyledTableRow >
                        <Issue props={row} propFunction={checkedItemHandler}/>{/*props={row} */}
                    </StyledTableRow>
                ))
    );
};


export default IssueList;