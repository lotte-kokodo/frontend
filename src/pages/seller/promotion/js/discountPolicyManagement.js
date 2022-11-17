import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Modal, Backdrop } from '@mui/material';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import MakeDiscountPolicy from './makeDiscountPolicy';
import SellerTitle from '../../../../components/seller/sellerTitle';
import DiscountPolicyTable from '../../../../components/promotion/js/discountPolicyTable';
import discountPolicyImg from '../../../../src_assets/seller/title/discount-policy-title.png';
import "../css/couponManagement.css"

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

const DiscountPolicyManagement = () => {
    const sellerId = useParams().sellerId;

    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="coupon-management-title-container">
                <div className="coupon-management-title">
                    <img src={discountPolicyImg} className="coupon-management-img"></img>
                    <h2 className="coupon-management-title-h3">할인 정책 관리</h2>
                </div>
            </div>
            <button className="origin-button" onClick={() => {handleOpen()}}>+  할인 정책 만들기</button>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" >
                <Fade in={open}>
                    <Box sx={style}>
                        <MakeDiscountPolicy>

                        </MakeDiscountPolicy>
                    </Box>
                </Fade>
            </Modal>

            <div className="">
                <DiscountPolicyTable></DiscountPolicyTable>
            </div>
        </>
    );
};

export default DiscountPolicyManagement;
