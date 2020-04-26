module.exports = {
    mutation: ` mutation createAppBuild($input:CreateAppBuildInput!) { 
        createAppBuild(input: $input) 
            {
                id
            }
        }
    `
}