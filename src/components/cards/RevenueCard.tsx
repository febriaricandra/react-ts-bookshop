type BarProps = {
    height: number;
};

type ChartProps = {
    data: number[];
};

const RevenueCard = () => {
    const data = [40, 60, 45, 55, 70, 90, 105, 120];

    return (
        <div className="bg-[#6366F1] rounded-3xl p-8">
            <Header />
            <RevenuePercentage />
            <Chart data={data} />
            <Footer />
        </div>
    );
};

const Header = () => (
    <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white">
            <div className="p-2 bg-white/10 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <span className="text-lg">Revenue last quarter</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200" />
    </div>
);

const RevenuePercentage = () => (
    <div className="text-white text-4xl font-bold mb-6">+573%</div>
);

const Chart = ({ data }: ChartProps) => (
    <div className="flex justify-between items-end mt-8 overflow-hidden">
        <div className="flex gap-4">
            {data.map((height, index) => (
                <Bar key={index} height={height} />
            ))}
        </div>
        <span className="text-white">$3.4m</span>
    </div>
);

const Bar = ({ height }: BarProps) => {

    return (
        <div className="w-6 bg-indigo-400 rounded overflow-hidden">
            <div className="w-full bg-white rounded" style={{ height: `${height}%`, marginTop: `${200 - height}%` }} />
        </div>
    );
};
const Footer = () => (
    <div className="flex justify-between text-white/60 text-sm mt-2">
        <span>3.25</span>
        <span>10.23</span>
    </div>
);

export default RevenueCard;
