const railLocationModel = require("./../model/rail_unit_location_model");

function addRailLocation(req, res) {
  const railLocation = {
    Division: req.body.division,
    SubDivision: req.body.subDivision,
    MilePost: req.body.milePost,
    RailRoad: req.body.railRoad,
    StateCode: req.body.stateCode,
    State: req.body.state,
    Country: req.body.country,
    UnitTypeCode: req.body.unitTypeCode,
    UnitTypeName: req.body.unitTypeName,
    Manufacturer: req.body.manufacturer,
    SingleDual: req.body.singleDual,
    Priority: req.body.priority,
    Latitude: req.body.latitude,
    Longitude: req.body.longitude,
    Notes: req.body.notes,
    Hyrail: req.body.hyrail,
    SightDistance: req.body.sightDistance,
    RMU: req.body.rmu,
    SerialNumber: req.body.serialNumber,
    PossibleStairsGateAccess: req.body.possibleStairsGateAccess,
    IsActive: true,
  };
  railLocationModel
    .create(railLocation)
    .then((result) => {
      res.status(201).json({
        [process.env.PROJECT_NAME]: {
          status: 201,
          timestamp: Date.now(),
          message: "Rail Location Unit Created",
          data: result,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something Went Wrong!",
          data: error,
        },
      });
    });
}

function updateRailLocation(req, res) {
  const railLocation = {
    Division: req.body.division,
    SubDivision: req.body.subDivision,
    MilePost: req.body.milePost,
    RailRoad: req.body.railRoad,
    StateCode: req.body.stateCode,
    State: req.body.state,
    Country: req.body.country,
    UnitTypeCode: req.body.unitTypeCode,
    UnitTypeName: req.body.unitTypeName,
    Manufacturer: req.body.manufacturer,
    SingleDual: req.body.singleDual,
    Priority: req.body.priority,
    Latitude: req.body.latitude,
    Longitude: req.body.longitude,
    Notes: req.body.notes,
    Hyrail: req.body.hyrail,
    SightDistance: req.body.sightDistance,
    RMU: req.body.rmu,
    SerialNumber: req.body.serialNumber,
    PossibleStairsGateAccess: req.body.possibleStairsGateAccess,
    IsActive: true,
  };
  railLocationModel
    .findOne({ where: { RailLocationId: req.body.railLocationId } })
    .then((railLocationResult) => {
      if (railLocationResult === null) {
        res.status(404).json({
          [process.env.PROJECT_NAME]: {
            status: 404,
            timestamp: Date.now(),
            message: `RailUnit Location with ${req.body.railLocationId} not found!`,
          },
        });
      } else {
        railLocationModel
          .update(railLocation, {
            where: { RailLocationId: req.body.railLocationId },
          })
          .then((result) => {
            res.status(200).json({
              [process.env.PROJECT_NAME]: {
                status: 200,
                timestamp: Date.now(),
                message: "RailUnitLocation Updated",
                data: railLocation,
              },
            });
          })
          .catch(
            res.status(500).json({
              [process.env.PROJECT_NAME]: {
                status: 500,
                timestamp: Date.now(),
                message: "Something Went Wrong!",
                data: error,
              },
            }),
          );
      }
    })
    .catch((error) => {
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something Went Wrong!",
          data: error,
        },
      });
    });
}

function getAllRailLocationUnits(req, res) {
  railLocationModel
    .findAll({
      where: { IsActive: true },
      attributes: { exclude: ["CreatedAt", "UpdatedAt", "IsActive"] },
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Something Went Wrong!",
          data: result,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something Went Wrong!",
          data: error,
        },
      });
    });
}

function getFilteredRailUnitLocation(req, res) {
  railLocationModel
    .findAll({
      where: {
        IsActive: true,
        Division: req.body.division,
        SubDivision: req.body.subDivision,
        MilePost: req.body.milePost,
      },
    })
    .then((result) => {
      res.status(200).json({
        [process.env.PROJECT_NAME]: {
          status: 200,
          timestamp: Date.now(),
          message: "Fetched Division",
          data: result,
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        [process.env.PROJECT_NAME]: {
          status: 500,
          timestamp: Date.now(),
          message: "Something Went Wrong!",
          data: error,
        },
      });
    });
}

module.exports = {
  addRailLocation: addRailLocation,
  updateRailLocation: updateRailLocation,
  getAllLocationUnits: getAllRailLocationUnits,
  getFilteredRailUnitLocation: getFilteredRailUnitLocation,
};
