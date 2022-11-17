import {useState, useEffect} from "react";

import * as React from 'react';
import SellerTitle from '../../../../components/seller/sellerTitle';
import CouponTable from '../../../../components/promotion/js/couponTable';
import couponImg from '../../../../src_assets/seller/title/coupon-title.png';
import { Button, Modal, Backdrop } from '@mui/material';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

import MakeCoupon from "./makeCoupon";

import "../css/couponManagement.css"

function CouponManagement() {

    
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1100,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <div className="board">
            <div className="coupon-management-title-container">
                <div className="coupon-management-title">
                    <img src={couponImg} className="coupon-management-img"></img>
                    <h2 className="coupon-management-title-h3">쿠폰 관리</h2>
                </div>
            </div>
            <button className="origin-button" onClick={() => {handleOpen()}}>+  할인 쿠폰 만들기</button>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Fade in={open}>
                    <Box sx={style}>
                        <MakeCoupon>

                        </MakeCoupon>
                    </Box>
                </Fade>
            </Modal>

            <div className="">
                <CouponTable></CouponTable>

            </div>
        </div>
    )

}



export default CouponManagement;