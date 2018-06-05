module.exports={
    addPhoneEmail: (req,res)=>{
        const {id}= req.params
        // id = Number(id);
        const {email, phone} =req.body
        req.app.get('db').update_phone_email([id, email, phone])
        .then(user=> res.sendStatus(200))
        .catch(err=>console.log('add phone email endpoint', err))
    },
    addNewRoute: (req,res)=>{
        const {id, origin, destination, price}= req.body
        // console.log(id, origin, destination, price)
        req.app.get('db').add_route([id, origin, destination, price])
        .then(user=>res.sendStatus(200))
        .catch(err=>console.log('add new route endpoint', err))
    },
    getUserRoutes: (req, res)=>{
        const{id}=req.params
        req.app.get('db').get_user_routes([id])
        .then(routes=>res.status(200).send(routes)).catch(err=> console.log('get user routes endpoint', err))
    },
    changeRoute: (req, res)=>{
        console.log(req.params, req.body)
        const{routeid}=req.params
        const {origin, destination, price}= req.body
        req.app.get('db').change_route([routeid, origin, destination, price])
        .then(route=>{
            // console.log(route)
            res.sendStatus(200)})
        .catch(err=>console.log('change route endpoint', err))
    }, 
    deleteRoute:(req, res)=>{
        const {routeid}=req.params
        req.app.get('db').delete_route([routeid]).then(()=>res.sendStatus(200)).catch(err=>console.log('delete route endpoint', err))
    },
    routeSeen:(req,res)=>{
        const {routeid}=req.params
        req.app.get('db').match_seen([routeid]).then(()=>res.sendStatus(200))
    }, 
    makePro: (req,res)=>{
        const {id}=req.params
        req.app.get('db').make_pro([id]).then(
            user=>{
                res.status(200).send(user[0].prostatus)
            })
    }
}