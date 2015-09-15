var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var OrderModel = require('../models/vendorOrder');
var VendorInfoModel = require('../models/vendorInfo');
var router = express.Router();


router.get('/p/vendor2', function (req, res) {
    res.render('vendor_order', { user : req.user });
});

router.get('/p/vendor3', function (req, res) {
    res.render('index3', { user : req.user });
});


router.get('/p/vendor_order', function (req, res) {
    res.render('vendor_order', { user : req.user });
});

router.get('/p/vendor_summary', function (req, res) {
    res.render('vendor_order_summary', { user : req.user });
});

router.get('/p/vendor_menu', function (req, res) {
    res.render('vendor_menu', { user : req.user });
});

router.get('/p/vendor_details', function (req, res) {
    res.render('vendor_details', { user : req.user });
});


router.get('/p/signin', function (req, res) {
    res.render('starter', { user : req.user });
});

router.get('/p/register', function(req, res) {
    res.render('register2', { });
});



router.get('/vendor', function (req, res) {
    res.render('index', { user : req.user });
});
router.get('/', function (req, res) {
    res.render('test', { user : req.user });
});

router.get('/test', function (req, res) {
    res.render('customer', { user : req.user });
});
router.get('/menu', function (req, res) {
    res.render('menu', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.get('/orders', function (req, res) {
    res.render('invoice_list', { user : req.user });
});

router.get('/order_summary', function (req, res) {
    res.render('order_summary', { user : req.user });
});

router.get('/menus', function (req, res) {
    res.render('menu_list', { user : req.user });
});

router.get('/about_us', function (req, res) {
    res.render('about_us', { user : req.user });
});

// router.post('/register', function(req, res, next) {
//   console.log(req.body.City);
//     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
//         if (err) {
//           return res.render("register", {info: "Sorry. That username already exists. Try again."});
//         }
//           console.log("aunthiticate 1");
//           storeVendorInfo(req,res,function(req,res){
//            console.log("aunthiticate 2");
//         passport.authenticate('local')(req, res, function () {

//             req.session.save(function (err) {
//                 if (err) {
//                     return next(err);
//                 }
//                 res.redirect('/orders');
//             });
//         });
//       });
//     });
// });
router.post('/register', function(req, res, next) {
  console.log("/register post method");
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
          console.log("error register post method");
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }
          console.log("aunthiticate 1");
           var vendorInfo = new VendorInfoModel({
        hotel:{email:req.body.username}
      });
      vendorInfo.save( function( err ) {
        if( !err ) {
              console.log( 'storeVendorInfo created' );
              console.log(req.body.username);
              passport.authenticate('local')(req, res, function () {
                  req.session.save(function (err) {
                    if (err) {
                      return next(err);
                    }
                    res.redirect('/p/vendor_details');
                  });
              });
              return ;
              } else {
                console.log( 'storeVendorInfo error' );
                console.log( err );
                return response.send('ERROR');
              }
        });
    });
});
router.post( '/v1/vendor/info/:id', function( req, res ) {

   console.log("VendorInfo post");
  console.log(req.body.Name);
            storeVendorInfo(req,res,function(req,res){
           console.log("storeVendorInfo success");
           console.log(res);
        });

  });
function storeVendorInfo(request,response,callback,param)
{
console.log("storeVendorInfo");
console.log(request.params.id);
 // var vendorInfo = new VendorInfoModel({
 //        hotel:{name:request.body.Name,email:request.body.username},
 //       address:{addressLine1:request.body.Address1,addressLine2:request.body.Address2,street:request.body.street, LandMark:request.body.Landmark, areaName:request.body.Areaname,city:request.body.City, zip:request.body.zip, 
 //        latitude:request.body.latitude,longitude:request.body.longitude },
 //        phone:request.body.phone ,
 //        logo:request.body.logo,
 //        speciality:request.body.speciality,
 //        vegornonveg:request.body.vegornonveg,
 //        deliverRange: request.body.deliverrange,
 //        deliverAreas:request.body.deliverareas
 //      });
 VendorInfoModel.update({ 'hotel.email':request.params.id},
      {
        hotel:{name:request.body.Name,email:request.params.id},
       address:{addressLine1:request.body.Address1,addressLine2:request.body.Address2,
        street:request.body.street, LandMark:request.body.Landmark, 
        areaName:request.body.Areaname,city:request.body.City, zip:request.body.zip, 
        latitude:request.body.latitude,longitude:request.body.longitude },
        phone:request.body.phone ,
        logo:request.body.logo,
        speciality:request.body.speciality,
        vegornonveg:request.body.vegornonveg,
        deliverRange: request.body.deliverrange
        //deliverAreas:request.body.deliverareas
      },
       function( err ) {
        if( !err ) {
            console.log( 'storeVendorInfo created' );
            callback(request,response);
            return ;
        } else {
         console.log( 'storeVendorInfo error' );
            console.log( err );
            return response.send('ERROR');
        }
    });
}


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    req.session.save(function (err) {
    
        if (err) {
            return next(err);
        }
       // res.redirect('/orders');
       res.redirect('/p/vendor_order');
    });
});
router.post('/m/login', passport.authenticate('local'), function(req, res, next) {

    req.session.save(function (err) {
        
      
        if (err) {
          var err_response = {
                        tag: "login",
                        status: false,
                        error_msg: "Incorrect Email or Password"
                        };
            res.send(err_response);
        }
        var suc_response = {
                        tag: "login",
                        status: true
                        };
        res.send(suc_response);
    });
});

router.get('/logout', function(req, res, next) {
    req.logout();
    req.session.save(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/p/signin');
    });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});



router.get( '/v1/vendor/city/:id', function( request, response ) {
    return VendorInfoModel.find({ 'address.city':request.params.id},function( err, vendor ) {
        if( !err ) {
            return response.send( vendor );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

router.get( '/v1/vendor/account/all', function( request, response ) {
    return VendorInfoModel.find(function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});
router.get( '/v1/vendor/account/:id', function( request, response ) {
  // OrderModel.findById( request.params.id, function( err, book ) 
     console.log("dasd");
  console.log(request.params.id);
   // return OrderModel.find({ customer:{email:'daya@gmail.com'}},function( err, order ) {
     return VendorInfoModel.find({ 'hotel.email':request.params.id},function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});

router.get( '/v1/vendor/order/:id', function( request, response ) {
  console.log(request.params.id);
     return OrderModel.find({ 'hotel.email':request.params.id},function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});
//unregister a book
router.delete( '/v1/vendor/order/:id', function( request, response ) {
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return OrderModel.remove( { 'hotel.email':request.params.id},function( err ) {
            if( !err ) {
                console.log( 'orders removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});
router.get( '/v1/vendor/order/all', function( request, response ) {
    return OrderModel.find(function( err, order ) {
        if( !err ) {
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
});

router.post( '/v1/vendor/order', function( request, response ) {

console.log(request.body);

console.log( request.body.hotel.name);
    var order = new OrderModel({
        hotel:request.body.hotel,
        customer: {name: request.body.customer.name, email: request.body.customer.email, phone: request.body.customer.phone,  Address: "daya"},
        menu: request.body.menu       });
 
    console.log(request.body);
    order.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( order );
        } else {
         console.log( 'error' );
            console.log( err );
            return response.send('ERROR');
        }
    });
});

router.get( '/v1/vendor/order/summary', function( req, res ) {
   OrderModel.aggregate(
   {$group:{_id: '$menu.name',total:{$sum :'$menu.no_of_order'}}},
      function (err, summary) {
        console.log("k1");
        if(err){
  console.log("k12");
            return res.send(500, { error: err }); 
        }

        if(summary) {
              console.log("k13");
            return res.send(summary);
        } else {
              console.log("k14");
            res.send(500, { error: 'couldnt find expenses' }); 
        }
          console.log("k15");
    }
    )
});

router.get( '/v1/vendor/order/summary/:id', function( request, res ) {
   OrderModel.aggregate(
   [
    {$match: { 'hotel.email': request.params.id } },
    {$group:{_id: '$menu.name',total:{$sum :'$menu.no_of_order'}}}
   ],
      function (err, summary) {
        console.log("k1");
        if(err){
  console.log("k12");
            return res.send(500, { error: err }); 
        }

        if(summary) {
              console.log("k13");
            return res.send(summary);
        } else {
              console.log("k14");
            res.send(500, { error: 'couldnt find expenses' }); 
        }
          console.log("k15");
    }
    )
});

router.post( '/v1/vendor/list2', function( request, response ) {

    // var order = new OrderModel({
    //     customer: {name: request.body.name, email: request.body.email, phone: request.body.phone,  Address: "daya"},
    //     menu:{name: request.body.menu, no_of_order: request.body.no_of_order }       });
     var order = new OrderModel({
        customer: {name: "daya", email: "daya@gmail.com", phone: 1234,  Address: "daya"},
        menu:{name:" request.body.menu", no_of_order: 123 }       });

    console.log(request.body);
    order.save( function( err ) {
        if( !err ) {
            console.log( 'created' );
            return response.send( order );
        } else {
         console.log( 'error' );
            console.log( err );
            return response.send('ERROR');
        }
    });
});
//Delete a book
router.delete( '/v1/vendor/list', function( request, response ) {
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return OrderModel.remove( {},function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});




router.post( '/v1/vendor/menu/:id', function( request, response ) {
  // OrderModel.findById( request.params.id, function( err, book ) 
     console.log("post /vendor/menu/");
     console.log(request.body);
  console.log(request.params.id);
   // return OrderModel.find({ customer:{email:'daya@gmail.com'}},function( err, order ) {
     return VendorInfoModel.update({ 'hotel.email':request.params.id},{ $addToSet: {menu: {$each:[{name: request.body.fooditem,  price:request.body.foodprice,availability:1}] }}},function( err, order ) {
        if( !err ) {
            console.log("no error");
            console.log(order);
            return response.send( order );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});

router.get( '/v1/vendor/menu/:id', function( request, response ) {
  // OrderModel.findById( request.params.id, function( err, book ) 
     console.log("get /vendor/menu/");
  console.log(request.params.id);
   // return OrderModel.find({ customer:{email:'daya@gmail.com'}},function( err, order ) {
     return VendorInfoModel.find({ 'hotel.email':request.params.id},function( err, vendorinfo ) {
        if( !err ) {
             console.log("no error");
            if(vendorinfo.length > 0)
              return response.send( vendorinfo[0].menu );
            else
              return response.send( vendorinfo );
        } else {
            console.log( err );
            return response.send('ERROR');
        }
    });
 // });
});

//unregister a book
router.delete( '/v1/vendor/unregister/:id', function( request, response ) {
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return VendorInfoModel.remove( { 'hotel.email':request.params.id},function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});

//Delete a menu item
router.delete( '/v1/vendor/menu/item/:id', function( request, response ) {
  //  ExampleModel.findById( request.params.id, function( err, book ) {
        return VendorInfoModel.update( { 'hotel.email':request.params.id},{ $pull: {menu: {"name": request.body.fooditem }}},function( err ) {
            if( !err ) {
                console.log( 'Book removed' );
                return response.send( '' );
            } else {
                console.log( err );
                return response.send('ERROR');
            }
        });
    //});
});


module.exports = router;