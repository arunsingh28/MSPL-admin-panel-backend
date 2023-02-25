import logger from './logger'

const errorHandler = () => {
    process.on('unhandledRejection', (err: any) => {
        logger.logEvents(err.message, 'UnhandleReject.csv')
        console.log('\n==== unhandle Rejection fail =====\n', err)

        // uncaoughtException
        process.on('uncaughtException', (err: any) => {
            logger.logEvents(err.message, 'UncaughtException.csv')
            console.log('\n==== uncaught Exception fail =====\n', err)
            // server shutdown
            process.exit(1)
        })
    })
}

export default errorHandler