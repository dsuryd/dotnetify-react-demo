import React from 'react';
import dotnetify from 'dotnetify';
import { Bar } from 'react-chartjs';
import Promise from './Promise';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

const MyChartPromise = () => {
    const isFulfilled = resp => resp.DataArray !== null;
    const showProgress = resp => <Progress steps={resp.CompletedRequests} />;
    const onFulfilled = resp =>
        <div>
            <Progress steps={resp.CompletedRequests} />
            <MyChart data={resp.DataArray} />
        </div>
    return <Promise source="MyChart" isFulfilled={isFulfilled} while={showProgress} then={onFulfilled} />
}

const Progress = ({ steps }) => {
    const showSteps =
        steps !== null && steps.length === 0 ? <Step><StepLabel>Fetching...</StepLabel></Step>
            : steps.map(step => <Step key={step}><StepLabel>{step}</StepLabel></Step>);
    return (
        <div>
            <MuiThemeProvider>
                <Stepper activeStep={steps.length}>
                    {showSteps}
                </Stepper>
            </MuiThemeProvider>
        </div>
    );
}

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

export default MyChartPromise;