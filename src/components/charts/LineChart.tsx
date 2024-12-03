import Chart from "react-apexcharts";

function LineChart() {

    const series = [
        {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
        },
        {
            name: "series-2",
            data: [10, 20, 35, 40, 39, 50, 60, 91, 105],
        },
        {
            name: "series-3",
            data: [5, 10, 15, 20, 15, 20, 25, 30, 35],
        }
    ];
    return (
        <div className="p-4 bg-gray-800 rounded-lg">
            <Chart options={
                {
                    chart: {
                        type: 'line',
                        zoom: {
                            enabled: false,
                        },
                        toolbar: {
                            show: true, // Toolbar di pojok kanan atas
                            tools: {
                                download: false, // Sembunyikan tombol unduh
                            },
                        },
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3,
                    },
                    colors: ["#3B82F6"],
                    xaxis: {
                        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
                        labels: {
                            style: {
                                colors: "#94A3B8", // Warna label horizontal
                            },
                        },
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#94A3B8", // Warna label vertikal
                            },
                        },
                    },
                    grid: {
                        borderColor: "#334155", // Warna garis grid
                    },
                    tooltip: {
                        theme: "dark", // Tooltip dengan tema gelap
                    },
                    legend: {
                        show: false, // Tampilkan legenda
                    },
                }
            } series={series} type="line" width="100%" />
        </div>
    )
}

export default LineChart