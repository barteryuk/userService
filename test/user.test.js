const mongoose = require("mongoose");

const assert = require("assert");
const User = require("../api/user.dao");

const dummyUser = {
  email: "dummyUser@mail.com",
  password: 1,
};

describe("Checking documents", () => {
  before((done) => {
    mongoose.connect("mongodb://localhost/testDatabase", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => {
      console.log("We are connected to test database!");
      done();
    });
  });

  it("creates a user", (done) => {
    const newUser = new User(dummyUser);
    newUser.save().then(() => {
      assert(!newUser.isNew);
      done();
    });
  });

  it("Validation Error : user must be unique", (done) => {
    const newUser = new User(dummyUser);
    newUser.save((err) => {
      if (err.code === 11000) {
        return done();
      }
    });
  });

  it("Validation Error : user must be filled", (done) => {
    const newUser = new User({ password: 1 });
    newUser.save((err) => {
      if (err.errors.email.properties.message === "Email is required") {
        return done();
      }
    });
  });

  it("Validation Error : password must be filled", (done) => {
    const newUser = new User({ email: "dummyUser@mail.com" });
    newUser.save((err) => {
      if (err.errors.password.properties.message === "Password is required") {
        return done();
      }
    });
  });

  it("finds all user", (done) => {
    User.find().then(() => {
      done();
    });
  });

  it("finds user with the email of dummyUser@mail.com", (done) => {
    User.findOne(dummyUser).then((user) => {
      assert(dummyUser.email === "dummyUser@mail.com");
      done();
    });
  });

  function assertHelper(statement, done) {
    statement
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].email === "dummyUser2@mail.com");
        done();
      });
  }

  // validation error : user must be unique
  // it("sets and saves user using an instance", (done) => {
  //   console.log(done);
  //   dummyUser.set("email", "dummyUser2@mail.com");
  //   assertHelper(dummyUser.save(), done);
  // });

  // it("update users using instance", (done) => {
  //   assertHelper(dummyUser.update({ email: "dummyUser2@mail.com" }), done);
  // });

  // it("update all matching users using model", (done) => {
  //   assertHelper(
  //     User.update(
  //       { email: "dummyUser@mail.com" },
  //       { email: "dummyUser2@mail.com" }
  //     ),
  //     done
  //   );
  // });

  it("update one user using model", (done) => {
    assertHelper(
      User.findOneAndUpdate(
        { email: "dummyUser@mail.com" },
        { email: "dummyUser2@mail.com" }
      ),
      done
    );
  });

  it("update one user with id using model", (done) => {
    assertHelper(
      User.findByIdAndUpdate(dummyUser._id, { email: "dummyUser2@mail.com" }),
      done
    );
  });

  // it("removes a user using its instance", (done) => {
  //   dummyUser
  //     .remove()
  //     .then(() => User.findOne({ email: "dummyUser@mail.com" }))
  //     .then((user) => {
  //       assert(user === null);
  //       done();
  //     });
  // });

  it("removes multiple users", (done) => {
    User.deleteMany()
      .then(() => User.findOne({ email: "dummyUser@mail.com" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("removes a user", (done) => {
    User.findOneAndDelete({ email: "dummyUser@mail.com" })
      .then(() => User.findOne({ email: "dummyUser@mail.com" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("removes a user using id", (done) => {
    User.findByIdAndDelete(dummyUser._id)
      .then(() => User.findOne({ email: "dummyUser@mail.com" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(done);
    });
  });
});
