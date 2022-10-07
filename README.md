## Github API Proxy

This is my API for getting information from github users, repos and more

### Pre requisites

- NodeJS (version 16 or higher)
- Yarn or NPM

### How to run

1. Clone the project
```bash
git clone https://github.com/abnerpersio/github-proxy.git
```

2. Install project dependencies
```bash
yarn install # or npm install
```

3. Configure environment variables

Copy `.env.example` file, rename it to `.env` then configure your variables

4. Run with ts-node-dev
```bash
yarn dev # or npm run dev
```

#### Running project tests (with jest)
```bash
yarn test # or npm run test
```

#### Building for production (with esbuild) 
```bash
yarn build # or npm run build
```

#### Using docker

Use docker compose for running the project locally:
```bash
docker-compose up
```