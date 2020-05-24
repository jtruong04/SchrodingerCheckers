set -x
npm run build
set +x

set -x
npm start &
sleep 1
echo $! > .pidfile
set +x
