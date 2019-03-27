import chai from "chai";
import chaiHttp from "chai-http";
import supertest from "supertest";
import server from "../index";
import db from "../models";

const LocationModel = db.Location;

const request = supertest.agent(server);

chai.use(chaiHttp);
const { expect } = chai;
let testLocation = {}

describe("Locations Controller test", () => {
  before(async () => {
    db.sequelize.sync();
    await LocationModel.destroy({ where: {} });

    testLocation = await LocationModel.create({
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

  it("should fetch a location", done => {
    request.get(`/api/locations/${testLocation.id}`).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body.message).be.equal("Success");
      expect(res.body).to.be.a("object");
      expect(res.body.locationData).to.be.a("object");
      done();
    });
  });

  it("should update a location", done => {
    request.put(`/api/locations/${testLocation.id}`).send({
      name: 'Lagos',
      malePopulation: 20,
      femalePopulation: 30
    }).end((err, res) => {
      console.log("RESPONSE", res.body)
      expect(res).to.have.status(200);
      expect(res.body.message).be.equal("Location updated successfully");
      done();
    });
  });
});
