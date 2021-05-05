import { JsonDecoder, Ok, Err } from "ts.data.json";
import { values } from "faunadb";

const refDecoder = new JsonDecoder.Decoder<values.Ref>((ref) => {
  if (ref instanceof values.Ref) {
    return new Ok(ref);
  } else {
    return new Err("Not a ref");
  }
});

export default refDecoder;
