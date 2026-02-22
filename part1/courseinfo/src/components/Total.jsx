export function Total({parts}) {
  return (
    <p>Number of exercises {
      parts.map(({exercises}) => exercises)
        .reduce((p, c) => p + c, 0)}
    </p>
  );
}