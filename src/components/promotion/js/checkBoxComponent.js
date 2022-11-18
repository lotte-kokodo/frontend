import React, { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { styled, withStyles } from '@mui/material/styles';
import { TableRow, TableCell, tableCellClasses, tableRowClasses } from '@mui/material';
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
var rows = [];
function setRows(data) {
    rows = [];
    data.map(row => {
        var rowData = createData(row.id, row.categoryId, row.displayName, row.price, row.stock, row.deadline, row.deliveryFee, '2022-10-25T00:00:00');
        rows.push(rowData);
    })
    // if(data != undefined) {
    // rows = [];
    // var rowData = createData(data.id, data.categoryId, data.displayName, data.price, data.stock, data.deadline, data.deliveryFee, '2022-10-25T00:00:00');
    // rows.push(rowData);
    // }
}
const IssueList = (props) => {
    const [checkedItems, setCheckedItems] = useState(new Set());
    const checkedItemHandler = (id, isChecked) => {
        if (isChecked) {
            checkedItems.add(id);
            setCheckedItems(checkedItems);
            props.propFunction(checkedItems);
        } else if (!isChecked && checkedItems.has(id)) {
            checkedItems.delete(id);
            setCheckedItems(checkedItems);
            props.propFunction(checkedItems);
        }
    };
    console.log("check");
    console.log(props.props.productList);
    setRows(props.props.productList);
    return (
        rows.slice().map((row) => (
            // rows.map((row) => (
            <StyledTableRow >
                <Issue props={row} propFunction={checkedItemHandler} />{/*props={row} */}
            </StyledTableRow>
        ))
    );
};
export default React.memo(IssueList);