module.exports = {
    mutation: ` mutation createUserProjectEdge($input:CreateProjectUserEdgeInput!) { 
        createProjectUserEdge(input: $input) 
            {
                id
            }
        }
    `
}