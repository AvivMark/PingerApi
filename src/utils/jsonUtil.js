const fs = require("fs");
const chalk = require("chalk");
const hostsFilename = process.env.HOSTSFILE || "hosts.json"


const addHost = (hostName, ip) => {
  const hosts = loadHosts();
  const duplicateHostIp = hosts.find((host) => host.ip === ip);
  const duplicateHostName = hosts.find((host) => host.name === hostName);

  if (!duplicateHostIp) {
    if (!duplicateHostName) {

        host = {
            name: hostName,
            ip
        }
        
      hosts.push(host);

      saveHosts(hosts);
      return host
    } else {
      return 409;
    }
  } else {
    return 409;
  }
};

const updateHostname = (oldName, newName) => {
  const hosts = loadHosts();
  hosts.forEach(host => {
    if(host.name === oldName) {
      host.name = newName;
      saveHosts(hosts);
      return host;
    }
  });

  return 404;
}

const updateHostIP = (oldIp, newIp) => {
  const hosts = loadHosts();
  hosts.forEach(host => {
    if(host.ip === oldIp) {
      host.ip = newIp;
      saveHosts(hosts);
      return host;
    }
  });

  return 404;

}

const removeHost = (hostData) =>{
  const hosts = loadHosts();
  let hostFound = hosts.find((host) => host.ip === hostData);
  if (hostFound) {
    const removedHosts = hosts.filter((host) => host.ip !== hostData);
    saveHosts(removedHosts);
    return hostFound;
  }

  hostFound = hosts.find((host) => host.name === hostData);
  if (hostFound) {
    const removedHosts = hosts.filter((host) => host.name !== hostData);
    saveHosts(removedHosts);
    return hostFound;
  }

  return 404;
}

const removeHostByName = (name) => {
  const hosts = loadHosts();
  const removedHosts = hosts.filter((host) => host.name !== name);

  if (removedHosts.length < Hosts.length) {
    saveHosts(removedHosts);
    return host;
  } else {
    return 404;
  }
};


const removeHostByIp = (ip) => {
    const hosts = loadHosts();
    const removedHosts = hosts.filter((host) => host.ip !== ip);
  
    if (removedHosts.length < Hosts.length) {
      saveHosts(removedHosts);
      console.log(chalk.bgGreen("Host removed Successfuly!"));
    } else {
      return 404;
    }
  };

const getHost = (hostdata) => {
  const hosts = loadHosts();
  let hostFound = hosts.find((host) => host.ip === hostdata);
  if (hostFound) {
    return hostFound
  }
  hostFound = hosts.find((host) => host.name === hostdata);
  if (hostFound) {
    return hostFound
  }
  return 404;
}

const getHostByIP = (ip) => {
  const hosts = loadHosts();

  const hostFound = hosts.find((host) => host.ip === ip);
  if (hostFound) {
    return hostFound
  } else {
    return 404;
  }
};

const getHostByName = (name) => {
  const hosts = loadHosts();

  const hostFound = hosts.find((host) => host.name === name);

  if (hostFound) {
    console.log(chalk.inverse(hostFound.ip));
    return hostFound
  } else {
    return 404;
  }
};

const getAllHosts = () => {
    const hosts = loadHosts();

    return hosts
}

const removeAllHosts = () => {
  saveHosts([])
  console.log(chalk.white("Cleared all hosts!"))
}

const saveHosts = (hosts) => {
  try {
    const dataJSON = JSON.stringify(hosts);
    fs.writeFileSync(hostsFilename, dataJSON);
  } catch (e) {
    throw new Error("Cant save hosts")
  }
};

const loadHosts = () => {
  try {
    const dataBuffer = fs.readFileSync(hostsFilename);
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    throw new Error("Cant load hosts")
    return [];
  }
};

module.exports = {
    addHost,
    removeHost,
    removeHostByName,
    removeHostByIp,
    removeAllHosts,
    getHostByName,
    getHostByIP,
    getAllHosts,
    getHost,
    updateHostIP,
    updateHostname
};
