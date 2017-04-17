process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const url = 'http://localhost:3001'

chai.use(chaiHttp);

describe('server', () => {
  describe('/GET reddits', () => {
    it('it should GET all the top 60 subreddit names', (done) => {
      chai.request(url)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(60);
          done();
        });
    });
  });

  describe('/GET /r/subreddit', () => {
    it('it should GET all the posts from a specific subreddit', (done) => {
      chai.request(url)
        .get('/r/gwent')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.children.should.be.a('array');            
            res.body.data.children[0].data.subreddit.should.equal('gwent')
          done();
        })
    })
  })

  describe('/GET /r/subreddit', () => {
    it('it should GET all the posts from a specific subreddit', (done) => {
      chai.request(url)
        .get('/r/askreddit')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.data.children.should.be.a('array');
            res.body.data.children[0].data.subreddit.should.equal('AskReddit')
          done();
        })
    })
  })

  describe('/GET /r/subreddit', () => {
    it('it should fail to get posts from a non existent subreddit', (done) => {
      chai.request(url)
        .get('/r/adfnakldmkasmd')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.children.length.should.equal(0)
          done();
        })
    })
  })

  describe('/GET /r/subreddit', () => {
    it('it should fail to get posts from a private subreddit', (done) => {
      chai.request(url)
        .get('/r/askreddi')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.error.should.equal(403)
          done();
        })
    })
  })

  describe('/GET /r/subreddit/amount/10', () => {
    it('it should get the amount of posts specified: 10', (done) => {
      chai.request(url)
        .get('/r/gwent/amount/10')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.within(10,13)  //sticky posts come regardless of limit
          done();
        })
    })
  })

  describe('/GET /r/subreddit/about', () => {
    it('it should get the information about the sub', (done) => {
      chai.request(url)
        .get('/r/gwent/about')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.data.display_name.should.be.equal('gwent')
          done();
        })
    })
  })

  describe('/GET /r/subreddit/comments', () => {
    it('it should get the comments on a post', (done) => {
      chai.request(url)
        .get('/r/gwent/comments/65w4d2')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body[0].data.children.should.be.a('array');
            res.body[0].data.children[0].data.title.should.be.equal("Is Frightner actually the worst card in the game?")
          done();
        })
    })
  })

})