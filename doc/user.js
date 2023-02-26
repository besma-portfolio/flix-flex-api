/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register new user
 *     tags:
 *       - user
 *     parameters:
 *       - name: User informations
 *         required: true
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *            firstname:
 *              type: string
 *              required: true
 *              example: 'myFirstname'
 *            lastname:
 *              type: string
 *              required: true
 *              example: 'myLastname'
 *            username:
 *              type: string
 *              required: true
 *              example: example@gmail.com
 *            password:
 *              type: string
 *              required: true
 *              example: p@sswordX20
 *            password_confirmation:
 *              type: string
 *              required: true
 *              example: p@sswordX20
 *     responses:
 *       200:
 *         description: Ok
 *       400:
 *         description: Bad request
 *         schema :
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *               properties:
 *                 field_name:
 *                   type: string
 *               example: {'firstname' : ['required_field', 'expected_string'], 'lastname':['required_field', 'expected_string'],'username':['required_field', 'expected_string','existing_username'], 'password': ['required_field','expected_string','short_password','weak_password','mismatched_password']}
 *       500:
 *         description: Server error
 *         schema :
 *           type: object
 *           properties:
 *             errors:
 *               type: string
 *               example: internal_error
 */