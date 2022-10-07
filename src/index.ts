import './infra/config/bootstrap';
import { server } from './server';

const PORT = process.env.PORT ?? 8080;

server.listen(PORT, () => console.info(`Server started at ${PORT}`));
