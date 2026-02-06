# NestJS 추천 아키텍처 패턴 스크랩 & 분석

**출처**: [NestJS에서 추천하는 아키텍처 패턴](https://javaexpert.tistory.com/1071) (javaexpert.tistory.com, 2025.02.13)

---

## 1. 요약

NestJS에서 자주 쓰이는 네 가지 아키텍처 패턴을 정리한 글이다.


| 패턴            | 한글명         | 적합한 규모/상황       |
| ------------- | ----------- | --------------- |
| Layered       | 레이어드        | 소규모 ~ 대규모 기본    |
| Hexagonal     | 헥사고날(Clean) | 비즈니스 로직이 중요한 경우 |
| Microservices | 마이크로서비스     | 대규모·확장성 필요      |
| CQRS          | 명령/쿼리 분리    | 고성능 데이터 처리      |


---

## 2. 패턴별 스크랩 요약

### 2.1 Layered Architecture (레이어드 아키텍처)

- **역할**: Controller → Service → Repository(Model) 계층 분리.
- **구성**: Module, Repository(Model), Service, Controller.
- **장점**: 유지보수·확장성, 모듈화 용이, Nest 기본 구조와 잘 맞음.
- **단점**: 계층이 많아지면 성능 부담, 서비스 계층 비대화 위험.

**디렉터리 예시**  
`users.controller.ts` → `users.service.ts` → `users.repository.ts`, `users.module.ts`

---

### 2.2 Hexagonal Architecture (헥사고날 / Clean Architecture)

- **역할**: 비즈니스 로직과 DB/API/UI 등 외부 시스템 의존성 분리.
- **계층**: Domain(핵심 로직) → Application(Use Case) → Infrastructure(I/O) → Interface(Controller 등).
- **장점**: 도메인 보호, 인프라 변경 영향 최소화, 확장·유지보수에 유리.
- **단점**: 구조 복잡, 작은 프로젝트엔 과할 수 있음, 학습 곡선 높음.

**디렉터리 예시**  
`domain/`, `application/`, `infrastructure/`, `interfaces/`

---

### 2.3 Microservices Architecture (마이크로서비스)

- **역할**: 앱을 여러 독립 서비스로 분리. Nest는 gRPC, Kafka, RabbitMQ, NATS 등 지원.
- **구성**: Gateway, Microservices(각자 DB·비즈니스 로직), Message Broker.
- **장점**: 독립 배포·스케일링, 장애 격리, 기술 스택 혼용 가능.
- **단점**: 운영 복잡도·통신 오버헤드, 데이터 일관성·분산 트랜잭션 이슈.

---

### 2.4 CQRS (Command Query Responsibility Segregation)

- **역할**: Command(쓰기)와 Query(읽기) 분리. 이벤트 기반과 함께 사용.
- **구성**: Command, Query, Event Handlers.
- **장점**: 성능·확장성, 이벤트 소싱과 결합 시 히스토리 관리 용이.
- **단점**: 구조 복잡, 소규모에선 오버킬, 데이터 동기화·일관성 관리 어려움.

---

## 3. 분석 (현재 프로젝트 관점)

### 3.1 현재 프로젝트 구조

- **api**, **auth**, **user**, **role**, **dashboard**, **portainer**, **file** 등 기능별 모듈.
- 각 모듈: `*.controller.ts`, `*.service.ts`, `*.module.ts`, 일부는 Prisma 직접 사용(Repository 계층 없음).

→ **Layered에 가깝지만 Repository 계층이 없고**, Service에서 Prisma(또는 DB)를 직접 사용하는 형태.

### 3.2 글의 추천과의 매핑

- **소규모·일반 CRUD 중심** → 지금처럼 **Layered + Controller/Service** 유지가 적합.
- **DB 접근을 한곳으로 모으고 싶다면** → Layered에서 **Repository 계층 추가** (Prisma를 Repository로 감싸기).
- **도메인 규칙이 복잡해지면** → **Hexagonal** 도입 검토 (Domain/Application/Infrastructure 분리).
- **서비스가 커지고 팀/배포 단위를 나누려면** → **Microservices** 검토.
- **읽기/쓰기 부하가 크게 갈리면** → **CQRS** 검토.

### 3.3 정리

- 출처 글의 “소규모 → Layered” 추천과 현재 구조는 잘 맞음.
- 개선 시에는 **Repository 도입**(Prisma 래핑)으로 Layered를 완성하는 방향을 우선 고려할 만함.

---

## 4. 원문 메타 정보

- **카테고리**: 스터디/NestJS  
- **작성일**: 2025. 2. 13. 10:24  
- **관련 글**: NestJS Seeder·Faker, 페이징, MkDocs, 필수 개념 정리 등 (원문 하단 링크)

