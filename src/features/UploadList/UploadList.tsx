import { UploadSharp } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, List, ListItem, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { LinearProgressWithValueLabel } from '../../components/Progress';

type Upload = {
    name: string;
    progress: number;
}

type Props = {
    uploads?: Upload[];
}


export const UploadList: React.FC<Props> = ({ uploads }) => {
    if (!uploads) {
        return null;
    }

    return (
        <Box
            sx={{
                width: '100%',
                position: "fixed",
                bottom: 0,
                right: 0,
                zIndex: 9,
                "@media (min-width: 600px)": {
                    width: 450,
                },
            }}
        >
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="upload-content"
                >
                    <Typography>Uploads</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        {
                            uploads.map((upload, index) => (
                                <Box key={index}>
                                    <Typography>{upload.name}</Typography>
                                    <ListItem key={index}>
                                        <LinearProgressWithValueLabel />
                                    </ListItem>
                                </Box>
                            ))
                        }
                    </List>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}