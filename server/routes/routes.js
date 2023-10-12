var express = require("express");
var router = express.Router();
var controllers = require("../controllers/controllers");

// App Routes

router.get("/", controllers.homepage);
router.get("/drugs", controllers.drugs);
router.get("/categories", controllers.ourCategories);
router.get("/categories/:id", controllers.ourCategoriesById);
router.get("/drugs/:id", controllers.ourDrugs);
router.get("/newest-drugs", controllers.ourNewestDrugs);
router.get("/alldrugs", controllers.ourAllDrugs);
router.get("/about", controllers.aboutUs);
router.get("/about/:id", controllers.aboutUsById);
router.get("/login", controllers.loginPage);
router.post("/login", controllers.loginPostPage);
router.get("/signup", controllers.signUpPage);
router.post("/signup", controllers.signUpPostPage);
router.post("/logout", controllers.logOutPage);
router.post("/search", controllers.searchDrug);
router.get("/account", controllers.accountPage);
router.post("/account", controllers.accountPostPage);
router.get("/cart", controllers.cartPage);
router.post("/addToCartOrIncreaseQuantity", controllers.addToCartOrIncreaseQuantity);
router.post("/removeFromCartOrDecreaseQuantity", controllers.removeFromCartOrDecreaseQuantity);
router.get("/checkout", controllers.checkoutPage);
router.post("/checkout", controllers.checkoutPostPage);
router.get("/project2", controllers.project2);
router.get("/project3", controllers.project3);
router.get("/project4", controllers.project4);
router.get("/project5", controllers.project5);
router.get("/project6", controllers.project6);
router.get("/project7", controllers.project7);
router.get("/project8", controllers.project8);
router.get("/card1", controllers.card1);
router.get("/card2", controllers.card2);
router.get("/card3", controllers.card3);
router.get("/card4", controllers.card4);
router.get("/card5", controllers.card5);
router.get("/card6", controllers.card6);

module.exports = router;
