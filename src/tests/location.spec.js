import chai from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";
import server from "../index";
import db from "../models";

const LocationModel = db.Location;

const request = supertest.agent(server);

chai.use(chaiHttp);
const { expect } = chai;

describe("Locations Controller test", () => {
  before(async () => {
    db.sequelize.sync();
    await LocationModel.destroy({ where: {} });

    LocationModel.create({
      name: "Lagos",
      malePopulation: 5,
      femalePopulation: 5
    });
  });

  it("should display welcome message", done => {
    request.get("/").end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).be.equal(
        "Welcome to Population Management API!"
      );
      done();
    });
  });

  it("should fetch all locations", done => {
    request.get("/api/locations").end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).be.equal("Successfully fetched all locations");
      expect(res.body).to.be.a("object");
      expect(res.body.locations).to.be.a("array");
      done();
    });
  });
});
