import DopplerSDK from "@dopplerhq/node-sdk";

const doppler = new DopplerSDK({
    accessToken: "dp.sa.p76p7uayWoBkivRCPlsCdUxblVfQfQZjVkaGQqERaZV",
})

export async function getSecret(secretName: string) {
    const env = process.env.NODE_ENV!
    const secret = await doppler.secrets.get("polyhook", env, secretName)
    if (!secret.value?.raw) {
        throw new Error(`Secret ${secretName} not found`)
    }
    return secret.value.raw
}
