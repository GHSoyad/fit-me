
const useChartData = (title, labels, data) => {

    const chartData = {
        defaultFontFamily: "Poppins",
        labels: labels,
        datasets: [
            {
                label: title,
                data: data,
                borderColor: "#2481fc",
                borderWidth: "2",
                backgroundColor: "transparent",
                pointBackgroundColor: "#2481fc80",
                pointHoverRadius: "6",
                cubicInterpolationMode: 'monotone',
            }
        ],
    };

    return chartData;
};

export default useChartData;