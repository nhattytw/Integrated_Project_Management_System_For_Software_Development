require('dotenv').config({ path: './config/config.env' })
const { Octokit } = require("@octokit/rest");

const createRespository =  async (repositoryName,description)=>{
    const octokitSDK =  new Octokit({
        auth:process.env.GIT_HUB_FGAT
    })
     await octokitSDK.request('POST /orgs/{org}/repos', {
        org: 'RoblexIPMS',
        name: repositoryName,
        description: description,
        homepage: 'https://github.com',
        'private': true,
        has_issues: true,
        has_projects: true,
        has_wiki: true
      })
}

module.exports = createRespository