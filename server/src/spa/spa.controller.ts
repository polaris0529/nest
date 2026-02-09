import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { SpaGuard } from './spa.guard';

const VITE_DEV_PORT = 5173;
const isDev = process.env.NODE_ENV !== 'production';

@Controller()
@UseGuards(SpaGuard)
export class SpaController {
  private readonly clientIndex = path.join(process.cwd(), '..', 'client', 'dist', 'index.html');

  private readonly viteProxy = createProxyMiddleware({
    target: `http://localhost:${VITE_DEV_PORT}`,
    changeOrigin: true,
    ws: true,
  });

  @Get()
  root(@Req() req: Request, @Res() res: Response) {
    if (isDev) return this.viteProxy(req, res, () => {});
    res.sendFile(this.clientIndex);
  }

  @Get('*')
  fallback(@Req() req: Request, @Res() res: Response) {
    if (isDev) return this.viteProxy(req, res, () => {});
    res.sendFile(this.clientIndex);
  }
}
