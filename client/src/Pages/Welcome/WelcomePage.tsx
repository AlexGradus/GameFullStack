import './WelcomePage.css';
import { Box, Container, Grid, Paper, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
	const navigate = useNavigate();
	const Games = ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5', 'Game 6']
	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
	}));

	return (
		<Container>
			<Box mt={4}>
				<Typography mt={1} align='center' component="h6" variant="h6">
					Field at your discretion:
				</Typography>
				<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					{Games.map((item: any, index) => {
						return <Grid key={index} item xs={6}>
							<Item sx={{
								'&:hover': {
									cursor: 'pointer'
								}
							}}>
								<Container onClick={() => {
									localStorage.setItem("GameId", JSON.stringify(index));
									navigate("/game");
								}}>
									<Typography mt={1} align='center' component="h6" variant="h6">
										{item}
									</Typography>
								</Container>
							</Item>
						</Grid>;
					})}
				</Grid>
			</Box>
		</Container>
	);
};

export default WelcomePage;