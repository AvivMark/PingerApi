const request = require('supertest')
const app = require('../src/app')
const hostUtil = require('../src/utils/jsonUtil')

const host1={
    name: 'server1',
    ip: '172.20.20.21'
}

const host2={
    name: 'server2',
    ip: '172.20.20.20'
}

beforeAll(() => {
    hostUtil.removeAllHosts()
})

test('Should add server to hosts list', async () => {
    await request(app).post('/addHost').send(host1)
    .expect(201)

    
    await request(app).post('/addHost').send(host2)
    .expect(201)
})

test('Should not be able to add host ,already exist', async () => {
    await request(app).post('/addHost').send(host1)
    .expect(409)
})

test('Should get specific host by ip', async () => {
    let resp = await request(app).get('/getHost/172.20.20.21')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(host1)
})

test('Should get specific host by name', async () => {
    let resp = await request(app).get('/getHost/server1')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(host1)
})

test('Should not get specific host', async () => {
    let resp = await request(app).get('/getHost/1.1.1.1')
    .expect(404)
})

test('Should get all hosts', async () => {
    let resp = await request(app).get('/getAllHosts')
    .expect(200)
    .expect('Content-Type', /json/)
})

test('Update host server name', async () => {
    let resp = await request(app).put('/updateHostName').send({
        name: 'server2',
        newName: 'testServer'
    })
    .expect(200)
})

test('Update host server ip', async () => {
    let resp = await request(app).put('/updateHostIp').send({
        ip: '172.20.20.20',
        newIp: '10.10.10.10'
    })
    .expect(200)
})

test('Should remove host by ip', async () => {
    let resp = await request(app).delete('/removeHost/172.20.20.21')
    .expect(200)
    .expect('Content-Type', /json/)
})

test('Should not be able to find host', async () => {
    let resp = await request(app).delete('/removeHost/172.20.20.21')
    .expect(404)
})
