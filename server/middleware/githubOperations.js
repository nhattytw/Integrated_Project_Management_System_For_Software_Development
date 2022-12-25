require('dotenv').config({ path: './config/config.env' })
const Octokit = require("octokit")

const createRespository =  async (repositoryName)=>{
    const octokitSDK =  new Octokit.Octokit({
        auth:process.env.GIT_HUB_FGAT
    })
     await octokitSDK.request('POST /orgs/{org}/repos', {
        org: 'RoblexIPMS',
        name: repositoryName,
        description: 'This is your first repository',
        homepage: 'https://github.com',
        'private': true,
        has_issues: true,
        has_projects: true,
        has_wiki: true
      })
}

createRespository("IPMSAKILE1")