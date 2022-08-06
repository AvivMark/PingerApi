const express = require("express");
const router = new express.Router();
const {
  addHost,
  removeHostByIp,
  removeHostByName,
  getAllHosts,
  removeAllHosts,
  getHost
} = require("../utils/jsonUtil");

router.post("/addHost", (req, res) => {
  const hostIp = req.body.ip;
  const hostName = req.body.name;
  try {
      if (hostName && hostIp){
        addHost(hostName, hostIp);
      } else {
        res.status(400).send('not enough data!')
      }
      res.status(201).send();
  } catch (err) {
    res.status(501).send(err);
  }
});

router.get("/getHost/:hostData", (req, res) => {
  const data = req.params.hostData

  const hostFound = getHost(data)
   
  try {
      if (hostFound){
        res.send(hostFound)
      } else {
        res.status(404).send("cant find host!!")
      }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getAllHosts", (req, res) => {
  const allHosts = getAllHosts();
  try {
      if (allHosts){
        //const resData = JSON.stringify(hosts)
        res.status(200).send(allHosts)
      } else {
        res.status(404).send("cant find hosts!!")
      }
  } catch (err) {
    res.status(501).send(err);
  }
});

router.get("/getAllHosts", (req, res) => {
  const allHosts = getAllHosts();
  try {
      if (allHosts){
        //const resData = JSON.stringify(hosts)
        res.status(200).send(allHosts)
      } else {
        res.status(404).send("cant find hosts!!")
      }
  } catch (err) {
    res.status(501).send(err);
  }
});

router.delete("/removeHost", (req, res) => {
  try {
    const ip = req.body.ip;
    const name = req.body.name;
    if (ip) {
      removeHostByIp(ip);
    } else if (name) {
        removeHostByName(name);
    } else {
        res.status(404).send("no host found");
    }
    
  }
  catch (err) {
      res.status(500).send(err)
  }
});

router.delete("/clearHosts", (req, res) => {
  try {
    removeAllHosts();
    res.send("Cleared hosts list!")
  }
  catch (err) {
      res.status(500).send(err)
  }
});

module.exports = router