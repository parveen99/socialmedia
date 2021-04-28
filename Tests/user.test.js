

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require ('../app');

//assertion style
chai.should()

chai.use(chaiHttp);



describe('API Login', ()=> {
    describe ("GET User Login/", ()=> {
        it("Login successfull with userName and Password", (done) =>{
            chai.request(app)
            .get("/user")
            .send({userName : "waheedha", password : "social"})
            .end((err,response)=>{
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('message').eq('Login Successfull');
              done();
            });
        });
    });

  describe ("GET User Login/", ()=> {
    it("Login successfull with Email and Password", (done) =>{
      chai.request(app)
      .get("/user")
      .send({email : "waheedha@gmail.com", password : "social"})
      .end((err,response)=>{
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eq('Login Successfull');
        done();
      });
    });
  });

  
  describe ("GET /", ()=> {
    it("Wrong API - Bad Request", (done) =>{
      chai.request(app)
      .get("/users")
      .send({userName : "Sameena", password : "socialgram"})
      .end((err,response)=>{
        response.should.have.status(404);
        done();
      });
    });
  });


  describe ("GET User Login/", ()=> {
    it("Username correct password wrong", (done) =>{
      chai.request(app)
      .get("/user")
      .send({userName : "Sameena", password : "socialgram"})
      .end((err,response)=>{
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eq('UserName / Password Incorrect');
        done();
      });
    });
  });

  describe ("GET User Login/", ()=> {
    it("Email correct password wrong", (done) =>{
      chai.request(app)
      .get("/user")
      .send({email : "Sameena@gmail.com", password : "socialgram"})
      .end((err,response)=>{
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eq("Email / Password Incorrect");
        done();
      });
    });
  });

  describe ("GET User Login/", ()=> {
    it("Email invalid", (done) =>{
      chai.request(app)
      .get("/user")
      .send({email : "Sameenainvalid@gmail.com", password : "socialgram"})
      .end((err,response)=>{
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eq("User not found! Invalid emailID");
        done();
      });
    });
  });

  describe ("GET User Login/", ()=> {
    it("Username invalid", (done) =>{
      chai.request(app)
      .get("/user")
      .send({userName : "Sameenainvalid", password : "socialgram"})
      .end((err,response)=>{
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eq("User not found! Invalid user");
        done();
      });
    });
  });
});




describe('API Update Password', ()=> {
  describe ("PATCH /", ()=> {
      it("Update Password Success", (done) =>{
          chai.request(app)
          .patch("/user/" + 'Sameena')
          .send({userName : "Sameena", password : "tissue"})
          .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eq('Password updated successfully');
            done();
          });
      });
  });

  describe ("PATCH Update Password/", ()=> {
    it("Update Password Fail - No userName", (done) =>{
        chai.request(app)
        .patch("/user/" + 'Sameena')
        .send({password : "social"})
        .end((err,response)=>{
          response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('message').eq('userName is required');
          done();
        });
    });
});

describe ("PATCH Update Password/", ()=> {
  it("Update Password Fail - No password", (done) =>{
      chai.request(app)
      .patch("/user/" + 'Sameena')
      .send({userName : "Sameena"})
      .end((err,response)=>{
        response.should.have.status(400);
        response.body.should.be.a('object');
        response.body.should.have.property('message').eq('Enter password to update');
        done();
      });
  });
});


describe ("PATCH Update Password/", ()=> {
  it("Update Password Fail - Bad request", (done) =>{
      chai.request(app)
      .patch("/users/" + 'Sameena')
      .send({userName : "Sameena", password : "socialgram"})
      .end((err,response)=>{
        response.should.have.status(404);
        done();
      });
  });
});

describe ("PATCH Update Password/", ()=> {
  it("Update Password Fail - Wrong User", (done) =>{
      chai.request(app)
      .patch("/user/" + 'Salman')
      .send({userName : "Sameena", password : "socialgram"})
      .end((err,response)=>{
        response.should.have.status(403);
        response.body.should.have.property('message').eq('You can update only your password');
        done();
      });
  });
});

});



describe('API Delete User', ()=> {
  describe ("DELETE User/", ()=> {
      it("Delete user success", (done) =>{
          chai.request(app)
          .delete("/user/" + 'hemaraghu')
          .send({userName : "hemaraghu"})
          .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eq('User removed successfully');
            done();
          });
      });
  });

  describe ("DELETE User/", ()=> {
    it("Delete User Fail - No userName", (done) =>{
        chai.request(app)
        .delete("/user/" + 'deeptha')
        .send({userName : ""})
        .end((err,response)=>{
            response.should.have.status(400);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eq('userName is required');
          done();
        });
    });
});




describe ("DELETE User/", ()=> {
  it("Delete User Fail - Bad request", (done) =>{
      chai.request(app)
      .delete("/users/" + 'deeptha')
      .send({userName : ""})
      .end((err,response)=>{
        response.should.have.status(404);
        done();
      });
  });
});

describe ("DELETE User/", ()=> {
  it("Delete User Fail - Wrong User", (done) =>{
      chai.request(app)
      .delete("/user/" + 'anusha')
      .send({userName : 'redmi'})
      .end((err,response)=>{
        response.should.have.status(403);
        response.body.should.have.property('message').eq('You can only delete your account');
        done();
      });
  });
});

});



describe('API Update Any Information', ()=> {
  describe ("PATCH Update Any Information/", ()=> {
      it("Update Info Success", (done) =>{
          chai.request(app)
          .patch('/user/updateany/' + 'peermohideen')
          .send({userName : "peermohideen", personalInformation : {firstName : "Peer"}})
          .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eq('User Details Updated Successfully');
            done();
          });
      });
  });

  describe ("PATCH Update Any Information/", ()=> {
    it("Update Info Fail - No userName", (done) =>{
        chai.request(app)
        .patch('/user/updateany/' + 'peermohideen')
        .send({personalInformation : {firstName : "Peer"}})
        .end((err,response)=>{
            response.should.have.status(400);
          response.body.should.be.a('object');
          response.body.should.have.property('message').eq('userName is required');
          done();
        });
    });
});




describe ("PATCH Update Any Information/", ()=> {
  it("Update Any Info Fail - Bad request", (done) =>{
      chai.request(app)
      .patch('/users/updateany/' + 'peermohideen')
      .send({userName : "peermohideen", personalInformation : {firstName : "Peer"}})
      .end((err,response)=>{
        response.should.have.status(404);
        done();
      });
  });
});

describe ("PATCH Update Any Information/", ()=> {
  it("Update Any Info Fail - Wrong User", (done) =>{
      chai.request(app)
      .patch('/user/updateany/' + 'peermohideen')
      .send({userName : "Aalisha", password : "socialgram"})
      .end((err,response)=>{
        response.should.have.status(403);
        response.body.should.have.property('message').eq('You can update only your account');
        done();
      });
  });
});

});
