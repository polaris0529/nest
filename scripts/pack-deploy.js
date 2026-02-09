
/**
 * 배포용 최소 파일만 deploy/ 폴더에 모음.
 * 실행: npm run build 후 npm run deploy:prepare (또는 npm run deploy)
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const deployDir = path.join(root, 'deploy');
const serverDeploy = path.join(deployDir, 'server');
const clientDeploy = path.join(deployDir, 'client');

if (!fs.existsSync(path.join(root, 'server', 'dist'))) {
  console.error('server/dist 없음. 먼저 npm run build 를 실행하세요.');
  process.exit(1);
}
if (!fs.existsSync(path.join(root, 'client', 'dist'))) {
  console.error('client/dist 없음. 먼저 npm run build 를 실행하세요.');
  process.exit(1);
}

fs.rmSync(deployDir, { recursive: true, force: true });
fs.mkdirSync(serverDeploy, { recursive: true });
fs.mkdirSync(clientDeploy, { recursive: true });

fs.cpSync(path.join(root, 'server', 'dist'), path.join(serverDeploy, 'dist'), { recursive: true });
fs.copyFileSync(path.join(root, 'server', 'package.json'), path.join(serverDeploy, 'package.json'));
if (fs.existsSync(path.join(root, 'server', 'package-lock.json'))) {
  fs.copyFileSync(path.join(root, 'server', 'package-lock.json'), path.join(serverDeploy, 'package-lock.json'));
}
fs.cpSync(path.join(root, 'client', 'dist'), path.join(clientDeploy, 'dist'), { recursive: true });

console.log('배포 패킷 준비됨: deploy/');
console.log('  server/  (dist + package.json)');
console.log('  client/dist/');
console.log('');
console.log('배포 서버에서:');
console.log('  1. deploy/server, deploy/client 를 서버에 복사');
console.log('  2. cd server && npm install --production');
console.log('  3. node dist/main (또는 PORT=3000 node dist/main)');
