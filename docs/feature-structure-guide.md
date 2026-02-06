# 업무용 기능 추가 시 권장 구조 가이드

스크랩한 [NestJS 아키텍처 패턴](https://javaexpert.tistory.com/1071)과 현재 프로젝트를 기준으로, **개인 업무에 필요한 기능**을 넣을 때 쓰기 좋은 구조를 정리한 문서입니다.

---

## 1. 어떤 패턴을 쓸지

| 상황 | 추천 |
|------|------|
| 새 업무 기능 대부분 (CRUD, API, 화면 연동) | **Layered(레이어드)** 유지 |
| DB/외부 API 교체 가능성 있음 | Layered + **Repository 계층** 추가 |
| 해당 기능만 도메인 규칙이 복잡함 | 그 모듈만 **Hexagonal** 스타일로 분리 검토 |

→ 지금처럼 **기능별 모듈 + Controller/Service** 구조를 유지하고, 필요할 때만 Repository를 넣는 방식이 적당합니다.

---

## 2. 새 기능 추가 시 디렉터리 구조 (Layered 기준)

**한 가지 업무 기능 = `src` 아래 하나의 폴더(모듈)** 로 두는 것을 권장합니다.

```
src/
└── {기능명}/                    # 예: notice, task, report
    ├── {기능명}.module.ts       # 모듈 (필수)
    ├── {기능명}.controller.ts   # HTTP/라우트 (필수)
    ├── {기능명}.service.ts      # 비즈니스 로직 (필수)
    ├── {기능명}.repository.ts   # DB 접근만 할 때 선택
    ├── dto/                     # 요청/응답 형식
    │   ├── create-{기능}.dto.ts
    │   └── update-{기능}.dto.ts
    ├── entities/               # 타입/엔티티 정의 (필요 시)
    │   └── {기능}.entity.ts
    └── *.spec.ts                # 테스트 (선택)
```

### 규칙 요약

| 항목 | 권장 |
|------|------|
| 폴더/파일명 | kebab-case (`work-log`, `work-log.service.ts`) |
| 모듈/클래스명 | PascalCase (`WorkLogModule`, `WorkLogService`) |
| 한 모듈 역할 | 한 가지 업무 도메인(예: 공지, 업무로그, 리포트) |
| DB 사용 | Service → Prisma 직접 **또** Service → Repository → Prisma |

---

## 3. 계층별 역할 (스크랩 내용 정리)

| 계층 | 파일 | 할 일 |
|------|------|--------|
| **Controller** | `*.controller.ts` | 요청 받기, DTO 검증, Service 호출, 응답만 반환 |
| **Service** | `*.service.ts` | 비즈니스 로직, 트랜잭션/흐름 제어, Repository 또는 Prisma 호출 |
| **Repository** | `*.repository.ts` | DB(Prisma) 호출만. 테이블/쿼리 변경 시 여기만 수정 |

- Controller에는 비즈니스 로직을 두지 않고, Service에만 두는 것이 좋습니다.
- 나중에 DB를 바꾸거나 쿼리만 바꿀 가능성이 있으면, 해당 모듈에 `*.repository.ts`를 두고 Service는 Repository만 호출하도록 합니다.

---

## 4. 새 기능 추가 체크리스트

1. **`src/{기능명}/` 폴더 생성**
2. **`{기능명}.module.ts`**  
   - `imports`, `controllers`, `providers` 등록  
   - Prisma 쓸 경우 `PrismaModule` import 또는 `PrismaService` provider
3. **`{기능명}.controller.ts`**  
   - `@Controller('경로')`  
   - 라우트별로 Service 메서드만 호출
4. **`{기능명}.service.ts`**  
   - `@Injectable()`  
   - 비즈니스 로직 + Prisma 또는 Repository 호출
5. **`app.module.ts`**  
   - `imports`에 `{기능명}Module` 추가
6. (선택) **`dto/`**, **`entities/`**  
   - API 스펙이 정해지면 DTO, 엔티티 정의
7. (선택) **`{기능명}.repository.ts`**  
   - DB 접근을 한곳으로 모을 때 추가

---

## 5. 현재 프로젝트와 맞추는 방법

- 이미 있는 **api, auth, user, role, file, portainer** 등과 **같은 레벨**에 새 폴더를 두면 됩니다.
- 예: 업무 로그 기능 → `src/work-log/`  
  - `work-log.module.ts`, `work-log.controller.ts`, `work-log.service.ts`  
  - 필요 시 `work-log.repository.ts`, `dto/`, `entities/`
- **공통 로직**(예: 인증, 로깅)은 기존처럼 `auth`, `logger`, `utils` 등에 두고, 새 모듈에서 필요한 것만 import 합니다.

---

## 6. 정리

- **업무용 기능 추가** → **기능당 하나의 모듈 폴더** + **Controller / Service (선택: Repository)** 구조를 유지.
- 스크랩한 글의 “소규모 → Layered” 추천에 맞추고, 필요해질 때만 Repository나 Hexagonal 스타일을 도입하면 됩니다.

이 가이드를 기준으로 새 기능을 넣으면, 나중에 유지보수와 기능 확장이 수월해집니다.
