import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server, ServerOptions } from 'socket.io';

export class SocketIOAdapter extends IoAdapter {
  constructor(
    private app: INestApplicationContext, //
    private corsOrigin: (string | RegExp)[],
  ) {
    super(app);
  }

  createIOServer(port: number, options?: ServerOptions) {
    console.log('createIOServer', this.corsOrigin);

    const optionsWithCORS: ServerOptions = {
      ...options,
      cors: {
        origin: this.corsOrigin,
        methods: ['GET', 'POST'],
        credentials: true,
      },
    };

    // const jwtService = this.app.get(JwtService);

    const server: Server = super.createIOServer(port, optionsWithCORS);

    // server.use(createTokenMiddleware(jwtService, this.logger));

    return server;
  }

  // tokenizePayload(socket: SocketWithAuth, next: NextFunction) {
  //   // for Postman testing support, fallback to token header
  //   const token = socket.handshake.auth.token || socket.handshake.headers['token'];

  //   try {
  //     const payload = jwtService.verify(token);
  //     socket.userID = payload.sub;
  //     socket.pollID = payload.pollID;
  //     socket.name = payload.name;
  //     next();
  //   } catch {
  //     next(new Error('FORBIDDEN'));
  //   }
  // }
}

// const createTokenMiddleware = (jwtService: JwtService, logger: Logger) => (socket: SocketWithAuth, next) => {
//   // for Postman testing support, fallback to token header
//   const token = socket.handshake.auth.token || socket.handshake.headers['token'];

//   logger.debug(`Validating auth token before connection: ${token}`);

//   try {
//     const payload = jwtService.verify(token);
//     socket.userID = payload.sub;
//     socket.pollID = payload.pollID;
//     socket.name = payload.name;
//     next();
//   } catch {
//     next(new Error('FORBIDDEN'));
//   }
// };
