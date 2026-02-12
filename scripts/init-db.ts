import { getPayload } from 'payload'
import config from '../payload.config'

async function initDB() {
    console.log('==> Initializing Payload CMS to push database schema...')
    try {
        const payload = await getPayload({ config })
        console.log('==> Database schema pushed successfully!')
        process.exit(0)
    } catch (error) {
        console.error('==> Failed to initialize Payload:', error)
        process.exit(1)
    }
}

initDB()
