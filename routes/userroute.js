const express = require("express");
const { check } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/usercontroller');

/**
 * @swagger
 * /api/user:
 *  get:
 *    description: Get all the users from DB
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: users fetched successfully.
 */
router.get('/user', userController.getUser);


/**
 * @swagger
 * /api/user:
 *  post:
 *    description: Use to add user in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Add user
 *        description: Add user in DB.
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *            - password
 *          properties:
 *            userName:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: User added successfully.
 */
router.post('/user',[
    check('userName'),
    check('password')
],userController.postUser);


/**
 * @swagger
 * /api/user/{userId}:
 *  put:
 *    description: Used to update UserInfo in DB
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId        
 *      - in: body
 *        name: Update User
 *        description: Update User in DB.
 *        schema:
 *          type: object
 *          required:
 *            - userName
 *            - password
 *          properties:
 *            userName:
 *              type: string
 *            password:
 *              type: string
 *    responses:
 *      '200':
 *        description: Userinfo item updated successfully.
 */
router.put('/user/:userId', userController.updateUser);


/**
 * @swagger
 * /api/user/{userId}:
 *  delete:
 *    description: Removes user item from DB.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        description: Remove Userdata Item from DB.
 *        schema:
 *          type: string
 *          required:
 *            - userId
 *          properties:
 *            userId:
 *              type: string
 *    responses:
 *      '200':
 *        description: UserData removed successfully.
 */

router.delete('/user/:userId', userController.deleteUser);

module.exports = router;




