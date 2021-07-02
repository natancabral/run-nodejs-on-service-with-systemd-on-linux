# Run node.js service with systemd on Linux

<img src="assets/external-content.duckduckgo.com.gif"/>

**Node.js** as a running service is becoming more and more popular these days. One of the issues many developers face is how to ensure their node.js service starts automatically, and more importantly how to keep it running should it crash. 

**Using systemd, which makes this process a lot simpler and more efficient**, and means that we do not need another scripts to run your **server node.js**.

[read my article](https://natancabral.medium.com/run-node-js-service-with-systemd-on-linux-42cfdf0ad7b2)

## Create the node.js server
```js
const http = require('http');
const hostname = '0.0.0.0'; // listen on all ports
const port = 3311;

http.createServer((req, res) => {

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');

}).listen(port, hostname, () => {

  console.log(`Server running at http://${hostname}:${port}/`);

});
```
We will save this file (for example) as **/home/myserver/server.js** . Verify the node server works on terminal:

```bash
$ node /home/myserver/server.js
# or nodejs, maybe
$ nodejs /home/myserver/server.js
```

Output: 
- Server running at http://0.0.0.0:3311/

## Create the service file on Systemd

Create a service file on 
**/etc/systemd/system/** or 
**/lib/systemd/system/** (etc|lib).

```bash
$ cd /etc/systemd/system/
$ nano myserver.service
```
File location: 
- **/etc/systemd/system/myserver.service**

```bash
[Unit]
Description=My Little Server
# Documentation=https://
# Author: Natan Cabral

[Service]
# Start Service and Examples
ExecStart=/usr/local/bin/node /home/myserver/server.js
# ExecStart=/usr/bin/sudo /usr/bin/node /home/myserver/server.js
# ExecStart=/usr/local/bin/node /var/www/project/myserver/server.js

# Options Stop and Restart
# ExecStop=
# ExecReload=

# Required on some systems
# WorkingDirectory=/home/myserver/
# WorkingDirectory=/var/www/myproject/

# Restart service after 10 seconds if node service crashes
RestartSec=10
Restart=always
# Restart=on-failure

# Output to syslog
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=nodejs-my-server-example

# #### please, not root users
# RHEL/Fedora uses 'nobody'
# User=nouser
# Debian/Ubuntu uses 'nogroup', RHEL/Fedora uses 'nobody'
# Group=nogroup

# Variables
Environment=PATH=/usr/bin:/usr/local/bin
# Environment=NODE_ENV=production
# Environment=NODE_PORT=3001
# Environment="SECRET=pGNqduRFkB4K9C2vijOmUDa2kPtUhArN"
# Environment="ANOTHER_SECRET=JP8YLOc2bsNlrGuD6LVTq7L36obpjzxd"

[Install]
WantedBy=multi-user.target
```

## Enable the service

#### Enable the service on boot
```bash
$ systemctl enable myserver.service
```
#### Start the service
```bash
$ systemctl start myserver.service
$ systemctl restart myserver.service
$ systemctl status myserver.service
```
#### Verify it is running
```bash
$ journalctl -u myserver.service
```
#### Reload all services if you make changes to the service
```bash
$ systemctl daemon-reload
$ systemctl restart myserver.service
```
#### List process
```bash
$ ps -ef | grep myserver.js
```
#### Maybe we need permissions
```bash
$ chmod +x /etc/systemd/system/myserver.service
$ chmod 664 /etc/systemd/system/myserver.service
```
[about permissions](https://www.systemconf.com/2020/12/25/using-chmod-x-command-on-linux-and-unix-with-examples/)

#### To kill process if you need try
```bash
$ kill -9 {numberPID}
```
[read my article](https://natancabral.medium.com/run-node-js-service-with-systemd-on-linux-42cfdf0ad7b2)

ToDo

- Dev NPX - to create services files and save. prompt and readline.

Names to remember

- **systemctl** - system control
- **systemd** - system manager standard
- **ps** - process
- **chmod** - change the mod

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/natancabral.png?s=100" width="100"/>
    </td>
    <td>
      Natan Cabral<br />
      <a href="mailto:natancabral@hotmail.com">natancabral@hotmail.com</a><br />
      <a href="https://github.com/natancabral/">https://github.com/natancabral/</a>
    </td>
  </tr>
</table>
