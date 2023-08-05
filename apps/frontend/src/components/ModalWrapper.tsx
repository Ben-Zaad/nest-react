import {FC, ReactNode} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from "styled-components";
import {CurvedContainer} from "./styledComponents";

const style = {
    top: '50%',
    left: '50%',
    position: "absolute",
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface ModalWrapperProps {
    children: ReactNode;
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}

export const ModalWrapper: FC<ModalWrapperProps> = (
    {
        openModal,
        setOpenModal,
        children
    }) => {
    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <MainContainer>
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <Box sx={{...style, width: 800}}>
                    {children}
                </Box>
            </Modal>
        </MainContainer>
    );
}

const MainContainer = styled(CurvedContainer)`
`
