export = (_req: any, res: any, _next: any) => {
  res
    .status(404)
    .send('404 Not Found')
    .end()
}
