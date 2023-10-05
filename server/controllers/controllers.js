require('./database');
var logger = require('../controllers/logger');
var common = require('../controllers/common');

var Category = require('../models/Category');
var Drug = require('../models/Drug');
var Crew = require('../models/Crew');
var Users = require('../models/Users');
var Session = require('../models/Session');
var Cart = require('../models/Cart');
var Checkout = require('../models/Checkout');

var crypto = require('crypto'); // for generating random session, does not need installation bcuz it comes with nodejs itself


// GET /
// .homepage

exports.drugs = async (req, res) => {
  logger.route_info("GET /");
  try {
    var session = await Session.find({session: req.cookies.session});
    var limitNumber = 3; // number of categories shown in the website
    var limitNumber2 = 4; // number of drugs shown in the website for NEWEST DRUGS
    var categories = await Category.find({}).limit(limitNumber);
    var categories2 = await Category.find({});
    var newest = await Drug.find({}).sort({_id: -1}).limit(limitNumber2);
    var protonPumpInhibitor = await Drug.find({"category":"Proton Pump Inhibitor"}).limit(limitNumber); 
    var analgesics = await Drug.find({"category":"Analgesics"}).limit(limitNumber); 
    var multivitamins = await Drug.find({"category":"Multivitamins"}).limit(limitNumber); 
    var antibiotics = await Drug.find({"category":"Antibiotics"}).limit(limitNumber); 
    var antipyretic = await Drug.find({"category":"Antipyretic"}).limit(limitNumber); 
    var antifungals = await Drug.find({"category":"Antifungals"}).limit(limitNumber); 
    var newestDrugs = {newest, protonPumpInhibitor, analgesics, multivitamins, antibiotics, antipyretic, antifungals}
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("index", { title: common.pageTitle + " - Homepage", categories, newestDrugs, categories2, session, info: users[0]});
    } else {
      res.render("index", { title: common.pageTitle + " - Homepage", categories, newestDrugs, categories2, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /alldrugs
// .ourAllDrugs

exports.ourAllDrugs = async (req, res) => {
  logger.route_info("GET /alldrugs");
  try {
    var session = await Session.find({session: req.cookies.session});
    var limitNumber = 3; // number of categories shown in the website
    var limitNumber2 = 4; // number of drugs shown in the website for NEWEST DRUGS
    var categories = await Category.find({}).limit(limitNumber);
    var categories2 = await Category.find({});
    var newest = await Drug.find({}).sort({_id: -1}).limit(limitNumber2);
    var protonPumpInhibitor = await Drug.find({"category":"Proton Pump Inhibitor"}).limit(limitNumber); 
    var analgesics = await Drug.find({"category":"Analgesics"}).limit(limitNumber); 
    var multivitamins = await Drug.find({"category":"Multivitamins"}).limit(limitNumber); 
    var antibiotics = await Drug.find({"category":"Antibiotics"}).limit(limitNumber); 
    var antipyretic = await Drug.find({"category":"Antipyretic"}).limit(limitNumber); 
    var antifungals = await Drug.find({"category":"Antifungals"}).limit(limitNumber); 
    var newestDrugs = {newest, protonPumpInhibitor, analgesics, multivitamins, antibiotics, antipyretic, antifungals};
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("alldrugs", { title: common.pageTitle + " - Products", categories, newestDrugs, categories2, session, info: users[0]});
    } else {
      res.render("alldrugs", { title: common.pageTitle + " - Products", categories, newestDrugs, categories2, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /categories
// .ourCategories

exports.ourCategories = async (req, res) => {
  logger.route_info("GET /categories");
  try {
    var session = await Session.find({session: req.cookies.session});
    var limitNumber = 20; // number of categories shown in the website
    var categories = await Category.find({}).limit(limitNumber);
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("categories", { title: common.pageTitle + " - Categories", categories, categories2, session, info: users[0]});
    } else {
      res.render("categories", { title: common.pageTitle + " - Categories", categories, categories2, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /categories/:id
// .ourCategoriesById

exports.ourCategoriesById = async (req, res) => {
  logger.route_info("GET /categories/:id");
  try {
    var session = await Session.find({session: req.cookies.session});
    var categoryId = req.params.id;
    var limitNumber = 20; // number of categories shown in the website
    var categoryById = await Drug.find({"category": categoryId}).limit(limitNumber);
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("categories", { title: common.pageTitle + " - " + categoryById[0].category, categoryById, categories2, session, info: users[0]});
    } else {
      res.render("categories", { title: common.pageTitle + " - " + categoryById[0].category, categoryById, categories2, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /drugs/:id
// .ourDrugs

exports.ourDrugs = async (req, res) => {
  logger.route_info("GET /drugs/:id");
  try {
    var session = await Session.find({session: req.cookies.session});
    var drugId = req.params.id;
    var drug = await Drug.findById(drugId);
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      var cart = await Cart.find({email: session[0].email, product: drugId});
      res.render("drugs", { title: common.pageTitle + " - " + drug.name, drug, categories2, session, cart, info: users[0]});
    } else {
      res.render("drugs", { title: common.pageTitle + " - " + drug.name, drug, categories2, session, cart: []});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /newest-drugs
// .ourNewestDrugs

exports.ourNewestDrugs = async (req, res) => {
  logger.route_info("GET /newest-drugs");
  try {
    var session = await Session.find({session: req.cookies.session});
    var limitNumber = 20;
    var drug = await Drug.find({}).sort({ _id: -1}).limit(limitNumber);
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("newest-drugs", { title: common.pageTitle + " - Newest Drugs", drug, categories2, session, info: users[0]});
    } else {
      res.render("newest-drugs", { title: common.pageTitle + " - Newest Drugs", drug, categories2, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// POST /search
// .searchDrug

exports.searchDrug = async (req, res) => {
  logger.route_info("POST /search");
  try {
    var session = await Session.find({session: req.cookies.session});
    var searchTerm = req.body.searchTerm;
    var drug = await Drug.find({$text:{$search: searchTerm, $diacriticSensitive: true}});
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("search", { title: common.pageTitle + " - Search", drug, categories2, session, info: users[0]});
    } else {
      res.render("search", { title: common.pageTitle + " - Search", drug, categories2, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /about
// .aboutUs

exports.aboutUs = async (req, res) => {
  logger.route_info("GET /about");
  try {
    var session = await Session.find({session: req.cookies.session});
    var categories2 = await Category.find({});
    var crew = await Crew.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("about", { title: common.pageTitle + " - About Us", categories2, crew, session, info: users[0]});
    } else {
      res.render("about", { title: common.pageTitle + " - About Us", categories2, crew, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /about/:id
// .aboutUsById

exports.aboutUsById = async (req, res) => {
  logger.route_info("GET /about/:id");
  try {
    var session = await Session.find({session: req.cookies.session});
    var categories2 = await Category.find({});
    var crewId = req.params.id;
    var person = await Crew.findById(crewId);
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("aboutUsById", { title: common.pageTitle + " - " + person.name, categories2, person, session, info: users[0]});
    } else {
      res.render("aboutUsById", { title: common.pageTitle + " - " + person.name, categories2, person, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /signup
// .signUpPage

exports.signUpPage = async (req, res) => {
  logger.route_info("GET /signup");
  try {
    var session = await Session.find({session: req.cookies.session});
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("signup", { title: common.pageTitle + " - Registration", categories2, session, info: users[0]});
    } else {
      res.render("signup", { title: common.pageTitle + " - Registration", categories2, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// POST /signup
// .signUpPostPage

exports.signUpPostPage = async (req, res) => {
  logger.route_info("POST /signup");
  try {

    // if (req.body.email.trim() == "" || req.body.password == "" || req.body.confirmpassword == "" || req.body.firstname == "") {
    //   res.send({
    //     error : "Fill the required fields.",
    //     session : null
    //   });
    //   return;
    // }
    var password = req.body.password;
    var cpassword = req.body.confirmpassword
    if (password === cpassword) {
      var usersData = {
        firstname: req.body.firstname,
        email: req.body.email,
        password: password
      };
      await Users.insertMany([usersData]);
      res.send(null);
    } else {
      res.send({error: "Password are not matching."});
    }
  } catch (error) {
    if (error.message.indexOf("duplicate key error") != -1)
    {
      res.send({error: "This email is already in use."});
    }
    else{
      logger.error(error);
      res.status(500).send({message: error.message || "Error Occured" });
    }
  }
}

// GET /login
// .loginPage

exports.loginPage = async (req, res) => {
  logger.route_info("GET /login");
  try {
    var session = await Session.find({session: req.cookies.session});
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("loginerror", { title: common.pageTitle + " - Login", categories2, session, info: users[0]});
    } else {
      res.render("login", { title: common.pageTitle + " - Login", categories2, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// POST /login
// .loginPostPage

exports.loginPostPage = async (req, res) => {
  logger.route_info("POST /login");
  try {
    if (req.body.email.trim() == "" || req.body.password == "") {
      res.send({
        error : "Fill the required fields.",
        session : null
      });
      return;
    }
    var session = await Users.findOne({email: req.body.email});
    if(session != null && session.password === req.body.password){
      var sessionValue = crypto.randomBytes(32).toString('base64');
      await Session.insertMany([
        {
          "email": req.body.email,
          "session": sessionValue
        },
      ]);
      res.send({
        session : sessionValue,
        error : null
      });
    } else {
      res.send({
        error : "Email or password is wrong.",
        session : null
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


// POST /logout
// .logOutPage

exports.logOutPage = async (req, res) => {
  logger.route_info("POST /logout");
  try {
    await Session.deleteOne({session: req.body.session});
    res.send({
      error : null
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /account
// .accountPage

exports.accountPage = async (req, res) => {
  logger.route_info("GET /account");
  try {
    var session = await Session.find({session: req.cookies.session});
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      res.render("account", { title: common.pageTitle + " - Account", categories2, session, info: users[0]});
    } else {
      res.render("account", { title: common.pageTitle + " - Account", categories2, session, info: null});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /cart
// .cartPage

exports.cartPage = async (req, res) => {
  logger.route_info("GET /cart");
  try {
    var session = await Session.find({session: req.cookies.session});
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      var cartProducts = await Cart.find({email: session[0].email});
      var drugIds = [];
      for (var i = 0; i < cartProducts.length; i++) {
        drugIds.push(cartProducts[i].product);
      }
      var productDetails = await Drug.find({'_id': {$in: drugIds}});
      res.render("cart", { title: common.pageTitle + " - Cart", categories2, session, info: users[0], productDetails, cartProducts});
    } else {
      res.render("cart", { title: common.pageTitle + " - Cart", categories2, session});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// POST /addtocart
// .addToCartPostPage

exports.addToCartOrIncreaseQuantity = async (req, res) => {
  logger.route_info("POST /addtocart");
  try {
    var session = await Session.find({session: req.cookies.session});
    if (session.length < 1 ) {
      res.send({error: "You have to log in first." });
      return;
    }
    var oldRecordsFound = await Cart.find({email: session[0].email, product: req.body.drugId});
    var drug = await Drug.findById(req.body.drugId);
    var result = 
    {
      result: 
      {
        newQuantity: 0,
        plusAllowed: false
      },
      error: null
    };
    if (oldRecordsFound.length > 0) { // if we have old record in database
      var newQt = parseInt(oldRecordsFound[0].productQuantity) + 1;
      await Cart.updateOne(
        {email: session[0].email, product: req.body.drugId},
        {productQuantity: newQt}
      );
      result.result.newQuantity = newQt;
      result.result.plusAllowed = newQt < drug.quantity ? true : false;
    } else { // if we dont have old record in database
      var cartElement =
      {
        email: session[0].email,
        product: req.body.drugId,
        productQuantity: 1
      };
      await Cart.insertMany([cartElement]);
      result.result.newQuantity = 1;
      result.result.plusAllowed = 1 < drug.quantity ? true : false;
    }
    res.send(result);
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// POST /removefromcart
// .removeFromCartPostPage

exports.removeFromCartOrDecreaseQuantity = async (req, res) => {
  logger.route_info("POST /removefromcart");
  try {
    var session = await Session.find({session: req.cookies.session});
    var oldRecordsFound = await Cart.find({email: session[0].email, product: req.body.drugId});
    var drug = await Drug.findById(req.body.drugId);
    var result = 
    {
      result: 
      {
        newQuantity: 0,
        plusAllowed: false
      },
      error: null
    };
    if (oldRecordsFound.length > 0) { // if we have old record in database
      var newQt = parseInt(oldRecordsFound[0].productQuantity) - 1;
      if (req.body.deleteFromCart == "true" || newQt < 1) {
        newQt = 0;
        await Cart.deleteOne({email: session[0].email, product: req.body.drugId})
      } else {
        await Cart.updateOne(
          {email: session[0].email, product: req.body.drugId},
          {productQuantity: newQt}
        );
      }
      result.result.newQuantity = newQt;
      result.result.plusAllowed = newQt < drug.quantity ? true : false;
    } else { // if we dont have old record in database
      result.result.newQuantity = 0;
      result.result.plusAllowed = 0 < drug.quantity ? true : false;
    }
    res.send(result);
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// GET /checkout
// .checkoutPage

exports.checkoutPage = async (req, res) => {
  logger.route_info("GET /checkout");
  try {
    var session = await Session.find({session: req.cookies.session});
    var categories2 = await Category.find({});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      var cart = await Cart.find({email: session[0].email});
      var total = 0;
      for (var i = 0; i < cart.length; i++) {
        var drug = await Drug.findById(cart[i].product);
        var productPrice = parseFloat(drug.price) * cart[i].productQuantity;
        total += productPrice;
      }
      res.render("checkout", { title: common.pageTitle + " - Checkout", categories2, session, info: users[0], total});
    } else {
      res.render("checkout", { title: common.pageTitle + " - Checkout", categories2, session, total});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}

// POST /checkout
// .checkoutPostPage

exports.checkoutPostPage = async (req, res) => {
  logger.route_info("POST /checkout");
  try {
    var session = await Session.find({session: req.cookies.session});

    if (session.length < 1 ) {
      res.send({error: "You have to log in first." });
      return;
    } else if (req.body.fullName == null || req.body.fullName.trim() == "") {
      res.send({error: "Insert your name." });
      return;
    } else if (req.body.phoneNumber == null || req.body.phoneNumber.trim() == "") {
      res.send({error: "Phone number is required." });
      return;
    } else if (req.body.streetAddress == null || req.body.streetAddress.trim() == "") {
      res.send({error: "Street address is required." });
      return;
    } else if (req.body.paymentMethod == null || req.body.paymentMethod.trim() == "") {
      res.send({error: "You have to select payment method." });
      return;
    }

    var cart = await Cart.find({email: session[0].email});
    var productDetail = [];
    for (var i = 0; i < cart.length; i++) {
      var drug = await Drug.findById(cart[i].product);
      var element = 
      {
        productId: cart[i].product,
        productName: drug.name,
        productQuantity: cart[i].productQuantity,
        subtotalPrice: parseFloat(drug.price) * cart[i].productQuantity,
      };
      productDetail.push(element);
    }

    var checkoutInfo = {
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      streetAddress: req.body.streetAddress,
      buildingOrFloor: req.body.buildingOrFloor,
      paymentMethod: req.body.paymentMethod,
      comment: req.body.comment,
      email: session[0].email,
      productDetail: productDetail
    };

    await Checkout.insertMany([checkoutInfo]);
    await Cart.deleteMany({email: session[0].email});
    res.send({result: null});
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}






// POST /account
// .accountPostPage


exports.accountPostPage = async (req, res) => {
  logger.route_info("POST /account");
  try {
    var session = await Session.find({session: req.cookies.session});
    if (session.length > 0) {
      var users = await Users.find({email: session[0].email});
      if (req.body.oldpassword == users[0].password && req.body.newpassword == req.body.cnewpassword) {
        await Users.updateOne(
          {email: session[0].email},
          {password: req.body.newpassword}
        );
        res.send({result: null, error: null});
      } else {
        res.send({result: null, error: "Password is not matching"});
      }
    } else {
      res.send({result: null, error: "You have to log in first"});
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send({message: error.message || "Error Occured" });
  }
}


exports.homepage = async (req, res) => {
  logger.route_info("GET /landingPage");
  res.render("landingPage", { title: common.pageTitle + " - Landing Page"});
}

exports.project2 = async (req, res) => {
  logger.route_info("GET /project2");
  res.render("project2", { title: common.pageTitle + " - Project 2"});
}

exports.project3 = async (req, res) => {
  logger.route_info("GET /project3");
  res.render("project3", { title: common.pageTitle + " - Project 3"});
}

exports.project4 = async (req, res) => {
  logger.route_info("GET /project4");
  res.render("project4", { title: common.pageTitle + " - Project 4"});
}

exports.project5 = async (req, res) => {
  logger.route_info("GET /project5");
  res.render("project5", { title: common.pageTitle + " - Project 5"});
}

exports.project6 = async (req, res) => {
  logger.route_info("GET /project6");
  res.render("project6", { title: common.pageTitle + " - Project 6"});
}

exports.project7 = async (req, res) => {
  logger.route_info("GET /project7");
  res.render("project7", { title: common.pageTitle + " - Project 7"});
}

exports.project8 = async (req, res) => {
  logger.route_info("GET /project8");
  res.render("project8", { title: common.pageTitle + " - Project 8"});
}

exports.card1 = async (req, res) => {
  logger.route_info("GET /card1");
  res.render("card1", { title: common.pageTitle + " - Card 1"});
}

exports.card2 = async (req, res) => {
  logger.route_info("GET /card2");
  res.render("card2", { title: common.pageTitle + " - Card 2"});
}

exports.card3 = async (req, res) => {
  logger.route_info("GET /card3");
  res.render("card3", { title: common.pageTitle + " - Card 3"});
}

exports.card4 = async (req, res) => {
  logger.route_info("GET /card4");
  res.render("card4", { title: common.pageTitle + " - Card 4"});
}

exports.card5 = async (req, res) => {
  logger.route_info("GET /card5");
  res.render("card5", { title: common.pageTitle + " - Card 5"});
}

exports.card6 = async (req, res) => {
  logger.route_info("GET /card6");
  res.render("card6", { title: common.pageTitle + " - Card 6"});
}

exports.card7 = async (req, res) => {
  logger.route_info("GET /card7");
  res.render("card7", { title: common.pageTitle + " - Card 7"});
}

exports.card8 = async (req, res) => {
  logger.route_info("GET /card8");
  res.render("card8", { title: common.pageTitle + " - Card 8"});
}

exports.card9 = async (req, res) => {
  logger.route_info("GET /card9");
  res.render("card9", { title: common.pageTitle + " - Card 9"});
}

exports.card10 = async (req, res) => {
  logger.route_info("GET /card10");
  res.render("card10", { title: common.pageTitle + " - Card 10"});
}









// INSERTING DATA OF CATEGORIES INTO DATABASE

// async function insertCategoryData(){
//   try {
//     await Category.insertMany([
//       {
//         "name": "Proton Pump Inhibitor",
//         "image": "ppi.jpg"
//       },
//       {
//         "name": "Analgesics",
//         "image": "analgesics.jpg"
//       },
//       {
//         "name": "Multivitamins",
//         "image": "multivitamins.jpg"
//       },
//       {
//         "name": "Antibiotics",
//         "image": "antibiotics.jpg"
//       },
//       {
//         "name": "Antifungals",
//         "image": "antifungals.jpg"
//       },
//       {
//         "name": "Antipyretic",
//         "image": "antipyretic.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('error', + error)
//   }
// }

// insertCategoryData();





// INSERTING DATA OF DRUGS INTO DATABASE

// async function insertDrugsData(){
//   try {
//     await Drug.insertMany([
//       {
//         "name": "Bepra 20",
//         "usage": "For treating acid disorders such as ulcers and heartburn",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "72 EGP",
//         "category": "Proton Pump Inhibitor",
//         "image": "bepra.jpg"
//       },
//       {
//         "name": "Pariet 20",
//         "usage": "For treating acid disorders such as ulcers and heartburn",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "112 EGP",
//         "category": "Proton Pump Inhibitor",
//         "image": "pariet.jpg"
//       },
//       {
//         "name": "Panadol Advance",
//         "usage": "Fast effective pain relief",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "22 EGP",
//         "category": "Analgesics",
//         "image": "panadoladvance.jpg"
//       },
//       {
//         "name": "Panadol Extra",
//         "usage": "Fast effective pain relief",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "34 EGP",
//         "category": "Analgesics",
//         "image": "panadolextra.jpg"
//       },
//       {
//         "name": "Tulango Cal",
//         "usage": "For treating calium deficiency",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "59 EGP",
//         "category": "Multivitamins",
//         "image": "tulangocal.jpg"
//       },
//       {
//         "name": "Fabuglycina",
//         "usage": "For treating iron deficiency",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "39 EGP",
//         "category": "Multivitamins",
//         "image": "fabuglycina.jpg"
//       },
//       {
//         "name": "Augmentin",
//         "usage": "For treating bacterial infections",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "99 EGP",
//         "category": "Antibiotics",
//         "image": "augmentin.jpg"
//       },
//       {
//         "name": "Xithrone",
//         "usage": "For treating bacterial infections",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "45 EGP",
//         "category": "Antibiotics",
//         "image": "xithrone.jpg"
//       },
//       {
//         "name": "Abimol",
//         "usage": "For decreasing high temperature",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "13 EGP",
//         "category": "Antipyretic",
//         "image": "abimol.jpg"
//       },
//       {
//         "name": "Cetal",
//         "usage": "For decreasing high temperature",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "8 EGP",
//         "category": "Antipyretic",
//         "image": "cetal.jpg"
//       },
//       {
//         "name": "Diflucan",
//         "usage": "For treating fungal infection",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "95 EGP",
//         "category": "Antifungals",
//         "image": "diflucan.jpg"
//       },
//       {
//         "name": "Fungican",
//         "usage": "For treating fungal infection",
//         "sideEffects":
//         [
//           "1- sideEffect1",
//           "2- sideEffect2",
//           "3- sideEffect3",
//         ],
//         "activeIngredients": 
//         [
//           "1- activeIngredients1",
//           "2- activeIngredients2",
//           "3- activeIngredients3",
//         ],
//         "price": "36 EGP",
//         "category": "Antifungals",
//         "image": "fungican.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('error', + error)
//   }
// }

// insertDrugsData();




// INSERTING DATA OF CREW INTO DATABASE

// async function insertCrewData(){
//   try {
//     await Crew.insertMany([
//       {
//         "name": "Hazem Salah",
//         "position": "Admin",
//         "brief": "Controls everything",
//         "information": "leads Pfizer in its purpose, Breakthroughs that change patients’ lives, with a focus on driving the scientific and commercial innovation needed to have a transformational impact on human health. During his more than 25 years at Pfizer, Albert has built a diverse and successful career, holding several senior positions across a range of markets and disciplines. The global nature of his work – having lived and worked in eight different cities and led teams across five continents – has informed his understanding of the needs of patients and healthcare systems around the world and deepened his commitment to helping ensure equitable access to medicines and vaccines.",
//         "image": "person2.jpg"
//       },
//       {
//         "name": "Seng H Cheng",
//         "position": "Team Leader",
//         "brief": "Responsible for providing guidance, instruction, direction and leadership to a group of individuals",
//         "information": "leads Pfizer in its purpose, Breakthroughs that change patients’ lives, with a focus on driving the scientific and commercial innovation needed to have a transformational impact on human health. During his more than 25 years at Pfizer, Albert has built a diverse and successful career, holding several senior positions across a range of markets and disciplines. The global nature of his work – having lived and worked in eight different cities and led teams across five continents – has informed his understanding of the needs of patients and healthcare systems around the world and deepened his commitment to helping ensure equitable access to medicines and vaccines.",
//         "image": "person3.jpg"
//       },
//       {
//         "name": "Jeff Settleman",
//         "position": "Chief Scientific Officer",
//         "brief": "Dr. Jeff Settleman is the Chief Scientific Officer for Oncology Research and Development and serves as the La Jolla site head.",
//         "information": "leads Pfizer in its purpose, Breakthroughs that change patients’ lives, with a focus on driving the scientific and commercial innovation needed to have a transformational impact on human health. During his more than 25 years at Pfizer, Albert has built a diverse and successful career, holding several senior positions across a range of markets and disciplines. The global nature of his work – having lived and worked in eight different cities and led teams across five continents – has informed his understanding of the needs of patients and healthcare systems around the world and deepened his commitment to helping ensure equitable access to medicines and vaccines.",
//         "image": "person3.jpg"
//       },
//       {
//         "name": "Dave Denton",
//         "position": "Chief Financial Officer and Executive Vice President",
//         "brief": "Dave is a member of Pfizer’s Executive Leadership Team (ELT), providing strategic global financial leadership.",
//         "information": "leads Pfizer in its purpose, Breakthroughs that change patients’ lives, with a focus on driving the scientific and commercial innovation needed to have a transformational impact on human health. During his more than 25 years at Pfizer, Albert has built a diverse and successful career, holding several senior positions across a range of markets and disciplines. The global nature of his work – having lived and worked in eight different cities and led teams across five continents – has informed his understanding of the needs of patients and healthcare systems around the world and deepened his commitment to helping ensure equitable access to medicines and vaccines.",
//         "image": "person3.jpg"
//       },
//       {
//         "name": "William C. Gruber",
//         "position": "Senior Vice President of Pfizer Vaccine Clinical Research and Development",
//         "brief": "Responsible for global clinical development of vaccines.",
//         "information": "leads Pfizer in its purpose, Breakthroughs that change patients’ lives, with a focus on driving the scientific and commercial innovation needed to have a transformational impact on human health. During his more than 25 years at Pfizer, Albert has built a diverse and successful career, holding several senior positions across a range of markets and disciplines. The global nature of his work – having lived and worked in eight different cities and led teams across five continents – has informed his understanding of the needs of patients and healthcare systems around the world and deepened his commitment to helping ensure equitable access to medicines and vaccines.",
//         "image": "person3.jpg"
//       },
//       {
//         "name": "Rady Johnson",
//         "position": "Chief Compliance, Quality and Risk Officer, Executive Vice President",
//         "brief": "has overall responsibility for the company's global compliance program, Regulatory Quality Assurance organization, global security efforts, and Office of the Ombuds.",
//         "information": "leads Pfizer in its purpose, Breakthroughs that change patients’ lives, with a focus on driving the scientific and commercial innovation needed to have a transformational impact on human health. During his more than 25 years at Pfizer, Albert has built a diverse and successful career, holding several senior positions across a range of markets and disciplines. The global nature of his work – having lived and worked in eight different cities and led teams across five continents – has informed his understanding of the needs of patients and healthcare systems around the world and deepened his commitment to helping ensure equitable access to medicines and vaccines.",
//         "image": "person3.jpg"
//       }
//     ]);
//   } catch (error) {
//     console.log('error', + error)
//   }
// }

// insertCrewData();