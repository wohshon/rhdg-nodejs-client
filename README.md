# rhdg-nodejs-client

Simple nodejs client for RHDG 8 for testing purpose

## setup / prereq

- Deploy a DG
- Create a cache 

### Running the app

set the port and hostname of the DG
```
export DG_HOST = <host>
export DG_PORT = <port>
```

Start the app

`npm start`

### put value in cache

`curl -X PUT <host>:<port>/put/<cachename>/<key>/<value>`

e.g.

`curl -X PUT <host>:<port>/put/async-cache1/hello/world`

### get value from cache

`curl -X GET <host>:<port>/get/<cachename>/<key>`

e.g.

`curl -X GET <host>:<port>/get/async-cache1/hello`
