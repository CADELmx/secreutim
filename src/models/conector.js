import { Collection, MongoClient } from "mongodb"

export const singleton = (initState = null) => {
    let init = initState
    const update = (updated) => { init = updated }
    const get = () => init
    return [get, update]
}

/**
 * Creates a database client
 * @param {String} uri Conection string to the database
 * @returns {MongoClient} Returns a MongoClient object
 */
export const createClient = (uri = process.env.MONGO_URI) => {
    try {
        return singleton(new MongoClient(uri))
    } catch (error) {
        console.error(`Error connecting to the database: ${error.message}`)
        return
    }
}

/**
 * Validates if the client exists, if not, creates a new one
 * @returns {MongoClient} Returns a MongoClient object
 */
export const validateClient = () => {
    try {
        const [client, update] = createClient()
        if (client() != null) {
            console.log('Using existent database client')
        } else {
            console.log('Creating a new database client')
            update(client())
        }
        return client()
    } catch (error) {
        console.error(`Error validating the database client: ${error.message}`)
        return
    }
}
/**
 * 
 * @param {String} dbname The name of the database
 * @param {String} collec The name of the collection
 * @returns {Collection} Returns an object with the collection
 */
export const connex = ({ dbname = 'secretaria', collec = 'personal' }) => {
    try {
        const client = validateClient()
        const datab = client.db(dbname)
        const collection = datab.collection(collec)
        return collection
    } catch (error) {
        console.error(`Error retrieving database collection: ${error.message}`)
        return
    }
}