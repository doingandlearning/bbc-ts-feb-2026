let obj1: { name?: string } = {};
obj1.name = "Anthony";

type NewType = {
  name?: string;
};
interface NewInterface {}

{
  type BirdType = {
    wings: 2;
  };

  interface BirdInterface {
    wings: 2;
  }

  const bird1: BirdType = { wings: 2 };
  const bird2: BirdInterface = { wings: 2 };
  const bird3: BirdType = bird2;

  type Owl = BirdType & { nocturnal: true };
  type Robin = BirdInterface & { noctural: false };

  interface Chicken extends BirdInterface {
    colourful: false;
    flies: false;
  }

  interface Peacock extends BirdType {
    colourful: true;
    flies: false;
  }

  interface Chicken {
    laysEggs: true;
  }

  let plucky: Chicken = {};
  let rob: Robin = { wings: 2 };

  type VALID_HTTP_VALUE = string | number | boolean | [];
}
