import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PortainerService } from './portainer.service';

/**
 * PortainerGateway
 * - namespace: 'portainer'
 * - 단일 웹소켓 서버로 클라이언트 연결 관리
 * - 포테이너 상태를 주기적으로 전송
 */
@WebSocketGateway({ namespace: 'portainer', cors: { origin: '*' } })
export class PortainerGateway implements OnGatewayConnection, OnModuleInit {

  private readonly logger = new Logger('PortainerGateway');

  @WebSocketServer()
  server: Server;

  // 클라이언트 연결 시 초기 전송 메시지용 텍스트
  private text = 'is default value';

  constructor(
    private readonly configService: ConfigService,
    private readonly portainerService: PortainerService
  ) { }

  /**
   * 앱 시작 시 호출됨 (onModuleInit)
   * - 포테이너 API 호출
   * - 첫 번째 엔드포인트 ID를 서비스에 저장
   * - 상태 로깅 인터벌 시작
   */
  async onModuleInit() {
    const res = await this.portainerService.getEndpoint();

    // 여러 엔드포인트가 반환될 수 있으나,
    // 현재는 "로컬 단일 포테이너 인스턴스"만 대상으로 사용
    const { Id } = res[0] as { Id: number };

    this.portainerService.setEndpoints(Id);
    this.startInterval();
  }

  /**
   * 클라이언트가 소켓에 연결되었을 때 호출됨
   * - 연결된 클라이언트에게 초기 상태 메시지 전송
   */
  handleConnection(client: Socket) {
    this.logger.log(`클라이언트 연결됨: ${client.id}`);
    client.emit('statusUpdate', this.text);
  }

  /**
   * 5초마다 포테이너 상태를 콘솔로 출력 (테스트용)
   * 추후 emit을 통해 클라이언트 실시간 상태 갱신도 가능
   */
  private startInterval() {
    setInterval(() => {
      const endpoints = this.portainerService.getEndpoints();
      this.logger.log(`현재 엔드포인트 수: ${endpoints}`);
    }, 50000);
  }

  /**
   * 클라이언트가 보내는 'updateNumber' 이벤트 처리
   * - 포테이너 상태 수치를 수신해 저장
   */
  @SubscribeMessage('updateNumber')
  handleUpdate(@MessageBody() data: number) {
    this.portainerService.setEndpoints(data);
    this.logger.log(`엔드포인트 상태 갱신됨: ${this.portainerService.getEndpoints()}`);
  }
}
