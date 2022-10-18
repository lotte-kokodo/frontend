import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import { Checkbox, TableRow, TableCell, tableCellClasses, tableRowClasses, FormControlLabel } from '@mui/material';
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

// const row = createData('1', '1', '잇메이트 프로틴 어묵 스테이크 혼합 100g', '21,900', '100', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00');

const Issue = (props) => {
    const [bChecked, setChecked] = useState(true);

    const checkHandler = () => {
        setChecked((bChecked) => !bChecked);
        props.propFunction(props.props.product_id, bChecked);
    };

    return (
        <>
            <StyledTableCell>
                <FormControlLabel
                    //handleChangePage이거 바꿔야 함
                    control={<Checkbox checked={!bChecked} onChange={checkHandler} />}
                />
            </StyledTableCell>
            <StyledTableCell align="center">{props.props.product_id}</StyledTableCell>
            <StyledTableCell align="center">{props.props.display_name}</StyledTableCell>
            <StyledTableCell align="center">{props.props.price}</StyledTableCell>
            <StyledTableCell align="center">{props.props.stock}</StyledTableCell>
            <StyledTableCell align="center">{props.props.deadline}</StyledTableCell>
            <StyledTableCell align="center">{props.props.delivery_fee}</StyledTableCell>
            <StyledTableCell align="center">{props.props.create_date}</StyledTableCell>
        </>

    );
}

export default Issue;