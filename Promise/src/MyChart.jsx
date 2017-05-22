import React from 'react';
import { Bar } from 'react-chartjs';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Promise from './Promise';

const MyChartPromise = () =>
    <Promise viewModel="MyChart"
        isResolved={resp => resp.DataArray}
        while={resp => <Progress steps={resp.CompletedRequests} />}
        commError={<CommError />}>
        {resp => <MyChartWithProgress {...resp} />}
    </Promise>

const MyChartWithProgress = ({ CompletedRequests, DataArray }) =>
    <div>
        <Progress steps={CompletedRequests} />
        <MyChart data={DataArray} />
    </div>

const MyChart = ({ data }) => {
    const chartData = {
        labels: Array(data.length).fill(""),
        datasets: [{
            data: data,
            fillColor: 'rgba(75, 192, 192, 0.2)',
            strokeColor: 'rgba(75, 192, 192, 1)'
        }]
    };
    const chartOptions = { responsive: true };
    return <Bar data={chartData} options={chartOptions} />;
}

const Progress = ({ steps }) => {
    const showSteps =
        steps && steps.length === 0 ? <Step><StepLabel>Fetching...</StepLabel></Step>
            : steps.map(step => <Step key={step}><StepLabel>{step}</StepLabel></Step>);
    return (
        <MuiThemeProvider>
            <Stepper activeStep={steps.length}>
                {showSteps}
            </Stepper>
        </MuiThemeProvider>
    );
}

const CommError = () => <div>Connection is interrupted. This will resume when it recovers...</div>

export default MyChartPromise;