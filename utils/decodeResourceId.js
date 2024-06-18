const decodeResourceId = (req, res, next) => {
  const resourceId = decodeURIComponent(req.params.id);
  req.resourceId = resourceId;
  next();
};

export default decodeResourceId;
