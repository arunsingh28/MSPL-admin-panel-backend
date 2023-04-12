import nodeCron from 'node-cron'
import userModel from '../Models/user.model';
import { sendEmail } from '../services/mail';

let waterIntake = 0;

// */10 * * * * *  // every 10 seconds
// 0 0 * * * // every day at 12:00 am

nodeCron.schedule('0 0 * * *', async () => {
    try {
        const result = await userModel.updateMany({}, { $set: { waterIntake } });
        if (result) {
            sendEmail('dev@sportylife.in', 'Water Intake Cron Job',
            `
            <p>water intake reset successfully </p>
            <p>Total Modification: ${result.nModified}</p>
            `);
            console.log('Cron job executed successfully');
        }
    } catch (error) {
        console.log(error);
        console.log('Error in cron job');
    }
})


export default nodeCron