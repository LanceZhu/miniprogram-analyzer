#! /bin/bash
set -ex

# example/seed
start_time=`date +%s`

echo '==> generate report for example seed'

node bin/index.js analyze example/seed > /dev/null

end_time=`date +%s`

echo "time comsumed: $(($end_time - start_time))s"

# example/weiyou
start_time=`date +%s`

echo '==> generate report for example weiyou'

node bin/index.js analyze example/weiyou > /dev/null

end_time=`date +%s`

echo "time comsumed: $(($end_time - start_time))s"