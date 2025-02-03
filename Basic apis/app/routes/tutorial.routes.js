module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     tutorial:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the tutorial
 *         title:
 *           type: string
 *           description: The tutorial title
 *         author:
 *           type: string
 *           description: The tutorial author
 */

 /**
  * @swagger
  * tags:
  *   name: tutorials
  *   description: The tutorials managing API
  */

/**
 * @swagger
 * /tutorials:
 *   get:
 *     summary: Returns the list of all the tutorials
 *     tags: [tutorials]
 *     responses:
 *       200:
 *         description: The list of the tutorials
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */


/**
 * @swagger
 * /tutorials/{id}:
 *   get:
 *     summary: Get the tutorial by id
 *     tags: [tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorial id
 *     responses:
 *       200:
 *         description: The tutorial description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/tutorial'
 *       404:
 *         description: The tutorial was not found
 */



/**
 * @swagger
 * /tutorials:
 *   post:
 *     summary: Create a new tutorial
 *     tags: [tutorials]
 *     requestBody:
 *       required: true
 *       content:
 * 

 *         application/json:
 *           schema:
 *             $ref: '#/tutorial.routes.js'
 *     responses:
 *       200:
 *         description: The tutorial was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/app/controllers/tutorial.controller'
 *       500:
 *         description: Some server error
 */


/**
 * @swagger
 * /tutorials/{id}:
 *  put:
 *    summary: Update the tutorial by the id
 *    tags: [tutorials]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The tutorial id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/tutorial'
 *    responses:
 *      200:
 *        description: The tutorial was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/tutorial'
 *      404:
 *        description: The tutorial was not found
 *      500:
 *        description: Some error happened
 */


/**
 * @swagger
 * /tutorials/{id}:
 *   delete:
 *     summary: Remove the tutorial by id
 *     tags: [tutorials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tutorial id
 * 
 *     responses:
 *       200:
 *         description: The tutorial was deleted
 *       404:
 *         description: The tutorial was not found
 */

  // Create a new Tutorial
  router.post("/tutorials", tutorials.create);

  // Retrieve all Tutorials
  router.get("/tutorials", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("/", tutorials.deleteAll);

  router.get("/signup", (req, res) => {
    return res.render("signup");
  });
  
  router.get("/login", (req, res) => {
    return res.render("login");
  });

  app.use('/api/tutorials', router);
  
};
