export const asyncMiddleware = (fn: any) => {
  const wrappedMiddleware = async (req: any, res: any, next: any) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

  // Custom name for better debuggability
  Object.defineProperty(wrappedMiddleware, 'name', {
    value: `asyncMiddleware(${fn.name || 'anonymous'})`,
    enumerable: false,
  });

  return wrappedMiddleware;
};
