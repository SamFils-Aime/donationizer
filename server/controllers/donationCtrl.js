
module.exports={
getDonations:async(req, res)=>{
        const db = req.app.get('db');
        // const userId = req.session.user.user_id;
        // let id = req.session.user ? userId : 0;
        let id = +req.params.id;
        const donations = await db.donations.getDonations(id);
        res.status(200).json(donations)
},

postDonation: function (req, res){
    const db = req.app.get('db') 

    const {donation_title, donation_desc, post_location,post_date, view_count, isdonated, category, donator_id} = req.body
    db.donations.postDonation(donator_id, donation_title, donation_desc, post_location, view_count, isdonated, category,post_date)
        .then(post =>{
            console.log(post)
            const posts=post[0]
            console.log(posts)
            res.status(200).send(posts)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json("internal server error")
        })
},
postFavourite: function (req,res){
    const db = req.app.get('db')
    const {donation_id, user_id}= req.body
    db.donations.addFavourite(donation_id, user_id)
    .then(post=>{ console.log(post)
        res.sendStatus(200)})
    .catch(error=> {console.log(error)
    res.send(500).json("you can't fave")
    })
},

deleteDonation:  function (req, res) {
    const db = req.app.get('db')
        const donation_id = +req.params.id
        db.donations.deleteDonation(donation_id)
    .then(response =>{
        console.log(donation_id)
        res.sendStatus(200)
    })
    .catch(error=>{
        console.log(error)
        res.status(409).json("you messed up")
    })
},
updateViewCount: function (req, res) {
    const db = req.app.get('db');
    const donation_id = +req.params.id
//    const {view_count} = req.body;
    
   db.donations.updateViewCount(donation_id)
        .then(put =>{
            console.log(put, "hit")
            res.status(200).send(put)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json("something is wrong")
        })
},
postDonationPhoto: function (req,res){
    // console.log("hits")
    const db = req.app.get('db');
    const {donation_id, donation_photo} = req.body
    db.donations.postDonationPhoto(donation_id, donation_photo)
    .then(result=>{
        console.log(result, 'hit')
        res.status(200).json(result[0])
    })
    .catch(result=>{
        console.log(result)
        res.status(500).json("massive error")
    })

},
    getDonationByCategory:async (req,res)=>{
        const db = req.app.get('db');
        const {category} = req.query;
        const donationsByCategory = await db.donations.getDonationsByCategory(category);
        res.status(200).json(donationsByCategory);
    },
    getFilteredDonations:async(req,res)=>{
        const db =req.app.get('db');
        const {title} = req.query;
        const filteredDonations = await db.donations.getDonationsBySearch(title);
        res.status(200).json(filteredDonations);
    },
    getDonationPhotos: async (req,res)=>{
        const db = req.app.get('db');
        const donation_id = +req.params.id;
        const donationPhotos = await db.donations.getDonationPhotos(donation_id);
        res.status(200).json(donationPhotos);
    },
    getDonationInfo: async (req,res)=>{
        const db = req.app.get('db');
        const donation_id = +req.params.id;
        const donationInfo = await db.donations.getDonationInfo(donation_id);
        res.status(200).json(donationInfo);
    },
    getUserFavorites: async (req, res) => {
        const db = req.app.get('db');
        const user_id = +req.params.id;
        const favorites = await db.donations.getFavorites(user_id)
        res.status(200).json(favorites);
    },
    getUserDonations: async (req, res) => {
        const db = req.app.get('db');
        let user_id = req.params.id;
        var userDonations = await db.donations.getUserDonations( user_id );

        res
        .status(200)
        .send(userDonations);
    }
}