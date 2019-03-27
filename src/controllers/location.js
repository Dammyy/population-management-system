import models from "../models/index";

const LocationModel = models.Location;

class Location {
  static getAllLocations(req, res) {
    return LocationModel.findAll({
      where: {
        parentLocationId: null
      },
      include: [{ model: LocationModel, as: "locations", nested: "true" }]
    })
      .then(locations => {
        return res.status(200).send({
          message: "Successfully fetched all locations",
          locations
        });
      })
      .catch(error => {
        return res.status(500).send({
          message: "An error occurred"
        });
      });
  }

  static createLocation(req, res) {
    const createLocation = (location = null) =>
      LocationModel.create({
        name: req.body.name,
        femalePopulation: Number(req.body.femalePopulation),
        malePopulation: Number(req.body.malePopulation),
        totalPopulation:
          Number(req.body.femalePopulation) + Number(req.body.malePopulation),
        parentLocationId: location ? location.dataValues.id : null
      }).then(newLocation => {
        return res
          .status(201)
          .send({
            message: "Location added successfully",
            locationData: newLocation
          })
          .catch(error => {
            return res.status(500).send({
              message: "Could not add location"
            });
          });
      });

    if (isNaN(req.body.femalePopulation) || isNaN(req.body.malePopulation)) {
      return res.status(400).send({
        message: "only numbers allowed"
      });
    }

    if (req.body.parentLocationId) {
      return LocationModel.findById(Number(req.body.parentLocationId)).then(
        location => {
          if (!location) {
            return res.status(404).send({
              message: "Parent location not found",
              status: "404 Not Found"
            });
          }

          return createLocation(location);
        }
      );
    } else {
      return createLocation();
    }
  }

  static getLocation(req, res) {
    return LocationModel.findById(req.params.id)
      .then(location => {
        if (location) {
          return LocationModel.find({
            where: {
              id: req.params.id
            },
            include: [
              {
                model: LocationModel,
                as: "locations",
                nested: "true"
              }
            ]
          }).then(locationDetails => {
            return res.status(200).send({
              message: "Success",
              locationData: locationDetails
            });
          });
        }
        if (!location) {
          return res.status(404).send({
            status: "Location not found"
          });
        }
      })
      .catch(error => {
        return res.status(500).send({
          message: "An error occurred"
        });
      });
  }

  static deleteLocation(req, res) {
    return LocationModel.findById(req.params.id).then(location => {
      if (location) {
        return LocationModel.find({
          where: {
            id: req.params.id
          }
        }).then(locationDetails => {
          return locationDetails.destroy().then(() => {
            return res.status(200).send({
              status: "Success",
              message: "Location deleted successfully"
            });
          });
        });
      } else {
        return res.status(404).send({
          message: "Location not found"
        });
      }
    });
  }

  static updateLocation(req, res) {
    LocationModel.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(location => {
        console.log("here one");
        if (!location) {
          return res.status(404).send({
            message: "Location Not Found"
          });
        }
        if (
          isNaN(req.body.femalePopulation) ||
          isNaN(req.body.malePopulation)
        ) {
          return res.status(400).send({
            message: "only numbers allowed"
          });
        }

        location
          .updateAttributes({
            name: req.body.name || location.name,
            femalePopulation:
              Number(req.body.femalePopulation) || location.femalePopulation,
            malePopulation:
              Number(req.body.malePopulation) || location.malePopulation,
            totalPopulation:
              (Number(req.body.femalePopulation) || location.femalePopulation) +
              (Number(req.body.malePopulation) || location.malePopulation),
            parentLocationId:
              Number(req.body.parentLocationId) || location.parentLocationId
          })
          .then(() => {
            console.log("here two");
            return res.status(200).send({
              message: "Location updated successfully"
            });
          });
      })
      .catch(error => {
        console.log("Error", error);
        return res.status(500).send(error);
      });
  }
}

export default Location;
