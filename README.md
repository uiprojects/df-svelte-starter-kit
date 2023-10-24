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

## How to upgrade the template? (Manual Process)

1. For now, Upgrading or Template Sync would be a manual process. But we will guide you throughout the process.

2. You need to manually copy paste all the folders/files from the template repo to your application as shown/given below.
    - [/src/lib/components](/src/lib/components/)
    - [/src/lib/server/DF](/src/lib/server/DF/)
    - [/src/routes/(dfauth)](/src/routes/(dfauth)/)
    - [/src/routes/(base)/+layout.server.ts](/src/routes/(base)/+layout.server.ts)
    - [/src/routes/(base)/+layout.svelte](/src/routes/(base)/+layout.svelte)

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


## Feedback

If you have any feedback, please reach out to us at nanthakumar.j@ubtiinc.com

<div style="background-color: white">

![Logo](https://149510500.v2.pressablecdn.com/wp-content/uploads/2020/11/UBTI-Logo_Secondary-02.png)

</div>