import {
  MachineConfig,
  assign,
  ActorRef,
  spawn,
  createMachine,
  interpret,
} from 'xstate';

// The events that the machine handles
type FishEvent =
  | { type: 'SET_INITIAL_ROOT'; fish: number[] }
  | { type: 'SET_INITIAL_FISH'; fish: number }
  | { type: 'DAY_INCREASE' };

// The context (extended state) of the machine
interface FishContext {
  daysUntilSpawn: number;
  children: ActorRef<FishEvent>[];
}

interface RootContext {
  fish: ActorRef<FishEvent>[];
}

const fishMachine = createMachine<FishContext, FishEvent>({
  id: 'fish',
  initial: 'spawning',
  context: {
    daysUntilSpawn: 8,
    children: [],
  },
  states: {
    spawning: {},
  },
  on: {
    DAY_INCREASE: {
      actions: assign((ctx) => {
        if (ctx.daysUntilSpawn === 0) {
          //   console.log('Spawning new fish!');
          return {
            daysUntilSpawn: 6,
            children: [
              ...ctx.children,
              spawn(fishMachine, { autoForward: true }),
            ],
          };
        } else {
          return {
            ...ctx,
            daysUntilSpawn: ctx.daysUntilSpawn - 1,
          };
        }
      }),
    },
  },
});

const rootMachine = createMachine<RootContext, FishEvent>({
  id: 'root',
  initial: 'spawning',
  context: {
    fish: [],
  },
  states: {
    spawning: {},
  },
  on: {
    SET_INITIAL_ROOT: {
      actions: assign((ctx, event) => {
        const fish = event.fish.map((fish) =>
          spawn(
            fishMachine.withContext({ daysUntilSpawn: fish, children: [] }),
            { autoForward: true }
          )
        );

        return {
          fish,
        };
      }),
    },
  },
});

export function simulateLanternFish(
  initialFish: number[],
  numberOfDays: number
) {
  const rootService = interpret(rootMachine);

  rootService.start();

  rootService.send('SET_INITIAL_ROOT', { fish: initialFish });

  for (let day = 1; day <= numberOfDays; day++) {
    console.log(`On Day ${day}`);
    rootService.send('DAY_INCREASE');
  }

  const snapshot = rootService.getSnapshot();
  console.log('Counting fish...')
  return countFish(snapshot.context.fish);
}

function countFish(fish: ActorRef<FishEvent>[]) {
  let currentCount = fish.length;

  fish.forEach((singleFish) => {
    const snapshot = singleFish.getSnapshot();
    // console.log(snapshot.context);
    if (snapshot.context.children.length > 0) {
      currentCount += countFish(snapshot.context.children);
    }
  });

  return currentCount;
}
