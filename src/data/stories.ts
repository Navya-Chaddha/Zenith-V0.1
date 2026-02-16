import storyAstronaut from "@/assets/story-astronaut.jpg";
import storyMars from "@/assets/story-mars.jpg";
import storyBlackhole from "@/assets/story-blackhole.jpg";
import storyTelescope from "@/assets/story-telescope.jpg";

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  likes: number;
  featured: boolean;
}

export const stories: Story[] = [
  {
    id: "1",
    title: "The Silent Drift: Life Aboard the ISS in 2026",
    excerpt: "What it truly feels like to float 400km above the world — where sunrise comes every 90 minutes and silence is your loudest companion.",
    content: `The International Space Station orbits Earth at 28,000 km/h, completing a full revolution every 90 minutes. For the astronauts aboard, this means witnessing 16 sunrises and 16 sunsets every single day. But it's the silence between those moments that defines life in orbit.

Commander Elena Vasquez describes her morning routine — if you can call it morning when the concept barely exists. "You wake up velcroed to a wall. Your arms float in front of you like a ghost's. The first thing you see is Earth through a tiny window, and every single time, it takes your breath away."

The ISS is humanity's most ambitious collaborative project. Built piece by piece over decades, it represents the combined efforts of 15 nations. Inside, astronauts conduct experiments that could shape the future of medicine, materials science, and our understanding of the human body.

Water behaves differently here. Fire burns in perfect spheres. Muscles atrophy without gravity's constant pull. Every day is an experiment in what it means to be human when you remove the one constant we've known for millions of years.

The food has improved dramatically since the early days. Today's space menu includes thermostabilized pouches of shrimp cocktail, tortillas instead of bread (crumbs are dangerous in zero-g), and even fresh lettuce grown in the station's Veggie experiment module.

But perhaps the most profound change is psychological. Astronauts report a cognitive shift known as the "Overview Effect" — seeing Earth from space fundamentally changes how you think about borders, conflicts, and our shared fragility. "You can't see countries from up here," Vasquez says. "Just continents, oceans, and clouds. It makes everything else feel small."

The station is aging now, with discussions about its eventual deorbiting in the 2030s. Commercial stations are being developed to replace it. But for those who have called it home, the ISS will always represent something extraordinary: proof that humans can build a home among the stars.`,
    image: storyAstronaut,
    category: "Life in Space",
    date: "2026-02-15",
    readTime: "8 min",
    likes: 342,
    featured: true,
  },
  {
    id: "2",
    title: "Mars Colony Alpha: The First 100 Days",
    excerpt: "The dust storms came on day 47. No simulation could have prepared the crew for what happened next.",
    content: `The first human footprint on Mars was made at 14:23 UTC on September 12, 2025. It belonged to Dr. Raj Patel, mission geologist, who later said his only thought was: "The soil is softer than I expected."

Colony Alpha consists of four interconnected habitat modules, each roughly the size of a school bus. The crew of six has been tasked with establishing a self-sustaining base that could support future missions. Their challenges read like a survival manual for an alien world.

The atmosphere is 95% carbon dioxide. Surface temperatures swing from -20°C during the day to -80°C at night. Radiation levels are roughly 40 times higher than on Earth. And help, if needed, is a minimum of 7 months away.

The first 30 days were consumed by setup: deploying solar arrays, initializing the water extraction unit (which pulls moisture from the Martian regolith), and pressurizing the habitats. Everything worked — mostly.

Then came the dust storm on day 47. Mars is infamous for its global dust events, and while the crew had trained for them, simulations can't replicate the psychological weight of watching your world turn into a howling orange void for 12 days straight. Solar power dropped to 15% of capacity. The backup nuclear generator kept life support running.

"You can plan for every technical failure," wrote mission commander Chen Wei in the daily log. "You can't plan for the feeling of being truly, completely alone."

By day 100, the colony had achieved several firsts: the first plant grown in Martian soil (a modified strain of spinach), the first 3D-printed structure using local materials, and the first confirmed discovery of subsurface ice within walking distance of the base.

The mission continues. The next crew rotation is scheduled for 2027. Until then, six humans carry the weight of our species' future on a cold, red world.`,
    image: storyMars,
    category: "Mars Missions",
    date: "2026-02-12",
    readTime: "10 min",
    likes: 528,
    featured: true,
  },
  {
    id: "3",
    title: "The Sound of Silence: What Black Holes Teach Us About Time",
    excerpt: "At the edge of a black hole, time doesn't just slow down — it becomes something entirely different.",
    content: `If you could stand at the event horizon of a black hole — the point beyond which nothing, not even light, can escape — you would experience time in a way that defies every intuition you've ever had.

From your perspective, nothing unusual would happen. Your watch would tick normally. Your thoughts would flow at their usual pace. But to an observer watching from a safe distance, you would appear to slow down, stretch, and eventually freeze in place, your image redshifting into invisibility over millions of years.

This is the paradox of black holes: they are simultaneously the most violent and the most patient objects in the universe.

Recent observations from the Event Horizon Telescope collaboration have given us unprecedented detail about the black hole at the center of our galaxy, Sagittarius A*. With a mass of approximately 4 million suns compressed into a region smaller than Mercury's orbit, it warps space-time so severely that the very concept of "direction" loses meaning near its center.

The physics is described by Einstein's general theory of relativity, which predicts that gravity is not a force but a curvature of space-time itself. Near a black hole, this curvature becomes extreme, creating a funnel-like geometry that traps everything within its reach.

But what happens inside? The honest answer is: we don't know. Our mathematics breaks down at the singularity — the theoretical point of infinite density at the center. Some physicists believe it contains a new kind of physics entirely, perhaps connected to quantum gravity or even other universes.

What we do know is this: black holes are not destroyers. They are transformers. Matter that falls in doesn't disappear; its information is encoded on the event horizon in a phenomenon known as holographic storage. The universe, it seems, keeps records.

As we develop new telescopes and gravitational wave detectors, each observation peels back another layer of mystery. Black holes may be the key to understanding not just how the universe works, but why it exists at all.`,
    image: storyBlackhole,
    category: "Deep Space",
    date: "2026-02-10",
    readTime: "12 min",
    likes: 891,
    featured: true,
  },
  {
    id: "4",
    title: "Webb's Latest: Galaxies That Shouldn't Exist",
    excerpt: "The James Webb Space Telescope has found galaxies so old and so massive that they challenge our models of cosmic evolution.",
    content: `When the James Webb Space Telescope pointed its golden mirrors at a seemingly empty patch of sky, it found something that made astrophysicists uncomfortable: galaxies that formed too early and grew too large, according to everything we thought we knew about the universe.

These galaxies existed just 400 million years after the Big Bang — a cosmic blink of an eye. At that age, the universe should have been a diffuse fog of hydrogen and helium, with only the faintest seeds of structure beginning to coalesce. Instead, Webb found fully formed galaxies with billions of stars, organized into spiral structures that shouldn't have had time to develop.

"It's like finding a skyscraper in a world that was supposed to still be gathering rocks," said Dr. Priya Natarajan of Yale, one of the lead researchers on the discovery.

The implications are profound. Either our models of galaxy formation are fundamentally incomplete, or there are physical processes at work in the early universe that we haven't yet identified. Some theorists suggest that dark matter may have played a more active role in early structure formation than previously thought. Others propose modifications to our understanding of star formation rates.

Webb's infrared instruments are uniquely suited for this kind of archaeology. Because the universe is expanding, light from the most distant objects is stretched — "redshifted" — into infrared wavelengths. Webb can detect this ancient light with sensitivity that no previous telescope could match.

The telescope has also revealed unexpected chemical signatures in early galaxies, including elements that were thought to require multiple generations of stars to produce. This suggests that the first stars may have been even more massive and short-lived than our models predict, seeding the cosmos with heavy elements at a furious pace.

Every week, Webb delivers new data that challenges, refines, and occasionally overturns our understanding of cosmic history. The universe, it turns out, had a much more interesting childhood than we imagined.`,
    image: storyTelescope,
    category: "Telescopes",
    date: "2026-02-08",
    readTime: "9 min",
    likes: 672,
    featured: false,
  },
];
