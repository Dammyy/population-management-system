import Location from '../controllers/location'

export default (app) => {
  app.post('/api/locations', Location.createLocation);
  app.get('/api/locations', Location.getAllLocations);
  app.get('/api/locations/:id', Location.getLocation);
  app.put('/api/locations/:id', Location.updateLocation);
  app.delete('/api/locations/:id', Location.deleteLocation)
};
