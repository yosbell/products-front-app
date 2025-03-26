import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';


const CenterLoading: React.FC = () => {
    return (
        <Box display="flex" justifyContent="center" mt={4} width={'100%'}>
          <Spinner />
        </Box>
    );
};

export default CenterLoading;