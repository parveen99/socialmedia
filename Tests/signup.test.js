let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require ('../app');

//assertion style
chai.should()

chai.use(chaiHttp);

// signupsuccess = {
//     email : "baby@gmail.com" ,
//     personalInformation : {
//       firstName : "baby" ,
//       phoneNumber : [7636546353] ,
//       DOB : "1999.09.06" ,
//     },
//     address : {
//       pincode : 987654,
//       state : "Kerala" ,
//       country : "India"
//     }
//   }

  signupduplicate = {
    email : "comb@gmail.com" ,
    personalInformation : {
      firstName : "comb" ,
      phoneNumber : [7636546353] ,
      DOB : "1999.09.06" ,
    },
    address : {
      pincode : 987654,
      state : "Kerala" ,
      country : "India"
    }
  }


  signupnoemail = {
    personalInformation : {
      firstName : "comb" ,
      phoneNumber : [7636546353] ,
      DOB : "1999.09.06" ,
    },
    address : {
      pincode : 987654,
      state : "Kerala" ,
      country : "India"
    }
  }

  
  signupnodob= {
    email : "comb@gmail.com" ,
    personalInformation : {
      firstName : "comb" ,
      phoneNumber : [7636546353] 
    },
    address : {
      pincode : 987654,
      state : "Kerala" ,
      country : "India"
    }
  }
  
let currentresponse = null;

afterEach(function(){
    const errorBody = currentresponse && currentresponse.body;

    if(this.currentTest.state === 'failed' && errorBody){
        console.log(errorBody);
    }

    currentresponse = null ;
})
describe('API Signup', ()=> {
    // describe ("GET /", ()=> {
    //     it("Signup successfull", (done) =>{
    //         chai.request(app)
    //         .post("/signup")
    //         .send(signupsuccess)
    //         .end((err,response)=>{
    //         currentresponse = response;
    //         response.should.have.status(201);
    //         response.body.should.be.a('object');
    //         response.body.should.have.property('USERNAME').eq(signupsuccess.email.substring(0,email.lastIndexOf("@")))
    //         response.body.should.have.property('PASSWORD').eq('social');
    //         done();
    //         });
    //     });
    // });

    describe ("POST /", ()=> {
        it("Signup fail - Duplicate", (done) =>{
            chai.request(app)
            .post("/signup")
            .send(signupduplicate)
            .end((err,response)=>{
            currentresponse = response;
            response.should.have.status(500);
            response.body.should.be.a('object');
            response.body.should.have.nested.property('message.name').eq('MongoError');
            done();
            });
        });
    });

    describe ("POST /", ()=> {
        it("Signup fail - Bad request Wrong API", (done) =>{
            chai.request(app)
            .post("/signups")
            .send(signupduplicate)
            .end((err,response)=>{
            currentresponse = response;
            response.should.have.status(404);
            done();
            });
        });
    });

    describe ("POST /", ()=> {
        it("Signup fail - No email", (done) =>{
            chai.request(app)
            .post("/signup")
            .send(signupnoemail)
            .end((err,response)=>{
            currentresponse = response;
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eq("Email ID / DOB not given in data");
            done();
            });
        });
    });

    describe ("POST /", ()=> {
        it("Signup fail - No DOB", (done) =>{
            chai.request(app)
            .post("/signup")
            .send(signupnodob)
            .end((err,response)=>{
            currentresponse = response;
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eq("Email ID / DOB not given in data");
            done();
            });
        });
    });
    
});
