export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        const { getPayload } = await import('payload')
        const config = await import('./payload.config')

        console.log('==> Initializing Payload CMS (pushing schema if needed)...')
        await getPayload({ config: config.default })
        console.log('==> Payload CMS initialized successfully!')
    }
}
