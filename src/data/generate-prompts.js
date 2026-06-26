import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target file paths
const DATA_DIR = path.join(__dirname);
const OUTPUT_FILE = path.join(DATA_DIR, 'prompts.json');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Vocabularies for procedural generation
const vocab = {
  subjects: {
    character: [
      'a weary time-traveler', 'a clockwork librarian', 'a neon-decked street hacker',
      'a wizard working at a modern coffee shop', 'a celestial explorer', 'a mysterious plague doctor',
      'a retired space pirate', 'a blind swordmaster', 'a deep-sea diver in retro gear',
      'an elven herbalist', 'a nomadic desert trader', 'a robotic street artist',
      'a Victorian detective', 'a mushroom-folk villager', 'a gothic vampire cellist'
    ],
    fantasy: [
      'an archmage', 'a forest druid', 'a paladin in glowing armor', 'a rogue shadow-dancer',
      'a griffin rider', 'a pixie rogue', 'a dwarven blacksmith', 'a siren singer',
      'a celestial guardian', 'a minotaur warrior', 'a phoenix tamer'
    ],
    animal: [
      'a red panda', 'a majestic snow leopard', 'a barn owl', 'a chameleon', 'a fox with wings',
      'a humpback whale', 'a stag with flowering antlers', 'a sleepy koala', 'a majestic wolf',
      'a curious otter', 'a lion with a mane of stardust', 'a golden eagle', 'a turtle carrying a small garden'
    ],
    monster: [
      'a shadow-beast', 'a rock golem', 'a swamp leviathan', 'a chimera', 'a gargoyle',
      'a frost giant', 'a centaur archer', 'a spectral wraith', 'a werewolf', 'a kraken puppy'
    ],
    robot: [
      'a rusted gardening android', 'a sleek AI companion', 'a colossal iron sentinel',
      'a scrap-metal mechanical dog', 'a tiny micro-bot explorer', 'a drone delivery unit with personality',
      'a vintage steam-powered butler', 'a cybernetic humanoid dancer'
    ],
    vehicle: [
      'a flying steampunk airship', 'a rusty retro camper van', 'a sleek lightcycle',
      'a futuristic submarine', 'a solar-sail spacecraft', 'a magical flying broom-cycle',
      'a monowheel buggy', 'a gothic horse-drawn carriage'
    ],
    object: [
      'an antique brass pocket watch', 'a glowing glass terrarium', 'a leather-bound spellbook',
      'a weathered compass', 'a key that unlocks portals', 'a floating glowing orb',
      'a crystal vial with a swirling galaxy inside', 'an ornate mechanical music box'
    ],
    food: [
      'a slice of starry-sky cake', 'a bowl of steaming magical ramen', 'a floating teapot pouring light',
      'a fantasy picnic basket', 'an elaborate candy castle', 'a glowing elixir of life',
      'a plate of futuristic cyberpunk street food'
    ],
    weapons: [
      'a sword forged from a falling star', 'a runic recurve bow', 'a steampunk sniper rifle',
      'a crystal-tipped wizard staff', 'a shield depicting a sleeping dragon', 'a pair of glowing energy daggers'
    ]
  },
  actions: [
    'examining', 'holding', 'discovering', 'repairing', 'guarding', 'meditating near',
    'chasing', 'admiring', 'casting a spell on', 'painting', 'reading', 'navigating',
    'looking out at', 'sleeping on', 'interacting with', 'floating above'
  ],
  locations: [
    'in a misty redwood forest', 'inside a cozy subterranean library', 'on the rings of Saturn',
    'in a neon-drenched cyberpunk alley', 'at the edge of a crumbling floating island',
    'inside a forgotten cathedral overgrown with ivy', 'on a sun-drenched Mediterranean balcony',
    'in a bustling magical night market', 'at the bottom of a bioluminescent ocean trench',
    'in an ancient desert oasis under three moons', 'in a cozy attic during a thunderstorm',
    'inside a colossal clock tower', 'on a snowy mountaintop overlooking a sea of clouds',
    'in a futuristic botanical garden dome', 'in a medieval castle ruins'
  ],
  details: [
    'with glowing embers floating around', 'bathed in dramatic golden hour sunlight',
    'with intricate runic engravings', 'surrounded by floating paper cranes',
    'showing signs of heavy wear and tear', 'with soft light reflecting off wet pavement',
    'surrounded by glowing butterflies', 'with dust motes dancing in sunbeams',
    'featuring vibrant neon reflections', 'with roots and vines wrapped around them',
    'under a starry sky with a nebula visible', 'shrouded in dark mysterious shadows',
    'with a soft pastel color scheme', 'detailed with metallic gold filigree'
  ],
  styles: ['Realistic', 'Cartoon', 'Anime', 'Fantasy', 'Dark', 'Cute'],
  moods: ['Happy', 'Dark', 'Mystery', 'Adventure', 'Epic', 'Calm'],
  difficulties: ['Beginner', 'Intermediate', 'Advanced'],
  lengths: ['Short', 'Medium', 'Detailed']
};

// Hand-designed prompts library to cover all 41 categories
const categoryTemplates = {
  "Characters": [
    { text: "A weary time-traveler sitting in a modern coffee shop, holding an ancient bronze pocket watch.", diff: "Intermediate", len: "Medium", style: "Realistic", mood: "Calm" },
    { text: "A clockwork librarian dusting ancient books, with gears visible in their wooden joints.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Calm" },
    { text: "A young street artist painting glowing graffiti with a spray can that emits starlight.", diff: "Beginner", len: "Medium", style: "Anime", mood: "Happy" }
  ],
  "Fantasy": [
    { text: "An elven herbalist mixing glowing potions in a hollowed-out ancient oak tree.", diff: "Intermediate", len: "Detailed", style: "Fantasy", mood: "Mystery" },
    { text: "A noble knight sitting by a campfire with a small, friendly baby dragon roasted marshmallows.", diff: "Beginner", len: "Medium", style: "Cute", mood: "Happy" },
    { text: "A dark sorcerer summoning a spectral stag under the light of a blood moon.", diff: "Advanced", len: "Detailed", style: "Dark", mood: "Epic" }
  ],
  "Animals": [
    { text: "A fluffy red panda wearing a tiny aviator hat, sitting on a bamboo branch.", diff: "Beginner", len: "Short", style: "Cute", mood: "Happy" },
    { text: "A majestic stag with antlers made of blooming cherry blossoms standing in a sunlit clearing.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Calm" },
    { text: "A pack of wolves run through a forest, their coats glowing with celestial constellations.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Epic" }
  ],
  "Nature": [
    { text: "A detailed study of bioluminescent mushrooms growing on a damp, mossy log.", diff: "Beginner", len: "Medium", style: "Realistic", mood: "Mystery" },
    { text: "A hidden waterfall cascading into a crystal clear pool surrounded by glowing blue flowers.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Calm" },
    { text: "A wind-swept tree clinging to a rocky cliffside, its roots weaving through stone.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Epic" }
  ],
  "Landscape": [
    { text: "A wide vista of floating islands with waterfalls pouring water into the endless sky below.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Adventure" },
    { text: "A quiet, snowy village tucked inside a valley under a vibrant green aurora borealis.", diff: "Beginner", len: "Medium", style: "Realistic", mood: "Calm" },
    { text: "A vast desert with crimson sand dunes and two massive suns setting on the horizon.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Epic" }
  ],
  "Sci-Fi": [
    { text: "A colossal space station orbiting a ringed gas giant, reflecting the planet's blue light.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Epic" },
    { text: "An astronaut exploring an alien greenhouse filled with glowing, floating flora.", diff: "Intermediate", len: "Medium", style: "Anime", mood: "Adventure" },
    { text: "A sleek hover-car parked at a futuristic highway diner at night.", diff: "Beginner", len: "Short", style: "Cartoon", mood: "Calm" }
  ],
  "Horror": [
    { text: "A shadow creature with glowing white eyes peering from a half-open closet door.", diff: "Beginner", len: "Short", style: "Dark", mood: "Dark" },
    { text: "An abandoned, overgrown Victorian asylum under a pale, cracked full moon.", diff: "Intermediate", len: "Medium", style: "Dark", mood: "Mystery" },
    { text: "A detailed portrait of a gothic vampire count, with roses that wither at his touch.", diff: "Advanced", len: "Detailed", style: "Dark", mood: "Dark" }
  ],
  "Cute": [
    { text: "A tiny frog sitting under a mushroom umbrella while it rains glowing raindrops.", diff: "Beginner", len: "Short", style: "Cute", mood: "Happy" },
    { text: "A round teacup containing a sleeping baby sea turtle floating in chamomile tea.", diff: "Beginner", len: "Medium", style: "Cute", mood: "Calm" },
    { text: "A chubby kitten wearing a wizard robe, trying to catch a floating magic bubble.", diff: "Intermediate", len: "Medium", style: "Cute", mood: "Happy" }
  ],
  "Objects": [
    { text: "An ornate antique key with a handle shaped like a sleeping owl.", diff: "Beginner", len: "Short", style: "Realistic", mood: "Mystery" },
    { text: "A glass terrarium holding a miniature storm cloud that rains and shoots tiny lightning bolts.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Mystery" },
    { text: "A detailed study of a vintage typewriter, with magical letters floating off the page.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Calm" }
  ],
  "Architecture": [
    { text: "A towering gothic cathedral built entirely out of dark obsidian rock and blue crystal.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Epic" },
    { text: "A cozy treehouse built in the branches of a giant redwood, glowing with warm lanterns.", diff: "Intermediate", len: "Medium", style: "Cartoon", mood: "Calm" },
    { text: "A minimalist white concrete villa perched precariously on a cliff overlooking the ocean.", diff: "Beginner", len: "Medium", style: "Realistic", mood: "Calm" }
  ],
  "Food": [
    { text: "A stack of pancakes topped with glowing star-syrup and a pat of golden light butter.", diff: "Beginner", len: "Medium", style: "Cute", mood: "Happy" },
    { text: "A steaming bowl of fantasy ramen with dragon-egg soft boils and swirling blue broth.", diff: "Intermediate", len: "Medium", style: "Anime", mood: "Adventure" },
    { text: "An elegant gothic high tea setup with black teacups, dark roses, and skull-shaped macarons.", diff: "Advanced", len: "Detailed", style: "Dark", mood: "Mystery" }
  ],
  "Vehicles": [
    { text: "A retro camper van modified with jet engines, parked on a grassy hill looking at a launchpad.", diff: "Intermediate", len: "Medium", style: "Cartoon", mood: "Adventure" },
    { text: "A massive steampunk train traveling across a stone arch bridge over a deep mountain canyon.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Epic" },
    { text: "A simple wooden sailboat floating in a sea of clouds under a golden sunset.", diff: "Beginner", len: "Short", style: "Anime", mood: "Calm" }
  ],
  "Daily Challenge": [
    { text: "Draw something you can see from your desk, but add a fantasy twist (e.g. glowing vines, floating parts).", diff: "Beginner", len: "Medium", style: "Realistic", mood: "Calm" },
    { text: "Incorporate three random elements: an hourglass, a feather, and a key, into a single cohesive scene.", diff: "Intermediate", len: "Detailed", style: "Fantasy", mood: "Mystery" },
    { text: "Create a character design using only three colors: Navy Blue, Gold, and Crimson Red.", diff: "Advanced", len: "Medium", style: "Anime", mood: "Epic" }
  ],
  "Anime": [
    { text: "A magical schoolgirl standing on a rooftop at twilight, her wand glowing with stellar energy.", diff: "Beginner", len: "Medium", style: "Anime", mood: "Happy" },
    { text: "A quiet scene of two high school students walking under cherry blossom trees in full bloom.", diff: "Intermediate", len: "Medium", style: "Anime", mood: "Calm" },
    { text: "An epic battle pose of an anime warrior charging a massive energy blast in their hands.", diff: "Advanced", len: "Detailed", style: "Anime", mood: "Epic" }
  ],
  "Manga": [
    { text: "A dramatic black-and-white manga page showing a character discovering a hidden doorway.", diff: "Intermediate", len: "Detailed", style: "Anime", mood: "Mystery" },
    { text: "A close-up manga-style eye expressing deep sadness, with tears reflecting light.", diff: "Beginner", len: "Short", style: "Anime", mood: "Dark" },
    { text: "A dynamic manga action panel showing a sword strike with speed lines and debris.", diff: "Advanced", len: "Detailed", style: "Anime", mood: "Epic" }
  ],
  "Comics": [
    { text: "A retro superhero standing heroically on a skyscraper ledge, cape blowing in the wind.", diff: "Beginner", len: "Medium", style: "Cartoon", mood: "Adventure" },
    { text: "A classic noir detective lighting a cigarette under a streetlamp, shadows casting long lines.", diff: "Intermediate", len: "Medium", style: "Dark", mood: "Mystery" },
    { text: "An expressive comic panel showing a funny argument between a mad scientist and their robot assistant.", diff: "Advanced", len: "Detailed", style: "Cartoon", mood: "Happy" }
  ],
  "Pixel Art": [
    { text: "A cozy fireplace scene in 16-bit style, with embers gently rising up the chimney.", diff: "Beginner", len: "Short", style: "Cartoon", mood: "Calm" },
    { text: "A side-scrolling mockup of a cyberpunk street scene with glowing neon shops and rain puddles.", diff: "Intermediate", len: "Detailed", style: "Cartoon", mood: "Mystery" },
    { text: "A detailed pixel art boss monster: a giant crystal spider inside a cavern.", diff: "Advanced", len: "Detailed", style: "Dark", mood: "Epic" }
  ],
  "Steampunk": [
    { text: "A pocket watch with mechanical gears, pipes, and a small pressure gauge leaking steam.", diff: "Beginner", len: "Short", style: "Realistic", mood: "Calm" },
    { text: "A steampunk aviator with brass goggles and a leather coat, posing in front of a giant airship.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Adventure" },
    { text: "A grand Victorian city street filled with steam-powered carriages and clockwork streetlights.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Epic" }
  ],
  "Cyberpunk": [
    { text: "A neon sign in a dark rainy alley reading 'REPLICANT' with reflections in water.", diff: "Beginner", len: "Short", style: "Dark", mood: "Mystery" },
    { text: "A street hacker sitting cross-legged on a rooftop, surrounded by floating holographic screens.", diff: "Intermediate", len: "Medium", style: "Anime", mood: "Adventure" },
    { text: "A cybernetically enhanced bodyguard standing under neon billboards, with glowing mechanical arms.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Dark" }
  ],
  "Mythology": [
    { text: "Anubis, the Egyptian god, holding a glowing scale weighing a heart against a golden feather.", diff: "Intermediate", len: "Detailed", style: "Fantasy", mood: "Mystery" },
    { text: "Zeus holding a crackling bolt of lightning on a cloud-covered Mount Olympus.", diff: "Beginner", len: "Medium", style: "Fantasy", mood: "Epic" },
    { text: "A beautiful Valkyrie descending from the heavens on a white winged horse.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Epic" }
  ],
  "Monsters": [
    { text: "A swamp monster made of mud, moss, and tree branches, with glowing green eyes.", diff: "Beginner", len: "Short", style: "Dark", mood: "Mystery" },
    { text: "A majestic griffin with the body of a lion and head of a golden eagle, nesting on a cliff.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Calm" },
    { text: "A terrifying shadow leviathan rising from a black void, surrounded by tiny glowing souls.", diff: "Advanced", len: "Detailed", style: "Dark", mood: "Dark" }
  ],
  "Dragons": [
    { text: "A sleeping dragon coiled around a massive pile of gold coins and sparkling gems.", diff: "Beginner", len: "Medium", style: "Fantasy", mood: "Calm" },
    { text: "An epic battle between a fire dragon and an ice dragon over a smoking volcano.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Epic" },
    { text: "A Chinese dragon wrapping around a red pagoda temple under a full moon.", diff: "Intermediate", len: "Detailed", style: "Realistic", mood: "Calm" }
  ],
  "Magic": [
    { text: "A magician's hat with glowing magical particles, cards, and a rabbit's ears popping out.", diff: "Beginner", len: "Short", style: "Cute", mood: "Happy" },
    { text: "An ancient stone altar in a forest, with floating magical runes circling a glowing relic.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Mystery" },
    { text: "A wizard casting a spell that turns a swarm of dark bats into glowing blue butterflies.", diff: "Advanced", len: "Detailed", style: "Anime", mood: "Epic" }
  ],
  "Medieval": [
    { text: "A bustling medieval marketplace with wooden stalls, colorful banners, and townspeople.", diff: "Intermediate", len: "Detailed", style: "Fantasy", mood: "Happy" },
    { text: "A lonely sentry standing guard on a castle wall under a starry night sky.", diff: "Beginner", len: "Short", style: "Realistic", mood: "Calm" },
    { text: "A grand banquet hall with long tables filled with food, lit by massive iron chandeliers.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Epic" }
  ],
  "Space": [
    { text: "A lonely space explorer sitting on a dusty asteroid, looking at a distant spiral galaxy.", diff: "Beginner", len: "Medium", style: "Realistic", mood: "Calm" },
    { text: "An alien city built inside a crater on a moon, with dome structures and flying shuttles.", diff: "Intermediate", len: "Detailed", style: "Sci-Fi", mood: "Adventure" },
    { text: "A massive stellar nebula shaped like an eye, birth-giving to a new star.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Epic" }
  ],
  "Underwater": [
    { text: "A scuba diver swimming alongside a giant, gentle bioluminescent jellyfish.", diff: "Beginner", len: "Medium", style: "Realistic", mood: "Calm" },
    { text: "The ruins of Atlantis, with Greek columns overgrown with coral and colorful fish swimming by.", diff: "Intermediate", len: "Detailed", style: "Fantasy", mood: "Mystery" },
    { text: "A deep-sea mermaid sitting on a throne of black pearl, holding a glowing anglerfish lantern.", diff: "Advanced", len: "Detailed", style: "Dark", mood: "Mystery" }
  ],
  "Dinosaurs": [
    { text: "A Tyrannosaurus Rex roaring in a prehistoric jungle under a sky filled with pterodactyls.", diff: "Intermediate", len: "Medium", style: "Realistic", mood: "Epic" },
    { text: "A friendly long-necked Brachiosaurus eating leaves from the top of a prehistoric tree.", diff: "Beginner", len: "Short", style: "Cute", mood: "Happy" },
    { text: "A pack of feathered velociraptors stalking prey through a dense prehistoric fern forest.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Adventure" }
  ],
  "Fashion": [
    { text: "A high-fashion model wearing a dress made entirely of woven peacock feathers.", diff: "Intermediate", len: "Medium", style: "Realistic", mood: "Calm" },
    { text: "A cyberpunk streetwear outfit featuring a glowing LED jacket, baggy cargo pants, and high-tops.", diff: "Beginner", len: "Medium", style: "Anime", mood: "Adventure" },
    { text: "An elegant Victorian ballgown adorned with intricate silver clockwork patterns and lace.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Mystery" }
  ],
  "Portraits": [
    { text: "A close-up portrait of a woman with freckles that look like gold leaf under warm sunlight.", diff: "Beginner", len: "Short", style: "Realistic", mood: "Calm" },
    { text: "A portrait of an old sailor, with deep wrinkles, a grey beard, and stories in his eyes.", diff: "Intermediate", len: "Medium", style: "Realistic", mood: "Calm" },
    { text: "A fantasy portrait of a moon elf princess, with silver hair and glowing white patterns on her skin.", diff: "Advanced", len: "Detailed", style: "Anime", mood: "Mystery" }
  ],
  "Abstract": [
    { text: "A composition of swirling geometric shapes, sharp lines, and splatters of gold and ink.", diff: "Beginner", len: "Short", style: "Realistic", mood: "Calm" },
    { text: "An artistic representation of the feeling of listening to jazz music using shapes and colors.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Happy" },
    { text: "A surreal landscape where gravity is distorted, with floating liquid metal spheres and stairs to nowhere.", diff: "Advanced", len: "Detailed", style: "Dark", mood: "Mystery" }
  ],
  "Robots": [
    { text: "A small, rusty robot trying to water a single yellow flower in a post-apocalyptic wasteland.", diff: "Beginner", len: "Medium", style: "Cute", mood: "Calm" },
    { text: "A giant robot sentinel standing guard in a futuristic city, covered in climbing ivy.", diff: "Intermediate", len: "Medium", style: "Sci-Fi", mood: "Mystery" },
    { text: "A sleek, multi-limbed assembly robot constructing a mechanical bird in a clean white lab.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Calm" }
  ],
  "Weapons": [
    { text: "A simple wooden staff with a glowing green crystal bound to the top with leather straps.", diff: "Beginner", len: "Short", style: "Fantasy", mood: "Calm" },
    { text: "An ornate scimitar with a blade forged from dark damascus steel and a ruby-encrusted hilt.", diff: "Intermediate", len: "Medium", style: "Realistic", mood: "Mystery" },
    { text: "A futuristic railgun powered by glowing plasma tubes, showing mechanical details.", diff: "Advanced", len: "Detailed", style: "Sci-Fi", mood: "Epic" }
  ],
  "Environment": [
    { text: "A quiet pathway through a bamboo forest, with sunlight filtering through the leaves.", diff: "Beginner", len: "Short", style: "Realistic", mood: "Calm" },
    { text: "A cozy room inside a lighthouse during a stormy night, with warm light reflecting on wooden floors.", diff: "Intermediate", len: "Medium", style: "Anime", mood: "Calm" },
    { text: "A colossal cavern filled with towering crystals that glow in shades of violet and cyan.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Mystery" }
  ],
  "Cities": [
    { text: "A simple sketch of a quiet European canal street with small cafes and flower boxes.", diff: "Beginner", len: "Medium", style: "Realistic", mood: "Calm" },
    { text: "A bustling futuristic metropolis with multiple levels of sky-bridges and flying vehicles.", diff: "Intermediate", len: "Detailed", style: "Sci-Fi", mood: "Adventure" },
    { text: "A ruined, overgrown city reclaiming by nature, with trees growing out of skyscrapers.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Mystery" }
  ],
  "Islands": [
    { text: "A tiny tropical island with a single palm tree and a chest buried in the sand.", diff: "Beginner", len: "Short", style: "Cartoon", mood: "Happy" },
    { text: "A floating island in the shape of a sleeping turtle, carrying a medieval temple on its back.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Adventure" },
    { text: "A dark volcanic island surrounded by boiling seas and jagged black spires, under a red sky.", diff: "Advanced", len: "Detailed", style: "Dark", mood: "Epic" }
  ],
  "Magic Items": [
    { text: "A glowing glass bottle containing a captured shooting star that swirls inside.", diff: "Beginner", len: "Short", style: "Cute", mood: "Happy" },
    { text: "A leather-bound journal with a lock shaped like an eye that blinks when you touch it.", diff: "Intermediate", len: "Medium", style: "Fantasy", mood: "Mystery" },
    { text: "An ancient stone hourglass filled with glowing golden stardust that flows upwards.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Calm" }
  ],
  "Seasonal": [
    { text: "A cozy autumn scene with pumpkin spice lattes, colorful fallen leaves, and a warm scarf.", diff: "Beginner", len: "Short", style: "Cute", mood: "Calm" },
    { text: "A spring meadow filled with blooming wildflowers, butterflies, and a gentle breeze.", diff: "Intermediate", len: "Medium", style: "Realistic", mood: "Happy" },
    { text: "A frozen winter lake surrounded by snow-covered pines, reflecting a crystal-clear starry sky.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Calm" }
  ],
  "Halloween": [
    { text: "A spooky carved pumpkin jack-o'-lantern with purple flames flicking inside.", diff: "Beginner", len: "Short", style: "Cartoon", mood: "Happy" },
    { text: "A cozy cottage decorated with spiderwebs, skulls, and a black cat sitting on the porch.", diff: "Intermediate", len: "Medium", style: "Cute", mood: "Happy" },
    { text: "A gothic graveyard with ancient tombstones, rising spirits, and gnarled leafless trees.", diff: "Advanced", len: "Detailed", style: "Dark", mood: "Dark" }
  ],
  "Christmas": [
    { text: "A simple, decorated Christmas tree glowing with colorful fairy lights and a star on top.", diff: "Beginner", len: "Short", style: "Cartoon", mood: "Happy" },
    { text: "A cozy stone fireplace decorated with stockings, with a sleeping dog nearby and snow falling outside.", diff: "Intermediate", len: "Medium", style: "Realistic", mood: "Calm" },
    { text: "A bustling village square in the snow, with a giant Christmas tree, glowing stalls, and shoppers.", diff: "Advanced", len: "Detailed", style: "Anime", mood: "Happy" }
  ],
  "Simple Sketch": [
    { text: "A quick line-art sketch of a coffee mug with steam rising in delicate swirls.", diff: "Beginner", len: "Short", style: "Realistic", mood: "Calm" },
    { text: "A quick gesture drawing of a flying bird, capturing the motion of its wings.", diff: "Beginner", len: "Short", style: "Cartoon", mood: "Adventure" },
    { text: "A loose ink sketch of a pair of worn-out leather boots sitting on a rug.", diff: "Beginner", len: "Short", style: "Realistic", mood: "Calm" }
  ],
  "Advanced Concept Art": [
    { text: "Concept design sheet for an alien soldier, showing front, side, and detail views of their armor.", diff: "Advanced", len: "Detailed", style: "Sci-Fi", mood: "Adventure" },
    { text: "Environment concept art of a futuristic subterranean quarry where glowing crystals are mined.", diff: "Advanced", len: "Detailed", style: "Realistic", mood: "Mystery" },
    { text: "Keyframe concept art showing an epic standoff between an explorer and a colossal stone guardian.", diff: "Advanced", len: "Detailed", style: "Fantasy", mood: "Epic" }
  ]
};

// Generate prompts procedurally to reach 500+
const generatedPrompts = [];
let idCounter = 1;

// 1. First add all hand-designed ones
for (const [category, list] of Object.entries(categoryTemplates)) {
  list.forEach(p => {
    generatedPrompts.push({
      id: `p-${idCounter++}`,
      text: p.text,
      category: category,
      difficulty: p.diff,
      length: p.len,
      style: p.style,
      mood: p.mood
    });
  });
}

// Helper to choose random item from array
function randChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 2. Generate procedural prompts until we have 520 prompts
const categoriesList = Object.keys(categoryTemplates);

while (generatedPrompts.length < 520) {
  const category = randChoice(categoriesList);
  
  let subject = '';
  let action = randChoice(vocab.actions);
  let location = randChoice(vocab.locations);
  let detail = randChoice(vocab.details);
  let style = randChoice(vocab.styles);
  let mood = randChoice(vocab.moods);
  let difficulty = randChoice(vocab.difficulties);
  
  // Custom subject pool based on category
  if (category === 'Fantasy' || category === 'Mythology' || category === 'Dragons' || category === 'Magic' || category === 'Medieval') {
    subject = randChoice(vocab.subjects.fantasy);
    style = 'Fantasy';
  } else if (category === 'Sci-Fi' || category === 'Robots' || category === 'Space') {
    subject = randChoice(vocab.subjects.robot);
    style = 'Sci-Fi';
  } else if (category === 'Animals' || category === 'Dinosaurs' || category === 'Monsters') {
    subject = randChoice(vocab.subjects.animal);
  } else if (category === 'Cute') {
    subject = randChoice(vocab.subjects.animal);
    style = 'Cute';
    mood = 'Happy';
  } else if (category === 'Horror' || category === 'Halloween') {
    subject = randChoice(vocab.subjects.monster);
    style = 'Dark';
    mood = 'Dark';
  } else if (category === 'Objects' || category === 'Weapons' || category === 'Magic Items') {
    subject = randChoice(vocab.subjects.object);
  } else if (category === 'Vehicles') {
    subject = randChoice(vocab.subjects.vehicle);
  } else {
    subject = randChoice(vocab.subjects.character);
  }

  // Make the sentence
  let text = `Draw ${subject} ${action} ${location}, ${detail}.`;
  
  // Format sentence case
  text = text.charAt(0).toUpperCase() + text.slice(1);
  // Remove double spaces
  text = text.replace(/\s+/g, ' ');

  // Avoid duplicates
  if (!generatedPrompts.some(p => p.text.toLowerCase() === text.toLowerCase())) {
    // Determine length based on description length
    let length = 'Medium';
    if (text.length < 60) length = 'Short';
    else if (text.length > 120) length = 'Detailed';

    generatedPrompts.push({
      id: `p-${idCounter++}`,
      text: text,
      category: category,
      difficulty: difficulty,
      length: length,
      style: style,
      mood: mood
    });
  }
}

// Shuffle slightly
const shuffledPrompts = generatedPrompts.sort(() => Math.random() - 0.5);

// Write to prompts.json
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(shuffledPrompts, null, 2), 'utf-8');
console.log(`Successfully generated ${shuffledPrompts.length} high-quality drawing prompts!`);
