import WorldAPI from "@worldapi/sdk";

export default new WorldAPI({
    apiKey: "sk_de889db8c65034dc41c44e842a0f87dbfefc2c3bf56cdecc55f768a39c0958eb",
    autoDetectEnvironmentOverride: {
        active: true,
        environment: "development"
    },
    aliases: {
        auth: {
            github: {
                development: "service_504b3d7e85fef26ceca7b8396941e5c9"
            }
        }
    }
})