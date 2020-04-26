module.exports = {
    mutation: ` mutation CreateAppBuild { 
        createAppBuild(input:{assetId: $assetId, name:$name, appetizeKey:$appetizeKey, version:$version ,uploadedByUserId:$uploadedByUserId }) 
            {
                id
            }
        }
    `
}