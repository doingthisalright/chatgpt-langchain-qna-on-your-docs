import './pre-start';
import logger from 'jet-logger';
import server from './server';

server.listen(3000, () => logger.info('Express server started on port: 3000'));
