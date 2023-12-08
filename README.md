<p align="center">
  <img src="https://www.telmeeth.com/wp-content/uploads/2018/11/telmeeth-logo-new.png" height="30" /><br/>
  <span><b>Telmeeth</b></span><br/>
  <span><a href="https://play.google.com/store/apps/details?id=com.telmeeth.teacher" target="_blank">Android</a>, <a href="https://itunes.apple.com/sa/app/telmeeth-%D8%AA%D9%84%D9%85%D9%8A%D8%B0-%D9%85%D8%B9%D9%84%D9%85/id1449944716?mt=8" target="_blank">iOS</a>, <a href="https://www.my.telmeeth.com" target="_blank">Web</a> & <a href="https://github.com/ahmed-almesbahi/telmeeth/releases" target="_self">Desktop</a> with <b>95%+ code sharing</b> between them<br/><i>thanks to React Native + React Native Web</i></span><br/>
  <p align="center">
    <a href="https://itunes.apple.com/sa/app/telmeeth-%D8%AA%D9%84%D9%85%D9%8A%D8%B0-%D9%85%D8%B9%D9%84%D9%85/id1449944716?mt=8" target="_blank"><img alt="Download on the App Store" height="50" src="https://user-images.githubusercontent.com/619186/52173137-d416fd00-2764-11e9-98c1-77607061f188.png" /></a>
    <a href="https://play.google.com/store/apps/details?id=com.telmeeth.teacher" target="_blank"><img alt="Get it on Google Play" height="50" src="https://user-images.githubusercontent.com/619186/52173136-d416fd00-2764-11e9-9599-7c098c14bb37.png" /></a>
  </p>
</p>

<br/>

## Tech Stack

- [TypeScript](https://github.com/Microsoft/TypeScript)
- [Create React App](https://github.com/facebook/create-react-app)
- [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) (Monorepo)
- [React](https://github.com/facebook/react) with [Hooks](https://reactjs.org/docs/hooks-intro.html)
- [React Native](https://github.com/facebook/react-native)
- [React Native Web](https://github.com/necolas/react-native-web)
- [Redux](https://github.com/reduxjs/react-redux)
- [Redux Persist](https://github.com/rt2zz/redux-persist)
- [Redux Saga](https://github.com/redux-saga/redux-saga/)
- [Reselect](https://github.com/reduxjs/reselect)
- [GraphQL](https://github.com/facebook/graphql)
- [zeit.co/now](https://zeit.co/now)
- [prisma.io](https://www.prisma.io/)

<br/>

### Running it locally

#### Requirements

- [Yarn](https://yarnpkg.com/)
- [nodejs.org](http://nodejs.org/) 8 is required because of AWS. No, they don't support 10 yet.
- [docker-compose](https://www.docker.com/products/docker-engine)
- [yarnpkg.com](https://yarnpkg.com/en/)
- [prisma-cli](https://www.prisma.io/docs/prisma-cli-and-configuration/using-the-prisma-cli-alx4/)

> **Note:** On Windows, you might need to install Bash commands (e.g. via [git-scm](https://git-scm.com/downloads) or via [linux bash shell](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/))

That's it. It will start three workers: `TypeScript compilation watcher`, `Web server` (create-react-app) and the `Mobile server` (react-native packager). The browser will open automatically.

> Alternatives to `yarn dev`: `yarn dev:web`, `yarn dev:desktop`, `yarn dev:mobile`

To open the mobile projects, use:

- `yarn xcode`
- `yarn studio`

## Setup project

- `git clone https://github.com/ahmed-almesbahi/telmeeth`
- `cd telmeeth`
- `yarn`
- `yarn docker:up`
- `yarn env dev`
- `yarn prisma:deploy`

## Tasks

- `yarn dev` start development
- `yarn prisma:deploy` after `prisma/datamodel.graphql` change
- `yarn prisma:generate` generate Prisma client
- `yarn prisma:delete` get rid of the whole service
- `yarn gen` after `api/schema.graphql` change
- `yarn env dev` copy `.env.dev` to `.env`
- `yarn env prod` copy `.env.prod` to `.env`
- `yarn build` local build
- `yarn start` local start
- `yarn test` before commit
- `now` deploy to <https://name-xxxxxxxxx.now.sh>
- `now && now alias` deploy to aliased custom domain

## Tips

- `yarn dev`, then open [localhost:5000/playground](http://localhost:5000/playground) and set HTTP HEADERS to `{ "Authorization": "Bearer token" }`. Token is browser cookie for api and `yarn prisma token` for db.
- After `prisma/docker-compose.yml` change, run `yarn docker:up`
- To deploy local Prisma to demo server, set up Prisma with demo database, and put its endpoint to .env.prod (copy paste of .env.dev), then `yarn env prod`, then `yarn prisma:deploy`.
