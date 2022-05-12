export = (err: any, _req: any, res: any, _next: any) => {
  res
    .status(err.status)
    .send(err.message)
    .end()
}
