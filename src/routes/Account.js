


router.get('/accounts', accountController.index);
router.post('/accounts', accountController.create);
router.get('/accounts/:id', accountController.show);
router.put('/accounts/:id', accountController.update);
router.delete('/accounts/:id', accountController.delete);