import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import LoadingSpinner from "./LoadingSpinner"; // Brought in our upgraded spinner!

const AnalyticsTab = () => {
    const [analyticsData, setAnalyticsData] = useState({
        users: 0,
        products: 0,
        totalSales: 0,
        totalRevenue: 0,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [dailySalesData, setDailySalesData] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const response = await axios.get("/analytics");
                setAnalyticsData(response.data.analyticsData);
                setDailySalesData(response.data.dailySalesData);
            } catch (error) {
                console.error("Error fetching analytics data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnalyticsData();
    }, []);

    if (isLoading) {
        return (
            <div className="h-96 flex items-center justify-center">
                <LoadingSpinner fullScreen={false} />
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8'>
                <AnalyticsCard
                    title='Total Users'
                    value={analyticsData.users.toLocaleString()}
                    icon={Users}
                    iconColor='text-sky-400'
                />
                <AnalyticsCard
                    title='Total Products'
                    value={analyticsData.products.toLocaleString()}
                    icon={Package}
                    iconColor='text-indigo-400'
                />
                <AnalyticsCard
                    title='Total Sales'
                    value={analyticsData.totalSales.toLocaleString()}
                    icon={ShoppingCart}
                    iconColor='text-purple-400'
                />
                <AnalyticsCard
                    title='Total Revenue'
                    value={`₹${analyticsData.totalRevenue.toLocaleString()}`} // Fixed the currency symbol here!
                    icon={DollarSign}
                    iconColor='text-emerald-400'
                />
            </div>

            <motion.div
                className='bg-surface backdrop-blur-xl border border-border-subtle rounded-2xl p-4 sm:p-6 shadow-2xl'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {/* Added a nice header for the chart */}
                <h3 className="text-xl font-bold text-text-main mb-6 pl-2">Sales Overview</h3>
                
                <div className="h-[300px] sm:h-[400px]">
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={dailySalesData}>
                            {/* Styled the grid lines to blend with the dark theme */}
                            <CartesianGrid strokeDasharray='3 3' stroke='#334155' vertical={false} />
                            
                            <XAxis 
                                dataKey='date' 
                                stroke='#94a3b8' 
                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                tickMargin={10} 
                            />
                            <YAxis 
                                yAxisId='left' 
                                stroke='#94a3b8' 
                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                tickMargin={10} 
                            />
                            <YAxis 
                                yAxisId='right' 
                                orientation='right' 
                                stroke='#94a3b8' 
                                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                                tickMargin={10} 
                            />
                            
                            {/* Styled the Tooltip so it isn't a glaring white box */}
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                                    borderColor: 'rgba(255, 255, 255, 0.1)', 
                                    borderRadius: '12px',
                                    backdropFilter: 'blur(10px)',
                                    color: '#fff'
                                }}
                                itemStyle={{ fontWeight: 600 }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            
                            {/* Updated line colors to match our new theme palette */}
                            <Line
                                yAxisId='left'
                                type='monotone'
                                dataKey='sales'
                                stroke='#6366f1' // Primary Indigo
                                strokeWidth={3}
                                activeDot={{ r: 8, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
                                name='Sales'
                                dot={{ fill: '#1e293b', stroke: '#6366f1', strokeWidth: 2, r: 4 }}
                            />
                            <Line
                                yAxisId='right'
                                type='monotone'
                                dataKey='revenue'
                                stroke='#a855f7' // Purple Accent
                                strokeWidth={3}
                                activeDot={{ r: 8, fill: '#a855f7', stroke: '#fff', strokeWidth: 2 }}
                                name='Revenue'
                                dot={{ fill: '#1e293b', stroke: '#a855f7', strokeWidth: 2, r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsTab;

const AnalyticsCard = ({ title, value, icon: Icon, iconColor }) => (
    <motion.div
        className='bg-surface backdrop-blur-lg border border-border-subtle rounded-2xl p-6 shadow-lg overflow-hidden relative group hover:border-primary/30 hover:shadow-primary/10 transition-all duration-300'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className='flex justify-between items-start'>
            <div className='z-10'>
                <p className='text-text-muted text-sm mb-1 font-medium'>{title}</p>
                <h3 className='text-text-main text-3xl font-extrabold tracking-tight'>{value}</h3>
            </div>
            {/* Added a glowing backdrop to the small icon */}
            <div className={`p-3 rounded-xl bg-surface-hover border border-border-subtle shadow-inner ${iconColor}`}>
                <Icon size={24} />
            </div>
        </div>
        
        {/* Subtle watermark icon in the background that scales up slightly on hover */}
        <div className='absolute -bottom-6 -right-6 text-slate-700/30 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12 pointer-events-none'>
            <Icon className='h-32 w-32' />
        </div>
    </motion.div>
);