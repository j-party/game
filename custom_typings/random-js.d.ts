// Make the Random class inside the "random" namespace (from DT)
//   available in a "random-js" module.
declare module 'random-js' {
  export = random.Random;
}
