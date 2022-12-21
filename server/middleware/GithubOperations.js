const Octokit = require("octokit")
const GIT_HUB_FGAT = "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"

const createRespository =  async (repositoryName)=>{

    const octokitSDK =  new Octokit.Octokit({
        auth:GIT_HUB_FGAT
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