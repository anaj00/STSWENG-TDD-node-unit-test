const sinon = require('sinon');
const PostModel = require('../models/post.js');
const PostController = require('../controllers/postController.js');


describe('create', () => {
        var createPostStub;

        let req = {
            body: {
                author: 'stswenguser',
                title: 'My first test post',
                content: 'Random content'
            },
            session: {
                user: 'stswenguser'
            },
        };

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'create').yields(null, expectedResult);

            // Act
            PostController.addPost(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title, content: req.body.content, author: req.body.author }));
        });


    });

