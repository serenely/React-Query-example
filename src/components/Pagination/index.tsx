import { Dispatch, FC, SetStateAction } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Box, Typography, IconButton } from "@mui/material";

interface Props {
    currentPage: number;
    totalPage: number;
    totalCount: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const Pagination: FC<Props> = ({ currentPage, totalCount, totalPage, setCurrentPage }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPage) setCurrentPage(currentPage + 1);
    };

    return (
        <Box display="flex" position={"absolute"} bottom={1} width={"100%"} alignItems="center" justifyContent="center" gap={2}>
            <Typography variant="body1">Total Count: {totalCount}</Typography>

            <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
                <FaArrowLeft />
            </IconButton>

            <Typography variant="body1">{`${currentPage}/${totalPage} Pages`}</Typography>

            <IconButton onClick={handleNextPage} disabled={currentPage === totalPage}>
                <FaArrowRight />
            </IconButton>
        </Box>
    );
};
