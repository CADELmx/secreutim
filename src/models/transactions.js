import { connex } from "./conector"

export const transaction = async ({ transaction, args, callback }) => {
    try {
        const collection = await connex({})
        const { error, data } = await transaction(collection, ...args)
        if (error) {
            console.error(error)
            return error
        }
        return callback(data)
    } catch (e) {
        console.error(e)
    }
}
