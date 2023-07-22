const express = require('express');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const port = 3000;
const app = express();
app.use(express.json());



app.get('/',(req, res)=>{
    res.status(200).json({
        message: 'Hello World! lol'
    })
})
app.get('/audiance', async (req, res) => {
    const api_Key = req.headers.key;
    const server = req.headers.server;
    const id_list = req.headers.id_list;
    mailchimp.setConfig({
        apiKey: api_Key,
        server: server
    });
    const respone = await mailchimp.lists.getListMembersInfo(id_list)
    console.log(respone)
    res.status(200).json(respone);
})
app.get('/audiance/:id', async (req, res) => {
    const api_Key = req.headers.key;
    const server = req.headers.server;
    const id_list = req.headers.id_list;
    mailchimp.setConfig({
        apiKey: api_Key,
        server: server
    });
    const respone = await mailchimp.lists.getListMember(id_list, req.params.id)
    console.log(respone)
    res.status(200).json(respone);
})
app.post('/audiance', async (req, res) => {
    const api_Key = req.headers.key;
    const server = req.headers.server;
    const id_list = req.headers.id_list;
    mailchimp.setConfig({
        apiKey: api_Key,
        server: server
    });
    const { email } = req.body;
    const respone = await mailchimp.lists.addListMember(id_list, {
        email_address: email,
        status: "subscribed",
    })
    console.log(respone)
    res.status(200).json(respone);
});
app.delete('/audiance/delete/:id', async (req, res) => {
    const api_Key = req.headers.key;
    const server = req.headers.server;
    const id_list = req.headers.id_list;
    mailchimp.setConfig({
        apiKey: api_Key,
        server: server
    });
    const respone = await mailchimp.lists.deleteListMember(id_list, req.params.id)
    console.log(respone)
    res.status(200).json(respone);
})
app.put('/audiance/:id', async (req, res) => {
    const api_Key = req.headers.key;
    const server = req.headers.server;
    const id_list = req.headers.id_list;
    mailchimp.setConfig({
        apiKey: api_Key,
        server: server
    });
    const { email } = req.body;
    const respone = await mailchimp.lists.setListMember(id_list, req.params.id, {
        email_address: email
    })
    console.log(respone)
    res.status(200).json(respone);
});
app.patch('/audiance/unsubscribed/:id', async (req, res) => {
    const api_Key = req.headers.key;
    const server = req.headers.server;
    const id_list = req.headers.id_list;
    mailchimp.setConfig({
        apiKey: api_Key,
        server: server
    });
    const respone = await mailchimp.lists.updateListMember(id_list, req.params.id, {
        status: "unsubscribed"
    })
    console.log(respone)
    res.status(200).json(respone);
});
app.patch('/audiance/subscribed/:id', async (req, res) => {
    const api_Key = req.headers.key;
    const server = req.headers.server;
    const id_list = req.headers.id_list;
    mailchimp.setConfig({
        apiKey: api_Key,
        server: server
    });
    const respone = await mailchimp.lists.updateListMember(id_list, req.params.id, {
        status: "subscribed"
    })
    console.log(respone)
    res.status(200).json(respone);
});

app.listen(port, console.log(`Server Running on ${port}`));