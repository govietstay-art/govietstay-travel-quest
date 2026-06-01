import React, { useMemo, useState } from "react";
import {
  Compass,
  MapPin,
  Trophy,
  Star,
  MessageCircle,
  Globe2,
  RotateCcw,
  Gift,
  ShieldCheck,
  Sparkles,
  Palmtree
} from "lucide-react";

const WHATSAPP =
  "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20just%20played%20Travel%20Quest%20and%20want%20help%20planning%20my%20Vietnam%20trip.";

const WEBSITE = "https://govietstay8009.pinet.com/";

const quests = [
  {
    id: 1,
    place: "My Khe Beach",
    title: "Sunrise Start",
    emoji: "🌊",
    x: 18,
    y: 72,
    story:
      "Your journey begins by the sea. A trusted local friend is waiting to guide you through Da Nang.",
    question: "What should a traveler do first when arriving in Da Nang?",
    answers: ["Find trusted local support", "Rush without planning", "Ignore local advice"],
    correct: 0,
    reward: "Beach Explorer Badge"
  },
  {
    id: 2,
    place: "Son Tra Peninsula",
    title: "Green Mountain Path",
    emoji: "🐒",
    x: 34,
    y: 47,
    story:
      "You follow the coastal road toward Son Tra, where ocean wind, forest and mountain views meet.",
    question: "What is Son Tra best known for?",
    answers: ["Nature, viewpoints and local wildlife", "Snow mountains", "Desert safari"],
    correct: 0,
    reward: "Nature Guardian Badge"
  },
  {
    id: 3,
    place: "Han River",
    title: "City Lights Quest",
    emoji: "🌉",
    x: 50,
    y: 61,
    story:
      "The Dragon Bridge lights up the night. Travelers gather near the river for food, cruises and photos.",
    question: "Which Da Nang landmark is famous near the Han River?",
    answers: ["Dragon Bridge", "Eiffel Tower", "Sydney Opera House"],
    correct: 0,
    reward: "River Lights Badge"
  },
  {
    id: 4,
    place: "Hoi An Ancient Town",
    title: "Lantern Memory",
    emoji: "🏮",
    x: 67,
    y: 78,
    story:
      "You reach Hoi An, where lanterns, old houses and quiet streets create a timeless travel memory.",
    question: "What is Hoi An famous for?",
    answers: ["Lanterns and ancient town atmosphere", "Ice castles", "Volcano trekking"],
    correct: 0,
    reward: "Lantern Walker Badge"
  },
  {
    id: 5,
    place: "Ba Na Hills",
    title: "Golden Bridge Finale",
    emoji: "🌁",
    x: 77,
    y: 35,
    story:
      "Your final quest leads to the mountains, where the Golden Bridge feels like a path through the clouds.",
    question: "Which experience is strongly connected with Ba Na Hills?",
    answers: ["Golden Bridge", "Sahara dunes", "Northern lights"],
    correct: 0,
    reward: "Golden Explorer Badge"
  }
];

function LogoMark() {
  return (
    <div className="brandLogo" aria-label="GoVietStay logo">
      <Compass size={34} />
      <Palmtree size={18} className="miniPalm" />
    </div>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [badges, setBadges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [player, setPlayer] = useState("");

  const quest = quests[current];
  const progress = Math.round((badges.length / quests.length) * 100);

  const rank = useMemo(() => {
    if (score >= 500) return "Legend Local Explorer";
    if (score >= 400) return "Trusted Vietnam Explorer";
    if (score >= 300) return "Da Nang Friend";
    if (score >= 200) return "Curious Traveler";
    return "New Traveler";
  }, [score]);

  function answer(index) {
    if (selected !== null) return;
    setSelected(index);

    if (index === quest.correct) {
      setScore((oldScore) => oldScore + 100);
      setBadges((oldBadges) => [...oldBadges, quest.reward]);
    }
  }

  function nextQuest() {
    if (current < quests.length - 1) {
      setCurrent((oldCurrent) => oldCurrent + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function resetGame() {
    setStarted(false);
    setCurrent(0);
    setScore(0);
    setBadges([]);
    setSelected(null);
    setFinished(false);
    setPlayer("");
  }

  if (!started) {
    return (
      <main className="app heroPage">
        <section className="heroCard">
          <LogoMark />

          <p className="eyebrow">Powered by GoVietStay</p>
          <h1>GoVietStay Travel Quest</h1>

          <p className="subtitle">
            Explore Da Nang, Hoi An and Vietnam through a simple travel adventure.
            Earn badges, unlock local memories and connect with a trusted local friend.
          </p>

          <div className="startRow">
            <input
              className="nameInput"
              value={player}
              onChange={(event) => setPlayer(event.target.value)}
              placeholder="Traveler name (optional)"
            />

            <button className="primaryBtn" onClick={() => setStarted(true)}>
              Start Journey
            </button>
          </div>

          <div className="trustRow">
            <span>Private Tours</span>
            <span>Local Guide</span>
            <span>24/7 WhatsApp</span>
          </div>

          <div className="comingSoon">
            <Sparkles size={16} />
            <p>Coming soon: Pi SDK Login • Leaderboard • CiDi Games Submission</p>
          </div>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="app resultPage">
        <section className="resultCard">
          <LogoMark />

          <p className="eyebrow">Quest Completed</p>
          <h1>{player || "Traveler"}, you are a {rank}</h1>

          <div className="scoreBox">
            <span>Final Score</span>
            <strong>{score}</strong>
          </div>

          <h2>Your Travel Badges</h2>

          <div className="badgeGrid">
            {badges.map((badge) => (
              <div className="badge" key={badge}>
                <Star size={18} />
                {badge}
              </div>
            ))}
          </div>

          <div className="rewardBox">
            <Gift size={24} />
            <p>
              Travel reward unlocked: contact GoVietStay for local support,
              private tour ideas, SIM/eSIM, massage and Da Nang travel tips.
            </p>
          </div>

          <div className="ctaRow">
            <a className="primaryBtn linkBtn" href={WHATSAPP} target="_blank" rel="noreferrer">
              Plan on WhatsApp
            </a>

            <a className="secondaryBtn linkBtn" href={WEBSITE} target="_blank" rel="noreferrer">
              Visit Website
            </a>
          </div>

          <button className="ghostBtn" onClick={resetGame}>
            <RotateCcw size={17} />
            Play Again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="app gamePage">
      <section className="topBar">
        <div>
          <p className="eyebrow">GoVietStay Travel Quest</p>
          <h1>{quest.title}</h1>
        </div>

        <div className="scoreMini">
          <Trophy size={18} />
          <strong>{score}</strong>
        </div>
      </section>

      <section className="mapCard">
        <div className="mapBg">
          <div className="routeLine" />

          {quests.map((item, index) => (
            <div
              key={item.id}
              className={`pin ${index === current ? "active" : ""} ${
                index < current ? "done" : ""
              }`}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              <span>{item.emoji}</span>
            </div>
          ))}
        </div>

        <div className="progressHeader">
          <span>Journey Progress</span>
          <strong>{progress}%</strong>
        </div>

        <div className="progressLine">
          <div style={{ width: `${progress}%` }} />
        </div>
      </section>

      <section className="questCard">
        <div className="placeLine">
          <MapPin size={18} />
          <strong>{quest.place}</strong>
        </div>

        <p className="storyText">{quest.story}</p>

        <h2>{quest.question}</h2>

        <div className="answers">
          {quest.answers.map((answerText, index) => {
            const isCorrect = selected !== null && index === quest.correct;
            const isWrong = selected === index && index !== quest.correct;

            return (
              <button
                key={answerText}
                className={`answerBtn ${isCorrect ? "correct" : ""} ${
                  isWrong ? "wrong" : ""
                }`}
                onClick={() => answer(index)}
              >
                {answerText}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="feedbackBox">
            <div>
              <ShieldCheck size={20} />
              <span>
                {selected === quest.correct
                  ? "Correct! Badge unlocked."
                  : "Not quite. Keep exploring with local support."}
              </span>
            </div>

            <button className="primaryBtn smallBtn" onClick={nextQuest}>
              {current < quests.length - 1 ? "Next Destination" : "Finish Quest"}
            </button>
          </div>
        )}
      </section>

      <section className="bottomLinks">
        <a href={WHATSAPP} target="_blank" rel="noreferrer">
          <MessageCircle size={16} />
          WhatsApp
        </a>

        <a href={WEBSITE} target="_blank" rel="noreferrer">
          <Globe2 size={16} />
          Website
        </a>
      </section>
    </main>
  );
}
