
let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require ('../app');

//assertion style
chai.should()

chai.use(chaiHttp);

let currentresponse = null;

afterEach(function(){
    const errorBody = currentresponse && currentresponse.body;

    if(this.currentTest.state === 'failed' && errorBody){
        console.log(errorBody);
    }

    currentresponse = null ;
})

describe('API Final', ()=> {
    describe ("GET FINAL USER/", ()=> {
        it("Get User Details Successfully", (done) =>{
            chai.request(app)
            .get("/finalapi/user")
            .send({userName : "Sameena"})
            .end((err,response)=>{
            currentresponse = response;
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('account_creation');
              response.body.should.have.property('unique_username');
              response.body.should.have.property('personalInformation');
              response.body.should.have.property('statusPosted');
              response.body.should.have.property('statusLiked');
              done();
            });
        });
    });

    describe ("GET FINAL USER/", ()=> {
        it("Bad Request", (done) =>{
            chai.request(app)
            .get("/finalapis/user")
            .send({userName : "Sameena"})
            .end((err,response)=>{
              currentresponse = response;
              response.should.have.status(404);
              done();
            });
        });
    });

    describe ("GET FINAL USER/", ()=> {
        it("No userName", (done) =>{
            chai.request(app)
            .get("/finalapi/user")
            .send()
            .end((err,response)=>{
                currentresponse = response;
                response.body.should.have.property('message').eq('Please enter username');
              done();
            });
        });
    });



    describe ("GET FINAL STATUS/", ()=> {
        it("Get User Details Successfully", (done) =>{
            chai.request(app)
            .get("/finalapi/status")
            .send({status : "Hi, Admissions are open"})
            .end((err,response)=>{
            currentresponse = response;
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('number_of_likes');
              response.body.should.have.property('status_creation');
              response.body.should.have.property('status_author');
              response.body.should.have.property('likes');
              done();
            });
        });
    });

    describe ("GET FINAL STATUS/", ()=> {
        it("Bad Request", (done) =>{
            chai.request(app)
            .get("/finalapis/status")
            .send({userName : "Sameena"})
            .end((err,response)=>{
              currentresponse = response;
              response.should.have.status(404);
              done();
            });
        });
    });

    describe ("GET FINAL STATUS/", ()=> {
        it("No userName", (done) =>{
            chai.request(app)
            .get("/finalapi/status")
            .send()
            .end((err,response)=>{
                currentresponse = response;
                response.body.should.have.property('message').eq('Please enter status');
              done();
            });
        });
    });


    describe ("GET SEARCH USER/", ()=> {
        it("Get User Details Successfully", (done) => {
            chai.request(app)
            .get("/finalapi/searchuser")
            .send({userName : "Sameena"})
            .end((err,response)=>{
              currentresponse = response;
              response.should.have.status(200);
              response.body.should.be.a('array');
              done();
            });
        });
    });

    describe ("GET SEARCH USER/", ()=> {
        it("Bad Request", (done) =>{
            chai.request(app)
            .get("/finalapis/searchuser")
            .send({userName : "Sameena"})
            .end((err,response)=>{
              currentresponse = response;
              response.should.have.status(404);
              done();
            });
        });
    });

    describe ("GET SEARCH USER/", ()=> {
        it("No userName", (done) =>{
            chai.request(app)
            .get("/finalapi/searchuser")
            .send()
            .end((err,response)=>{
                currentresponse = response;
                response.body.should.have.property('message').eq('Please enter username');
              done();
            });
        });
    });

    describe ("GET USERS ABOVE 18/", ()=> {
        it("Get User Details Successfully", (done) => {
            chai.request(app)
            .get("/finalapi/usersage18")
            .end((err,response)=>{
              currentresponse = response;
              response.body.should.be.a('array');
              done();
            });
        });
    });

    describe ("GET USERS ABOVE 18/", ()=> {
        it("Bad Request", (done) =>{
            chai.request(app)
            .get("/finalapis/usersage18")
            .end((err,response)=>{
              currentresponse = response;
              response.should.have.status(404);
              done();
            });
        });
    });
});
