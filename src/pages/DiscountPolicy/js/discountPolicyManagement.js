import * as React from 'react';
import DiscountPolicyReqList from './discountPolicyReqList';
import DiscountPolicyList from './discountPolicyList';
import AddIcon from '@mui/icons-material/Add';
import { Button, Modal, Backdrop } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { pink } from '@mui/material/colors';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Fade from '@mui/material/Fade';
import MakeDiscountPolicy from './makeDiscountPolicy';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return <div {...other}>{value === index && <Box>{children}</Box>}</div>;
}

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    '&:hover': {
        backgroundColor: pink[700],
    },
}));

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
    const [value, setValue] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <h3>할인 정책 관리</h3>
            <ColorButton variant="contained" onClick={handleOpen} startIcon={<AddIcon />} sx={{ marginBottom: 12, marginTop: 3 }}>
                할인 정책 만들기
            </ColorButton>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <MakeDiscountPolicy>

                        </MakeDiscountPolicy>
                    </Box>
                </Fade>
            </Modal>

            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} aria-label="nav tabs example" sx={{ marginBottom: 7 }}>
                    <LinkTab label="정책 목록" href="couponlist"></LinkTab>
                    <LinkTab label="요청 목록" href="couponreq"></LinkTab>
                </Tabs>
                <TabPanel value={value} index={0}>
                    <DiscountPolicyReqList />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DiscountPolicyList />
                </TabPanel>
            </Box>
        </>
    );
};

export default DiscountPolicyManagement;
