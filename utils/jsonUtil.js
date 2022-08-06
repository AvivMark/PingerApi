const fs = require("fs");
const chalk = require("chalk");

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
      console.log(chalk.bgGreen("New host added!"));
      return host
    } else {
      console.log(chalk.bgRed("Host name already exist!"));
    }
  } else {
    console.log(chalk.bgRed("Host ip already exist!"));
  }
};

const updateHostname = (oldName,newName) => {
  const hosts = loadHosts();
  let hostFound = hosts.find((host) => host.oldName === oldName);
  if(hostFound){
    hostFound.name = newName;
    saveHosts(hosts);
    return hostFound;
  } else{
    console.log("no host found with the name: "  + oldName)
  }

}

const updateHostIP = (oldIp,newIp) => {
  const hosts = loadHosts();
  let hostFound = hosts.find((host) => host.ip == oldIp);
  if(hostFound){
    hostFound.ip = newIp;
    saveHosts(hosts);
    return hostFound;
  } else{
    console.log("no host found with the ip: "  + oldIp)
  }

}

const removeHostByName = (name) => {
  const hosts = loadHosts();
  const removedHosts = hosts.filter((host) => host.name !== name);

  if (removedHosts.length < Hosts.length) {
    saveHosts(removedHosts);
    console.log(chalk.bgGreen("Host removed Successfuly!"));
    return host;
  } else {
    console.log(chalk.bgRed("No host found!"));
  }
};


const removeHostByIp = (ip) => {
    const hosts = loadHosts();
    const removedHosts = hosts.filter((host) => host.ip !== ip);
  
    if (removedHosts.length < Hosts.length) {
      saveHosts(removedHosts);
      console.log(chalk.bgGreen("Host removed Successfuly!"));
    } else {
      console.log(chalk.bgRed("No host found!"));
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
  console.log(chalk.red("Error! No host found with the data: " + hostdata))
}

const getHostByIP = (ip) => {
  const hosts = loadHosts();

  const hostFound = hosts.find((host) => host.ip === ip);
  if (hostFound) {
    console.log(chalk.inverse(hostFound.name));
    return hostFound
  } else {
    console.log(chalk.red("Error! No host found with the ip: " + ip));
  }
};

const getHostByName = (name) => {
  const hosts = loadHosts();

  const hostFound = hosts.find((host) => host.name === name);

  if (hostFound) {
    console.log(chalk.inverse(hostFound.ip));
    return hostFound
  } else {
    console.log(chalk.red("Error! No host found with the name: " + name));
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
  const dataJSON = JSON.stringify(hosts);
  fs.writeFileSync("hosts.json", dataJSON);
};

const loadHosts = () => {
  try {
    const dataBuffer = fs.readFileSync("hosts.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

module.exports = {
    addHost,
    removeHostByName,
    removeHostByIp,
    getHostByName,
    getHostByIP,
    getAllHosts,
    removeAllHosts,
    getHost
};
