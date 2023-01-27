import User from "../models/User.js";
import OverallStat from '../models/OverallStet.js'
import Transaction from '../models/Transaction.js'

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getDashboardStats = async (req, res) => {
    try {
        //hardcoded values
        const currentMonth = "November"
        const currentYear = 2021
        const currentDay = "2021-11-15"

        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 })

        const overallStat = await OverallStat.find({ year: currentYear })

        const { totalCustomers, yearlySalesTotal, yearlyTotalSoldUnits, monthlyData,
            salesByCategory } = overallStat[0]

        const thisMonthStat = overallStat[0].monthlyData.find(({month}) => {
            return month === currentMonth
        })

        const todayStat = overallStat[0].dailyData.find(({date}) => {
            return date === currentDay
        })

        res.status(200).json({
            totalCustomers, yearlySalesTotal, yearlyTotalSoldUnits, monthlyData,
            salesByCategory, thisMonthStat, todayStat, transactions
        })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}