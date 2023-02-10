import { INestApplicationContext } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { instrument } from '@socket.io/admin-ui';
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

    const server: Server = super.createIOServer(port, optionsWithCORS);

    instrument(server, {
      auth: false,
      mode: 'development',
    });

    return server;
  }
}
