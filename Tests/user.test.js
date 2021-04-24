







let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require ('../app');

//assertion style
chai.should()

chai.use(chaiHttp);



describe('API Login', ()=> {
    describe ("GET /", ()=> {
        it("Login successfull with userName and Password", (done) =>{
            chai.request(app)
            .get("/user")
            .send({userName : "Sameena", password : "social"})
            .end((err,response)=>{
              response.should.have.status(200);
              response.body.should.be.a('object');
              response.body.should.have.property('message').eq('Login Successfull');
              done();
            });
        });
    });

  describe ("GET /", ()=> {
    it("Login successfull with Email and Password", (done) =>{
      chai.request(app)
      .get("/user")
      .send({email : "Sameena@gmail.com", password : "social"})
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
      .send({userName : "Sameena", password : "social"})
      .end((err,response)=>{
        response.should.have.status(404);
        done();
      });
    });
  });


  describe ("GET /", ()=> {
    it("Username correct password wrong", (done) =>{
      chai.request(app)
      .get("/user")
      .send({userName : "Sameena", password : "socialgram"})
      .end((err,response)=>{
        response.body.should.be.a('object');
        response.body.should.have.property('message').eq('UserName / Password Incorrect');
        done();
      });
    });
  });

  describe ("GET /", ()=> {
    it("Email correct password wrong", (done) =>{
      chai.request(app)
      .get("/user")
      .send({email : "Sameena@gmail.com", password : "socialgram"})
      .end((err,response)=>{
        response.body.should.be.a('object');
        response.body.should.have.property('message').eq("Email / Password Incorrect");
        done();
      });
    });
  });

  describe ("GET /", ()=> {
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

  describe ("GET /", ()=> {
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




// describe('API Update Password', ()=> {
//   describe ("PATCH /", ()=> {
//       it("Update Password Success", (done) =>{
//           chai.request(app)
//           .patch("/user/:username")
//           .send({userName : "Sameena", password : "tissue"})
//           .end((err,response)=>{
//             response.should.have.status(200);
//             response.body.should.be.a('object');
//             response.body.should.have.property('message').eq('Password updated successfully');
//             done();
//           });
//       });
//   });

//   describe ("PATCH /", ()=> {
//     it("Update Password Fail - No userName", (done) =>{
//         chai.request(app)
//         .patch("/user/:username")
//         .send({password : "social"})
//         .end((err,response)=>{
//           response.body.should.be.a('object');
//           response.body.should.have.property('message').eq('userName is required');
//           done();
//         });
//     });
// });

// describe ("PATCH /", ()=> {
//   it("Update Password Fail - No password", (done) =>{
//       chai.request(app)
//       .patch("/user/:username")
//       .send({userName : "Sameena"})
//       .end((err,response)=>{
//         response.body.should.be.a('object');
//         response.body.should.have.property('message').eq('Enter password to update');
//         done();
//       });
//   });
// });


// describe ("PATCH /", ()=> {
//   it("Update Password Fail - Bad request", (done) =>{
//       chai.request(app)
//       .patch("/users/:username")
//       .send({userName : "Sameena", password : "socialgram"})
//       .end((err,response)=>{
//         response.should.have.status(400);
//         done();
//       });
//   });
// });

// describe ("PATCH /", ()=> {
//   it("Update Password Fail - Wrong User", (done) =>{
//       chai.request(app)
//       .patch("/users/:username")
//       .send({userName : "Sameena", password : "socialgram"})
//       .end((err,response)=>{
//         response.should.have.status(403);
//         response.body.should.have.property('message').eq('You can update only your password');
//         done();
//       });
//   });
// });

// });



// describe('API Delete User', ()=> {
//   describe ("DELETE /", ()=> {
//       it("Delete user success", (done) =>{
//           chai.request(app)
//           .delete("/user/:username")
//           .send({userName : ""})
//           .end((err,response)=>{
//             response.should.have.status(200);
//             response.body.should.be.a('object');
//             response.body.should.have.property('message').eq('User removed successfully');
//             done();
//           });
//       });
//   });

//   describe ("DELETE /", ()=> {
//     it("Delete User Fail - No userName", (done) =>{
//         chai.request(app)
//         .delete("/user/:username")
//         .send({userName : ""})
//         .end((err,response)=>{
//           response.body.should.be.a('object');
//           response.body.should.have.property('message').eq('userName is required');
//           done();
//         });
//     });
// });




// describe ("DELETE /", ()=> {
//   it("Update Password Fail - Bad request", (done) =>{
//       chai.request(app)
//       .delete("/users/:username")
//       .send({userName : ""})
//       .end((err,response)=>{
//         response.should.have.status(400);
//         done();
//       });
//   });
// });

// describe ("PATCH /", ()=> {
//   it("Delete User Fail - Wrong User", (done) =>{
//       chai.request(app)
//       .delete("/users/:username")
//       .send({userName : ""})
//       .end((err,response)=>{
//         response.should.have.status(403);
//         response.body.should.have.property('message').eq('You can only delete your account');
//         done();
//       });
//   });
// });

// });



// describe('API Update Any Information', ()=> {
//   describe ("PATCH /", ()=> {
//       it("Update Info Success", (done) =>{
//           chai.request(app)
//           .patch('/user/updateany/:username')
//           .send({userName : "Sameena", password : "tissue"})
//           .end((err,response)=>{
//             response.should.have.status(200);
//             response.body.should.be.a('object');
//             response.body.should.have.property('message').eq('User Details Updated Successfully');
//             done();
//           });
//       });
//   });

//   describe ("PATCH /", ()=> {
//     it("Update Info Fail - No userName", (done) =>{
//         chai.request(app)
//         .patch('/user/updateany/:username')
//         .send({password : "socialgram"})
//         .end((err,response)=>{
//           response.body.should.be.a('object');
//           response.body.should.have.property('message').eq('userName is required');
//           done();
//         });
//     });
// });




// describe ("PATCH /", ()=> {
//   it("Update Any Info Fail - Bad request", (done) =>{
//       chai.request(app)
//       .patch('/users/updateany/:username')
//       .send({userName : "Sameena", password : "socialgram"})
//       .end((err,response)=>{
//         response.should.have.status(400);
//         done();
//       });
//   });
// });

// describe ("PATCH /", ()=> {
//   it("Update Any Info Fail - Wrong User", (done) =>{
//       chai.request(app)
//       .patch('/user/updateany/:username')
//       .send({userName : "Sameena", password : "socialgram"})
//       .end((err,response)=>{
//         response.should.have.status(403);
//         response.body.should.have.property('message').eq('You can update only your account');
//         done();
//       });
//   });
// });

// });
