# DF Static Template

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-%23323330.svg?style=for-the-badge&logo=typescript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/NPM-%231572B6.svg?style=for-the-badge&logo=npm)
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)
![Svelte](https://img.shields.io/badge/svelte-%23E34F26.svg?style=for-the-badge&logo=svelte&logoColor=white)
![tailwindcss](https://img.shields.io/badge/tailwind-%231572B6.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)

</div>

This application template can be used as a starter kit for building Diligence Fabric Framework based applications with the enhanced security and control provided by the DF.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Technology Stack](#technology-stack)
- [Setup](#setup)
- [Build](#building)
- [Upgrade Template](#how-to-upgrade-the-template-manual-process)
- [Deploy](#deployment)
- [Feedback](#feedback)

## Prerequisites

- Windows, Mac or Linux
- Node >= 18
- Git (Version Control)

## Technology Stack

- **FrontEnd**
  - Svelte
  - Tailwind CSS
  - Flowbite Svelte (May get removed in future)

## Setup

1. create or generate a new repository using the below steps.

   - Go to https://github.com/new?template_name=df-svelte-starter-kit&template_owner=uiprojects
   - Fill all required fields and hit `create repository`

2. Once done, clone your repository in your local machine

3. Install the packages

   ```sh
   npm install
   ```

4. Create a new branch in local

   ```sh
   git checkout -b <your-new-branch-name>
   ```

5. Update/create .env file at project root level (You can copy the contents from `env.sample`)

6. You can update the Menu location configuration in the ENV using the variable `PUBLIC_MENU_LOCATION`. By default it renders the menu in the top bar. Here are the two values that you can provide,
   - top: Menu appears in the top navbar
   - side: Menu appears in a collapsible sidebar

## How to upgrade the template? (Manual Process)

1. For now, Upgrading or Template Sync would be a manual process. But we will guide you throughout the process.

2. You need to manually copy paste all the folders/files from the template repo to your application as shown/given below.

   - [/src/lib/components](/src/lib/components/)
   - [/src/lib/server/DF](/src/lib/server/DF/)
   - [/src/routes/(dfauth)](</src/routes/(dfauth)/>)
   - [/src/routes/(base)/+layout.server.ts](</src/routes/(base)/+layout.server.ts>)
   - [/src/routes/(base)/+layout.svelte](</src/routes/(base)/+layout.svelte>)

3. Make sure to install the DF SDK latest version by running the following command

   ```sh
   npm install @ubti\diligence-fabric-sdk@latest
   ```

## Developing

Once you've cloned a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Deployment

1. Create a new Azure App Service using the below button

   [![Deploy to Azure](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Fuicloudanalytics%2Fazure-arm-templates%2Fmain%2FDiligenceFabric%2Fazure-deploy-starter-template.json)

2. Update the Environment variables in `Azure App Service Configuration -> Application Settings`. You can get those information in DF Admin portal -> Application Preview.

   - DF_TENANT_ID
   - DF_APP_ID
   - DF_API_URL

3. To deploy your web application there are multiple ways

   - [Manual deployment](#manual-deployment)
   - [Automated Deployment using GitHub Actions](#automated-deployment-via-ci-cd-process-using-github-actions)
   - [Automated Deployment using Azure Pipelines](#automated-deployment-via-ci-cd-process-using-azure-pipelines-azure-devops)

### Manual Deployment

1. Run the following command

   ```sh
   npm run build
   ```

2. Copy the following contents to a new folder named `production_build`

   - build (folder)
   - package.json
   - server.cjs
   - web.config

3. Use any FTP client for the manual deployment and connect to Azure App Service using FTPs credentials provided in the Deployment Center.

4. After successful connection, copy the contents from the `production_build` folder to the `wwwroot` folder in the Azure App Service FTP.

5. Restart the Azure App Service.

### Automated Deployment via CI CD Process using Github Actions

1. You can review the build and deploy process `YML` file [here](./.github/workflows/adapter-node-deploy.yml)

2. You need to update the app-name and slot names (`YML file`) to match with your ARM templates created/deployed in previous steps.

3. Then Go to [portal.azure.com](https://portal.azure.com) and find the App service resource created in previous steps. You can download the publish profile from the overview page.

4. Next you need to go to the `GitHub Repository -> settings (tab) -> Secrets and Variables -> Actions` then create a new secret named `AZURE_WEBAPP_PUBLISH_PROFILE` and the value should be the contents of the downloaded publish profile (from the previous step).

5. That's it. You are ready to go now make a dummy commit or change any file to the `main` branch and the deployment will get triggered automatically.

### Automated Deployment via CI CD Process using Azure Pipelines (Azure DevOps)

> Will be available soon. Stay tuned!!

## Feedback

If you have any feedback, please reach out to us at nanthakumar.j@ubtiinc.com

<div style="background-color: white">

![Logo](https://149510500.v2.pressablecdn.com/wp-content/uploads/2020/11/UBTI-Logo_Secondary-02.png)

</div>
