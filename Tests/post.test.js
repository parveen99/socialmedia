
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require ('../app');

//assertion style
chai.should()

chai.use(chaiHttp);


postStatus = { userName : 'sahil' , status : " Hi, this is Sahil. Give me a warm welcome"}

firstlikeStatus = { userName : 'sahil' , status : " Hi, this is Sahil. Give me a warm welcome" , likes : ['Salman'] }

likeStatus = { userName : 'sahil' , status : " Hi, this is Sahil. Give me a warm welcome" , likes : ['Sameena'] }

describe ("POST Status/", ()=> {
    it("Post status success", (done) =>{
        chai.request(app)
        .post("/post")
        .send(postStatus)
        .end((err,response)=>{
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.nested.property('message').eq('Status posted successfully');
        done();
        });
    });

    it("Post status Fail - Bad request", (done) =>{
        chai.request(app)
        .post("/posts")
        .send(postStatus)
        .end((err,response)=>{
        response.should.have.status(404);
        done();
        });
    });
});

describe ("POST LikeStatus/", ()=> {
    it("Like status success", (done) =>{
        chai.request(app)
        .post("/post/like")
        .send(firstlikeStatus)
        .end((err,response)=>{
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.nested.property('message').eq('You are the first like for this status');
        done();
        });
    });

    it("Like status Fail - Bad request", (done) =>{
        chai.request(app)
        .post("/posts/like")
        .send(firstlikeStatus)
        .end((err,response)=>{
        response.should.have.status(404);
        done();
        });
    });

    it("Like status Fail - Already liked", (done) =>{
        chai.request(app)
        .post("/post/like")
        .send(firstlikeStatus)
        .end((err,response)=>{
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.nested.property('message').eq('You have already liked this Status');
        done();
        });
    });



    it("Like status success - liked", (done) =>{
        chai.request(app)
        .post("/post/like")
        .send(likeStatus)
        .end((err,response)=>{
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.nested.property('message').eq('You have liked this Status');
        done();
        });
    });
});
