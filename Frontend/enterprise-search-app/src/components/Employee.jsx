import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import "../App.css";
import Container from '@mui/material/Container';

const Employee = (props) => {
    return (
        <Container>
            <Grid className="employee-grid" container spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={1}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        <p>Name</p>
                        <p>Title</p>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={1}>
                        <p>Contact</p>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Employee;